import type { Metadata } from "next";
import Link from "next/link";
import { Mail, Phone, MapPin, Landmark } from "lucide-react";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Worthless Haunted Meat, a Texas 501(c)(3) nonprofit corporation. EIN 99-2244505.",
};

export default function ContactPage() {
  return (
    <div className="py-24 md:py-32">
      <div className="max-w-3xl mx-auto px-6">
        <p className="text-xs font-medium tracking-widest uppercase text-[#888888] mb-6">
          Contact
        </p>
        <h1
          className="font-syne font-extrabold text-[#f5f0e8] leading-tight mb-6"
          style={{ fontSize: "clamp(2rem, 5vw, 3.75rem)" }}
        >
          Talk to us
        </h1>
        <p className="text-[#888888] text-lg leading-relaxed mb-12 max-w-2xl">
          Whether you run a restaurant with surplus food, a venue with an
          accessible seating section, a neighborhood with an opinion, or a
          Saturday you want to count for something — we answer.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <a
            href={`mailto:${site.email}`}
            className="bg-[#111111] border border-[#222222] hover:border-[#e74c3c] rounded-lg p-6 flex items-start gap-4 transition-colors"
          >
            <Mail className="w-5 h-5 text-[#e74c3c] mt-1 shrink-0" strokeWidth={1.75} />
            <div>
              <p className="font-syne font-bold text-[#f5f0e8] mb-1">Email</p>
              <p className="text-[#888888] text-sm break-all">{site.email}</p>
            </div>
          </a>

          <a
            href={site.phoneHref}
            className="bg-[#111111] border border-[#222222] hover:border-[#e74c3c] rounded-lg p-6 flex items-start gap-4 transition-colors"
          >
            <Phone className="w-5 h-5 text-[#e74c3c] mt-1 shrink-0" strokeWidth={1.75} />
            <div>
              <p className="font-syne font-bold text-[#f5f0e8] mb-1">Phone</p>
              <p className="text-[#888888] text-sm">{site.phone}</p>
            </div>
          </a>

          <div className="bg-[#111111] border border-[#222222] rounded-lg p-6 flex items-start gap-4">
            <MapPin className="w-5 h-5 text-[#e74c3c] mt-1 shrink-0" strokeWidth={1.75} />
            <div>
              <p className="font-syne font-bold text-[#f5f0e8] mb-1">Mail</p>
              <p className="text-[#888888] text-sm leading-relaxed">
                {site.mailingAddress.line1}
                <br />
                {site.mailingAddress.line2}
                <br />
                {site.mailingAddress.line3}
              </p>
            </div>
          </div>

          <div className="bg-[#111111] border border-[#222222] rounded-lg p-6 flex items-start gap-4">
            <Landmark className="w-5 h-5 text-[#e74c3c] mt-1 shrink-0" strokeWidth={1.75} />
            <div>
              <p className="font-syne font-bold text-[#f5f0e8] mb-1">Legal</p>
              <p className="text-[#888888] text-sm leading-relaxed">
                Worthless Haunted Meat is a Texas 501(c)(3) nonprofit
                corporation.
                <br />
                EIN {site.ein}
              </p>
            </div>
          </div>
        </div>

        <div className="border border-[#222222] rounded-lg p-8">
          <h2 className="font-syne font-bold text-[#f5f0e8] text-2xl mb-3">
            Want to do more than talk?
          </h2>
          <p className="text-[#888888] leading-relaxed mb-6">
            Tell us what you love and how you want to help — that&apos;s the
            whole intake form.
          </p>
          <Link
            href="/join"
            className="inline-block bg-[#c0392b] hover:bg-[#e74c3c] text-[#f5f0e8] font-bold px-8 py-4 rounded-md transition-colors"
          >
            Join the Coalition
          </Link>
        </div>
      </div>
    </div>
  );
}
