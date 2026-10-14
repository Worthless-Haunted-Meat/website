import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, Clock, AlertTriangle, Users, ListChecks, CalendarDays, History, MapPin } from "lucide-react";
import BoardTabs from "@/components/BoardTabs";
import Reveal from "@/components/Reveal";
import { boardStatus, type StatusLevel } from "@/lib/boardStatus";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Board Status",
  description: "Where Worthless Haunted Meat stands with the State of Texas, the IRS and its own board.",
};

const levelStyle: Record<StatusLevel, { icon: typeof CheckCircle2; text: string; border: string }> = {
  good: { icon: CheckCircle2, text: "text-[#7fbf7f]", border: "border-[#2f4f2f]" },
  pending: { icon: Clock, text: "text-[#e0b050]", border: "border-[#4f4320]" },
  action: { icon: AlertTriangle, text: "text-[#e74c3c]", border: "border-[#5a2420]" },
};

function SectionHeader({ icon: Icon, eyebrow, title }: { icon: typeof CheckCircle2; eyebrow: string; title: string }) {
  return (
    <>
      <div className="flex items-center gap-3 mb-4">
        <Icon className="w-5 h-5 text-[#e74c3c]" strokeWidth={1.75} />
        <p className="text-xs font-medium tracking-widest uppercase text-[#888888]">{eyebrow}</p>
      </div>
      <h2 className="font-syne font-bold text-[#f5f0e8] text-3xl mb-8">{title}</h2>
    </>
  );
}

export default function BoardStatusPage() {
  const s = boardStatus;

  return (
    <div className="py-24 md:py-32">
      <div className="max-w-3xl mx-auto px-6">
        <p className="text-xs font-medium tracking-widest uppercase text-[#888888] mb-6">
          Board Portal
        </p>
        <BoardTabs activeHref="/board/status" />

        <Reveal>
          <h1
            className="font-syne font-extrabold text-[#f5f0e8] leading-tight mb-6"
            style={{ fontSize: "clamp(2rem, 5vw, 3.75rem)" }}
          >
            Where We Stand
          </h1>
          <p className="text-[#888888] text-lg leading-relaxed mb-4">
            The organization&apos;s standing with the State of Texas and the IRS,
            what the board still needs to do, and what&apos;s coming up.
          </p>
          <p className="text-[#888888] text-sm italic">Last updated {s.updated}.</p>
        </Reveal>

        <hr className="border-[#222222] my-16" />

        <Reveal>
          <section>
            <SectionHeader icon={CheckCircle2} eyebrow="Standing" title="Good Standing Checklist" />
            <div className="grid gap-4 sm:grid-cols-2">
              {s.standing.map((item) => {
                const style = levelStyle[item.level];
                const Icon = style.icon;
                return (
                  <div key={item.label} className={cn("border rounded-md p-5", style.border)}>
                    <p className="text-xs font-medium tracking-widest uppercase text-[#888888] mb-2">
                      {item.label}
                    </p>
                    <p className={cn("flex items-center gap-2 font-syne font-bold text-xl mb-3", style.text)}>
                      <Icon className="w-5 h-5" strokeWidth={2} />
                      {item.value}
                    </p>
                    <p className="text-[#888888] text-sm leading-relaxed">{item.detail}</p>
                  </div>
                );
              })}
            </div>
          </section>
        </Reveal>

        <hr className="border-[#222222] my-16" />

        <Reveal>
          <section>
            <SectionHeader icon={ListChecks} eyebrow="Open Items" title="What Still Needs Doing" />
            <ol className="flex flex-col gap-8 list-none">
              {s.openItems.map((item, i) => (
                <li key={item.title} className="flex gap-4">
                  <span className="font-syne font-bold text-[#e74c3c] text-xl w-6 shrink-0">{i + 1}</span>
                  <div>
                    <h3 className="font-syne font-bold text-[#f5f0e8] text-xl mb-1">{item.title}</h3>
                    <p className="text-xs font-medium tracking-widest uppercase text-[#888888] mb-2">
                      {item.owner}
                      {item.due ? ` · ${item.due}` : ""}
                    </p>
                    <p className="text-[#888888] leading-relaxed">{item.detail}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="mt-10">
              <Link
                href="/board/documents"
                className="bg-[#c0392b] hover:bg-[#e74c3c] text-[#f5f0e8] font-bold px-8 py-4 rounded-md transition-colors min-h-[44px] inline-flex items-center justify-center text-center"
              >
                Go to Documents to Sign
              </Link>
            </div>
          </section>
        </Reveal>

        <hr className="border-[#222222] my-16" />

        <Reveal>
          <section>
            <SectionHeader icon={Users} eyebrow="Board" title="Directors and Officers" />
            <ul className="flex flex-col divide-y divide-[#222222] border-y border-[#222222] list-none">
              {s.board.map((p) => (
                <li key={p.name} className="py-4 flex flex-col sm:flex-row sm:justify-between gap-1">
                  <span className="text-[#f5f0e8] font-medium">{p.name}</span>
                  <span className="text-[#888888]">{p.roles}</span>
                </li>
              ))}
            </ul>
            <p className="text-[#888888] text-sm leading-relaxed mt-4">{s.boardNote}</p>
          </section>
        </Reveal>

        <hr className="border-[#222222] my-16" />

        <Reveal>
          <section>
            <SectionHeader icon={CalendarDays} eyebrow="Calendar" title="Upcoming Deadlines" />
            <ul className="flex flex-col gap-6 list-none">
              {s.deadlines.map((d) => (
                <li key={d.title} className="flex flex-col sm:flex-row gap-1 sm:gap-6">
                  <span className="text-[#e74c3c] font-medium sm:w-40 shrink-0">{d.date}</span>
                  <div>
                    <p className="text-[#f5f0e8] font-medium">{d.title}</p>
                    <p className="text-[#888888] text-sm leading-relaxed">{d.detail}</p>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </Reveal>

        <hr className="border-[#222222] my-16" />

        <Reveal>
          <section>
            <SectionHeader icon={MapPin} eyebrow="Addresses" title="Where WHM Gets Mail" />
            <dl className="flex flex-col gap-6">
              <div>
                <dt className="text-xs font-medium tracking-widest uppercase text-[#888888] mb-1">Mailing address</dt>
                <dd className="text-[#f5f0e8]">{s.addresses.mailing}</dd>
              </div>
              <div>
                <dt className="text-xs font-medium tracking-widest uppercase text-[#888888] mb-1">
                  Registered office (legal papers)
                </dt>
                <dd className="text-[#f5f0e8]">{s.addresses.registeredOffice}</dd>
              </div>
            </dl>
          </section>
        </Reveal>

        <hr className="border-[#222222] my-16" />

        <Reveal>
          <section>
            <SectionHeader icon={History} eyebrow="History" title="Recent Activity" />
            <ol className="flex flex-col gap-6 border-l border-[#222222] pl-6 list-none">
              {s.timeline.map((t) => (
                <li key={t.date + t.title}>
                  <p className="text-xs font-medium tracking-widest uppercase text-[#888888] mb-1">{t.date}</p>
                  <p className="text-[#f5f0e8] font-medium">{t.title}</p>
                  <p className="text-[#888888] text-sm leading-relaxed">{t.detail}</p>
                </li>
              ))}
            </ol>
          </section>
        </Reveal>
      </div>
    </div>
  );
}
