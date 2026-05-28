import {
  getFeaturedProperties as repoGetFeatured,
  getAllProperties as repoGetAll,
  getAvailableCities as repoGetCities,
  getPropertyBySlug as repoGetBySlug,
  type PropertyFilters,
} from "@/server/repositories/property.repository";
import type { Property, PropertyType, PropertyStatus } from "@/lib/types";

export async function getFeaturedProperties(limit = 6): Promise<Property[]> {
  try {
    return await repoGetFeatured(limit);
  } catch (error) {
    console.error("[Property Service] Error fetching featured properties:", error);
    return [];
  }
}

export async function getAllProperties(filters: {
  type?: string;
  city?: string;
  status?: string;
}): Promise<Property[]> {
  try {
    const cleaned: PropertyFilters = {};
    if (filters.type) cleaned.type = filters.type as PropertyType;
    if (filters.city) cleaned.city = filters.city;
    if (filters.status) cleaned.status = filters.status as PropertyStatus;
    return await repoGetAll(cleaned);
  } catch (error) {
    console.error("[Property Service] Error fetching properties:", error);
    return [];
  }
}

export async function getAvailableCities(): Promise<string[]> {
  try {
    return await repoGetCities();
  } catch (error) {
    console.error("[Property Service] Error fetching cities:", error);
    return [];
  }
}

export async function getPropertyBySlug(slug: string): Promise<Property | null> {
  if (!slug || typeof slug !== "string") return null;
  try {
    return await repoGetBySlug(slug.toLowerCase().trim());
  } catch (error) {
    console.error("[Property Service] Error fetching property by slug:", error);
    return null;
  }
}
