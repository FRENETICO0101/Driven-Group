export function Footer() {
  return (
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
  );
}
