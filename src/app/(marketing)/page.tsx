/**
 * Driven Group - Real Estate Platform
 * Landing Page / Homepage
 */

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <header className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 hero-gradient z-10"></div>
          <img
            alt="Luxury Real Estate"
            className="w-full h-full object-cover grayscale-[0.3] brightness-[0.7]"
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=800&fit=crop"
          />
        </div>
        <div className="relative z-20 max-w-7xl mx-auto px-6 w-full">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-primary/90 text-xs font-bold uppercase tracking-widest mb-6">
              <span className="material-symbols-outlined text-sm">real_estate_agent</span> Experiencia Inmobiliaria Premium
            </div>
            <h1 className="text-5xl md:text-7xl font-black leading-[1.1] mb-8 text-white">
              Encontrá tu <span className="text-primary/90">próxima inversión</span> premium
            </h1>
            <p className="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed max-w-2xl">
              Descubrí propiedades exclusivas, ubicaciones privilegiadas y oportunidades de inversión diseñadas para inversionistas exigentes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="/real-estate"
                className="quartz-button px-8 py-4 rounded-xl font-extrabold text-lg hover:scale-105 transition-transform inline-block text-center"
              >
                Explorar Propiedades
              </a>
              <button className="glass-card px-8 py-4 rounded-xl font-bold text-lg text-white hover:bg-white/10 transition-colors">
                Contactar Agente
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Stats Section */}
      <section className="py-16 border-y border-white/5 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-3 gap-8 md:gap-12">
            <div className="text-center">
              <p className="text-4xl md:text-5xl font-black text-primary/90">+500</p>
              <p className="text-slate-400 font-medium uppercase tracking-tighter text-sm md:text-base">Propiedades Listadas</p>
            </div>
            <div className="text-center">
              <p className="text-4xl md:text-5xl font-black text-primary/90">+50</p>
              <p className="text-slate-400 font-medium uppercase tracking-tighter text-sm md:text-base">Agentes Especializados</p>
            </div>
            <div className="text-center">
              <p className="text-4xl md:text-5xl font-black text-primary/90">+1000</p>
              <p className="text-slate-400 font-medium uppercase tracking-tighter text-sm md:text-base">Clientes Satisfechos</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <h2 className="text-4xl font-black text-primary/90">Propiedades Destacadas</h2>
            <p className="text-slate-400 text-lg max-w-xl">
              Selección exclusiva de propiedades premium en ubicaciones codiciadas con potencial de inversión.
            </p>
          </div>
          <a className="text-primary/80 font-bold flex items-center gap-2 group hover:text-primary transition-colors" href="/real-estate">
            Ver todas las propiedades
            <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">arrow_forward</span>
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Property Card 1 */}
          <div className="glass-card group overflow-hidden rounded-xl transition-all hover:-translate-y-2 flex flex-col">
            <div className="relative h-64 overflow-hidden">
              <img
                alt="Penthouse Luxury"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop"
              />
              <div className="absolute top-4 left-4 quartz-button text-xs font-black px-2 py-1 rounded uppercase">
                Destacado
              </div>
              <div className="absolute bottom-4 right-4 bg-slate-900/80 text-white px-3 py-1 rounded-lg text-sm font-bold">
                $950.000
              </div>
            </div>
            <div className="p-8 flex-1 flex flex-col">
              <h3 className="text-2xl font-bold mb-2 text-white">Penthouse Premium</h3>
              <p className="text-slate-400 text-sm mb-4">Dpto. 4 amb • 180 m² • Balcón con vista panorámica</p>
              <p className="text-slate-400 mb-6 line-clamp-2 leading-relaxed">
                Penthouse de lujo con vistas a la ciudad, acabados premium y amenities de clase mundial.
              </p>
              <div className="flex items-center gap-4 mt-auto text-slate-300 text-sm mb-4">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">bed</span> 4 Dorm
                </span>
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">bathroom</span> 2,5 Baños
                </span>
              </div>
              <button className="bg-primary/20 border border-primary/50 text-white px-4 py-2 rounded-lg font-semibold transition-colors hover:bg-primary hover:text-slate-900">
                Ver Detalles
              </button>
            </div>
          </div>

          {/* Property Card 2 */}
          <div className="glass-card group overflow-hidden rounded-xl transition-all hover:-translate-y-2 flex flex-col">
            <div className="relative h-64 overflow-hidden">
              <img
                alt="Casa Moderna"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                src="https://images.unsplash.com/photo-1570129477492-45a003537e1f?w=400&h=300&fit=crop"
              />
              <div className="absolute top-4 left-4 bg-slate-800 text-primary/90 text-xs font-black px-2 py-1 rounded uppercase border border-white/20">
                Nuevo
              </div>
              <div className="absolute bottom-4 right-4 bg-slate-900/80 text-white px-3 py-1 rounded-lg text-sm font-bold">
                $650.000
              </div>
            </div>
            <div className="p-8 flex-1 flex flex-col">
              <h3 className="text-2xl font-bold mb-2 text-white">Casa Contemporánea</h3>
              <p className="text-slate-400 text-sm mb-4">Casa 5 amb • 320 m² • Piscina y jardín</p>
              <p className="text-slate-400 mb-6 line-clamp-2 leading-relaxed">
                Casa moderna con diseño minimalista, espacios abiertos y zona de entretenimiento.
              </p>
              <div className="flex items-center gap-4 mt-auto text-slate-300 text-sm mb-4">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">bed</span> 5 Dorm
                </span>
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">bathroom</span> 3 Baños
                </span>
              </div>
              <button className="bg-primary/20 border border-primary/50 text-white px-4 py-2 rounded-lg font-semibold transition-colors hover:bg-primary hover:text-slate-900">
                Ver Detalles
              </button>
            </div>
          </div>

          {/* Property Card 3 */}
          <div className="glass-card group overflow-hidden rounded-xl transition-all hover:-translate-y-2 flex flex-col">
            <div className="relative h-64 overflow-hidden">
              <img
                alt="Oficina Premium"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop"
              />
              <div className="absolute top-4 left-4 bg-slate-800 text-primary/90 text-xs font-black px-2 py-1 rounded uppercase border border-white/20">
                Oportunidad
              </div>
              <div className="absolute bottom-4 right-4 bg-slate-900/80 text-white px-3 py-1 rounded-lg text-sm font-bold">
                $1.2M
              </div>
            </div>
            <div className="p-8 flex-1 flex flex-col">
              <h3 className="text-2xl font-bold mb-2 text-white">Espacio Comercial</h3>
              <p className="text-slate-400 text-sm mb-4">Oficina • 450 m² • Zona ejecutiva</p>
              <p className="text-slate-400 mb-6 line-clamp-2 leading-relaxed">
                Espacio comercial de lujo en zona financiera, ideal para oficinas corporativas.
              </p>
              <div className="flex items-center gap-4 mt-auto text-slate-300 text-sm mb-4">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">aspect_ratio</span> 450 m²
                </span>
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">location_on</span> Centro
                </span>
              </div>
              <button className="bg-primary/20 border border-primary/50 text-white px-4 py-2 rounded-lg font-semibold transition-colors hover:bg-primary hover:text-slate-900">
                Ver Detalles
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-12 relative overflow-hidden">
          <div className="absolute -right-20 -top-20 opacity-10">
            <span className="material-symbols-outlined text-[300px] text-white">apartment</span>
          </div>
          <div className="max-w-2xl relative z-10">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">¿Buscas invertir en Real Estate Premium?</h2>
            <p className="text-white/70 text-lg mb-8 font-medium">
              Conectate con nuestros expertos para encontrar la propiedad perfecta que se adapte a tus objetivos de inversión.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#contact"
                className="quartz-button px-8 py-3.5 rounded-xl font-bold hover:scale-105 transition-transform inline-block"
              >
                Agendar Consulta
              </a>
              <button className="bg-white/5 border-2 border-white/20 text-white px-8 py-3.5 rounded-xl font-bold hover:bg-white/10 transition-colors">
                Descargar Catálogo
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
