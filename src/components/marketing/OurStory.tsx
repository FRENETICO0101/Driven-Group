"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";

export function OurStory() {
  const t = useTranslations('about');

  return (
    <section className="py-20 sm:py-24 md:py-32 max-w-7xl mx-auto px-6 sm:px-8">
      <div className="mb-16 sm:mb-20">
        <p className="editorial-label text-gray mb-2">{t('driven')}</p>
        <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-black text-black tracking-tight leading-[1.1]">
          {t('ourStory')}
        </h2>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 md:gap-20 xl:gap-24 items-start">

        {/* Left: Text Blocks */}
        <div className="space-y-12 sm:space-y-16">

          {/* Block 1 */}
          <div>
            <p className="text-base sm:text-lg text-dark-gray leading-[1.8] font-light">
              {t('storyDesc1')}
              <br /><br />
              {t('storyDesc2')}
              <br /><br />
              {t('storyDesc3')}
              <br /><br />
              {t('storyDesc4')}
              <br /><br />
              {t('storyDesc5')}
            </p>
          </div>

          {/* Read More */}
          <Link
            href="/about"
            className="group inline-flex items-center gap-3 text-dark-gray hover:text-black transition-colors pt-4"
          >
            <span className="editorial-label tracking-[0.15em]">{t('readMore')}</span>
            <span className="material-symbols-outlined text-lg transition-transform group-hover:translate-x-1.5">arrow_forward</span>
          </Link>
        </div>

        {/* Right: Image */}
        <div className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-xl">
            <Image
              src="/images1/business-global.jpg"
              alt="Driven Group Miami Headquarters"
              fill
              className="object-cover"
            />
          </div>
          <div className="mt-6 flex items-center justify-between">
            <p className="editorial-label text-gray">{t('miamiFloridea')}</p>
            {/* <p className="editorial-label text-gray">EST. 2003</p> */}
          </div>
        </div>
      </div>

    </section>
  );
}
