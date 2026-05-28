import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n/request';

export default createMiddleware({
  locales: locales as unknown as string[],
  defaultLocale,
  localePrefix: 'as-needed',
});

export const config = {
  matcher: [
    '/(es|en)/:path*',
    '/((?!api|admin|_next|_vercel|.*\\..*|favicon\\.ico|robots\\.txt|sitemap\\.xml).*)',
  ],
};
