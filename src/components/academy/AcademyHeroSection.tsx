"use client";

import Image from "next/image";
import { useLocale } from "next-intl";

const copy = {
  es: { label: "LANZAMIENTO OFICIAL — DRIVEN ACADEMY", subtitle1: "Una nueva forma de entender el dinero.", subtitle2: "Una nueva forma de vivir.", cta: "QUIERO APLICAR ESTE MÉTODO" },
  en: { label: "OFFICIAL LAUNCH — DRIVEN ACADEMY", subtitle1: "A new way to understand money.", subtitle2: "A new way to live.", cta: "I WANT TO APPLY THIS METHOD" },
};

export function AcademyHeroSection() {
  const locale = useLocale(); const t = copy[locale === "en" ? "en" : "es"];
  return <header className="relative bg-white pt-16 sm:pt-20"><div className="relative flex min-h-screen items-center overflow-hidden sm:min-h-[85vh] md:min-h-[90vh]"><div className="absolute inset-0 z-0"><div className="hero-gradient absolute inset-0 z-10" /><Image alt="Driven Academy financial learning session" className="image-zoom h-full w-full object-cover" src="/images1/academy-driven-financial-workshop.png" fill priority sizes="100vw" style={{ objectPosition: "60% center" }} /></div><div className="absolute right-8 top-8 z-30 text-center"><span className="material-symbols-outlined block text-2xl text-white">school</span><p className="mt-2 text-xs font-semibold tracking-widest text-white">ACADEMY</p></div><div className="relative z-20 mx-auto w-full max-w-7xl px-6 sm:px-8"><div className="max-w-3xl"><p className="editorial-label fade-in-delay-50 mb-4 text-white/60">{t.label}</p><h1 className="fade-in-delay-100 mb-4 font-serif text-5xl italic leading-[1.1] tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl">Modo Rico</h1><p className="fade-in-delay-150 mb-2 text-lg font-light text-white/80 sm:text-xl">{t.subtitle1}</p><p className="fade-in-delay-150 mb-10 text-lg font-light text-gray sm:text-xl">{t.subtitle2}</p><a href="#academy-cta" className="fade-in-delay-200 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-gray transition-colors hover:text-white sm:text-base"><span>{t.cta}</span><span className="material-symbols-outlined text-lg">north_east</span></a></div></div></div></header>;
}
