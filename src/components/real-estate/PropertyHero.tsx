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
          <h1 className="text-4xl font-bold text-white mb-2">{property.title}</h1>
          <p className="text-slate-400 text-lg">
            {property.address}, {property.city}, {property.state}
          </p>
        </div>
        <div
          className={
            badgeFeatured
              ? 'quartz-button text-xs font-black px-3 py-1 rounded uppercase whitespace-nowrap'
              : 'bg-slate-800 text-primary/90 text-xs font-black px-3 py-1 rounded uppercase border border-white/20 whitespace-nowrap'
          }
        >
          {badge}
        </div>
      </div>

      <div className="flex items-baseline gap-2">
        <span className="text-4xl font-bold text-white">
          {formatPropertyPrice(property.price)}
        </span>
        <span className="text-slate-400 text-sm">USD</span>
      </div>

      <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-700/50">
        {property.bedrooms > 0 && (
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-slate-400">bed</span>
            <div>
              <p className="text-2xl font-bold text-white">{property.bedrooms}</p>
              <p className="text-xs text-slate-500 uppercase">Habitaciones</p>
            </div>
          </div>
        )}
        {property.bathrooms > 0 && (
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-slate-400">shower</span>
            <div>
              <p className="text-2xl font-bold text-white">{property.bathrooms}</p>
              <p className="text-xs text-slate-500 uppercase">Baños</p>
            </div>
          </div>
        )}
        {property.squareFeet > 0 && (
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-slate-400">square_foot</span>
            <div>
              <p className="text-2xl font-bold text-white">{property.squareFeet.toLocaleString()}</p>
              <p className="text-xs text-slate-500 uppercase">m²</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
