import { auth } from '@/lib/auth';
import { redirect, notFound } from 'next/navigation';
import Link from 'next/link';
import { PropertyGallery } from '@/components/admin/PropertyGallery';
import { PropertyDocuments } from '@/components/admin/PropertyDocuments';
import { propertyRepository } from '@/server/repositories/property.repository';
import { getCatalogPropertyBySlug } from '@/lib/property-catalog';

export const metadata = {
  title: 'Galería de propiedad | Administración',
};

export default async function PropertyGalleryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();
  if (!session || session.user?.role !== 'ADMIN') {
    redirect('/login');
  }

  const { id: slug } = await params;
  const catalogProperty = getCatalogPropertyBySlug(slug);
  let property = await propertyRepository.getBySlug(slug);

  if (!property && catalogProperty) {
    property = await propertyRepository.create({
      title: catalogProperty.title,
      slug: catalogProperty.slug,
      description: catalogProperty.description || undefined,
      price: catalogProperty.price,
      address: catalogProperty.address,
      city: catalogProperty.city,
      state: catalogProperty.state,
      zipCode: catalogProperty.zipCode || '00000',
      latitude: catalogProperty.latitude ?? undefined,
      longitude: catalogProperty.longitude ?? undefined,
      bedrooms: catalogProperty.bedrooms,
      bedroomsDisplay: catalogProperty.bedroomsDisplay ?? undefined,
      bathrooms: catalogProperty.bathrooms,
      squareFeet: catalogProperty.squareFeet || 1,
      deliveryDate: catalogProperty.deliveryDate ?? undefined,
      type: catalogProperty.type,
      status: catalogProperty.status,
      agentId: session.user.id,
      amenities: catalogProperty.amenities,
    });
  }

  if (!property) {
    notFound();
  }

  const images = property.galleryManaged
    ? property.images
    : await propertyRepository.initializeGallery(property.id, catalogProperty?.images ?? property.images);
  const sourceDocuments = [
    ...(catalogProperty?.resources.floorplans.map((document, order) => ({
      name: document.name,
      url: document.documentUrl,
      type: 'FLOORPLAN' as const,
      order,
    })) ?? []),
    ...(catalogProperty?.resources.brochures.map((document, index) => ({
      name: document.name,
      url: document.url,
      type: 'BROCHURE' as const,
      order: (catalogProperty.resources.floorplans.length || 0) + index,
    })) ?? []),
  ];
  const documents = property.documentsManaged
    ? property.documents
    : await propertyRepository.initializeDocuments(property.id, sourceDocuments);

  return (
    <main className="min-h-screen bg-light-gray/30">
      <div className="mx-auto max-w-[1500px] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
          <div className="mb-8 rounded-xl border border-light-gray bg-white p-5 shadow-sm sm:p-6">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-gray">Gestión de contenido</p>
                <h1 className="font-serif text-3xl text-black md:text-4xl">Galería y documentos</h1>
                <p className="mt-2 text-dark-gray">{property.title}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <a href="#imagenes" className="rounded-full border border-light-gray bg-light-gray/20 px-4 py-2 text-sm font-semibold text-black hover:border-dark-gray">
                  {images.length} imágenes
                </a>
                <a href="#documentos" className="rounded-full border border-light-gray bg-light-gray/20 px-4 py-2 text-sm font-semibold text-black hover:border-dark-gray">
                  {documents.length} documentos
                </a>
              </div>
            </div>
            <div className="mt-5 flex flex-wrap gap-3 border-t border-light-gray pt-4">
              <Link
                href={`/admin/properties/${property.slug}`}
                className="text-sm font-semibold text-black hover:underline"
              >
                ← Volver a la propiedad
              </Link>
              <span className="text-light-gray">•</span>
              <Link
                href="/admin/properties"
                className="text-sm text-dark-gray hover:text-black"
              >
                Todas las propiedades
              </Link>
            </div>
          </div>

          <PropertyGallery propertyId={property.id} images={images} />
          <div className="mt-8">
            <PropertyDocuments propertyId={property.id} documents={documents} />
          </div>
      </div>
    </main>
  );
}
