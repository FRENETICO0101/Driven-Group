"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useLocale } from "next-intl";
import { Icon } from "@/components/ui/Icon";
import { AcademyBrandLogo } from "@/components/academy/AcademyBrandLogo";

type Language = "es" | "en";
const MODO_RICO_URL = "https://driven-academy.com/modo-rico";

const slides = [
  {
    image: "/images1/academy-virtual-classroom.webp",
    position: "60% center",
    href: MODO_RICO_URL,
    external: true,
    copy: {
      es: { label: "DRIVEN ACADEMY", title: "Donde la experiencia se convierte en conocimiento", action: "Conocer Academy" },
      en: { label: "DRIVEN ACADEMY", title: "Knowledge that empowers purposeful decisions.", action: "Discover Academy" },
    },
  },
  {
    image: "/images1/modo-rico-course-ecosystem-v1.webp",
    position: "center center",
    href: MODO_RICO_URL,
    external: true,
    copy: {
      es: { label: "MODO RICO", title: "La nueva forma de aprender finanzas personales", action: "Ir a Modo Rico" },
      en: { label: "MODO RICO", title: "A practical methodology for organizing your finances.", action: "Visit Modo Rico" },
    },
  },
  {
    image: "/images1/academy-digital-learning-v1.webp",
    position: "center center",
    href: MODO_RICO_URL,
    external: true,
    copy: {
      es: { label: "NEXORAMR", title: "Plataforma inteligente de finanzas personales", action: "Conocer NEXORAMR" },
      en: { label: "NEXORAMR", title: "Intelligence to view your wealth in one place.", action: "Discover NEXORAMR" },
    },
  },
] as const;

const AUTO_ADVANCE_DELAY = 3_000;

export function AcademyHeroSection() {
  const locale = useLocale();
  const language: Language = locale === "en" ? "en" : "es";
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const activeSlide = slides[activeIndex];
  const copy = activeSlide.copy[language];
  const activeBrand = activeIndex === 1 ? "modo-rico" : activeIndex === 2 ? "nexoramr" : null;

  useEffect(() => {
    if (isPaused) return;
    const timer = window.setInterval(() => setActiveIndex((current) => (current + 1) % slides.length), AUTO_ADVANCE_DELAY);
    return () => window.clearInterval(timer);
  }, [isPaused]);

  return (
    <header className="relative bg-white pt-16 sm:pt-20">
      <section className="relative flex h-[62svh] min-h-[31rem] items-end overflow-hidden bg-black sm:h-[64svh] sm:min-h-[36rem] md:h-[68svh]" aria-roledescription="carousel" aria-label="Driven Academy" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
        <div className="absolute inset-0 bg-black">
          {slides.map((slide, index) => (
            <div key={slide.href} className={`absolute inset-0 transition-opacity duration-[1800ms] ease-in-out ${index === activeIndex ? "opacity-100" : "opacity-0"}`}>
              <Image src={slide.image} alt={slide.copy[language].label} fill priority={index === 0} quality={100} sizes="100vw" style={{ objectPosition: slide.position }} className="object-cover" />
            </div>
          ))}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.78)_0%,rgba(0,0,0,0.42)_18%,transparent_42%,transparent_62%,rgba(0,0,0,0.32)_82%,rgba(0,0,0,0.68)_100%)]" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent sm:from-black/68 sm:via-black/24 sm:to-black/5" />
        </div>
        <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col gap-6 bg-gradient-to-t from-black via-black/90 to-transparent px-6 pb-7 pt-20 sm:gap-7 sm:bg-transparent sm:px-8 sm:pb-14 sm:pt-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl border-l border-white/55 pl-5 text-white drop-shadow-[0_1px_7px_rgba(0,0,0,0.32)] sm:pl-6">
            {activeBrand ? (
              <AcademyBrandLogo brand={activeBrand} tone="dark" className="w-28 sm:w-52" />
            ) : (
              <p className="text-[9px] font-normal tracking-[0.2em] text-white/60">{copy.label}</p>
            )}
            <h1 className="mt-2.5 max-w-md font-serif text-base font-[300] italic leading-[1.28] tracking-tight text-white/88 sm:text-xl md:text-2xl">{copy.title}</h1>
            <a href={activeSlide.href} target={activeSlide.external ? "_blank" : undefined} rel={activeSlide.external ? "noreferrer" : undefined} className="mt-3.5 inline-flex items-center gap-1.5 border-b border-white/35 pb-1 text-[10px] font-normal uppercase tracking-[0.09em] text-white/82 transition-colors hover:border-white hover:text-white/75 sm:mt-4 sm:text-[11px]">
              {copy.action}<Icon name="north_east" className="h-4 w-4" />
            </a>
          </div>
          <div className="flex items-center self-start gap-2 lg:self-auto">
            {slides.map((slide, index) => <button key={slide.href} type="button" onClick={() => setActiveIndex(index)} aria-label={slide.copy[language].label} aria-current={index === activeIndex ? "true" : undefined} className={`rounded-full shadow-[0_1px_3px_rgba(0,0,0,0.7)] transition-all duration-300 ${index === activeIndex ? "h-1.5 w-7 bg-white" : "h-1.5 w-1.5 bg-white/65 hover:bg-white"}`} />)}
          </div>
        </div>
      </section>
    </header>
  );
}
