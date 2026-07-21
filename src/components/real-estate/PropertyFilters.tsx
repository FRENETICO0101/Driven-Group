"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { useTranslations } from "next-intl";

interface PropertyFiltersProps {
  availableCities: string[];
  currentType: string;
  currentCity: string;
  currentStatus: string;
}

export function PropertyFilters({
  availableCities,
  currentType,
  currentCity,
  currentStatus,
}: PropertyFiltersProps) {
  const t = useTranslations("filters");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const PROPERTY_TYPES = [
    { value: "", label: t("allTypes") },
    { value: "RESIDENTIAL", label: t("residential") },
    { value: "COMMERCIAL", label: t("commercial") },
    { value: "LAND", label: t("land") },
    { value: "MIXED_USE", label: t("mixedUse") },
  ];

  const PROPERTY_STATUSES = [
    { value: "", label: t("allStatuses") },
    { value: "ACTIVE", label: t("available") },
    { value: "PENDING", label: t("pending") },
    { value: "SOLD", label: t("sold") },
  ];

  const updateFilter = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      router.push(`${pathname}?${params.toString()}`);
    },
    [router, pathname, searchParams]
  );

  const hasActiveFilters = currentType || currentCity || currentStatus;

  const clearFilters = () => {
    router.push(pathname);
  };

  return (
    <div className="sticky top-16 sm:top-20 z-30 bg-white border-b border-light-gray">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-4">
        <div className="flex flex-wrap items-center gap-3">
          <select
            value={currentType}
            onChange={(e) => updateFilter("type", e.target.value)}
            className="bg-white border border-light-gray text-black text-sm rounded-lg px-3 py-2 appearance-none cursor-pointer hover:bg-white transition-colors focus:outline-none focus:border-gray min-w-40"
          >
            {PROPERTY_TYPES.map((t) => (
              <option key={t.value} value={t.value} className="bg-white text-black">
                {t.label}
              </option>
            ))}
          </select>

          <select
            value={currentCity}
            onChange={(e) => updateFilter("city", e.target.value)}
            className="bg-white border border-light-gray text-black text-sm rounded-lg px-3 py-2 appearance-none cursor-pointer hover:bg-white transition-colors focus:outline-none focus:border-gray min-w-40"
          >
            <option value="" className="bg-white text-black">
              {t("allCities")}
            </option>
            {availableCities.map((city) => (
              <option key={city} value={city} className="bg-white text-black">
                {city}
              </option>
            ))}
          </select>

          <select
            value={currentStatus}
            onChange={(e) => updateFilter("status", e.target.value)}
            className="bg-white border border-light-gray text-black text-sm rounded-lg px-3 py-2 appearance-none cursor-pointer hover:bg-white transition-colors focus:outline-none focus:border-gray min-w-40"
          >
            {PROPERTY_STATUSES.map((s) => (
              <option key={s.value} value={s.value} className="bg-white text-black">
                {s.label}
              </option>
            ))}
          </select>

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
