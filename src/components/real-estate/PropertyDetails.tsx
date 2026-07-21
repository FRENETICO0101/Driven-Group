import type { Property } from '@/lib/types';
import type { CatalogProperty } from '@/lib/property-catalog';
import { PropertyMap } from './PropertyMap';

interface PropertyDetailsProps {
  property: Property | CatalogProperty;
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
    <div className="space-y-10 sm:space-y-14">
      {/* Specs Grid */}
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-black mb-4 sm:mb-6">Especificaciones</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {specs.map((spec) => (
            <div
              key={spec.label}
              className="bg-white p-4 sm:p-5 rounded-xl text-center border border-light-gray shadow-[0_8px_20px_rgba(37,37,37,0.04)]"
            >
              <p className="text-gray text-xs uppercase font-semibold mb-2">
                {spec.label}
              </p>
              <p className="text-black font-bold text-base sm:text-lg">{spec.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Amenities */}
      {amenities.length > 0 && (
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-black mb-4 sm:mb-6">Servicios & Amenities</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
            {amenities.map((amenity) => (
              <div
                key={amenity}
              className="bg-white p-3 sm:p-4 rounded-xl border border-light-gray flex items-center gap-3"
              >
                <span className="material-symbols-outlined text-primary/70 text-lg shrink-0">check_circle</span>
                <span className="text-dark-gray text-xs sm:text-sm capitalize">{amenity}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Editorial Description */}
      {property.description && (
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-black mb-4 sm:mb-6">Descripción</h2>
          <div className="max-w-4xl border-l-2 border-dark-gray pl-5 sm:pl-6">
            <p className="text-dark-gray leading-[1.8] text-base sm:text-lg">
              {property.description}
            </p>
          </div>
        </div>
      )}

      {'resources' in property && property.resources.floorplans.length > 0 && (
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-black mb-4 sm:mb-6">Planos de planta</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {property.resources.floorplans.map((floorplan) => (
              <a
                key={floorplan.documentUrl}
                href={floorplan.documentUrl}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-4 border border-light-gray rounded-xl bg-white p-4 sm:p-5 hover:border-dark-gray hover:shadow-sm transition-all"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-light-gray bg-white text-dark-gray">
                  <span className="material-symbols-outlined leading-none">architecture</span>
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold text-black">{floorplan.name}</p>
                  <p className="text-sm text-dark-gray mt-1">Ver plano PDF</p>
                </div>
                <span className="material-symbols-outlined text-dark-gray transition-transform group-hover:translate-x-1">arrow_forward</span>
              </a>
            ))}
          </div>
        </div>
      )}

      {'resources' in property && property.resources.brochures.length > 0 && (
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-black mb-4 sm:mb-6">Brochures y documentos</h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
            {property.resources.brochures.map((brochure) => (
              <a key={brochure.url} href={brochure.url} target="_blank" rel="noreferrer" className="group flex items-center gap-4 rounded-xl border border-light-gray bg-white p-4 text-sm text-black transition-all hover:border-dark-gray hover:shadow-sm">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-light-gray bg-white text-dark-gray">
                  <span className="material-symbols-outlined leading-none">article</span>
                </span>
                <span className="min-w-0 flex-1 truncate font-semibold">{brochure.name}</span>
                <span className="material-symbols-outlined text-dark-gray transition-transform group-hover:translate-x-1">open_in_new</span>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Dynamic Map Component (Placeholder) */}
      <PropertyMap property={property} />
    </div>
  );
}
