"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useLocale } from "next-intl";

const slides = [
  { src: "/images1/real-estate-miami-vertical-developments.png", alt: { es: "Driven Real Estate en Miami", en: "Driven Real Estate in Miami" }, position: "center center" },
  { src: "/images1/academy-digital-learning-v1.webp", alt: { es: "Driven Academy, aprendizaje digital", en: "Driven Academy digital learning" }, position: "center center" },
  { src: "/images1/business-global-hero-v2.webp", alt: { es: "Driven Business, visión global", en: "Driven Business global vision" }, position: "center center" },
] as const;

const AUTO_ADVANCE_DELAY = 12_000;

export function AboutHeroSection() {
  const locale = useLocale();
  const language = locale === "en" ? "en" : "es";
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = window.setInterval(() => setActiveIndex((current) => (current + 1) % slides.length), AUTO_ADVANCE_DELAY);
    return () => window.clearInterval(timer);
  }, [isPaused]);

  return (
    <header className="relative bg-white pt-16 sm:pt-20">
      <section className="relative min-h-[calc(100svh-4rem)] overflow-hidden sm:min-h-[85vh] md:min-h-[90vh]" aria-roledescription="carousel" aria-label="Driven Group" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
        {slides.map((slide, index) => <Image key={slide.src} src={slide.src} alt={slide.alt[language]} fill priority={index === 0} sizes="100vw" style={{ objectPosition: slide.position }} className={`absolute inset-0 h-full w-full object-cover transition-all duration-[1400ms] ease-out ${index === activeIndex ? "scale-100 opacity-100" : "scale-[1.025] opacity-0"}`} />)}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/10" />
        <div className="absolute inset-x-0 bottom-0 z-10 flex justify-center pb-8 sm:pb-10">
          <div className="flex items-center gap-1.5 opacity-60 transition-opacity hover:opacity-100 focus-within:opacity-100">
            {slides.map((slide, index) => <button key={slide.src} type="button" onClick={() => setActiveIndex(index)} aria-label={slide.alt[language]} aria-current={index === activeIndex ? "true" : undefined} className={`h-1.5 rounded-full transition-all duration-300 ${index === activeIndex ? "w-8 bg-white" : "w-1.5 bg-white/50 hover:bg-white"}`} />)}
          </div>
        </div>
      </section>
    </header>
  );
}
