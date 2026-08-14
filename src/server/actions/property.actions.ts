'use server';

import { propertyRepository } from '@/server/repositories/property.repository';
import { auth } from '@/lib/auth';
import { z } from 'zod';
import { PropertyType, PropertyStatus } from '@prisma/client';
import { getCatalogPropertyBySlug } from '@/lib/property-catalog';
import { createHash } from 'crypto';
import { revalidatePath } from 'next/cache';
import type { PropertyImage } from '@/lib/types';

const propertySchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  slug: z.string().min(1, 'Slug is required'),
  description: z.string().optional(),
  price: z.number().min(0, 'Price must be positive'),
  address: z.string().min(1, 'Address is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  zipCode: z.string().min(1, 'Zip code is required'),
  latitude: z.number().min(-90).max(90).optional(),
  longitude: z.number().min(-180).max(180).optional(),
  bedrooms: z.number().int().min(0),
  bathrooms: z.number().min(0),
  squareFeet: z.number().min(1, 'Square feet must be positive'),
  type: z.enum(['RESIDENTIAL', 'COMMERCIAL', 'LAND', 'MIXED_USE']),
  status: z.enum(['ACTIVE', 'SOLD', 'PENDING', 'INACTIVE']),
  amenities: z.array(z.string()).optional(),
});

export async function savePropertyAction(id: string | null, data: z.infer<typeof propertySchema>) {
  try {
    const session = await auth();
    if (session?.user?.role !== 'ADMIN') {
      return { success: false, error: 'Unauthorized' };
    }

    const parsed = propertySchema.safeParse(data);
    if (!parsed.success) {
      return { success: false, error: parsed.error.issues[0]?.message || 'Validation error' };
    }

    // Check slug uniqueness
    const slugExists = await propertyRepository.checkSlugExists(parsed.data.slug, id || undefined);
    if (slugExists) {
      return { success: false, error: 'Slug already exists' };
    }

    if (id) {
      // Update existing
      const updated = await propertyRepository.update(id, {
        ...parsed.data,
        type: parsed.data.type as PropertyType,
        status: parsed.data.status as PropertyStatus,
      });
      return { success: true, data: updated };
    } else {
      // Create new
      const created = await propertyRepository.create({
        ...parsed.data,
        type: parsed.data.type as PropertyType,
        status: parsed.data.status as PropertyStatus,
        agentId: session.user.id,
      });
      return { success: true, data: created };
    }
  } catch (error) {
    console.error('Error saving property:', error);
    return { success: false, error: 'Failed to save property' };
  }
}

export async function deletePropertyAction(id: string | null, slug: string) {
  try {
    const session = await auth();
    if (session?.user?.role !== 'ADMIN') {
      return { success: false, error: 'Unauthorized' };
    }

    const catalogProperty = getCatalogPropertyBySlug(slug);
    const storedProperty = id ? await propertyRepository.getById(id) : await propertyRepository.getBySlug(slug);

    if (catalogProperty) {
      const sourceData = {
        title: catalogProperty.title,
        slug: catalogProperty.slug,
        description: catalogProperty.description || undefined,
        price: catalogProperty.price,
        address: catalogProperty.address,
        city: catalogProperty.city,
        state: catalogProperty.state,
        zipCode: catalogProperty.zipCode || '00000',
        bedrooms: catalogProperty.bedrooms,
        bathrooms: catalogProperty.bathrooms,
        squareFeet: catalogProperty.squareFeet || 1,
        type: catalogProperty.type as PropertyType,
        status: PropertyStatus.INACTIVE,
        amenities: catalogProperty.amenities,
      };
      if (storedProperty) {
        await propertyRepository.update(storedProperty.id, sourceData);
      } else {
        await propertyRepository.create({ ...sourceData, agentId: session.user.id });
      }
      return { success: true };
    }

    if (!storedProperty) return { success: false, error: 'Property not found' };
    await propertyRepository.delete(storedProperty.id);
    return { success: true };
  } catch (error) {
    console.error('Error deleting property:', error);
    return { success: false, error: 'Failed to delete property' };
  }
}

