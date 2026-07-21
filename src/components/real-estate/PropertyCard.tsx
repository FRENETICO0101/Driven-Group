import Image from 'next/image';
import Link from 'next/link';
import { useLocale } from 'next-intl';

interface Feature {
  icon: string;
  label: string;
}

interface PropertyCardProps {
  image: string;
  imageAlt: string;
  badge: string;
  badgeFeatured?: boolean;
  title: string;
  subtitle: string;
  description: string;
  features: Feature[];
  slug: string;
}

export function PropertyCard({
  image,
  imageAlt,
  badge,
  badgeFeatured = false,
  title,
  subtitle,
  description,
  features,
  slug,
}: PropertyCardProps) {
  const locale = useLocale();

  return (
    <Link href={`/${locale}/real-estate/${slug}`}>
      <article className="group flex flex-col h-full">
        {/* Image Container */}
        <div className="relative aspect-4/5 overflow-hidden">
          <Image
            alt={imageAlt}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            src={image}
            fill
            sizes="(max-width: 640px) 85vw, (max-width: 768px) 60vw, (max-width: 1024px) 45vw, 35vw"
          />
          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-black/0 transition-all duration-700 group-hover:bg-black/20" />

          {/* Badge */}
          {badge && (
            <div className="absolute top-4 left-4 text-xs font-semibold px-2.5 py-1.5 rounded tracking-wide uppercase bg-white text-black" aria-label={`Tipo: ${badge}`}>
              {badge}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="mt-6 flex-1 flex flex-col">
          <p className="text-[11px] tracking-[0.2em] text-gray uppercase">{subtitle}</p>
          <h3 className="mt-2 font-serif text-2xl md:text-3xl text-black leading-tight">{title}</h3>

          {/* Specs */}
          <div className="mt-4 flex items-center gap-4 text-sm text-dark-gray">
            {features.map((feature, idx) => (
              <span key={feature.icon} className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px]">{feature.icon}</span>
                <span className="hidden sm:inline">{feature.label}</span>
                {idx < features.length - 1 && <span className="hidden sm:inline h-1 w-1 rounded-full bg-light-gray ml-2" />}
              </span>
            ))}
          </div>
        </div>
      </article>
    </Link>
  );
}
