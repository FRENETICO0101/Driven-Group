'use server';

import { z } from 'zod';
import { auth } from '@/lib/auth';
import { updateInquiryNotes, updateInquiryStatus } from '@/server/repositories/inquiry.repository';

const inquiryStatusSchema = z.enum(['NEW', 'CONTACTED', 'QUALIFIED', 'NEGOTIATING', 'CLOSED', 'LOST']);
const inquiryNotesSchema = z.string().trim().max(5000, 'Las notas no pueden exceder 5,000 caracteres');

export async function updateInquiryStatusAction(id: string, status: string) {
  const session = await auth();
  if (session?.user?.role !== 'ADMIN') {
    return { success: false, error: 'No autorizado' };
  }

  const parsedStatus = inquiryStatusSchema.safeParse(status);
  if (!parsedStatus.success) {
    return { success: false, error: 'Estado inválido' };
  }

  try {
    const inquiry = await updateInquiryStatus(id, parsedStatus.data);
    return { success: true, data: inquiry };
  } catch (error) {
    console.error('Error updating inquiry status:', error);
    return { success: false, error: 'No se pudo actualizar la consulta' };
  }
}

export async function updateInquiryNotesAction(id: string, notes: string) {
  const session = await auth();
  if (session?.user?.role !== 'ADMIN') {
    return { success: false, error: 'No autorizado' };
  }

  const parsedNotes = inquiryNotesSchema.safeParse(notes);
  if (!parsedNotes.success) {
    return { success: false, error: parsedNotes.error.issues[0]?.message ?? 'Notas inválidas' };
  }

  try {
    const inquiry = await updateInquiryNotes(id, parsedNotes.data || null);
    return { success: true, data: inquiry };
  } catch (error) {
    console.error('Error updating inquiry notes:', error);
    return { success: false, error: 'No se pudieron guardar las notas' };
  }
}
