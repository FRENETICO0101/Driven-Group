import { prisma } from "@/lib/prisma";
import type { Property } from "@/lib/types";

const propertyInclude = {
  images: { orderBy: { order: "asc" as const } },
  agent: {
    select: { id: true, name: true, email: true, role: true, createdAt: true, updatedAt: true },
  },
};

export async function getFeaturedProperties(limit = 6): Promise<Property[]> {
  return prisma.property.findMany({
    where: { status: "ACTIVE" },
    include: propertyInclude,
    orderBy: { createdAt: "desc" },
    take: limit,
  }) as unknown as Property[];
}

export async function getPropertyBySlug(slug: string): Promise<Property | null> {
  return prisma.property.findUnique({
    where: { slug },
    include: propertyInclude,
  }) as unknown as Property | null;
}
