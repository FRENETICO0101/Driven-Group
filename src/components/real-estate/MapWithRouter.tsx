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
      
      // Scroll to listings smoothly after a small delay for URL update
      setTimeout(() => {
        const listingsElement = document.getElementById('listings');
        if (listingsElement) {
          listingsElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
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
