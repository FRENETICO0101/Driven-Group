/**
 * Driven Group - Real Estate Platform
 * TypeScript Types & Interfaces
 */

// ============================================
// USER & AUTHENTICATION TYPES
// ============================================

export type UserRole = "VIEWER" | "AGENT" | "ADMIN";

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

// ============================================
// PROPERTY TYPES
// ============================================

export type PropertyType = "RESIDENTIAL" | "COMMERCIAL" | "LAND" | "MIXED_USE";
export type PropertyStatus = "ACTIVE" | "SOLD" | "PENDING" | "INACTIVE";

export interface PropertyImage {
  id: string;
  url: string;
  alt?: string;
  order: number;
  createdAt: Date;
}

export interface Property {
  id: string;
  title: string;
  slug: string;
  description?: string;
  price: number;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  latitude?: number;
  longitude?: number;
  district?: string;
  bedrooms: number;
  bathrooms: number;
  squareFeet: number;
  lotSize?: number;
  yearBuilt?: number;
  type: PropertyType;
  status: PropertyStatus;
  amenities: string[];
  features?: string;
  images: PropertyImage[];
  agent: User;
  agentId: string;
  createdAt: Date;
  updatedAt: Date;
}

// ============================================
// INQUIRY / LEAD TYPES
// ============================================

export type LeadSource = "WEBSITE" | "PHONE" | "WHATSAPP" | "FORM_POPUP" | "EMAIL";
export type InquiryStatus = "NEW" | "CONTACTED" | "QUALIFIED" | "NEGOTIATING" | "CLOSED" | "LOST";

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  message?: string;
  source: LeadSource;
  property: Property;
  propertyId: string;
  agent?: User;
  agentId?: string;
  status: InquiryStatus;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

// ============================================
// CRM INTERACTION TYPES
// ============================================

export type InteractionType = "CALL" | "EMAIL" | "WHATSAPP" | "MEETING" | "PROPOSAL";

export interface CRMInteraction {
  id: string;
  inquiry: Inquiry;
  inquiryId: string;
  type: InteractionType;
  content: string;
  agent: User;
  agentId: string;
  createdAt: Date;
}

// ============================================
// API RESPONSE TYPES
// ============================================

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T = any> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// ============================================
// FORM TYPES
// ============================================

export interface PropertyFormData {
  title: string;
  description?: string;
  price: number;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  bedrooms: number;
  bathrooms: number;
  squareFeet: number;
  lotSize?: number;
  yearBuilt?: number;
  type: PropertyType;
  amenities: string[];
  features?: string;
}

export interface InquiryFormData {
  name: string;
  email: string;
  phone: string;
  message?: string;
  propertyId: string;
}
