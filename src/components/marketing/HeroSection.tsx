export function HeroSection() {
  return (
    <header className="relative min-h-[90vh] flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 hero-gradient z-10"></div>
        <img
          alt="Luxury Real Estate"
          className="w-full h-full object-cover grayscale-[0.3] brightness-[0.7]"
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=800&fit=crop"
        />
      </div>
      <div className="relative z-20 max-w-7xl mx-auto px-6 w-full">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-primary/90 text-xs font-bold uppercase tracking-widest mb-6">
            <span className="material-symbols-outlined text-sm">real_estate_agent</span> Luxury Real Estate Platform
          </div>
          <h1 className="text-5xl md:text-7xl font-black leading-[1.1] mb-8 text-white">
            Donde el <span className="text-primary/90">patrimonio</span> toma forma
          </h1>
          <p className="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed max-w-2xl">
            Carteras inmobiliarias curadas para inversionistas que buscan consolidar su legado en ubicaciones de ensueño.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="/real-estate"
              className="quartz-button px-8 py-4 rounded-xl font-extrabold text-lg hover:scale-105 transition-transform inline-block text-center"
            >
              Explorar Portfolio
            </a>
            <button className="glass-card px-8 py-4 rounded-xl font-bold text-lg text-white hover:bg-white/10 transition-colors">
              Agendar Consulta
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
