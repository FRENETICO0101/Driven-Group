'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import type { PropertyImage } from '@/lib/types';
import type { CatalogProperty } from '@/lib/property-catalog';
import { Icon } from '@/components/ui/Icon';

interface PropertyGalleryProps {
  images: PropertyImage[];
  title: string;
  galleryDocuments?: CatalogProperty['resources']['galleryDocuments'];
}

export function PropertyGallery({ images, title, galleryDocuments = [] }: PropertyGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [imageAspectRatio, setImageAspectRatio] = useState(4 / 3);
  const [selectedDocumentIndex, setSelectedDocumentIndex] = useState(() => {
    const heroIndex = galleryDocuments.findIndex((document) => /hero/i.test(document.name));
    return heroIndex >= 0 ? heroIndex : 0;
  });

  const selected = images[selectedIndex];
  const selectedDocument = selected
    ? galleryDocuments.find((document) => selected.id.endsWith(`-${document.name}.webp`))
    : undefined;

  useEffect(() => {
    if (!isLightboxOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsLightboxOpen(false);
      if (images.length > 1 && event.key === 'ArrowRight') setSelectedIndex((index) => (index + 1) % images.length);
      if (images.length > 1 && event.key === 'ArrowLeft') setSelectedIndex((index) => (index - 1 + images.length) % images.length);
    };

    document.addEventListener('keydown', handleKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [images.length, isLightboxOpen]);

  if (!images || images.length === 0) {
    if (galleryDocuments.length > 0) {
      const selectedPdf = galleryDocuments[selectedDocumentIndex] ?? galleryDocuments[0];
      return (
        <div className="space-y-3 sm:space-y-4">
          <div className="relative h-64 overflow-hidden rounded-xl border border-light-gray bg-light-gray/10 sm:h-80 md:h-96 lg:h-[500px]">
            <iframe
              key={selectedPdf.url}
              src={`${selectedPdf.url}#view=FitH&toolbar=0&navpanes=0`}
              title={`${title} — ${selectedPdf.name}`}
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
                    ? 'border-primary bg-white text-black'
                    : 'border-light-gray text-dark-gray hover:border-black hover:text-black'
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
      <div className="flex h-96 w-full items-center justify-center rounded-xl bg-light-gray/20">
        <span className="text-gray">Galería no disponible</span>
      </div>
    );
  }

  const showPrevious = () => setSelectedIndex((index) => (index - 1 + images.length) % images.length);
  const showNext = () => setSelectedIndex((index) => (index + 1) % images.length);

  return (
    <div className="space-y-3 sm:space-y-4">
      <div
        className="group relative mx-auto w-full overflow-hidden rounded-xl border border-light-gray bg-light-gray/10"
        style={{
          aspectRatio: imageAspectRatio,
          maxWidth: `min(100%, ${Math.round(imageAspectRatio * 520)}px)`,
        }}
      >
        <Image
          src={selected.url}
          alt={selected.alt || title}
          className="object-cover"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 760px"
          priority={selectedIndex === 0}
          onLoad={(event) => {
            const { naturalHeight, naturalWidth } = event.currentTarget;
            if (naturalWidth > 0 && naturalHeight > 0) {
              setImageAspectRatio(naturalWidth / naturalHeight);
            }
          }}
        />
        <button
          type="button"
          onClick={() => setIsLightboxOpen(true)}
          className="absolute inset-0 flex items-end justify-end bg-black/0 p-3 text-white transition-colors hover:bg-black/10 focus-visible:bg-black/10 sm:p-4"
          aria-label={`Ampliar imagen de ${title}`}
        >
          <span className="inline-flex items-center gap-2 rounded-lg bg-black/80 px-3 py-2 text-xs font-semibold opacity-100 shadow-sm backdrop-blur-sm transition-transform sm:translate-y-2 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100">
            <Icon name="fullscreen" className="h-4 w-4" />
            Ampliar imagen
          </span>
        </button>
      </div>

      <div className="flex items-center justify-between gap-3 text-xs text-dark-gray">
        <span>{selectedIndex + 1} de {images.length} imágenes</span>
        {selectedDocument && (
          <a
            href={selectedDocument.url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 font-semibold transition-colors hover:text-black"
          >
            <Icon name="picture_as_pdf" className="h-4 w-4" />
            Ver PDF original
            <Icon name="open_in_new" className="h-4 w-4" />
          </a>
        )}
      </div>

      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto px-1 pb-2 sm:gap-3">
          {images.map((image, idx) => (
            <button
              key={image.id}
              type="button"
              onClick={() => setSelectedIndex(idx)}
              className={`relative h-20 w-20 shrink-0 overflow-hidden rounded-lg border-2 transition-all sm:h-24 sm:w-24 ${
                idx === selectedIndex
                  ? 'border-primary opacity-100'
                  : 'border-transparent opacity-60 hover:border-light-gray hover:opacity-100'
              }`}
              aria-label={`Mostrar imagen ${idx + 1} de ${title}`}
              aria-current={idx === selectedIndex ? 'true' : undefined}
            >
              <Image src={image.url} alt={image.alt || title} className="object-cover" fill sizes="100px" />
            </button>
          ))}
        </div>
      )}

      {isLightboxOpen && (
        <div
          className="fixed inset-0 z-[1100] flex items-center justify-center bg-black/80 p-3 backdrop-blur-sm sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={`Galería ampliada de ${title}`}
          onClick={() => setIsLightboxOpen(false)}
        >
          <div className="relative flex h-full w-full max-w-7xl flex-col overflow-hidden rounded-xl bg-[#171717] shadow-2xl" onClick={(event) => event.stopPropagation()}>
            <div className="flex items-center justify-between gap-4 border-b border-white/15 px-4 py-3 text-white sm:px-6">
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold sm:text-base">{title}</p>
                <p className="mt-0.5 text-xs text-white/65">Imagen {selectedIndex + 1} de {images.length}</p>
              </div>
              <button type="button" onClick={() => setIsLightboxOpen(false)} className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-white/10 px-3 py-2 text-xs font-semibold hover:bg-white/20">
                <Icon name="close" className="h-4 w-4" />
                Cerrar
              </button>
            </div>

            <div className="relative min-h-0 flex-1">
              <Image
                src={selected.url}
                alt={selected.alt || title}
                className="object-contain p-3 sm:p-6"
                fill
                sizes="100vw"
                priority
              />
              {images.length > 1 && (
                <>
                  <button type="button" onClick={showPrevious} className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/65 p-2 text-white transition-colors hover:bg-black sm:left-5 sm:p-3" aria-label="Imagen anterior">
                    <Icon name="chevron_left" className="h-5 w-5" />
                  </button>
                  <button type="button" onClick={showNext} className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/65 p-2 text-white transition-colors hover:bg-black sm:right-5 sm:p-3" aria-label="Imagen siguiente">
                    <Icon name="chevron_right" className="h-5 w-5" />
                  </button>
                </>
              )}
            </div>

            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto border-t border-white/15 px-4 py-3 sm:px-6">
                {images.map((image, index) => (
                  <button key={image.id} type="button" onClick={() => setSelectedIndex(index)} className={`relative h-12 w-16 shrink-0 overflow-hidden rounded border-2 ${index === selectedIndex ? 'border-white' : 'border-transparent opacity-60 hover:opacity-100'}`} aria-label={`Ir a imagen ${index + 1}`}>
                    <Image src={image.url} alt="" className="object-cover" fill sizes="64px" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
