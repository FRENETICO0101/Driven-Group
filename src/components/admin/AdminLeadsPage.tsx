import Link from 'next/link';
import type { Inquiry } from '@/lib/types';

const statusLabels: Record<string, string> = {
  NEW: 'Nueva',
  CONTACTED: 'Contactada',
  QUALIFIED: 'Calificada',
  CONVERTED: 'Convertida',
  CLOSED: 'Cerrada',
};

export default function AdminLeadsPage({ leads }: { leads: Inquiry[] }) {
  return (
    <div className="mx-auto max-w-5xl p-6 sm:p-10">
      <div className="mb-8">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-gray">Seguimiento comercial</p>
        <h1 className="mt-2 text-2xl font-bold text-black sm:text-3xl">Consultas</h1>
        <p className="mt-2 text-sm text-dark-gray sm:text-base">Leads recibidos desde el sitio y solicitudes de información por propiedad.</p>
      </div>
      <div className="overflow-hidden rounded-xl border border-light-gray bg-white">
        {leads.length === 0 ? <p className="p-6 text-sm text-dark-gray">No hay consultas registradas.</p> : leads.map((lead) => (
          <Link key={lead.id} href={`/admin/leads/${lead.id}`} className="block border-b border-light-gray p-4 transition-colors last:border-b-0 hover:bg-light-gray/30 sm:p-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0">
                <p className="font-semibold text-black">{lead.name}</p>
                <p className="mt-1 truncate text-sm text-dark-gray">{lead.email}</p>
                <p className="mt-2 text-xs text-gray">{lead.source === 'FORM_POPUP' ? 'Formulario del sitio' : 'Consulta web'} · {new Intl.DateTimeFormat('es-MX', { dateStyle: 'medium' }).format(new Date(lead.createdAt))}</p>
              </div>
              <span className="w-fit rounded-full border border-light-gray px-3 py-1 text-xs font-semibold text-dark-gray">{statusLabels[lead.status] ?? lead.status}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
