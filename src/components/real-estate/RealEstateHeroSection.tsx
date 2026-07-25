"use client";

import { useEffect, useState } from "react";
import { useLocale } from "next-intl";

// Source (day): https://www.pexels.com/video/the-beach-and-city-skyline-from-an-aerial-view-15820691/
const DAY_VIDEO_SRC = "/images1/real-estate-miami-beach-hero.mp4";
const DAY_VIDEO_POSTER = "/property-assets/miami-beach/the-perigon/gallery/from-the-sand.webp";
const NIGHT_VIDEO_SRC = "/images1/hero-miami-night.mp4";
const NIGHT_VIDEO_POSTER = "/images1/hero-miami-night-v1.webp";
const THEME_EVENT = "driven-theme-change";

export function RealEstateHeroSection() {
  const locale = useLocale();
  const isEnglish = locale === "en";
  const [isNight, setIsNight] = useState(() => typeof document !== "undefined" && document.documentElement.dataset.theme === "night");

  useEffect(() => {
    const syncTheme = (event: Event) => setIsNight((event as CustomEvent<boolean>).detail);
    window.addEventListener(THEME_EVENT, syncTheme);
    return () => window.removeEventListener(THEME_EVENT, syncTheme);
  }, []);

  return (
    <header className="relative bg-white pt-16 sm:pt-20">
      <section className="relative min-h-[calc(100svh-4rem)] overflow-hidden bg-black sm:min-h-[85vh] md:min-h-[90vh]">
        <video
          key={isNight ? "night" : "day"}
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={isNight ? NIGHT_VIDEO_POSTER : DAY_VIDEO_POSTER}
          aria-label={isNight ? (isEnglish ? "Miami at night" : "Miami de noche") : (isEnglish ? "Aerial view of Miami Beach" : "Vista aérea de Miami Beach")}
        >
          <source src={isNight ? NIGHT_VIDEO_SRC : DAY_VIDEO_SRC} type="video/mp4" />
        </video>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black/30 to-transparent" />
      </section>
    </header>
  );
}
