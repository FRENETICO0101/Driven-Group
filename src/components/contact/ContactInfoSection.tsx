import { useTranslations } from 'next-intl';

export function ContactInfoSection() {
  const t = useTranslations('contact');
  const contactItems = [
    { icon: 'location_on', title: t('headquarters'), details: [t('officeAddress')], href: undefined },
    { icon: 'phone', title: t('phone'), details: [t('phoneAvailability'), t('phoneResponse')], href: '#form' },
    { icon: 'mail', title: t('email'), details: ['administracion@drivengroup.com.mx'], href: 'mailto:administracion@drivengroup.com.mx' },
  ];

  return (
    <section className="mx-auto max-w-7xl px-6 py-20 sm:px-8 sm:py-24 md:py-28">
      <div className="mb-12 flex flex-col gap-4 sm:mb-14 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="editorial-label text-gray">{t('eyebrow')}</p>
          <h2 className="mt-3 font-serif text-4xl font-bold leading-tight text-black sm:text-5xl">{t('information')}</h2>
        </div>
        <p className="max-w-md text-sm leading-relaxed text-dark-gray sm:text-base">{t('informationDescription')}</p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 sm:gap-5">
        {contactItems.map((item) => {
          const content = (
            <>
              <span className="flex h-12 w-12 items-center justify-center rounded-full border border-light-gray bg-light-gray/10 text-dark-gray transition-colors group-hover:bg-black group-hover:text-white">
                <span className="material-symbols-outlined text-xl">{item.icon}</span>
              </span>
              <h3 className="mt-7 font-serif text-2xl font-semibold text-black">{item.title}</h3>
              <ul className="mt-4 space-y-2 text-sm leading-relaxed text-dark-gray">
                {item.details.map((detail) => <li key={detail}>{detail}</li>)}
              </ul>
              {item.href && <span className="mt-7 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-black">{t('contactAction')}<span className="material-symbols-outlined text-base">arrow_forward</span></span>}
            </>
          );

          return item.href ? (
            <a key={item.title} href={item.href} className="wealth-interactive group rounded-2xl border border-light-gray bg-white p-6 sm:p-7">{content}</a>
          ) : (
            <article key={item.title} className="wealth-interactive rounded-2xl border border-light-gray bg-white p-6 sm:p-7">{content}</article>
          );
        })}
      </div>
    </section>
  );
}
