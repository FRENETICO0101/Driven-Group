export function StatsSection() {
  return (
    <section className="py-16 border-y border-white/5 bg-black">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-3 gap-8 md:gap-12">
          <div className="text-center">
            <p className="text-4xl md:text-5xl font-black text-primary/90">+500</p>
            <p className="text-slate-400 font-medium uppercase tracking-tighter text-sm md:text-base">
              Propiedades Listadas
            </p>
          </div>
          <div className="text-center">
            <p className="text-4xl md:text-5xl font-black text-primary/90">+50</p>
            <p className="text-slate-400 font-medium uppercase tracking-tighter text-sm md:text-base">
              Agentes Especializados
            </p>
          </div>
          <div className="text-center">
            <p className="text-4xl md:text-5xl font-black text-primary/90">+1000</p>
            <p className="text-slate-400 font-medium uppercase tracking-tighter text-sm md:text-base">
              Clientes Satisfechos
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
