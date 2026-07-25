"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useLocale } from "next-intl";
import { Icon } from "@/components/ui/Icon";

type Language = "es" | "en";

const slides = [
  {
    image: "/images1/academy-driven-financial-workshop.webp",
    position: "60% center",
    href: "#driven-academy",
    external: false,
    copy: {
      es: { label: "DRIVEN ACADEMY", title: "Conocimiento que impulsa decisiones con propósito.", action: "Conocer Academy" },
      en: { label: "DRIVEN ACADEMY", title: "Knowledge that empowers purposeful decisions.", action: "Discover Academy" },
    },
  },
  {
    image: "/images1/academy-digital-learning-v1.webp",
    position: "center center",
    href: "https://driven-academy.com/modo-rico",
    external: true,
    copy: {
      es: { label: "MODO RICO", title: "Una metodología práctica para ordenar tus finanzas.", action: "Ir a Modo Rico" },
      en: { label: "MODO RICO", title: "A practical methodology for organizing your finances.", action: "Visit Modo Rico" },
    },
  },
  {
    image: "/images1/academy-nexora-platform-v1.webp",
    position: "center center",
    href: "#nexora",
    external: false,
    copy: {
      es: { label: "NEXORAMR", title: "Inteligencia para visualizar tu patrimonio en un solo lugar.", action: "Conocer NEXORAMR" },
      en: { label: "NEXORAMR", title: "Intelligence to view your wealth in one place.", action: "Discover NEXORAMR" },
    },
  },
] as const;

const AUTO_ADVANCE_DELAY = 12_000;

export function AcademyHeroSection() {
  const locale = useLocale();
  const language: Language = locale === "en" ? "en" : "es";
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const activeSlide = slides[activeIndex];
  const copy = activeSlide.copy[language];

  useEffect(() => {
    if (isPaused) return;
    const timer = window.setInterval(() => setActiveIndex((current) => (current + 1) % slides.length), AUTO_ADVANCE_DELAY);
    return () => window.clearInterval(timer);
  }, [isPaused]);

  return (
    <header className="relative bg-white pt-16 sm:pt-20">
      <section className="relative overflow-hidden bg-black sm:flex sm:min-h-[85vh] sm:items-end md:min-h-[90vh]" aria-roledescription="carousel" aria-label="Driven Academy" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
        <div className="relative aspect-video bg-black sm:absolute sm:inset-0 sm:aspect-auto">
          {slides.map((slide, index) => <Image key={slide.href} src={slide.image} alt={slide.copy[language].label} fill priority={index === 0} sizes="100vw" style={{ objectPosition: slide.position }} className={`absolute inset-0 h-full w-full object-contain transition-opacity duration-[1800ms] ease-in-out sm:object-cover ${index === activeIndex ? "opacity-100" : "opacity-0"}`} />)}
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent sm:from-black/68 sm:via-black/24 sm:to-black/5" />
        </div>
        <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col gap-6 bg-black px-6 py-7 sm:gap-7 sm:bg-transparent sm:px-8 sm:pb-14 sm:pt-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl border-l border-white/70 pl-5 text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.45)] sm:pl-6">
            <p className="text-[11px] font-semibold tracking-[0.28em] text-white/70">{copy.label}</p>
            <h1 className="mt-3 font-serif text-3xl italic leading-[1.1] tracking-tight sm:text-5xl md:text-6xl">{copy.title}</h1>
            <a href={activeSlide.href} target={activeSlide.external ? "_blank" : undefined} rel={activeSlide.external ? "noreferrer" : undefined} className="mt-5 inline-flex items-center gap-3 border-b border-white/45 pb-2 text-xs font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:border-white hover:text-white/75 sm:mt-6 sm:text-sm">
              {copy.action}<Icon name="north_east" className="h-4 w-4" />
            </a>
          </div>
          <div className="flex items-center self-start gap-2 opacity-70 transition-opacity hover:opacity-100 focus-within:opacity-100 lg:self-auto">
            {slides.map((slide, index) => <button key={slide.href} type="button" onClick={() => setActiveIndex(index)} aria-label={slide.copy[language].label} aria-current={index === activeIndex ? "true" : undefined} className={`h-1.5 rounded-full transition-all duration-300 ${index === activeIndex ? "w-8 bg-white" : "w-1.5 bg-white/50 hover:bg-white"}`} />)}
          </div>
        </div>
      </section>
    </header>
  );
}
