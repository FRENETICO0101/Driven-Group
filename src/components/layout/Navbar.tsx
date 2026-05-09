export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/5 bg-black/90 backdrop-blur-md" aria-label="Navegación principal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
        <div className="flex items-center gap-4 sm:gap-10">
          <a href="/" className="flex items-center gap-2 sm:gap-3 focus:outline-none focus:ring-2 focus:ring-primary rounded">
            <div className="size-6 sm:size-8 text-primary/90 shrink-0" aria-hidden="true">
              <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path
                  clipRule="evenodd"
                  d="M24 0.757355L47.2426 24L24 47.2426L0.757355 24L24 0.757355ZM21 35.7574V12.2426L9.24264 24L21 35.7574Z"
                  fill="currentColor"
                  fillRule="evenodd"
                ></path>
              </svg>
            </div>
            <h2 className="text-base sm:text-xl font-black tracking-tight uppercase text-white">Driven Group</h2>
          </a>
          <div className="hidden md:flex items-center gap-6 lg:gap-8 text-slate-300">
            <a className="text-sm font-medium hover:text-primary transition-colors" href="/real-estate">
              Portfolio
            </a>
            <a className="text-sm font-medium hover:text-primary transition-colors" href="/about">
              El Grupo
            </a>
            <a className="text-sm font-medium hover:text-primary transition-colors" href="/academy">
              Academy
            </a>
            <a className="text-sm font-medium hover:text-primary transition-colors" href="/contact">
              Contacto
            </a>
          </div>
        </div>
        <div className="flex items-center gap-3 sm:gap-6">
          <button className="quartz-button px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg font-bold text-xs sm:text-sm transition-all">
            Agendar
          </button>
        </div>
      </div>
    </nav>
  );
}
