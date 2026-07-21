'use client';

import Image from 'next/image';
import { useState } from 'react';
import type { PropertyImage } from '@/lib/types';
import type { CatalogProperty } from '@/lib/property-catalog';

interface PropertyGalleryProps {
  images: PropertyImage[];
  title: string;
  galleryDocuments?: CatalogProperty['resources']['galleryDocuments'];
}

export function PropertyGallery({ images, title, galleryDocuments = [] }: PropertyGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedDocumentIndex, setSelectedDocumentIndex] = useState(() => {
    const heroIndex = galleryDocuments.findIndex((document) => /hero/i.test(document.name));
    return heroIndex >= 0 ? heroIndex : 0;
  });

  if (!images || images.length === 0) {
    if (galleryDocuments.length > 0) {
      const selectedDocument = galleryDocuments[selectedDocumentIndex] ?? galleryDocuments[0];
      return (
        <div className="space-y-3 sm:space-y-4">
          <div className="relative h-64 overflow-hidden rounded-lg border border-light-gray bg-light-gray/10 sm:h-80 sm:rounded-xl md:h-96 lg:h-[500px]">
            <iframe
              key={selectedDocument.url}
              src={`${selectedDocument.url}#view=FitH&toolbar=0&navpanes=0`}
              title={`${title} — ${selectedDocument.name}`}
              className="h-full w-full border-0"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto px-1 pb-2 sm:gap-3">
            {galleryDocuments.map((document, index) => (
              <button
                key={document.url}
                type="button"
                onClick={() => setSelectedDocumentIndex(index)}
                className={`min-w-32 rounded-lg border px-3 py-2 text-left text-xs transition-colors sm:min-w-40 sm:text-sm ${
                  index === selectedDocumentIndex
                    ? "border-primary bg-white text-black"
                    : "border-light-gray text-dark-gray hover:border-black hover:text-black"
                }`}
                aria-label={`Ver rendering: ${document.name}`}
              >
                {document.name}
              </button>
            ))}
          </div>
        </div>
      );
    }
    return (
      <div className="w-full h-96 bg-light-gray/20 rounded-xl flex items-center justify-center">
        <span className="text-gray">Galería no disponible</span>
      </div>
    );
  }

  const selected = images[selectedIndex];
  const selectedDocument = galleryDocuments.find((document) => selected.id.endsWith(`-${document.name}.webp`));

  return (
    <div className="space-y-3 sm:space-y-4">
      <div className="relative h-64 sm:h-80 md:h-96 lg:h-[500px] overflow-hidden rounded-lg sm:rounded-xl">
        <Image
          src={selected.url}
          alt={selected.alt || title}
          className="w-full h-full object-cover"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 80vw"
          priority={selectedIndex === 0}
        />
      </div>

      {selectedDocument && (
        <a
          href={selectedDocument.url}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 text-sm font-semibold text-dark-gray transition-colors hover:text-black"
        >
          <span className="material-symbols-outlined text-base">picture_as_pdf</span>
          Ver PDF original
          <span className="material-symbols-outlined text-base">open_in_new</span>
        </a>
      )}

      {images.length > 1 && (
        <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-2 px-1">
          {images.map((image, idx) => (
            <button
              key={image.id}
              onClick={() => setSelectedIndex(idx)}
              className={`relative flex-shrink-0 h-20 sm:h-24 w-20 sm:w-24 rounded-lg overflow-hidden transition-all border-2 ${
                idx === selectedIndex
                  ? 'border-primary/80'
                  : 'border-dark-gray opacity-60 hover:opacity-100'
              }`}
            >
              <Image
                src={image.url}
                alt={image.alt || title}
                className="w-full h-full object-cover"
                fill
                sizes="100px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
