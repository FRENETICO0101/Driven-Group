import type { Inquiry } from '@/lib/types';

export default function AdminLeadDetailPage({ lead }: { lead: Inquiry }) {
  return (
    <div className="p-6 sm:p-10 max-w-3xl">
      <p className="text-sm text-dark-gray mb-2">Consulta</p>
      <h1 className="text-2xl font-bold">{lead.name}</h1>
      <div className="mt-8 space-y-5 border border-light-gray rounded-xl p-6 bg-white">
        <div><p className="text-xs uppercase text-gray">Email</p><a className="text-black" href={`mailto:${lead.email}`}>{lead.email}</a></div>
        <div><p className="text-xs uppercase text-gray">Teléfono</p><p>{lead.phone}</p></div>
        <div><p className="text-xs uppercase text-gray">Estado</p><p>{lead.status}</p></div>
        {lead.message && <div><p className="text-xs uppercase text-gray">Mensaje</p><p className="whitespace-pre-wrap text-dark-gray">{lead.message}</p></div>}
      </div>
    </div>
  );
}
