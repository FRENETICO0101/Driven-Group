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
}: PropertyCardProps) {
  return (
    <div className="glass-card group overflow-hidden rounded-xl transition-all hover:-translate-y-2 flex flex-col">
      <div className="relative h-64 overflow-hidden">
        <img
          alt={imageAlt}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          src={image}
        />
        <div
          className={
            badgeFeatured
              ? "absolute top-4 left-4 quartz-button text-xs font-black px-2 py-1 rounded uppercase"
              : "absolute top-4 left-4 bg-slate-800 text-primary/90 text-xs font-black px-2 py-1 rounded uppercase border border-white/20"
          }
        >
          {badge}
        </div>
        <div className="absolute bottom-4 right-4 bg-slate-900/80 text-white px-3 py-1 rounded-lg text-sm font-bold">
          {price}
        </div>
      </div>
      <div className="p-8 flex-1 flex flex-col">
        <h3 className="text-2xl font-bold mb-2 text-white">{title}</h3>
        <p className="text-slate-400 text-sm mb-4">{subtitle}</p>
        <p className="text-slate-400 mb-6 line-clamp-2 leading-relaxed">{description}</p>
        <div className="flex items-center gap-4 mt-auto text-slate-300 text-sm mb-4">
          {features.map((feature) => (
            <span key={feature.icon} className="flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">{feature.icon}</span> {feature.label}
            </span>
          ))}
        </div>
        <button className="bg-primary/20 border border-primary/50 text-white px-4 py-2 rounded-lg font-semibold transition-colors hover:bg-primary hover:text-slate-900">
          Ver Detalles
        </button>
      </div>
    </div>
  );
}
