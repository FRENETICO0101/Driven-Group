"use server";

import { getFeaturedProperties, getPropertyBySlug } from "@/server/services/property.service";
import type { ApiResponse, Property } from "@/lib/types";

export async function getFeaturedPropertiesAction(limit = 6): Promise<ApiResponse<Property[]>> {
  try {
    const data = await getFeaturedProperties(limit);
    return { success: true, data };
  } catch {
    return { success: false, error: "Error al obtener propiedades destacadas" };
  }
}

export async function getPropertyBySlugAction(slug: string): Promise<ApiResponse<Property>> {
  try {
    const data = await getPropertyBySlug(slug);
    if (!data) return { success: false, error: "Propiedad no encontrada" };
    return { success: true, data };
  } catch {
    return { success: false, error: "Error al obtener la propiedad" };
  }
}
