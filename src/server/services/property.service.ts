import {
  getFeaturedProperties as repoGetFeatured,
  getAllProperties as repoGetAll,
  getPropertyBySlug as repoGetBySlug,
  type PropertyFilters,
} from "@/server/repositories/property.repository";
import { mockFeaturedProperties, mockListingProperties } from "@/lib/mock/properties";
import type { Property, PropertyType, PropertyStatus } from "@/lib/types";
import { getCatalogProperties, getCatalogPropertyBySlug } from "@/lib/property-catalog";
import { mergeCatalogProperty, mergePropertySources, type PublicFilters } from "@/server/services/property-catalog-merge";

const localDatabaseUrl = /(?:localhost|127\.0\.0\.1)/i.test(process.env.DATABASE_URL ?? "");
const useLocalDatabase = process.env.ENABLE_LOCAL_DATABASE === "true";

function shouldReadDatabaseOverrides() {
  return !localDatabaseUrl || useLocalDatabase;
}

async function getMergedProperties(
  filters: PublicFilters = {},
  includeInactive = false,
  includeDatabaseOnly = false,
): Promise<Property[]> {
  const catalog = getCatalogProperties();
  if (!shouldReadDatabaseOverrides()) {
    return mergePropertySources(catalog, [], filters, includeInactive, includeDatabaseOnly);
  }

  try {
    const databaseProperties = await repoGetAll();
    return mergePropertySources(catalog, databaseProperties, filters, includeInactive, includeDatabaseOnly);
  } catch (error) {
    console.error("[Property Service] Unable to load database overrides:", error);
    return mergePropertySources(catalog, [], filters, includeInactive, includeDatabaseOnly);
  }
}

export async function getFeaturedProperties(limit = 6): Promise<Property[]> {
  const properties = await getMergedProperties({ status: "ACTIVE" });
  if (properties.length > 0 || getCatalogProperties().length > 0) return properties.slice(0, limit);
  try {
    const result = await repoGetFeatured(limit);
    return result && result.length > 0 ? result : mockFeaturedProperties.slice(0, limit);
  } catch (error) {
    console.error("[Property Service] Error fetching featured properties:", error);
    return mockFeaturedProperties.slice(0, limit);
  }
}

export async function getAllProperties(filters: PublicFilters): Promise<Property[]> {
  const properties = await getMergedProperties(filters);
  if (properties.length > 0 || getCatalogProperties().length > 0) return properties;
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

export async function getManagedProperties(): Promise<Property[]> {
  return getMergedProperties({}, true, true);
}

export async function getAvailableCities(): Promise<string[]> {
  const properties = await getMergedProperties({ status: "ACTIVE" });
  if (properties.length > 0) return [...new Set(properties.map((property) => property.city))];
  return [...new Set(mockListingProperties.map((property) => property.city))];
}

export async function getPropertyBySlug(slug: string): Promise<Property | null> {
  if (!slug || typeof slug !== "string") return null;
  const normalizedSlug = slug.toLowerCase().trim();
  const catalogProperty = getCatalogPropertyBySlug(normalizedSlug);

  if (!catalogProperty) return null;

  if (!shouldReadDatabaseOverrides()) {
    return catalogProperty?.status === "INACTIVE" ? null : catalogProperty;
  }

  try {
    const databaseProperty = await repoGetBySlug(normalizedSlug);
    if (catalogProperty && databaseProperty) return databaseProperty.status === "INACTIVE" ? null : mergeCatalogProperty(catalogProperty, databaseProperty);
    if (databaseProperty) return databaseProperty.status === "INACTIVE" ? null : databaseProperty;
  } catch (error) {
    console.error("[Property Service] Unable to load property override:", error);
  }
  return catalogProperty?.status === "INACTIVE" ? null : catalogProperty;
}
