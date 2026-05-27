import { formatPropertyPrice } from '@/lib/property-utils';
import type { Property } from '@/lib/types';

interface PropertyHeroProps {
  property: Property;
  badge: string;
  badgeFeatured: boolean;
}

export function PropertyHero({ property, badge, badgeFeatured }: PropertyHeroProps) {
  return (
    <div className="space-y-4 mb-8">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <h1 className="text-4xl font-bold text-black mb-2">{property.title}</h1>
          <p className="text-gray text-lg">
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

      <div className="flex items-baseline gap-2">
        <span className="text-4xl font-bold text-black">
          {formatPropertyPrice(property.price)}
        </span>
        <span className="text-gray text-sm">USD</span>
      </div>

      <div className="grid grid-cols-3 gap-4 pt-4 border-t border-light-gray">
        {property.bedrooms > 0 && (
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-gray">bed</span>
            <div>
              <p className="text-2xl font-bold text-black">{property.bedrooms}</p>
              <p className="text-xs text-gray uppercase">Habitaciones</p>
            </div>
          </div>
        )}
        {property.bathrooms > 0 && (
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-gray">shower</span>
            <div>
              <p className="text-2xl font-bold text-black">{property.bathrooms}</p>
              <p className="text-xs text-gray uppercase">Baños</p>
            </div>
          </div>
        )}
        {property.squareFeet > 0 && (
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-gray">square_foot</span>
            <div>
              <p className="text-2xl font-bold text-black">{property.squareFeet.toLocaleString()}</p>
              <p className="text-xs text-gray uppercase">m²</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
