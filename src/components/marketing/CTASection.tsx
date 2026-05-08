export function CTASection() {
  return (
    <section className="py-24 max-w-7xl mx-auto px-6">
      <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-12 relative overflow-hidden">
        <div className="absolute -right-20 -top-20 opacity-10">
          <span className="material-symbols-outlined text-[300px] text-white">apartment</span>
        </div>
        <div className="max-w-2xl relative z-10">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
            ¿Buscas invertir en Real Estate Premium?
          </h2>
          <p className="text-white/70 text-lg mb-8 font-medium">
            Conectate con nuestros expertos para encontrar la propiedad perfecta que se adapte a tus objetivos de
            inversión.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="#contact"
              className="quartz-button px-8 py-3.5 rounded-xl font-bold hover:scale-105 transition-transform inline-block"
            >
              Agendar Consulta
            </a>
            <button className="bg-white/5 border-2 border-white/20 text-white px-8 py-3.5 rounded-xl font-bold hover:bg-white/10 transition-colors">
              Descargar Catálogo
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
