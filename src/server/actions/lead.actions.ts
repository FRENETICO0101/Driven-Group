"use server";

import { createLead } from "@/server/services/lead.service";
import type { ApiResponse, Inquiry } from "@/lib/types";

export async function createLeadAction(input: unknown): Promise<ApiResponse<Inquiry>> {
  try {
    const result = await createLead(input);
    if (!result.success) return { success: false, error: result.error };
    return { success: true, data: result.data, message: "Consulta enviada correctamente" };
  } catch {
    return { success: false, error: "Error al procesar la consulta" };
  }
}
