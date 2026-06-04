import { type LucideIcon } from "lucide-react";

interface ProgramCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export default function ProgramCard({ icon: Icon, title, description }: ProgramCardProps) {
  return (
    <div className="bg-[#111111] border border-[#222222] border-l-[#c0392b] border-l-2 rounded-lg p-8 flex flex-col gap-4">
      <Icon
        size={28}
        strokeWidth={1.5}
        className="text-[#e74c3c]"
        aria-hidden="true"
      />
      <h3 className="font-syne font-bold text-xl text-[#f5f0e8]">{title}</h3>
      <p className="text-[#888888] leading-relaxed text-sm">{description}</p>
    </div>
  );
}
