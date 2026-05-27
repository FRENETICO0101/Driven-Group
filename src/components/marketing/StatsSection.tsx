export function StatsSection() {
  return (
    <section className="py-20 sm:py-24 md:py-32 border-y border-light-gray bg-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* 4 Main Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 md:gap-16">
          {/* Total Sales Volume */}
          <div>
            <p className="text-4xl sm:text-5xl md:text-6xl font-black text-black mb-2">$2.8B</p>
            <p className="editorial-label text-gray text-xs">TOTAL SALES VOLUME</p>
          </div>

          {/* Properties Sold */}
          <div>
            <p className="text-4xl sm:text-5xl md:text-6xl font-black text-black mb-2">500+</p>
            <p className="editorial-label text-gray text-xs">PROPERTIES SOLD</p>
          </div>

          {/* Years Experience */}
          <div>
            <p className="text-4xl sm:text-5xl md:text-6xl font-black text-black mb-2">20+</p>
            <p className="editorial-label text-gray text-xs">YEARS EXPERIENCE</p>
          </div>

          {/* Client Satisfaction */}
          <div>
            <p className="text-4xl sm:text-5xl md:text-6xl font-black text-black mb-2">98%</p>
            <p className="editorial-label text-gray text-xs">CLIENT SATISFACTION</p>
          </div>
        </div>

      </div>
    </section>
  );
}
