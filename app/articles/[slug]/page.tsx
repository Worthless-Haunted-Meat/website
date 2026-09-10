import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { getArticleBySlug, getAllArticleSlugs, getAllArticles } from "@/lib/articles";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllArticleSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.excerpt,
  };
}

export default async function ArticleSlugPage({ params }: Props) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) notFound();

  const siblings = article.series
    ? getAllArticles()
        .filter((a) => a.series === article.series)
        .sort((a, b) => (a.part ?? 0) - (b.part ?? 0))
    : [];
  const idx = siblings.findIndex((a) => a.slug === article.slug);
  const prev = idx > 0 ? siblings[idx - 1] : null;
  const next = idx >= 0 && idx < siblings.length - 1 ? siblings[idx + 1] : null;

  const formattedDate = article.date
    ? new Date(article.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  return (
    <>
      <section className="py-16 border-b border-[#222222]">
        <div className="max-w-3xl mx-auto px-6">
          <Link
            href="/articles"
            className="inline-flex items-center gap-2 text-sm text-[#888888] hover:text-[#e74c3c] transition-colors mb-10 min-h-[44px]"
          >
            <ArrowLeft size={14} strokeWidth={1.5} aria-hidden="true" />
            All articles
          </Link>

          {(article.series || formattedDate) && (
            <p className="text-xs font-medium tracking-widest uppercase text-[#888888] mb-4">
              {article.series ? (
                <>
                  <span className="text-[#e74c3c]">{article.series}</span>
                  {article.part ? ` · Part ${article.part} of ${siblings.length}` : ""}
                  {formattedDate ? ` · ${formattedDate}` : ""}
                </>
              ) : (
                formattedDate
              )}
            </p>
          )}

          <h1
            className="font-syne font-extrabold text-[#f5f0e8] leading-tight mb-6"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
          >
            {article.title}
          </h1>

          <p className="text-sm text-[#888888]">By {article.author}</p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-6">
          <div
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: article.contentHtml }}
          />
        </div>
      </section>

      {(prev || next) && (
        <section className="py-10 border-t border-[#222222]">
          <div className="max-w-3xl mx-auto px-6 flex flex-col sm:flex-row justify-between gap-4">
            {prev ? (
              <Link
                href={`/articles/${prev.slug}`}
                className="group flex items-center gap-3 text-sm text-[#888888] hover:text-[#e74c3c] transition-colors min-h-[44px]"
              >
                <ArrowLeft size={14} strokeWidth={1.5} aria-hidden="true" />
                <span>
                  <span className="block text-xs uppercase tracking-widest mb-1">Previous</span>
                  <span className="text-[#f5f0e8] group-hover:text-[#e74c3c] transition-colors">{prev.title}</span>
                </span>
              </Link>
            ) : (
              <span />
            )}
            {next && (
              <Link
                href={`/articles/${next.slug}`}
                className="group flex items-center gap-3 text-sm text-[#888888] hover:text-[#e74c3c] transition-colors text-right sm:ml-auto min-h-[44px]"
              >
                <span>
                  <span className="block text-xs uppercase tracking-widest mb-1">Next in series</span>
                  <span className="text-[#f5f0e8] group-hover:text-[#e74c3c] transition-colors">{next.title}</span>
                </span>
                <ArrowRight size={14} strokeWidth={1.5} aria-hidden="true" />
              </Link>
            )}
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 border-t border-[#222222] bg-[#111111]">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="font-syne font-bold text-[#f5f0e8] text-2xl mb-4">
            We discover what people love — then we use technology to help them do more
            of it, and teach them to bring others along.
          </p>
          <Link
            href="/join"
            className="inline-flex items-center bg-[#c0392b] hover:bg-[#e74c3c] text-[#f5f0e8] font-bold px-8 py-4 rounded-md transition-colors mt-6 min-h-[44px]"
          >
            Join the Coalition
          </Link>
        </div>
      </section>
    </>
  );
}
