import { CheckCircle2, Clock } from "lucide-react";
import type { DocStatus } from "@/lib/ledgerStatus";
import { formatLedgerTime } from "@/lib/ledgerFormat";

export default function SignatureStatus({ status }: { status: DocStatus }) {
  const { meta, signers, missing, adoptedAt } = status;
  const individual = meta.signedBy === "individual";

  return (
    <div className="border border-[#222222] rounded-md p-6">
      {individual ? (
        <p className="text-xs font-medium tracking-widest uppercase text-[#888888] mb-4">
          Signed by each director individually
        </p>
      ) : adoptedAt ? (
        <p className="flex items-center gap-2 text-sm font-medium text-[#7fbf7f] mb-4">
          <CheckCircle2 className="w-4 h-4" strokeWidth={2} />
          Adopted {formatLedgerTime(adoptedAt)}: signed by all directors
        </p>
      ) : (
        <p className="flex items-center gap-2 text-sm font-medium text-[#e0b050] mb-4">
          <Clock className="w-4 h-4" strokeWidth={2} />
          Awaiting signatures: {status.directorCount - missing.length} of {status.directorCount} directors have signed
        </p>
      )}

      {signers.length > 0 && (
        <ul className="flex flex-col gap-2 list-none">
          {signers.map((s) => (
            <li key={s.name + s.signedAt} className="text-sm text-[#888888]">
              <span className="text-[#f5f0e8]">{s.name}</span> signed {formatLedgerTime(s.signedAt)}
              {!s.currentVersion && " (an earlier version of this document)"}
              {s.imported && " (from the emailed signature record)"}
            </li>
          ))}
        </ul>
      )}

      {!individual && !adoptedAt && missing.length > 0 && (
        <p className="text-sm text-[#888888] mt-3">Not yet signed: {missing.join(", ")}</p>
      )}
    </div>
  );
}
