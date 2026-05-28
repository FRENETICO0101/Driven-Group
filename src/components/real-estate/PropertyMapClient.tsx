'use client';

import dynamic from 'next/dynamic';
import type { Property } from '@/lib/types';

const MiamiPropertyMap = dynamic(
  () =>
    import('@/components/real-estate/MiamiPropertyMap').then(
      (mod) => ({ default: mod.MiamiPropertyMap })
    ),
  {
    ssr: false,
    loading: () => (
      <div className="flex flex-col gap-4">
        <div className="w-full h-[420px] md:h-[520px] bg-pale animate-pulse" />
        <div className="h-40 bg-pale animate-pulse" />
      </div>
    ),
  }
);

interface PropertyMapClientProps {
  properties: Property[];
  selectedDistrict?: string;
  onDistrictClick?: (district: string) => void;
}

export function PropertyMapClient({
  properties,
  selectedDistrict,
  onDistrictClick,
}: PropertyMapClientProps) {
  return (
    <MiamiPropertyMap
      properties={properties}
      selectedDistrict={selectedDistrict}
      onDistrictClick={onDistrictClick}
    />
  );
}
