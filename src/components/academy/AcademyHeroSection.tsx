import Image from "next/image";

export function AcademyHeroSection() {
  return (
    <header className="relative bg-white pt-16 sm:pt-20">
      <div className="relative flex min-h-screen items-center overflow-hidden sm:min-h-[85vh] md:min-h-[90vh]">
        <div className="absolute inset-0 z-0">
          <div className="hero-gradient absolute inset-0 z-10" />
          <Image
            alt="Sesión ejecutiva de aprendizaje financiero de Driven Academy"
            className="image-zoom h-full w-full object-cover"
            src="/images1/academy-driven-financial-workshop.png"
            fill
            priority
            sizes="100vw"
          />
        </div>

        <div className="absolute right-8 top-8 z-30 text-center">
          <span className="material-symbols-outlined block text-2xl text-white">school</span>
          <p className="mt-2 text-xs font-semibold tracking-widest text-white">ACADEMY</p>
        </div>

        <div className="relative z-20 mx-auto w-full max-w-7xl px-6 sm:px-8">
          <div className="max-w-3xl">
            <p className="editorial-label fade-in-delay-50 mb-4 text-white/60">LANZAMIENTO OFICIAL — DRIVEN ACADEMY</p>
            <h1 className="fade-in-delay-100 mb-4 font-serif text-5xl italic leading-[1.1] tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl">Modo Rico</h1>
            <p className="fade-in-delay-150 mb-2 text-lg font-light text-white/80 sm:text-xl">Una nueva forma de entender el dinero.</p>
            <p className="fade-in-delay-150 mb-10 text-lg font-light text-gray sm:text-xl">Una nueva forma de vivir.</p>
            <a
              href="https://driven-academy.com/modo-rico"
              target="_blank"
              rel="noreferrer"
              className="fade-in-delay-200 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-gray transition-colors hover:text-white sm:text-base"
            >
              <span>QUIERO APLICAR ESTE MÉTODO</span>
              <span className="material-symbols-outlined text-lg">north_east</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
