import { useTranslations } from "next-intl";
import type { Property } from "@/lib/types";
import { PropertyCard } from "@/components/real-estate/PropertyCard";
import { Icon } from "@/components/ui/Icon";

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop";

interface FeaturedPropertiesProps {
  properties: Property[];
}

export function FeaturedProperties({ properties }: FeaturedPropertiesProps) {
  const t = useTranslations("properties");

  return (
    <section className="py-24 sm:py-28 md:py-32 max-w-7xl mx-auto px-6 sm:px-8">
      <div className="mb-16 md:mb-24 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="editorial-label text-gray mb-4">{t("featured")}</p>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-black text-black tracking-tight leading-[1.1]">
            {t("exceptional")}
          </h2>
        </div>
        <a
          href="/real-estate"
          className="group inline-flex items-center gap-3 text-[13px] tracking-wide text-dark-gray transition-colors hover:text-black"
        >
          {t("viewAll")}
          <Icon name="arrow_outward" className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
        </a>
      </div>

      {properties.length === 0 ? (
        <p className="text-gray text-center py-24 editorial-label">{t("empty")}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 md:gap-10">
          {properties.map((property, index) => {
            const primaryImage = property.images?.[0];
            return (
              <PropertyCard
                key={property.id}
                image={primaryImage?.url ?? FALLBACK_IMAGE}
                imageAlt={primaryImage?.alt ?? property.title}
                title={property.title}
                slug={property.slug}
                priority={index < 4}
              />
            );
          })}
        </div>
      )}
    </section>
  );
}
