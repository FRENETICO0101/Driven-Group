"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import type { Property } from "@/lib/types";
import { Icon } from "@/components/ui/Icon";

const InteractivePropertyMap = dynamic(
  () => import("./InteractivePropertyMap").then((module) => module.InteractivePropertyMap),
  { ssr: false, loading: () => <div className="h-80 animate-pulse rounded-xl bg-light-gray/30" /> },
);

export function PropertiesMap({ properties }: { properties: Property[] }) {
  const t = useTranslations("properties");
  const tListing = useTranslations("listing");
  const mappedProperties = properties.filter((property) => (
    Number.isFinite(property.latitude)
    && Number.isFinite(property.longitude)
  ));
  const [selected, setSelected] = useState<Property | undefined>(mappedProperties[0]);
  const [isExpanded, setIsExpanded] = useState(false);

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

  if (mappedProperties.length === 0) return null;

  return (
    <section className="px-6 pb-12 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="editorial-label text-gray">{t("exploreByLocation")}</p>
            <h2 className="mt-2 text-2xl font-bold text-black sm:text-3xl">{t("propertyMap")}</h2>
          </div>
          <div className="flex items-center gap-4">
            <p className="text-sm text-dark-gray">{t("locationsAvailable", { count: mappedProperties.length })}</p>
            <button
              type="button"
              onClick={() => setIsExpanded(true)}
              aria-pressed={isExpanded}
              className="inline-flex items-center gap-2 rounded-lg border border-light-gray px-3 py-2 text-sm font-semibold text-black transition-colors hover:border-dark-gray hover:bg-light-gray/10"
            >
              <Icon name="open_in_full" className="h-4 w-4" />
              {t("expandMap")}
            </button>
          </div>
        </div>
        <InteractivePropertyMap properties={mappedProperties} selectedSlug={selected?.slug} onSelect={setSelected} className="shadow-sm" viewport="miami" />
        {selected && (
          <div className="mt-4 flex flex-col gap-4 rounded-xl border border-[#c8a03a] bg-white p-3 shadow-[0_10px_28px_rgba(104,77,17,0.12)] transition-shadow duration-300 hover:shadow-[0_14px_34px_rgba(104,77,17,0.18)] sm:flex-row sm:items-center sm:p-4" aria-live="polite">
            {selected.images[0] && (
              <img src={selected.images[0].url} alt={selected.images[0].alt || selected.title} className="h-20 w-full rounded-lg object-cover sm:w-28" />
            )}
            <div className="flex-1">
              <p className="editorial-label mb-1 flex items-center gap-1.5 text-[#947421]"><span className="inline-block size-1.5 rounded-full bg-[#c8a03a]" />Propiedad seleccionada</p>
              <p className="font-semibold text-black">{selected.title}</p>
              <p className="mt-1 text-sm text-dark-gray">{selected.address}, {selected.city}</p>
            </div>
            <Link href={`/real-estate/${selected.slug}`} className="inline-flex items-center justify-center gap-2 rounded-lg bg-black px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-dark-gray">
              {tListing("viewDetails")} <Icon name="arrow_forward" className="h-4 w-4" />
            </Link>
          </div>
        )}
      </div>
      {isExpanded && (
        <div className="fixed inset-0 z-[1400] flex items-center justify-center bg-black/80 p-3 sm:p-6" role="dialog" aria-modal="true" aria-label={t("propertyMap")}>
          <div className="mx-auto flex h-[calc(100dvh-1.5rem)] w-full max-w-[1600px] flex-col rounded-xl bg-white p-4 shadow-2xl sm:h-[calc(100dvh-3rem)] sm:rounded-2xl sm:p-6">
            <div className="mb-4 flex shrink-0 items-center justify-between gap-4">
              <div>
                <p className="editorial-label text-gray">{t("exploreByLocation")}</p>
                <h2 className="mt-1 text-xl font-bold text-black sm:text-2xl">{t("propertyMap")}</h2>
              </div>
              <button
                type="button"
                onClick={() => setIsExpanded(false)}
                className="inline-flex items-center gap-2 rounded-lg bg-black px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-dark-gray"
              >
                <Icon name="close" className="h-4 w-4" />
                {t("collapseMap")}
              </button>
            </div>
            <div className="min-h-0 flex-1">
              <InteractivePropertyMap properties={mappedProperties} selectedSlug={selected?.slug} onSelect={setSelected} className="h-full shadow-sm" viewport="miami" expanded />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
