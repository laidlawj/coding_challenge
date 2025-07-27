// src/middleware.js
// This file is placed inside the `src/` directory,
// as per your observation that it only works there.

import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server'; // Removed 'type' keyword for JavaScript

// Define your supported locales and the default locale.
const locales = ['uk', 'us'];
const defaultLocale = 'uk';

export function middleware(request) { // Removed NextRequest type annotation
  console.log("using middlewear now")
  const { pathname } = request.nextUrl;
  console.log("on ", pathname)
  // This log should appear for *every* request that hits the middleware,
  // including /us, if the matcher allows it.

  // The rest of your middleware logic remains the same.
  // We're focusing on whether this function is even invoked for /us.
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (
    !pathnameHasLocale &&
    !pathname.startsWith('/_next') &&
    !pathname.startsWith('/api') &&
    !pathname.includes('.')
  ) {
  
    if (pathname === '/') {
      return NextResponse.rewrite(new URL(`/${defaultLocale}`, request.url));
    }
    return NextResponse.rewrite(
      new URL(`/${defaultLocale}${pathname}`, request.url)
    );
  } 

  if (pathname.startsWith(`/${defaultLocale}/`)) {
    const newPath = pathname.replace(`/${defaultLocale}`, '');
    return NextResponse.redirect(new URL(newPath, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|api|.*\\..*).*)'],
};
