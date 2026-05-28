import Image from "next/image";
import Link from "next/link";

export function AcademyHeroSection() {
  return (
    <header className="relative bg-ink">
      <div className="relative h-screen min-h-[640px] flex items-end overflow-hidden">

        {/* Background */}
        <div className="absolute inset-0 z-0">
          <Image
            alt="Modo Rico by Driven Academy"
            className="image-zoom w-full h-full object-cover"
            src="/images1/academy-hero.jpg"
            fill
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 hero-gradient z-10" />
        </div>

        {/* Page indicator */}
        <div className="absolute top-24 right-8 sm:right-10 z-30">
          <p className="editorial-label text-white/40" style={{ writingMode: "vertical-rl" }}>
            04 — ACADEMY
          </p>
        </div>

        {/* Content */}
        <div className="relative z-20 max-w-7xl mx-auto w-full px-6 sm:px-8 lg:px-12 pb-20 sm:pb-24">
          <div className="max-w-3xl">
            <p className="fade-in-delay-50 editorial-label text-white/50 mb-6 tracking-[0.22em]">
              Lanzamiento Oficial — Driven Academy
            </p>
            <h1 className="fade-in-delay-100 font-serif italic text-6xl sm:text-7xl md:text-8xl lg:text-[6rem] leading-[1.0] mb-5 text-white tracking-tight">
              Modo Rico
            </h1>
            <p className="fade-in-delay-150 text-base sm:text-lg text-white/60 mb-1 font-light">
              Una nueva forma de entender el dinero.
            </p>
            <p className="fade-in-delay-150 text-base sm:text-lg text-white/40 mb-10 font-light">
              Una nueva forma de vivir.
            </p>
            <div className="fade-in-delay-200">
              <Link
                href="#programa"
                className="arrow-link text-white/60 hover:text-white"
              >
                <span>Asegura Tu Lugar</span>
                <span
                  className="material-symbols-outlined"
                  style={{ fontSize: "12px", fontVariationSettings: "'wght' 200" }}
                >
                  arrow_forward
                </span>
              </Link>
            </div>
          </div>
        </div>

      </div>
    </header>
  );
}
