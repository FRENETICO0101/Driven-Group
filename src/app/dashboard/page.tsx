/**
 *             _ 
 *            / \ 
 *           (   )
 *          / \_/ \
 *         (   |   )
 *        / \_/ \_/ \
 *       (   |   |   )
 *      / \_/ \_/ \_/ \
 *     (   |   |   |   )
 *    /_\_/_\_/_\_/_\_/_\
 *   =====================
 *         B A B E L
 *         SOLUTIONS
 * 
 *   @project Takashi - Driven Academy
 *   @developer Babel Solutions Team by r&r
 */
export default function DashboardPage() {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <aside className="w-72 bg-black border-r border-white/5 flex flex-col h-full">
        <div className="p-6 flex items-center gap-3">
          <div className="size-10 rounded-full bg-white flex items-center justify-center text-black">
            <span className="material-symbols-outlined font-bold">school</span>
          </div>
          <div>
            <h1 className="text-slate-100 text-lg font-bold leading-tight">Driven Academy</h1>
            <p className="text-primary text-xs font-medium uppercase tracking-wider">Plan Premium</p>
          </div>
        </div>
        <nav className="flex-1 px-4 space-y-2 mt-4">
          <a className="flex items-center gap-3 px-4 py-3 rounded-xl bg-primary font-semibold transition-all shadow-lg shadow-white/5 text-slate-900" href="#">
            <span className="material-symbols-outlined">grid_view</span>
            <span>Inicio</span>
          </a>
          <a className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-primary hover:bg-primary/10 transition-all" href="#">
            <span className="material-symbols-outlined">book</span>
            <span>Mis Cursos</span>
          </a>
          <a className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-primary hover:bg-primary/10 transition-all" href="#">
            <span className="material-symbols-outlined">calendar_today</span>
            <span>Calendario</span>
          </a>
          <a className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-primary hover:bg-primary/10 transition-all" href="#">
            <span className="material-symbols-outlined">workspace_premium</span>
            <span>Certificaciones</span>
          </a>
          <a className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-primary hover:bg-primary/10 transition-all" href="#">
            <span className="material-symbols-outlined">headset_mic</span>
            <span>Soporte</span>
          </a>
        </nav>
        <div className="p-6 border-t border-primary/10">
          <div className="flex items-center gap-3 mb-6 px-2">
            <div className="size-10 rounded-full bg-gradient-to-tr from-[#F5F5F7] to-[#E2E2E4] border border-white/20 overflow-hidden">
              <img className="w-full h-full object-cover" data-alt="Student profile professional headshot portrait" src="https://lh3.googleusercontent.com/aida-public/AB6AXuANumb47wW3-BOHZkH9TqI_5X4RxSHlHy00aqDaalHRPj9pn_YBk8kLyqMdxqcPQHinllFrjQMWPEcRJw3PasgfsOt-spF8L5Q1NJ4MKH0ibMeZ-m78hvce48dNOLONQEf2pWYM-V01sC_hTnMYBwgDf-E0Zniyz1IeBZTC3Qj8JoVJtUPepxIYrxpH8hHikmDDk_0BTOzongFTzsmGJT11rJRoIfAtDZsGXB4seDm9zRGJGLvohYX--PyPidIDs-n5IYXK2ux4lYA"/>
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-bold text-slate-100 truncate">Alex Morales</p>
              <p className="text-xs text-slate-500 truncate">Estudiante Elite</p>
            </div>
          </div>
          <button className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-primary/20 text-primary hover:bg-primary hover:text-background-dark font-bold transition-all text-sm">
            <span className="material-symbols-outlined text-sm">logout</span>
            Cerrar Sesión
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white/10 via-black to-black">
        <header className="flex items-center justify-between px-8 py-6 sticky top-0 z-10 glass-card border-x-0 border-t-0">
          <div>
            <h2 className="text-3xl font-black text-slate-100 tracking-tight">Bienvenido, Estudiante</h2>
            <p className="text-slate-400 text-sm mt-1">Continúa tu camino hacia la excelencia profesional hoy.</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="size-10 flex items-center justify-center rounded-full bg-accent-dark border border-primary/10 text-slate-400 hover:text-primary">
              <span className="material-symbols-outlined">notifications</span>
            </button>
            <button className="bg-primary px-6 py-2.5 rounded-lg font-bold text-sm hover:brightness-110 transition-all text-slate-900">
              Ver Perfil
            </button>
          </div>
        </header>
        
        <div className="p-8 space-y-8">
          {/* Progress Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Overall Progress Card */}
            <div className="lg:col-span-2 glass-card rounded-2xl p-6 flex flex-col justify-between border-l-4 border-l-primary">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-lg font-bold text-slate-100">Progreso General del Programa</h3>
                  <p className="text-sm text-slate-400">Maestría en Liderazgo Corporativo</p>
                </div>
                <span className="bg-primary/20 text-primary text-xs font-black px-3 py-1 rounded-full uppercase tracking-widest">En Curso</span>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <span className="text-4xl font-black text-primary">75%</span>
                  <span className="text-sm text-slate-400 font-medium">12 de 16 lecciones completadas</span>
                </div>
                <div className="h-3 w-full bg-primary/10 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-primary rounded-full shadow-[0_0_15px_rgba(245,245,247,0.3)] to-[#E2E2E4]" style={{ width: "75%" }}></div>
                </div>
              </div>
            </div>

            {/* Statistics Card */}
            <div className="glass-card rounded-2xl p-6 flex flex-col justify-center items-center text-center space-y-4">
              <div className="relative size-32">
                <svg className="size-full" viewBox="0 0 36 36">
                  <path className="stroke-primary/10" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" strokeWidth="3"></path>
                  <path className="stroke-[#F5F5F7]" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" strokeDasharray="85, 100" strokeLinecap="round" strokeWidth="3"></path>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-black text-slate-100">850</span>
                  <span className="text-[10px] text-primary font-bold uppercase tracking-tighter">Puntos XP</span>
                </div>
              </div>
              <div>
                <p className="text-sm font-bold text-slate-100">Racha de Aprendizaje</p>
                <p className="text-xs text-slate-500">Has estudiado 5 días seguidos</p>
              </div>
            </div>
          </div>

          {/* Active Courses Section */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-slate-100 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">play_circle</span>
                Cursos Activos
              </h3>
              <a className="text-primary text-sm font-semibold hover:underline" href="#">Explorar Catálogo</a>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {/* Course Card 1 */}
              <div className="glass-card rounded-2xl overflow-hidden group hover:border-primary/40 transition-all duration-300">
                <div className="h-40 relative">
                  <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="Corporate strategy and leadership team meeting" src="/images/estrategico.png"/>
                  <div className="absolute inset-0 bg-gradient-to-t from-background-dark to-transparent"></div>
                  <div className="absolute bottom-3 left-4 flex gap-2">
                    <span className="px-2 py-1 bg-primary text-background-dark text-[10px] font-bold rounded uppercase">Estrategia</span>
                    <span className="px-2 py-1 bg-black/50 text-white text-[10px] font-bold rounded uppercase backdrop-blur-sm">Avanzado</span>
                  </div>
                </div>
                <div className="p-5 space-y-4">
                  <div>
                    <h4 className="text-slate-100 font-bold leading-tight group-hover:text-primary transition-colors">Pensamiento Estratégico para Ejecutivos</h4>
                    <p className="text-slate-500 text-xs mt-1">Instructor: Dr. Marcus Vane</p>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] font-bold text-slate-400">
                      <span>PROGRESO</span>
                      <span>60%</span>
                    </div>
                    <div className="h-1.5 w-full bg-primary/10 rounded-full">
                      <div className="h-full bg-primary rounded-full" style={{ width: "60%" }}></div>
                    </div>
                  </div>
                  <a href="/course" className="w-full py-3 bg-primary/10 text-primary hover:bg-primary hover:text-background-dark font-bold rounded-xl transition-all flex items-center justify-center gap-2 text-sm">
                    Continuar Aprendiendo
                    <span className="material-symbols-outlined text-base">arrow_forward</span>
                  </a>
                </div>
              </div>

              {/* Course Card 2 */}
              <div className="glass-card rounded-2xl overflow-hidden group hover:border-primary/40 transition-all duration-300">
                <div className="h-40 relative">
                  <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="Modern business analytics dashboard and charts" src="/images/finanzas.png"/>
                  <div className="absolute inset-0 bg-gradient-to-t from-background-dark to-transparent"></div>
                  <div className="absolute bottom-3 left-4 flex gap-2">
                    <span className="px-2 py-1 bg-primary text-background-dark text-[10px] font-bold rounded uppercase">Finanzas</span>
                    <span className="px-2 py-1 bg-black/50 text-white text-[10px] font-bold rounded uppercase backdrop-blur-sm">Intermedio</span>
                  </div>
                </div>
                <div className="p-5 space-y-4">
                  <div>
                    <h4 className="text-slate-100 font-bold leading-tight group-hover:text-primary transition-colors">Análisis Financiero de Alto Impacto</h4>
                    <p className="text-slate-500 text-xs mt-1">Instructor: Sarah Jenkins</p>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] font-bold text-slate-400">
                      <span>PROGRESO</span>
                      <span>35%</span>
                    </div>
                    <div className="h-1.5 w-full bg-primary/10 rounded-full">
                      <div className="h-full bg-primary rounded-full" style={{ width: "35%" }}></div>
                    </div>
                  </div>
                  <a href="/course" className="w-full py-3 bg-primary/10 text-primary hover:bg-primary hover:text-background-dark font-bold rounded-xl transition-all flex items-center justify-center gap-2 text-sm">
                    Continuar Aprendiendo
                    <span className="material-symbols-outlined text-base">arrow_forward</span>
                  </a>
                </div>
              </div>

              {/* Course Card 3 */}
              <div className="glass-card rounded-2xl overflow-hidden group hover:border-primary/40 transition-all duration-300">
                <div className="h-40 relative">
                  <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="Team of professionals collaborating in a modern office" src="/images/liderazgo.png"/>
                  <div className="absolute inset-0 bg-gradient-to-t from-background-dark to-transparent"></div>
                  <div className="absolute bottom-3 left-4 flex gap-2">
                    <span className="px-2 py-1 bg-primary text-background-dark text-[10px] font-bold rounded uppercase">Soft Skills</span>
                    <span className="px-2 py-1 bg-black/50 text-white text-[10px] font-bold rounded uppercase backdrop-blur-sm">Básico</span>
                  </div>
                </div>
                <div className="p-5 space-y-4">
                  <div>
                    <h4 className="text-slate-100 font-bold leading-tight group-hover:text-primary transition-colors">Gestión de Equipos en Remoto</h4>
                    <p className="text-slate-500 text-xs mt-1">Instructor: David Miller</p>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] font-bold text-slate-400">
                      <span>PROGRESO</span>
                      <span>92%</span>
                    </div>
                    <div className="h-1.5 w-full bg-primary/10 rounded-full">
                      <div className="h-full bg-primary rounded-full" style={{ width: "92%" }}></div>
                    </div>
                  </div>
                  <button className="w-full py-3 bg-primary/10 text-primary hover:bg-primary hover:text-background-dark font-bold rounded-xl transition-all flex items-center justify-center gap-2 text-sm">
                    Finalizar Curso
                    <span className="material-symbols-outlined text-base">verified</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Next Classes and Tasks */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            <div className="glass-card rounded-2xl p-6">
              <h3 className="text-lg font-bold text-slate-100 mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">event</span>
                Próximas Sesiones en Vivo
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 rounded-xl bg-accent-dark/40 border border-primary/5">
                  <div className="flex flex-col items-center justify-center size-14 bg-primary/20 text-primary rounded-lg border border-primary/20">
                    <span className="text-xs font-bold uppercase">Oct</span>
                    <span className="text-xl font-black">24</span>
                  </div>
                  <div className="flex-1">
                    <h5 className="text-slate-100 font-bold text-sm">Webinar: Negociación Internacional</h5>
                    <p className="text-slate-500 text-xs">18:00 PM • Vía Zoom</p>
                  </div>
                  <button className="p-2 text-primary hover:bg-primary/20 rounded-lg transition-all">
                    <span className="material-symbols-outlined">link</span>
                  </button>
                </div>
                <div className="flex items-center gap-4 p-4 rounded-xl bg-accent-dark/40 border border-primary/5">
                  <div className="flex flex-col items-center justify-center size-14 bg-primary/20 text-primary rounded-lg border border-primary/20">
                    <span className="text-xs font-bold uppercase">Oct</span>
                    <span className="text-xl font-black">27</span>
                  </div>
                  <div className="flex-1">
                    <h5 className="text-slate-100 font-bold text-sm">Sesión de Q&amp;A: Mastermind Ejecutivo</h5>
                    <p className="text-slate-500 text-xs">10:30 AM • Vía Microsoft Teams</p>
                  </div>
                  <button className="p-2 text-primary hover:bg-primary/20 rounded-lg transition-all">
                    <span className="material-symbols-outlined">link</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="glass-card rounded-2xl p-6">
              <h3 className="text-lg font-bold text-slate-100 mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">assignment_turned_in</span>
                Tareas Pendientes
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-xl bg-accent-dark/40 border border-primary/5">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-slate-500">radio_button_unchecked</span>
                    <div>
                      <p className="text-slate-100 font-bold text-sm">Enviar Proyecto Final de Módulo</p>
                      <p className="text-red-500 text-[10px] font-bold uppercase tracking-widest mt-0.5">Vence en 2 días</p>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-slate-600">chevron_right</span>
                </div>
                <div className="flex items-center justify-between p-4 rounded-xl bg-accent-dark/40 border border-primary/5">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-slate-500">radio_button_unchecked</span>
                    <div>
                      <p className="text-slate-100 font-bold text-sm">Completar Test de Habilidades</p>
                      <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mt-0.5">Vence en 5 días</p>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-slate-600">chevron_right</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
