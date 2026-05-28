import Image from "next/image";
import Link from "next/link";

export function AcademyHeroSection() {
  return (
    <header className="relative bg-white pt-16 sm:pt-20">
      <div className="relative min-h-screen sm:min-h-[85vh] md:min-h-[90vh] flex items-center overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 hero-gradient z-10" />
          <Image
            alt="Modo Rico by Driven Academy"
            className="image-zoom w-full h-full object-cover"
            src="/images1/academy-hero.jpg"
            fill
            priority
            sizes="100vw"
          />
        </div>

        {/* ACADEMY indicator - top right */}
        <div className="absolute top-8 right-8 z-30 text-center">
          <span className="material-symbols-outlined text-white text-2xl block">school</span>
          <p className="text-white text-xs tracking-widest font-semibold mt-2">ACADEMY</p>
        </div>

        {/* Content */}
        <div className="relative z-20 max-w-7xl mx-auto w-full px-6 sm:px-8">
          <div className="max-w-3xl">
            <p className="fade-in-delay-50 editorial-label text-white/60 mb-4">LANZAMIENTO OFICIAL — DRIVEN ACADEMY</p>

            <h1 className="fade-in-delay-100 font-serif italic text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[1.1] mb-4 text-white tracking-tight">
              Modo Rico
            </h1>

            <p className="fade-in-delay-150 text-lg sm:text-xl text-white/80 mb-2 font-light">
              Una nueva forma de entender el dinero.
            </p>
            <p className="fade-in-delay-150 text-lg sm:text-xl text-gray mb-10 font-light">
              Una nueva forma de vivir.
            </p>

            <div className="fade-in-delay-200">
              <Link
                href="#programa"
                className="inline-flex items-center gap-2 text-gray hover:text-dark-gray transition-colors text-sm sm:text-base font-semibold tracking-wide uppercase"
              >
                <span>ASEGURA TU LUGAR</span>
                <span className="material-symbols-outlined text-lg">arrow_forward</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
