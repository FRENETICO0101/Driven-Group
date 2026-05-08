import { getFeaturedProperties as repoGetFeatured, getPropertyBySlug as repoGetBySlug } from "@/server/repositories/property.repository";
import type { Property } from "@/lib/types";

export async function getFeaturedProperties(limit = 6): Promise<Property[]> {
  return repoGetFeatured(limit);
}

export async function getPropertyBySlug(slug: string): Promise<Property | null> {
  if (!slug || typeof slug !== "string") return null;
  return repoGetBySlug(slug.toLowerCase().trim());
}
