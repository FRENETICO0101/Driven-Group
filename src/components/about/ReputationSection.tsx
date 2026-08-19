"use client";

import { useLocale } from "next-intl";

const content = {
  es: {
    eyebrow: "PRINCIPIO CENTRAL",
    quote: "Al final, lo que cuenta es tu reputación.",
    body: "Este principio guía cada decisión, cada alianza y cada interacción en Driven Group. Entendemos que la confianza es la moneda más valiosa. Construimos relaciones duraderas a través de integridad, transparencia y cumplimiento de promesas.",
  },
  en: {
    eyebrow: "CORE PRINCIPLE",
    quote: "All said & done, it’s your reputation that counts.",
    body: "We understand that trust is the most valuable currency. We build enduring relationships through integrity, transparency, and keeping our promises.",
  },
};

export function ReputationSection() {
  const locale = useLocale();
  const t = content[locale === "en" ? "en" : "es"];

  return (
    <section className="border-y border-light-gray bg-white py-20 sm:py-28 md:py-36">
      <div className="mx-auto max-w-6xl px-6 text-center sm:px-8">
        <p className="editorial-label mb-7 tracking-[0.18em] text-gray sm:mb-9">{t.eyebrow}</p>
        <blockquote>
          <p className="mx-auto max-w-5xl text-balance font-serif text-3xl italic leading-[1.18] tracking-tight text-black sm:text-4xl md:text-5xl lg:text-6xl">
            “{t.quote}”
          </p>
          <div className="mx-auto my-8 h-px w-12 bg-black/20 sm:my-10" />
          <p className="mx-auto max-w-3xl text-pretty text-base font-light leading-[1.8] text-dark-gray sm:text-lg">{t.body}</p>
        </blockquote>
      </div>
    </section>
  );
}
