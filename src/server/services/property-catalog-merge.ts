import type { Property } from "@/lib/types";
import type { CatalogProperty } from "@/lib/property-catalog";

export type PublicFilters = { type?: string; city?: string; cities?: readonly string[]; status?: string };

export function mergeCatalogProperty(catalogProperty: CatalogProperty, override: Property): CatalogProperty {
  return {
    ...catalogProperty,
    ...override,
    // Admin-managed images take precedence, so gallery changes made in the
    // dashboard are reflected immediately for catalog-backed properties too.
    images: override.images.length > 0 ? override.images : catalogProperty.images,
    resources: catalogProperty.resources,
    seo: catalogProperty.seo,
  };
}

function matchesFilters(property: Property, filters: PublicFilters, includeInactive: boolean) {
  if (!includeInactive && property.status === "INACTIVE") return false;
  return (
    (!filters.type || property.type === filters.type) &&
    (!filters.city || property.city.toLowerCase() === filters.city.toLowerCase()) &&
    (!filters.cities?.length || filters.cities.some((city) => property.city.toLowerCase() === city.toLowerCase())) &&
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
