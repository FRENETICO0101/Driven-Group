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
    const sessionToken = request.cookies.get('authjs.session-token')?.value ||
      request.cookies.get('next-auth.session-token')?.value;

    if (!sessionToken) {
      const locale = pathname.split('/')[1] || defaultLocale;
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
