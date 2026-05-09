import type { Property } from "@/lib/types";
import { formatPropertyPrice, formatPropertySubtitle, getPropertyBadge } from "@/lib/property-utils";
import { PropertyCard } from "@/components/real-estate/PropertyCard";

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop";

interface FeaturedPropertiesProps {
  properties: Property[];
}

export function FeaturedProperties({ properties }: FeaturedPropertiesProps) {
  return (
    <section className="py-24 max-w-7xl mx-auto px-6">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
        <div>
          <h2 className="text-4xl font-black text-primary/90">Investment Opportunities</h2>
          <p className="text-slate-400 text-lg max-w-xl">
            Carteras seleccionadas para inversionistas que buscan consolidar su patrimonio en ubicaciones de excelencia.
          </p>
        </div>
        <a
          className="text-primary/80 font-bold flex items-center gap-2 group hover:text-primary transition-colors"
          href="/real-estate"
        >
          Ver todas las oportunidades
          <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">arrow_forward</span>
        </a>
      </div>

      {properties.length === 0 ? (
        <p className="text-slate-500 text-center py-16">Próximamente nuevas oportunidades de inversión.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property) => {
            const badge = getPropertyBadge(property.type);
            const primaryImage = property.images?.[0];
            const features = [];
            if (property.bedrooms > 0)
              features.push({ icon: "bed", label: `${property.bedrooms} Dorm` });
            if (property.bathrooms > 0)
              features.push({ icon: "bathroom", label: `${property.bathrooms} Baños` });
            if (features.length === 0)
              features.push({ icon: "aspect_ratio", label: `${property.squareFeet} m²` });

            return (
              <PropertyCard
                key={property.id}
                image={primaryImage?.url ?? FALLBACK_IMAGE}
                imageAlt={primaryImage?.alt ?? property.title}
                badge={badge.label}
                badgeFeatured={badge.featured}
                price={formatPropertyPrice(property.price)}
                title={property.title}
                subtitle={formatPropertySubtitle(property)}
                description={property.description ?? ""}
                features={features}
                slug={property.slug}
              />
            );
          })}
        </div>
      )}
    </section>
  );
}
