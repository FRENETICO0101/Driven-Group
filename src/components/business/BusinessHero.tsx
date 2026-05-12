interface BusinessHeroProps {
  title: string;
  description: string;
}

export function BusinessHero({ title, description }: BusinessHeroProps) {
  return (
    <section className="pt-20 sm:pt-24 pb-12 sm:pb-16 px-6 sm:px-8 max-w-7xl mx-auto">
      <div className="max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-slate-600 text-xs font-bold uppercase tracking-widest mb-6">
          <span className="material-symbols-outlined text-sm">business</span>
          Business Units
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black leading-[1.1] mb-6 text-slate-900">
          {title}
        </h1>
        <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-xl">
          {description}
        </p>
      </div>
    </section>
  );
}
