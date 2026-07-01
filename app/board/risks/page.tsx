import type { Metadata } from "next";
import Link from "next/link";
import { Shield, AlertTriangle, CheckCircle2, Scale, FileText } from "lucide-react";
import BoardTabs from "@/components/BoardTabs";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Board Member Risks & Responsibilities",
  description:
    "A plain-English disclosure of the legal duties, personal risks, and protections that come with serving on the Worthless Haunted Meat board.",
};

export default function BoardRisksPage() {
  return (
    <div className="py-24 md:py-32">
      <div className="max-w-3xl mx-auto px-6">
        <p className="text-xs font-medium tracking-widest uppercase text-[#888888] mb-6">
          Board Portal
        </p>
        <BoardTabs activeHref="/board/risks" />

        <Reveal>
          <h1
            className="font-syne font-extrabold text-[#f5f0e8] leading-tight mb-6"
            style={{ fontSize: "clamp(2rem, 5vw, 3.75rem)" }}
          >
            Board Member Risks &amp; Responsibilities
          </h1>
          <p className="text-[#888888] text-lg leading-relaxed mb-4">
            Serving on a nonprofit board is a real commitment with real legal
            responsibilities. This page is a plain-English summary of what those
            look like at Worthless Haunted Meat — what the law requires, what
            protects you, and where the honest edges of risk actually live.
          </p>
          <p className="text-[#888888] text-sm italic leading-relaxed">
            This is disclosure, not legal advice. If any part of it matters to
            your decision, talk to your own attorney. We&apos;d rather you ask now
            than feel surprised later.
          </p>
        </Reveal>

        <hr className="border-[#222222] my-16" />

        {/* Duties */}
        <Reveal>
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Scale className="w-5 h-5 text-[#e74c3c]" strokeWidth={1.75} />
              <p className="text-xs font-medium tracking-widest uppercase text-[#888888]">
                What the Law Requires
              </p>
            </div>
            <h2 className="font-syne font-bold text-[#f5f0e8] text-3xl mb-8">
              Three Core Duties Under Texas Law
            </h2>
            <div className="flex flex-col gap-8">
              <div>
                <h3 className="font-syne font-bold text-[#f5f0e8] text-xl mb-2">
                  Duty of Care
                </h3>
                <p className="text-[#888888] leading-relaxed">
                  Make reasonably informed decisions. Show up to meetings. Read
                  the materials before you vote. Ask questions when something
                  doesn&apos;t make sense. Care is not about being an expert — it&apos;s
                  about paying attention.
                </p>
              </div>
              <div>
                <h3 className="font-syne font-bold text-[#f5f0e8] text-xl mb-2">
                  Duty of Loyalty
                </h3>
                <p className="text-[#888888] leading-relaxed">
                  Put the organization&apos;s interests ahead of your own. No
                  self-dealing. Disclose conflicts of interest before they
                  become a problem. If a business opportunity comes to you
                  because you sit on this board, it belongs to the organization
                  first.
                </p>
              </div>
              <div>
                <h3 className="font-syne font-bold text-[#f5f0e8] text-xl mb-2">
                  Duty of Obedience
                </h3>
                <p className="text-[#888888] leading-relaxed">
                  Keep the organization true to its stated mission and its legal
                  obligations — the bylaws, the 501(c)(3) rules, state and
                  federal filings. If we ever drift from the mission, board
                  members are the guardrail.
                </p>
              </div>
            </div>
          </section>
        </Reveal>

        <hr className="border-[#222222] my-16" />

        {/* Protections */}
        <Reveal>
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-5 h-5 text-[#e74c3c]" strokeWidth={1.75} />
              <p className="text-xs font-medium tracking-widest uppercase text-[#888888]">
                What Protects You
              </p>
            </div>
            <h2 className="font-syne font-bold text-[#f5f0e8] text-3xl mb-8">
              What You Are NOT Personally Responsible For
            </h2>
            <div className="flex flex-col gap-6 text-[#888888] leading-relaxed">
              <p>
                <strong className="text-[#f5f0e8]">Corporate liability shield.</strong>{" "}
                Worthless Haunted Meat is a registered Texas nonprofit
                corporation. That structure protects board members from the
                organization&apos;s financial obligations the same way an LLC
                protects its owners. If the nonprofit fails, creditors
                cannot come after your personal assets simply because you
                served on the board.
              </p>
              <p>
                <strong className="text-[#f5f0e8]">Texas Charitable Immunity and Liability Act.</strong>{" "}
                Texas has strong volunteer-protection laws that shield
                nonprofit board members from personal liability for good-faith
                decisions made in service of the mission. If you show up and
                act honestly, the law is on your side.
              </p>
              <p>
                <strong className="text-[#f5f0e8]">Ordinary mistakes are not personal exposure.</strong>{" "}
                Getting a decision wrong is not a lawsuit. Choosing a strategy
                that doesn&apos;t work is not a lawsuit. Good-faith judgment calls,
                even bad ones, are what boards are for.
              </p>
            </div>
          </section>
        </Reveal>

        <hr className="border-[#222222] my-16" />

        {/* Where risk lives */}
        <Reveal>
          <section>
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="w-5 h-5 text-[#e74c3c]" strokeWidth={1.75} />
              <p className="text-xs font-medium tracking-widest uppercase text-[#888888]">
                The Honest Exceptions
              </p>
            </div>
            <h2 className="font-syne font-bold text-[#f5f0e8] text-3xl mb-8">
              Where Real Risk Lives
            </h2>
            <p className="text-[#888888] leading-relaxed mb-6">
              The protections above are broad, but they are not absolute. The
              exceptions are narrow, well-known, and worth knowing:
            </p>
            <ul className="flex flex-col gap-6 text-[#888888] leading-relaxed list-none">
              <li>
                <strong className="text-[#f5f0e8]">Personal guarantees.</strong>{" "}
                If you personally sign a loan or contract on behalf of the
                organization, you are personally on the hook for it. This is
                separate from being a board member — it&apos;s something you would
                have to explicitly agree to, in writing. Don&apos;t sign a
                personal guarantee without your attorney.
              </li>
              <li>
                <strong className="text-[#f5f0e8]">Unpaid payroll taxes.</strong>{" "}
                If there are employees and payroll taxes go unpaid, the IRS
                has the authority to pursue board members personally under the
                Trust Fund Recovery Penalty. As of today,{" "}
                <em className="text-[#f5f0e8] not-italic">WHM has zero employees and zero payroll</em>{" "}
                — so this exposure does not currently exist.
              </li>
              <li>
                <strong className="text-[#f5f0e8]">Fraud or gross negligence.</strong>{" "}
                Volunteer immunity does not protect intentional wrongdoing or
                reckless disregard for the organization&apos;s obligations. If you
                are acting in good faith, this does not apply.
              </li>
              <li>
                <strong className="text-[#f5f0e8]">Excise taxes on self-dealing.</strong>{" "}
                Board members who financially benefit from transactions with
                the organization can face IRS excise taxes. This is why the
                Duty of Loyalty and conflict-of-interest disclosures matter.
              </li>
            </ul>
          </section>
        </Reveal>

        <hr className="border-[#222222] my-16" />

        {/* Current profile */}
        <Reveal>
          <section>
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle2 className="w-5 h-5 text-[#e74c3c]" strokeWidth={1.75} />
              <p className="text-xs font-medium tracking-widest uppercase text-[#888888]">
                Where We Stand Today
              </p>
            </div>
            <h2 className="font-syne font-bold text-[#f5f0e8] text-3xl mb-8">
              Current Risk Profile
            </h2>
            <p className="text-[#888888] leading-relaxed mb-6">
              Practically speaking, Worthless Haunted Meat is at the lowest
              end of the risk spectrum for a nonprofit board:
            </p>
            <ul className="flex flex-col gap-3 text-[#888888] leading-relaxed list-none">
              <li>— Zero revenue</li>
              <li>— Zero employees, zero payroll</li>
              <li>— Zero outstanding debt</li>
              <li>— Zero pending or threatened litigation</li>
              <li>— No personal guarantees on any contract</li>
              <li>— Tax-exempt status current with the IRS</li>
              <li>— Annual filings up to date (990-N e-Postcard, TX Franchise Tax)</li>
            </ul>
            <p className="text-[#888888] leading-relaxed mt-6">
              This will change as the organization grows. When we take on
              revenue, employees, or contracts, we&apos;ll update this page and put
              Directors and Officers (D&amp;O) insurance in place to add another
              layer of protection over the board.
            </p>
          </section>
        </Reveal>

        <hr className="border-[#222222] my-16" />

        {/* Consult attorney */}
        <Reveal>
          <section>
            <div className="flex items-center gap-3 mb-4">
              <FileText className="w-5 h-5 text-[#e74c3c]" strokeWidth={1.75} />
              <p className="text-xs font-medium tracking-widest uppercase text-[#888888]">
                Before You Say Yes
              </p>
            </div>
            <h2 className="font-syne font-bold text-[#f5f0e8] text-3xl mb-6">
              Talk to Your Own Attorney
            </h2>
            <p className="text-[#888888] leading-relaxed">
              We would rather you take this decision seriously than take it
              lightly. If any of the above raises a question you can&apos;t
              answer, call a lawyer you trust before you sign anything. If you
              don&apos;t have one, tell us — we&apos;ll help you find someone.
            </p>
          </section>
        </Reveal>

        <hr className="border-[#222222] my-16" />

        {/* CTA */}
        <Reveal>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/board"
              className="border border-[#222222] hover:border-[#e74c3c] text-[#f5f0e8] font-bold px-8 py-4 rounded-md transition-colors min-h-[44px] flex items-center justify-center text-center"
            >
              Read the Board Invitation
            </Link>
            <a
              href="mailto:worthlesshauntedmeat@gmail.com?subject=Board%20service%20questions"
              className="bg-[#c0392b] hover:bg-[#e74c3c] text-[#f5f0e8] font-bold px-8 py-4 rounded-md transition-colors min-h-[44px] flex items-center justify-center text-center"
            >
              Email Us With Questions
            </a>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
