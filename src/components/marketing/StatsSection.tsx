export function StatsSection() {
  return (
    <section className="py-12 sm:py-16 md:py-20 border-y border-white/5 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 md:gap-12">
          <div className="text-center py-4 sm:py-0">
            <p className="text-3xl sm:text-4xl md:text-5xl font-black text-primary/90 mb-2">15+</p>
            <p className="text-slate-400 font-medium uppercase tracking-tighter text-xs sm:text-sm md:text-base">
              Años de Trayectoria
            </p>
          </div>
          <div className="text-center py-4 sm:py-0">
            <p className="text-3xl sm:text-4xl md:text-5xl font-black text-primary/90 mb-2">120+</p>
            <p className="text-slate-400 font-medium uppercase tracking-tighter text-xs sm:text-sm md:text-base">
              Propiedades en Portafolio
            </p>
          </div>
          <div className="text-center py-4 sm:py-0">
            <p className="text-3xl sm:text-4xl md:text-5xl font-black text-primary/90 mb-2">35+</p>
            <p className="text-slate-400 font-medium uppercase tracking-tighter text-xs sm:text-sm md:text-base">
              Inversionistas Corporativos
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
