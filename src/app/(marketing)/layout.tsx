/**
 * Driven Group - Marketing Layout
 * Layout for public-facing pages (landing, properties, about, etc)
 */
import type { ReactNode } from "react";

export default function MarketingLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      {/* Navigation */}
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

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="border-t border-white/5 bg-black py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div>
              <h3 className="text-white font-bold mb-4">Driven Group</h3>
              <p className="text-slate-400 text-sm">Plataforma premium de Real Estate</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Propiedades</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li>
                  <a href="/real-estate" className="hover:text-primary transition-colors">
                    Listado
                  </a>
                </li>
                <li>
                  <a href="/real-estate?type=residential" className="hover:text-primary transition-colors">
                    Residencial
                  </a>
                </li>
                <li>
                  <a href="/real-estate?type=commercial" className="hover:text-primary transition-colors">
                    Comercial
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Empresa</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li>
                  <a href="/about" className="hover:text-primary transition-colors">
                    Nosotros
                  </a>
                </li>
                <li>
                  <a href="/contact" className="hover:text-primary transition-colors">
                    Contacto
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Privacidad
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Términos
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/5 pt-8 flex justify-between items-center">
            <p className="text-slate-400 text-sm">© 2026 Driven Group. Todos los derechos reservados.</p>
            <div className="flex gap-4">
              <a href="#" className="text-slate-400 hover:text-primary transition-colors">
                <span className="material-symbols-outlined text-xl">facebook</span>
              </a>
              <a href="#" className="text-slate-400 hover:text-primary transition-colors">
                <span className="material-symbols-outlined text-xl">language</span>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
