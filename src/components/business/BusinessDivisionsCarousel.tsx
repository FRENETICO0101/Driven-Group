"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

const divisions = [
  { id: "digital-commerce", image: "/images1/business-digital-hero-v2.webp", title: "digitalCommerce", position: "center" },
  { id: "global-markets", image: "/images1/business-global-hero-v2.webp", title: "globalMarkets", position: "center" },
  { id: "strategic-alliances", image: "/images1/business-alliances-hero-v2.webp", title: "strategicAlliances", position: "center" },
  { id: "luxury-assets", image: "/images1/business-luxury-hero-v2.webp", title: "luxuryAssets", position: "center" },
] as const;

export function BusinessDivisionsCarousel() {
  const t = useTranslations("business");
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => setActiveIndex((current) => (current + 1) % divisions.length), 14000);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <header className="relative bg-white pt-16 sm:pt-20">
      <section className="relative flex min-h-screen items-center overflow-hidden sm:min-h-[85vh] md:min-h-[90vh]">
        <div className="absolute inset-0">
          {divisions.map((division, index) => (
            <Image
              key={division.id}
              src={division.image}
              alt={t(division.title)}
              fill
              priority={index === 0}
              sizes="100vw"
              className={`object-cover transition-all duration-1000 ${index === activeIndex ? "scale-100 opacity-100" : "scale-105 opacity-0"}`}
              style={{ objectPosition: division.position }}
            />
          ))}
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.76)_0%,rgba(0,0,0,0.46)_45%,rgba(0,0,0,0.18)_100%)]" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-black/10" />
        </div>

        <div className="absolute right-6 top-8 z-20 text-center sm:right-8">
          <span className="material-symbols-outlined block text-2xl text-white">trending_up</span>
          <p className="mt-2 text-xs font-semibold tracking-widest text-white">BUSINESS</p>
        </div>
      </section>
    </header>
  );
}
