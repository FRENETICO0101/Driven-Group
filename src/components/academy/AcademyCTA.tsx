"use client";

import { useLocale } from "next-intl";

const copy = {
  es: {
    modoLabel: "MODO RICO",
    modoTitle: "Una ruta práctica para tu patrimonio.",
    modoBody: "Conoce la metodología de educación financiera creada por Driven Academy.",
    modoAction: "IR A MODO RICO",
    nexoraLabel: "NEXORA®",
    nexoraTitle: "Inteligencia para tus decisiones financieras.",
    nexoraBody: "Una plataforma personal para visualizar tus finanzas, metas y patrimonio en un solo lugar.",
  },
  en: {
    modoLabel: "MODO RICO",
    modoTitle: "A practical route to your wealth.",
    modoBody: "Discover the financial education methodology created by Driven Academy.",
    modoAction: "VISIT MODO RICO",
    nexoraLabel: "NEXORA®",
    nexoraTitle: "Intelligence for your financial decisions.",
    nexoraBody: "A personal platform to view your finances, goals, and wealth in one place.",
  },
} as const;

export function AcademyCTA() {
  const locale = useLocale();
  const t = copy[locale === "en" ? "en" : "es"];

  return (
    <section className="mx-auto grid max-w-6xl gap-5 px-6 py-20 sm:px-8 sm:py-24 md:grid-cols-2 md:py-32">
      <article className="rounded-2xl bg-black p-8 text-white sm:p-10">
        <p className="editorial-label text-white/45">{t.modoLabel}</p>
        <h2 className="mt-4 max-w-md font-serif text-4xl font-black leading-[1.1] sm:text-5xl">{t.modoTitle}</h2>
        <p className="mt-5 max-w-md text-base leading-relaxed text-white/65">{t.modoBody}</p>
        <a href="https://driven-academy.com/modo-rico" target="_blank" rel="noreferrer" className="mt-8 inline-flex items-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-bold text-black transition-transform hover:-translate-y-0.5">{t.modoAction}<span className="material-symbols-outlined text-base">north_east</span></a>
      </article>
      <article id="nexora" className="scroll-mt-24 rounded-2xl border border-light-gray bg-white p-8 sm:p-10">
        <p className="editorial-label text-gray">{t.nexoraLabel}</p>
        <h2 className="mt-4 max-w-md font-serif text-4xl font-black leading-[1.1] text-black sm:text-5xl">{t.nexoraTitle}</h2>
        <p className="mt-5 max-w-md text-base leading-relaxed text-dark-gray">{t.nexoraBody}</p>
      </article>
    </section>
  );
}
