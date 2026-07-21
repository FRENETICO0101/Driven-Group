"use client";

import { useLocale } from "next-intl";

const content = {
  es: { eyebrow: "PRINCIPIO CENTRAL", quote: "Tu reputación es tu patrimonio más valioso", body: "Este principio guía cada decisión, cada alianza y cada interacción en Driven Group. Entendemos que en bienes raíces de lujo e inversión estratégica, la confianza es la moneda más valiosa. Construimos relaciones duraderas a través de integridad, transparencia y cumplimiento de promesas." },
  en: { eyebrow: "CORE PRINCIPLE", quote: "Your reputation is your most valuable asset", body: "This principle guides every decision, partnership, and interaction at Driven Group. We understand that in luxury real estate and strategic investment, trust is the most valuable currency. We build enduring relationships through integrity, transparency, and keeping our promises." },
};

export function ReputationSection() {
  const locale = useLocale(); const t = content[locale === "en" ? "en" : "es"];
  return <section className="border-y border-light-gray bg-white py-20 sm:py-24 md:py-32"><div className="mx-auto max-w-4xl px-6 text-center sm:px-8"><p className="editorial-label mb-8 tracking-[0.15em] text-gray">{t.eyebrow}</p><blockquote><p className="mb-8 font-serif text-3xl italic leading-[1.3] tracking-tight text-black sm:text-4xl md:text-5xl">“{t.quote}”</p><p className="text-lg font-light leading-relaxed text-dark-gray">{t.body}</p></blockquote></div></section>;
}
