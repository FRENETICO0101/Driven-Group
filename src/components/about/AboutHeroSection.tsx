"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { BrandLogo } from "@/components/ui/BrandLogo";

const slides = [
  { title: "Driven Real Estate", variant: "realEstate", image: "/property-assets/brickell/1428-brickell/gallery/private-dining-hummingbird.webp", position: "center center", fit: "contain" },
  { title: "Driven Academy", variant: "academy", image: "/images1/academy-driven-financial-workshop.png", position: "center center", fit: "cover" },
  { title: "Driven Business", variant: "business", image: "/images1/business-executive-miami-v1.webp", position: "center center", fit: "cover" },
] as const;

const AUTO_ADVANCE_DELAY = 15_000;

export function AboutHeroSection() {
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
      <section className="relative min-h-[34rem] overflow-hidden bg-[#151515] sm:min-h-[38rem]" aria-roledescription="carousel" aria-label="Driven Group" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
        {slides.map((slide, index) => (
          <div key={slide.title} className={`absolute inset-0 transition-opacity duration-[1400ms] ease-out ${index === activeIndex ? "opacity-100" : "opacity-0"}`}>
            {slide.fit === "contain" && <Image src={slide.image} alt="" fill sizes="100vw" aria-hidden className="scale-110 object-cover opacity-35 blur-xl" />}
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              priority={index === 0}
              sizes="100vw"
              style={{ objectPosition: slide.position }}
              className={`h-full w-full ${slide.fit === "contain" ? "object-contain" : "object-cover"}`}
            />
          </div>
        ))}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(12,12,12,.96)_0%,rgba(12,12,12,.82)_35%,rgba(12,12,12,.20)_66%,rgba(12,12,12,.08)_100%)]" />

        <div className="relative mx-auto flex min-h-[34rem] max-w-[1440px] items-center px-7 py-12 sm:min-h-[38rem] sm:px-12 lg:px-20">
          <div className="flex w-full max-w-[19rem] items-center justify-center border border-white/20 bg-black/20 px-9 py-12 shadow-[0_28px_72px_rgba(0,0,0,.40)] backdrop-blur-[2px] sm:max-w-md sm:px-14 sm:py-16">
            <BrandLogo variant={activeSlide.variant} imageClassName="brightness-0 invert contrast-125" className="w-full max-w-[15rem] sm:max-w-[18rem]" />
          </div>
        </div>

        <div className="absolute bottom-8 left-7 z-10 flex gap-2 sm:bottom-10 sm:left-12 lg:left-20">
          {slides.map((slide, index) => (
            <button key={slide.title} type="button" onClick={() => setActiveIndex(index)} aria-label={slide.title} aria-current={index === activeIndex ? "true" : undefined} className={`h-1.5 rounded-full transition-all duration-300 ${index === activeIndex ? "w-9 bg-white" : "w-2 bg-white/45 hover:bg-white/80"}`} />
          ))}
        </div>
      </section>
    </header>
  );
}
