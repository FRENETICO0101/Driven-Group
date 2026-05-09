"use server";

import {
  getFeaturedProperties,
  getAllProperties,
  getAvailableCities,
  getPropertyBySlug,
} from "@/server/services/property.service";
import type { ApiResponse, Property } from "@/lib/types";

export async function getFeaturedPropertiesAction(limit = 6): Promise<ApiResponse<Property[]>> {
  try {
    const data = await getFeaturedProperties(limit);
    return { success: true, data };
  } catch {
    return { success: false, error: "Error al obtener propiedades destacadas" };
  }
}

export async function getPropertiesAction(filters: {
  type?: string;
  city?: string;
  status?: string;
}): Promise<ApiResponse<Property[]>> {
  try {
    const data = await getAllProperties(filters);
    return { success: true, data };
  } catch {
    return { success: false, error: "Error al obtener propiedades" };
  }
}

export async function getAvailableCitiesAction(): Promise<ApiResponse<string[]>> {
  try {
    const data = await getAvailableCities();
    return { success: true, data };
  } catch {
    return { success: false, error: "Error al obtener ciudades" };
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
