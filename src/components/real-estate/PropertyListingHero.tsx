interface PropertyListingHeroProps {
  count: number;
}

export function PropertyListingHero({ count }: PropertyListingHeroProps) {
  return (
    <section className="pt-20 sm:pt-24 pb-12 sm:pb-16 px-6 sm:px-8 max-w-7xl mx-auto">
      <div className="max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-light-gray text-dark-gray text-xs font-bold uppercase tracking-widest mb-6">
          <span className="material-symbols-outlined text-sm">apartment</span>
          Portafolio de Activos
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-black leading-[1.1] mb-6 text-black">
          Activos con{" "}
          <span className="text-dark-gray">visión</span>
        </h1>
        <p className="text-dark-gray text-base sm:text-lg leading-relaxed max-w-xl">
          Una selección curada de inmuebles para inversionistas que construyen patrimonio con criterio.
        </p>
      </div>
      <div className="mt-10 pt-8 border-t border-light-gray">
        <span className="text-gray text-sm">
          {count === 0
            ? "Sin propiedades disponibles"
            : count === 1
            ? "1 propiedad disponible"
            : `${count} propiedades disponibles`}
        </span>
      </div>
    </section>
  );
}
