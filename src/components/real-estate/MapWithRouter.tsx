'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';
import { PropertyMapClient } from '@/components/real-estate/PropertyMapClient';
import type { Property } from '@/lib/types';

interface MapWithRouterProps {
  properties: Property[];
  selectedDistrict: string;
}

/**
 * Thin client wrapper that connects the map's district click
 * to URL search params without turning the page into a Client Component.
 */
export function MapWithRouter({ properties, selectedDistrict }: MapWithRouterProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleDistrictClick = useCallback(
    (district: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (district) {
        params.set('district', district);
      } else {
        params.delete('district');
      }
      router.push(`${pathname}?${params.toString()}`);
    },
    [router, pathname, searchParams]
  );

  return (
    <PropertyMapClient
      properties={properties}
      selectedDistrict={selectedDistrict}
      onDistrictClick={handleDistrictClick}
    />
  );
}
