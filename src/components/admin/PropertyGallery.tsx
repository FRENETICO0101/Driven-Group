'use client';

import { useState } from 'react';
import Image from 'next/image';
import {
  deletePropertyImageAction,
  reorderPropertyImagesAction,
  uploadPropertyImageFileAction,
  uploadPropertyImageAction,
} from '@/server/actions/property.actions';
import type { PropertyImage } from '@/lib/types';

interface PropertyGalleryProps {
  propertyId: string;
  images: PropertyImage[];
}

export function PropertyGallery({ propertyId, images: initialImages }: PropertyGalleryProps) {
  const [images, setImages] = useState(initialImages);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadUrl, setUploadUrl] = useState('');
  const [uploadAlt, setUploadAlt] = useState('');
  const [uploadFile, setUploadFile] = useState<File | null>(null);

  const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!uploadFile && !uploadUrl.trim()) {
      setError('Selecciona una imagen o ingresa una URL');
      return;
    }

    setError(null);
    setIsLoading(true);

    try {
      const result = uploadFile
        ? await uploadPropertyImageFileAction(propertyId, new FormData(form))
        : await uploadPropertyImageAction(propertyId, uploadUrl, uploadAlt || undefined);

      if (!result.success || !result.data) {
        setError(result.error || 'No fue posible subir la imagen');
        return;
      }

      setImages([...images, result.data]);
      setUploadUrl('');
      setUploadAlt('');
      setUploadFile(null);
      form.reset();
    } catch (err) {
      setError('Ocurrió un error inesperado');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (imageId: string) => {
    if (!confirm('Are you sure you want to delete this image?')) return;

    setError(null);
    setIsLoading(true);

    try {
      const result = await deletePropertyImageAction(imageId);

      if (!result.success) {
        setError(result.error || 'Failed to delete image');
        return;
      }

      setImages(images.filter((img) => img.id !== imageId));
    } catch (err) {
      setError('Ocurrió un error inesperado');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMoveUp = async (index: number) => {
    if (index === 0) return;

    const newImages = [...images];
    const previous = newImages[index - 1];
    const current = newImages[index];
    if (!previous || !current) return;
    [newImages[index - 1], newImages[index]] = [current, previous];

    setImages(newImages);
    setError(null);
    setIsLoading(true);

    try {
      await reorderPropertyImagesAction(newImages.map((img) => img.id));
    } catch (err) {
      setError('No fue posible reordenar las imágenes');
      console.error(err);
      setImages(images);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMoveDown = async (index: number) => {
    if (index === images.length - 1) return;

    const newImages = [...images];
    const current = newImages[index];
    const next = newImages[index + 1];
    if (!current || !next) return;
    [newImages[index], newImages[index + 1]] = [next, current];

    setImages(newImages);
    setError(null);
    setIsLoading(true);

    try {
      await reorderPropertyImagesAction(newImages.map((img) => img.id));
    } catch (err) {
      setError('No fue posible reordenar las imágenes');
      console.error(err);
      setImages(images);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-800">{error}</p>
        </div>
      )}

      {/* Upload Form */}
      <div className="bg-white border border-light-gray rounded-xl p-8">
        <h2 className="text-2xl font-serif text-black mb-2">Agregar imagen</h2>
        <p className="mb-6 text-sm text-dark-gray">Sube un archivo (JPG, PNG, WebP; hasta 10 MB) o agrega la URL de una imagen existente.</p>

        <form onSubmit={handleUpload} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-black mb-2">Archivo de imagen</label>
            <input
              name="file"
              type="file"
              accept="image/jpeg,image/png,image/webp,image/avif"
              onChange={(e) => setUploadFile(e.target.files?.[0] || null)}
              className="block w-full text-sm text-dark-gray file:mr-4 file:rounded-lg file:border-0 file:bg-black file:px-4 file:py-2.5 file:text-sm file:font-semibold file:text-white hover:file:bg-black/90"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-black mb-2">URL de imagen</label>
            <input
              type="url"
              value={uploadUrl}
              onChange={(e) => setUploadUrl(e.target.value)}
              placeholder="https://example.com/image.jpg"
              className="w-full px-4 py-3 border border-light-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              required={!uploadFile}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-black mb-2">Texto alternativo (opcional)</label>
            <input
              type="text"
              name="alt"
              value={uploadAlt}
              onChange={(e) => setUploadAlt(e.target.value)}
              placeholder="Descripción de la imagen"
              className="w-full px-4 py-3 border border-light-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-3 bg-black text-white font-semibold rounded-lg hover:bg-black/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? 'Subiendo...' : 'Agregar imagen'}
          </button>
        </form>
      </div>

      {/* Gallery */}
      <div className="bg-white border border-light-gray rounded-xl p-8">
        <h2 className="text-2xl font-serif text-black mb-6">
          Galería ({images.length} imágenes)
        </h2>

        {images.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-dark-gray">Aún no hay imágenes. Agrega una arriba para comenzar.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {images.map((image, index) => (
              <div
                key={image.id}
                className="border border-light-gray rounded-lg overflow-hidden hover:border-black/30 transition-colors"
              >
                <div className="flex items-center gap-4 p-4">
                  {/* Thumbnail */}
                  <div className="relative w-24 h-24 flex-shrink-0 bg-light-gray rounded-lg overflow-hidden">
                    <Image
                      src={image.url}
                      alt={image.alt || 'Imagen de propiedad'}
                      fill
                      className="object-cover"
                      onError={(e) => {
                        const img = e.target as HTMLImageElement;
                        img.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%23f0f0f0" width="100" height="100"/%3E%3C/svg%3E';
                      }}
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-grow min-w-0">
                    <p className="text-sm font-semibold text-black truncate">{image.alt || 'Imagen'}</p>
                    <p className="text-xs text-dark-gray truncate">{image.url}</p>
                    <p className="text-xs text-gray mt-1">Orden: {image.order}</p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      onClick={() => handleMoveUp(index)}
                      disabled={index === 0 || isLoading}
                      className="px-3 py-2 border border-light-gray rounded-lg text-xs font-semibold hover:bg-light-gray/50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      title="Mover arriba"
                    >
                      ↑
                    </button>

                    <button
                      onClick={() => handleMoveDown(index)}
                      disabled={index === images.length - 1 || isLoading}
                      className="px-3 py-2 border border-light-gray rounded-lg text-xs font-semibold hover:bg-light-gray/50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      title="Mover abajo"
                    >
                      ↓
                    </button>

                    <button
                      onClick={() => handleDelete(image.id)}
                      disabled={isLoading}
                      className="px-3 py-2 border border-red-200 text-red-700 rounded-lg text-xs font-semibold hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
