import Link from 'next/link';

export default function AdminDashboard() {
  return (
    <div className="p-6 sm:p-10">
      <h1 className="text-2xl font-bold">Panel administrativo</h1>
      <p className="text-gray-600 mt-2 mb-8">Gestiona el inventario y las consultas recibidas.</p>
      <div className="grid sm:grid-cols-2 gap-4 max-w-2xl">
        <Link href="/admin/properties" className="border border-light-gray rounded-xl p-6 hover:border-black"><p className="font-semibold">Propiedades</p><p className="text-sm text-dark-gray mt-2">Crear, editar y ordenar imágenes.</p></Link>
        <Link href="/admin/leads" className="border border-light-gray rounded-xl p-6 hover:border-black"><p className="font-semibold">Consultas</p><p className="text-sm text-dark-gray mt-2">Revisar los leads del sitio.</p></Link>
      </div>
    </div>
  );
}
