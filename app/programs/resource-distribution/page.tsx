import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Resource Distribution",
  description:
    "Routing surplus food from the businesses that would bin it to the neighbors who need it — locally, fast, with a record as the by-product.",
};

export default function ResourceDistributionPage() {
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
          Resource Distribution
        </h1>

        <div className="prose prose-lg max-w-none">
          <p>
            Behind a strip mall near you, at about eleven at night, a shift
            manager carries roughly four hundred dollars of edible food to a
            dumpster. Not because he fears being sued — the Bill Emerson Good
            Samaritan Act has protected good-faith food donation since 1996 —
            but because <strong>throwing it away is a solved problem and giving
            it away isn&apos;t</strong>. We walk through the math in{" "}
            <Link href="/articles/the-dumpster-math">The Dumpster Math</Link>.
          </p>
          <p>
            Surplus food is a decaying asset: its value has a half-life
            measured in hours, so it must be routed locally or not at all.
            That rules out the warehouse-and-truck model for perishables and
            dictates the design of what we are building — a dispatch system
            with three parts:
          </p>
          <ul>
            <li>
              <strong>A designated spot, one tap.</strong> The provider puts
              surplus in an agreed crate and taps once. Donating becomes a
              thirty-second solved problem, like the dumpster.
            </li>
            <li>
              <strong>Runners.</strong> Neighbors with an empty back seat at
              the hour when almost nothing else is moving. For some of them —
              people rebuilding a life who need a place to be at midnight and
              proof they were useful — the route matters as much as the food.
              Their story is in <Link href="/articles/runners">Runners</Link>.
            </li>
            <li>
              <strong>A ledger as exhaust.</strong> Every pickup produces a
              timestamped, itemized record with no paperwork: the provider gets
              an auditable report, the runner gets verified hours, the
              neighborhood gets a public number. The documentation burden that
              kills most donation programs becomes the by-product that
              justifies this one.
            </li>
          </ul>
          <p>
            Where the food lands is chosen by the neighborhood itself, through
            the honest survey work of our{" "}
            <Link href="/programs/community-engagement">Community
            Engagement</Link> program — because a delivery system with no
            legitimate address is just trespassing with extra steps. What that
            looks like in practice is in{" "}
            <Link href="/articles/the-end-of-the-pipe">The End of the Pipe</Link>.
          </p>
          <p>
            <strong>Where this stands today:</strong> the system is designed
            and published — openly, on this site — and the organization behind
            it is real: a seated board, a governing portal, and a forming
            coalition of providers, runners, and builders in the Dallas–Fort
            Worth area, where we are headquartered. We are recruiting the
            first providers and the first neighborhood now. We publish our
            plans before our victories on purpose; when the first route runs,
            you will read the real numbers here.
          </p>
          <p>
            Run a restaurant, a bakery, a grocery — or a car after midnight?{" "}
            <Link href="/join">Join the coalition</Link> or{" "}
            <Link href="/contact">contact us</Link>.
          </p>
        </div>
      </div>
    </div>
  );
}
