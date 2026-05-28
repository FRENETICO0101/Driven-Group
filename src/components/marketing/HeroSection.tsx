'use client';

import Image from "next/image";
import Link from 'next/link';
import { useTranslations } from "next-intl";

export function HeroSection() {
  const t = useTranslations('hero');

  return (
    <header className="relative bg-ink">
      <div className="relative h-screen min-h-[640px] flex items-end overflow-hidden">

        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <Image
            alt="Luxury Real Estate — Miami"
            className="image-zoom w-full h-full object-cover"
            src="/images1/hero-luxury.jpg"
            fill
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 hero-gradient z-10" />
        </div>

        {/* Page indicator — top right */}
        <div className="absolute top-24 right-8 sm:right-10 z-30 flex flex-col items-center gap-1.5">
          <span
            className="material-symbols-outlined text-white/40"
            style={{ fontSize: "14px", fontVariationSettings: "'wght' 200" }}
          >
            light_mode
          </span>
          <p className="editorial-label text-white/40" style={{ writingMode: "vertical-rl" }}>
            01 — HOME
          </p>
        </div>

        {/* Scroll indicator — bottom right */}
        <div
          className="absolute bottom-10 right-8 sm:right-10 z-30 flex flex-col items-center gap-2"
          aria-hidden="true"
        >
          <div className="w-px h-12 bg-white/20 overflow-hidden">
            <div className="w-px h-full bg-white/60 animate-[scrollDown_2s_ease-in-out_infinite]" />
          </div>
        </div>

        {/* Content — bottom-left editorial */}
        <div className="relative z-20 max-w-7xl mx-auto w-full px-6 sm:px-8 lg:px-12 pb-16 sm:pb-20 md:pb-24">
          <div className="max-w-4xl">

            {/* Eyebrow */}
            <p className="fade-in editorial-label text-white/50 mb-6 tracking-[0.22em]">
              Driven Group — Est. 2003
            </p>

            {/* Headline */}
            <h1 className="fade-in-delay-100 font-serif italic text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[1.05] mb-8 sm:mb-10 text-white tracking-tight text-balance">
              {t('luxury')}
            </h1>

            {/* CTA */}
            <div className="fade-in-delay-200 flex items-center gap-8">
              <Link
                href="/real-estate"
                className="arrow-link text-white/70 hover:text-white"
              >
                <span>{t('viewDetails')}</span>
                <span
                  className="material-symbols-outlined"
                  style={{ fontSize: "14px", fontVariationSettings: "'wght' 200" }}
                >
                  arrow_outward
                </span>
              </Link>

              <span className="w-px h-5 bg-white/20" />

              <Link
                href="/about"
                className="arrow-link text-white/50 hover:text-white/80"
              >
                <span>Our Story</span>
              </Link>
            </div>

          </div>
        </div>

        {/* Bottom stat strip */}
        <div className="absolute bottom-0 left-0 right-0 z-20 border-t border-white/10">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="grid grid-cols-3 divide-x divide-white/10">
              {[
                { value: "$2.8B", label: "Sales Volume" },
                { value: "500+", label: "Properties" },
                { value: "20+",  label: "Years" },
              ].map((stat) => (
                <div key={stat.label} className="px-4 sm:px-6 py-4 first:pl-0 last:pr-0">
                  <p className="text-white font-serif text-lg sm:text-2xl tracking-tight">{stat.value}</p>
                  <p className="editorial-label text-white/40 mt-0.5">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      <style>{`
        @keyframes scrollDown {
          0%   { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
      `}</style>
    </header>
  );
}
