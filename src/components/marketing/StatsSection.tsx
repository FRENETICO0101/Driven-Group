export function StatsSection() {
  return (
    <section className="py-20 sm:py-24 md:py-32 border-y border-slate-200 bg-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Top Row - 4 Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 sm:gap-16 mb-16 sm:mb-20 md:mb-24 pb-16 sm:pb-20 md:pb-24 border-b border-slate-200">
          {/* Total Sales Volume */}
          <div>
            <p className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 mb-2">$2.8B</p>
            <p className="editorial-label text-slate-400 text-xs mb-3">TOTAL SALES VOLUME</p>
            <p className="text-slate-600 text-sm font-medium">Featured Residences</p>
          </div>

          {/* Properties Sold */}
          <div>
            <p className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 mb-2">500+</p>
            <p className="editorial-label text-slate-400 text-xs">PROPERTIES SOLD</p>
          </div>

          {/* Years Experience */}
          <div>
            <p className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 mb-2">20+</p>
            <p className="editorial-label text-slate-400 text-xs">YEARS EXPERIENCE</p>
          </div>

          {/* Client Satisfaction */}
          <div>
            <p className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 mb-2">98%</p>
            <p className="editorial-label text-slate-400 text-xs">CLIENT SATISFACTION</p>
          </div>
        </div>

        {/* Bottom Row - 3 Stats + Link */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 sm:gap-16 items-end">
          {/* Years Trayectoria */}
          <div>
            <p className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 mb-2">15+</p>
            <p className="editorial-label text-slate-400 text-xs mb-4">AÑOS TRAYECTORIA</p>
            <div className="space-y-1">
              <p className="text-slate-700 font-semibold text-sm">Exceptional</p>
              <p className="text-slate-700 font-semibold text-sm">Properties</p>
            </div>
          </div>

          {/* Properties */}
          <div>
            <p className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 mb-2">120+</p>
            <p className="editorial-label text-slate-400 text-xs">PROPIEDADES</p>
          </div>

          {/* Investors */}
          <div className="flex flex-col md:flex-row md:justify-between md:items-end">
            <div>
              <p className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 mb-2">35+</p>
              <p className="editorial-label text-slate-400 text-xs">INVERSIONISTAS</p>
            </div>
            <a href="/real-estate" className="mt-6 md:mt-0 inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors text-sm font-semibold">
              <span>View All Residences</span>
              <span className="material-symbols-outlined text-base">arrow_forward</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
