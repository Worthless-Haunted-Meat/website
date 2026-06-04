import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import JoinForm from "@/components/JoinForm";

export const metadata: Metadata = {
  title: "Join",
  description:
    "Tell us what you love and how you want to help. Join the Worthless Haunted Meat coalition.",
};

export default function JoinPage() {
  return (
    <>
      <section className="py-24 md:py-32 border-b border-[#222222]">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal>
            <p className="text-xs font-medium tracking-widest uppercase text-[#888888] mb-4">
              Get Involved
            </p>
            <h1
              className="font-syne font-extrabold text-[#f5f0e8] leading-tight mb-6"
              style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
            >
              Join the Coalition
            </h1>
            <p className="text-[#888888] text-xl leading-relaxed max-w-2xl">
              We don&apos;t need resumes. We need people who love something and want
              to do more of it. Tell us who you are.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="max-w-3xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
            {/* Context */}
            <div className="lg:col-span-2">
              <Reveal>
                <div className="flex flex-col gap-8">
                  <div>
                    <p className="text-xs font-medium tracking-widest uppercase text-[#888888] mb-3">
                      What Happens Next
                    </p>
                    <p className="text-[#888888] leading-relaxed text-sm">
                      Ricardo reads every message. If there&apos;s a fit, you&apos;ll hear
                      back personally. No newsletter. No drip sequence. Just a
                      conversation.
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-medium tracking-widest uppercase text-[#888888] mb-3">
                      Who We&apos;re Looking For
                    </p>
                    <ul className="text-[#888888] text-sm flex flex-col gap-2 leading-relaxed list-none">
                      <li>— Developers who want to build things that matter</li>
                      <li>— Teachers drowning in paperwork</li>
                      <li>— Community organizers</li>
                      <li>— Anyone who got the look and refused to accept it</li>
                    </ul>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Form */}
            <div className="lg:col-span-3">
              <Reveal delay={0.1}>
                <JoinForm />
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
