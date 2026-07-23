"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { useTranslations } from "next-intl";

interface PropertyFiltersProps {
  currentType: "RESIDENTIAL" | "COMMERCIAL";
  currentCommercialUse: string;
  currentLocation: string;
}

export function PropertyFilters({
  currentType,
  currentCommercialUse,
  currentLocation,
}: PropertyFiltersProps) {
  const t = useTranslations("filters");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const updateFilters = useCallback(
    (updates: Record<string, string>) => {
      const params = new URLSearchParams(searchParams.toString());
      Object.entries(updates).forEach(([key, value]) => {
        if (value) params.set(key, value);
        else params.delete(key);
      });
      const query = params.toString();
      router.push(query ? `${pathname}?${query}` : pathname);
    },
    [router, pathname, searchParams]
  );

  const hasActiveFilters = currentType !== "RESIDENTIAL" || currentCommercialUse || currentLocation;

  const clearFilters = () => {
    router.push(pathname);
  };

  return (
    <div className="sticky top-16 z-[500] border-b border-light-gray bg-white sm:top-20">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-4">
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => updateFilters({ type: "RESIDENTIAL", commercialUse: "" })}
            aria-pressed={currentType === "RESIDENTIAL"}
            className={`min-w-40 rounded-lg border bg-white px-3 py-2 text-left text-sm text-black transition-colors ${currentType === "RESIDENTIAL" ? "border-dark-gray" : "border-light-gray hover:border-dark-gray"}`}
          >
            {t("residential")}
          </button>

          <details className="group relative z-[600]">
            <summary
              aria-label={t("commercial")}
              className={`flex min-w-40 cursor-pointer list-none items-center justify-between gap-3 rounded-lg border bg-white px-3 py-2 text-sm text-black transition-colors [&::-webkit-details-marker]:hidden ${currentType === "COMMERCIAL" ? "border-dark-gray" : "border-light-gray hover:border-dark-gray"}`}
            >
              {currentCommercialUse ? t(currentCommercialUse) : t("commercial")}
              <svg aria-hidden="true" viewBox="0 0 16 16" className="h-3 w-3 transition-transform group-open:rotate-180">
                <path d="m4 6 4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </summary>
            <div className="absolute left-0 z-40 mt-2 min-w-40 overflow-hidden rounded-lg border border-light-gray bg-white p-1 shadow-lg">
              <button
                type="button"
                onClick={(event) => {
                  event.currentTarget.closest("details")?.removeAttribute("open");
                  updateFilters({ type: "COMMERCIAL", commercialUse: "retail" });
                }}
                className={`block w-full rounded-md px-3 py-2 text-left text-sm text-black transition-colors hover:bg-light-gray/30 ${currentCommercialUse === "retail" ? "bg-light-gray/30" : ""}`}
              >
                {t("retail")}
              </button>
              <button
                type="button"
                onClick={(event) => {
                  event.currentTarget.closest("details")?.removeAttribute("open");
                  updateFilters({ type: "COMMERCIAL", commercialUse: "warehouse" });
                }}
                className={`block w-full rounded-md px-3 py-2 text-left text-sm text-black transition-colors hover:bg-light-gray/30 ${currentCommercialUse === "warehouse" ? "bg-light-gray/30" : ""}`}
              >
                {t("warehouse")}
              </button>
            </div>
          </details>

          <details className="group relative z-[600]">
            <summary
              aria-label={t("location")}
              className={`flex min-w-40 cursor-pointer list-none items-center justify-between gap-3 rounded-lg border bg-white px-3 py-2 text-sm text-black transition-colors [&::-webkit-details-marker]:hidden ${currentLocation ? "border-dark-gray" : "border-light-gray hover:border-dark-gray"}`}
            >
              {currentLocation ? t(currentLocation) : t("location")}
              <svg aria-hidden="true" viewBox="0 0 16 16" className="h-3 w-3 transition-transform group-open:rotate-180">
                <path d="m4 6 4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </summary>
            <div className="absolute left-0 z-40 mt-2 min-w-40 overflow-hidden rounded-lg border border-light-gray bg-white p-1 shadow-lg">
              {(["miami", "madrid", "mexico"] as const).map((location) => (
                <button
                  key={location}
                  type="button"
                  onClick={(event) => {
                    event.currentTarget.closest("details")?.removeAttribute("open");
                    updateFilters({ location, city: "" });
                  }}
                  className={`block w-full rounded-md px-3 py-2 text-left text-sm text-black transition-colors hover:bg-light-gray/30 ${currentLocation === location ? "bg-light-gray/30" : ""}`}
                >
                  {t(location)}
                </button>
              ))}
            </div>
          </details>

          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-1.5 text-dark-gray hover:text-black text-sm transition-colors ml-auto"
            >
              <span className="material-symbols-outlined text-sm">close</span>
              {t("clear")}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
