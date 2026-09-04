import type { Metadata } from "next";
import Link from "next/link";
import { Utensils, Users, Cpu, ShieldCheck } from "lucide-react";
import Reveal from "@/components/Reveal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Donate",
  description:
    "Support Worthless Haunted Meat, a Texas 501(c)(3) public charity. Contributions are tax-deductible to the extent allowed by law.",
  alternates: { canonical: "/donate" },
};

const uses = [
  {
    icon: Utensils,
    title: "Resource Distribution",
    body: "Building and running the mobile platform that moves surplus food from restaurants and businesses to shelters and the people who need it — driven by community volunteers.",
  },
  {
    icon: Users,
    title: "Community Engagement",
    body: "Surveys, conversations, and on-the-ground listening so resources go where communities say they are needed, not where we assume.",
  },
  {
    icon: Cpu,
    title: "Technology Amplification",
    body: "Putting practical tools — and training — in the hands of teachers, organizers, and working people so they can do more of what they love.",
  },
];

export default function DonatePage() {
  const { donateUrl, mailingAddress, email, ein } = site;

  return (
    <>
      {/* Hero */}
      <section className="py-24 md:py-32 border-b border-[#222222]">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal>
            <p className="text-xs font-medium tracking-widest uppercase text-[#888888] mb-4">
              Donate
            </p>
            <h1
              className="font-syne font-extrabold text-[#f5f0e8] leading-tight mb-6"
              style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
            >
              Point It at Someone Who Needs It.
            </h1>
            <p className="text-[#888888] text-xl leading-relaxed max-w-2xl mb-10">
              Worthless Haunted Meat is a volunteer-run Texas 501(c)(3) public
              charity. Every dollar goes to programs, not payroll. Your gift is
              tax-deductible to the extent allowed by law.
            </p>
            {donateUrl && (
              <a
                href={donateUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-[#c0392b] hover:bg-[#e74c3c] text-[#f5f0e8] font-bold px-10 py-4 rounded-md transition-colors min-h-[44px]"
              >
                Give Online
              </a>
            )}
          </Reveal>
        </div>
      </section>

      {/* Where it goes */}
      <section className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal>
            <p className="text-xs font-medium tracking-widest uppercase text-[#888888] mb-3">
              Where Your Money Goes
            </p>
            <h2
              className="font-syne font-bold text-[#f5f0e8] mb-16"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
            >
              Three Programs. No Overhead Theater.
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {uses.map((u, i) => (
              <Reveal key={u.title} delay={i * 0.1}>
                <div className="border border-[#222222] rounded-lg p-8 bg-[#111111] h-full">
                  <u.icon className="text-[#e74c3c] mb-6" size={28} strokeWidth={1.5} />
                  <h3 className="font-syne font-bold text-[#f5f0e8] text-xl mb-3">
                    {u.title}
                  </h3>
                  <p className="text-[#888888] text-sm leading-relaxed">{u.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Ways to give */}
      <section className="py-24 md:py-32 bg-[#111111] border-y border-[#222222]">
        <div className="max-w-3xl mx-auto px-6 flex flex-col gap-16">
          <Reveal>
            <p className="text-xs font-medium tracking-widest uppercase text-[#888888] mb-3">
              Ways to Give
            </p>
            <h2
              className="font-syne font-bold text-[#f5f0e8]"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
            >
              How to Donate
            </h2>
          </Reveal>

          {donateUrl && (
            <Reveal>
              <div>
                <h3 className="font-syne font-bold text-[#f5f0e8] text-2xl mb-4">Online</h3>
                <p className="text-[#888888] leading-relaxed mb-6">
                  Give by card or bank transfer through our secure donation page.
                  One-time or monthly. You&apos;ll receive a receipt by email.
                </p>
                <a
                  href={donateUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center bg-[#c0392b] hover:bg-[#e74c3c] text-[#f5f0e8] font-bold px-8 py-4 rounded-md transition-colors min-h-[44px]"
                >
                  Give Online
                </a>
              </div>
            </Reveal>
          )}

          <Reveal>
            <div>
              <h3 className="font-syne font-bold text-[#f5f0e8] text-2xl mb-4">By Mail</h3>
              <p className="text-[#888888] leading-relaxed mb-6">
                Make checks payable to <span className="text-[#f5f0e8]">Worthless Haunted Meat</span> and
                send to:
              </p>
              <address className="not-italic font-mono text-sm text-[#f5f0e8] border border-[#222222] rounded-md p-6 bg-[#0a0a0a] leading-relaxed">
                {mailingAddress.line1}
                <br />
                {mailingAddress.line2}
                <br />
                {mailingAddress.line3}
              </address>
            </div>
          </Reveal>

          <Reveal>
            <div>
              <h3 className="font-syne font-bold text-[#f5f0e8] text-2xl mb-4">
                Larger Gifts, In-Kind, and Partnerships
              </h3>
              <p className="text-[#888888] leading-relaxed">
                Restaurants with surplus food, businesses with equipment or vehicles,
                developers with time, foundations with grants — email{" "}
                <a
                  href={`mailto:${email}?subject=Donation%20inquiry`}
                  className="text-[#e74c3c] hover:text-[#f5f0e8] transition-colors"
                >
                  {email}
                </a>{" "}
                and Ricardo will reply personally.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Tax + transparency */}
      <section className="py-24 md:py-32">
        <div className="max-w-3xl mx-auto px-6">
          <Reveal>
            <div className="border border-[#222222] rounded-lg p-8 md:p-10 bg-[#111111]">
              <div className="flex items-center gap-3 mb-6">
                <ShieldCheck className="text-[#e74c3c]" size={24} strokeWidth={1.5} />
                <p className="text-xs font-medium tracking-widest uppercase text-[#888888]">
                  Tax Status &amp; Transparency
                </p>
              </div>
              <ul className="flex flex-col gap-4 text-[#888888] text-sm leading-relaxed list-none">
                <li>
                  <span className="text-[#f5f0e8] font-medium">Legal name:</span> Worthless
                  Haunted Meat, a Texas nonprofit corporation.
                </li>
                <li>
                  <span className="text-[#f5f0e8] font-medium">Status:</span> IRS-recognized
                  501(c)(3) public charity under IRC 170(b)(1)(A)(vi), tax-exempt since
                  March 2024.
                </li>
                <li>
                  <span className="text-[#f5f0e8] font-medium">EIN:</span>{" "}
                  <span className="font-mono">{ein}</span>
                </li>
                <li>
                  <span className="text-[#f5f0e8] font-medium">Deductibility:</span>{" "}
                  Contributions are tax-deductible to the extent permitted by law. No
                  goods or services are provided in exchange for donations.
                </li>
                <li>
                  <span className="text-[#f5f0e8] font-medium">Filings:</span> We file IRS
                  Form 990-N annually. Our IRS determination letter and filings are
                  available on request at{" "}
                  <a
                    href={`mailto:${email}`}
                    className="text-[#e74c3c] hover:text-[#f5f0e8] transition-colors"
                  >
                    {email}
                  </a>
                  .
                </li>
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-16 flex flex-col sm:flex-row gap-4">
              <Link
                href="/join"
                className="border border-[#222222] hover:border-[#e74c3c] text-[#f5f0e8] font-bold px-8 py-4 rounded-md transition-colors min-h-[44px] flex items-center justify-center text-center"
              >
                Give Your Time Instead
              </Link>
              <Link
                href="/about"
                className="border border-[#222222] hover:border-[#e74c3c] text-[#f5f0e8] font-bold px-8 py-4 rounded-md transition-colors min-h-[44px] flex items-center justify-center text-center"
              >
                Why We Exist
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
