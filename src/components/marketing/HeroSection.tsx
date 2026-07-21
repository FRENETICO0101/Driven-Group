import Image from "next/image";
import Link from 'next/link';
import { useTranslations } from "next-intl";

export function HeroSection() {
  const t = useTranslations('hero');

  return (
    <header className="relative bg-white pt-16 sm:pt-20">
      {/* Hero content area with video/image background below navbar */}
      <div className="relative min-h-screen sm:min-h-[85vh] md:min-h-[90vh] flex items-center overflow-hidden">
        {/* Background video with image fallback */}
        <div className="absolute inset-0 z-0">
          {/* Fallback image background */}
          <Image
            alt="Luxury Real Estate - Miami"
            className="image-zoom h-full w-full object-cover"
            src="/images1/hero-miami-skyline.png"
            fill
            priority
            sizes="100vw"
            style={{ objectPosition: "center 55%" }}
          />

          {/* Video background (optional) */}
          {/* <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            poster="/images1/hero-fallback.jpg"
          >
            <source
              src="https://media.istockphoto.com/id/1446404317/video/miami-skyline-at-sunset.mp4?s=mp4-640x640-is"
              type="video/mp4"
            />
          </video> */}

          <div className="absolute inset-0 hero-gradient z-10" />
        </div>

        {/* DAY indicator - top right */}
        <div className="absolute top-8 right-8 z-30 text-center">
          <span className="material-symbols-outlined text-white text-2xl block">light_mode</span>
          <p className="text-white text-xs tracking-widest font-semibold mt-2">DAY</p>
        </div>

        {/* Content — centered for luxury editorial feel */}
        <div className="relative z-20 max-w-7xl mx-auto w-full px-6 sm:px-8">
          <div className="max-w-3xl">

            {/* Headline - serif italic */}
            <h1 className="fade-in-delay-100 font-serif italic text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.2] md:leading-[1.15] mb-8 sm:mb-10 text-white tracking-tight">
              {t('luxury')}
            </h1>

            {/* Body text removed for cleaner aesthetic */}

            {/* CTA */}
            <div className="fade-in-delay-200">
              <Link
                href="/real-estate"
                className="inline-flex items-center gap-2 text-gray hover:text-dark-gray transition-colors text-sm sm:text-base font-semibold tracking-wide uppercase"
              >
                <span>{t('viewDetails')}</span>
                <span className="material-symbols-outlined text-lg">arrow_forward</span>
              </Link>
            </div>

          </div>
        </div>
      </div>
    </header>
  );
}
