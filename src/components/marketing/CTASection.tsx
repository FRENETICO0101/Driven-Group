export function CTASection() {
  return (
    <section className="py-24 sm:py-28 md:py-32 max-w-7xl mx-auto px-6 sm:px-8">
      <div className="border border-slate-200 rounded-xl sm:rounded-2xl p-12 sm:p-16 md:p-20 relative overflow-hidden">
        <div className="absolute -right-32 -top-32 opacity-5">
          <span className="material-symbols-outlined text-[400px] text-slate-900">apartment</span>
        </div>
        <div className="max-w-3xl relative z-10">
          <p className="editorial-label text-slate-400 mb-4">LET'S TALK</p>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight leading-[1.1]">
            Transforma tu visión en inversión
          </h2>
          <p className="text-lg sm:text-xl text-slate-600 mb-8 sm:mb-10 leading-[1.8] font-light max-w-2xl">
            Conecta con asesores especializados en patrimonio inmobiliario corporativo. Diseñamos estrategias que consolidan y perduran.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
            <a href="/contact" className="quartz-button px-8 sm:px-10 py-4 rounded-lg sm:rounded-xl font-semibold text-base transition-all hover:scale-105 inline-block text-center">
              Schedule Consultation
            </a>
            <a href="/real-estate" className="border border-slate-300 px-8 sm:px-10 py-4 rounded-lg sm:rounded-xl font-semibold text-base text-slate-700 hover:text-slate-900 hover:bg-slate-50 transition-all inline-block text-center">
              Explore Properties
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
