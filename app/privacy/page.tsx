import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Worthless Haunted Meat collects, uses, and protects the information you share with us.",
  alternates: { canonical: "/privacy" },
};

const updated = "September 4, 2026";

export default function PrivacyPage() {
  return (
    <>
      <section className="py-24 md:py-32 border-b border-[#222222]">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal>
            <p className="text-xs font-medium tracking-widest uppercase text-[#888888] mb-4">
              Legal
            </p>
            <h1
              className="font-syne font-extrabold text-[#f5f0e8] leading-tight mb-6"
              style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
            >
              Privacy Policy
            </h1>
            <p className="text-[#888888] text-lg">Last updated {updated}</p>
          </Reveal>
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="max-w-3xl mx-auto px-6">
          <Reveal>
            <div className="prose prose-invert max-w-none text-[#888888] leading-relaxed">
              <p>
                Worthless Haunted Meat (&ldquo;WHM,&rdquo; &ldquo;we,&rdquo; &ldquo;us&rdquo;) is a
                Texas 501(c)(3) nonprofit corporation. This policy explains what
                information we collect on{" "}
                <a href={site.url}>worthlesshauntedmeat.org</a>, why we collect it,
                and what we do with it. The short version: we collect as little as
                possible, we never sell it, and we don&apos;t run ads or trackers.
              </p>

              <h2>What we collect</h2>
              <h3>Information you give us</h3>
              <p>
                When you use the <a href="/join">Join</a> form we receive the name and
                email address you enter, plus anything you write in the optional
                message fields. When you email or call us we receive whatever you
                choose to share.
              </p>
              <h3>Information collected automatically</h3>
              <p>
                Our host, Vercel, keeps standard server logs (IP address, browser
                type, pages requested, timestamps) for security and troubleshooting.
                We do not use analytics scripts, advertising networks, or third-party
                tracking pixels. Fonts are served from our own domain, so no font
                requests go to Google.
              </p>
              <h3>Cookies</h3>
              <p>
                The public site sets no cookies. The Board Portal, which is available
                only to invited directors, sets a single session cookie so a director
                stays signed in. It contains no tracking identifiers.
              </p>

              <h2>How we use it</h2>
              <ul>
                <li>To reply to you. Join-form submissions are emailed to our
                  organizational inbox and read by a person.</li>
                <li>To operate and secure the website.</li>
                <li>To issue donation receipts and meet our legal obligations as a
                  charity.</li>
              </ul>
              <p>
                We do not send newsletters or marketing email, and we don&apos;t add you
                to a list because you contacted us.
              </p>

              <h2>Who we share it with</h2>
              <p>
                We never sell or rent personal information. We share it only with
                service providers who help us run the site, and only as needed:
              </p>
              <ul>
                <li><strong>Vercel</strong> hosts the website and keeps server logs.</li>
                <li><strong>Resend</strong> delivers Join-form submissions to our inbox.</li>
                <li><strong>Google (Gmail)</strong> stores our email.</li>
                <li>
                  If you donate online, payment is handled by a third-party processor
                  on its own secure page. We never see or store your card number.
                </li>
              </ul>
              <p>
                We may also disclose information if required by law or to protect the
                rights and safety of WHM or others.
              </p>

              <h2>Donor privacy</h2>
              <p>
                We do not sell, trade, or share donor names or contact information
                with any other organization, and we do not send donor mailings on
                behalf of others. Donor records are kept only as long as needed for
                receipting and IRS compliance.
              </p>

              <h2>Retention</h2>
              <p>
                Contact-form emails are kept in our inbox until the conversation is
                over and then deleted on a periodic basis. Server logs are retained by
                Vercel per its standard policy. Financial records are kept as long as
                the IRS requires.
              </p>

              <h2>Your choices</h2>
              <p>
                Email <a href={`mailto:${site.email}`}>{site.email}</a> and we will
                tell you what we hold about you, correct it, or delete it. There is no
                form to fill out — just ask.
              </p>

              <h2>Children</h2>
              <p>
                This site is not directed at children under 13 and we do not
                knowingly collect information from them. If you believe a child has
                sent us information, contact us and we will delete it.
              </p>

              <h2>Security</h2>
              <p>
                The entire site is served over HTTPS. We limit access to our inbox
                and hosting accounts to the people who need it to run the
                organization.
              </p>

              <h2>Changes</h2>
              <p>
                If this policy changes we will update the date at the top of this
                page. Material changes will be noted here.
              </p>

              <h2>Contact</h2>
              <p>
                Worthless Haunted Meat
                <br />
                {site.mailingAddress.line2}
                <br />
                {site.mailingAddress.line3}
                <br />
                <a href={`mailto:${site.email}`}>{site.email}</a> ·{" "}
                <a href={site.phoneHref}>{site.phone}</a>
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
