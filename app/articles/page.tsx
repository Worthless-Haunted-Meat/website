import type { Metadata } from "next";
import { getAllArticles } from "@/lib/articles";
import ArticleCard from "@/components/ArticleCard";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Articles",
  description: "Writing from the Worthless Haunted Meat coalition.",
};

export default function ArticlesPage() {
  const articles = getAllArticles();

  return (
    <>
      <section className="py-24 md:py-32 border-b border-[#222222]">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal>
            <p className="text-xs font-medium tracking-widest uppercase text-[#888888] mb-4">
              Writing
            </p>
            <h1
              className="font-syne font-extrabold text-[#f5f0e8] leading-tight"
              style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
            >
              Articles
            </h1>
          </Reveal>
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6">
          {articles.length === 0 ? (
            <p className="text-[#888888]">No articles yet. Check back soon.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article, i) => (
                <Reveal key={article.slug} delay={i * 0.1}>
                  <ArticleCard article={article} />
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
