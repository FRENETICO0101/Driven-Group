import { MetadataRoute } from "next";
import { getCatalogProperties } from "@/lib/property-catalog";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://drivengroup.com";
  const properties = getCatalogProperties();

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/real-estate`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    ...properties.map((property) => ({
      url: `${baseUrl}/real-estate/${property.slug}`,
      lastModified: property.updatedAt,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];
}
