/**
 * Admin - Properties Management
 * CRUD operations for real estate properties
 */

export default function AdminPropertiesPage() {
  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Propiedades</h1>
          <p className="text-slate-400">Gestión de listado de propiedades premium</p>
        </div>
        <a
          href="#"
          className="quartz-button px-6 py-3 rounded-lg font-bold inline-flex items-center gap-2"
        >
          <span className="material-symbols-outlined">add</span>
          Nueva Propiedad
        </a>
      </div>

      {/* Filters */}
      <div className="glass-card rounded-xl p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder:text-slate-500 focus:border-primary focus:ring-0 outline-none"
            placeholder="Buscar por título..."
            type="text"
          />
          <select className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-primary focus:ring-0 outline-none">
            <option>Todos los estados</option>
            <option>Activo</option>
            <option>Vendido</option>
            <option>Pendiente</option>
          </select>
          <select className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-primary focus:ring-0 outline-none">
            <option>Todos los tipos</option>
            <option>Residencial</option>
            <option>Comercial</option>
            <option>Terreno</option>
          </select>
          <button className="bg-primary/20 hover:bg-primary/30 text-white rounded-lg px-4 py-2 font-medium transition-colors">
            Filtrar
          </button>
        </div>
      </div>

      {/* Properties Table */}
      <div className="glass-card rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10 bg-white/5">
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Propiedad</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Ubicación</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Precio</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Estado</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {[1, 2, 3, 4, 5].map((i) => (
              <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="px-6 py-4 text-sm text-white">Penthouse Premium #{i}</td>
                <td className="px-6 py-4 text-sm text-slate-400">Centro, Zona A</td>
                <td className="px-6 py-4 text-sm font-semibold text-white">$950.000</td>
                <td className="px-6 py-4 text-sm">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-500/20 text-green-300">
                    Activo
                  </span>
                </td>
                <td className="px-6 py-4 text-sm">
                  <div className="flex gap-2">
                    <button className="text-primary hover:text-primary/80 transition-colors">
                      <span className="material-symbols-outlined text-lg">edit</span>
                    </button>
                    <button className="text-red-400 hover:text-red-300 transition-colors">
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
        <p className="text-slate-400 text-sm">Mostrando 1-5 de 156 propiedades</p>
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
