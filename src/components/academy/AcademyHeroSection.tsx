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
      es: { label: "NEXORA", title: "Inteligencia para visualizar tu patrimonio en un solo lugar.", action: "Conocer Nexora" },
      en: { label: "NEXORA", title: "Intelligence to view your wealth in one place.", action: "Discover Nexora" },
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
      <section className="relative flex min-h-[calc(100svh-4rem)] items-end overflow-hidden sm:min-h-[85vh] md:min-h-[90vh]" aria-roledescription="carousel" aria-label="Driven Academy" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
        {slides.map((slide, index) => <Image key={slide.href} src={slide.image} alt={slide.copy[language].label} fill priority={index === 0} sizes="100vw" style={{ objectPosition: slide.position }} className={`absolute inset-0 h-full w-full object-cover transition-all duration-[1400ms] ease-out ${index === activeIndex ? "scale-100 opacity-100" : "scale-[1.025] opacity-0"}`} />)}
        <div className="absolute inset-0 bg-gradient-to-t from-black/68 via-black/24 to-black/5" />
        <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col gap-7 px-6 pb-10 sm:px-8 sm:pb-14 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl border-l border-white/70 pl-5 text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.45)] sm:pl-6">
            <p className="text-[11px] font-semibold tracking-[0.28em] text-white/70">{copy.label === "NEXORA" ? "NEXORAMR" : copy.label}</p>
            <h1 className="mt-3 font-serif text-4xl italic leading-[1.1] tracking-tight sm:text-5xl md:text-6xl">{copy.title}</h1>
            <a href={activeSlide.href} target={activeSlide.external ? "_blank" : undefined} rel={activeSlide.external ? "noreferrer" : undefined} className="mt-6 inline-flex items-center gap-3 border-b border-white/45 pb-2 text-sm font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:border-white hover:text-white/75">
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
