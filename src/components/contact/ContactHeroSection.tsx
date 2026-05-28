'use client';

import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";

export function ContactHeroSection() {
  const t = useTranslations('hero');

  return (
    <header className="relative bg-ink">
      <div className="relative h-screen min-h-[640px] flex items-end overflow-hidden">

        {/* Background */}
        <div className="absolute inset-0 z-0">
          <Image
            alt="Contact Driven Group"
            className="image-zoom w-full h-full object-cover"
            src="/images1/contact-hero.jpg"
            fill
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 hero-gradient z-10" />
        </div>

        {/* Page indicator */}
        <div className="absolute top-24 right-8 sm:right-10 z-30">
          <p className="editorial-label text-white/40" style={{ writingMode: "vertical-rl" }}>
            06 — CONTACT
          </p>
        </div>

        {/* Content */}
        <div className="relative z-20 max-w-7xl mx-auto w-full px-6 sm:px-8 lg:px-12 pb-20 sm:pb-24">
          <div className="max-w-3xl">
            <p className="fade-in editorial-label text-white/50 mb-6">Private Consultation</p>
            <h1 className="fade-in-delay-100 font-serif italic text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[1.0] mb-8 text-white tracking-tight text-balance">
              {t('contact')}
            </h1>
            <p className="fade-in-delay-150 text-base sm:text-lg text-white/65 mb-10 leading-[1.8] font-light max-w-xl">
              {t('contactDesc')}
            </p>
            <div className="fade-in-delay-200">
              <Link
                href="#form"
                className="arrow-link text-white/60 hover:text-white"
              >
                <span>{t('getInTouch')}</span>
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
