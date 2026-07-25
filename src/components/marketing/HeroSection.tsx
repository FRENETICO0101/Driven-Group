"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useLocale } from "next-intl";
import { Icon } from "@/components/ui/Icon";

type Locale = "es" | "en";

const slides = [
  { href: "/real-estate", image: "/images1/real-estate-miami-vertical-developments.webp", position: "center center", copy: { es: { label: "DRIVEN REAL ESTATE", action: "Explorar propiedades" }, en: { label: "DRIVEN REAL ESTATE", action: "Explore properties" } } },
  { href: "/business", image: "/images1/business-alliances-hero-v2.webp", position: "center center", copy: { es: { label: "DRIVEN BUSINESS", action: "Conocer Business" }, en: { label: "DRIVEN BUSINESS", action: "Discover Business" } } },
  { href: "/academy", image: "/images1/academy-driven-financial-workshop.webp", position: "60% center", copy: { es: { label: "DRIVEN ACADEMY", action: "Conocer Academy" }, en: { label: "DRIVEN ACADEMY", action: "Discover Academy" } } },
] as const;

const AUTO_ADVANCE_DELAY = 16_000;

export function HeroSection() {
  const locale = useLocale();
  const language: Locale = locale === "en" ? "en" : "es";
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = window.setInterval(() => setActiveIndex((current) => (current + 1) % slides.length), AUTO_ADVANCE_DELAY);
    return () => window.clearInterval(timer);
  }, [isPaused]);

  const activeSlide = slides[activeIndex];
  const copy = activeSlide.copy[language];
  const previous = () => setActiveIndex((current) => (current - 1 + slides.length) % slides.length);
  const next = () => setActiveIndex((current) => (current + 1) % slides.length);

  return (
    <header className="relative bg-white pt-16 sm:pt-20">
      <section aria-roledescription="carousel" aria-label="Driven Group" className="relative flex min-h-[calc(100svh-4rem)] items-end overflow-hidden sm:min-h-[85vh] md:min-h-[90vh]" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
        {slides.map((slide, index) => (
          <Image key={slide.href} src={slide.image} alt={slide.copy[language].label} fill priority={index === 0} sizes="100vw" className={`absolute inset-0 h-full w-full object-cover transition-all duration-[1600ms] ease-out ${index === activeIndex ? "scale-100 opacity-100" : "scale-[1.025] opacity-0"}`} style={{ objectPosition: slide.position }} />
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-black/68 via-black/25 to-black/5" />

        <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col justify-end gap-7 px-6 pb-9 sm:px-8 sm:pb-12 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-sm border-l border-white/70 pl-5 text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.45)] sm:pl-6">
            <h1 className="sr-only">{copy.label}</h1>
            <p className="text-[11px] font-semibold tracking-[0.28em] text-white/70">{copy.label}</p>
            <Link href={activeSlide.href} className="mt-4 inline-flex items-center gap-3 border-b border-white/45 pb-2 text-sm font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:border-white hover:text-white/75">
              {copy.action}<Icon name="north_east" className="h-4 w-4" />
            </Link>
          </div>

          <div className="group flex items-center self-start gap-2 opacity-65 transition-opacity hover:opacity-100 focus-within:opacity-100 lg:self-auto" aria-label="Carousel controls">
            <button type="button" onClick={previous} className="inline-flex h-7 w-7 items-center justify-center rounded-full text-white/75 transition-colors hover:bg-black/25 hover:text-white focus-visible:bg-black/25 focus-visible:outline focus-visible:outline-1 focus-visible:outline-white/70" aria-label={language === "es" ? "Imagen anterior" : "Previous image"}><Icon name="arrow_back" className="h-4 w-4" /></button>
            <div className="flex items-center gap-1.5">{slides.map((slide, index) => <button key={slide.href} type="button" onClick={() => setActiveIndex(index)} className={`h-1 rounded-full transition-all duration-300 ${index === activeIndex ? "w-6 bg-white" : "w-1 bg-white/45 hover:bg-white/80"}`} aria-label={slide.copy[language].label} aria-current={index === activeIndex ? "true" : undefined} />)}</div>
            <button type="button" onClick={next} className="inline-flex h-7 w-7 items-center justify-center rounded-full text-white/75 transition-colors hover:bg-black/25 hover:text-white focus-visible:bg-black/25 focus-visible:outline focus-visible:outline-1 focus-visible:outline-white/70" aria-label={language === "es" ? "Siguiente imagen" : "Next image"}><Icon name="arrow_forward" className="h-4 w-4" /></button>
          </div>
        </div>
      </section>
    </header>
  );
}
