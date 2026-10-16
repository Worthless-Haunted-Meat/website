import type { Metadata } from "next";
import Link from "next/link";
import { getBoardSession } from "@/lib/boardSession";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import BoardTabs from "@/components/BoardTabs";
import SignConsentForm from "@/components/SignConsentForm";
import SignatureStatus from "@/components/SignatureStatus";
import { getBoardDoc } from "@/lib/boardDocs";
import { getLedgerView } from "@/lib/ledgerStatus";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const doc = await getBoardDoc(slug);
  return {
    title: doc ? doc.meta.title : "Board Document",
    description: doc?.meta.description,
  };
}

export default async function BoardDocumentPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const doc = await getBoardDoc(slug);
  if (!doc) notFound();

  const inviteName = (await getBoardSession())?.name ?? null;
  const status = doc.meta.signable
    ? (await getLedgerView()).docs.find((d) => d.meta.slug === doc.meta.slug) ?? null
    : null;

  return (
    <div className="py-24 md:py-32">
      <div className="max-w-3xl mx-auto px-6">
        <p className="text-xs font-medium tracking-widest uppercase text-[#888888] mb-6">
          Board Portal
        </p>
        <BoardTabs activeHref="/board/documents" />

        <Link
          href="/board/documents"
          className="inline-flex items-center gap-2 text-sm text-[#888888] hover:text-[#f5f0e8] transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" strokeWidth={1.75} />
          All documents
        </Link>

        <div
          className="prose prose-lg prose-legal max-w-none"
          dangerouslySetInnerHTML={{ __html: doc.html }}
        />

        {status && (
          <div className="mt-12">
            <p className="text-xs font-medium tracking-widest uppercase text-[#888888] mb-3">
              Signatures on record
            </p>
            <SignatureStatus status={status} />
          </div>
        )}

        {doc.meta.signable && (
          <SignConsentForm
            docSlug={doc.meta.slug}
            docTitle={doc.meta.title}
            defaultName={inviteName ?? ""}
          />
        )}
      </div>
    </div>
  );
}
