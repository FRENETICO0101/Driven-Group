import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://drivengroup.com",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: "https://drivengroup.com/real-estate",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
  ];
}
