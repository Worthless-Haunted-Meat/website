import type { Metadata } from "next";
import Link from "next/link";
import { HeartHandshake, Utensils, Cpu } from "lucide-react";

export const metadata: Metadata = {
  title: "Programs",
  description:
    "The three programs of Worthless Haunted Meat: Community Engagement, Resource Distribution, and Technology Amplification.",
};

const programs = [
  {
    href: "/programs/community-engagement",
    icon: HeartHandshake,
    title: "Community Engagement",
    description:
      "We listen first. An honest instrument for reading what a neighborhood actually wants, built to replace a channel that reaches a tenth of a percent.",
  },
  {
    href: "/programs/resource-distribution",
    icon: Utensils,
    title: "Resource Distribution",
    description:
      "Routing surplus food from the businesses that would bin it to the neighbors who need it — locally, fast, with the record as a by-product.",
  },
  {
    href: "/programs/technology-amplification",
    icon: Cpu,
    title: "Technology Amplification",
    description:
      "Multiplying what people already love, one person and one problem at a time. First program: MoshPit Zero, front-row VR access for wheelchair users at live shows.",
  },
];

export default function ProgramsPage() {
  return (
    <div className="py-24 md:py-32">
      <div className="max-w-4xl mx-auto px-6">
        <p className="text-xs font-medium tracking-widest uppercase text-[#888888] mb-6">
          What We Do
        </p>
        <h1
          className="font-syne font-extrabold text-[#f5f0e8] leading-tight mb-6"
          style={{ fontSize: "clamp(2rem, 5vw, 3.75rem)" }}
        >
          Programs
        </h1>
        <p className="text-[#888888] text-lg leading-relaxed mb-12 max-w-2xl">
          We discover what people love — then we use technology to help them do
          more of it, and teach them to bring others along. Three programs
          carry that mission.
        </p>

        <div className="flex flex-col gap-6">
          {programs.map((p) => (
            <Link
              key={p.href}
              href={p.href}
              className="bg-[#111111] border border-[#222222] border-l-[#c0392b] border-l-2 hover:border-[#e74c3c] rounded-lg p-8 flex flex-col gap-4 transition-colors group"
            >
              <p.icon size={28} strokeWidth={1.5} className="text-[#e74c3c]" aria-hidden="true" />
              <h2 className="font-syne font-bold text-2xl text-[#f5f0e8] group-hover:text-[#e74c3c] transition-colors">
                {p.title}
              </h2>
              <p className="text-[#888888] leading-relaxed">{p.description}</p>
              <p className="text-xs font-medium tracking-widest uppercase text-[#e74c3c]">
                Read more
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
