export function AcademyCTA() {
  return (
    <section className="py-20 sm:py-24 md:py-32 px-6 sm:px-8 max-w-7xl mx-auto">
      <div className="bg-black rounded-lg p-12 sm:p-16 md:p-20 text-center">
        <p className="editorial-label text-white/40 mb-4">OFERTA DE LANZAMIENTO</p>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-black text-white leading-[1.2] mb-6 max-w-2xl mx-auto">
          Activa tu Modo Rico
        </h2>
        <p className="text-white/60 text-lg leading-relaxed max-w-xl mx-auto mb-4">
          Sé parte de esta nueva generación financieramente libre.
        </p>
        <p className="text-gray font-semibold text-sm tracking-wide uppercase mb-12">
          Por tiempo limitado · Acceso inmediato · Garantía de satisfacción
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
          <input
            type="email"
            placeholder="Tu correo electrónico"
            className="flex-1 px-6 py-3 border border-white/20 bg-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-gray"
          />
          <button className="px-8 py-3 bg-gray text-black text-sm font-bold rounded-lg hover:bg-dark-gray transition-colors whitespace-nowrap">
            ASEGURA TU LUGAR AHORA
          </button>
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-6 text-white/40 text-xs tracking-widest">
          <span>∞ CONTENIDO DE POR VIDA</span>
          <span>⚡ ACCESO INMEDIATO</span>
          <span>✓ GARANTÍA DE SATISFACCIÓN</span>
        </div>
      </div>
    </section>
  );
}
