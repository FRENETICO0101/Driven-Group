import Link from "next/link";
import type { Property } from "@/lib/types";

export default function AdminPropertiesPage({ properties }: { properties: Property[] }) {
  return (
    <div className="mx-auto max-w-6xl p-6 sm:p-10">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="editorial-label text-gray">CATÁLOGO PÚBLICO</p>
          <h1 className="mt-2 text-3xl font-bold text-black">Propiedades</h1>
          <p className="mt-2 text-gray-600">Crea, actualiza u oculta las propiedades que se muestran en el sitio.</p>
        </div>
        <Link href="/admin/properties/new" className="inline-flex items-center justify-center rounded-lg bg-black px-4 py-2.5 text-sm font-semibold text-white">Nueva propiedad</Link>
      </div>
      <div className="overflow-hidden rounded-xl border border-light-gray bg-white">
        {properties.length === 0 ? (
          <p className="p-6 text-dark-gray">No hay propiedades registradas.</p>
        ) : properties.map((property) => (
          <Link key={property.id} href={`/admin/properties/${property.slug}`} className="block border-b border-light-gray p-5 transition-colors last:border-b-0 hover:bg-light-gray/20">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="font-semibold text-black">{property.title}</p>
                <p className="mt-1 text-sm text-dark-gray">{property.city} · {property.status === "INACTIVE" ? "Oculta del sitio" : "Visible"}</p>
              </div>
              <span className="text-sm font-semibold text-dark-gray">Gestionar →</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
