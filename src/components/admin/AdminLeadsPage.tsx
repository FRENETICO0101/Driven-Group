import Link from 'next/link';
import type { Inquiry } from '@/lib/types';

export default function AdminLeadsPage({ leads }: { leads: Inquiry[] }) {
  return (
    <div className="p-6 sm:p-10">
      <div className="mb-8"><h1 className="text-2xl font-bold">Consultas</h1><p className="text-gray-600 mt-2">Leads recibidos desde el sitio.</p></div>
      <div className="border border-light-gray rounded-xl overflow-hidden bg-white">
        {leads.length === 0 ? <p className="p-6 text-dark-gray">No hay consultas registradas.</p> : leads.map((lead) => (
          <Link key={lead.id} href={`/admin/leads/${lead.id}`} className="block p-5 border-b border-light-gray last:border-b-0 hover:bg-light-gray/20"><div className="flex justify-between gap-4"><div><p className="font-semibold text-black">{lead.name}</p><p className="text-sm text-dark-gray">{lead.email}</p></div><span className="text-sm text-dark-gray">{lead.status}</span></div></Link>
        ))}
      </div>
    </div>
  );
}
