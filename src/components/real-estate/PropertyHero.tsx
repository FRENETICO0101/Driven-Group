import type { Property } from "@/lib/types";

interface PropertyHeroProps { property: Property; badge: string; badgeFeatured: boolean; }
interface PropertyFact { icon: string; label: string; value: string; }

export function PropertyHero({ property, badge, badgeFeatured }: PropertyHeroProps) {
  const facts: PropertyFact[] = [
    property.bedrooms > 0 ? { icon: "bed", label: "Habitaciones", value: String(property.bedrooms) } : null,
    property.bathrooms > 0 ? { icon: "shower", label: "Baños", value: String(property.bathrooms) } : null,
  ].filter((fact): fact is PropertyFact => fact !== null);
  const factsGridClass = facts.length === 1 ? "sm:grid-cols-1" : "sm:grid-cols-2";

  return <section className="mb-8 overflow-hidden rounded-2xl border border-light-gray bg-white shadow-[0_12px_32px_rgba(37,37,37,0.05)] sm:mb-10">
    <div className="flex flex-col gap-6 p-5 sm:p-7 lg:flex-row lg:items-start lg:justify-between">
      <div className="min-w-0 flex-1"><p className="editorial-label mb-3 text-gray">{property.city} · {property.state}</p><h1 className="max-w-4xl font-serif text-3xl font-bold leading-[1.08] text-black sm:text-4xl md:text-5xl">{property.title}</h1><p className="mt-3 max-w-3xl text-sm leading-relaxed text-dark-gray sm:text-base">{property.address}, {property.city}, {property.state}</p></div>
      <div className="flex items-center justify-between gap-3 lg:flex-col lg:items-end"><span className="inline-flex rounded-md bg-black px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-white">{badgeFeatured ? "Destacado" : badge}</span><span className="text-xs font-semibold uppercase tracking-[0.14em] text-gray">{property.status === "ACTIVE" ? "Disponible" : property.status}</span></div>
    </div>
    {facts.length > 0 && <div className={`grid border-t border-light-gray bg-light-gray/10 ${factsGridClass}`}>{facts.map((fact) => <div key={fact.label} className="flex min-w-32 items-center gap-3 border-b border-light-gray px-5 py-4 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0 sm:px-6 sm:py-5"><span className="material-symbols-outlined text-lg text-dark-gray">{fact.icon}</span><div><p className="text-lg font-bold leading-none text-black sm:text-xl">{fact.value}</p><p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-gray">{fact.label}</p></div></div>)}</div>}
  </section>;
}
