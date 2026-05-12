import { prisma } from "@/lib/prisma";
import type { Property, PropertyType, PropertyStatus } from "@/lib/types";
import { isConnectionError, logError } from "@/lib/errors";
import { mockFeaturedProperties, mockListingProperties } from "@/lib/mock/properties";
import { mockCities } from "@/lib/mock/cities";

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

/**
 * Get featured properties with graceful fallback.
 * Returns mock data if database is unavailable.
 */
export async function getFeaturedProperties(limit = 6): Promise<Property[]> {
  try {
    return await prisma.property.findMany({
      where: { status: "ACTIVE" },
      include: propertyInclude,
      orderBy: { createdAt: "desc" },
      take: limit,
    }).then((props) => props as unknown as Property[]);
  } catch (error) {
    if (isConnectionError(error)) {
      logError("getFeaturedProperties", error, { limit });
      return mockFeaturedProperties.slice(0, limit);
    }
    throw error;
  }
}

/**
 * Get all properties with filters and graceful fallback.
 * Returns mock data if database is unavailable.
 */
export async function getAllProperties(filters: PropertyFilters = {}): Promise<Property[]> {
  try {
    const where: Record<string, unknown> = {};
    if (filters.type) where.type = filters.type;
    if (filters.city) where.city = { contains: filters.city, mode: "insensitive" };
    if (filters.status) where.status = filters.status;
    else where.status = { not: "INACTIVE" };

    return await prisma.property.findMany({
      where,
      include: propertyInclude,
      orderBy: { createdAt: "desc" },
    }).then((props) => props as unknown as Property[]);
  } catch (error) {
    if (isConnectionError(error)) {
      logError("getAllProperties", error, { filters });
      // Simple filter logic on mock data
      let filtered = [...mockListingProperties];
      if (filters.type) filtered = filtered.filter((p) => p.type === filters.type);
      if (filters.city)
        filtered = filtered.filter((p) =>
          p.city.toLowerCase().includes(filters.city!.toLowerCase())
        );
      if (filters.status) filtered = filtered.filter((p) => p.status === filters.status);
      return filtered;
    }
    throw error;
  }
}

/**
 * Get available cities for filters with graceful fallback.
 * Returns mock cities if database is unavailable.
 */
export async function getAvailableCities(): Promise<string[]> {
  try {
    const results = await prisma.property.findMany({
      where: { status: { not: "INACTIVE" } },
      select: { city: true },
      distinct: ["city"],
      orderBy: { city: "asc" },
    });
    return results.map((r) => r.city);
  } catch (error) {
    if (isConnectionError(error)) {
      logError("getAvailableCities", error);
      return mockCities;
    }
    throw error;
  }
}

/**
 * Get property by slug.
 * Returns null if not found (expected behavior).
 * Throws on database errors to allow proper 404 handling.
 * Does not use fallback for detail pages - prefers to show 404.
 */
export async function getPropertyBySlug(slug: string): Promise<Property | null> {
  try {
    return await prisma.property
      .findUnique({
        where: { slug },
        include: propertyInclude,
      })
      .then((prop) => (prop ? (prop as unknown as Property) : null));
  } catch (error) {
    if (isConnectionError(error)) {
      logError("getPropertyBySlug", error, { slug });
      // For detail pages, return null instead of fallback
      // This allows notFound() to handle gracefully
      return null;
    }
    throw error;
  }
}
