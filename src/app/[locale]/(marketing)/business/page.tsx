import { useTranslations } from 'next-intl';
import { BusinessHeroSection } from '@/components/business/BusinessHeroSection';
import { BusinessDivision } from '@/components/business/BusinessDivision';
import { BusinessCTA } from '@/components/business/BusinessCTA';

export const dynamic = 'force-dynamic';

const divisions = [
  { id: 'digital-commerce', index: '01', title: 'digitalCommerce', description: 'digitalCommerceDesc', image: '/images1/business-digital.jpg', imageAlt: 'Digital Commerce Technology Platform' },
  { id: 'global-markets', index: '02', title: 'globalMarkets', description: 'globalMarketsDesc', image: '/images1/business-global.jpg', imageAlt: 'Global Markets Financial Operations', reversed: true },
  { id: 'strategic-alliances', index: '03', title: 'strategicAlliances', description: 'strategicAlliancesDesc', image: '/images1/business-alliances.jpg', imageAlt: 'Strategic Partnerships and Collaboration' },
  { id: 'luxury-assets', index: '04', title: 'luxuryAssets', description: 'luxuryAssetsDesc', image: '/images1/business-luxury.jpg', imageAlt: 'Luxury Real Estate Portfolio', reversed: true },
] as const;

export default function BusinessPage() {
  const t = useTranslations('business');

  return (
    <main className="min-h-screen bg-white">
      <BusinessHeroSection />
      <section id="divisions" className="scroll-mt-24 border-b border-light-gray bg-light-gray/10 px-6 py-8 sm:px-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="editorial-label text-gray">Driven Business</p>
            <h2 className="mt-2 font-serif text-2xl font-bold text-black sm:text-3xl">{t('ourDivisions')}</h2>
          </div>
          <nav aria-label={t('explore')} className="flex gap-2 overflow-x-auto pb-1 sm:justify-end">
            {divisions.map((division) => (
              <a key={division.id} href={`#${division.id}`} className="shrink-0 rounded-full border border-light-gray bg-white px-3 py-2 text-xs font-semibold text-dark-gray transition-colors hover:border-dark-gray hover:text-black">
                {division.index} · {t(division.title)}
              </a>
            ))}
          </nav>
        </div>
      </section>
      <section className="py-4 sm:py-6">
        {divisions.map((division) => (
          <BusinessDivision key={division.id} {...division} title={t(division.title)} description={t(division.description)} highlights={[]} />
        ))}
      </section>
      <BusinessCTA />
    </main>
  );
}
