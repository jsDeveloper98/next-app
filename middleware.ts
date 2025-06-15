import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

import {
  AUTHORIZED_ROUTES_PATHS,
  UNAUTHORIZED_ROUTES_PATHS,
} from "@/constants/paths";

export const verifyJWTToken = async (token?: string) => {
  if (!token) {
    return null;
  }

  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET as string)
    );

    return payload;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    {
      source: "/((?!api|_next/static|_next/image|favicon.ico).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
  ],
};

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const res = await verifyJWTToken(token);

  if (!res && AUTHORIZED_ROUTES_PATHS.includes(request.nextUrl.pathname)) {
    const absoluteURL = new URL("/login", request.nextUrl.origin);

    return NextResponse.redirect(absoluteURL.toString());
  }

  if (!!res && UNAUTHORIZED_ROUTES_PATHS.includes(request.nextUrl.pathname)) {
    const absoluteURL = new URL("/", request.nextUrl.origin);

    return NextResponse.redirect(absoluteURL.toString());
  }

  return NextResponse.next();
}
