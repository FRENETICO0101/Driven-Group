import Link from 'next/link';
import { useTranslations } from 'next-intl';

export function BusinessCTA() {
  const t = useTranslations('business');

  return (
    <section id="business-contact" className="scroll-mt-24 px-6 py-16 sm:px-8 sm:py-20 md:py-24">
      <div className="mx-auto max-w-6xl rounded-2xl bg-black px-6 py-12 text-center text-white sm:px-12 sm:py-16">
        <p className="editorial-label text-white/60">{t('partnershipLabel')}</p>
        <h2 className="mx-auto mt-4 max-w-3xl font-serif text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">{t('partnershipTitle')}</h2>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/75 sm:text-lg">{t('partnershipDescription')}</p>
        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/contact#contact-information" className="rounded-lg bg-white px-6 py-3 text-sm font-semibold text-black transition-colors hover:bg-light-gray">{t('contactCta')}</Link>
          <Link href="/about" className="rounded-lg border border-white/35 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10">{t('learnMoreCta')}</Link>
        </div>
      </div>
    </section>
  );
}
