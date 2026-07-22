import type { Metadata } from "next";
import Link from "next/link";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import BoardTabs from "@/components/BoardTabs";
import SignConsentForm from "@/components/SignConsentForm";
import { getBoardDoc } from "@/lib/boardDocs";

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

  const token = (await cookies()).get("whm-board-token")?.value;
  const inviteName = token?.startsWith("invite:") ? token.slice("invite:".length) : null;

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
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: doc.html }}
        />

        {doc.meta.signable && (
          <SignConsentForm docTitle={doc.meta.title} defaultName={inviteName ?? ""} />
        )}
      </div>
    </div>
  );
}
