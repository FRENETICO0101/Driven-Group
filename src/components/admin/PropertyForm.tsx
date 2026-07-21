'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
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
  price: number;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  bedrooms: number;
  bathrooms: number;
  squareFeet: number;
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
  const [formData, setFormData] = useState<PropertyFormState>({
    title: initialData?.title || '',
    slug: initialData?.slug || '',
    description: initialData?.description || '',
    price: initialData?.price || 0,
    address: initialData?.address || '',
    city: initialData?.city || '',
    state: initialData?.state || '',
    zipCode: initialData?.zipCode || '',
    bedrooms: initialData?.bedrooms || 0,
    bathrooms: initialData?.bathrooms || 0,
    squareFeet: initialData?.squareFeet || 0,
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
        bedrooms: Number(formData.bedrooms),
        bathrooms: Number(formData.bathrooms),
        squareFeet: Number(formData.squareFeet),
        type: formData.type,
        status: formData.status,
        amenities: formData.amenities,
      });

      if (!result.success) {
        setError(result.error || 'Failed to save property');
        return;
      }

      router.push('/admin/properties');
    } catch (err) {
      setError('An unexpected error occurred');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!propertyId || !confirm('Are you sure you want to delete this property? This cannot be undone.')) return;

    setError(null);
    setIsDeleting(true);
    try {
      const result = await deletePropertyAction(propertyId);
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
        <h2 className="text-2xl font-serif text-black">Basic Information</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-black mb-2">Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={handleTitleChange}
              className="w-full px-4 py-3 border border-light-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-black mb-2">Slug (auto-generated)</label>
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
          <label className="block text-sm font-semibold text-black mb-2">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
            rows={4}
            className="w-full px-4 py-3 border border-light-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>
      </div>

      <div className="bg-white border border-light-gray rounded-xl p-8 space-y-6">
        <h2 className="text-2xl font-serif text-black">Location & Details</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-black mb-2">Address</label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => setFormData((prev) => ({ ...prev, address: e.target.value }))}
              className="w-full px-4 py-3 border border-light-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-black mb-2">City</label>
            <input
              type="text"
              value={formData.city}
              onChange={(e) => setFormData((prev) => ({ ...prev, city: e.target.value }))}
              className="w-full px-4 py-3 border border-light-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-black mb-2">State</label>
            <input
              type="text"
              value={formData.state}
              onChange={(e) => setFormData((prev) => ({ ...prev, state: e.target.value }))}
              className="w-full px-4 py-3 border border-light-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-black mb-2">Zip Code</label>
            <input
              type="text"
              value={formData.zipCode}
              onChange={(e) => setFormData((prev) => ({ ...prev, zipCode: e.target.value }))}
              className="w-full px-4 py-3 border border-light-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>
        </div>
      </div>

      <div className="bg-white border border-light-gray rounded-xl p-8 space-y-6">
        <h2 className="text-2xl font-serif text-black">Specifications</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-semibold text-black mb-2">Bedrooms</label>
            <input
              type="number"
              min="0"
              value={formData.bedrooms}
              onChange={(e) => setFormData((prev) => ({ ...prev, bedrooms: Number(e.target.value) }))}
              className="w-full px-4 py-3 border border-light-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-black mb-2">Bathrooms</label>
            <input
              type="number"
              min="0"
              step="0.5"
              value={formData.bathrooms}
              onChange={(e) => setFormData((prev) => ({ ...prev, bathrooms: Number(e.target.value) }))}
              className="w-full px-4 py-3 border border-light-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-black mb-2">Square Feet</label>
            <input
              type="number"
              min="1"
              value={formData.squareFeet}
              onChange={(e) => setFormData((prev) => ({ ...prev, squareFeet: Number(e.target.value) }))}
              className="w-full px-4 py-3 border border-light-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-black mb-2">Price</label>
            <input
              type="number"
              min="0"
              value={formData.price}
              onChange={(e) => setFormData((prev) => ({ ...prev, price: Number(e.target.value) }))}
              className="w-full px-4 py-3 border border-light-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-black mb-2">Type</label>
            <select
              value={formData.type}
              onChange={(e) => setFormData((prev) => ({ ...prev, type: e.target.value as PropertyType }))}
              className="w-full px-4 py-3 border border-light-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              required
            >
              <option value="RESIDENTIAL">Residential</option>
              <option value="COMMERCIAL">Commercial</option>
              <option value="LAND">Land</option>
              <option value="MIXED_USE">Mixed Use</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-black mb-2">Status</label>
          <select
            value={formData.status}
              onChange={(e) => setFormData((prev) => ({ ...prev, status: e.target.value as PropertyStatus }))}
            className="w-full px-4 py-3 border border-light-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            required
          >
            <option value="ACTIVE">Active</option>
            <option value="PENDING">Pending</option>
            <option value="SOLD">Sold</option>
            <option value="INACTIVE">Inactive</option>
          </select>
        </div>
      </div>

      <div className="bg-white border border-light-gray rounded-xl p-8 space-y-6">
        <h2 className="text-2xl font-serif text-black">Amenities</h2>

        <div>
          <label className="block text-sm font-semibold text-black mb-2">
            Amenities (comma-separated)
          </label>
          <textarea
            value={formData.amenities.join(', ')}
            onChange={handleAmenitiesChange}
            rows={3}
            placeholder="e.g., Pool, Gym, Parking, Garden"
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
          {isLoading ? 'Saving...' : 'Save Property'}
        </button>

        <button
          type="button"
          onClick={() => router.back()}
          className="px-8 py-3 border border-light-gray text-black font-semibold rounded-lg hover:bg-light-gray/30 transition-colors"
        >
          Cancel
        </button>
        {propertyId && (
          <button
            type="button"
            onClick={handleDelete}
            disabled={isLoading || isDeleting}
            className="ml-auto px-8 py-3 border border-red-200 text-red-700 font-semibold rounded-lg hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isDeleting ? 'Deleting...' : 'Delete Property'}
          </button>
        )}
      </div>
    </form>
  );
}
