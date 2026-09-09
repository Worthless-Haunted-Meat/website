import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Community Engagement",
  description:
    "We listen first. How Worthless Haunted Meat reads what a neighborhood actually wants before routing a single resource into it.",
};

export default function CommunityEngagementPage() {
  return (
    <div className="py-24 md:py-32">
      <div className="max-w-3xl mx-auto px-6">
        <p className="text-xs font-medium tracking-widest uppercase text-[#888888] mb-6">
          Programs
        </p>
        <h1
          className="font-syne font-extrabold text-[#f5f0e8] leading-tight mb-8"
          style={{ fontSize: "clamp(2rem, 5vw, 3.75rem)" }}
        >
          Community Engagement
        </h1>

        <div className="prose prose-lg max-w-none">
          <p>
            Every program we run starts with the same rule: <strong>we listen
            first</strong>. Not as a slogan — as a design constraint. You cannot
            route resources into a community that never asked for them, and the
            channel our cities currently use to ask is broken.
          </p>
          <p>
            Here is how broken. Researchers who transcribed a decade of city
            council meetings across a hundred and fifteen California cities
            found that roughly <strong>one in a thousand registered voters</strong>{" "}
            speaks at a council meeting in a given year — and those who do skew
            older, whiter, more male, and more likely to own their home. On
            affordable housing specifically, the people who show up
            disproportionately show up to oppose. The one formal instrument we
            have for reading a neighborhood&apos;s will is quiet, and it is
            tilted. We wrote up the full argument in{" "}
            <Link href="/articles/the-tenth-of-a-percent">The Tenth of a Percent</Link>.
          </p>
          <p>
            So this program exists to build a better instrument. Our approach
            is deliberately honest: instead of provoking people with imagery
            engineered to frighten them — a temptation we examined and rejected
            in public — we ask neighborhoods one true question:{" "}
            <em>within a mile of where you&apos;re standing, this much edible food
            goes into a dumpster tonight. What should happen to it?</em> That
            provokes without lying, the anger it produces points at a system
            rather than at a person, and the answers it collects are answers to
            the question we actually asked.
          </p>
          <p>
            What that buys us is siting information you cannot get any other
            way: which block has a church annex with an empty kitchen, which
            neighborhood wants showers more than meals, which corner is dead at
            midnight and who owns it. When resources eventually move —{" "}
            <Link href="/programs/resource-distribution">that&apos;s the next
            program</Link> — they land where a neighborhood chose, not where an
            organization guessed.
          </p>
          <p>
            <strong>Where this stands today:</strong> we are a young
            organization and we say so plainly. The research is published on
            this site as a seven-part series beginning with{" "}
            <Link href="/articles/nobodys-job">Nobody&apos;s Job</Link>. Our
            board is seated and governing through our board portal. Our
            coalition of volunteers and builders is forming now — the survey
            work described above is what they will run first, one neighborhood
            at a time.
          </p>
          <p>
            If listening before building sounds like your kind of work,{" "}
            <Link href="/join">join the coalition</Link> or{" "}
            <Link href="/contact">get in touch</Link>.
          </p>
        </div>
      </div>
    </div>
  );
}
