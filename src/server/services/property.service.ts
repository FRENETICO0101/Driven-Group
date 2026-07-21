import {
  getFeaturedProperties as repoGetFeatured,
  getAllProperties as repoGetAll,
  getAvailableCities as repoGetCities,
  getPropertyBySlug as repoGetBySlug,
  type PropertyFilters,
} from "@/server/repositories/property.repository";
import { mockFeaturedProperties, mockListingProperties } from "@/lib/mock/properties";
import type { Property, PropertyType, PropertyStatus } from "@/lib/types";
import { getCatalogProperties, getCatalogPropertyBySlug } from "@/lib/property-catalog";

export async function getFeaturedProperties(limit = 6): Promise<Property[]> {
  const catalog = getCatalogProperties();
  if (catalog.length > 0) return catalog.slice(0, limit);
  try {
    const result = await repoGetFeatured(limit);
    return result && result.length > 0 ? result : mockFeaturedProperties.slice(0, limit);
  } catch (error) {
    console.error("[Property Service] Error fetching featured properties:", error);
    return mockFeaturedProperties.slice(0, limit);
  }
}

export async function getAllProperties(filters: {
  type?: string;
  city?: string;
  status?: string;
}): Promise<Property[]> {
  const catalog = getCatalogProperties();
  if (catalog.length > 0) {
    return catalog.filter((property) =>
      (!filters.type || property.type === filters.type) &&
      (!filters.city || property.city.toLowerCase() === filters.city.toLowerCase()) &&
      (!filters.status || property.status === filters.status),
    );
  }
  try {
    const cleaned: PropertyFilters = {};
    if (filters.type) cleaned.type = filters.type as PropertyType;
    if (filters.city) cleaned.city = filters.city;
    if (filters.status) cleaned.status = filters.status as PropertyStatus;
    const result = await repoGetAll(cleaned);
    return result && result.length > 0 ? result : mockListingProperties;
  } catch (error) {
    console.error("[Property Service] Error fetching properties:", error);
    return mockListingProperties;
  }
}

export async function getAvailableCities(): Promise<string[]> {
  const catalog = getCatalogProperties();
  if (catalog.length > 0) return [...new Set(catalog.map((property) => property.city))];
  try {
    const result = await repoGetCities();
    if (result && result.length > 0) return result;
    return [...new Set(mockListingProperties.map(p => p.city))];
  } catch (error) {
    console.error("[Property Service] Error fetching cities:", error);
    return [...new Set(mockListingProperties.map(p => p.city))];
  }
}

export async function getPropertyBySlug(slug: string): Promise<Property | null> {
  if (!slug || typeof slug !== "string") return null;
  const catalogProperty = getCatalogPropertyBySlug(slug);
  if (catalogProperty) return catalogProperty;
  try {
    return await repoGetBySlug(slug.toLowerCase().trim());
  } catch (error) {
    console.error("[Property Service] Error fetching property by slug:", error);
    return null;
  }
}
