import Link from "next/link";
import { type ArticleMeta } from "@/lib/articles";
import { ArrowRight } from "lucide-react";

interface ArticleCardProps {
  article: ArticleMeta;
}

export default function ArticleCard({ article }: ArticleCardProps) {
  const formattedDate = article.date
    ? new Date(article.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  return (
    <Link
      href={`/articles/${article.slug}`}
      className="group block bg-[#111111] border border-[#222222] rounded-lg p-8 hover:border-[#e74c3c] transition-colors"
    >
      {formattedDate && (
        <p className="text-xs font-medium tracking-widest uppercase text-[#888888] mb-3">
          {formattedDate}
        </p>
      )}
      <h2 className="font-syne font-bold text-xl text-[#f5f0e8] mb-3 group-hover:text-[#e74c3c] transition-colors">
        {article.title}
      </h2>
      <p className="text-[#888888] leading-relaxed text-sm mb-6">{article.excerpt}</p>
      <span className="inline-flex items-center gap-2 text-sm font-medium text-[#e74c3c]">
        Read <ArrowRight size={14} strokeWidth={1.5} aria-hidden="true" />
      </span>
    </Link>
  );
}
