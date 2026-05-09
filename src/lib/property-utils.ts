import type { Property } from "@/lib/types";

export function formatPropertyPrice(price: number): string {
  if (price >= 1_000_000) {
    const value = price / 1_000_000;
    return `$${value % 1 === 0 ? value.toFixed(0) : value.toFixed(1)}M`;
  }
  return `$${price.toLocaleString("es-AR")}`;
}

export function formatPropertySubtitle(property: Property): string {
  const parts: string[] = [];
  if (property.bedrooms > 0) parts.push(`${property.bedrooms} amb`);
  if (property.squareFeet > 0) parts.push(`${property.squareFeet} m²`);
  if (property.city) parts.push(property.city);
  return parts.join(" • ");
}

const TYPE_BADGE: Record<Property["type"], { label: string; featured: boolean }> = {
  RESIDENTIAL: { label: "Destacado", featured: true },
  COMMERCIAL:  { label: "Oportunidad", featured: false },
  LAND:        { label: "Terreno", featured: false },
  MIXED_USE:   { label: "Colección Exclusiva", featured: false },
};

export function getPropertyBadge(type: Property["type"]) {
  return TYPE_BADGE[type] ?? { label: "Destacado", featured: false };
}
