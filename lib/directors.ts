import { boardStatus } from "@/lib/boardStatus";

const SUFFIXES = new Set(["jr", "sr", "ii", "iii", "iv"]);

function surname(name: string): string {
  const words = name
    .toLowerCase()
    .replace(/[^a-z\s-]/g, " ")
    .split(/\s+/)
    .filter((w) => w && !SUFFIXES.has(w));
  return words[words.length - 1] ?? "";
}

export function currentDirectors(): string[] {
  return boardStatus.board.map((p) => p.name);
}

export function matchDirector(typedName: string): string | null {
  const last = surname(typedName);
  if (!last) return null;
  return currentDirectors().find((d) => surname(d) === last) ?? null;
}
