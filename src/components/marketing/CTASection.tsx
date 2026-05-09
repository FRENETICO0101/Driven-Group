export function CTASection() {
  return (
    <section className="py-16 sm:py-20 md:py-24 max-w-7xl mx-auto px-4 sm:px-6">
      <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 relative overflow-hidden">
        <div className="absolute -right-20 -top-20 opacity-10">
          <span className="material-symbols-outlined text-[200px] sm:text-[300px] text-white">apartment</span>
        </div>
        <div className="max-w-2xl relative z-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4 sm:mb-6">
            Transforma tu visión en inversión
          </h2>
          <p className="text-white/70 text-base sm:text-lg mb-6 sm:mb-8 font-medium leading-relaxed">
            Conecta con asesores especializados en patrimonio inmobiliario corporativo. Diseñamos estrategias que perduran.
          </p>
          <div className="flex flex-wrap gap-3 sm:gap-4">
            <a
              href="#contact"
              className="quartz-button px-6 sm:px-8 py-3 sm:py-3.5 rounded-lg sm:rounded-xl font-bold text-sm sm:text-base hover:scale-105 transition-transform inline-block"
            >
              Agendar Consulta
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
