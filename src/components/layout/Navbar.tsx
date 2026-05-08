export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/5 bg-black/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-10">
          <div className="flex items-center gap-3">
            <div className="size-8 text-primary/90">
              <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path
                  clipRule="evenodd"
                  d="M24 0.757355L47.2426 24L24 47.2426L0.757355 24L24 0.757355ZM21 35.7574V12.2426L9.24264 24L21 35.7574Z"
                  fill="currentColor"
                  fillRule="evenodd"
                ></path>
              </svg>
            </div>
            <h2 className="text-xl font-black tracking-tight uppercase text-white">Driven Group</h2>
          </div>
          <div className="hidden md:flex items-center gap-8 text-slate-300">
            <a className="text-sm font-medium hover:text-primary transition-colors" href="/real-estate">
              Propiedades
            </a>
            <a className="text-sm font-medium hover:text-primary transition-colors" href="/about">
              Nosotros
            </a>
            <a className="text-sm font-medium hover:text-primary transition-colors" href="/contact">
              Contacto
            </a>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="hidden lg:flex items-center bg-white/5 rounded-lg px-3 py-1.5 border border-white/10">
            <span className="material-symbols-outlined text-slate-400 text-xl">search</span>
            <input
              className="bg-transparent border-none focus:ring-0 text-sm placeholder:text-slate-500 w-48 text-white outline-none"
              placeholder="Buscar propiedades..."
              type="text"
            />
          </div>
          <button className="quartz-button px-6 py-2.5 rounded-lg font-bold text-sm transition-all">
            Iniciar sesión
          </button>
        </div>
      </div>
    </nav>
  );
}
