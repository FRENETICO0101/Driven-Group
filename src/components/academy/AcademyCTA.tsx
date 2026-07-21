"use client";

import { useLocale } from "next-intl";

const copy = {
  es: { label: "OFERTA DE LANZAMIENTO", title: "Empieza a construir una vida financiera con dirección.", body: "Sé parte de la primera generación de Modo Rico y aplica un método práctico desde el primer día.", proof: "Acceso online 24/7 · Formación práctica · Garantía de 7 días", primary: "QUIERO APLICAR ESTE MÉTODO", secondary: "VER LA CURRÍCULA", access: "ACCESO ONLINE 24/7", community: "COMUNIDAD PRIVADA", guarantee: "GARANTÍA DE 7 DÍAS" },
  en: { label: "LAUNCH OFFER", title: "Start building a financial life with direction.", body: "Join the first Modo Rico generation and apply a practical method from day one.", proof: "Online access 24/7 · Practical learning · 7-day guarantee", primary: "I WANT TO APPLY THIS METHOD", secondary: "VIEW THE CURRICULUM", access: "ONLINE ACCESS 24/7", community: "PRIVATE COMMUNITY", guarantee: "7-DAY GUARANTEE" },
};

export function AcademyCTA() {
  const locale = useLocale(); const t = copy[locale === "en" ? "en" : "es"];
  return <section className="mx-auto max-w-7xl px-6 py-20 sm:px-8 sm:py-24 md:py-32"><div className="rounded-2xl bg-black p-10 text-center shadow-2xl sm:p-16 md:p-20"><p className="editorial-label mb-4 text-white/40">{t.label}</p><h2 className="mx-auto mb-6 max-w-2xl font-serif text-3xl font-black leading-[1.2] text-white sm:text-4xl md:text-5xl">{t.title}</h2><p className="mx-auto mb-4 max-w-xl text-lg leading-relaxed text-white/60">{t.body}</p><p className="mb-10 text-sm font-semibold uppercase tracking-wide text-gray">{t.proof}</p><div className="flex flex-col justify-center gap-3 sm:flex-row"><a href="https://driven-academy.com/modo-rico" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-7 py-3.5 text-sm font-bold text-black transition-transform hover:-translate-y-0.5 hover:bg-gray">{t.primary}<span className="material-symbols-outlined text-base">north_east</span></a><a href="#modulos" className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/30 px-7 py-3.5 text-sm font-bold text-white transition-colors hover:bg-white/10">{t.secondary}<span className="material-symbols-outlined text-base">arrow_upward</span></a></div><div className="mt-10 flex flex-wrap justify-center gap-6 text-xs tracking-widest text-white/40"><span>{t.access}</span><span>{t.community}</span><span>{t.guarantee}</span></div></div></section>;
}
