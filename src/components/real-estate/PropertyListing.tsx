import type { Property } from "@/lib/types";
import { formatPropertyPrice } from "@/lib/property-utils";
import Link from "next/link";

interface PropertyListingProps {
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

export function PropertyListing({ properties }: PropertyListingProps) {
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
      <div className="space-y-20 sm:space-y-28 md:space-y-32">
        {properties.map((property) => (
          <div key={property.id} className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left: Info */}
            <div className="flex flex-col justify-start">
              {/* Location */}
              <p className="text-slate-600 text-sm mb-4">{property.city}</p>

              {/* Title */}
              <h2 className="font-serif text-4xl md:text-5xl text-slate-900 leading-tight mb-4">
                {property.title}
              </h2>

              {/* Address */}
              <p className="text-slate-600 text-sm mb-6 leading-relaxed">
                {property.address}
              </p>

              {/* Description */}
              <p className="text-slate-700 text-base leading-relaxed mb-8">
                {property.description || "Activo inmobiliario de alto valor estratégico."}
              </p>

              {/* Specs Grid */}
              <div className="grid grid-cols-3 gap-8 mb-12 pb-8 border-b border-slate-200">
                {property.bedrooms > 0 && (
                  <div>
                    <p className="text-3xl sm:text-4xl font-black text-slate-900 mb-2">
                      {property.bedrooms}
                    </p>
                    <p className="editorial-label text-slate-400 text-xs">BEDROOMS</p>
                  </div>
                )}
                {property.bathrooms > 0 && (
                  <div>
                    <p className="text-3xl sm:text-4xl font-black text-slate-900 mb-2">
                      {property.bathrooms}
                    </p>
                    <p className="editorial-label text-slate-400 text-xs">BATHROOMS</p>
                  </div>
                )}
                <div>
                  <p className="text-3xl sm:text-4xl font-black text-slate-900 mb-2">
                    {property.squareFeet.toLocaleString()}
                  </p>
                  <p className="editorial-label text-slate-400 text-xs">SQ FT</p>
                </div>
              </div>

              {/* Price */}
              <p className="font-serif text-3xl md:text-4xl text-slate-900 mb-8">
                {formatPropertyPrice(property.price)}
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href={`/real-estate/${property.slug}`}
                  className="px-8 py-3 bg-slate-900 text-white text-sm font-semibold rounded-lg hover:bg-slate-800 transition-colors text-center"
                >
                  Schedule Tour
                </Link>
                <Link
                  href={`/real-estate/${property.slug}`}
                  className="px-8 py-3 border border-slate-300 text-slate-900 text-sm font-semibold rounded-lg hover:bg-slate-50 transition-colors text-center inline-flex items-center justify-center gap-2"
                >
                  VIEW DETAILS
                  <span className="material-symbols-outlined text-base">arrow_forward</span>
                </Link>
              </div>
            </div>

            {/* Right: Images Grid */}
            <div className="grid grid-cols-2 gap-4">
              {/* Main image (spans 2 rows on desktop) */}
              {property.images[0] && (
                <div className="col-span-2 md:col-span-1 md:row-span-2">
                  <img
                    src={property.images[0].url}
                    alt={property.images[0].alt || property.title}
                    className="w-full h-80 md:h-full object-cover rounded-lg"
                  />
                </div>
              )}

              {/* Secondary images */}
              {property.images.slice(1, 4).map((image, idx) => (
                <div key={idx} className="aspect-square">
                  <img
                    src={image.url}
                    alt={image.alt || `${property.title} - Image ${idx + 2}`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              ))}

              {/* Fallback images if not enough in property */}
              {property.images.length < 4 &&
                Array.from({ length: 4 - property.images.length }).map((_, idx) => (
                  <div key={`fallback-${idx}`} className="aspect-square bg-slate-200 rounded-lg" />
                ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
