export function StatsSection() {
  return (
    <section className="py-20 sm:py-24 md:py-32 border-y border-slate-200 bg-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* 4 Main Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 md:gap-16 mb-16 sm:mb-20 md:mb-24">
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

        {/* Additional text and link - bottom right */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-6">
          <div className="space-y-1">
            <p className="text-slate-700 font-semibold text-sm">Exceptional</p>
            <p className="text-slate-700 font-semibold text-sm">Properties</p>
          </div>
          <a href="/real-estate" className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors text-sm font-semibold">
            <span>View All Residences</span>
            <span className="material-symbols-outlined text-base">arrow_forward</span>
          </a>
        </div>
      </div>
    </section>
  );
}
