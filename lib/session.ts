import { b64urlDecode, b64urlEncode, sign, timingSafeEqual } from "@/lib/invite";

export const SESSION_COOKIE = "whm-board-token";

export interface BoardSession {
  kind: "invite" | "password";
  name: string | null;
  exp: number;
}

export async function createSession(
  kind: BoardSession["kind"],
  name: string | null,
  maxAgeSeconds: number,
  secret: string
): Promise<string> {
  const session: BoardSession = { kind, name, exp: Math.floor(Date.now() / 1000) + maxAgeSeconds };
  const payload = "v1." + b64urlEncode(new TextEncoder().encode(JSON.stringify(session)));
  return `${payload}.${await sign(payload, secret)}`;
}

export async function readSession(
  token: string | undefined,
  secret: string
): Promise<BoardSession | null> {
  if (!token || !secret) return null;
  const parts = token.split(".");
  if (parts.length !== 3 || parts[0] !== "v1") return null;
  const payload = `${parts[0]}.${parts[1]}`;
  if (!timingSafeEqual(parts[2], await sign(payload, secret))) return null;
  try {
    const session = JSON.parse(new TextDecoder().decode(b64urlDecode(parts[1]))) as BoardSession;
    if (typeof session.exp !== "number" || session.exp < Date.now() / 1000) return null;
    return session;
  } catch {
    return null;
  }
}

export function sessionSecret(): string {
  return process.env.BOARD_INVITE_SECRET ?? "";
}
