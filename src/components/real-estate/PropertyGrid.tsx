import type { Property } from "@/lib/types";
import { PropertyCard } from "./PropertyCard";
import {
  formatPropertyPrice,
  formatPropertySubtitle,
  getPropertyBadge,
} from "@/lib/property-utils";

interface PropertyGridProps {
  properties: Property[];
}

function EmptyState() {
  return (
    <div className="col-span-full flex flex-col items-center justify-center py-24 text-center">
      <div className="w-16 h-16 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center mb-6">
        <span className="material-symbols-outlined text-slate-400 text-2xl">search_off</span>
      </div>
      <h3 className="text-slate-900 font-semibold text-lg mb-2">Sin resultados</h3>
      <p className="text-slate-600 text-sm max-w-xs leading-relaxed">
        No encontramos propiedades con los filtros seleccionados. Intenta ajustar tu búsqueda.
      </p>
    </div>
  );
}

export function PropertyGrid({ properties }: PropertyGridProps) {
  if (properties.length === 0) {
    return (
      <section className="px-6 sm:px-8 max-w-7xl mx-auto pb-24">
        <div className="grid">
          <EmptyState />
        </div>
      </section>
    );
  }

  return (
    <section className="px-6 sm:px-8 max-w-7xl mx-auto pb-24">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
        {properties.map((property) => {
          const badge = getPropertyBadge(property.type);
          const firstImage = property.images[0];

          return (
            <PropertyCard
              key={property.id}
              image={
                firstImage?.url ??
                "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop"
              }
              imageAlt={firstImage?.alt ?? property.title}
              badge={badge.label}
              badgeFeatured={badge.featured}
              price={formatPropertyPrice(property.price)}
              title={property.title}
              subtitle={formatPropertySubtitle(property)}
              description={property.description ?? "Activo inmobiliario de alto valor estratégico."}
              features={[
                ...(property.bedrooms > 0
                  ? [{ icon: "bed", label: `${property.bedrooms} amb` }]
                  : []),
                ...(property.bathrooms > 0
                  ? [{ icon: "bathtub", label: `${property.bathrooms} baños` }]
                  : []),
                { icon: "square_foot", label: `${property.squareFeet} m²` },
              ]}
              slug={property.slug}
            />
          );
        })}
      </div>
    </section>
  );
}
