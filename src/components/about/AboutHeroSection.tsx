"use client";

import { useEffect, useState } from "react";
import { useLocale } from "next-intl";
import { BrandLogo } from "@/components/ui/BrandLogo";

const slides = [
  {
    title: "Driven Real Estate",
    variant: "realEstate",
    division: "realEstate",
    copy: {
      es: "Perspectiva inmobiliaria para decisiones patrimoniales en ubicaciones excepcionales.",
      en: "Real-estate perspective for wealth decisions in exceptional locations.",
    },
  },
  {
    title: "Driven Academy",
    variant: "academy",
    division: "academy",
    copy: {
      es: "Conocimiento práctico para tomar decisiones con mayor claridad y dirección.",
      en: "Practical knowledge to make decisions with greater clarity and direction.",
    },
  },
  {
    title: "Driven Business",
    variant: "business",
    division: "business",
    copy: {
      es: "Estructuras estratégicas que conectan mercados, alianzas y oportunidades.",
      en: "Strategic structures that connect markets, alliances and opportunities.",
    },
  },
] as const;

const AUTO_ADVANCE_DELAY = 15_000;

export function AboutHeroSection() {
  const locale = useLocale();
  const language = locale === "en" ? "en" : "es";
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const activeSlide = slides[activeIndex];

  useEffect(() => {
    if (isPaused) return;
    const timer = window.setInterval(() => setActiveIndex((current) => (current + 1) % slides.length), AUTO_ADVANCE_DELAY);
    return () => window.clearInterval(timer);
  }, [isPaused]);

  return (
    <header className="relative bg-white pt-16 sm:pt-20">
      <section
        className="about-division-hero relative min-h-[calc(100svh-4rem)] overflow-hidden text-white sm:min-h-[85vh] md:min-h-[90vh]"
        data-division={activeSlide.division}
        aria-roledescription="carousel"
        aria-label="Driven Group"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="relative mx-auto flex min-h-[calc(100svh-4rem)] max-w-[1440px] flex-col justify-between px-7 py-10 sm:min-h-[85vh] sm:px-12 sm:py-14 md:min-h-[90vh] lg:px-20">
          <div className="flex flex-1 items-center justify-center">
            <div className="about-division-logo-frame flex w-full max-w-2xl items-center justify-center border border-white/15 bg-black/20 px-10 py-16 shadow-[0_30px_80px_rgba(0,0,0,.32)] backdrop-blur-[2px] sm:px-16 sm:py-20">
              <BrandLogo variant={activeSlide.variant} className="w-full max-w-xs sm:max-w-sm" />
            </div>
          </div>

          <div className="flex items-end justify-between gap-8">
            <div className="max-w-md border-l border-white/55 pl-5 drop-shadow-[0_3px_14px_rgba(0,0,0,.66)] sm:pl-6">
              <p className="editorial-label mb-3 text-white/65">0{activeIndex + 1} — DRIVEN GROUP</p>
              <p className="max-w-sm text-sm leading-relaxed text-white/85 sm:text-base">{activeSlide.copy[language]}</p>
            </div>

            <div className="mb-1 flex gap-2" aria-label={language === "es" ? "Seleccionar división" : "Select division"}>
              {slides.map((slide, index) => (
                <button key={slide.title} type="button" onClick={() => setActiveIndex(index)} aria-label={slide.title} aria-current={index === activeIndex ? "true" : undefined} className={`h-1.5 rounded-full transition-all duration-300 ${index === activeIndex ? "w-9 bg-white" : "w-2 bg-white/45 hover:bg-white/80"}`} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </header>
  );
}