export async function getPropertiesAction(filters?: any) {
  try {
    const properties = await propertyRepository.getAll(filters);
    return { success: true, data: properties };
  } catch (error) {
    console.error('Error fetching properties:', error);
    return { success: false, error: 'Failed to fetch properties' };
  }
}

export async function getPropertyAction(id: string) {
  try {
    const property = await propertyRepository.getById(id);
    if (!property) {
      return { success: false, error: 'Property not found' };
    }
    return { success: true, data: property };
  } catch (error) {
    console.error('Error fetching property:', error);
    return { success: false, error: 'Failed to fetch property' };
  }
}

export async function uploadPropertyImageAction(propertyId: string, url: string, alt?: string) {
  try {
    const session = await auth();
    if (session?.user?.role !== 'ADMIN') {
      return { success: false, error: 'Unauthorized' };
    }

    const property = await propertyRepository.getById(propertyId);
    if (!property) {
      return { success: false, error: 'Property not found' };
    }

    const nextOrder = (property.images?.length || 0) + 1;
    const image = await propertyRepository.addImage(propertyId, { url, alt, order: nextOrder });
    revalidatePath('/real-estate');
    revalidatePath(`/real-estate/${property.slug}`);

    return { success: true, data: image };
  } catch (error) {
    console.error('Error uploading image:', error);
    return { success: false, error: 'Failed to upload image' };
  }
}

export async function uploadPropertyImageFileAction(
  propertyId: string,
  formData: FormData,
): Promise<{ success: boolean; data?: PropertyImage; error?: string }> {
  const session = await auth();
  if (session?.user?.role !== 'ADMIN') return { success: false, error: 'Unauthorized' };

  const file = formData.get('file');
  const alt = String(formData.get('alt') ?? '').trim() || undefined;
  if (!(file instanceof File) || file.size === 0) return { success: false, error: 'Select an image file' };
  if (!file.type.startsWith('image/')) return { success: false, error: 'Only image files are allowed' };
  if (file.size > 10 * 1024 * 1024) return { success: false, error: 'Images must be 10 MB or smaller' };

  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  if (!cloudName || !apiKey || !apiSecret) return { success: false, error: 'Cloudinary is not configured' };

  const property = await propertyRepository.getById(propertyId);
  if (!property) return { success: false, error: 'Property not found' };

  const timestamp = Math.floor(Date.now() / 1000);
  const folder = process.env.CLOUDINARY_UPLOAD_FOLDER || 'driven-group/properties';
  const signature = createHash('sha1').update(`folder=${folder}&timestamp=${timestamp}${apiSecret}`).digest('hex');
  const uploadData = new FormData();
  uploadData.set('file', file);
  uploadData.set('api_key', apiKey);
  uploadData.set('timestamp', String(timestamp));
  uploadData.set('folder', folder);
  uploadData.set('signature', signature);

  try {
    const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, { method: 'POST', body: uploadData });
    const payload = await response.json() as { secure_url?: string; error?: { message?: string } };
    if (!response.ok || !payload.secure_url) return { success: false, error: payload.error?.message || 'Image upload failed' };
    return uploadPropertyImageAction(propertyId, payload.secure_url, alt);
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    return { success: false, error: 'Image upload failed' };
  }
}

export async function deletePropertyImageAction(imageId: string) {
  try {
    const session = await auth();
    if (session?.user?.role !== 'ADMIN') {
      return { success: false, error: 'Unauthorized' };
    }

    await propertyRepository.deleteImage(imageId);
    revalidatePath('/real-estate');
    return { success: true };
  } catch (error) {
    console.error('Error deleting image:', error);
    return { success: false, error: 'Failed to delete image' };
  }
}

export async function reorderPropertyImagesAction(
  imageIds: string[],
) {
  try {
    const session = await auth();
    if (session?.user?.role !== 'ADMIN') {
      return { success: false, error: 'Unauthorized' };
    }

    await propertyRepository.reorderImages(imageIds);
    revalidatePath('/real-estate');
    return { success: true };
  } catch (error) {
    console.error('Error reordering images:', error);
    return { success: false, error: 'Failed to reorder images' };
  }
}
