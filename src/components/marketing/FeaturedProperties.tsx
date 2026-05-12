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
      <div className="mb-16 md:mb-24 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="editorial-label text-slate-400 mb-4">Featured Residences</p>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 tracking-tight leading-[1.1]">
            Exceptional<br className="hidden md:block" /> Properties
          </h2>
        </div>
        <a
          href="/real-estate"
          className="group inline-flex items-center gap-3 text-[13px] tracking-wide text-slate-600 transition-colors hover:text-slate-900"
        >
          View All Residences
          <span className="material-symbols-outlined text-base transition-transform duration-500 group-hover:translate-x-1">arrow_outward</span>
        </a>
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
