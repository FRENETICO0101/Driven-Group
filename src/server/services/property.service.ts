import {
  getFeaturedProperties as repoGetFeatured,
  getAllProperties as repoGetAll,
  getAvailableCities as repoGetCities,
  getPropertyBySlug as repoGetBySlug,
  type PropertyFilters,
} from "@/server/repositories/property.repository";
import type { Property, PropertyType, PropertyStatus } from "@/lib/types";

export async function getFeaturedProperties(limit = 6): Promise<Property[]> {
  return repoGetFeatured(limit);
}

export async function getAllProperties(filters: {
  type?: string;
  city?: string;
  status?: string;
}): Promise<Property[]> {
  const cleaned: PropertyFilters = {};
  if (filters.type) cleaned.type = filters.type as PropertyType;
  if (filters.city) cleaned.city = filters.city;
  if (filters.status) cleaned.status = filters.status as PropertyStatus;
  return repoGetAll(cleaned);
}

export async function getAvailableCities(): Promise<string[]> {
  return repoGetCities();
}

export async function getPropertyBySlug(slug: string): Promise<Property | null> {
  if (!slug || typeof slug !== "string") return null;
  return repoGetBySlug(slug.toLowerCase().trim());
}
