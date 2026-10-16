import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyInviteToken } from "@/lib/invite";
import { createSession, readSession, sessionSecret, SESSION_COOKIE } from "@/lib/session";

const INVITE_SESSION_SECONDS = 60 * 60 * 24 * 30;

export async function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  if (pathname === "/board/login" || pathname.startsWith("/api/board-auth")) {
    return NextResponse.next();
  }

  if (pathname.startsWith("/board")) {
    const secret = sessionSecret();
    const invite = searchParams.get("invite");
    if (invite) {
      const verified = secret ? await verifyInviteToken(invite, secret) : null;
      if (verified) {
        console.log(`[BOARD INVITE] "${verified.name}" opened ${pathname} at ${new Date().toISOString()} ua="${request.headers.get("user-agent") ?? ""}"`);
        const cleanUrl = new URL(request.url);
        cleanUrl.searchParams.delete("invite");
        const response = NextResponse.redirect(cleanUrl);
        response.cookies.set(
          SESSION_COOKIE,
          await createSession("invite", verified.name, INVITE_SESSION_SECONDS, secret),
          {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: INVITE_SESSION_SECONDS,
            path: "/",
          }
        );
        return response;
      }
    }

    const session = await readSession(request.cookies.get(SESSION_COOKIE)?.value, secret);
    if (!session) {
      const response = NextResponse.redirect(new URL("/board/login", request.url));
      response.cookies.delete(SESSION_COOKIE);
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/board/:path*"],
};
