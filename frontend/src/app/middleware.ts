import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const token = request.cookies.get("next-auth.session-token")
    const isAuthPage = request.nextUrl.pathname.startsWith("/auth")

    if (!token && ! isAuthPage) {
        return NextResponse.redirect(new URL("/signin", request.url))
    }

    if (token && isAuthPage) {
        return NextResponse.redirect(new URL("/generate", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/generate/:path*", "/profile/:path*"],
}