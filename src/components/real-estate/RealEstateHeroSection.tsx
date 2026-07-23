"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useLocale } from "next-intl";

type SupportedLocale = "en" | "es";
type DayMoment = "morning" | "day" | "dusk" | "night";

type CarouselSlide = {
  src: string;
  alt: Record<SupportedLocale, string>;
  position?: string;
};

type TimeCollection = {
  slides: readonly CarouselSlide[];
};

const momentCollections = {
  morning: {
    slides: [
      {
        src: "/property-assets/downtown/jem-world-center/gallery/jem-aerial.webp",
        alt: {
          es: "Vista aérea de Downtown Miami y la bahía durante la mañana",
          en: "Morning aerial view of Downtown Miami and the bay",
        },
      },
      {
        src: "/property-assets/brickell/cipriani-residences/gallery/cipriani-residences-miami-building.webp",
        alt: {
          es: "Cipriani Residences frente a la bahía de Miami",
          en: "Cipriani Residences overlooking Biscayne Bay",
        },
      },
      {
        src: "/property-assets/edgewater/edition-residences/gallery/building-exterior-1.webp",
        alt: {
          es: "Residencias Edition junto al agua al inicio del día",
          en: "Edition Residences by the water at the start of the day",
        },
      },
      {
        src: "/property-assets/edgewater/villa-residences/gallery/exterior-villa-water.webp",
        alt: {
          es: "Villa Residences frente al agua",
          en: "Villa Residences on the waterfront",
        },
      },
      {
        src: "/property-assets/miami-beach/the-perigon/gallery/from-the-sand.webp",
        alt: {
          es: "The Perigon visto desde la playa de Miami Beach",
          en: "The Perigon viewed from Miami Beach",
        },
      },
    ],
  },
  day: {
    slides: [
      {
        src: "/property-assets/brickell/mandarin-oriental-residences/gallery/mandarin-oriental-miami-hero.webp",
        alt: {
          es: "The Residences at Mandarin Oriental, Miami frente a Biscayne Bay",
          en: "The Residences at Mandarin Oriental, Miami overlooking Biscayne Bay",
        },
      },
      {
        src: "/property-assets/brickell/mandarin-oriental-residences/gallery/mandarin-oriental-miami-ph-pool.webp",
        alt: {
          es: "Piscina panorámica de Mandarin Oriental Miami",
          en: "Panoramic pool at Mandarin Oriental Miami",
        },
      },
    ],
  },
  dusk: {
    slides: [
      {
        src: "/property-assets/brickell/1428-brickell/gallery/private-dining-hummingbird.webp",
        alt: {
          es: "Terraza privada de 1428 Brickell al atardecer",
          en: "Private terrace at 1428 Brickell at dusk",
        },
      },
      {
        src: "/property-assets/brickell/mandarin-oriental-residences/gallery/mandarin-oriental-miami-ocean-pool.webp",
        alt: {
          es: "Piscina con vista al océano en Mandarin Oriental Miami al atardecer",
          en: "Ocean-view pool at Mandarin Oriental Miami at dusk",
        },
      },
      {
        src: "/property-assets/brickell/mandarin-oriental-residences/gallery/mandarin-oriental-miami-tea-pavillion.webp",
        alt: {
          es: "Pabellón de té de Mandarin Oriental Miami con vista al mar",
          en: "Mandarin Oriental Miami tea pavilion with water views",
        },
      },
      {
        src: "/property-assets/brickell/mandarin-oriental-residences/gallery/mandarin-oriental-miami-terrace.dusk.webp",
        alt: {
          es: "Terraza de Mandarin Oriental Miami al anochecer",
          en: "Mandarin Oriental Miami terrace at dusk",
        },
      },
      {
        src: "/property-assets/brickell/viceroy-brickell/gallery/viceroy-north-facade-ne-view-dusk.webp",
        alt: {
          es: "Vista de Viceroy Brickell sobre la ciudad al atardecer",
          en: "Viceroy Brickell city view at dusk",
        },
      },
      {
        src: "/property-assets/edgewater/edition-residences/gallery/aerial.webp",
        alt: {
          es: "Vista aérea de Edition Residences y la bahía al atardecer",
          en: "Edition Residences and bay aerial view at dusk",
        },
      },
    ],
  },
  night: {
    slides: [
      {
        src: "/property-assets/brickell/1428-brickell/gallery/hero-exterior-night.webp",
        alt: {
          es: "Skyline nocturno de Brickell desde 1428 Brickell",
          en: "Brickell night skyline from 1428 Brickell",
        },
      },
      {
        src: "/property-assets/brickell/mandarin-oriental-residences/gallery/mandarin-oriental-miami-night-hero.webp",
        alt: {
          es: "The Residences at Mandarin Oriental, Miami iluminado por la noche",
          en: "The Residences at Mandarin Oriental, Miami illuminated at night",
        },
      },
    ],
  },
} as const satisfies Record<DayMoment, TimeCollection>;

const copy = {
  es: {
    carousel: "Residencias frente al mar por momento del día",
    previous: "Imagen anterior",
    next: "Imagen siguiente",
    showImage: (index: number) => `Ver imagen ${index}`,
  },
  en: {
    carousel: "Waterfront residences by time of day",
    previous: "Previous image",
    next: "Next image",
    showImage: (index: number) => `Show image ${index}`,
  },
} as const;

const AUTO_ADVANCE_DELAY = 14_000;

