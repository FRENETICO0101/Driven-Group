export function CTASection() {
  return (
    <section className="py-24 max-w-7xl mx-auto px-6">
      <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-12 relative overflow-hidden">
        <div className="absolute -right-20 -top-20 opacity-10">
          <span className="material-symbols-outlined text-[300px] text-white">apartment</span>
        </div>
        <div className="max-w-2xl relative z-10">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
            Transforma tu visión en inversión
          </h2>
          <p className="text-white/70 text-lg mb-8 font-medium">
            Conecta con asesores especializados en patrimonio inmobiliario corporativo. Diseñamos estrategias que perduran.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="#contact"
              className="quartz-button px-8 py-3.5 rounded-xl font-bold hover:scale-105 transition-transform inline-block"
            >
              Agendar Consulta
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
