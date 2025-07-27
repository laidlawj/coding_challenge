import { NextResponse } from "next/server";

import constants from "../consts.js";

const { DEFAULT_LOCALE, LOCALES } = constants;

export function middleware(request) {
  const { pathname } = request.nextUrl;

  const pathnameHasLocale = LOCALES.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (
    !pathnameHasLocale &&
    !pathname.startsWith("/_next") &&
    !pathname.startsWith("/api") &&
    !pathname.includes(".")
  ) {
    if (pathname === "/") {
      return NextResponse.rewrite(new URL(`/${DEFAULT_LOCALE}`, request.url));
    }
    return NextResponse.rewrite(
      new URL(`/${DEFAULT_LOCALE}${pathname}`, request.url)
    );
  }

  if (pathname.startsWith(`/${DEFAULT_LOCALE}/`)) {
    const newPath = pathname.replace(`/${DEFAULT_LOCALE}`, "");
    return NextResponse.redirect(new URL(newPath, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api|.*\\..*).*)"],
};
