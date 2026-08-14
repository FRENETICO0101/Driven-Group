import type { Inquiry } from '@/lib/types';

const escapeHtml = (value: string | null | undefined) => (value || '—')
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;');

export async function notifyNewLead(lead: Inquiry) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_NOTIFICATION_EMAIL || 'administracion@drivengroup.com.mx';
  const from = process.env.LEAD_FROM_EMAIL;
  if (!apiKey || !from) {
    console.warn('[Lead notification] Resend is not configured; lead was saved without email notification.');
    return;
  }

  const property = lead.property?.title || 'Consulta general';
  const html = `<h2>Nuevo lead recibido</h2><p><strong>Nombre:</strong> ${escapeHtml(lead.name)}</p><p><strong>Correo:</strong> ${escapeHtml(lead.email)}</p><p><strong>Teléfono:</strong> ${escapeHtml(lead.phone)}</p><p><strong>Propiedad:</strong> ${escapeHtml(property)}</p><p><strong>Mensaje:</strong><br>${escapeHtml(lead.message).replace(/\n/g, '<br>')}</p>`;
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from, to: [to], reply_to: lead.email, subject: `Nuevo lead: ${lead.name}`, html }),
  });
  if (!response.ok) console.error('[Lead notification] Resend request failed:', await response.text());
}
