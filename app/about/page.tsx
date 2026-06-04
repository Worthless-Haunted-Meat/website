import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "About",
  description:
    "The story behind Worthless Haunted Meat — what the name means, why it exists, and what we believe.",
};

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-24 md:py-32 border-b border-[#222222]">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal>
            <p className="text-xs font-medium tracking-widest uppercase text-[#888888] mb-4">
              About
            </p>
            <h1
              className="font-syne font-extrabold text-[#f5f0e8] leading-tight mb-8"
              style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
            >
              The Name Is Not an Accident.
            </h1>
            <p className="text-[#888888] text-xl leading-relaxed max-w-2xl">
              It&apos;s what capitalism does to humans when it&apos;s finished with them.
              And it&apos;s a dare to do something about it.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Content */}
      <section className="py-24 md:py-32">
        <div className="max-w-3xl mx-auto px-6 flex flex-col gap-16">
          <Reveal>
            <div>
              <p className="text-xs font-medium tracking-widest uppercase text-[#888888] mb-4">
                The Name
              </p>
              <h2 className="font-syne font-bold text-[#f5f0e8] text-3xl mb-6">
                Worthless Haunted Meat
              </h2>
              <div className="flex flex-col gap-4 text-[#888888] leading-relaxed">
                <p>
                  When your labor stops being profitable — when you age out of
                  usefulness, when AI learns to do your job faster and cheaper
                  — you become worthless haunted meat. Biological. Expensive.
                  Inconvenient.
                </p>
                <p>
                  That&apos;s not a future. That&apos;s already happening. To people we know.
                  To entire communities the economy decided it was done with.
                </p>
                <p>
                  People laugh when they hear the name. Or they flinch. Either
                  reaction is fine — both mean they stopped. Both mean they&apos;re
                  asking the question.
                </p>
              </div>
            </div>
          </Reveal>

          <hr className="border-[#222222]" />

          <Reveal>
            <div>
              <p className="text-xs font-medium tracking-widest uppercase text-[#888888] mb-4">
                The Pattern
              </p>
              <h2 className="font-syne font-bold text-[#f5f0e8] text-3xl mb-6">
                This Has Happened Before
              </h2>
              <div className="flex flex-col gap-4 text-[#888888] leading-relaxed">
                <p>
                  Every time humanity has gotten a new superpower — the printing
                  press, the steam engine, electricity, the internet — the same
                  thing has happened. The technology was real. The potential was
                  real. The benefits were real.
                </p>
                <p>
                  And the people who already had money captured almost all of it.
                </p>
                <p>
                  Not because they were evil. Because capital moves faster than
                  people. If you already have resources, you can adopt the new
                  thing first, build on top of it first, pull away before anyone
                  else figures out what&apos;s happening.
                </p>
                <p>
                  AI is the latest version of this story. And it&apos;s the most
                  dangerous one yet. Because every previous superpower still
                  needed human labor. Factories needed workers. The internet
                  needed developers. AI is the first amplification event that can
                  eat its own workforce.
                </p>
              </div>
            </div>
          </Reveal>

          {/* Pull quote */}
          <Reveal>
            <blockquote className="border-l-2 border-[#c0392b] pl-8 py-2">
              <p className="font-syne font-bold text-[#e74c3c] text-2xl leading-tight">
                &ldquo;AI is a tool. The most powerful tool humans have ever built.
                And tools don&apos;t have loyalties. They go where you point them.&rdquo;
              </p>
            </blockquote>
          </Reveal>

          <hr className="border-[#222222]" />

          <Reveal>
            <div>
              <p className="text-xs font-medium tracking-widest uppercase text-[#888888] mb-4">
                The Dare
              </p>
              <h2 className="font-syne font-bold text-[#f5f0e8] text-3xl mb-6">
                What We Do About It
              </h2>
              <div className="flex flex-col gap-4 text-[#888888] leading-relaxed">
                <p>
                  What if we pointed AI at teachers buried in paperwork they
                  hate, serving kids who need them present and human and there?
                  What if we pointed it at communities with excess food rotting
                  in restaurant kitchens while people three blocks away go hungry?
                  What if we pointed it at developers — real people, working
                  people — and said: use this for something that matters?
                </p>
                <p>
                  That&apos;s what Worthless Haunted Meat is.
                </p>
                <p>
                  It&apos;s not charity. It&apos;s not a tech company. It&apos;s a group of people
                  who looked at the most powerful technology ever built and
                  decided to aim it differently.
                </p>
              </div>
            </div>
          </Reveal>

          <hr className="border-[#222222]" />

          {/* Mission */}
          <Reveal>
            <div className="text-center py-8">
              <p className="text-xs font-medium tracking-widest uppercase text-[#888888] mb-6">
                Mission
              </p>
              <p
                className="font-syne font-bold text-[#f5f0e8] leading-tight"
                style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)" }}
              >
                We discover what people love — then we use AI to help them do
                more of it, and teach them to bring others along.
              </p>
            </div>
          </Reveal>

          <hr className="border-[#222222]" />

          <Reveal>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/articles/worthless-haunted-meat"
                className="bg-[#c0392b] hover:bg-[#e74c3c] text-[#f5f0e8] font-bold px-8 py-4 rounded-md transition-colors min-h-[44px] flex items-center justify-center text-center"
              >
                Read the Full Story
              </Link>
              <Link
                href="/join"
                className="border border-[#222222] hover:border-[#e74c3c] text-[#f5f0e8] font-bold px-8 py-4 rounded-md transition-colors min-h-[44px] flex items-center justify-center text-center"
              >
                Join the Coalition
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
