import Image from "next/image";
import Link from "next/link";

export function RealEstateHeroSection() {
  return (
    <header className="relative bg-white pt-16 sm:pt-20">
      <div className="relative min-h-screen sm:min-h-[85vh] md:min-h-[90vh] flex items-center overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 hero-gradient z-10" />
          <Image
            alt="Luxury Real Estate Portfolio"
            className="image-zoom w-full h-full object-cover"
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&h=1080&fit=crop&q=90"
            fill
            priority
            sizes="100vw"
          />
        </div>

        {/* REAL ESTATE indicator - top right */}
        <div className="absolute top-8 right-8 z-30 text-center">
          <span className="material-symbols-outlined text-white text-2xl block">apartment</span>
          <p className="text-white text-xs tracking-widest font-semibold mt-2">REAL ESTATE</p>
        </div>

        {/* Content */}
        <div className="relative z-20 max-w-7xl mx-auto w-full px-6 sm:px-8">
          <div className="max-w-3xl">
            <h1 className="fade-in-delay-100 font-serif italic text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.2] md:leading-[1.15] mb-8 sm:mb-10 text-white tracking-tight">
              Premium Properties for Strategic Investors
            </h1>

            <p className="fade-in-delay-150 text-lg sm:text-xl text-white/80 mb-8 leading-relaxed max-w-2xl">
              Curated portfolio of exceptional assets across the globe's most desirable locations
            </p>

            <div className="fade-in-delay-200">
              <Link
                href="#listings"
                className="inline-flex items-center gap-2 text-yellow-400 hover:text-yellow-300 transition-colors text-sm sm:text-base font-semibold tracking-wide uppercase"
              >
                <span>BROWSE PORTFOLIO</span>
                <span className="material-symbols-outlined text-lg">arrow_forward</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
