"use client";

import { useActionState } from "react";
import { CheckCircle, Vote } from "lucide-react";
import { castVote } from "@/app/board/vote/actions";

const initialState = { success: false, error: "" };

const choices = [
  { value: "Aye", help: "Approve the motion" },
  { value: "Nay", help: "Reject the motion" },
  { value: "Abstain", help: "Record no position" },
];

export default function VoteForm({
  motionSlug,
  motionNumber,
  defaultName,
}: {
  motionSlug: string;
  motionNumber: string;
  defaultName: string;
}) {
  const [state, action, pending] = useActionState(castVote, initialState);
  const idPrefix = `vote-${motionSlug}`;

  if (state.success) {
    return (
      <div
        role="alert"
        className="mt-8 bg-[#111111] border border-[#222222] rounded-lg p-8 flex flex-col items-center gap-4 text-center"
      >
        <CheckCircle size={40} strokeWidth={1.5} className="text-[#e74c3c]" aria-hidden="true" />
        <h3 className="font-syne font-bold text-[#f5f0e8] text-2xl">Vote recorded.</h3>
        <p className="text-[#888888]">
          Your vote on Motion {motionNumber} has been recorded, and a copy is on
          its way to your email for your records.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-8 border-t border-[#222222] pt-8">
      <div className="flex items-center gap-3 mb-6">
        <Vote className="w-5 h-5 text-[#e74c3c]" strokeWidth={1.75} />
        <p className="text-xs font-medium tracking-widest uppercase text-[#888888]">
          Cast Your Vote
        </p>
      </div>

      <form action={action} noValidate className="flex flex-col gap-6">
        <input type="hidden" name="motionSlug" value={motionSlug} />

        {state.error && (
          <div
            role="alert"
            className="bg-[#c0392b]/10 border border-[#c0392b] rounded-md p-4 text-sm text-[#e74c3c]"
          >
            {state.error}
          </div>
        )}

        <fieldset className="flex flex-col gap-3">
          <legend className="text-sm font-medium text-[#f5f0e8] mb-2">
            Your vote <span aria-hidden="true">*</span>
            <span className="sr-only">(required)</span>
          </legend>
          <div className="flex flex-col sm:flex-row gap-3">
            {choices.map((c) => (
              <label
                key={c.value}
                className="flex-1 flex items-start gap-3 border border-[#222222] hover:border-[#e74c3c] rounded-md p-4 cursor-pointer transition-colors has-[:checked]:border-[#e74c3c] has-[:checked]:bg-[#111111]"
              >
                <input
                  type="radio"
                  name="choice"
                  value={c.value}
                  required
                  className="mt-1 h-4 w-4 accent-[#c0392b]"
                />
                <span>
                  <span className="block font-syne font-bold text-[#f5f0e8]">{c.value}</span>
                  <span className="block text-xs text-[#888888] mt-1">{c.help}</span>
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className="flex flex-col gap-2">
          <label htmlFor={`${idPrefix}-name`} className="text-sm font-medium text-[#f5f0e8]">
            Full legal name <span aria-hidden="true">*</span>
            <span className="sr-only">(required)</span>
          </label>
          <input
            id={`${idPrefix}-name`}
            name="name"
            type="text"
            required
            defaultValue={defaultName}
            autoComplete="name"
            className="bg-[#111111] border border-[#222222] text-[#f5f0e8] placeholder:text-[#888888] rounded-md px-4 py-3 focus:border-[#e74c3c] focus:outline-none transition-colors min-h-[44px]"
            placeholder="Your full legal name"
          />
          <p className="text-xs text-[#888888]">
            Typing your name here signs your vote.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor={`${idPrefix}-email`} className="text-sm font-medium text-[#f5f0e8]">
            Email <span aria-hidden="true">*</span>
            <span className="sr-only">(required)</span>
          </label>
          <input
            id={`${idPrefix}-email`}
            name="email"
            type="email"
            required
            autoComplete="email"
            className="bg-[#111111] border border-[#222222] text-[#f5f0e8] placeholder:text-[#888888] rounded-md px-4 py-3 focus:border-[#e74c3c] focus:outline-none transition-colors min-h-[44px]"
            placeholder="you@example.com"
          />
          <p className="text-xs text-[#888888]">
            A copy of your vote record will be sent here.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor={`${idPrefix}-comment`} className="text-sm font-medium text-[#f5f0e8]">
            Comment <span className="text-[#888888] font-normal">(optional)</span>
          </label>
          <textarea
            id={`${idPrefix}-comment`}
            name="comment"
            rows={3}
            className="bg-[#111111] border border-[#222222] text-[#f5f0e8] placeholder:text-[#888888] rounded-md px-4 py-3 focus:border-[#e74c3c] focus:outline-none transition-colors"
            placeholder="Anything you want recorded alongside your vote"
          />
        </div>

        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            name="acknowledge"
            required
            className="mt-1 h-4 w-4 accent-[#c0392b]"
          />
          <span className="text-sm text-[#888888] leading-relaxed">
            I am a director of Worthless Haunted Meat, I have read Motion{" "}
            {motionNumber} above, and I intend my typed name to serve as my
            electronic signature on this vote.
          </span>
        </label>

        <button
          type="submit"
          disabled={pending}
          className="bg-[#c0392b] hover:bg-[#e74c3c] disabled:opacity-60 disabled:cursor-not-allowed text-[#f5f0e8] font-bold px-8 py-4 rounded-md transition-colors min-h-[44px] self-start"
        >
          {pending ? "Recording..." : "Cast Vote"}
        </button>
      </form>
    </div>
  );
}
