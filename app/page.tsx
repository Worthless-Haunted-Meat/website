import Link from "next/link";
import { Utensils, Users, Cpu } from "lucide-react";
import { BackgroundBeams } from "@/components/ui/aceternity/background-beams";
import { TextGenerateEffect } from "@/components/ui/aceternity/text-generate-effect";
import ProgramCard from "@/components/ProgramCard";
import Reveal from "@/components/Reveal";
import { getAllArticles } from "@/lib/articles";
import ArticleCard from "@/components/ArticleCard";

export default function HomePage() {
  const articles = getAllArticles().slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#0a0a0a]">
        <BackgroundBeams />
        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center flex flex-col items-center gap-8">
          <p className="text-xs font-medium tracking-widest uppercase text-[#c0392b]">
            Texas 501(c)(3) Nonprofit
          </p>
          <h1
            className="font-syne font-extrabold text-[#f5f0e8] leading-[0.9]"
            style={{ fontSize: "clamp(3.5rem, 10vw, 9rem)" }}
          >
            <TextGenerateEffect words="Worthless Haunted Meat" />
          </h1>
          <p className="max-w-2xl text-lg md:text-xl text-[#888888] leading-relaxed">
            We discover what people love — then we use technology to help them do more
            of it, and teach them to bring others along.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <Link
              href="/join"
              className="bg-[#c0392b] hover:bg-[#e74c3c] text-[#f5f0e8] font-bold px-8 py-4 rounded-md transition-colors min-h-[44px] flex items-center justify-center"
            >
              Join the Coalition
            </Link>
            <Link
              href="/about"
              className="border border-[#222222] hover:border-[#e74c3c] text-[#f5f0e8] font-bold px-8 py-4 rounded-md transition-colors min-h-[44px] flex items-center justify-center"
            >
              Read the Story
            </Link>
          </div>
        </div>
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#888888]">
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-[#888888] to-transparent" />
        </div>
      </section>

      {/* Mission */}
      <section className="py-24 md:py-32 bg-[#111111] border-y border-[#222222]">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <Reveal>
            <p className="text-xs font-medium tracking-widest uppercase text-[#888888] mb-6">
              Mission
            </p>
            <blockquote className="font-syne font-bold text-[#e74c3c] leading-tight max-w-4xl mx-auto"
              style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)" }}>
              &ldquo;We discover what people love — then we use technology to help them do more
              of it, and teach them to bring others along.&rdquo;
            </blockquote>
          </Reveal>
        </div>
      </section>

      {/* Programs */}
      <section className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal>
            <p className="text-xs font-medium tracking-widest uppercase text-[#888888] mb-3">
              What We Do
            </p>
            <h2 className="font-syne font-bold text-[#f5f0e8] mb-16"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
              Programs
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Reveal delay={0}>
              <ProgramCard
                icon={Users}
                title="Community Engagement"
                href="/programs/community-engagement"
                description="We listen first. Surveys, conversations, and direct community input shape how we allocate resources and where we build."
              />
            </Reveal>
            <Reveal delay={0.1}>
              <ProgramCard
                icon={Utensils}
                title="Resource Distribution"
                href="/programs/resource-distribution"
                description="A mobile platform connecting restaurants and businesses with shelters and individuals — an Amazon+Uber hybrid powered by community volunteers."
              />
            </Reveal>
            <Reveal delay={0.2}>
              <ProgramCard
                icon={Cpu}
                title="Technology Amplification"
                href="/programs/technology-amplification"
                description="We take what people already love and use technology to multiply it — then teach them to pass that power on to others."
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Our Approach — AI is one tool of many */}
      <section className="py-24 md:py-32 border-t border-[#222222]">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal>
            <p className="text-xs font-medium tracking-widest uppercase text-[#888888] mb-3">
              Our Approach
            </p>
            <h2
              className="font-syne font-bold text-[#f5f0e8] mb-10"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
            >
              AI Is One Tool. We Use All of Them.
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
            <div className="lg:col-span-3 flex flex-col gap-6 text-[#888888] leading-relaxed text-lg">
              <Reveal>
                <p>
                  There is a lot of noise about AI right now — some of it warranted, some of it exhausting. Here is where we stand.
                </p>
              </Reveal>
              <Reveal delay={0.05}>
                <p>
                  AI is one of the most powerful tools ever built, and we are not going to pretend otherwise. When it fits the problem, we use it. When it does not, we use whatever does.
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <p>
                  Our work runs on mobile logistics, community platforms, service-hour and donor-benefit tracking, mapping and routing, plain databases — and sometimes a good spreadsheet. AI shows up where it multiplies human effort. It does not show up because it is fashionable.
                </p>
              </Reveal>
              <Reveal delay={0.15}>
                <p className="text-[#f5f0e8]">
                  We are not an AI charity. We are a coalition that uses whichever technology fits the person we are trying to help — starting with the ones that already work.
                </p>
              </Reveal>
            </div>
            <Reveal delay={0.1}>
              <div className="lg:col-span-2 border border-[#222222] rounded-lg p-8 bg-[#111111]">
                <p className="text-xs font-medium tracking-widest uppercase text-[#888888] mb-6">
                  The Toolkit
                </p>
                <ul className="flex flex-col gap-4 text-[#888888] text-sm leading-relaxed list-none">
                  <li>
                    <span className="text-[#f5f0e8] font-medium">Mobile &amp; logistics</span> — the food-redistribution app that connects restaurants, shelters, and volunteers
                  </li>
                  <li>
                    <span className="text-[#f5f0e8] font-medium">Community platforms</span> — how volunteers coordinate, how donors show up
                  </li>
                  <li>
                    <span className="text-[#f5f0e8] font-medium">Data infrastructure</span> — tracking service hours, donor write-offs, and program impact
                  </li>
                  <li>
                    <span className="text-[#f5f0e8] font-medium">AI, where it fits</span> — cutting paperwork, matching supply with need, and giving skilled people leverage
                  </li>
                  <li>
                    <span className="text-[#f5f0e8] font-medium">Whatever else works</span> — including the boring, unglamorous tools that quietly do the job
                  </li>
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Pull quote */}
      <section className="py-24 md:py-32 bg-[#111111] border-y border-[#222222]">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal>
            <p className="text-xs font-medium tracking-widest uppercase text-[#888888] text-center mb-8">
              The Argument
            </p>
            <blockquote className="font-syne font-bold text-[#f5f0e8] text-center max-w-3xl mx-auto leading-tight"
              style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)" }}>
              &ldquo;Rapidly developing technology — AI in particular — is the first
              amplification event that can eat its own workforce.
              The question isn&apos;t whether it will change everything — it will.
              The question is:{" "}
              <em className="text-[#e74c3c] not-italic">
                who are we pointing it at?
              </em>
              &rdquo;
            </blockquote>
            <p className="text-center text-sm text-[#888888] mt-6">
              — Ricardo Vega, Founder
            </p>
          </Reveal>
        </div>
      </section>

      {/* Articles */}
      {articles.length > 0 && (
        <section className="py-24 md:py-32">
          <div className="max-w-6xl mx-auto px-6">
            <Reveal>
              <div className="flex items-end justify-between mb-12">
                <div>
                  <p className="text-xs font-medium tracking-widest uppercase text-[#888888] mb-3">
                    Writing
                  </p>
                  <h2 className="font-syne font-bold text-[#f5f0e8]"
                    style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)" }}>
                    Articles
                  </h2>
                </div>
                <Link
                  href="/articles"
                  className="text-sm text-[#888888] hover:text-[#e74c3c] transition-colors"
                >
                  All articles →
                </Link>
              </div>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article, i) => (
                <Reveal key={article.slug} delay={i * 0.1}>
                  <ArticleCard article={article} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-24 md:py-32 bg-[#111111] border-t border-[#222222]">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <Reveal>
            <h2 className="font-syne font-bold text-[#f5f0e8] mb-6"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
              Nobody Gets That Look.
            </h2>
            <p className="text-[#888888] text-lg max-w-xl mx-auto mb-10">
              Not from us. Join the coalition and help us point the most
              powerful technology ever built at the people who need it most.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/join"
                className="inline-flex items-center justify-center bg-[#c0392b] hover:bg-[#e74c3c] text-[#f5f0e8] font-bold px-10 py-4 rounded-md transition-colors min-h-[44px]"
              >
                Join the Coalition
              </Link>
              <Link
                href="/donate"
                className="inline-flex items-center justify-center border border-[#222222] hover:border-[#e74c3c] text-[#f5f0e8] font-bold px-10 py-4 rounded-md transition-colors min-h-[44px]"
              >
                Donate
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
