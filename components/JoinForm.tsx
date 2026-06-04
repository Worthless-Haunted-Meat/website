"use client";

import { useState, useActionState } from "react";
import { submitJoinForm } from "@/app/join/actions";
import { CheckCircle } from "lucide-react";

const initialState = { success: false, error: "" };

export default function JoinForm() {
  const [state, action, pending] = useActionState(submitJoinForm, initialState);

  if (state.success) {
    return (
      <div
        role="alert"
        className="bg-[#111111] border border-[#222222] rounded-lg p-8 flex flex-col items-center gap-4 text-center"
      >
        <CheckCircle size={40} strokeWidth={1.5} className="text-[#e74c3c]" aria-hidden="true" />
        <h2 className="font-syne font-bold text-[#f5f0e8] text-2xl">You&apos;re in.</h2>
        <p className="text-[#888888]">
          We got your message. We&apos;ll be in touch.
        </p>
      </div>
    );
  }

  return (
    <form action={action} noValidate className="flex flex-col gap-6">
      {state.error && (
        <div role="alert" className="bg-[#c0392b]/10 border border-[#c0392b] rounded-md p-4 text-sm text-[#e74c3c]">
          {state.error}
        </div>
      )}

      <div className="flex flex-col gap-2">
        <label htmlFor="name" className="text-sm font-medium text-[#f5f0e8]">
          Name <span aria-hidden="true">*</span>
          <span className="sr-only">(required)</span>
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          autoComplete="name"
          className="bg-[#111111] border border-[#222222] text-[#f5f0e8] placeholder:text-[#888888] rounded-md px-4 py-3 focus:border-[#e74c3c] focus:outline-none transition-colors min-h-[44px]"
          placeholder="Your name"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-sm font-medium text-[#f5f0e8]">
          Email <span aria-hidden="true">*</span>
          <span className="sr-only">(required)</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className="bg-[#111111] border border-[#222222] text-[#f5f0e8] placeholder:text-[#888888] rounded-md px-4 py-3 focus:border-[#e74c3c] focus:outline-none transition-colors min-h-[44px]"
          placeholder="you@example.com"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="love" className="text-sm font-medium text-[#f5f0e8]">
          What do you love?
        </label>
        <textarea
          id="love"
          name="love"
          rows={4}
          className="bg-[#111111] border border-[#222222] text-[#f5f0e8] placeholder:text-[#888888] rounded-md px-4 py-3 focus:border-[#e74c3c] focus:outline-none transition-colors resize-none"
          placeholder="Teaching, building things, cooking, organizing communities..."
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="help" className="text-sm font-medium text-[#f5f0e8]">
          How do you want to help?
        </label>
        <textarea
          id="help"
          name="help"
          rows={4}
          className="bg-[#111111] border border-[#222222] text-[#f5f0e8] placeholder:text-[#888888] rounded-md px-4 py-3 focus:border-[#e74c3c] focus:outline-none transition-colors resize-none"
          placeholder="Volunteer, build, donate, advise, connect..."
        />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="bg-[#c0392b] hover:bg-[#e74c3c] disabled:opacity-60 disabled:cursor-not-allowed text-[#f5f0e8] font-bold px-8 py-4 rounded-md transition-colors min-h-[44px]"
      >
        {pending ? "Sending..." : "Send It"}
      </button>
    </form>
  );
}
