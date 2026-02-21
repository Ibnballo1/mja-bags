import { type NextRequest, NextResponse } from "next/server";
// import { getSessionFromRequest } from "@/lib/auth/middleware-helper";

const PUBLIC_PATHS = [
  "/",
  "/shop",
  "/auth/login",
  "/auth/register",
  "/api/auth",
  "/api/webhooks",
  "/_next",
  "/favicon.ico",
  "/og-image.jpg",
];

const ADMIN_PATHS = ["/admin"];
const AUTH_PATHS = ["/account", "/checkout", "/orders"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow public paths
  if (
    PUBLIC_PATHS.some(
      (p) =>
        pathname === p ||
        pathname.startsWith(`${p}/`) ||
        pathname.startsWith("/_next") ||
        pathname.startsWith("/api/auth"),
    )
  ) {
    return NextResponse.next();
  }

  // Check if admin path
  const isAdminPath = ADMIN_PATHS.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`),
  );

  // Check if auth-required path
  const isAuthPath = AUTH_PATHS.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`),
  );

  if (isAdminPath || isAuthPath) {
    // Get session from cookie (using BetterAuth session token)
    const sessionToken = request.cookies.get("mja.session_token")?.value;

    if (!sessionToken) {
      const loginUrl = new URL("/auth/login", request.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }

    // For admin paths, we need to verify the role server-side
    // The actual role check happens in the requireAdmin() server function
    // Middleware just ensures session exists
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
