/**
 * Admin Dashboard
 * Overview and quick stats
 */

export default function AdminDashboard() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-slate-400">Bienvenido al panel de administración de Driven Group</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="glass-card rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm mb-1">Propiedades Activas</p>
              <p className="text-3xl font-bold text-white">156</p>
            </div>
            <span className="material-symbols-outlined text-4xl text-primary/50">apartment</span>
          </div>
        </div>

        <div className="glass-card rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm mb-1">Consultas Nuevas</p>
              <p className="text-3xl font-bold text-white">24</p>
            </div>
            <span className="material-symbols-outlined text-4xl text-primary/50">mail</span>
          </div>
        </div>

        <div className="glass-card rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm mb-1">Agentes</p>
              <p className="text-3xl font-bold text-white">12</p>
            </div>
            <span className="material-symbols-outlined text-4xl text-primary/50">people</span>
          </div>
        </div>

        <div className="glass-card rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm mb-1">Propiedades Vendidas</p>
              <p className="text-3xl font-bold text-white">23</p>
            </div>
            <span className="material-symbols-outlined text-4xl text-primary/50">check_circle</span>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass-card rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-4">Consultas Recientes</h2>
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                <div>
                  <p className="text-white font-medium">Cliente #{i}</p>
                  <p className="text-slate-400 text-sm">Interesado en propiedad premium</p>
                </div>
                <span className="material-symbols-outlined text-primary">arrow_forward</span>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-4">Acciones Rápidas</h2>
          <div className="space-y-3">
            <a
              href="/admin/properties"
              className="w-full flex items-center gap-3 p-3 bg-primary/20 hover:bg-primary/30 rounded-lg text-white font-medium transition-colors"
            >
              <span className="material-symbols-outlined">add</span>
              Nueva Propiedad
            </a>
            <a
              href="/inquiries"
              className="w-full flex items-center gap-3 p-3 bg-primary/20 hover:bg-primary/30 rounded-lg text-white font-medium transition-colors"
            >
              <span className="material-symbols-outlined">mail</span>
              Ver Consultas
            </a>
            <button className="w-full flex items-center gap-3 p-3 bg-primary/20 hover:bg-primary/30 rounded-lg text-white font-medium transition-colors">
              <span className="material-symbols-outlined">edit</span>
              Editar Perfil
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
