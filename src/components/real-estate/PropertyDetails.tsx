import { getLocale } from "next-intl/server";
import { getDownloadUrl } from "@vercel/blob";
import type { Property } from "@/lib/types";
import type { CatalogProperty } from "@/lib/property-catalog";
import { PropertyMap } from "./PropertyMap";

interface PropertyDetailsProps {
  property: Property | CatalogProperty;
}

const copy = {
  es: { specifications: "Especificaciones", bedrooms: "Habitaciones", priceFrom: "Precio desde", surface: "Superficie desde", deliveryDate: "Fecha de entrega", toBeConfirmed: "Por confirmar", amenities: "Servicios y amenidades", description: "Descripción", floorplans: "Planos de planta", viewFloorplan: "Visualizar", downloadFloorplan: "Descargar", documents: "Brochures y documentos" },
  en: { specifications: "Specifications", bedrooms: "Bedrooms", priceFrom: "Price from", surface: "Surface", deliveryDate: "Delivery date", toBeConfirmed: "To be confirmed", amenities: "Amenities", description: "Description", floorplans: "Floor plans", viewFloorplan: "View", downloadFloorplan: "Download", documents: "Brochures and documents" },
};

function documentDownloadUrl(url: string) {
  if (url.includes(".blob.vercel-storage.com/")) return getDownloadUrl(url);
  if (url.includes("res.cloudinary.com/") && url.includes("/upload/")) {
    return url.replace("/upload/", "/upload/fl_attachment/");
  }
  return url;
}

export async function PropertyDetails({ property }: PropertyDetailsProps) {
  const locale = await getLocale();
  const t = copy[locale === "en" ? "en" : "es"];
  const formatNumber = new Intl.NumberFormat(locale === "en" ? "en-US" : "es-MX");
  const specs = [
    { label: t.priceFrom, value: property.price > 0 ? `$${formatNumber.format(property.price)} USD` : t.toBeConfirmed },
    { label: t.surface, value: property.squareFeet > 0 ? `${formatNumber.format(property.squareFeet)} ft²` : t.toBeConfirmed },
    { label: t.bedrooms, value: property.bedroomsDisplay || (property.bedrooms > 0 ? formatNumber.format(property.bedrooms) : t.toBeConfirmed) },
    { label: t.deliveryDate, value: property.deliveryDate || t.toBeConfirmed },
  ];
  const amenities = property.amenities || [];
  const catalogResources = "resources" in property ? property.resources : undefined;
  const storedDocuments = "documents" in property ? (property.documents || []) : [];
  const documentsManaged = "documentsManaged" in property && property.documentsManaged;
  const useStoredDocuments = documentsManaged || storedDocuments.length > 0;
  const floorplans = useStoredDocuments
    ? storedDocuments.filter((document) => document.type === "FLOORPLAN").map((document) => ({ name: document.name, documentUrl: document.url }))
    : (catalogResources?.floorplans || []);
  const brochures = useStoredDocuments
    ? storedDocuments.filter((document) => document.type === "BROCHURE").map((document) => ({ name: document.name, url: document.url }))
    : (catalogResources?.brochures || []);

  return (
    <div className="space-y-10 sm:space-y-14">
      <section>
        <h2 className="mb-4 text-xl font-bold text-black sm:mb-6 sm:text-2xl">{t.specifications}</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          {specs.map((spec) => <div key={spec.label} className="rounded-xl border border-light-gray bg-white p-4 text-center shadow-[0_8px_20px_rgba(37,37,37,0.04)] sm:p-5"><p className="mb-2 text-xs font-semibold uppercase text-gray">{spec.label}</p><p className="text-base font-bold text-black sm:text-lg">{spec.value}</p></div>)}
        </div>
      </section>

      {amenities.length > 0 && <section><h2 className="mb-4 text-xl font-bold text-black sm:mb-6 sm:text-2xl">{t.amenities}</h2><div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-3 lg:grid-cols-3">{amenities.map((amenity) => <div key={amenity} className="flex items-center gap-3 rounded-xl border border-light-gray bg-white p-3 sm:p-4"><span className="material-symbols-outlined shrink-0 text-lg text-primary/70">check_circle</span><span className="text-xs text-dark-gray sm:text-sm">{amenity}</span></div>)}</div></section>}

      {property.description && <section><h2 className="mb-4 text-xl font-bold text-black sm:mb-6 sm:text-2xl">{t.description}</h2><div className="max-w-4xl border-l-2 border-dark-gray pl-5 sm:pl-6"><p className="whitespace-pre-wrap break-words text-justify text-base leading-[1.9] text-dark-gray [hyphens:auto] sm:text-lg">{property.description}</p></div></section>}

      {floorplans.length > 0 && <section><h2 className="mb-4 text-xl font-bold text-black sm:mb-6 sm:text-2xl">{t.floorplans}</h2><div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">{floorplans.map((floorplan) => <article key={floorplan.documentUrl} className="flex min-w-0 flex-col gap-4 rounded-xl border border-light-gray bg-white p-4 transition-all hover:border-dark-gray hover:shadow-sm sm:p-5"><div className="flex min-w-0 items-center gap-4"><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-light-gray bg-white text-dark-gray"><span className="material-symbols-outlined leading-none">architecture</span></span><span className="min-w-0 flex-1 truncate font-semibold text-black">{floorplan.name}</span></div><div className="grid grid-cols-2 gap-2"><a href={floorplan.documentUrl} target="_blank" rel="noreferrer" className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg bg-black px-3 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-80"><span className="material-symbols-outlined text-base">visibility</span>{t.viewFloorplan}</a><a href={documentDownloadUrl(floorplan.documentUrl)} className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border border-light-gray px-3 py-2 text-sm font-semibold text-black transition-colors hover:border-dark-gray"><span className="material-symbols-outlined text-base">download</span>{t.downloadFloorplan}</a></div></article>)}</div></section>}

      {brochures.length > 0 && <section><h2 className="mb-4 text-xl font-bold text-black sm:mb-6 sm:text-2xl">{t.documents}</h2><div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">{brochures.map((brochure) => <a key={brochure.url} href={brochure.url} target="_blank" rel="noreferrer" className="group flex items-center gap-4 rounded-xl border border-light-gray bg-white p-4 text-sm text-black transition-all hover:border-dark-gray hover:shadow-sm"><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-light-gray bg-white text-dark-gray"><span className="material-symbols-outlined leading-none">article</span></span><span className="min-w-0 flex-1 truncate font-semibold">{brochure.name}</span><span className="material-symbols-outlined text-dark-gray transition-transform group-hover:translate-x-1">open_in_new</span></a>)}</div></section>}
      <PropertyMap property={property} />
    </div>
  );
}
