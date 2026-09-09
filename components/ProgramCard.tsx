import Link from "next/link";
import { type LucideIcon } from "lucide-react";

interface ProgramCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  href?: string;
}

export default function ProgramCard({ icon: Icon, title, description, href }: ProgramCardProps) {
  const card = (
    <div className="bg-[#111111] border border-[#222222] border-l-[#c0392b] border-l-2 rounded-lg p-8 flex flex-col gap-4 h-full transition-colors hover:border-[#e74c3c]">
      <Icon
        size={28}
        strokeWidth={1.5}
        className="text-[#e74c3c]"
        aria-hidden="true"
      />
      <h3 className="font-syne font-bold text-xl text-[#f5f0e8]">{title}</h3>
      <p className="text-[#888888] leading-relaxed text-sm">{description}</p>
      {href && (
        <p className="text-xs font-medium tracking-widest uppercase text-[#e74c3c] mt-auto">
          Learn more
        </p>
      )}
    </div>
  );
  return href ? <Link href={href} className="block h-full">{card}</Link> : card;
}
