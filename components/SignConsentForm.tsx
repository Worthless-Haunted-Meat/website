"use client";

import { useActionState } from "react";
import { CheckCircle, PenLine } from "lucide-react";
import { signConsent } from "@/app/board/documents/actions";

const initialState = { success: false, error: "" };

export default function SignConsentForm({
  docTitle,
  defaultName,
}: {
  docTitle: string;
  defaultName: string;
}) {
  const [state, action, pending] = useActionState(signConsent, initialState);

  if (state.success) {
    return (
      <div
        role="alert"
        className="mt-16 bg-[#111111] border border-[#222222] rounded-lg p-8 flex flex-col items-center gap-4 text-center"
      >
        <CheckCircle size={40} strokeWidth={1.5} className="text-[#e74c3c]" aria-hidden="true" />
        <h2 className="font-syne font-bold text-[#f5f0e8] text-2xl">Signed.</h2>
        <p className="text-[#888888]">
          Your signature has been recorded. A copy of the signed document is on
          its way to your email. Welcome aboard — Ricardo will be in touch about
          the first board meeting.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-16 border-t border-[#222222] pt-12">
      <div className="flex items-center gap-3 mb-4">
        <PenLine className="w-5 h-5 text-[#e74c3c]" strokeWidth={1.75} />
        <p className="text-xs font-medium tracking-widest uppercase text-[#888888]">
          Sign This Document
        </p>
      </div>
      <h2 className="font-syne font-bold text-[#f5f0e8] text-2xl mb-6">
        Electronic Signature
      </h2>

      <form action={action} noValidate className="flex flex-col gap-6">
        <input type="hidden" name="docSlug" value="consent-to-serve" />

        {state.error && (
          <div
            role="alert"
            className="bg-[#c0392b]/10 border border-[#c0392b] rounded-md p-4 text-sm text-[#e74c3c]"
          >
            {state.error}
          </div>
        )}

        <div className="flex flex-col gap-2">
          <label htmlFor="sign-name" className="text-sm font-medium text-[#f5f0e8]">
            Full legal name <span aria-hidden="true">*</span>
            <span className="sr-only">(required)</span>
          </label>
          <input
            id="sign-name"
            name="name"
            type="text"
            required
            defaultValue={defaultName}
            autoComplete="name"
            className="bg-[#111111] border border-[#222222] text-[#f5f0e8] placeholder:text-[#888888] rounded-md px-4 py-3 focus:border-[#e74c3c] focus:outline-none transition-colors min-h-[44px]"
            placeholder="Your full legal name"
          />
          <p className="text-xs text-[#888888]">
            Typing your name here is your signature.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="sign-email" className="text-sm font-medium text-[#f5f0e8]">
            Email <span aria-hidden="true">*</span>
            <span className="sr-only">(required)</span>
          </label>
          <input
            id="sign-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className="bg-[#111111] border border-[#222222] text-[#f5f0e8] placeholder:text-[#888888] rounded-md px-4 py-3 focus:border-[#e74c3c] focus:outline-none transition-colors min-h-[44px]"
            placeholder="you@example.com"
          />
          <p className="text-xs text-[#888888]">
            A copy of the signed document will be sent here for your records.
          </p>
        </div>

        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            name="agree"
            required
            className="mt-1 h-4 w-4 accent-[#c0392b]"
          />
          <span className="text-sm text-[#888888] leading-relaxed">
            I have read the <em>{docTitle}</em> above and the{" "}
            <em>Board Member Risks &amp; Responsibilities</em> disclosure. I
            intend my typed name to serve as my electronic signature, and I
            consent to serve as a director of Worthless Haunted Meat.
          </span>
        </label>

        <button
          type="submit"
          disabled={pending}
          className="bg-[#c0392b] hover:bg-[#e74c3c] disabled:opacity-60 disabled:cursor-not-allowed text-[#f5f0e8] font-bold px-8 py-4 rounded-md transition-colors min-h-[44px]"
        >
          {pending ? "Submitting..." : "Sign & Submit"}
        </button>
      </form>
    </div>
  );
}
