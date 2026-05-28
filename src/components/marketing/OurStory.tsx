"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";

export function OurStory() {
  const t = useTranslations('about');

  return (
    <section className="py-24 sm:py-28 md:py-36 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">

      {/* Section header */}
      <div className="flex items-start justify-between mb-16 sm:mb-20 gap-8">
        <div>
          <p className="editorial-label text-gray mb-3">{t('driven')}</p>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-ink tracking-tight leading-[1.05] text-balance">
            {t('ourStory')}
          </h2>
        </div>
        <Link
          href="/about"
          className="hidden md:flex arrow-link text-gray hover:text-ink shrink-0 mt-2"
        >
          <span>{t('readMore')}</span>
          <span
            className="material-symbols-outlined"
            style={{ fontSize: "12px", fontVariationSettings: "'wght' 200" }}
          >
            arrow_outward
          </span>
        </Link>
      </div>

      {/* Content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 sm:gap-20 xl:gap-28 items-start">

        {/* Left: text */}
        <div className="space-y-0">
          <p className="text-base sm:text-lg text-dark-gray leading-[1.9] font-light">
            {t('storyDesc1')}
          </p>
          <div className="h-6" />
          <p className="text-base sm:text-lg text-dark-gray leading-[1.9] font-light">
            {t('storyDesc2')}
          </p>
          <div className="h-6" />
          <p className="text-base sm:text-lg text-dark-gray leading-[1.9] font-light">
            {t('storyDesc3')}
          </p>

          {/* Mobile read more */}
          <div className="pt-10 md:hidden">
            <Link
              href="/about"
              className="arrow-link text-gray hover:text-ink"
            >
              <span>{t('readMore')}</span>
              <span
                className="material-symbols-outlined"
                style={{ fontSize: "12px", fontVariationSettings: "'wght' 200" }}
              >
                arrow_outward
              </span>
            </Link>
          </div>
        </div>

        {/* Right: image */}
        <div>
          <div className="relative aspect-[3/4] overflow-hidden">
            <Image
              src="/images1/business-global.jpg"
              alt="Driven Group Miami Headquarters"
              fill
              className="object-cover transition-transform duration-[1.2s] ease-out hover:scale-[1.03]"
            />
          </div>
          <div className="mt-5 flex items-center justify-between">
            <p className="editorial-label text-gray">{t('miamiFloridea')}</p>
            <p className="editorial-label text-light-gray">EST. 2003</p>
          </div>
        </div>

      </div>
    </section>
  );
}
