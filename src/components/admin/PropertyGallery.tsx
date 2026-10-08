'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import {
  deletePropertyImageAction,
  getCloudinaryUploadSignatureAction,
  reorderPropertyImagesAction,
  updatePropertyImageAction,
  uploadPropertyImageAction,
} from '@/server/actions/property.actions';
import type { PropertyImage } from '@/lib/types';
import { getPropertyImageUrl } from '@/lib/property-image';

interface PropertyGalleryProps {
  propertyId: string;
  images: PropertyImage[];
}

type ImageSource = 'file' | 'url';

export function PropertyGallery({ propertyId, images: initialImages }: PropertyGalleryProps) {
  const [images, setImages] = useState(initialImages);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadUrl, setUploadUrl] = useState('');
  const [uploadAlt, setUploadAlt] = useState('');
  const [uploadFiles, setUploadFiles] = useState<File[]>([]);
  const [imageSource, setImageSource] = useState<ImageSource>('file');
  const [filePreviewUrls, setFilePreviewUrls] = useState<string[]>([]);
  const [uploadProgress, setUploadProgress] = useState('');
  const [viewingImage, setViewingImage] = useState<PropertyImage | null>(null);
  const [editingImageId, setEditingImageId] = useState<string | null>(null);
  const [editingAlt, setEditingAlt] = useState('');

  useEffect(() => () => {
    filePreviewUrls.forEach((url) => URL.revokeObjectURL(url));
  }, [filePreviewUrls]);

  const handleFileChange = (files: File[]) => {
    filePreviewUrls.forEach((url) => URL.revokeObjectURL(url));
    setUploadFiles(files);
    setFilePreviewUrls(files.map((file) => URL.createObjectURL(file)));
  };

  const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (imageSource === 'file' && uploadFiles.length === 0) {
      setError('Selecciona una imagen para subir');
      return;
    }
    if (imageSource === 'url' && !uploadUrl.trim()) {
      setError('Ingresa el enlace de la imagen');
      return;
    }

    setError(null);
    setIsLoading(true);

    try {
      if (imageSource === 'file') {
        const invalid = uploadFiles.find((file) => !file.type.startsWith('image/') || file.size > 10 * 1024 * 1024);
        if (invalid) throw new Error(`${invalid.name}: usa JPG, PNG, WebP o AVIF de máximo 10 MB`);
        const signed = await getCloudinaryUploadSignatureAction('images');
        if (!signed.success) throw new Error(signed.error);
        const added: PropertyImage[] = [];
        for (const [index, file] of uploadFiles.entries()) {
          setUploadProgress(`Subiendo ${index + 1} de ${uploadFiles.length}: ${file.name}`);
          const data = new FormData();
          data.set('file', file);
          data.set('api_key', signed.data.apiKey);
          data.set('timestamp', String(signed.data.timestamp));
          data.set('folder', signed.data.folder);
          data.set('signature', signed.data.signature);
          const response = await fetch(`https://api.cloudinary.com/v1_1/${signed.data.cloudName}/image/upload`, { method: 'POST', body: data });
          const payload = await response.json() as { secure_url?: string; error?: { message?: string } };
          if (!response.ok || !payload.secure_url) throw new Error(payload.error?.message || `No fue posible subir ${file.name}`);
          const alt = uploadFiles.length === 1 && uploadAlt.trim()
            ? uploadAlt.trim()
            : file.name.replace(/\.[^.]+$/, '').replace(/[-_]+/g, ' ');
          const result = await uploadPropertyImageAction(propertyId, payload.secure_url, alt);
          if (!result.success || !result.data) throw new Error(result.error || `No fue posible registrar ${file.name}`);
          added.push(result.data);
        }
        setImages((current) => [...current, ...added]);
      } else {
        const result = await uploadPropertyImageAction(propertyId, uploadUrl, uploadAlt || undefined);
        if (!result.success || !result.data) throw new Error(result.error || 'No fue posible registrar la imagen');
        setImages((current) => [...current, result.data!]);
      }
      setUploadUrl('');
      setUploadAlt('');
      setUploadFiles([]);
      filePreviewUrls.forEach((url) => URL.revokeObjectURL(url));
      setFilePreviewUrls([]);
      setImageSource('file');
      form.reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ocurrió un error inesperado');
      console.error(err);
    } finally {
      setUploadProgress('');
      setIsLoading(false);
    }
  };

  const handleEdit = (image: PropertyImage) => {
    setEditingImageId(image.id);
    setEditingAlt(image.alt || '');
    setError(null);
  };

  const handleSaveEdit = async (imageId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await updatePropertyImageAction(imageId, editingAlt);
      if (!result.success || !result.data) {
        setError(result.error || 'No fue posible actualizar la imagen');
        return;
      }
      setImages((current) => current.map((image) => image.id === imageId ? result.data! : image));
      setEditingImageId(null);
      setEditingAlt('');
    } catch (err) {
      setError('Ocurrió un error inesperado');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (imageId: string) => {
    if (!confirm('¿Deseas eliminar esta imagen?')) return;

    setError(null);
    setIsLoading(true);

    try {
      const result = await deletePropertyImageAction(imageId);

      if (!result.success) {
        setError(result.error || 'No fue posible eliminar la imagen');
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
    <div className="space-y-6">
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-800">{error}</p>
        </div>
      )}

      {/* Upload Form */}
      <div className="rounded-xl border border-light-gray bg-white p-5 shadow-sm sm:p-6">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-serif text-black">Agregar imágenes</h2>
            <p className="mt-1 text-sm text-dark-gray">Carga varias imágenes a la vez o agrega un enlace directo.</p>
          </div>
          <span className="text-xs font-semibold text-gray">JPG, PNG, WebP o AVIF · 10 MB máx.</span>
        </div>

        <form onSubmit={handleUpload} className="space-y-4">
          <div className="inline-flex rounded-lg border border-light-gray bg-light-gray/30 p-1">
            <button type="button" onClick={() => { setImageSource('file'); setError(null); }} className={`rounded-md px-4 py-2 text-sm font-semibold transition-colors ${imageSource === 'file' ? 'bg-black text-white shadow-sm' : 'text-dark-gray hover:text-black'}`}>
              Subir archivo
            </button>
            <button type="button" onClick={() => { setImageSource('url'); setError(null); }} className={`rounded-md px-4 py-2 text-sm font-semibold transition-colors ${imageSource === 'url' ? 'bg-black text-white shadow-sm' : 'text-dark-gray hover:text-black'}`}>
              Usar enlace
            </button>
          </div>

          {imageSource === 'file' ? (
            <div>
              <label className="block text-sm font-semibold text-black mb-2">Selecciona una o varias imágenes</label>
              <input
                type="file"
                multiple
                accept="image/jpeg,image/png,image/webp,image/avif"
                onChange={(e) => handleFileChange(Array.from(e.target.files || []))}
                className="block w-full text-sm text-dark-gray file:mr-4 file:rounded-lg file:border-0 file:bg-black file:px-4 file:py-2.5 file:text-sm file:font-semibold file:text-white hover:file:bg-black/90"
              />
              <p className="mt-2 text-xs text-gray">JPG, PNG, WebP o AVIF; máximo 10 MB.</p>
            </div>
          ) : (
            <div>
              <label className="block text-sm font-semibold text-black mb-2">Enlace directo de la imagen</label>
              <input
                type="url"
                value={uploadUrl}
                onChange={(e) => setUploadUrl(e.target.value)}
                placeholder="https://sitio.com/imagen.jpg"
                className="w-full px-4 py-3 border border-light-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                required
              />
              <p className="mt-2 text-xs text-gray">Pega un enlace que abra directamente un archivo de imagen.</p>
            </div>
          )}

          {(filePreviewUrls.length > 0 || (imageSource === 'url' && uploadUrl.trim())) && (
            <div className="rounded-xl border border-light-gray bg-light-gray/10 p-4">
              <p className="mb-3 text-sm font-semibold text-black">Vista previa antes de guardar</p>
              <div className="grid grid-cols-2 gap-3 md:grid-cols-4 xl:grid-cols-6">
                {(filePreviewUrls.length ? filePreviewUrls : [uploadUrl.trim()]).map((url, index) => (
                  <div key={url} role="img" aria-label={uploadAlt || `Vista previa ${index + 1}`} className="aspect-[4/3] rounded-lg bg-light-gray bg-cover bg-center bg-no-repeat shadow-sm" style={{ backgroundImage: `url(${url})` }} />
                ))}
              </div>
            </div>
          )}

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
            {isLoading ? (uploadProgress || 'Guardando...') : uploadFiles.length > 1 ? `Agregar ${uploadFiles.length} imágenes` : 'Agregar imagen'}
          </button>
        </form>
      </div>

      {/* Gallery */}
      <div id="imagenes" className="scroll-mt-6 rounded-xl border border-light-gray bg-white p-5 shadow-sm sm:p-6">
        <div className="mb-5 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="text-2xl font-serif text-black">Galería ({images.length} imágenes)</h2>
          <p className="text-xs text-gray">La primera imagen se muestra como portada. Usa las flechas para cambiar el orden.</p>
        </div>

        {images.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-dark-gray">Aún no hay imágenes. Agrega una arriba para comenzar.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
            {images.map((image, index) => (
              <div
                key={image.id}
                className="overflow-hidden rounded-xl border border-light-gray bg-white transition-all hover:border-black/30 hover:shadow-sm"
              >
                <button type="button" onClick={() => setViewingImage(image)} className="group relative block aspect-[4/3] w-full overflow-hidden bg-light-gray text-left" aria-label={`Ampliar ${image.alt || `imagen ${index + 1}`}`}>
                    <Image
                      src={getPropertyImageUrl(image.url, 'preview')}
                      alt={image.alt || 'Imagen de propiedad'}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1536px) 33vw, 25vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                      onError={(e) => {
                        const img = e.target as HTMLImageElement;
                        img.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%23f0f0f0" width="100" height="100"/%3E%3C/svg%3E';
                      }}
                    />
                    <span className="absolute bottom-3 right-3 rounded-full bg-black/75 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm">Ampliar</span>
                  </button>

                <div className="space-y-3 p-3.5">
                  <div className="min-w-0">
                    <div className="flex items-center justify-between gap-3">
                      <p className="truncate text-sm font-semibold text-black">{image.alt || `Imagen ${index + 1}`}</p>
                      <span className="shrink-0 rounded-full bg-light-gray/40 px-2.5 py-1 text-xs text-dark-gray">Orden {index + 1}</span>
                    </div>
                    <p className="mt-1 truncate text-xs text-gray" title={image.url}>{image.url}</p>
                  </div>

                  {editingImageId === image.id ? (
                    <div className="rounded-lg border border-light-gray bg-light-gray/10 p-3">
                      <label className="mb-2 block text-xs font-semibold text-black">Descripción de la imagen</label>
                      <input
                        type="text"
                        value={editingAlt}
                        onChange={(event) => setEditingAlt(event.target.value)}
                        maxLength={160}
                        autoFocus
                        className="w-full rounded-lg border border-light-gray px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                      />
                      <div className="mt-3 flex gap-2">
                        <button type="button" onClick={() => handleSaveEdit(image.id)} disabled={isLoading} className="rounded-lg bg-black px-3 py-2 text-xs font-semibold text-white disabled:opacity-50">Guardar cambios</button>
                        <button type="button" onClick={() => setEditingImageId(null)} disabled={isLoading} className="rounded-lg border border-light-gray px-3 py-2 text-xs font-semibold text-black disabled:opacity-50">Cancelar</button>
                      </div>
                    </div>
                  ) : (
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleMoveUp(index)}
                      disabled={index === 0 || isLoading}
                      className="px-3 py-2 border border-light-gray rounded-lg text-xs font-semibold hover:bg-light-gray/50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      title="Mover arriba"
                    >
                      ↑
                    </button>

                    <button
                      type="button"
                      onClick={() => handleMoveDown(index)}
                      disabled={index === images.length - 1 || isLoading}
                      className="px-3 py-2 border border-light-gray rounded-lg text-xs font-semibold hover:bg-light-gray/50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      title="Mover abajo"
                    >
                      ↓
                    </button>

                    <button type="button" onClick={() => handleEdit(image)} disabled={isLoading} className="rounded-lg border border-light-gray px-3 py-2 text-xs font-semibold text-black transition-colors hover:bg-light-gray/40 disabled:opacity-50">
                      Editar descripción
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDelete(image.id)}
                      disabled={isLoading}
                      className="px-3 py-2 border border-red-200 text-red-700 rounded-lg text-xs font-semibold hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      Eliminar
                    </button>
                  </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {viewingImage && (
        <div className="fixed inset-0 z-[1600] flex items-center justify-center bg-black/85 p-4 sm:p-8" role="dialog" aria-modal="true" aria-label="Vista ampliada de la imagen" onClick={() => setViewingImage(null)}>
          <div className="relative h-[85dvh] w-full max-w-6xl" onClick={(event) => event.stopPropagation()}>
            <Image src={getPropertyImageUrl(viewingImage.url, 'full')} alt={viewingImage.alt || 'Imagen de propiedad'} fill sizes="100vw" className="object-contain" priority />
            <button type="button" onClick={() => setViewingImage(null)} className="absolute right-2 top-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-black shadow-lg">Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
}
