import { useTranslations } from "next-intl";
import type { Property } from "@/lib/types";
import Link from "next/link";

interface PropertyListingProps {
  properties: Property[];
}

function EmptyState() {
  const t = useTranslations("properties");
  return (
    <div className="col-span-full flex flex-col items-center justify-center py-24 text-center">
      <div className="w-16 h-16 rounded-full bg-white border border-light-gray flex items-center justify-center mb-6">
        <span className="material-symbols-outlined text-gray text-2xl">search_off</span>
      </div>
      <h3 className="text-black font-semibold text-lg mb-2">{t("empty")}</h3>
      <p className="text-dark-gray text-sm max-w-xs leading-relaxed">
        {t("emptyDesc")}
      </p>
    </div>
  );
}

export function PropertyListing({ properties }: PropertyListingProps) {
  const tListing = useTranslations("listing");
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
      <div className="space-y-16 sm:space-y-20">
        {properties.map((property) => (
          <article key={property.id} className="wealth-interactive group grid grid-cols-1 gap-8 rounded-2xl border border-light-gray bg-white p-5 shadow-[0_16px_40px_rgba(37,37,37,0.06)] sm:p-7 lg:grid-cols-2 lg:gap-12 lg:p-8 xl:gap-16">
            {/* Left: Info */}
            <div className="flex flex-col justify-center lg:py-4">
              {/* Location */}
              <p className="editorial-label text-gray mb-4">{property.city} · {property.state}</p>

              {/* Title */}
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-black leading-tight mb-4">
                {property.title}
              </h2>

              {/* Address */}
              <p className="text-dark-gray text-sm mb-6 leading-relaxed">
                {property.address}
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href={`/real-estate/${property.slug}`}
                  className="px-7 py-3 bg-black text-white text-sm font-semibold rounded-lg hover:bg-dark-gray transition-colors text-center"
                >
                  {tListing("scheduleTour")}
                </Link>
                <Link
                  href={`/real-estate/${property.slug}`}
                  className="px-7 py-3 border border-light-gray text-black text-sm font-semibold rounded-lg hover:border-dark-gray hover:bg-light-gray/10 transition-colors text-center inline-flex items-center justify-center gap-2"
                >
                  {tListing("viewDetails")}
                  <span className="material-symbols-outlined text-base">arrow_forward</span>
                </Link>
              </div>
            </div>

            {/* Right: Curated image composition */}
            <div className="grid grid-cols-[1.12fr_0.88fr] gap-3 sm:gap-4">
              <div className="aspect-[4/5] overflow-hidden rounded-xl bg-light-gray/20">
                {property.images[0] && (
                  <img src={property.images[0].url} alt={property.images[0].alt || property.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                )}
              </div>
              <div className="flex flex-col gap-3 sm:gap-4">
                <div className="aspect-[4/3] overflow-hidden rounded-xl bg-light-gray/20">
                  {property.images[1] && (
                    <img src={property.images[1].url} alt={property.images[1].alt || `${property.title} - Image 2`} className="h-full w-full object-cover" />
                  )}
                </div>
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  {[property.images[2], property.images[3]].map((image, idx) => (
                    <div key={image?.url ?? `fallback-${idx}`} className="aspect-square overflow-hidden rounded-xl bg-light-gray/20">
                      {image && <img src={image.url} alt={image.alt || `${property.title} - Image ${idx + 3}`} className="h-full w-full object-cover" />}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
