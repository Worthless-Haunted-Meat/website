import type { Metadata } from "next";
import Link from "next/link";
import { BookLock, FileSignature, Gavel, History } from "lucide-react";
import BoardTabs from "@/components/BoardTabs";
import Reveal from "@/components/Reveal";
import SignatureStatus from "@/components/SignatureStatus";
import { ledgerHistory, type HistoryKind } from "@/lib/ledgerHistory";
import { formatLedgerDate, formatLedgerTime } from "@/lib/ledgerFormat";
import { getLedgerView } from "@/lib/ledgerStatus";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Board Ledger",
  description: "The permanent record of Worthless Haunted Meat board actions, signatures, votes and filings.",
};

type Entry = { sortKey: string; when: string; label: string; title: string; detail: string };

const KIND_LABEL: Record<HistoryKind, string> = {
  filing: "Filing",
  board: "Board",
  governance: "Governance",
};

function SectionHeader({ icon: Icon, eyebrow, title }: { icon: typeof History; eyebrow: string; title: string }) {
  return (
    <>
      <div className="flex items-center gap-3 mb-4">
        <Icon className="w-5 h-5 text-[#e74c3c]" strokeWidth={1.75} />
        <p className="text-xs font-medium tracking-widest uppercase text-[#888888]">{eyebrow}</p>
      </div>
      <h2 className="font-syne font-bold text-[#f5f0e8] text-3xl mb-8">{title}</h2>
    </>
  );
}

export default async function BoardLedgerPage() {
  const { records, docs, motions, error } = await getLedgerView();

  const entries: Entry[] = [
    ...ledgerHistory.map((h) => ({
      sortKey: `${h.date}T00:00:00.000Z`,
      when: formatLedgerDate(h.date),
      label: KIND_LABEL[h.kind],
      title: h.title,
      detail: h.detail,
    })),
    ...records.map((r) =>
      r.type === "signature"
        ? {
            sortKey: r.recordedAt,
            when: formatLedgerTime(r.recordedAt),
            label: "Signature",
            title: `${r.name} signed “${r.docTitle}”`,
            detail: r.importedFrom
              ? `Recorded from the emailed signature record (${r.importedFrom}).`
              : `Signed electronically in the board portal.${r.docSha256 ? ` Document version ${r.docSha256.slice(0, 12)}.` : ""}`,
          }
        : {
            sortKey: r.recordedAt,
            when: formatLedgerTime(r.recordedAt),
            label: "Vote",
            title: `${r.name} voted ${r.choice} on ${r.motionTitle}`,
            detail: r.comment ? `Comment: ${r.comment}` : "Cast electronically in the board portal.",
          }
    ),
  ].sort((a, b) => b.sortKey.localeCompare(a.sortKey));

  return (
    <div className="py-24 md:py-32">
      <div className="max-w-3xl mx-auto px-6">
        <p className="text-xs font-medium tracking-widest uppercase text-[#888888] mb-6">
          Board Portal
        </p>
        <BoardTabs activeHref="/board/ledger" />

        <Reveal>
          <h1
            className="font-syne font-extrabold text-[#f5f0e8] leading-tight mb-6"
            style={{ fontSize: "clamp(2rem, 5vw, 3.75rem)" }}
          >
            Board Ledger
          </h1>
          <p className="text-[#888888] text-lg leading-relaxed mb-4">
            The permanent record of the board&apos;s actions: every signature and
            vote cast in this portal, alongside the organization&apos;s filings
            and board changes.
          </p>
          <p className="flex items-start gap-2 text-[#888888] text-sm leading-relaxed">
            <BookLock className="w-4 h-4 mt-0.5 shrink-0" strokeWidth={1.75} />
            Each signature and vote is saved on this site the moment it&apos;s
            submitted, with the exact version of the document signed. Entries
            can&apos;t be edited or removed from the portal, and a copy of each is
            also emailed to the organization.
          </p>
          {error && (
            <p role="alert" className="mt-6 bg-[#c0392b]/10 border border-[#c0392b] rounded-md p-4 text-sm text-[#e74c3c]">
              {error} Filings and board history are shown below; signatures will
              appear once the ledger is reachable.
            </p>
          )}
        </Reveal>

        <hr className="border-[#222222] my-16" />

        <Reveal>
          <section>
            <SectionHeader icon={FileSignature} eyebrow="Resolutions" title="Signed Documents" />
            <div className="flex flex-col gap-8">
              {docs.map((status) => (
                <div key={status.meta.slug}>
                  <Link
                    href={`/board/documents/${status.meta.slug}`}
                    className="font-syne font-bold text-[#f5f0e8] hover:text-[#e74c3c] text-xl transition-colors"
                  >
                    {status.meta.title}
                  </Link>
                  <div className="mt-3">
                    <SignatureStatus status={status} />
                  </div>
                </div>
              ))}
            </div>
          </section>
        </Reveal>

        <hr className="border-[#222222] my-16" />

        <Reveal>
          <section>
            <SectionHeader icon={Gavel} eyebrow="Motions" title="Votes" />
            <div className="flex flex-col gap-6">
              {motions.map(({ meta, votes, notVoted }) => (
                <div key={meta.slug} className="border border-[#222222] rounded-md p-6">
                  <p className="text-xs font-medium tracking-widest uppercase text-[#888888] mb-2">
                    {meta.status === "open" ? `Open since ${meta.opened}` : "Closed"}
                  </p>
                  <h3 className="font-syne font-bold text-[#f5f0e8] text-xl mb-3">{meta.title}</h3>
                  {meta.status === "closed" && meta.result && (
                    <p className="text-[#888888] text-sm leading-relaxed mb-3">{meta.result}</p>
                  )}
                  {votes.length > 0 ? (
                    <ul className="flex flex-col gap-1 list-none text-sm text-[#888888]">
                      {votes.map((v) => (
                        <li key={v.director}>
                          <span className="text-[#f5f0e8]">{v.director}</span>: {v.choice}, {formatLedgerTime(v.votedAt)}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-[#888888]">No votes cast.</p>
                  )}
                  {meta.status === "open" && notVoted.length > 0 && (
                    <p className="text-sm text-[#888888] mt-2">Not yet voted: {notVoted.join(", ")}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        </Reveal>

        <hr className="border-[#222222] my-16" />

        <Reveal>
          <section>
            <SectionHeader icon={History} eyebrow="History" title="Full Record" />
            <ol className="flex flex-col gap-6 border-l border-[#222222] pl-6 list-none">
              {entries.map((e) => (
                <li key={e.sortKey + e.title}>
                  <p className="text-xs font-medium tracking-widest uppercase text-[#888888] mb-1">
                    {e.when} · {e.label}
                  </p>
                  <p className="text-[#f5f0e8] font-medium">{e.title}</p>
                  <p className="text-[#888888] text-sm leading-relaxed">{e.detail}</p>
                </li>
              ))}
            </ol>
          </section>
        </Reveal>
      </div>
    </div>
  );
}
