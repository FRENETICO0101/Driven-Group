export function AcademyCTA() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20 sm:px-8 sm:py-24 md:py-32">
      <div className="rounded-2xl bg-black p-10 text-center shadow-2xl sm:p-16 md:p-20">
        <p className="editorial-label mb-4 text-white/40">OFERTA DE LANZAMIENTO</p>
        <h2 className="mx-auto mb-6 max-w-2xl font-serif text-3xl font-black leading-[1.2] text-white sm:text-4xl md:text-5xl">
          Empieza a construir una vida financiera con dirección.
        </h2>
        <p className="mx-auto mb-4 max-w-xl text-lg leading-relaxed text-white/60">
          Sé parte de la primera generación de Modo Rico y aplica un método práctico desde el primer día.
        </p>
        <p className="mb-10 text-sm font-semibold uppercase tracking-wide text-gray">
          Acceso online 24/7 · Formación práctica · Garantía de 7 días
        </p>

        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          <a
            href="https://driven-academy.com/modo-rico"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-7 py-3.5 text-sm font-bold text-black transition-transform hover:-translate-y-0.5 hover:bg-gray"
          >
            QUIERO APLICAR ESTE MÉTODO
            <span className="material-symbols-outlined text-base">north_east</span>
          </a>
          <a href="#modulos" className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/30 px-7 py-3.5 text-sm font-bold text-white transition-colors hover:bg-white/10">
            VER LA CURRÍCULA
            <span className="material-symbols-outlined text-base">arrow_upward</span>
          </a>
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-6 text-xs tracking-widest text-white/40">
          <span>ACCESO ONLINE 24/7</span>
          <span>COMUNIDAD PRIVADA</span>
          <span>GARANTÍA DE 7 DÍAS</span>
        </div>
      </div>
    </section>
  );
}
