import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Technology Amplification",
  description:
    "We take what people already love and use technology to multiply it — then teach them to pass that power on. First program: MoshPit Zero.",
};

export default function TechnologyAmplificationPage() {
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
          Technology Amplification
        </h1>

        <div className="prose prose-lg max-w-none">
          <p>
            Everybody loves something, and almost nobody has ever been able to
            make a living — or a life — from it. The reason usually isn&apos;t
            talent. It&apos;s overhead: the registration, the scheduling, the
            website, the paperwork that stands between a person and the thing
            they&apos;re actually good at. In the last few years the cost of
            clearing that overhead has collapsed, and this program exists to
            point that collapse at people it would never reach on its own.
          </p>
          <p>
            We apply one test before we build anything, and we hold ourselves
            to it publicly: <strong>whose work does the technology take, and
            where does the released value go?</strong> If it takes work someone
            wanted to do and the value pools with whoever owns the system, we
            walk away. If it takes work nobody wanted — friction, paperwork,
            barriers — and releases value with nowhere to pool, we build it.
          </p>
          <p>
            <strong>Our first program under this banner is MoshPit Zero</strong>:
            live, front-row VR access for wheelchair users and mobility-limited
            concert-goers. A 180° camera on the stage rail streams in real time
            to headsets in the accessible seating area, so the video matches
            the artist the viewer is hearing live in the room. Wheelchair users
            almost never get the rail; this closes the gap with roughly $3,000
            of off-the-shelf hardware and free software. The specification is
            complete and published under the GPL — the whole recipe, free for
            any venue, festival, or fan to replicate — at{" "}
            <a
              href="https://github.com/Worthless-Haunted-Meat/moshpit-zero"
              target="_blank"
              rel="noopener noreferrer"
            >
              github.com/Worthless-Haunted-Meat/moshpit-zero
            </a>
            . The build sequence is spec → bench prototype → appliance → first
            show, and we publish progress as it happens, not after.
          </p>
          <p>
            The second practice in this program is deliberately small:{" "}
            <strong>one person, one problem.</strong> Find someone who is
            excellent at something they do for free — coaching, baking,
            fixing, teaching — and spend a weekend building the scaffolding
            that turns it into income: the booking page, the payment link, the
            waiver, the site. Not a platform. Not a cohort. One person, all
            the way to done, then the next one. That&apos;s also how we teach:
            everyone we help is asked to pass the favor on.
          </p>
          <p>
            <strong>Where this stands today:</strong> MoshPit Zero is in
            specification, honestly labeled as such, with the bench prototype
            as the next milestone. The one-person-one-problem work runs
            continuously through our coalition. Everything we build is shared
            in the open at{" "}
            <a
              href="https://github.com/Worthless-Haunted-Meat"
              target="_blank"
              rel="noopener noreferrer"
            >
              github.com/Worthless-Haunted-Meat
            </a>
            .
          </p>
          <p>
            If you build things and want your Saturday to count for something,{" "}
            <Link href="/join">join the coalition</Link> or{" "}
            <Link href="/contact">get in touch</Link>.
          </p>
        </div>
      </div>
    </div>
  );
}
