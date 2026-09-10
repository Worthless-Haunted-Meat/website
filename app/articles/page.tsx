import type { Metadata } from "next";
import { getAllArticles, type ArticleMeta } from "@/lib/articles";
import ArticleCard from "@/components/ArticleCard";
import Reveal from "@/components/Reveal";
import CrossingDiagram from "@/components/diagrams/CrossingDiagram";
import RippleDiagram from "@/components/diagrams/RippleDiagram";

export const metadata: Metadata = {
  title: "Articles",
  description:
    "Writing from Worthless Haunted Meat: the Nobody's Job series on the catching function no city ever funded, and Pass the Echo On, on pointing new technology at the right target.",
};

function byPart(a: ArticleMeta, b: ArticleMeta) {
  return (a.part ?? 0) - (b.part ?? 0);
}

export default function ArticlesPage() {
  const articles = getAllArticles();
  const nobodysJob = articles.filter((a) => a.series === "Nobody's Job").sort(byPart);
  const echo = articles.filter((a) => a.series === "Pass the Echo On").sort(byPart);
  const standalone = articles.filter((a) => !a.series);

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

      {nobodysJob.length > 0 && (
        <section className="py-24 border-b border-[#222222]">
          <div className="max-w-6xl mx-auto px-6">
            <Reveal>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center mb-14">
                <div>
                  <p className="text-xs font-medium tracking-widest uppercase text-[#e74c3c] mb-4">
                    Series One
                  </p>
                  <h2
                    className="font-syne font-extrabold text-[#f5f0e8] leading-tight mb-4"
                    style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)" }}
                  >
                    Nobody&apos;s Job
                  </h2>
                  <p className="text-[#888888] text-lg leading-relaxed">
                    Cities budget for water, power, and roads — and never for
                    catching people, because that function was free until scale
                    broke it. Eight pieces on why people fall, where the
                    resources already are, and the machine that routes them.
                  </p>
                </div>
                <div className="bg-[#111111] border border-[#222222] rounded-lg p-6">
                  <CrossingDiagram />
                </div>
              </div>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {nobodysJob.map((article, i) => (
                <Reveal key={article.slug} delay={i * 0.05}>
                  <ArticleCard article={article} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {echo.length > 0 && (
        <section className="py-24 border-b border-[#222222]">
          <div className="max-w-6xl mx-auto px-6">
            <Reveal>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center mb-14">
                <div>
                  <p className="text-xs font-medium tracking-widest uppercase text-[#e74c3c] mb-4">
                    Series Two
                  </p>
                  <h2
                    className="font-syne font-extrabold text-[#f5f0e8] leading-tight mb-4"
                    style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)" }}
                  >
                    Pass the Echo On
                  </h2>
                  <p className="text-[#888888] text-lg leading-relaxed">
                    Four pieces on the new machines — what they took, what they
                    gave back, and the test for pointing them at the right
                    target. It ends where it was always heading: everything we
                    were given came from the people behind us, and it only
                    stays alive if it keeps moving.
                  </p>
                </div>
                <div className="bg-[#111111] border border-[#222222] rounded-lg p-6">
                  <RippleDiagram />
                </div>
              </div>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {echo.map((article, i) => (
                <Reveal key={article.slug} delay={i * 0.05}>
                  <ArticleCard article={article} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {standalone.length > 0 && (
        <section className="py-24">
          <div className="max-w-6xl mx-auto px-6">
            <Reveal>
              <p className="text-xs font-medium tracking-widest uppercase text-[#888888] mb-10">
                And the one that started it
              </p>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {standalone.map((article, i) => (
                <Reveal key={article.slug} delay={i * 0.05}>
                  <ArticleCard article={article} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
