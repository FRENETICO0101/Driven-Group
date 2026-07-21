import Link from 'next/link';
import type { Property } from '@/lib/types';

export default function AdminPropertiesPage({ properties }: { properties: Property[] }) {
  return (
    <div className="p-6 sm:p-10">
      <div className="flex items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold">Propiedades</h1>
          <p className="text-gray-600 mt-2">Gestiona las propiedades registradas en el CMS.</p>
        </div>
        <Link href="/admin/properties/new" className="bg-black text-white px-4 py-2 rounded-lg text-sm font-semibold">Nueva propiedad</Link>
      </div>
      <div className="border border-light-gray rounded-xl overflow-hidden bg-white">
        {properties.length === 0 ? <p className="p-6 text-dark-gray">No hay propiedades registradas.</p> : properties.map((property) => (
          <Link key={property.id} href={`/admin/properties/${property.id}`} className="block p-5 border-b border-light-gray last:border-b-0 hover:bg-light-gray/20">
            <div className="flex items-center justify-between gap-4"><div><p className="font-semibold text-black">{property.title}</p><p className="text-sm text-dark-gray">{property.city} · {property.status}</p></div><span className="text-sm text-dark-gray">Editar</span></div>
          </Link>
        ))}
      </div>
    </div>
  );
}
