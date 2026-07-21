import { prisma } from "@/lib/prisma";
import type { Inquiry, LeadSource, InquiryStatus } from "@/lib/types";

export interface CreateInquiryInput {
  name: string;
  email: string;
  phone: string;
  message?: string;
  propertyId?: string | null;
  source?: LeadSource;
  status?: InquiryStatus;
}

export async function createInquiry(data: CreateInquiryInput): Promise<Inquiry> {
  return prisma.inquiry.create({
    data: {
      name: data.name,
      email: data.email,
      phone: data.phone,
      message: data.message,
      propertyId: data.propertyId || null,
      source: data.source ?? "WEBSITE",
      status: data.status ?? "NEW",
    },
    include: {
      property: { include: { images: true, agent: true } },
      agent: true,
    },
  }) as unknown as Inquiry;
}

export async function getInquiryById(id: string): Promise<Inquiry | null> {
  return prisma.inquiry.findUnique({
    where: { id },
    include: {
      property: { include: { images: true, agent: true } },
      agent: true,
    },
  }) as unknown as Inquiry | null;
}

export async function getInquiries(where?: Record<string, unknown>): Promise<Inquiry[]> {
  return prisma.inquiry.findMany({
    where,
    orderBy: { createdAt: "desc" },
    include: {
      property: { include: { images: true, agent: true } },
      agent: true,
    },
  }) as unknown as Inquiry[];
}

export async function getInquiriesByProperty(propertyId: string): Promise<Inquiry[]> {
  return prisma.inquiry.findMany({
    where: { propertyId },
    orderBy: { createdAt: "desc" },
    include: {
      property: { include: { images: true, agent: true } },
      agent: true,
    },
  }) as unknown as Inquiry[];
}
