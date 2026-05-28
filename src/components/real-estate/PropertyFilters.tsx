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

  return (
    <div className="sticky top-16 sm:top-20 z-30 bg-white border-b border-light-gray">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-4">
        <div className="flex flex-wrap items-center gap-2">

          {/* Miami identifier — always visible, non-interactive */}
          <div className="flex items-center gap-1.5 px-3 py-2 border border-ink bg-ink text-white text-xs font-semibold tracking-widest uppercase select-none">
            <span className="material-symbols-outlined" style={{ fontSize: 13 }}>location_on</span>
            Miami, FL
          </div>

          <span className="text-light-gray text-xs hidden sm:inline">|</span>

          {/* Property Type — pill buttons */}
          <div className="flex items-center gap-1.5 flex-wrap">
            {PROPERTY_TYPES.map((t) => (
              <button
                key={t.value}
                onClick={() => updateFilter('type', t.value)}
                className={`px-3 py-1.5 text-xs font-medium border transition-colors duration-150 ${
                  currentType === t.value
                    ? 'bg-ink text-white border-ink'
                    : 'bg-white text-mid-gray border-light-gray hover:border-dark-gray hover:text-ink'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <span className="text-light-gray text-xs hidden sm:inline">|</span>

          {/* Status pills */}
          <div className="flex items-center gap-1.5 flex-wrap">
            {PROPERTY_STATUSES.map((s) => (
              <button
                key={s.value}
                onClick={() => updateFilter('status', s.value)}
                className={`px-3 py-1.5 text-xs font-medium border transition-colors duration-150 ${
                  currentStatus === s.value
                    ? 'bg-ink text-white border-ink'
                    : 'bg-white text-mid-gray border-light-gray hover:border-dark-gray hover:text-ink'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>

          {/* Clear — only when filters active */}
          {hasActiveFilters && (
            <button
              onClick={() => router.push(pathname)}
              className="ml-auto flex items-center gap-1 text-xs text-mid-gray hover:text-ink transition-colors"
            >
              <span className="material-symbols-outlined" style={{ fontSize: 13 }}>close</span>
              Clear
            </button>
          )}
        </div>

        {/* Active district pill if set via map */}
        {currentDistrict && (
          <div className="flex items-center gap-2 mt-2 pt-2 border-t border-pale">
            <span className="text-xs text-mid-gray">District:</span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-pale text-ink text-xs font-medium">
              {currentDistrict}
              <button
                onClick={() => updateFilter('district', '')}
                className="hover:text-dark-gray transition-colors"
                aria-label="Remove district filter"
              >
                <span className="material-symbols-outlined" style={{ fontSize: 11 }}>close</span>
              </button>
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
