"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useCallback } from "react";

const PROPERTY_TYPES = [
  { value: "", label: "Todos los tipos" },
  { value: "RESIDENTIAL", label: "Residencial" },
  { value: "COMMERCIAL", label: "Comercial" },
  { value: "LAND", label: "Terreno" },
  { value: "MIXED_USE", label: "Uso Mixto" },
];

const PROPERTY_STATUSES = [
  { value: "", label: "Todos los estados" },
  { value: "ACTIVE", label: "Disponible" },
  { value: "PENDING", label: "En negociación" },
  { value: "SOLD", label: "Vendido" },
];

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
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

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
    <div className="sticky top-0 z-30 bg-black/80 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        <div className="flex flex-wrap items-center gap-3">
          <select
            value={currentType}
            onChange={(e) => updateFilter("type", e.target.value)}
            className="bg-white/5 border border-white/10 text-white text-sm rounded-lg px-3 py-2 appearance-none cursor-pointer hover:bg-white/8 transition-colors focus:outline-none focus:border-white/30 min-w-[160px]"
          >
            {PROPERTY_TYPES.map((t) => (
              <option key={t.value} value={t.value} className="bg-slate-900 text-white">
                {t.label}
              </option>
            ))}
          </select>

          <select
            value={currentCity}
            onChange={(e) => updateFilter("city", e.target.value)}
            className="bg-white/5 border border-white/10 text-white text-sm rounded-lg px-3 py-2 appearance-none cursor-pointer hover:bg-white/8 transition-colors focus:outline-none focus:border-white/30 min-w-[160px]"
          >
            <option value="" className="bg-slate-900 text-white">
              Todas las ciudades
            </option>
            {availableCities.map((city) => (
              <option key={city} value={city} className="bg-slate-900 text-white">
                {city}
              </option>
            ))}
          </select>

          <select
            value={currentStatus}
            onChange={(e) => updateFilter("status", e.target.value)}
            className="bg-white/5 border border-white/10 text-white text-sm rounded-lg px-3 py-2 appearance-none cursor-pointer hover:bg-white/8 transition-colors focus:outline-none focus:border-white/30 min-w-[160px]"
          >
            {PROPERTY_STATUSES.map((s) => (
              <option key={s.value} value={s.value} className="bg-slate-900 text-white">
                {s.label}
              </option>
            ))}
          </select>

          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-1.5 text-slate-400 hover:text-white text-sm transition-colors ml-auto"
            >
              <span className="material-symbols-outlined text-sm">close</span>
              Limpiar
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
