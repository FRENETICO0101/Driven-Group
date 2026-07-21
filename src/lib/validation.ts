/**
 * Driven Group - Zod Validation Schemas
 * Form validation and API request/response schemas
 */

import { z } from "zod";

// ============================================
// PROPERTY SCHEMAS
// ============================================

export const PropertyFormSchema = z.object({
  title: z.string().min(5, "Título debe tener al menos 5 caracteres"),
  description: z.string().optional(),
  price: z.number().positive("El precio debe ser positivo"),
  address: z.string().min(5, "Dirección inválida"),
  city: z.string().min(2, "Ciudad inválida"),
  state: z.string().min(2, "Estado inválido"),
  zipCode: z.string().min(3, "Código postal inválido"),
  bedrooms: z.number().int().positive("Bedrooms debe ser positivo"),
  bathrooms: z.number().positive("Bathrooms debe ser positivo"),
  squareFeet: z.number().positive("Square feet debe ser positivo"),
  lotSize: z.number().positive().optional(),
  yearBuilt: z.number().int().positive().optional(),
  type: z.enum(["RESIDENTIAL", "COMMERCIAL", "LAND", "MIXED_USE"]),
  amenities: z.array(z.string()).default([]),
  features: z.string().optional(),
});

export type PropertyFormInput = z.infer<typeof PropertyFormSchema>;

// ============================================
// INQUIRY / LEAD SCHEMAS
// ============================================

export const InquiryFormSchema = z.object({
  name: z.string().min(2, "Nombre inválido"),
  email: z.string().email("Email inválido"),
  phone: z.string().min(7, "Teléfono inválido"),
  message: z.string().optional(),
  propertyId: z.string().uuid("Property ID inválido").optional(),
});

export type InquiryFormInput = z.infer<typeof InquiryFormSchema>;

// ============================================
// SEARCH & FILTER SCHEMAS
// ============================================

export const PropertyFilterSchema = z.object({
  city: z.string().optional(),
  minPrice: z.number().positive().optional(),
  maxPrice: z.number().positive().optional(),
  bedrooms: z.number().int().positive().optional(),
  type: z.enum(["RESIDENTIAL", "COMMERCIAL", "LAND", "MIXED_USE"]).optional(),
  page: z.number().int().positive().default(1),
  pageSize: z.number().int().positive().max(100).default(12),
});

export type PropertyFilterInput = z.infer<typeof PropertyFilterSchema>;

// ============================================
// API RESPONSE SCHEMAS
// ============================================

export const ApiResponseSchema = z.object({
  success: z.boolean(),
  data: z.any().optional(),
  error: z.string().optional(),
  message: z.string().optional(),
});

export type ApiResponseType = z.infer<typeof ApiResponseSchema>;
