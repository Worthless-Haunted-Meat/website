import Link from "next/link";
import { cn } from "@/lib/utils";

const tabs = [
  { href: "/board", label: "Invitation" },
  { href: "/board/risks", label: "Risks & Responsibilities" },
  { href: "/board/documents", label: "Documents" },
  { href: "/board/vote", label: "Vote" },
];

export default function BoardTabs({ activeHref }: { activeHref: string }) {
  return (
    <div
      className="border-b border-[#222222] mb-12 overflow-x-auto"
      role="tablist"
      aria-label="Board sections"
    >
      <div className="flex gap-6 min-w-max">
        {tabs.map((tab) => {
          const active = tab.href === activeHref;
          return (
            <Link
              key={tab.href}
              href={tab.href}
              role="tab"
              aria-selected={active}
              className={cn(
                "text-sm font-medium tracking-widest uppercase pb-4 border-b-2 transition-colors whitespace-nowrap",
                active
                  ? "text-[#e74c3c] border-[#c0392b]"
                  : "text-[#888888] border-transparent hover:text-[#f5f0e8]"
              )}
            >
              {tab.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
