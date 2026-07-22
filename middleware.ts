import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyInviteToken } from "@/lib/invite";

export async function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  if (pathname === "/board/login" || pathname.startsWith("/api/board-auth")) {
    return NextResponse.next();
  }

  if (pathname.startsWith("/board")) {
    const invite = searchParams.get("invite");
    if (invite) {
      const secret = process.env.BOARD_INVITE_SECRET ?? "";
      const verified = secret ? await verifyInviteToken(invite, secret) : null;
      if (verified) {
        console.log(`[BOARD INVITE] "${verified.name}" opened ${pathname} at ${new Date().toISOString()} ua="${request.headers.get("user-agent") ?? ""}"`);
        const cleanUrl = new URL(request.url);
        cleanUrl.searchParams.delete("invite");
        const response = NextResponse.redirect(cleanUrl);
        response.cookies.set("whm-board-token", "invite:" + verified.name, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          maxAge: 60 * 60 * 24 * 30,
          path: "/",
        });
        return response;
      }
    }

    const token = request.cookies.get("whm-board-token")?.value;
    if (!token) {
      return NextResponse.redirect(new URL("/board/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/board/:path*"],
};
