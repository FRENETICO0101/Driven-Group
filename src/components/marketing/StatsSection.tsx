export function StatsSection() {
  return (
    <section className="py-20 sm:py-24 md:py-28 border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-3 gap-8 sm:gap-12 md:gap-16">
          <div>
            <p className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 mb-3">15+</p>
            <p className="editorial-label text-slate-400">AÑOS TRAYECTORIA</p>
          </div>
          <div>
            <p className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 mb-3">120+</p>
            <p className="editorial-label text-slate-400">PROPIEDADES</p>
          </div>
          <div>
            <p className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 mb-3">35+</p>
            <p className="editorial-label text-slate-400">INVERSIONISTAS</p>
          </div>
        </div>
      </div>
    </section>
  );
}
