import { createInquiry } from "@/server/repositories/inquiry.repository";
import { InquiryFormSchema } from "@/lib/validation";
import type { Inquiry } from "@/lib/types";
import { notifyNewLead } from '@/server/services/lead-notification.service';

export type CreateLeadResult =
  | { success: true; data: Inquiry }
  | { success: false; error: string };

export async function createLead(input: unknown): Promise<CreateLeadResult> {
  const parsed = InquiryFormSchema.safeParse(input);

  if (!parsed.success) {
    const message = parsed.error.issues.map((e: { message: string }) => e.message).join(", ");
    return { success: false, error: message };
  }

  const lead = await createInquiry(parsed.data);
  await notifyNewLead(lead);
  return { success: true, data: lead };
}
