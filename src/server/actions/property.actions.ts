'use server';

import { propertyRepository } from '@/server/repositories/property.repository';
import { auth } from '@/lib/auth';
import { z } from 'zod';
import { PropertyType, PropertyStatus } from '@prisma/client';

const propertySchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  slug: z.string().min(1, 'Slug is required'),
  description: z.string().optional(),
  price: z.number().min(0, 'Price must be positive'),
  address: z.string().min(1, 'Address is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  zipCode: z.string().min(1, 'Zip code is required'),
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

export async function deletePropertyAction(id: string) {
  try {
    const session = await auth();
    if (session?.user?.role !== 'ADMIN') {
      return { success: false, error: 'Unauthorized' };
    }

    await propertyRepository.delete(id);
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

    return { success: true, data: image };
  } catch (error) {
    console.error('Error uploading image:', error);
    return { success: false, error: 'Failed to upload image' };
  }
}

export async function deletePropertyImageAction(imageId: string) {
  try {
    const session = await auth();
    if (session?.user?.role !== 'ADMIN') {
      return { success: false, error: 'Unauthorized' };
    }

    await propertyRepository.deleteImage(imageId);
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
    return { success: true };
  } catch (error) {
    console.error('Error reordering images:', error);
    return { success: false, error: 'Failed to reorder images' };
  }
}
