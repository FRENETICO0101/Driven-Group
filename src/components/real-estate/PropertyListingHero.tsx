interface PropertyListingHeroProps {
  count: number;
}

export function PropertyListingHero({ count }: PropertyListingHeroProps) {
  return (
    <section className="pt-28 sm:pt-32 md:pt-36 pb-12 sm:pb-16 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto border-b border-pale">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
        <div>
          <p className="editorial-label text-gray mb-4">Portafolio de Activos</p>
          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl text-ink tracking-tight leading-[1.0] text-balance">
            Activos con{" "}
            <span className="italic text-dark-gray">visión</span>
          </h1>
        </div>
        <p className="text-dark-gray text-base sm:text-lg leading-relaxed max-w-sm font-light">
          Una selección curada de inmuebles para inversionistas que construyen patrimonio con criterio.
        </p>
      </div>
      <div className="mt-10 pt-6 border-t border-pale">
        <span className="editorial-label text-gray">
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