function ArrowIcon({ direction }: { direction: "back" | "forward" }) {
  const points = direction === "back" ? "15 18 9 12 15 6" : "9 18 15 12 9 6";

  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true">
      <path d={direction === "back" ? "M20 12H10" : "M4 12h10"} />
      <polyline points={points} />
    </svg>
  );
}

function getMiamiDayMoment(): DayMoment {
  try {
    const parts = new Intl.DateTimeFormat("en-US", {
      timeZone: "America/New_York",
      hour: "numeric",
      hourCycle: "h23",
    }).formatToParts(new Date());
    const hour = Number(parts.find((part) => part.type === "hour")?.value);

    if (hour >= 6 && hour < 11) return "morning";
    if (hour >= 11 && hour < 17) return "day";
    if (hour >= 17 && hour < 20) return "dusk";
  } catch {
    return "day";
  }

  return "night";
}

export function RealEstateHeroSection() {
  const locale = useLocale();
  const language: SupportedLocale = locale === "en" ? "en" : "es";
  const t = copy[language];
  const [activeMoment, setActiveMoment] = useState<DayMoment>(getMiamiDayMoment);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const activeMomentRef = useRef(activeMoment);
  const slides: readonly CarouselSlide[] = momentCollections[activeMoment].slides;

  useEffect(() => {
    const syncMiamiDayMoment = () => {
      const nextMoment = getMiamiDayMoment();
      if (nextMoment === activeMomentRef.current) return;

      activeMomentRef.current = nextMoment;
      setActiveMoment(nextMoment);
      setActiveIndex(0);
    };

    syncMiamiDayMoment();
    const interval = window.setInterval(syncMiamiDayMoment, 60_000);
    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isPaused) return;

    const interval = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % slides.length);
    }, AUTO_ADVANCE_DELAY);

    return () => window.clearInterval(interval);
  }, [isPaused, slides.length]);

  const previous = () => setActiveIndex((currentIndex) => (currentIndex - 1 + slides.length) % slides.length);
  const next = () => setActiveIndex((currentIndex) => (currentIndex + 1) % slides.length);

  return (
    <header className="relative bg-white pt-16 sm:pt-20">
      <section
        aria-roledescription="carousel"
        aria-label={t.carousel}
        className="relative min-h-[calc(100svh-4rem)] overflow-hidden sm:min-h-[85vh] md:min-h-[90vh]"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {slides.map((slide, index) => (
          <Image
            key={slide.src}
            alt={slide.alt[language]}
            src={slide.src}
            fill
            priority={index === 0}
            sizes="100vw"
            loading={index === 0 ? undefined : "eager"}
            style={{ objectPosition: slide.position ?? "center center" }}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1800ms] ease-out ${index === activeIndex ? "opacity-100" : "opacity-0"}`}
          />
        ))}

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-black/65 via-black/25 to-transparent" />

        <div className="absolute inset-x-0 bottom-0 z-10 px-4 pb-6 sm:px-8 sm:pb-9">
          <div className="mx-auto flex w-fit max-w-full items-center gap-2 rounded-full border border-white/20 bg-black/35 px-2 py-1.5 shadow-[0_14px_40px_rgba(0,0,0,0.25)] backdrop-blur-xl sm:gap-2.5">
            <button
              type="button"
              onClick={previous}
              className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/20 bg-black/10 text-white/75 transition-colors hover:border-white/70 hover:bg-white/15 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              aria-label={t.previous}
            >
              <ArrowIcon direction="back" />
            </button>

            <div className="hidden items-center gap-1.5 sm:flex sm:gap-2" role="tablist" aria-label={t.carousel}>
              {slides.map((slide, index) => (
                <button
                  key={slide.src}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={`group relative h-11 w-14 shrink-0 overflow-hidden rounded-lg border transition-all duration-300 md:w-[4.5rem] ${index === activeIndex ? "border-white ring-1 ring-white/70" : "border-white/25 opacity-70 hover:border-white/70 hover:opacity-100"}`}
                  aria-label={t.showImage(index + 1)}
                  aria-selected={index === activeIndex}
                  role="tab"
                >
                  <Image src={slide.src} alt="" fill sizes="80px" className="object-cover" style={{ objectPosition: slide.position ?? "center center" }} />
                  <span className={`absolute inset-0 transition-colors ${index === activeIndex ? "bg-transparent" : "bg-black/25 group-hover:bg-black/0"}`} />
                </button>
              ))}
            </div>

            <div className="flex items-center gap-1.5 sm:hidden" role="tablist" aria-label={t.carousel}>
              {slides.map((slide, index) => (
                <button
                  key={slide.src}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={`h-1.5 rounded-full transition-all ${index === activeIndex ? "w-7 bg-white" : "w-1.5 bg-white/50 hover:bg-white"}`}
                  aria-label={t.showImage(index + 1)}
                  aria-selected={index === activeIndex}
                  role="tab"
                />
              ))}
            </div>

            <span className="min-w-10 border-l border-white/20 pl-2 text-center font-mono text-[11px] tracking-[0.16em] text-white/85" aria-live="polite">
              {String(activeIndex + 1).padStart(2, "0")}/{String(slides.length).padStart(2, "0")}
            </span>

            <button
              type="button"
              onClick={next}
              className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/20 bg-black/10 text-white/75 transition-colors hover:border-white/70 hover:bg-white/15 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              aria-label={t.next}
            >
              <ArrowIcon direction="forward" />
            </button>
          </div>
        </div>
      </section>
    </header>
  );
}
