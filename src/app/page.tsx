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
export default function Home() {
  return (
    <>
      <nav className="sticky top-0 z-50 w-full border-b border-white/5 bg-black/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-10">
            <div className="flex items-center gap-3">
              <div className="size-8 text-primary/90">
                <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                  <path clipRule="evenodd" d="M24 0.757355L47.2426 24L24 47.2426L0.757355 24L24 0.757355ZM21 35.7574V12.2426L9.24264 24L21 35.7574Z" fill="currentColor" fillRule="evenodd"></path>
                </svg>
              </div>
              <h2 className="text-xl font-black tracking-tight uppercase text-white">Driven Academy</h2>
            </div>
            <div className="hidden md:flex items-center gap-8 text-slate-300">
              <a className="text-sm font-medium hover:text-primary transition-colors" href="#">Programas</a>
              <a className="text-sm font-medium hover:text-primary transition-colors" href="#">Mentoring</a>
              <a className="text-sm font-medium hover:text-primary transition-colors" href="#">IA Learning</a>
              <a className="text-sm font-medium hover:text-primary transition-colors" href="#">Nosotros</a>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="hidden lg:flex items-center bg-white/5 rounded-lg px-3 py-1.5 border border-white/10">
              <span className="material-symbols-outlined text-slate-400 text-xl">search</span>
              <input className="bg-transparent border-none focus:ring-0 text-sm placeholder:text-slate-500 w-48 text-white outline-none" placeholder="Buscar programas..." type="text"/>
            </div>
            <button className="quartz-button px-6 py-2.5 rounded-lg font-bold text-sm transition-all">
              Acceso
            </button>
          </div>
        </div>
      </nav>

      <header className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 hero-gradient z-10"></div>
          <img alt="Mentor and mentee" className="w-full h-full object-cover grayscale-[0.3] brightness-[0.7]" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDc1O4XPNaqsG7WCRABBX8iCyHDMZqAiZpWFqUbYpBfJQ76WiDwAth7CjkQwh16gTBG4N8LWDfgMZIZmVpl5X6lChfg5_QLSQXMowbZNtxteS2wHD0nLt5I5Gcq6Kd6U6DBt6AhfH_oyBuzAOtZ2HYdlrztm3uM9NFwDYYzNpEgKQgeroayd8cgWDhu3fiHjAaU0a6VG_c8xFE3hfYO2spL16zBllP3Mh_qSzfVVCmbhesM_1r_H5yToKYRzKBee_rd2o8IzZE1yGA"/>
        </div>
        <div className="relative z-20 max-w-7xl mx-auto px-6 w-full">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-primary/90 text-xs font-bold uppercase tracking-widest mb-6">
              <span className="material-symbols-outlined text-sm">auto_awesome</span> Innovación en Liderazgo
            </div>
            <h1 className="text-5xl md:text-7xl font-black leading-[1.1] mb-8 text-white">Transformamos <span className="text-primary/90">Líderes</span> y a sus Equipos</h1>
            <p className="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed max-w-2xl">
              Executive Training, Mentoring, and AI-Powered Learning. Potencia el talento de tu organización con metodologías de vanguardia diseñadas para el futuro del trabajo y la conexión humana.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="quartz-button px-8 py-4 rounded-xl font-extrabold text-lg hover:scale-105 transition-transform">
                Conoce nuestros programas
              </button>
              <button className="glass-card px-8 py-4 rounded-xl font-bold text-lg text-white hover:bg-white/10 transition-colors">
                Ver testimonios
              </button>
            </div>
          </div>
        </div>
      </header>

      <section className="py-16 border-y border-white/5 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="text-center lg:text-left">
              <p className="text-4xl font-black text-primary/90">+5,800</p>
              <p className="text-slate-400 font-medium uppercase tracking-tighter">Colaboradores gestionados</p>
            </div>
            <div className="flex flex-wrap justify-center items-center gap-12 grayscale opacity-60 text-white">
              <div className="flex items-center gap-2 text-2xl font-bold tracking-tighter">
                <span className="material-symbols-outlined text-3xl">corporate_fare</span> COMPANY
              </div>
              <div className="flex items-center gap-2 text-2xl font-bold tracking-tighter">
                <span className="material-symbols-outlined text-3xl">account_balance</span> GLOBAL
              </div>
              <div className="flex items-center gap-2 text-2xl font-bold tracking-tighter">
                <span className="material-symbols-outlined text-3xl">rocket_launch</span> TECH-CO
              </div>
              <div className="flex items-center gap-2 text-2xl font-bold tracking-tighter">
                <span className="material-symbols-outlined text-3xl">diamond</span> LUXE
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <h2 className="text-4xl font-black text-primary/90">Programas Premium</h2>
            <p className="text-slate-400 text-lg max-w-xl">
              Formación de alto impacto diseñada por expertos de la industria para acelerar tu crecimiento profesional.
            </p>
          </div>
          <a className="text-primary/80 font-bold flex items-center gap-2 group hover:text-primary transition-colors" href="#">
            Explorar catálogo completo 
            <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">arrow_forward</span>
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="glass-card group overflow-hidden rounded-xl transition-all hover:-translate-y-2 flex flex-col">
            <div className="relative h-64 overflow-hidden">
              <img alt="Liderazgo" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src="/images/liderazgo.png"/>
              <div className="absolute top-4 left-4 quartz-button text-xs font-black px-2 py-1 rounded uppercase">
                Popular
              </div>
            </div>
            <div className="p-8 flex-1 flex flex-col">
              <h3 className="text-2xl font-bold mb-3 text-white">Liderazgo Estratégico</h3>
              <p className="text-slate-400 mb-6 line-clamp-2 leading-relaxed">
                Desarrolla visión de alto impacto y aprende a guiar equipos hacia objetivos ambiciosos con inteligencia emocional.
              </p>
              <div className="flex items-center justify-between mt-auto">
                <span className="flex items-center gap-1 text-slate-300 text-sm">
                  <span className="material-symbols-outlined text-primary/70 text-sm">schedule</span> 40 Horas
                </span>
                <button className="bg-white/5 border border-white/10 hover:border-primary/50 text-white px-5 py-2 rounded-lg font-semibold transition-colors">
                  Ver Detalles
                </button>
              </div>
            </div>
          </div>
          
          <div className="glass-card group overflow-hidden rounded-xl transition-all hover:-translate-y-2 flex flex-col">
            <div className="relative h-64 overflow-hidden">
              <img alt="Finanzas" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src="/images/finanzas.png"/>
              <div className="absolute top-4 left-4 bg-slate-800 text-primary/90 text-xs font-black px-2 py-1 rounded uppercase border border-white/20">
                Avanzado
              </div>
            </div>
            <div className="p-8 flex-1 flex flex-col">
              <h3 className="text-2xl font-bold mb-3 text-white">Estrategias Financieras</h3>
              <p className="text-slate-400 mb-6 line-clamp-2 leading-relaxed">
                Optimización de recursos y rentabilidad. Domina los indicadores clave para la toma de decisiones críticas.
              </p>
              <div className="flex items-center justify-between mt-auto">
                <span className="flex items-center gap-1 text-slate-300 text-sm">
                  <span className="material-symbols-outlined text-primary/70 text-sm">schedule</span> 32 Horas
                </span>
                <button className="bg-white/5 border border-white/10 hover:border-primary/50 text-white px-5 py-2 rounded-lg font-semibold transition-colors">
                  Ver Detalles
                </button>
              </div>
            </div>
          </div>

          <div className="glass-card group overflow-hidden rounded-xl transition-all hover:-translate-y-2 flex flex-col">
            <div className="relative h-64 overflow-hidden">
              <img alt="Estratégico" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src="/images/estrategico.png"/>
              <div className="absolute top-4 left-4 bg-slate-800 text-primary/90 text-xs font-black px-2 py-1 rounded uppercase border border-white/20">
                Transformación
              </div>
            </div>
            <div className="p-8 flex-1 flex flex-col">
              <h3 className="text-2xl font-bold mb-3 text-white">De Operativo a Estratégico</h3>
              <p className="text-slate-400 mb-6 line-clamp-2 leading-relaxed">
                Evoluciona tu rol en la organización. Aprende a delegar lo táctico para centrarte en lo que genera valor real.
              </p>
              <div className="flex items-center justify-between mt-auto">
                <span className="flex items-center gap-1 text-slate-300 text-sm">
                  <span className="material-symbols-outlined text-primary/70 text-sm">schedule</span> 28 Horas
                </span>
                <button className="bg-white/5 border border-white/10 hover:border-primary/50 text-white px-5 py-2 rounded-lg font-semibold transition-colors">
                  Ver Detalles
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-12 relative overflow-hidden">
          <div className="absolute -right-20 -top-20 opacity-10">
            <span className="material-symbols-outlined text-[300px] text-white">auto_fix_high</span>
          </div>
          <div className="max-w-2xl relative z-10">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">¿Listo para escalar tu potencial?</h2>
            <p className="text-white/70 text-lg mb-8 font-medium">
              Únete a los líderes que ya están transformando sus organizaciones con nuestra plataforma de aprendizaje impulsada por IA.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="quartz-button px-8 py-3.5 rounded-xl font-bold hover:scale-105 transition-transform">
                Hablar con un mentor
              </button>
              <button className="bg-white/5 border-2 border-white/20 text-white px-8 py-3.5 rounded-xl font-bold hover:bg-white/10 transition-colors">
                Saber más
              </button>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-black pt-20 pb-10 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          <div className="col-span-1 lg:col-span-1">
            <div className="flex items-center gap-3 mb-8">
              <div className="size-6 text-primary/80">
                <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                  <path clipRule="evenodd" d="M24 0.757355L47.2426 24L24 47.2426L0.757355 24L24 0.757355ZM21 35.7574V12.2426L9.24264 24L21 35.7574Z" fill="currentColor" fillRule="evenodd"></path>
                </svg>
              </div>
              <h2 className="text-lg font-black tracking-tight uppercase text-white">Driven Academy</h2>
            </div>
            <p className="text-slate-400 mb-6">
              Liderando la formación ejecutiva en la era digital con tecnología y mentores de clase mundial.
            </p>
            <div className="flex gap-4">
              <a className="size-10 rounded-full glass-card flex items-center justify-center text-slate-300 hover:text-primary transition-colors" href="#">
                <span className="material-symbols-outlined text-xl">share</span>
              </a>
              <a className="size-10 rounded-full glass-card flex items-center justify-center text-slate-300 hover:text-primary transition-colors" href="#">
                <span className="material-symbols-outlined text-xl">forum</span>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold mb-6 text-white">Programas</h4>
            <ul className="space-y-4 text-slate-400">
              <li><a className="hover:text-primary transition-colors" href="#">Executive MBA</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Liderazgo 4.0</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">IA para Negocios</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Finanzas Corporativas</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-6 text-white">Recursos</h4>
            <ul className="space-y-4 text-slate-400">
              <li><a className="hover:text-primary transition-colors" href="#">Webinars</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Blog</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Comunidad</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Podcast</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-6 text-white">Newsletter</h4>
            <p className="text-slate-400 mb-4 text-sm">Recibe tendencias en liderazgo e IA directamente en tu correo.</p>
            <div className="flex flex-col gap-3">
              <input className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:border-primary focus:ring-0 text-sm text-white outline-none" placeholder="tu@email.com" type="email"/>
              <button className="quartz-button py-2 rounded-lg font-bold text-sm transition-colors">Suscribirme</button>
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 text-sm">
          <p>© 2026 Driven Academy. Todos los derechos reservados.</p>
          <div className="flex gap-8">
            <a className="hover:text-slate-300 transition-colors" href="#">Privacidad</a>
            <a className="hover:text-slate-300 transition-colors" href="#">Términos</a>
            <a className="hover:text-slate-300 transition-colors" href="#">Cookies</a>
          </div>
        </div>
      </footer>
    </>
  );
}
