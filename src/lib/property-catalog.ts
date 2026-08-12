import catalog from "@/lib/generated/property-catalog.json";
import type { Property, PropertyStatus } from "@/lib/types";

const defaultAgent = {
  id: "driven-group",
  name: "Driven Group",
  email: "administracion@drivengroup.com.mx",
  role: "AGENT" as const,
  createdAt: new Date(0),
  updatedAt: new Date(0),
};

type CatalogRecord = (typeof catalog)[number];

export type CatalogProperty = Property & {
  resources: CatalogRecord["resources"];
  seo: CatalogRecord["seo"];
  assetBase: string;
  assetFiles: string[];
};

function hydrateProperty(record: CatalogRecord): CatalogProperty {
  return {
    ...record,
    status: record.status as PropertyStatus,
    type: record.type as Property["type"],
    images: record.images.map((image) => ({ ...image, createdAt: new Date(0) })),
    agent: defaultAgent,
    agentId: defaultAgent.id,
    createdAt: new Date(0),
    updatedAt: new Date(0),
  };
}

export function getCatalogProperties(): CatalogProperty[] {
  return catalog.map(hydrateProperty);
}

export function getCatalogPropertyBySlug(slug: string) {
  return catalog.find((property) => property.slug === slug.toLowerCase().trim())
    ? hydrateProperty(catalog.find((property) => property.slug === slug.toLowerCase().trim())!)
    : null;
}

export function getCatalogAssetUrl(slug: string, relativePath: string) {
  const property = catalog.find((candidate) => candidate.slug === slug.toLowerCase().trim());
  const normalizedPath = relativePath.replace(/\\/g, "/").replace(/^\/+/, "");
  if (!property || !normalizedPath || normalizedPath.includes("..")) return null;
  const requestedPath = property.assetFiles.includes(normalizedPath)
    ? normalizedPath
    : normalizedPath.replace(/\.(avif|jpe?g|png)$/i, ".webp");
  if (!property.assetFiles.includes(requestedPath)) return null;
  return `/property-assets/${property.assetBase}/${requestedPath.split("/").map(encodeURIComponent).join("/")}`;
}
