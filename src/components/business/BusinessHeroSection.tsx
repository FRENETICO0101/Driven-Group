'use client';

import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";

export function BusinessHeroSection() {
  const t = useTranslations('hero');

  return (
    <header className="relative bg-ink">
      <div className="relative h-screen min-h-[640px] flex items-end overflow-hidden">

        {/* Background */}
        <div className="absolute inset-0 z-0">
          <Image
            alt="Business Growth"
            className="image-zoom w-full h-full object-cover"
            src="/images1/business-hero.jpg"
            fill
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 hero-gradient z-10" />
        </div>

        {/* Page indicator */}
        <div className="absolute top-24 right-8 sm:right-10 z-30">
          <p className="editorial-label text-white/40" style={{ writingMode: "vertical-rl" }}>
            03 — BUSINESS
          </p>
        </div>

        {/* Content */}
        <div className="relative z-20 max-w-7xl mx-auto w-full px-6 sm:px-8 lg:px-12 pb-20 sm:pb-24">
          <div className="max-w-3xl">
            <p className="fade-in editorial-label text-white/50 mb-6">Executive Division</p>
            <h1 className="fade-in-delay-100 font-serif italic text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[1.0] mb-8 text-white tracking-tight text-balance">
              {t('business')}
            </h1>
            <p className="fade-in-delay-150 text-base sm:text-lg text-white/65 mb-10 leading-[1.8] font-light max-w-xl">
              {t('businessDesc')}
            </p>
            <div className="fade-in-delay-200">
              <Link
                href="#divisions"
                className="arrow-link text-white/60 hover:text-white"
              >
                <span>{t('exploreDivisions')}</span>
                <span
                  className="material-symbols-outlined"
                  style={{ fontSize: "12px", fontVariationSettings: "'wght' 200" }}
                >
                  arrow_forward
                </span>
              </Link>
            </div>
          </div>
        </div>

      </div>
    </header>
  );
}
