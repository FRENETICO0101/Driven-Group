export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-black py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 md:gap-12 mb-8 sm:mb-12">
          <div className="col-span-2 sm:col-span-1">
            <h3 className="text-white font-bold mb-2 sm:mb-4 text-sm sm:text-base">Driven Group</h3>
            <p className="text-slate-400 text-xs sm:text-sm">Plataforma premium de Real Estate</p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-2 sm:mb-4 text-xs sm:text-sm">Propiedades</h4>
            <ul className="space-y-1 sm:space-y-2 text-slate-400 text-xs sm:text-sm">
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
            <h4 className="text-white font-semibold mb-2 sm:mb-4 text-xs sm:text-sm">Empresa</h4>
            <ul className="space-y-1 sm:space-y-2 text-slate-400 text-xs sm:text-sm">
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
            <h4 className="text-white font-semibold mb-2 sm:mb-4 text-xs sm:text-sm">Legal</h4>
            <ul className="space-y-1 sm:space-y-2 text-slate-400 text-xs sm:text-sm">
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
        <div className="border-t border-white/5 pt-6 sm:pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-slate-400 text-xs sm:text-sm text-center sm:text-left">© 2026 Driven Group. Todos los derechos reservados.</p>
          <div className="flex gap-4">
            <a href="#" className="text-slate-400 hover:text-primary transition-colors">
              <span className="material-symbols-outlined text-lg sm:text-xl">facebook</span>
            </a>
            <a href="#" className="text-slate-400 hover:text-primary transition-colors">
              <span className="material-symbols-outlined text-lg sm:text-xl">language</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
