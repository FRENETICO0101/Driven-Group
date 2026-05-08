import { prisma } from "@/lib/prisma";
import type { Inquiry } from "@/lib/types";

export interface CreateLeadInput {
  name: string;
  email: string;
  phone: string;
  message?: string;
  propertyId: string;
  source?: Inquiry["source"];
}

export async function createLead(data: CreateLeadInput): Promise<Inquiry> {
  return prisma.inquiry.create({
    data: {
      name: data.name,
      email: data.email,
      phone: data.phone,
      message: data.message,
      propertyId: data.propertyId,
      source: data.source ?? "WEBSITE",
      status: "NEW",
    },
    include: {
      property: { include: { images: true, agent: true } },
    },
  }) as unknown as Inquiry;
}

export async function getLeadsByProperty(propertyId: string): Promise<Inquiry[]> {
  return prisma.inquiry.findMany({
    where: { propertyId },
    orderBy: { createdAt: "desc" },
  }) as unknown as Inquiry[];
}
