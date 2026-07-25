import createIntlMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n/request';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const intlProxy = createIntlMiddleware({
  locales: locales as unknown as string[],
  defaultLocale,
  localePrefix: 'as-needed',
});

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (pathname.includes('/admin')) {
    // NextAuth uses a `__Secure-` cookie name on HTTPS deployments (such as
    // Vercel) and the unprefixed name during local HTTP development.
    const sessionToken = request.cookies.get('__Secure-authjs.session-token')?.value ||
      request.cookies.get('__Secure-next-auth.session-token')?.value ||
      request.cookies.get('authjs.session-token')?.value ||
      request.cookies.get('next-auth.session-token')?.value;

    if (!sessionToken) {
      const localeSegment = pathname.split('/')[1];
      const locale = locales.includes(localeSegment as (typeof locales)[number])
        ? localeSegment
        : defaultLocale;
      return NextResponse.redirect(new URL(`/${locale}/login`, request.url));
    }
  }

  return intlProxy(request);
}

export const config = {
  matcher: [
    '/((?!api|_next|_vercel|.*\\..*|favicon\\.ico|robots\\.txt|sitemap\\.xml).*)',
  ],
};
