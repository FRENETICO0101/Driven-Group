import { createLead as repoCreateLead } from "@/server/repositories/lead.repository";
import { InquiryFormSchema } from "@/lib/validation";
import type { Inquiry } from "@/lib/types";

export type CreateLeadResult =
  | { success: true; data: Inquiry }
  | { success: false; error: string };

export async function createLead(input: unknown): Promise<CreateLeadResult> {
  const parsed = InquiryFormSchema.safeParse(input);

  if (!parsed.success) {
    const message = parsed.error.issues.map((e: { message: string }) => e.message).join(", ");
    return { success: false, error: message };
  }

  const lead = await repoCreateLead(parsed.data);
  return { success: true, data: lead };
}
