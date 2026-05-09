import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPropertyBySlug } from '@/server/services/property.service';
import { getPropertyBadge } from '@/lib/property-utils';
import { PropertyGallery } from '@/components/real-estate/PropertyGallery';
import { PropertyHero } from '@/components/real-estate/PropertyHero';
import { PropertyDetails } from '@/components/real-estate/PropertyDetails';
import { PropertyCTA } from '@/components/real-estate/PropertyCTA';

export const dynamic = 'force-dynamic';
export const revalidate = 60;

const siteUrl = 'https://drivengroup.com';

interface PropertyPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PropertyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const property = await getPropertyBySlug(slug);

  if (!property) {
    return {
      title: 'Propiedad no encontrada',
      description: 'La propiedad solicitada no está disponible.',
    };
  }

  const primaryImage = property.images[0]?.url || `${siteUrl}/og-image.png`;

  return {
    title: `${property.title} — Driven Group`,
    description: property.description || `Activo inmobiliario estratégico en ${property.city}. Inversión corporativa de alto potencial.`,
    openGraph: {
      title: `${property.title} — Driven Group`,
      description: property.description || `Activo inmobiliario estratégico en ${property.city}. Inversión corporativa de alto potencial.`,
      url: `${siteUrl}/real-estate/${property.slug}`,
      type: 'website',
      images: [
        {
          url: primaryImage,
          width: 1200,
          height: 630,
          alt: property.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${property.title} — Driven Group`,
      description: property.description || `Activo inmobiliario estratégico en ${property.city}. Inversión corporativa de alto potencial.`,
      images: [primaryImage],
    },
    alternates: {
      canonical: `${siteUrl}/real-estate/${property.slug}`,
    },
  };
}

export default async function PropertyPage({
  params,
}: PropertyPageProps) {
  const { slug } = await params;
  const property = await getPropertyBySlug(slug);

  if (!property) {
    notFound();
  }

  const badge = getPropertyBadge(property.type);

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Navigation */}
      <nav className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <a href="/real-estate" className="text-primary hover:text-primary/80 transition-colors text-sm sm:text-base">
            ← Volver al catálogo
          </a>
        </div>
      </nav>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
          {/* Gallery & Hero */}
          <div className="lg:col-span-2 space-y-6 sm:space-y-8">
            <PropertyGallery images={property.images} title={property.title} />
            <PropertyHero property={property} badge={badge.label} badgeFeatured={badge.featured} />
          </div>

          {/* CTA Sidebar */}
          <div>
            <PropertyCTA property={property} />
          </div>
        </div>

        {/* Details Section */}
        <div className="mt-12 sm:mt-16 pt-8 sm:pt-12 border-t border-slate-800/50">
          <PropertyDetails property={property} />
        </div>
      </div>

      {/* Footer Whitespace */}
      <div className="h-12 sm:h-20" />
    </main>
  );
}
