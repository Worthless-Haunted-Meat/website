import { getBoardDoc, listBoardDocs, type BoardDocMeta } from "@/lib/boardDocs";
import { currentDirectors, matchDirector } from "@/lib/directors";
import { readLedger, sha256, type LedgerRecord, type SignatureRecord, type VoteRecord } from "@/lib/ledger";
import { getMotion, listMotions, type MotionMeta } from "@/lib/motions";

export interface DocSigner {
  name: string;
  director: string | null;
  signedAt: string;
  currentVersion: boolean;
  imported: boolean;
}

export interface DocStatus {
  meta: BoardDocMeta;
  sha: string;
  signers: DocSigner[];
  missing: string[];
  directorCount: number;
  adoptedAt: string | null;
}

export interface MotionStatus {
  meta: MotionMeta;
  votes: { director: string; choice: VoteRecord["choice"]; votedAt: string }[];
  notVoted: string[];
}

export interface LedgerView {
  records: LedgerRecord[];
  docs: DocStatus[];
  motions: MotionStatus[];
  error: string | null;
}

function latestByDirector<T extends LedgerRecord>(records: T[]): Map<string, T> {
  const latest = new Map<string, T>();
  for (const r of records) {
    const director = matchDirector(r.name);
    if (director) latest.set(director, r);
  }
  return latest;
}

export function docStatus(meta: BoardDocMeta, sha: string, records: LedgerRecord[]): DocStatus {
  const sigs = records.filter((r): r is SignatureRecord => r.type === "signature" && r.docSlug === meta.slug);
  const signers = sigs.map((r) => ({
    name: r.name,
    director: matchDirector(r.name),
    signedAt: r.recordedAt,
    currentVersion: r.docSha256 === sha || (r.docSha256 === null && Boolean(r.importedFrom)),
    imported: Boolean(r.importedFrom),
  }));

  const directors = currentDirectors();
  if (meta.signedBy === "individual") {
    return { meta, sha, signers, missing: [], directorCount: directors.length, adoptedAt: null };
  }

  const current = latestByDirector(sigs.filter((r) => r.docSha256 === sha));
  const missing = directors.filter((d) => !current.has(d));
  const adoptedAt =
    missing.length === 0
      ? [...current.values()].map((r) => r.recordedAt).sort().at(-1) ?? null
      : null;
  return { meta, sha, signers, missing, directorCount: directors.length, adoptedAt };
}

export async function getLedgerView(): Promise<LedgerView> {
  let records: LedgerRecord[] = [];
  let error: string | null = null;
  try {
    records = await readLedger();
  } catch (e) {
    console.error("Ledger read failed:", e);
    error = "The signature ledger could not be loaded right now.";
  }

  const docs = await Promise.all(
    listBoardDocs()
      .filter((m) => m.signable)
      .map(async (meta) => {
        const doc = await getBoardDoc(meta.slug);
        return docStatus(meta, sha256(doc?.raw ?? ""), records);
      })
  );

  const motions = await Promise.all(
    listMotions().map(async (meta) => {
      const motion = await getMotion(meta.slug);
      const sha = sha256(motion?.raw ?? "");
      const latest = latestByDirector(
        records.filter((r): r is VoteRecord => r.type === "vote" && r.motionSlug === meta.slug && r.motionSha256 === sha)
      );
      const votes = [...latest.entries()].map(([director, r]) => ({ director, choice: r.choice, votedAt: r.recordedAt }));
      return { meta, votes, notVoted: currentDirectors().filter((d) => !latest.has(d)) };
    })
  );

  return { records, docs, motions, error };
}
