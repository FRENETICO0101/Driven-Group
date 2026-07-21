"use server";

import { z } from "zod";
import { createInquiry } from "@/server/repositories/inquiry.repository";
import type { ApiResponse } from "@/lib/types";

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  subject: z.enum(["real-estate", "business", "academy", "general"]),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export async function sendContactAction(
  data: ContactFormData
): Promise<ApiResponse<{ inquiryId: string }>> {
  try {
    // Validate input
    const validatedData = contactFormSchema.parse(data);

    // Map subject to source for CRM tracking
    const sourceMap: Record<string, "WEBSITE" | "PHONE" | "WHATSAPP" | "FORM_POPUP" | "EMAIL"> = {
      "real-estate": "FORM_POPUP",
      "business": "FORM_POPUP",
      "academy": "FORM_POPUP",
      "general": "FORM_POPUP",
    };

    // Create inquiry without propertyId (contact form inquiry)
    const inquiry = await createInquiry({
      name: validatedData.name,
      email: validatedData.email,
      phone: validatedData.phone || "",
      message: validatedData.message,
      source: sourceMap[validatedData.subject] || "FORM_POPUP",
      propertyId: null,
      status: "NEW",
    });

    // TODO: Send email notification via Resend when configured
    // For now, just log that we would send an email
    console.log(`[Contact Form] New inquiry from ${validatedData.name} (${validatedData.email})`);

    return {
      success: true,
      data: { inquiryId: inquiry.id },
      message: "Thank you for your inquiry. We'll be in touch soon.",
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: error.issues[0]?.message || "Validation failed",
      };
    }

    console.error("[sendContactAction] Error:", error);
    return {
      success: false,
      error: "Failed to send message. Please try again later.",
    };
  }
}
