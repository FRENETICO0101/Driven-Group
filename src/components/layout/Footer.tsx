import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { BrandLogo } from '@/components/ui/BrandLogo';
import { Icon } from '@/components/ui/Icon';

export function Footer() {
  const t = useTranslations('footer');
  const locale = useLocale();

  return (
    <footer className="bg-black text-white">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 sm:py-24 md:py-28">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 sm:gap-10 lg:grid-cols-6 lg:gap-12">
          <div className="lg:col-span-2">
            <div className="mb-6"><BrandLogo className="w-32 sm:w-40" imageClassName="brightness-0 invert" /></div>
            <p className="mb-8 max-w-sm text-sm leading-relaxed text-light-gray">{t('description')}</p>
            <div className="mb-8 space-y-2 text-sm text-gray">
              <a href="mailto:administracion@drivengroup.com.mx" className="transition-colors hover:text-white">administracion@drivengroup.com.mx</a>
              <p>{t('location')}</p>
            </div>
            <div className="flex gap-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray transition-colors hover:text-white" aria-label="Instagram"><Icon name="photo_camera" className="h-[18px] w-[18px]" /></a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray transition-colors hover:text-white" aria-label="LinkedIn"><Icon name="business" className="h-[18px] w-[18px]" /></a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-gray transition-colors hover:text-white" aria-label="YouTube"><Icon name="play_circle" className="h-[18px] w-[18px]" /></a>
            </div>
          </div>

          <FooterColumn title="Divisions" links={[
            { href: '/real-estate', label: 'Real Estate' },
            { href: '/business', label: 'Business' },
            { href: '/academy', label: 'Academy' },
          ]} />
          <FooterColumn title="Business" links={[
            { href: '/business#digital-commerce', label: t('digitalCommerce') },
            { href: '/business#global-markets', label: t('globalMarkets') },
            { href: '/business#strategic-alliances', label: t('strategicAlliances') },
            { href: '/business#luxury-assets', label: t('luxuryAssets') },
          ]} />
          <FooterColumn title="Academy" links={[
            { href: '/academy#driven-academy', label: 'Driven Academy' },
            { href: 'https://driven-academy.com/modo-rico', label: 'Modo Rico', external: true },
            { href: 'https://driven-academy.com/modo-rico', label: 'NEXORAMR', external: true },
          ]} />
          <FooterColumn title={t('company')} links={[
            { href: '/', label: t('home') },
            { href: '/about', label: t('about') },
            { href: '/contact', label: t('contact') },
          ]} />
        </div>

        <div className="mt-14 flex flex-col gap-6 border-t border-white/15 pt-8 sm:mt-20 sm:flex-row sm:items-center sm:justify-between sm:pt-10">
          <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-gray">{t('copyright', { year: new Date().getFullYear() })}</p>
          <div className="flex flex-wrap gap-x-6 gap-y-3 text-[10px] font-medium uppercase tracking-[0.16em] text-gray sm:gap-x-8">
            <Link href={`/${locale}/privacy-policy`} className="transition-colors hover:text-white">{t('privacy')}</Link>
            <Link href={`/${locale}/terms-of-service`} className="transition-colors hover:text-white">{t('terms')}</Link>
            <Link href={`/${locale}/cookie-settings`} className="transition-colors hover:text-white">{t('cookies')}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links, extra }: { title: string; links: Array<{ href: string; label: string; external?: boolean }>; extra?: React.ReactNode }) {
  return (
    <div>
      <h4 className="mb-5 text-[10px] font-semibold uppercase tracking-[0.2em] text-gray">{title}</h4>
      <ul className="space-y-3">
        {links.map((link) => (
          <li key={`${link.href}-${link.label}`}>
            {link.external ? (
              <a href={link.href} target="_blank" rel="noreferrer" className="text-sm text-light-gray transition-colors hover:text-white">{link.label}</a>
            ) : (
              <Link href={link.href} className="text-sm text-light-gray transition-colors hover:text-white">{link.label}</Link>
            )}
          </li>
        ))}
        {extra && <li>{extra}</li>}
      </ul>
    </div>
  );
}
