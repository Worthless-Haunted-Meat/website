import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/board/login" || pathname.startsWith("/api/board-auth")) {
    return NextResponse.next();
  }

  if (pathname.startsWith("/board")) {
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
