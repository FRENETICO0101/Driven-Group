"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useLocale } from "next-intl";

const THEME_EVENT = "driven-theme-change";

const content = {
  es: {
    eyebrow: "LIDERAZGO",
    title: "Nuestro Liderazgo",
    leaders: [
      {
        name: "Iván Rodríguez",
        role: "Director ejecutivo y fundador",
        bio: "Fundador de Driven Group en 2022 con la visión de construir una empresa global desde Guadalajara, Jalisco. Iván ha liderado la evolución de la compañía desde el sector inmobiliario hacia un ecosistema empresarial integrado que abarca negocio, real estate y educación, consolidando operaciones en Europa y América del Norte.",
      },
      {
        name: "Ricardo Hernández",
        role: "Socio estratégico y cofundador",
        bio: "Se incorporó a Driven Group en 2026 como socio estratégico para fortalecer y acelerar la consolidación y expansión del grupo. Ricardo aporta experiencia en desarrollo empresarial y visión estratégica para la escalabilidad de las divisiones de negocio, real estate y educación.",
      },
    ],
  },
  en: {
    eyebrow: "LEADERSHIP",
    title: "Our Leadership",
    leaders: [
      {
        name: "Iván Rodríguez",
        role: "Chief Executive Officer and Founder",
        bio: "Founder of Driven Group in 2022 with the vision of building a global company from Guadalajara, Jalisco. Iván has led the company’s evolution from real estate into an integrated business ecosystem spanning business, real estate, and education, with operations across Europe and North America.",
      },
      {
        name: "Ricardo Hernández",
        role: "Strategic Partner and Co-Founder",
        bio: "Ricardo joined Driven Group in 2026 as a strategic partner to strengthen and accelerate the group’s consolidation and expansion. He contributes business-development experience and strategic vision to scale the business, real estate, and education divisions.",
      },
    ],
  },
};

export function CEOsSection() {
  const locale = useLocale();
  const t = content[locale === "en" ? "en" : "es"];
  const [isNight, setIsNight] = useState(false);

  useEffect(() => {
    const syncTheme = () => setIsNight(document.documentElement.dataset.theme === "night");
    syncTheme();
    window.addEventListener(THEME_EVENT, syncTheme);
    return () => window.removeEventListener(THEME_EVENT, syncTheme);
  }, []);

  const colors = isNight
    ? {
        section: "bg-[#171717]",
        eyebrow: "text-white/45",
        shell: "border-white/15 bg-[#1d1d1d] shadow-[0_18px_44px_rgba(0,0,0,0.34)]",
        media: "bg-[#3f3f3f]",
        divider: "divide-white/15",
        name: "text-white",
        role: "text-white/55",
        copy: "text-white/75",
      }
    : {
        section: "bg-[#f5f5f3]",
        eyebrow: "text-dark-gray/60",
        shell: "border-[#d4d2cf] bg-white shadow-[0_18px_44px_rgba(37,37,37,0.09)]",
        media: "bg-[#a8a8a8]",
        divider: "divide-[#d4d2cf]",
        name: "text-black",
        role: "text-dark-gray/65",
        copy: "text-dark-gray/85",
      };

  return (
    <section className={`${colors.section} py-20 transition-colors duration-500 sm:py-24 md:py-32`}>
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <p className={`mb-7 editorial-label sm:mb-9 ${colors.eyebrow}`}>{t.eyebrow}</p>

        <div className={`overflow-hidden rounded-2xl border transition-colors duration-500 ${colors.shell}`}>
          <div className={`relative min-h-[24rem] overflow-hidden ${colors.media} sm:min-h-[32rem] lg:min-h-[36rem]`}>
            <div className="absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-black/20 to-transparent" />
            <div className="absolute inset-y-0 left-1/2 w-px bg-white/35" />
            <div className="relative mx-auto h-full min-h-[24rem] w-[min(100%,24rem)] sm:min-h-[32rem] sm:w-[min(100%,28rem)] lg:min-h-[36rem]">
              <Image
                src="/images2/Ambos/img-9.png"
                alt={t.title}
                fill
                priority={false}
                className="object-contain object-bottom"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 28rem, 28rem"
              />
            </div>
          </div>

          <div className={`grid grid-cols-1 divide-y lg:grid-cols-2 lg:divide-x lg:divide-y-0 ${colors.divider}`}>
            {t.leaders.map((leader) => (
              <article key={leader.name} className="p-6 sm:p-8 lg:p-10">
                <p className={`editorial-label ${colors.role}`}>DRIVEN GROUP</p>
                <h3 className={`mt-3 font-serif text-2xl font-medium tracking-tight sm:text-3xl ${colors.name}`}>{leader.name}</h3>
                <p className={`editorial-label mt-2 ${colors.role}`}>{leader.role}</p>
                <p className={`mt-6 text-base font-light leading-[1.8] sm:text-lg ${colors.copy}`}>{leader.bio}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
