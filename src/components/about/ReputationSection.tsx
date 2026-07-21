export function ReputationSection() {
  return (
    <section className="py-20 sm:py-24 md:py-32 bg-white border-y border-light-gray">
      <div className="max-w-4xl mx-auto px-6 sm:px-8 text-center">
        <p className="editorial-label text-gray mb-8 tracking-[0.15em]">CORE PRINCIPLE</p>

        <blockquote className="mb-12">
          <p className="font-serif italic text-3xl sm:text-4xl md:text-5xl text-black leading-[1.3] tracking-tight mb-8">
            "Tu reputación es tu patrimonio más valioso"
          </p>
          <p className="text-lg text-dark-gray leading-relaxed font-light">
            Este principio guía cada decisión, cada alianza y cada interacción en Driven Group. Entendemos que en bienes raíces de lujo e inversión estratégica, la confianza es la moneda más valiosa. Construimos relaciones duraderas a través de integridad, transparencia y cumplimiento de promesas. No solo gestionamos propiedades—creamos un legado de confianza que trasciende transacciones.
          </p>
        </blockquote>

        {/* Supporting Stats */}
        <div className="grid grid-cols-3 gap-8 sm:gap-12 mt-16 pt-12 border-t border-light-gray">
          <div>
            <p className="text-3xl sm:text-4xl md:text-5xl font-black text-black mb-2">4+</p>
            <p className="editorial-label text-gray text-xs">AÑOS DE CONFIANZA</p>
          </div>
          <div>
            <p className="text-3xl sm:text-4xl md:text-5xl font-black text-black mb-2">3</p>
            <p className="editorial-label text-gray text-xs">DIVISIONES ESTRATÉGICAS</p>
          </div>
          <div>
            <p className="text-3xl sm:text-4xl md:text-5xl font-black text-black mb-2">100+</p>
            <p className="editorial-label text-gray text-xs">SOCIOS GLOBALES</p>
          </div>
        </div>
      </div>
    </section>
  );
}
