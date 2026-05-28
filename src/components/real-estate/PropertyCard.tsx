import Image from 'next/image';
import Link from 'next/link';

interface Feature {
  icon: string;
  label: string;
}

interface PropertyCardProps {
  images: Array<{ url: string; alt: string }>;
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
  images,
  imageAlt,
  badge,
  badgeFeatured = false,
  price,
  title,
  subtitle,
  features,
  slug,
}: PropertyCardProps) {
  // Take first 3 images: [0] = floorplan (left), [1-2] = renders (right stacked)
  const floorplan = images?.[0];
  const render1 = images?.[1];
  const render2 = images?.[2];

  return (
    <Link href={`/real-estate/${slug}`} className="group block">
      <article className="flex flex-col h-full">

        {/* Image Gallery Grid */}
        <div className="relative overflow-hidden bg-pale mb-5">
          {/* Desktop: Floorplan left (tall) + 2 renders stacked right | Mobile: Stack all vertically */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:h-96">
            
            {/* Floorplan - Left side (takes full width on mobile, 1.5 columns on desktop) */}
            {floorplan && (
              <div className="relative col-span-1 md:col-span-2 row-span-2 h-80 md:h-auto aspect-square md:aspect-auto overflow-hidden bg-pale">
                <Image
                  alt="Floor plan"
                  className="w-full h-full object-cover transition-transform duration-[1.1s] ease-out group-hover:scale-[1.04]"
                  src={floorplan.url}
                  fill
                  sizes="(max-width: 640px) 90vw, (max-width: 1024px) 50vw, 35vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                {/* Label */}
                <div className="absolute bottom-3 left-3 editorial-label px-2 py-1 bg-white/90 text-ink text-xs">
                  FLOOR PLAN
                </div>
              </div>
            )}

            {/* Render 1 - Right top */}
            {render1 && (
              <div className="relative col-span-1 row-span-1 h-36 md:h-auto aspect-video md:aspect-auto overflow-hidden bg-pale">
                <Image
                  alt="Property render"
                  className="w-full h-full object-cover transition-transform duration-[1.1s] ease-out group-hover:scale-[1.04]"
                  src={render1.url}
                  fill
                  sizes="(max-width: 640px) 90vw, (max-width: 1024px) 30vw, 20vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              </div>
            )}

            {/* Render 2 - Right bottom */}
            {render2 && (
              <div className="relative col-span-1 row-span-1 h-36 md:h-auto aspect-video md:aspect-auto overflow-hidden bg-pale">
                <Image
                  alt="Property render"
                  className="w-full h-full object-cover transition-transform duration-[1.1s] ease-out group-hover:scale-[1.04]"
                  src={render2.url}
                  fill
                  sizes="(max-width: 640px) 90vw, (max-width: 1024px) 30vw, 20vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              </div>
            )}

          </div>

          {/* Badge - Positioned over gallery */}
          {badge && (
            <div
              className={`absolute top-4 left-4 editorial-label px-3 py-1.5 z-10 ${
                badgeFeatured
                  ? "bg-ink text-white"
                  : "bg-white/90 text-ink"
              }`}
              aria-label={`Property type: ${badge}`}
            >
              {badge}
            </div>
          )}
        </div>

        {/* Meta */}
        <div className="flex-1 flex flex-col gap-3">
          <p className="editorial-label text-gray">{subtitle}</p>
          <h3 className="font-serif text-xl sm:text-2xl text-ink leading-tight group-hover:text-dark-gray transition-colors duration-300">
            {title}
          </h3>

          {/* Specs */}
          <div className="flex items-center gap-4 flex-wrap">
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
