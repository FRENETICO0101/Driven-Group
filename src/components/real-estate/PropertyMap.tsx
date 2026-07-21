"use client";

import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import type { Property } from "@/lib/types";

const InteractivePropertyMap = dynamic(
  () => import("./InteractivePropertyMap").then((module) => module.InteractivePropertyMap),
  { ssr: false, loading: () => <div className="h-64 sm:h-80 animate-pulse rounded-xl bg-light-gray/30" /> },
);

interface PropertyMapProps {
  property: Property;
}

export function PropertyMap({ property }: PropertyMapProps) {
  const t = useTranslations("properties");
  const [isExpanded, setIsExpanded] = useState(false);
  const fullAddress = [property.address, property.city, property.state, property.zipCode].filter(Boolean).join(", ");
  const hasCoordinates = Number.isFinite(property.latitude) && Number.isFinite(property.longitude);
  const locationUrl = `https://www.openstreetmap.org/search?query=${encodeURIComponent(fullAddress)}`;

  useEffect(() => {
    if (!isExpanded) return;
    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsExpanded(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [isExpanded]);

  return (
    <section>
      <div className="mb-4 flex items-center justify-between gap-4 sm:mb-6">
        <h2 className="text-xl font-bold text-black sm:text-2xl">{t("location")}</h2>
        {hasCoordinates && (
          <button
            type="button"
            onClick={() => setIsExpanded(true)}
            className="inline-flex items-center gap-2 rounded-lg border border-light-gray px-3 py-2 text-sm font-semibold text-black transition-colors hover:border-dark-gray hover:bg-light-gray/10"
          >
            <span className="material-symbols-outlined text-base">open_in_full</span>
            {t("expandMap")}
          </button>
        )}
      </div>
      {hasCoordinates ? (
        <InteractivePropertyMap properties={[property]} selectedSlug={property.slug} restrictToMiami />
      ) : (
        <div className="flex min-h-64 flex-col items-center justify-center rounded-xl border border-light-gray bg-light-gray/10 p-6 text-center sm:min-h-80">
          <span className="material-symbols-outlined mb-3 text-4xl text-black">location_on</span>
          <p className="font-bold text-black">{property.city}</p>
          <p className="mt-1 max-w-md text-sm text-dark-gray">{fullAddress}</p>
          <a
            className="mt-5 inline-flex items-center gap-2 rounded-lg border border-light-gray px-4 py-2 text-sm font-semibold text-black transition-colors hover:bg-white"
            href={locationUrl}
            target="_blank"
            rel="noreferrer"
          >
            {t("viewLocation")}
            <span className="material-symbols-outlined text-base">open_in_new</span>
          </a>
        </div>
      )}
      {hasCoordinates && isExpanded && (
        <div className="fixed inset-0 z-[1100] bg-black/80 p-3 sm:p-6" role="dialog" aria-modal="true" aria-label={t("location")}>
          <div className="mx-auto flex h-full max-w-[1600px] flex-col rounded-xl bg-white p-4 shadow-2xl sm:rounded-2xl sm:p-6">
            <div className="mb-4 flex shrink-0 items-center justify-between gap-4">
              <div>
                <p className="editorial-label text-gray">{property.city}</p>
                <h2 className="mt-1 text-xl font-bold text-black sm:text-2xl">{t("location")}</h2>
              </div>
              <button
                type="button"
                onClick={() => setIsExpanded(false)}
                className="inline-flex items-center gap-2 rounded-lg bg-black px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-dark-gray"
              >
                <span className="material-symbols-outlined text-base">close</span>
                {t("collapseMap")}
              </button>
            </div>
            <div className="min-h-0 flex-1">
              <InteractivePropertyMap properties={[property]} selectedSlug={property.slug} className="h-full shadow-sm" expanded restrictToMiami />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
