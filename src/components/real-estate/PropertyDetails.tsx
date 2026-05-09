import type { Property } from '@/lib/types';

interface PropertyDetailsProps {
  property: Property;
}

export function PropertyDetails({ property }: PropertyDetailsProps) {
  const specs = [
    { label: 'Año Construido', value: property.yearBuilt?.toString() },
    { label: 'Lote', value: property.lotSize ? `${property.lotSize.toLocaleString()} m²` : null },
    { label: 'Estado', value: property.status === 'ACTIVE' ? 'Disponible' : property.status },
    { label: 'Tipo', value: property.type },
  ].filter((spec) => spec.value !== null && spec.value !== undefined);

  const amenities = property.amenities || [];

  return (
    <div className="space-y-12">
      {/* Specs Grid */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-6">Especificaciones</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {specs.map((spec) => (
            <div
              key={spec.label}
              className="glass-card p-4 rounded-lg text-center border border-slate-700/30"
            >
              <p className="text-slate-400 text-xs uppercase font-semibold mb-2">
                {spec.label}
              </p>
              <p className="text-white font-bold text-lg">{spec.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Amenities */}
      {amenities.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-white mb-6">Servicios & Amenities</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {amenities.map((amenity) => (
              <div
                key={amenity}
                className="glass-card p-4 rounded-lg border border-slate-700/30 flex items-center gap-3"
              >
                <span className="material-symbols-outlined text-primary/70">check_circle</span>
                <span className="text-slate-200 text-sm capitalize">{amenity}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Editorial Description */}
      {property.description && (
        <div>
          <h2 className="text-2xl font-bold text-white mb-6">Descripción</h2>
          <div className="prose prose-invert max-w-none">
            <p className="text-slate-300 leading-relaxed text-lg">
              {property.description}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
