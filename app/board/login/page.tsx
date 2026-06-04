"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock } from "lucide-react";

export default function BoardLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setPending(true);

    try {
      const res = await fetch("/api/board-auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = (await res.json()) as { ok: boolean };
      if (data.ok) {
        router.push("/board");
      } else {
        setError("Incorrect password.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-6 py-24">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center gap-4 mb-10">
          <Lock size={32} strokeWidth={1.5} className="text-[#888888]" aria-hidden="true" />
          <h1 className="font-syne font-bold text-[#f5f0e8] text-2xl text-center">
            Board Portal
          </h1>
          <p className="text-[#888888] text-sm text-center">
            For board members only. Enter the password you were given.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
          {error && (
            <div role="alert" className="text-sm text-[#e74c3c] bg-[#c0392b]/10 border border-[#c0392b] rounded-md p-3 text-center">
              {error}
            </div>
          )}

          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-sm font-medium text-[#f5f0e8]">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-[#111111] border border-[#222222] text-[#f5f0e8] placeholder:text-[#888888] rounded-md px-4 py-3 focus:border-[#e74c3c] focus:outline-none transition-colors min-h-[44px]"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={pending}
            className="bg-[#c0392b] hover:bg-[#e74c3c] disabled:opacity-60 disabled:cursor-not-allowed text-[#f5f0e8] font-bold px-8 py-4 rounded-md transition-colors min-h-[44px] mt-2"
          >
            {pending ? "Checking..." : "Enter"}
          </button>
        </form>
      </div>
    </div>
  );
}
