import Image from 'next/image';

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
  description,
  features,
  slug,
}: PropertyCardProps) {
  return (
    <div className="glass-card group overflow-hidden rounded-lg sm:rounded-xl transition-all hover:-translate-y-1 sm:hover:-translate-y-2 flex flex-col h-full">
      <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden">
        <Image
          alt={imageAlt}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          src={image}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div
          className={
            badgeFeatured
              ? "absolute top-2 sm:top-4 left-2 sm:left-4 quartz-button text-xs font-black px-2 py-1 rounded uppercase"
              : "absolute top-2 sm:top-4 left-2 sm:left-4 bg-slate-800 text-primary/90 text-xs font-black px-2 py-1 rounded uppercase border border-white/20"
          }
        >
          {badge}
        </div>
        <div className="absolute bottom-2 sm:bottom-4 right-2 sm:right-4 bg-slate-900/80 text-white px-2 sm:px-3 py-1 rounded-lg text-xs sm:text-sm font-bold">
          {price}
        </div>
      </div>
      <div className="p-4 sm:p-6 md:p-8 flex-1 flex flex-col">
        <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 text-white">{title}</h3>
        <p className="text-slate-400 text-xs sm:text-sm mb-3 sm:mb-4">{subtitle}</p>
        <p className="text-slate-400 text-sm mb-4 sm:mb-6 line-clamp-2 leading-relaxed">{description}</p>
        <div className="flex flex-wrap items-center gap-2 sm:gap-4 mt-auto text-slate-300 text-xs sm:text-sm mb-4">
          {features.map((feature) => (
            <span key={feature.icon} className="flex items-center gap-1">
              <span className="material-symbols-outlined text-xs sm:text-sm">{feature.icon}</span> <span className="hidden sm:inline">{feature.label}</span>
            </span>
          ))}
        </div>
        <a
          href={`/real-estate/${slug}`}
          className="inline-block bg-primary/20 border border-primary/50 text-white px-3 sm:px-4 py-2 rounded-lg font-semibold text-xs sm:text-sm transition-colors hover:bg-primary hover:text-slate-900 text-center w-full"
        >
          Ver Detalles
        </a>
      </div>
    </div>
  );
}
