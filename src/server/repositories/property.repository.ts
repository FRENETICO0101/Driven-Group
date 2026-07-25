import { prisma } from '@/lib/prisma';
import { PropertyType, PropertyStatus } from '@prisma/client';

export type PropertyFilters = {
  city?: string;
  cities?: string[];
  type?: PropertyType;
  status?: PropertyStatus;
  search?: string;
};

export async function getFeaturedProperties(limit = 6) {
  return prisma.property.findMany({
    where: { status: 'ACTIVE' },
    include: { images: { orderBy: { order: 'asc' } }, agent: { select: { id: true, name: true, email: true, role: true, createdAt: true, updatedAt: true } } },
    orderBy: { createdAt: 'desc' },
    take: limit,
  });
}

export async function getAllProperties(filters?: PropertyFilters) {
  return prisma.property.findMany({
    where: {
      ...(filters?.cities?.length
        ? { city: { in: filters.cities, mode: 'insensitive' } }
        : filters?.city
          ? { city: { contains: filters.city, mode: 'insensitive' } }
          : {}),
      ...(filters?.type && { type: filters.type }),
      ...(filters?.status && { status: filters.status }),
      ...(filters?.search && {
        OR: [
          { title: { contains: filters.search, mode: 'insensitive' } },
          { address: { contains: filters.search, mode: 'insensitive' } },
        ],
      }),
    },
    include: { images: { orderBy: { order: 'asc' } }, agent: { select: { id: true, name: true, email: true, role: true, createdAt: true, updatedAt: true } } },
    orderBy: { createdAt: 'desc' },
  });
}

export async function getPropertyBySlug(slug: string) {
  return prisma.property.findUnique({
    where: { slug },
    include: { images: { orderBy: { order: 'asc' } }, agent: true },
  });
}

export async function getAvailableCities() {
  const cities = await prisma.property.findMany({
    distinct: ['city'],
    select: { city: true },
    where: { status: 'ACTIVE' },
  });
  return cities.map((c) => c.city);
}

export const propertyRepository = {
  async getAll(filters?: PropertyFilters) {
    return getAllProperties(filters);
  },

  async getById(id: string) {
    return prisma.property.findUnique({
      where: { id },
      include: { images: { orderBy: { order: 'asc' } }, agent: true, inquiries: true },
    });
  },

  async getBySlug(slug: string) {
    return getPropertyBySlug(slug);
  },

  async create(data: {
    title: string;
    slug: string;
    description?: string;
    price: number;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    latitude?: number;
    longitude?: number;
    bedrooms: number;
    bathrooms: number;
    squareFeet: number;
    type: PropertyType;
    status: PropertyStatus;
    agentId: string;
    amenities?: string[];
  }) {
    return prisma.property.create({
      data,
      include: { images: true },
    });
  },

  async update(id: string, data: Partial<any>) {
    return prisma.property.update({
      where: { id },
      data,
      include: { images: { orderBy: { order: 'asc' } } },
    });
  },

  async delete(id: string) {
    return prisma.property.delete({
      where: { id },
    });
  },

  async checkSlugExists(slug: string, excludeId?: string) {
    const existing = await prisma.property.findUnique({
      where: { slug },
    });
    return existing && existing.id !== excludeId ? true : false;
  },

  async addImage(propertyId: string, data: { url: string; alt?: string; order: number }) {
    return prisma.propertyImage.create({
      data: {
        propertyId,
        url: data.url,
        alt: data.alt,
        order: data.order,
      },
    });
  },

  async deleteImage(imageId: string) {
    return prisma.propertyImage.delete({
      where: { id: imageId },
    });
  },

  async reorderImages(imageIds: string[]) {
    const updates = imageIds.map((id, index) =>
      prisma.propertyImage.update({
        where: { id },
        data: { order: index + 1 },
      }),
    );
    await Promise.all(updates);
  },
};
