import type { Property } from "@/lib/types";
import { formatPropertyPrice } from "@/lib/property-utils";
import Link from "next/link";
import Image from "next/image";

interface PropertyListingProps {
  properties: Property[];
}

function EmptyState() {
  return (
    <div className="col-span-full flex flex-col items-center justify-center py-24 text-center">
      <div className="w-16 h-16 rounded-full bg-white border border-light-gray flex items-center justify-center mb-6">
        <span className="material-symbols-outlined text-gray text-2xl">search_off</span>
      </div>
      <h3 className="text-black font-semibold text-lg mb-2">Sin resultados</h3>
      <p className="text-dark-gray text-sm max-w-xs leading-relaxed">
        No encontramos propiedades con los filtros seleccionados. Intenta ajustar tu búsqueda.
      </p>
    </div>
  );
}

// Componente para tarjeta compacta de propiedad (1 imagen)
function CompactPropertyCard({ property }: { property: Property }) {
  return (
    <Link href={`/real-estate/${property.slug}`} className="group block h-full">
      <article className="flex flex-col h-full">
        {/* Image */}
        <div className="relative aspect-square overflow-hidden bg-pale rounded-lg mb-4">
          <Image
            src={property.images[0]?.url || "/images1/property-1.jpg"}
            alt={property.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          />
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col gap-3">
          <p className="editorial-label text-gray text-xs">{property.city}</p>
          <h3 className="font-serif text-lg text-black group-hover:text-dark-gray transition-colors">
            {property.title}
          </h3>
          <p className="text-dark-gray text-sm leading-relaxed line-clamp-2">
            {property.description || "Activo inmobiliario de alto valor."}
          </p>
          <div className="mt-auto pt-4 border-t border-light-gray flex items-center justify-between">
            <p className="font-serif text-base text-black">{formatPropertyPrice(property.price)}</p>
            <span
              className="material-symbols-outlined text-light-gray group-hover:text-black transition-colors"
              style={{ fontSize: "16px" }}
            >
              arrow_outward
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}

// Componente para tarjeta grande (3 imágenes)
function LargePropertyCard({ property }: { property: Property }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-start">
      {/* Left: Info */}
      <div className="flex flex-col justify-start">
        {/* Location */}
        <p className="text-dark-gray text-sm mb-4">{property.city}</p>

        {/* Title */}
        <h2 className="font-serif text-4xl md:text-5xl text-black leading-tight mb-4">
          {property.title}
        </h2>

        {/* Address */}
        <p className="text-dark-gray text-sm mb-6 leading-relaxed">
          {property.address}
        </p>

        {/* Description */}
        <p className="text-dark-gray text-base leading-relaxed mb-8">
          {property.description || "Activo inmobiliario de alto valor estratégico."}
        </p>

        {/* Specs Grid */}
        <div className="grid grid-cols-3 gap-8 mb-12 pb-8 border-b border-light-gray">
          {property.bedrooms > 0 && (
            <div>
              <p className="text-3xl sm:text-4xl font-black text-black mb-2">
                {property.bedrooms}
              </p>
              <p className="editorial-label text-gray text-xs">BEDROOMS</p>
            </div>
          )}
          {property.bathrooms > 0 && (
            <div>
              <p className="text-3xl sm:text-4xl font-black text-black mb-2">
                {property.bathrooms}
              </p>
              <p className="editorial-label text-gray text-xs">BATHROOMS</p>
            </div>
          )}
          <div>
            <p className="text-3xl sm:text-4xl font-black text-black mb-2">
              {property.squareFeet.toLocaleString()}
            </p>
            <p className="editorial-label text-gray text-xs">SQ FT</p>
          </div>
        </div>

        {/* Price */}
        <p className="font-serif text-3xl md:text-4xl text-black mb-8">
          {formatPropertyPrice(property.price)}
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href={`/real-estate/${property.slug}`}
            className="px-8 py-3 bg-black text-white text-sm font-semibold rounded-lg hover:bg-black transition-colors text-center"
          >
            Schedule Tour
          </Link>
          <Link
            href={`/real-estate/${property.slug}`}
            className="px-8 py-3 border border-light-gray text-black text-sm font-semibold rounded-lg hover:bg-white transition-colors text-center inline-flex items-center justify-center gap-2"
          >
            VIEW DETAILS
            <span className="material-symbols-outlined text-base">arrow_forward</span>
          </Link>
        </div>
      </div>

      {/* Right: Images Grid - 3 images layout */}
      <div className="space-y-4">
        {/* Floorplan - Full width or left side on desktop */}
        {property.images[0] && (
          <div className="relative w-full h-64 md:h-80 overflow-hidden rounded-lg bg-pale">
            <Image
              src={property.images[0].url}
              alt={property.images[0].alt || `${property.title} - Floor Plan`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 45vw, 40vw"
              className="w-full h-full object-cover hover:scale-[1.02] transition-transform duration-700"
            />
            <div className="absolute bottom-3 left-3 editorial-label px-2 py-1 bg-white/90 text-ink text-xs">
              FLOOR PLAN
            </div>
          </div>
        )}

        {/* Renders - Side by side on desktop, stacked on mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {property.images[1] && (
            <div className="relative w-full h-48 sm:h-56 overflow-hidden rounded-lg bg-pale">
              <Image
                src={property.images[1].url}
                alt={property.images[1].alt || `${property.title} - Render 1`}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 45vw, 18vw"
                className="w-full h-full object-cover hover:scale-[1.02] transition-transform duration-700"
              />
            </div>
          )}
          {property.images[2] && (
            <div className="relative w-full h-48 sm:h-56 overflow-hidden rounded-lg bg-pale">
              <Image
                src={property.images[2].url}
                alt={property.images[2].alt || `${property.title} - Render 2`}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 45vw, 18vw"
                className="w-full h-full object-cover hover:scale-[1.02] transition-transform duration-700"
              />
            </div>
          )}

          {/* Fallback placeholders if not enough images */}
          {property.images.length < 3 &&
            Array.from({ length: 3 - property.images.length }).map((_, idx) => (
              <div
                key={`fallback-${idx}`}
                className="w-full h-48 sm:h-56 bg-pale rounded-lg border border-light-gray"
              />
            ))}
        </div>
      </div>
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

  // Split properties: first 3 large, remaining compact
  const largeProperties = properties.slice(0, 3);
  const compactProperties = properties.slice(3);

  return (
    <section className="px-6 sm:px-8 max-w-7xl mx-auto pb-24">
      {/* Featured Properties - Large Layout (3 images each) */}
      <div className="space-y-20 sm:space-y-28 md:space-y-32 mb-24">
        {largeProperties.map((property) => (
          <LargePropertyCard key={property.id} property={property} />
        ))}
      </div>

      {/* Additional Properties - Compact Grid (single image) */}
      {compactProperties.length > 0 && (
        <div>
          <h3 className="font-serif text-2xl md:text-3xl text-black mb-12">More Properties</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {compactProperties.map((property) => (
              <CompactPropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
