import { createHash, randomUUID } from "crypto";
import { get, list, put } from "@vercel/blob";

const PREFIX = "ledger/";

interface RecordBase {
  id: string;
  recordedAt: string;
  name: string;
  email: string;
  sessionKind: "invite" | "password";
  sessionName: string | null;
  userAgent: string;
  importedFrom?: string;
}

export interface SignatureRecord extends RecordBase {
  type: "signature";
  docSlug: string;
  docTitle: string;
  docSha256: string | null;
}

export interface VoteRecord extends RecordBase {
  type: "vote";
  motionSlug: string;
  motionNumber: string;
  motionTitle: string;
  motionSha256: string;
  choice: "Aye" | "Nay" | "Abstain";
  comment: string;
}

export type LedgerRecord = SignatureRecord | VoteRecord;

type NewRecord =
  | Omit<SignatureRecord, "id" | "recordedAt">
  | Omit<VoteRecord, "id" | "recordedAt">;

export function sha256(text: string): string {
  return createHash("sha256").update(text, "utf8").digest("hex");
}

export function ledgerConfigured(): boolean {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

export async function appendRecord(record: NewRecord, recordedAt = new Date().toISOString()): Promise<LedgerRecord> {
  const full = { ...record, id: randomUUID(), recordedAt } as LedgerRecord;
  const stamp = recordedAt.replace(/[:.]/g, "-");
  await put(`${PREFIX}${stamp}-${full.type}-${full.id}.json`, JSON.stringify(full, null, 2), {
    access: "private",
    contentType: "application/json",
    addRandomSuffix: false,
    allowOverwrite: false,
  });
  return full;
}

export async function readLedger(): Promise<LedgerRecord[]> {
  const pathnames: string[] = [];
  let cursor: string | undefined;
  do {
    const page = await list({ prefix: PREFIX, cursor, limit: 1000 });
    pathnames.push(...page.blobs.map((b) => b.pathname));
    cursor = page.hasMore ? page.cursor : undefined;
  } while (cursor);

  const records = await Promise.all(
    pathnames.map(async (pathname) => {
      const result = await get(pathname, { access: "private", useCache: false });
      if (!result?.stream) return null;
      return JSON.parse(await new Response(result.stream).text()) as LedgerRecord;
    })
  );
  return records
    .filter((r): r is LedgerRecord => r !== null)
    .sort((a, b) => a.recordedAt.localeCompare(b.recordedAt));
}
