import Link from 'next/link';

interface AdminDashboardProps {
  propertyCount: number;
  inquiryCount: number;
  newInquiryCount: number;
}

export default function AdminDashboard({ propertyCount, inquiryCount, newInquiryCount }: AdminDashboardProps) {
  return (
    <div className="mx-auto max-w-5xl p-6 sm:p-10">
      <div className="mb-8 flex flex-col gap-2 sm:mb-10">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-gray">Plataforma privada</p>
        <h1 className="text-2xl font-bold text-black sm:text-3xl">Panel administrativo</h1>
        <p className="text-sm text-dark-gray sm:text-base">Consulta el estado del portafolio y da seguimiento a los contactos recibidos.</p>
      </div>

      <div className="mb-6 grid gap-3 sm:grid-cols-3 sm:gap-4">
        <div className="rounded-xl border border-light-gray bg-white p-4 sm:p-5">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-gray">Propiedades</p>
          <p className="mt-2 text-3xl font-bold text-black">{propertyCount}</p>
          <p className="mt-1 text-xs text-dark-gray">En el portafolio</p>
        </div>
        <div className="rounded-xl border border-light-gray bg-white p-4 sm:p-5">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-gray">Consultas nuevas</p>
          <p className="mt-2 text-3xl font-bold text-black">{newInquiryCount}</p>
          <p className="mt-1 text-xs text-dark-gray">Pendientes de seguimiento</p>
        </div>
        <div className="rounded-xl border border-light-gray bg-white p-4 sm:p-5">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-gray">Consultas totales</p>
          <p className="mt-2 text-3xl font-bold text-black">{inquiryCount}</p>
          <p className="mt-1 text-xs text-dark-gray">Registradas en el sistema</p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Link href="/admin/properties" className="group rounded-xl border border-light-gray bg-white p-6 transition-colors hover:border-black">
          <p className="font-semibold text-black">Propiedades <span className="ml-1 inline-block transition-transform group-hover:translate-x-1">→</span></p>
          <p className="mt-2 text-sm text-dark-gray">Crear, editar y administrar imágenes, ubicación y datos de cada propiedad.</p>
        </Link>
        <Link href="/admin/leads" className="group rounded-xl border border-light-gray bg-white p-6 transition-colors hover:border-black">
          <p className="font-semibold text-black">Consultas <span className="ml-1 inline-block transition-transform group-hover:translate-x-1">→</span></p>
          <p className="mt-2 text-sm text-dark-gray">Revisar el origen de cada contacto y actualizar su seguimiento.</p>
        </Link>
      </div>
    </div>
  );
}
