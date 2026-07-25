import type { Inquiry } from '@/lib/types';
import { LeadStatusControl } from '@/components/admin/LeadStatusControl';
import { LeadNotesEditor } from '@/components/admin/LeadNotesEditor';

export default function AdminLeadDetailPage({ lead }: { lead: Inquiry }) {
  return (
    <div className="max-w-3xl p-6 sm:p-10">
      <p className="mb-2 text-sm text-dark-gray">Consulta</p>
      <h1 className="text-2xl font-bold">{lead.name}</h1>
      <div className="mt-8 space-y-5 rounded-xl border border-light-gray bg-white p-6">
        <div>
          <p className="text-xs uppercase text-gray">Correo electrónico</p>
          <a className="text-black underline-offset-4 hover:underline" href={`mailto:${lead.email}`}>{lead.email}</a>
        </div>
        <div>
          <p className="text-xs uppercase text-gray">Teléfono</p>
          <a className="text-black underline-offset-4 hover:underline" href={`tel:${lead.phone}`}>{lead.phone}</a>
        </div>
        <LeadStatusControl inquiryId={lead.id} status={lead.status} />
        <LeadNotesEditor inquiryId={lead.id} initialNotes={lead.notes} />
        {lead.message && (
          <div>
            <p className="text-xs uppercase text-gray">Mensaje</p>
            <p className="whitespace-pre-wrap text-dark-gray">{lead.message}</p>
          </div>
        )}
      </div>
    </div>
  );
}
