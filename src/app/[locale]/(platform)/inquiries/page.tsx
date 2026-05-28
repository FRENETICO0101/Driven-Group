/**
export const dynamic = 'force-dynamic';
 * Inquiries / Leads Management
 * Track and manage customer inquiries and leads
 */

export default function InquiriesPage() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">Consultas & Leads</h1>
        <p className="text-gray">Gestión de consultas y leads de clientes potenciales</p>
      </div>

      {/* Filters */}
      <div className="glass-card rounded-xl p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder:text-gray focus:border-primary focus:ring-0 outline-none"
            placeholder="Buscar por nombre o email..."
            type="text"
          />
          <select className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-primary focus:ring-0 outline-none">
            <option>Todos los estados</option>
            <option>Nuevo</option>
            <option>Contactado</option>
            <option>Calificado</option>
            <option>Cerrado</option>
          </select>
          <select className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-primary focus:ring-0 outline-none">
            <option>Todas las fuentes</option>
            <option>Sitio Web</option>
            <option>Teléfono</option>
            <option>WhatsApp</option>
            <option>Email</option>
          </select>
          <button className="bg-primary/20 hover:bg-primary/30 text-white rounded-lg px-4 py-2 font-medium transition-colors">
            Filtrar
          </button>
        </div>
      </div>

      {/* Inquiries Table */}
      <div className="glass-card rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10 bg-white/5">
              <th className="px-6 py-4 text-left text-sm font-semibold text-light-gray">Cliente</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-light-gray">Propiedad</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-light-gray">Estado</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-light-gray">Fuente</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-light-gray">Fecha</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-light-gray">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {[
              { name: "Juan García", email: "juan@email.com", property: "Penthouse Premium", status: "Nuevo", source: "Sitio Web", date: "2 horas" },
              { name: "María López", email: "maria@email.com", property: "Casa Moderna", status: "Contactado", source: "WhatsApp", date: "5 horas" },
              { name: "Carlos Rodríguez", email: "carlos@email.com", property: "Oficina Centro", status: "Calificado", source: "Email", date: "1 día" },
              { name: "Ana Martínez", email: "ana@email.com", property: "Penthouse Premium", status: "Nuevo", source: "Teléfono", date: "3 horas" },
              { name: "Roberto Sánchez", email: "roberto@email.com", property: "Casa Moderna", status: "Negociando", source: "Sitio Web", date: "2 días" },
            ].map((inquiry, i) => (
              <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="px-6 py-4 text-sm">
                  <div>
                    <p className="text-white font-medium">{inquiry.name}</p>
                    <p className="text-gray text-xs">{inquiry.email}</p>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-white">{inquiry.property}</td>
                <td className="px-6 py-4 text-sm">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      inquiry.status === "Nuevo"
                        ? "bg-blue-500/20 text-blue-300"
                        : inquiry.status === "Contactado"
                          ? "bg-gray/20 text-gray"
                          : inquiry.status === "Calificado"
                            ? "bg-purple-500/20 text-purple-300"
                            : "bg-green-500/20 text-green-300"
                    }`}
                  >
                    {inquiry.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray">{inquiry.source}</td>
                <td className="px-6 py-4 text-sm text-gray">{inquiry.date}</td>
                <td className="px-6 py-4 text-sm">
                  <div className="flex gap-2">
                    <button className="text-primary hover:text-primary/80 transition-colors" title="Ver detalles">
                      <span className="material-symbols-outlined text-lg">visibility</span>
                    </button>
                    <button className="text-primary hover:text-primary/80 transition-colors" title="Editar">
                      <span className="material-symbols-outlined text-lg">edit</span>
                    </button>
                    <button className="text-red-400 hover:text-red-300 transition-colors" title="Eliminar">
                      <span className="material-symbols-outlined text-lg">delete</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-6">
        <p className="text-gray text-sm">Mostrando 1-5 de 24 consultas</p>
        <div className="flex gap-2">
          <button className="px-4 py-2 rounded-lg border border-white/10 text-white hover:bg-white/5 transition-colors disabled:opacity-50">
            ← Anterior
          </button>
          <button className="px-4 py-2 rounded-lg border border-white/10 text-white hover:bg-white/5 transition-colors">
            Siguiente →
          </button>
        </div>
      </div>
    </div>
  );
}
