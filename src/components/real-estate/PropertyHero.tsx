import { formatPropertyPrice } from '@/lib/property-utils';
import type { Property } from '@/lib/types';

interface PropertyHeroProps {
  property: Property;
  badge: string;
  badgeFeatured: boolean;
}

export function PropertyHero({ property, badge, badgeFeatured }: PropertyHeroProps) {
  return (
    <section className="mb-8 rounded-2xl border border-light-gray bg-white p-5 shadow-[0_12px_32px_rgba(37,37,37,0.05)] sm:mb-10 sm:p-7">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <p className="editorial-label mb-3 text-gray">{property.city} · {property.state}</p>
          <h1 className="font-serif text-3xl font-bold text-black sm:text-4xl md:text-5xl">{property.title}</h1>
          <p className="mt-3 text-gray text-sm sm:text-base">
            {property.address}, {property.city}, {property.state}
          </p>
        </div>
        <div
          className={
            badgeFeatured
              ? 'bg-black text-white hover:bg-dark-gray transition-colors text-xs font-black px-3 py-1 rounded uppercase whitespace-nowrap'
              : 'bg-black text-white text-xs font-black px-3 py-1 rounded uppercase border border-black/20 whitespace-nowrap'
          }
        >
          {badge}
        </div>
      </div>

      <div className="mt-6 flex items-baseline gap-2">
        <span className="font-serif text-3xl font-bold text-black sm:text-4xl">
          {formatPropertyPrice(property.price)}
        </span>
        <span className="text-gray text-sm">USD</span>
      </div>

      <div className="mt-6 grid grid-cols-3 divide-x divide-light-gray overflow-hidden rounded-xl border border-light-gray bg-light-gray/10">
        {property.bedrooms > 0 && (
          <div className="p-3 sm:p-4">
            <span className="material-symbols-outlined text-gray">bed</span>
            <div className="mt-1">
              <p className="text-xl font-bold text-black sm:text-2xl">{property.bedrooms}</p>
              <p className="text-xs text-gray uppercase">Habitaciones</p>
            </div>
          </div>
        )}
        {property.bathrooms > 0 && (
          <div className="p-3 sm:p-4">
            <span className="material-symbols-outlined text-gray">shower</span>
            <div className="mt-1">
              <p className="text-xl font-bold text-black sm:text-2xl">{property.bathrooms}</p>
              <p className="text-xs text-gray uppercase">Baños</p>
            </div>
          </div>
        )}
        {property.squareFeet > 0 && (
          <div className="p-3 sm:p-4">
            <span className="material-symbols-outlined text-gray">square_foot</span>
            <div className="mt-1">
              <p className="text-xl font-bold text-black sm:text-2xl">{property.squareFeet.toLocaleString()}</p>
              <p className="text-xs text-gray uppercase">m²</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
