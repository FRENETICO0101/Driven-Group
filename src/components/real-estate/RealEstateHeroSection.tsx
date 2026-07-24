"use client";

import { useLocale } from "next-intl";

// Source: https://www.pexels.com/video/the-beach-and-city-skyline-from-an-aerial-view-15820691/
const HERO_VIDEO_SRC = "/images1/real-estate-miami-beach-hero.mp4";
const HERO_VIDEO_POSTER = "/property-assets/miami-beach/the-perigon/gallery/from-the-sand.webp";

export function RealEstateHeroSection() {
  const locale = useLocale();
  const isEnglish = locale === "en";

  return (
    <header className="relative bg-white pt-16 sm:pt-20">
      <section className="relative min-h-[calc(100svh-4rem)] overflow-hidden bg-black sm:min-h-[85vh] md:min-h-[90vh]">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={HERO_VIDEO_POSTER}
          aria-label={isEnglish ? "Aerial view of Miami Beach" : "Vista aérea de Miami Beach"}
        >
          <source src={HERO_VIDEO_SRC} type="video/mp4" />
        </video>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black/30 to-transparent" />
      </section>
    </header>
  );
}
