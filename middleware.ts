import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { locales, defaultLocale } from './i18n/config';

// Create the i18n middleware
const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'as-needed', // Default locale (fr) at /, other locales at /en
});

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  console.log('[MIDDLEWARE] Processing:', pathname);
  
  // Bypass i18n middleware completely for Studio routes
  if (pathname.startsWith('/studio')) {
    console.log('[MIDDLEWARE] Bypassing /studio');
    return NextResponse.next();
  }
  
  // Bypass i18n middleware for API routes
  if (pathname.startsWith('/api')) {
    console.log('[MIDDLEWARE] Bypassing /api');
    return NextResponse.next();
  }
  
  // Bypass i18n middleware for static files
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/favicon') ||
    pathname.startsWith('/icon') ||
    pathname.startsWith('/apple-icon') ||
    pathname.includes('.')
  ) {
    console.log('[MIDDLEWARE] Bypassing static file');
    return NextResponse.next();
  }
  
  console.log('[MIDDLEWARE] Applying i18n middleware');
  // Apply i18n middleware for all other routes
  return intlMiddleware(request);
}

export const config = {
  matcher: [
    // Match all pathnames except for
    // - … if they start with `/api`, `/_next` or `/_vercel`
    // - … the ones containing a dot (e.g. `favicon.ico`)
    '/((?!api|_next|_vercel|.*\\..*).*)',
  ],
};
