'use client';

import { useState } from 'react';
import type { PropertyImage } from '@/lib/types';

interface PropertyGalleryProps {
  images: PropertyImage[];
  title: string;
}

export function PropertyGallery({ images, title }: PropertyGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="w-full h-96 bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl flex items-center justify-center">
        <span className="text-slate-400">Galería no disponible</span>
      </div>
    );
  }

  const selected = images[selectedIndex];

  return (
    <div className="space-y-3 sm:space-y-4">
      <div className="relative h-64 sm:h-80 md:h-96 lg:h-[500px] overflow-hidden rounded-lg sm:rounded-xl">
        <img
          src={selected.url}
          alt={selected.alt || title}
          className="w-full h-full object-cover"
        />
      </div>

      {images.length > 1 && (
        <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-2 px-1">
          {images.map((image, idx) => (
            <button
              key={image.id}
              onClick={() => setSelectedIndex(idx)}
              className={`flex-shrink-0 h-20 sm:h-24 w-20 sm:w-24 rounded-lg overflow-hidden transition-all border-2 ${
                idx === selectedIndex
                  ? 'border-primary/80'
                  : 'border-slate-700 opacity-60 hover:opacity-100'
              }`}
            >
              <img
                src={image.url}
                alt={image.alt || title}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
