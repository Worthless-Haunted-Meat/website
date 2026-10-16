import { createHash } from "crypto";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createSession, sessionSecret, SESSION_COOKIE } from "@/lib/session";

export async function POST(request: NextRequest) {
  const body = (await request.json()) as { password?: string };
  const password = body.password ?? "";

  const salt = process.env.BOARD_PASSWORD_SALT ?? "";
  const expectedHash = process.env.BOARD_TOKEN_HASH ?? "";

  if (!salt || !expectedHash) {
    return NextResponse.json({ ok: false }, { status: 500 });
  }

  const hash = createHash("sha256")
    .update(password + salt)
    .digest("hex");

  if (hash !== expectedHash) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const secret = sessionSecret();
  if (!secret) {
    return NextResponse.json({ ok: false }, { status: 500 });
  }

  const maxAge = 60 * 60 * 24 * 7;
  const response = NextResponse.json({ ok: true });
  response.cookies.set(SESSION_COOKIE, await createSession("password", null, maxAge, secret), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge,
    path: "/",
  });

  return response;
}
