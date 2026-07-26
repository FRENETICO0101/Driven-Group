"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const slides = [
  { src: "/property-assets/brickell/mandarin-oriental-residences/gallery/mandarin-oriental-miami-tea-pavillion.webp", alt: "Mandarin Oriental Miami tea pavilion" },
  { src: "/property-assets/brickell/mandarin-oriental-residences/gallery/mandarin-oriental-miami-terrace.dusk.webp", alt: "Mandarin Oriental Miami terrace at dusk" },
  { src: "/property-assets/brickell/viceroy-brickell/gallery/viceroy-tower-looking-up.webp", alt: "Viceroy tower in Brickell" },
  { src: "/property-assets/downtown/jem-world-center/gallery/jem-crown-golden.webp", alt: "JEM World Center crown" },
  { src: "/property-assets/downtown/jem-world-center/gallery/page-29.webp", alt: "JEM World Center architectural rendering" },
  { src: "/property-assets/downtown/jem-world-center/gallery/page-38.webp", alt: "JEM World Center interior" },
  { src: "/property-assets/miami-beach/the-perigon/gallery/hero.webp", alt: "The Perigon Miami Beach" },
] as const;

const AUTO_ADVANCE_DELAY = 6_000;

export function RealEstateHeroSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => setActiveIndex((index) => (index + 1) % slides.length), AUTO_ADVANCE_DELAY);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <header className="relative bg-white pt-16 sm:pt-20">
      <section className="relative h-[46svh] min-h-[20rem] overflow-hidden bg-black sm:h-[64svh] sm:min-h-[36rem] md:h-[68svh]" aria-roledescription="carousel" aria-label="Real estate properties">
        {slides.map((slide, index) => <Image key={slide.src} src={slide.src} alt={slide.alt} fill priority={index === 0} sizes="100vw" className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1400ms] ease-in-out ${index === activeIndex ? "opacity-100" : "opacity-0"}`} />)}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black/30 to-transparent" />
        <div className="absolute bottom-5 right-6 z-10 flex items-center gap-2 sm:bottom-8 sm:right-8">
          {slides.map((slide, index) => <button key={slide.src} type="button" onClick={() => setActiveIndex(index)} aria-label={`Show image ${index + 1}`} aria-current={index === activeIndex ? "true" : undefined} className={`rounded-full shadow-[0_1px_3px_rgba(0,0,0,0.7)] transition-all duration-300 ${index === activeIndex ? "h-1.5 w-7 bg-white" : "h-1.5 w-1.5 bg-white/65 hover:bg-white"}`} />)}
        </div>
      </section>
    </header>
  );
}
