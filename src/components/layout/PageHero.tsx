import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";

interface PageHeroProps {
  /** Material symbol name shown in the top-right indicator */
  icon: string;
  /** Indicator label (e.g. "ABOUT US") */
  label: string;
  /** Image source for the background */
  imageSrc: string;
  imageAlt: string;
  imagePosition?: string;
  /** Keys resolved against the `hero` translation namespace */
  titleKey: string;
  descKey: string;
  ctaHref: string;
  ctaLabelKey: string;
}

export function PageHero({
  icon,
  label,
  imageSrc,
  imageAlt,
  imagePosition = "center center",
  titleKey,
  descKey,
  ctaHref,
  ctaLabelKey,
}: PageHeroProps) {
  const t = useTranslations("hero");

  return (
    <header className="relative bg-white pt-16 sm:pt-20">
      <div className="relative min-h-screen sm:min-h-[85vh] md:min-h-[90vh] flex items-center overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 hero-gradient z-10" />
          <Image
            alt={imageAlt}
            className="image-zoom h-full w-full object-cover"
            src={imageSrc}
            fill
            priority
            sizes="100vw"
            style={{ objectPosition: imagePosition }}
          />
        </div>

        {/* Section indicator - top right */}
        <div className="absolute top-8 right-8 z-30 text-center">
          <span className="material-symbols-outlined text-white text-2xl block">{icon}</span>
          <p className="text-white text-xs tracking-widest font-semibold mt-2">{label}</p>
        </div>

        {/* Content */}
        <div className="relative z-20 max-w-7xl mx-auto w-full px-6 sm:px-8">
          <div className="max-w-3xl">
            <h1 className="fade-in-delay-100 font-serif italic text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.2] md:leading-[1.15] mb-8 sm:mb-10 text-white tracking-tight">
              {t(titleKey)}
            </h1>

            <p className="fade-in-delay-150 text-lg sm:text-xl text-white/80 mb-8 leading-relaxed max-w-2xl">
              {t(descKey)}
            </p>

            <div className="fade-in-delay-200">
              <Link
                href={ctaHref}
                className="inline-flex items-center gap-2 text-gray hover:text-dark-gray transition-colors text-sm sm:text-base font-semibold tracking-wide uppercase"
              >
                <span>{t(ctaLabelKey)}</span>
                <span className="material-symbols-outlined text-lg">arrow_forward</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
