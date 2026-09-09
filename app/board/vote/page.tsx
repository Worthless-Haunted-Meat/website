import type { Metadata } from "next";
import { cookies } from "next/headers";
import { CheckCircle2, CircleDot } from "lucide-react";
import BoardTabs from "@/components/BoardTabs";
import VoteForm from "@/components/VoteForm";
import { listMotions, getMotion } from "@/lib/motions";

export const metadata: Metadata = {
  title: "Board Votes",
  description: "Open motions for the Worthless Haunted Meat board of directors.",
};

export default async function BoardVotePage() {
  const metas = listMotions();
  const motions = (
    await Promise.all(metas.map((m) => getMotion(m.slug)))
  ).filter((m): m is NonNullable<typeof m> => m !== null);

  const token = (await cookies()).get("whm-board-token")?.value;
  const inviteName = token?.startsWith("invite:") ? token.slice("invite:".length) : null;

  const open = motions.filter((m) => m.meta.status === "open");
  const closed = motions.filter((m) => m.meta.status === "closed");

  return (
    <div className="py-24 md:py-32">
      <div className="max-w-3xl mx-auto px-6">
        <p className="text-xs font-medium tracking-widest uppercase text-[#888888] mb-6">
          Board Portal
        </p>
        <BoardTabs activeHref="/board/vote" />

        <h1
          className="font-syne font-extrabold text-[#f5f0e8] leading-tight mb-6"
          style={{ fontSize: "clamp(2rem, 5vw, 3.75rem)" }}
        >
          Votes
        </h1>
        <p className="text-[#888888] text-lg leading-relaxed mb-12">
          {inviteName
            ? `${inviteName} — these are the motions currently before the board. Read each one, then cast your vote below it. Every vote is recorded and a copy lands in your inbox.`
            : "The motions currently before the board. Read each one, then cast your vote below it. Every vote is recorded and a copy lands in your inbox."}
        </p>

        {open.length === 0 && (
          <p className="text-[#888888] text-lg border border-[#222222] rounded-md p-8 text-center">
            No motions are open for a vote right now.
          </p>
        )}

        <div className="flex flex-col gap-16">
          {open.map((motion) => (
            <section
              key={motion.meta.slug}
              aria-labelledby={`motion-${motion.meta.slug}`}
              className="border border-[#222222] rounded-lg p-8"
            >
              <div className="flex items-center gap-2 mb-4">
                <CircleDot className="w-4 h-4 text-[#e74c3c]" strokeWidth={2} />
                <p className="text-xs font-medium tracking-widest uppercase text-[#e74c3c]">
                  Open for voting since {motion.meta.opened}
                </p>
              </div>
              <h2
                id={`motion-${motion.meta.slug}`}
                className="font-syne font-bold text-[#f5f0e8] text-2xl mb-6"
              >
                {motion.meta.title}
              </h2>
              <div
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: motion.html }}
              />
              <VoteForm
                motionSlug={motion.meta.slug}
                motionNumber={motion.meta.number}
                defaultName={inviteName ?? ""}
              />
            </section>
          ))}
        </div>

        {closed.length > 0 && (
          <div className="mt-20">
            <h2 className="font-syne font-bold text-[#f5f0e8] text-2xl mb-6">
              Closed motions
            </h2>
            <div className="flex flex-col gap-4">
              {closed.map((motion) => (
                <div
                  key={motion.meta.slug}
                  className="border border-[#222222] rounded-md p-6"
                >
                  <div className="flex items-start gap-4">
                    <CheckCircle2
                      className="w-5 h-5 text-[#888888] mt-1 shrink-0"
                      strokeWidth={1.75}
                    />
                    <div>
                      <h3 className="font-syne font-bold text-[#f5f0e8] text-xl mb-1">
                        {motion.meta.title}
                      </h3>
                      <p className="text-[#888888] leading-relaxed">
                        {motion.meta.result || "Voting closed."}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
