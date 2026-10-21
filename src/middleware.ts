import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const SESSION_COOKIE_NAME = "portfolio_admin_session";

async function verifyToken(token: string): Promise<boolean> {
  try {
    const secret = process.env.AUTH_SECRET;
    if (!secret) return false;
    const secretKey = new TextEncoder().encode(secret);
    await jwtVerify(token, secretKey, { algorithms: ["HS256"] });
    return true;
  } catch {
    return false;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const sessionCookie = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  const isAuthenticated = sessionCookie ? await verifyToken(sessionCookie) : false;

  const isLoginPage = pathname === "/admin/login";

  // 1. Logged in and visiting /admin/login -> redirect to /admin
  if (isLoginPage) {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
    return NextResponse.next();
  }

  // 2. Logged out and visiting any other /admin route -> redirect to /admin/login
  if (!isAuthenticated) {
    const loginUrl = new URL("/admin/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
