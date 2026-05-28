import { getRequestConfig } from 'next-intl/server';
import en from '../../messages/en.json';
import es from '../../messages/es.json';

export const locales = ['es', 'en'] as const;
export const defaultLocale = 'es' as const;

type Locale = typeof locales[number];

const messageMap: Record<Locale, typeof en> = { en, es };

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale: Locale = requested && locales.includes(requested as Locale)
    ? (requested as Locale)
    : defaultLocale;

  return {
    locale,
    messages: messageMap[locale],
  };
});
