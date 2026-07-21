import { getLocale } from "next-intl/server";
import type { Property } from "@/lib/types";
import type { CatalogProperty } from "@/lib/property-catalog";
import { PropertyMap } from "./PropertyMap";

interface PropertyDetailsProps {
  property: Property | CatalogProperty;
}

const copy = {
  es: { specifications: "Especificaciones", yearBuilt: "Año construido", lot: "Lote", status: "Estado", available: "Disponible", type: "Tipo", amenities: "Servicios y amenidades", description: "Descripción", floorplans: "Planos de planta", viewFloorplan: "Ver plano PDF", documents: "Brochures y documentos" },
  en: { specifications: "Specifications", yearBuilt: "Year built", lot: "Lot", status: "Status", available: "Available", type: "Type", amenities: "Amenities", description: "Description", floorplans: "Floor plans", viewFloorplan: "View floor plan PDF", documents: "Brochures and documents" },
};

export async function PropertyDetails({ property }: PropertyDetailsProps) {
  const locale = await getLocale();
  const t = copy[locale === "en" ? "en" : "es"];
  const specs = [
    { label: t.yearBuilt, value: property.yearBuilt?.toString() },
    { label: t.status, value: property.status === "ACTIVE" ? t.available : property.status },
    { label: t.type, value: property.type },
  ].filter((spec) => spec.value !== null && spec.value !== undefined);
  const amenities = property.amenities || [];

  return (
    <div className="space-y-10 sm:space-y-14">
      <section>
        <h2 className="mb-4 text-xl font-bold text-black sm:mb-6 sm:text-2xl">{t.specifications}</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
          {specs.map((spec) => <div key={spec.label} className="rounded-xl border border-light-gray bg-white p-4 text-center shadow-[0_8px_20px_rgba(37,37,37,0.04)] sm:p-5"><p className="mb-2 text-xs font-semibold uppercase text-gray">{spec.label}</p><p className="text-base font-bold text-black sm:text-lg">{spec.value}</p></div>)}
        </div>
      </section>

      {amenities.length > 0 && <section><h2 className="mb-4 text-xl font-bold text-black sm:mb-6 sm:text-2xl">{t.amenities}</h2><div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-3 lg:grid-cols-3">{amenities.map((amenity) => <div key={amenity} className="flex items-center gap-3 rounded-xl border border-light-gray bg-white p-3 sm:p-4"><span className="material-symbols-outlined shrink-0 text-lg text-primary/70">check_circle</span><span className="text-xs capitalize text-dark-gray sm:text-sm">{amenity}</span></div>)}</div></section>}

      {property.description && <section><h2 className="mb-4 text-xl font-bold text-black sm:mb-6 sm:text-2xl">{t.description}</h2><div className="max-w-4xl border-l-2 border-dark-gray pl-5 sm:pl-6"><p className="text-base leading-[1.8] text-dark-gray sm:text-lg">{property.description}</p></div></section>}

      {"resources" in property && property.resources.floorplans.length > 0 && <section><h2 className="mb-4 text-xl font-bold text-black sm:mb-6 sm:text-2xl">{t.floorplans}</h2><div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">{property.resources.floorplans.map((floorplan) => <a key={floorplan.documentUrl} href={floorplan.documentUrl} target="_blank" rel="noreferrer" className="group flex items-center gap-4 rounded-xl border border-light-gray bg-white p-4 transition-all hover:border-dark-gray hover:shadow-sm sm:p-5"><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-light-gray bg-white text-dark-gray"><span className="material-symbols-outlined leading-none">architecture</span></span><span className="min-w-0 flex-1"><span className="block truncate font-semibold text-black">{floorplan.name}</span><span className="mt-1 block text-sm text-dark-gray">{t.viewFloorplan}</span></span><span className="material-symbols-outlined text-dark-gray transition-transform group-hover:translate-x-1">arrow_forward</span></a>)}</div></section>}

      {"resources" in property && property.resources.brochures.length > 0 && <section><h2 className="mb-4 text-xl font-bold text-black sm:mb-6 sm:text-2xl">{t.documents}</h2><div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">{property.resources.brochures.map((brochure) => <a key={brochure.url} href={brochure.url} target="_blank" rel="noreferrer" className="group flex items-center gap-4 rounded-xl border border-light-gray bg-white p-4 text-sm text-black transition-all hover:border-dark-gray hover:shadow-sm"><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-light-gray bg-white text-dark-gray"><span className="material-symbols-outlined leading-none">article</span></span><span className="min-w-0 flex-1 truncate font-semibold">{brochure.name}</span><span className="material-symbols-outlined text-dark-gray transition-transform group-hover:translate-x-1">open_in_new</span></a>)}</div></section>}
      <PropertyMap property={property} />
    </div>
  );
}
