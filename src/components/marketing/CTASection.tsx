export function CTASection() {
  return (
    <section className="py-24 sm:py-28 md:py-36 border-t border-pale">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-end">

          {/* Left: editorial copy */}
          <div>
            <p className="editorial-label text-gray mb-5 tracking-[0.22em]">
              Private Consultation
            </p>
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-ink tracking-tight leading-[1.05] mb-8 text-balance">
              Transforma tu visión en inversión
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-5">
              <a
                href="/contact"
                className="quartz-button border border-pale px-8 py-3.5 text-sm font-semibold rounded inline-block text-center"
              >
                Schedule Consultation
              </a>
              <a
                href="/real-estate"
                className="outline-button px-8 py-3.5 text-sm font-semibold rounded inline-block text-center"
              >
                Explore Properties
              </a>
            </div>
          </div>

          {/* Right: editorial body */}
          <div className="lg:pb-1">
            <p className="text-base sm:text-lg text-dark-gray leading-[1.9] font-light">
              Conecta con asesores especializados en patrimonio inmobiliario corporativo. Diseñamos estrategias que consolidan y perduran.
            </p>
            <div className="mt-8 pt-8 border-t border-pale flex items-center gap-8">
              <div>
                <p className="font-serif text-2xl text-ink">Miami</p>
                <p className="editorial-label text-gray mt-1">Headquarters</p>
              </div>
              <div className="w-px h-8 bg-pale" />
              <div>
                <a
                  href="tel:+13055550123"
                  className="font-serif text-2xl text-ink hover:text-dark-gray transition-colors"
                >
                  +1 (305) 555-0123
                </a>
                <p className="editorial-label text-gray mt-1">Direct Line</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
