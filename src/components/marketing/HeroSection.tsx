"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useLocale } from "next-intl";
import { Icon } from "@/components/ui/Icon";

type Locale = "es" | "en";

const slides = [
  { href: "/real-estate", image: "/property-assets/brickell/mandarin-oriental-residences/gallery/mandarin-oriental-miami-ph-crowd.webp", position: "52% 46%", crop: "scale-[1.12]", copy: { es: { label: "DRIVEN REAL ESTATE", action: "Explorar propiedades" }, en: { label: "DRIVEN REAL ESTATE", action: "Explore properties" } } },
  { href: "/business", image: "/images1/business-alliances-hero-v2.webp", position: "center center", crop: "scale-100", copy: { es: { label: "DRIVEN BUSINESS", action: "Conocer Business" }, en: { label: "DRIVEN BUSINESS", action: "Discover Business" } } },
  { href: "/academy", image: "/images1/academy-driven-financial-workshop.webp", position: "60% center", crop: "scale-100", copy: { es: { label: "DRIVEN ACADEMY", action: "Conocer Academy" }, en: { label: "DRIVEN ACADEMY", action: "Discover Academy" } } },
] as const;

const AUTO_ADVANCE_DELAY = 3_000;

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

  return (
    <header className="relative bg-white pt-16 sm:pt-20">
      <section aria-roledescription="carousel" aria-label="Driven Group" className="relative flex h-[46svh] min-h-[20rem] items-end overflow-hidden sm:h-[64svh] sm:min-h-[36rem] md:h-[68svh]" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
        {slides.map((slide, index) => (
          <Image key={slide.href} src={slide.image} alt={slide.copy[language].label} fill priority={index === 0} quality={90} sizes="100vw" className={`absolute inset-0 h-full w-full object-cover transition-all duration-[1600ms] ease-out ${index === activeIndex ? `${slide.crop} opacity-100` : "scale-[1.025] opacity-0"}`} style={{ objectPosition: slide.position }} />
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-black/68 via-black/25 to-black/5" />

        <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col justify-end gap-7 px-6 pb-9 sm:px-8 sm:pb-12 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-sm border-l border-white/70 pl-5 text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.45)] sm:pl-6">
            <h1 className="sr-only">{copy.label}</h1>
            <p className="text-[11px] font-semibold tracking-[0.28em] text-white/70">{copy.label}</p>
            <Link href={activeSlide.href} className="mt-4 inline-flex items-center gap-2 border-b border-white/35 pb-1.5 text-[11px] font-medium uppercase tracking-[0.14em] text-white/85 transition-colors hover:border-white hover:text-white">
              {copy.action}<Icon name="north_east" className="h-4 w-4" />
            </Link>
          </div>

          <div className="flex items-center self-start gap-2 lg:self-auto" aria-label="Carousel controls">
            {slides.map((slide, index) => <button key={slide.href} type="button" onClick={() => setActiveIndex(index)} className={`rounded-full shadow-[0_1px_3px_rgba(0,0,0,0.7)] transition-all duration-300 ${index === activeIndex ? "h-1.5 w-7 bg-white" : "h-1.5 w-1.5 bg-white/65 hover:bg-white"}`} aria-label={slide.copy[language].label} aria-current={index === activeIndex ? "true" : undefined} />)}
          </div>
        </div>
      </section>
    </header>
  );
}
