'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { deletePropertyAction, savePropertyAction } from '@/server/actions/property.actions';
import type { Property, PropertyStatus, PropertyType } from '@/lib/types';

interface PropertyFormProps {
  propertyId?: string | null;
  initialData?: Property | null;
}

interface PropertyFormState {
  title: string;
  slug: string;
  description: string;
  price: number | '';
  address: string;
  city: string;
  state: string;
  zipCode: string;
  latitude: number | '';
  longitude: number | '';
  bedrooms: number | '';
  bathrooms: number | '';
  squareFeet: number | '';
  type: PropertyType;
  status: PropertyStatus;
  amenities: string[];
}

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

export function PropertyForm({ propertyId, initialData }: PropertyFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const canDelete = Boolean(propertyId || initialData?.slug);
  const [formData, setFormData] = useState<PropertyFormState>({
    title: initialData?.title || '',
    slug: initialData?.slug || '',
    description: initialData?.description || '',
    price: initialData?.price ?? '',
    address: initialData?.address || '',
    city: initialData?.city || '',
    state: initialData?.state || '',
    zipCode: initialData?.zipCode || '',
    latitude: initialData?.latitude ?? '',
    longitude: initialData?.longitude ?? '',
    bedrooms: initialData?.bedrooms ?? '',
    bathrooms: initialData?.bathrooms ?? '',
    squareFeet: initialData?.squareFeet ?? '',
    type: initialData?.type || 'RESIDENTIAL',
    status: initialData?.status || 'ACTIVE',
    amenities: initialData?.amenities || [],
  });

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setFormData((prev) => ({
      ...prev,
      title: newTitle,
      slug: generateSlug(newTitle),
    }));
  };

  const handleAmenitiesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const amenities = e.target.value
      .split(',')
      .map((a) => a.trim())
      .filter((a) => a);
    setFormData((prev) => ({
      ...prev,
      amenities,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const result = await savePropertyAction(propertyId || null, {
        title: formData.title,
        slug: formData.slug,
        description: formData.description || undefined,
        price: Number(formData.price),
        address: formData.address,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode,
        latitude: formData.latitude === '' ? undefined : Number(formData.latitude),
        longitude: formData.longitude === '' ? undefined : Number(formData.longitude),
        bedrooms: Number(formData.bedrooms),
        bathrooms: Number(formData.bathrooms),
        squareFeet: Number(formData.squareFeet),
        type: formData.type,
        status: formData.status,
        amenities: formData.amenities,
      });

      if (!result.success || !result.data) {
        setError(result.error || 'Failed to save property');
        return;
      }

      router.push(`/admin/properties/${result.data.slug}`);
      router.refresh();
    } catch (err) {
      setError('An unexpected error occurred');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!canDelete) return;

    setError(null);
    setIsDeleting(true);
    try {
      const result = await deletePropertyAction(propertyId || null, formData.slug);
      if (!result.success) {
        setError(result.error || 'Failed to delete property');
        return;
      }
      router.push('/admin/properties');
      router.refresh();
    } catch (err) {
      setError('An unexpected error occurred');
      console.error(err);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-800">{error}</p>
        </div>
      )}

      <div className="bg-white border border-light-gray rounded-xl p-8 space-y-6">
        <h2 className="text-2xl font-serif text-black">Información básica</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-black mb-2">Título</label>
            <input
              type="text"
              value={formData.title}
              onChange={handleTitleChange}
              className="w-full px-4 py-3 border border-light-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-black mb-2">Slug (generado automáticamente)</label>
            <input
              type="text"
              value={formData.slug}
              onChange={(e) => setFormData((prev) => ({ ...prev, slug: e.target.value }))}
              className="w-full px-4 py-3 border border-light-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-black mb-2">Descripción</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
            rows={4}
            className="w-full px-4 py-3 border border-light-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>
      </div>

      <div className="bg-white border border-light-gray rounded-xl p-8 space-y-6">
        <h2 className="text-2xl font-serif text-black">Ubicación y detalles</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-black mb-2">Dirección</label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => setFormData((prev) => ({ ...prev, address: e.target.value }))}
              className="w-full px-4 py-3 border border-light-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-black mb-2">Ciudad</label>
            <input
              type="text"
              value={formData.city}
              onChange={(e) => setFormData((prev) => ({ ...prev, city: e.target.value }))}
              className="w-full px-4 py-3 border border-light-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-black mb-2">Estado</label>
            <input
              type="text"
              value={formData.state}
              onChange={(e) => setFormData((prev) => ({ ...prev, state: e.target.value }))}
              className="w-full px-4 py-3 border border-light-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-black mb-2">Código postal</label>
            <input
              type="text"
              value={formData.zipCode}
              onChange={(e) => setFormData((prev) => ({ ...prev, zipCode: e.target.value }))}
              className="w-full px-4 py-3 border border-light-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-black mb-2">Latitud</label>
            <input
              type="number"
              min="-90"
              max="90"
              step="any"
              value={formData.latitude}
              onChange={(e) => setFormData((prev) => ({ ...prev, latitude: e.target.value === '' ? '' : Number(e.target.value) }))}
              placeholder="25.7617"
              className="w-full px-4 py-3 border border-light-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-black mb-2">Longitud</label>
            <input
              type="number"
              min="-180"
              max="180"
              step="any"
              value={formData.longitude}
              onChange={(e) => setFormData((prev) => ({ ...prev, longitude: e.target.value === '' ? '' : Number(e.target.value) }))}
              placeholder="-80.1918"
              className="w-full px-4 py-3 border border-light-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
        </div>
      </div>

      <div className="bg-white border border-light-gray rounded-xl p-8 space-y-6">
        <h2 className="text-2xl font-serif text-black">Especificaciones</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-semibold text-black mb-2">Recámaras</label>
            <input
              type="number"
              min="0"
              value={formData.bedrooms}
              onChange={(e) => setFormData((prev) => ({ ...prev, bedrooms: e.target.value === '' ? '' : Number(e.target.value) }))}
              className="w-full px-4 py-3 border border-light-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-black mb-2">Baños</label>
            <input
              type="number"
              min="0"
              step="0.5"
              value={formData.bathrooms}
              onChange={(e) => setFormData((prev) => ({ ...prev, bathrooms: e.target.value === '' ? '' : Number(e.target.value) }))}
              className="w-full px-4 py-3 border border-light-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-black mb-2">Pies cuadrados</label>
            <input
              type="number"
              min="1"
              value={formData.squareFeet}
              onChange={(e) => setFormData((prev) => ({ ...prev, squareFeet: e.target.value === '' ? '' : Number(e.target.value) }))}
              className="w-full px-4 py-3 border border-light-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-black mb-2">Precio</label>
            <input
              type="number"
              min="0"
              value={formData.price}
              onChange={(e) => setFormData((prev) => ({ ...prev, price: e.target.value === '' ? '' : Number(e.target.value) }))}
              className="w-full px-4 py-3 border border-light-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-black mb-2">Tipo</label>
            <select
              value={formData.type}
              onChange={(e) => setFormData((prev) => ({ ...prev, type: e.target.value as PropertyType }))}
              className="w-full px-4 py-3 border border-light-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              required
            >
              <option value="RESIDENTIAL">Residencial</option>
              <option value="COMMERCIAL">Comercial</option>
              <option value="LAND">Terreno</option>
              <option value="MIXED_USE">Uso mixto</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-black mb-2">Estatus</label>
          <select
            value={formData.status}
              onChange={(e) => setFormData((prev) => ({ ...prev, status: e.target.value as PropertyStatus }))}
            className="w-full px-4 py-3 border border-light-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            required
          >
            <option value="ACTIVE">Activa</option>
            <option value="PENDING">Pendiente</option>
            <option value="SOLD">Vendida</option>
            <option value="INACTIVE">Inactiva</option>
          </select>
        </div>
      </div>

      <div className="bg-white border border-light-gray rounded-xl p-8 space-y-6">
        <h2 className="text-2xl font-serif text-black">Amenidades</h2>

        <div>
          <label className="block text-sm font-semibold text-black mb-2">
            Amenidades (separadas por comas)
          </label>
          <textarea
            value={formData.amenities.join(', ')}
            onChange={handleAmenitiesChange}
            rows={3}
            placeholder="Ej. alberca, gimnasio, estacionamiento, jardín"
            className="w-full px-4 py-3 border border-light-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={isLoading}
          className="px-8 py-3 bg-black text-white font-semibold rounded-lg hover:bg-black/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? 'Guardando...' : 'Guardar propiedad'}
        </button>

        <button
          type="button"
          onClick={() => router.back()}
          className="px-8 py-3 border border-light-gray text-black font-semibold rounded-lg hover:bg-light-gray/30 transition-colors"
        >
          Cancelar
        </button>
        {propertyId && (
          <Link href={`/admin/properties/${formData.slug}/gallery`} className="px-8 py-3 border border-light-gray text-black font-semibold rounded-lg hover:bg-light-gray/30 transition-colors">
            Gestionar galería
          </Link>
        )}
        {canDelete && (
          <button
            type="button"
            onClick={handleDelete}
            disabled={isLoading || isDeleting}
            className="ml-auto px-8 py-3 border border-red-200 text-red-700 font-semibold rounded-lg hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isDeleting ? 'Eliminando...' : 'Eliminar propiedad'}
          </button>
        )}
      </div>
    </form>
  );
}
