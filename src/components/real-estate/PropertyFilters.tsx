'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

const PROPERTY_TYPES = [
  { value: '', label: 'All Types' },
  { value: 'RESIDENTIAL', label: 'Residential' },
  { value: 'COMMERCIAL', label: 'Commercial' },
  { value: 'LAND', label: 'Land' },
  { value: 'MIXED_USE', label: 'Mixed Use' },
];

const MIAMI_DISTRICTS = [
  { value: '', label: 'All Districts' },
  { value: 'Brickell', label: 'Brickell' },
  { value: 'Downtown Miami', label: 'Downtown Miami' },
  { value: 'Wynwood', label: 'Wynwood' },
  { value: 'Design District', label: 'Design District' },
  { value: 'Midtown Miami', label: 'Midtown Miami' },
  { value: 'Coconut Grove', label: 'Coconut Grove' },
  { value: 'Allapattah', label: 'Allapattah' },
];

const PROPERTY_STATUSES = [
  { value: '', label: 'All Status' },
  { value: 'ACTIVE', label: 'Available' },
  { value: 'PENDING', label: 'Pending' },
  { value: 'SOLD', label: 'Sold' },
];

interface PropertyFiltersProps {
  currentType: string;
  currentDistrict: string;
  currentStatus: string;
}

export function PropertyFilters({
  currentType,
  currentDistrict,
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

  const hasActiveFilters = currentType || currentDistrict || currentStatus;

  const clearFilters = () => {
    router.push(pathname);
  };

  return (
    <div className="sticky top-16 sm:top-20 z-30 bg-white border-b border-light-gray">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-4">
        <div className="flex flex-wrap items-center gap-3">
          {/* Property Type */}
          <select
            value={currentType}
            onChange={(e) => updateFilter('type', e.target.value)}
            className="bg-white border border-light-gray text-black text-sm rounded-lg px-3 py-2 appearance-none cursor-pointer hover:bg-white transition-colors focus:outline-none focus:border-gray min-w-40"
          >
            {PROPERTY_TYPES.map((t) => (
              <option key={t.value} value={t.value} className="bg-white text-black">
                {t.label}
              </option>
            ))}
          </select>

          {/* Miami District */}
          <select
            value={currentDistrict}
            onChange={(e) => updateFilter('district', e.target.value)}
            className="bg-white border border-light-gray text-black text-sm rounded-lg px-3 py-2 appearance-none cursor-pointer hover:bg-white transition-colors focus:outline-none focus:border-gray min-w-40"
          >
            {MIAMI_DISTRICTS.map((d) => (
              <option key={d.value} value={d.value} className="bg-white text-black">
                {d.label}
              </option>
            ))}
          </select>

          {/* Property Status */}
          <select
            value={currentStatus}
            onChange={(e) => updateFilter('status', e.target.value)}
            className="bg-white border border-light-gray text-black text-sm rounded-lg px-3 py-2 appearance-none cursor-pointer hover:bg-white transition-colors focus:outline-none focus:border-gray min-w-40"
          >
            {PROPERTY_STATUSES.map((s) => (
              <option key={s.value} value={s.value} className="bg-white text-black">
                {s.label}
              </option>
            ))}
          </select>

          {/* Clear Filters Button */}
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-1.5 text-dark-gray hover:text-black text-sm transition-colors ml-auto"
            >
              <span className="material-symbols-outlined text-sm">close</span>
              Clear Filters
            </button>
          )}
        </div>

        {/* Miami Info Banner */}
        <p className="text-xs text-dark-gray mt-3">
          📍 Showing Miami properties only • Mapa interactivo available in the sidebar
        </p>
      </div>
    </div>
  );
}
