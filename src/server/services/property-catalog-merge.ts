import type { Property } from "@/lib/types";
import type { CatalogProperty } from "@/lib/property-catalog";

export type PublicFilters = { type?: string; city?: string; status?: string };

export function mergeCatalogProperty(catalogProperty: CatalogProperty, override: Property): CatalogProperty {
  return {
    ...catalogProperty,
    ...override,
    images: catalogProperty.images.length > 0 ? catalogProperty.images : override.images,
    resources: catalogProperty.resources,
    seo: catalogProperty.seo,
  };
}

function matchesFilters(property: Property, filters: PublicFilters, includeInactive: boolean) {
  if (!includeInactive && property.status === "INACTIVE") return false;
  return (
    (!filters.type || property.type === filters.type) &&
    (!filters.city || property.city.toLowerCase() === filters.city.toLowerCase()) &&
    (!filters.status || property.status === filters.status)
  );
}

export function mergePropertySources(
  catalog: CatalogProperty[],
  databaseProperties: Property[],
  filters: PublicFilters = {},
  includeInactive = false,
  includeDatabaseOnly = true,
): Property[] {
  const databaseBySlug = new Map(databaseProperties.map((property) => [property.slug, property]));
  const catalogSlugs = new Set(catalog.map((property) => property.slug));
  const mergedCatalog = catalog.map((property) => {
    const override = databaseBySlug.get(property.slug);
    return override ? mergeCatalogProperty(property, override) : property;
  });
  const databaseOnly = includeDatabaseOnly
    ? databaseProperties.filter((property) => !catalogSlugs.has(property.slug))
    : [];
  return [...mergedCatalog, ...databaseOnly].filter((property) => matchesFilters(property, filters, includeInactive));
}
