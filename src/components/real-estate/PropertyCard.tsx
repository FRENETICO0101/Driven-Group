import Image from 'next/image';
import Link from 'next/link';

interface Feature {
  icon: string;
  label: string;
}

interface PropertyCardProps {
  image: string;
  imageAlt: string;
  badge: string;
  badgeFeatured?: boolean;
  price: string;
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
  price,
  title,
  subtitle,
  features,
  slug,
}: PropertyCardProps) {
  return (
    <Link href={`/real-estate/${slug}`} className="group block">
      <article className="flex flex-col h-full">

        {/* Image */}
        <div className="relative aspect-[3/4] overflow-hidden bg-pale">
          <Image
            alt={imageAlt}
            className="w-full h-full object-cover transition-transform duration-[1.1s] ease-out group-hover:scale-[1.04]"
            src={image}
            fill
            sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 33vw"
          />
          {/* Subtle bottom veil */}
          <div className="absolute inset-0 bg-gradient-to-t from-ink/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

          {/* Badge */}
          {badge && (
            <div
              className={`absolute top-4 left-4 editorial-label px-3 py-1.5 ${
                badgeFeatured
                  ? "bg-ink text-white"
                  : "bg-white/90 text-ink"
              }`}
              aria-label={`Tipo: ${badge}`}
            >
              {badge}
            </div>
          )}
        </div>

        {/* Meta */}
        <div className="mt-5 flex-1 flex flex-col gap-3">
          <p className="editorial-label text-gray">{subtitle}</p>
          <h3 className="font-serif text-xl sm:text-2xl text-ink leading-tight group-hover:text-dark-gray transition-colors duration-300">
            {title}
          </h3>

          {/* Specs */}
          <div className="flex items-center gap-4">
            {features.map((feature, idx) => (
              <span key={feature.icon} className="flex items-center gap-1.5 text-xs text-mid-gray">
                <span
                  className="material-symbols-outlined"
                  style={{ fontSize: "13px", fontVariationSettings: "'wght' 200" }}
                >
                  {feature.icon}
                </span>
                <span className="hidden sm:inline">{feature.label}</span>
                {idx < features.length - 1 && (
                  <span className="hidden sm:inline w-px h-3 bg-pale ml-2" />
                )}
              </span>
            ))}
          </div>

          {/* Price */}
          <div className="mt-auto pt-4 border-t border-pale flex items-center justify-between">
            <p className="font-serif text-lg text-ink">{price}</p>
            <span
              className="material-symbols-outlined text-light-gray group-hover:text-ink group-hover:translate-x-0.5 transition-all duration-300"
              style={{ fontSize: "16px", fontVariationSettings: "'wght' 200" }}
            >
              arrow_outward
            </span>
          </div>
        </div>

      </article>
    </Link>
  );
}
