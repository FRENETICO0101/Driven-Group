import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import { locales } from '@/i18n/request';
import en from '../../../messages/en.json';
import es from '../../../messages/es.json';

const messages: Record<string, any> = { en, es };

export const dynamic = 'force-dynamic';

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!locales.includes(locale as any)) {
    notFound();
  }

  return (
    <NextIntlClientProvider messages={messages[locale]} locale={locale}>
      {children}
    </NextIntlClientProvider>
  );
}
