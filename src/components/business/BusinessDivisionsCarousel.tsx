"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Icon } from "@/components/ui/Icon";

const divisions = [
  { id: "luxury-assets", image: "/images1/business-luxury-hero-v2.webp", title: "luxuryAssets", position: "center" },
  { id: "digital-commerce", image: "/images1/business-digital-hero-v2.webp", title: "digitalCommerce", position: "center" },
  { id: "global-markets", image: "/images1/business-global-hero-v2.webp", title: "globalMarkets", position: "center" },
  { id: "strategic-alliances", image: "/images1/business-alliances-hero-v2.webp", title: "strategicAlliances", position: "center" },
] as const;

const AUTO_ADVANCE_DELAY = 6_000;

export function BusinessDivisionsCarousel() {
  const t = useTranslations("business");
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => setActiveIndex((current) => (current + 1) % divisions.length), AUTO_ADVANCE_DELAY);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <header className="relative bg-white pt-16 sm:pt-20">
      <section className="relative h-[46svh] min-h-[20rem] overflow-hidden bg-black sm:h-[64svh] sm:min-h-[36rem] md:h-[68svh]" aria-roledescription="carousel" aria-label="Business divisions">
        <div className="absolute inset-0">
          {divisions.map((division, index) => (
            <Image
              key={division.id}
              src={division.image}
              alt={t(division.title)}
              fill
              priority={index === 0}
              sizes="100vw"
              className={`object-contain transition-opacity duration-[1800ms] ease-in-out sm:object-cover ${index === activeIndex ? "opacity-100" : "opacity-0"}`}
              style={{ objectPosition: division.position }}
            />
          ))}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/5" />
        </div>

        <div className="absolute right-6 top-8 z-20 text-center sm:right-8">
          <Icon name="trending_up" className="block h-6 w-6 text-white" />
          <p className="mt-2 text-xs font-semibold tracking-widest text-white">BUSINESS</p>
        </div>
        <p className="absolute bottom-5 left-6 z-20 text-sm font-semibold uppercase tracking-[0.16em] text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)] sm:bottom-8 sm:left-8 sm:text-base">{t(divisions[activeIndex].title)}</p>
        <div className="absolute bottom-5 right-6 z-20 flex items-center gap-2 sm:bottom-8 sm:right-8">
          {divisions.map((division, index) => <button key={division.id} type="button" onClick={() => setActiveIndex(index)} aria-label={t(division.title)} aria-current={index === activeIndex ? "true" : undefined} className={`rounded-full shadow-[0_1px_3px_rgba(0,0,0,0.7)] transition-all duration-300 ${index === activeIndex ? "h-1.5 w-7 bg-white" : "h-1.5 w-1.5 bg-white/65 hover:bg-white"}`} />)}
        </div>
      </section>
    </header>
  );
}
