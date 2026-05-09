import { prisma } from "@/lib/prisma";
import type { Property, PropertyType, PropertyStatus } from "@/lib/types";

const propertyInclude = {
  images: { orderBy: { order: "asc" as const } },
  agent: {
    select: { id: true, name: true, email: true, role: true, createdAt: true, updatedAt: true },
  },
};

export interface PropertyFilters {
  type?: PropertyType;
  city?: string;
  status?: PropertyStatus;
}

export async function getFeaturedProperties(limit = 6): Promise<Property[]> {
  return prisma.property.findMany({
    where: { status: "ACTIVE" },
    include: propertyInclude,
    orderBy: { createdAt: "desc" },
    take: limit,
  }) as unknown as Property[];
}

export async function getAllProperties(filters: PropertyFilters = {}): Promise<Property[]> {
  const where: Record<string, unknown> = {};
  if (filters.type) where.type = filters.type;
  if (filters.city) where.city = { contains: filters.city, mode: "insensitive" };
  if (filters.status) where.status = filters.status;
  else where.status = { not: "INACTIVE" };

  return prisma.property.findMany({
    where,
    include: propertyInclude,
    orderBy: { createdAt: "desc" },
  }) as unknown as Property[];
}

export async function getAvailableCities(): Promise<string[]> {
  const results = await prisma.property.findMany({
    where: { status: { not: "INACTIVE" } },
    select: { city: true },
    distinct: ["city"],
    orderBy: { city: "asc" },
  });
  return results.map((r) => r.city);
}

export async function getPropertyBySlug(slug: string): Promise<Property | null> {
  return prisma.property.findUnique({
    where: { slug },
    include: propertyInclude,
  }) as unknown as Property | null;
}
