import Image from "next/image";
import Link from 'next/link';

export function HeroSection() {
  return (
    <header className="relative min-h-screen sm:min-h-[85vh] md:min-h-[90vh] flex items-end overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 hero-gradient z-10" />
        <Image
          alt="Luxury Real Estate"
          className="image-zoom w-full h-full object-cover grayscale-[0.18] brightness-[0.72]"
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&h=1080&fit=crop&q=90"
          fill
          priority
          sizes="100vw"
        />
      </div>

      {/* Content — bottom-anchored for cinematic editorial feel */}
      <div className="relative z-20 max-w-7xl mx-auto w-full px-6 sm:px-8 pb-16 sm:pb-20 md:pb-24">
        <div className="max-w-2xl">

          {/* Eyebrow */}
          <p className="fade-in-delay-50 editorial-label text-white/50 mb-4">LUXURY INVESTMENT PLATFORM</p>

          {/* Headline */}
          <h1 className="fade-in-delay-100 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.1] md:leading-[1.05] mb-6 sm:mb-7 text-white tracking-tight">
            Donde el <em className="not-italic text-white/70">patrimonio</em><br className="hidden sm:block" /> toma forma
          </h1>

          {/* Body */}
          <p className="fade-in-delay-200 text-base sm:text-lg text-white/55 mb-10 sm:mb-12 leading-[1.75] max-w-xl font-light">
            Carteras inmobiliarias curadas para inversionistas<br className="hidden md:block" /> que consolidan su legado en ubicaciones excepcionales.
          </p>

          {/* CTAs */}
          <div className="fade-in-delay-300 flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Link
              href="/real-estate"
              className="quartz-button px-7 sm:px-9 py-3.5 sm:py-4 rounded-xl font-semibold text-sm sm:text-base tracking-wide hover:scale-[1.02] transition-transform inline-block text-center"
            >
              Explorar Portfolio
            </Link>
            <button className="px-7 sm:px-9 py-3.5 sm:py-4 rounded-xl font-semibold text-sm sm:text-base tracking-wide text-white/80 border border-white/15 hover:border-white/30 hover:text-white hover:bg-white/5 transition-all duration-300">
              Agendar Consulta
            </button>
          </div>

          {/* Scroll indicator */}
          <div className="fade-in-delay-400 hidden sm:flex items-center gap-3 mt-14 sm:mt-16">
            <div className="w-px h-8 bg-white/20" />
            <span className="editorial-label text-white/35">Scroll para explorar</span>
          </div>

        </div>
      </div>
    </header>
  );
}
