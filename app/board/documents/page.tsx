import type { Metadata } from "next";
import Link from "next/link";
import { cookies } from "next/headers";
import { FileText, PenLine } from "lucide-react";
import BoardTabs from "@/components/BoardTabs";
import { listBoardDocs } from "@/lib/boardDocs";

export const metadata: Metadata = {
  title: "Board Documents",
  description: "Governance documents for Worthless Haunted Meat board members and candidates.",
};

export default async function BoardDocumentsPage() {
  const docs = listBoardDocs();
  const token = (await cookies()).get("whm-board-token")?.value;
  const inviteName = token?.startsWith("invite:") ? token.slice("invite:".length) : null;

  return (
    <div className="py-24 md:py-32">
      <div className="max-w-3xl mx-auto px-6">
        <p className="text-xs font-medium tracking-widest uppercase text-[#888888] mb-6">
          Board Portal
        </p>
        <BoardTabs activeHref="/board/documents" />

        <h1
          className="font-syne font-extrabold text-[#f5f0e8] leading-tight mb-6"
          style={{ fontSize: "clamp(2rem, 5vw, 3.75rem)" }}
        >
          Board Documents
        </h1>
        <p className="text-[#888888] text-lg leading-relaxed mb-12">
          {inviteName
            ? `${inviteName} — these are the documents that take you from invited to seated. Start with the Consent to Serve; the rest are for our first meeting together.`
            : "The documents that take a candidate from invited to seated. Start with the Consent to Serve; the rest are for the first board meeting."}
        </p>

        <div className="flex flex-col gap-4">
          {docs.map((doc) => (
            <Link
              key={doc.slug}
              href={`/board/documents/${doc.slug}`}
              className="border border-[#222222] hover:border-[#e74c3c] rounded-md p-6 transition-colors group"
            >
              <div className="flex items-start gap-4">
                {doc.signable ? (
                  <PenLine className="w-5 h-5 text-[#e74c3c] mt-1 shrink-0" strokeWidth={1.75} />
                ) : (
                  <FileText className="w-5 h-5 text-[#888888] mt-1 shrink-0" strokeWidth={1.75} />
                )}
                <div>
                  <h2 className="font-syne font-bold text-[#f5f0e8] text-xl mb-1 group-hover:text-[#e74c3c] transition-colors">
                    {doc.title}
                  </h2>
                  <p className="text-[#888888] leading-relaxed">{doc.description}</p>
                  {doc.signable && (
                    <p className="text-xs font-medium tracking-widest uppercase text-[#e74c3c] mt-3">
                      Signable online
                    </p>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
