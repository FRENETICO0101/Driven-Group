import type { Property } from "@/lib/types";
import { formatPropertyPrice, formatPropertySubtitle, getPropertyBadge } from "@/lib/property-utils";
import { PropertyCard } from "@/components/real-estate/PropertyCard";

const FALLBACK_IMAGE = "/images1/property-1.jpg";

interface FeaturedPropertiesProps {
  properties: Property[];
}

export function FeaturedProperties({ properties }: FeaturedPropertiesProps) {
  return (
    <section className="py-24 sm:py-28 md:py-36 border-t border-pale">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">

        {/* Header */}
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between mb-16 sm:mb-20">
          <div>
            <p className="editorial-label text-gray mb-3">Featured Residences</p>
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-ink tracking-tight leading-[1.05] text-balance">
              Exceptional<br className="hidden sm:block" /> Properties
            </h2>
          </div>
          <a
            href="/real-estate"
            className="arrow-link text-gray hover:text-ink shrink-0 mb-1"
          >
            <span>View All Residences</span>
            <span
              className="material-symbols-outlined"
              style={{ fontSize: "12px", fontVariationSettings: "'wght' 200" }}
            >
              arrow_outward
            </span>
          </a>
        </div>

        {properties.length === 0 ? (
          <p className="editorial-label text-gray text-center py-24">
            Próximamente nuevas oportunidades de inversión.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 md:gap-12">
            {properties.map((property) => {
              const badge        = getPropertyBadge(property.type);
              const primaryImage = property.images?.[0];
              const features     = [];

              if (property.bedrooms  > 0) features.push({ icon: "bed",        label: `${property.bedrooms} Dorm` });
              if (property.bathrooms > 0) features.push({ icon: "bathroom",   label: `${property.bathrooms} Baños` });
              if (features.length   === 0) features.push({ icon: "aspect_ratio", label: `${property.squareFeet} m²` });

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

      </div>
    </section>
  );
}
