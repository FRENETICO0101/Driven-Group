'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import type { Property } from '@/lib/types';

const MiamiPropertyMap = dynamic(
  () => import('@/components/real-estate/MiamiPropertyMap').then((mod) => ({ default: mod.MiamiPropertyMap })),
  { 
    ssr: false,
    loading: () => <div className="w-full h-96 md:h-screen bg-pale rounded-lg animate-pulse" />
  }
);

interface PropertyMapClientProps {
  properties: Property[];
  selectedDistrict?: string;
}

export function PropertyMapClient({ properties, selectedDistrict }: PropertyMapClientProps) {
  return (
    <Suspense fallback={<div className="w-full h-96 md:h-screen bg-pale rounded-lg animate-pulse" />}>
      <MiamiPropertyMap properties={properties} selectedDistrict={selectedDistrict} />
    </Suspense>
  );
}
