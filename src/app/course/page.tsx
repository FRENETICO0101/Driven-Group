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
export default function CoursePage() {
  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 antialiased overflow-hidden h-screen flex flex-col">
      {/* Top Navigation Bar */}
      <header className="flex items-center justify-between border-b border-white/10 bg-black px-6 py-3 h-16 shrink-0">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-3 text-primary">
            <div className="size-8 flex items-center justify-center">
              <span className="material-symbols-outlined text-3xl">diamond</span>
            </div>
            <h2 className="text-slate-100 text-lg font-bold leading-tight tracking-tight">Driven Academy</h2>
          </div>
          <nav className="hidden md:flex gap-6">
            <a className="text-sm font-medium text-slate-400 hover:text-primary transition-colors" href="/dashboard">Mis Cursos</a>
            <a className="text-sm font-medium text-slate-400 hover:text-primary transition-colors" href="#">Biblioteca</a>
            <a className="text-sm font-medium text-slate-400 hover:text-primary transition-colors" href="#">Comunidad</a>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative hidden sm:block">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">search</span>
            <input className="bg-accent-dark/50 border border-white/10 rounded-lg py-2 pl-9 pr-4 text-sm focus:ring-1 focus:ring-primary w-64 text-slate-100 placeholder:text-slate-500 outline-none" placeholder="Buscar contenido..."/>
          </div>
          <button className="flex items-center justify-center rounded-lg h-10 w-10 bg-accent-dark/50 border border-white/10 text-slate-100 hover:bg-white/10 transition-colors">
            <span className="material-symbols-outlined">notifications</span>
          </button>
          <div className="h-8 w-px bg-white/10 mx-2"></div>
          <div className="flex items-center gap-3 cursor-pointer">
            <div className="bg-primary/20 p-0.5 rounded-full border border-primary/30">
              <img className="size-8 rounded-full object-cover" data-alt="User profile avatar portrait" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAEc_QsJTxs--ZYcc46lpIVWgLGDXyB-scaSqKDgL_Of5IgjU3hb90cs9PlonpI4mwNdbn7SWItJ3rOHNx5wiTKpws0irP__-NYZ788xLY3m1cjwysiazkeqVe4emGg_xv4tuKtwUqTFqdm-rcOm6ls0mIX2K_s8HJZsFai7Zt-D2jliuzTwgRZ3geOXkVB5JSx6DUvwAANrYs5d8_ZsATgYYh6YOm8rIUdid9QDeHVWgDcMNPSrb_0rTCjZerivM0cFD_uZ7DoT34"/>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area: 3 Columns */}
      <main className="flex flex-1 overflow-hidden">
        {/* Left Sidebar: Main Navigation (Slim) */}
        <aside className="w-16 md:w-20 bg-black border-r border-white/10 flex flex-col items-center py-6 gap-6 shrink-0">
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-black rounded-lg text-sm font-bold hover:bg-primary/90 transition-colors relative group">
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
            <span className="absolute left-full ml-4 px-2 py-1 bg-white text-black text-xs rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50">Siguiente Lección</span>
          </button>
          
          <button className="p-3 rounded-xl text-slate-400 hover:bg-white/10 hover:text-primary transition-all">
            <span className="material-symbols-outlined">chat_bubble</span>
          </button>
          <button className="p-3 rounded-xl text-slate-400 hover:bg-white/10 hover:text-primary transition-all">
            <span className="material-symbols-outlined">group</span>
          </button>
          <button className="p-3 rounded-xl text-slate-400 hover:bg-white/10 hover:text-primary transition-all">
            <span className="material-symbols-outlined">folder</span>
          </button>
          
          <div className="mt-auto">
            <button className="p-3 rounded-xl text-slate-400 hover:bg-white/10 hover:text-primary transition-all">
              <span className="material-symbols-outlined">settings</span>
            </button>
          </div>
        </aside>

        {/* Center: Video Player & Tabs */}
        <section className="flex-1 flex flex-col overflow-y-auto bg-black p-6">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-4">
            <span>Liderazgo Estratégico</span>
            <span className="material-symbols-outlined text-[12px]">chevron_right</span>
            <span>Módulo 2</span>
            <span className="material-symbols-outlined text-[12px]">chevron_right</span>
            <span className="text-primary font-medium">Fundamentos del Liderazgo Moderno</span>
          </div>

          {/* Video Player */}
          <div className="relative w-full aspect-video bg-black rounded-xl overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.5)] border border-white/5 group">
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/10 transition-all cursor-pointer" style={{ backgroundImage: "url('/images/liderazgo.png')", backgroundSize: "cover", backgroundPosition: "center", filter: "brightness(0.6)" }}>
              <div className="bg-primary/90 text-black size-20 rounded-full flex items-center justify-center shadow-2xl scale-100 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-4xl ml-2">play_arrow</span>
              </div>
            </div>
            
            {/* Player Controls Overlay */}
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="flex flex-col gap-2">
                <div className="h-1.5 w-full bg-slate-600 rounded-full cursor-pointer relative overflow-hidden">
                  <div className="absolute inset-y-0 left-0 w-1/3 bg-primary rounded-full"></div>
                </div>
                <div className="flex items-center justify-between text-white text-sm">
                  <div className="flex items-center gap-4">
                    <span className="material-symbols-outlined cursor-pointer hover:text-primary transition-colors">play_arrow</span>
                    <span className="material-symbols-outlined cursor-pointer hover:text-primary transition-colors">volume_up</span>
                    <span className="text-xs font-medium">08:24 / 24:15</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="material-symbols-outlined cursor-pointer hover:text-primary transition-colors">closed_caption</span>
                    <span className="material-symbols-outlined cursor-pointer hover:text-primary transition-colors">settings</span>
                    <span className="material-symbols-outlined cursor-pointer hover:text-primary transition-colors">fullscreen</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Title and Stats */}
          <div className="mt-6 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
            <div>
              <h1 className="text-2xl font-bold text-slate-100">Lección 2.4: Fundamentos del Liderazgo Moderno</h1>
              <p className="text-slate-400 mt-1">Impartido por <span className="text-primary font-medium">Dra. Sarah Jenkins</span> • 24 minutos</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm font-medium hover:bg-white/10 transition-colors">
                <span className="material-symbols-outlined text-sm">download</span>
                <span>Descargar Guía</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-primary text-black rounded-lg text-sm font-bold hover:bg-primary/90 transition-colors">
                <span>Siguiente Lección</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>
          </div>

          {/* Tabs Section */}
          <div className="mt-8 flex flex-col flex-1">
            <div className="flex gap-8 border-b border-white/10">
              <button className="pb-4 text-sm font-bold text-primary border-b-2 border-primary">Overview</button>
              <button className="pb-4 text-sm font-medium text-slate-400 hover:text-slate-200 border-b-2 border-transparent">Recursos Adicionales</button>
              <button className="pb-4 text-sm font-medium text-slate-400 hover:text-slate-200 border-b-2 border-transparent">Transcripción</button>
              <button className="pb-4 text-sm font-medium text-slate-400 hover:text-slate-200 border-b-2 border-transparent">Preguntas (24)</button>
            </div>
            
            <div className="py-6 text-slate-300 space-y-4 max-w-4xl">
              <p className="leading-relaxed">
                En esta lección exploraremos los fundamentos del liderazgo moderno y cómo aplicarlos en entornos corporativos de alto rendimiento. Abordaremos la transición desde los modelos de mando y control hacia el liderazgo servicial y situacional.
              </p>
              
              <h3 className="text-lg font-bold text-slate-100 mt-6">Puntos Clave:</h3>
              <ul className="space-y-3 mt-4">
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-primary text-xl">check_circle</span>
                  <span>Diferencia entre jefe y líder en la era digital.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-primary text-xl">check_circle</span>
                  <span>Inteligencia emocional aplicada a la gestión de equipos remotos.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-primary text-xl">check_circle</span>
                  <span>Toma de decisiones basada en datos versus intuición estratégica.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Right Sidebar: Course Navigation & AI Tutor */}
        <aside className="w-80 md:w-96 bg-[#0a0a0a] border-l border-white/10 flex flex-col shrink-0">
          {/* Tabs for Sidebar */}
          <div className="grid grid-cols-2 border-b border-white/10">
            <button className="py-4 text-xs font-bold uppercase tracking-widest text-primary border-b-2 border-primary bg-white/5">Módulos</button>
            <button className="py-4 text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-slate-200">Tutor IA</button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
            
            {/* Module 1: Completed */}
            <div className="border border-white/5 rounded-xl overflow-hidden bg-black">
              <div className="p-4 flex items-center justify-between cursor-pointer hover:bg-white/5 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/20 text-primary rounded-full size-6 flex items-center justify-center">
                    <span className="material-symbols-outlined text-base">check</span>
                  </div>
                  <span className="font-bold text-sm text-slate-100">1. Introducción al Liderazgo</span>
                </div>
                <span className="material-symbols-outlined text-slate-500">expand_more</span>
              </div>
            </div>

            {/* Module 2: Active */}
            <div className="border border-primary/30 rounded-xl overflow-hidden bg-black shadow-lg">
              <div className="p-4 flex items-center justify-between bg-primary/10 cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="bg-primary text-black rounded-full size-6 flex items-center justify-center">
                    <span className="text-[10px] font-bold">02</span>
                  </div>
                  <span className="font-bold text-sm text-slate-100">2. Estrategias Avanzadas</span>
                </div>
                <span className="material-symbols-outlined text-primary">expand_less</span>
              </div>
              <div className="flex flex-col border-t border-primary/10">
                <div className="flex items-center gap-3 p-4 pl-12 hover:bg-white/5 transition-colors cursor-pointer border-b border-white/5">
                  <span className="material-symbols-outlined text-primary text-sm">check_circle</span>
                  <span className="text-sm text-slate-300">2.1 Visión del Mercado</span>
                </div>
                <div className="flex items-center gap-3 p-4 pl-12 hover:bg-white/5 transition-colors cursor-pointer border-b border-white/5">
                  <span className="material-symbols-outlined text-primary text-sm">check_circle</span>
                  <span className="text-sm text-slate-300">2.2 Agilidad Organizacional</span>
                </div>
                <div className="flex items-center gap-3 p-4 pl-12 bg-white/5 border-l-4 border-primary">
                  <span className="material-symbols-outlined text-primary text-sm">play_circle</span>
                  <span className="text-sm font-bold text-primary">2.3 Fundamentos Modernos</span>
                </div>
                <div className="flex items-center gap-3 p-4 pl-12 hover:bg-white/5 transition-colors cursor-pointer">
                  <span className="material-symbols-outlined text-slate-600 text-sm">radio_button_unchecked</span>
                  <span className="text-sm text-slate-400">2.4 Gestión de Crisis</span>
                </div>
              </div>
            </div>

            {/* Module 3: Locked */}
            <div className="border border-white/5 rounded-xl overflow-hidden bg-black opacity-60">
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-white/10 text-slate-400 rounded-full size-6 flex items-center justify-center">
                    <span className="material-symbols-outlined text-sm">lock</span>
                  </div>
                  <span className="font-bold text-sm text-slate-400">3. Ejecución y Resultados</span>
                </div>
              </div>
            </div>
            
          </div>

          {/* AI Tutor Floating / Fixed Panel Mock (Integrated) */}
          <div className="border-t border-white/5 bg-black p-4 h-96 flex flex-col shrink-0">
            <div className="flex items-center gap-2 mb-4">
              <div className="size-2 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-xs font-bold uppercase text-slate-500 tracking-wider">Tutor IA Online</span>
            </div>
            
            <div className="flex-1 overflow-y-auto space-y-4 mb-4 scrollbar-hide">
              {/* User Message */}
              <div className="flex flex-col items-end gap-1">
                <div className="bg-white/10 text-slate-100 p-3 rounded-2xl rounded-tr-none text-sm max-w-[85%]">
                  ¿Cuál es la diferencia clave entre el liderazgo situacional y el servicial?
                </div>
                <span className="text-[10px] text-slate-500 pr-1">Tú, 10:15 AM</span>
              </div>
              
              {/* AI Response */}
              <div className="flex gap-2">
                <div className="size-8 rounded-full bg-primary/20 flex items-center justify-center text-primary shrink-0">
                  <span className="material-symbols-outlined text-lg">smart_toy</span>
                </div>
                <div className="flex flex-col gap-1 pr-4">
                  <div className="bg-[#111111] border border-primary/20 text-slate-300 p-3 rounded-2xl rounded-tl-none text-sm leading-relaxed">
                    El <span className="text-primary font-medium">Liderazgo Situacional</span> se enfoca en adaptar tu estilo según la madurez del equipo, mientras que el <span className="text-primary font-medium">Liderazgo Servicial</span> prioriza el crecimiento y bienestar de los seguidores por encima del control. ¿Te gustaría ver un ejemplo aplicado?
                  </div>
                  <span className="text-[10px] text-slate-500 pl-1">Driven Tutor, ahora</span>
                </div>
              </div>
            </div>
            
            {/* Input Area */}
            <div className="relative mt-auto">
              <input className="w-full bg-white/5 border border-white/10 focus:border-primary/50 outline-none rounded-full py-3 px-5 pr-12 text-sm text-slate-100 placeholder:text-slate-500" placeholder="Pregunta a tu tutor..." type="text"/>
              <button className="absolute right-2 top-1/2 -translate-y-1/2 size-8 flex items-center justify-center bg-primary text-black rounded-full hover:bg-primary/90 transition-colors">
                <span className="material-symbols-outlined text-sm">send</span>
              </button>
            </div>
          </div>
        </aside>
      </main>

      {/* Global Floating Action for Course Progress */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-black/90 backdrop-blur-lg border border-primary/30 py-3 px-6 rounded-full shadow-2xl flex items-center gap-6 z-50">
        <div className="flex flex-col gap-1">
          <div className="flex justify-between text-[10px] font-bold uppercase tracking-tighter text-slate-400">
            <span>Progreso del Curso</span>
            <span className="text-primary">64%</span>
          </div>
          <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-primary" style={{ width: "64%" }}></div>
          </div>
        </div>
        <div className="h-8 w-px bg-white/10"></div>
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-xl">emoji_events</span>
          <span className="text-xs font-bold text-slate-200">2/5 Insignias</span>
        </div>
      </div>
    </div>
  );
}
