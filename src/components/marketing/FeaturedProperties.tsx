import type { Property } from "@/lib/types";
import { formatPropertyPrice, formatPropertySubtitle, getPropertyBadge } from "@/lib/property-utils";
import { PropertyCard } from "@/components/real-estate/PropertyCard";

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop";

interface FeaturedPropertiesProps {
  properties: Property[];
}

export function FeaturedProperties({ properties }: FeaturedPropertiesProps) {
  return (
    <section className="py-24 sm:py-28 md:py-32 max-w-7xl mx-auto px-6 sm:px-8">
      <div className="mb-16 sm:mb-20">
        <p className="editorial-label text-slate-400 mb-3">INVESTMENT OPPORTUNITIES</p>
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 mb-4 tracking-tight">Featured Properties</h2>
        <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed font-light">
          Carteras seleccionadas para inversionistas que buscan consolidar su patrimonio en ubicaciones excepcionales.
        </p>
      </div>

      {properties.length === 0 ? (
        <p className="text-slate-400 text-center py-24 editorial-label">Próximamente nuevas oportunidades de inversión.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10">
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
