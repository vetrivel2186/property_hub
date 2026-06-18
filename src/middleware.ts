import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("accessToken")?.value;
 console.log(token)
  const protectedRoutes = [
    "/dashboard",
    "/my-properties",
    "/create-property",
    "/edit-property",
  ];

  const isProtectedRoute = protectedRoutes.some((route) =>
    req.nextUrl.pathname.startsWith(route)
  );

  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/my-properties/:path*",
    "/create-property/:path*",
    "/edit-property/:path*",
  ],
};