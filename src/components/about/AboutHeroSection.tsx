"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import realEstateLogo from "../../../assets/logos/logo-re-negro.png";
import academyLogo from "../../../assets/logos/academy-negro.png";
import businessLogo from "../../../assets/logos/logo-bussines-negro.png";

const slides = [
  { title: "Driven Real Estate", logo: realEstateLogo, image: "/property-assets/brickell/mandarin-oriental-residences/gallery/mandarin-oriental-miami-ph-crowd.webp", position: "52% 46%", zoom: true },
  { title: "Driven Academy", logo: academyLogo, image: "/images1/academy-virtual-classroom.webp", position: "center center", zoom: false },
  { title: "Driven Business", logo: businessLogo, image: "/images1/business-executive-miami-v1.webp", position: "center center", zoom: false },
] as const;

const AUTO_ADVANCE_DELAY = 3_000;

export function AboutHeroSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeSlide = slides[activeIndex];

  useEffect(() => {
    const timer = window.setTimeout(
      () => setActiveIndex((current) => (current + 1) % slides.length),
      AUTO_ADVANCE_DELAY,
    );
    return () => window.clearTimeout(timer);
  }, [activeIndex]);

  return (
    <header className="relative bg-white pt-16 sm:pt-20">
      <section className="relative h-[62svh] min-h-[31rem] overflow-hidden bg-[#151515] sm:h-[64svh] sm:min-h-[36rem] md:h-[68svh]" aria-roledescription="carousel" aria-label="Driven Group">
        {slides.map((slide, index) => (
          <div key={slide.title} className={`absolute inset-0 transition-opacity duration-[1400ms] ease-out ${index === activeIndex ? "opacity-100" : "opacity-0"}`}>
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              priority={index === 0}
              quality={100}
              sizes="100vw"
              style={{ objectPosition: slide.position }}
              className={`h-full w-full object-cover ${slide.zoom ? "sm:scale-[1.12]" : ""}`}
            />
          </div>
        ))}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(12,12,12,.96)_0%,rgba(12,12,12,.82)_35%,rgba(12,12,12,.20)_66%,rgba(12,12,12,.08)_100%)]" />

        <div className="relative mx-auto flex h-full max-w-[1440px] items-center px-7 py-12 sm:px-12 lg:px-20">
          <div className="relative flex w-full max-w-[12rem] items-center justify-center px-5 py-8 sm:max-w-md sm:px-14 sm:py-16">
            <Image
              src={activeSlide.logo}
              alt={activeSlide.title}
              className="h-auto w-full max-w-[9rem] object-contain sm:max-w-[18rem]"
              sizes="(max-width: 640px) 144px, 288px"
            />
          </div>
        </div>

        <div className="absolute bottom-8 left-7 z-10 flex items-center gap-2 sm:bottom-10 sm:left-12 lg:left-20">
          {slides.map((slide, index) => (
            <button key={slide.title} type="button" onClick={() => setActiveIndex(index)} aria-label={slide.title} aria-current={index === activeIndex ? "true" : undefined} className={`rounded-full shadow-[0_1px_3px_rgba(0,0,0,0.7)] transition-all duration-300 ${index === activeIndex ? "h-1.5 w-7 bg-white" : "h-1.5 w-1.5 bg-white/65 hover:bg-white"}`} />
          ))}
        </div>
      </section>
    </header>
  );
}
