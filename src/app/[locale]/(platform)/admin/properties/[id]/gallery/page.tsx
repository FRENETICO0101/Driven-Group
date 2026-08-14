import { auth } from '@/lib/auth';
import { redirect, notFound } from 'next/navigation';
import Link from 'next/link';
import { PropertyGallery } from '@/components/admin/PropertyGallery';
import { propertyRepository } from '@/server/repositories/property.repository';

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
  const property = await propertyRepository.getBySlug(slug);
  if (!property) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-light-gray/30">
      <div className="max-w-4xl mx-auto px-6 sm:px-8 py-12">
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-2">
            <h1 className="font-serif text-4xl md:text-5xl text-black">Galería</h1>
            </div>
            <p className="text-dark-gray mb-4">{property.title}</p>
            <div className="flex gap-3">
              <Link
                href={`/admin/properties/${property.slug}`}
                className="text-sm text-black hover:underline"
              >
                ← Back to property
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

          <PropertyGallery propertyId={property.id} images={property.images} />
      </div>
    </main>
  );
}
