import { PropertyCard } from "@/components/real-estate/PropertyCard";

const featuredProperties = [
  {
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop",
    imageAlt: "Penthouse Luxury",
    badge: "Destacado",
    badgeFeatured: true,
    price: "$950.000",
    title: "Penthouse Premium",
    subtitle: "Dpto. 4 amb • 180 m² • Balcón con vista panorámica",
    description: "Penthouse de lujo con vistas a la ciudad, acabados premium y amenities de clase mundial.",
    features: [
      { icon: "bed", label: "4 Dorm" },
      { icon: "bathroom", label: "2,5 Baños" },
    ],
  },
  {
    image: "https://images.unsplash.com/photo-1570129477492-45a003537e1f?w=400&h=300&fit=crop",
    imageAlt: "Casa Moderna",
    badge: "Nuevo",
    badgeFeatured: false,
    price: "$650.000",
    title: "Casa Contemporánea",
    subtitle: "Casa 5 amb • 320 m² • Piscina y jardín",
    description: "Casa moderna con diseño minimalista, espacios abiertos y zona de entretenimiento.",
    features: [
      { icon: "bed", label: "5 Dorm" },
      { icon: "bathroom", label: "3 Baños" },
    ],
  },
  {
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop",
    imageAlt: "Oficina Premium",
    badge: "Oportunidad",
    badgeFeatured: false,
    price: "$1.2M",
    title: "Espacio Comercial",
    subtitle: "Oficina • 450 m² • Zona ejecutiva",
    description: "Espacio comercial de lujo en zona financiera, ideal para oficinas corporativas.",
    features: [
      { icon: "aspect_ratio", label: "450 m²" },
      { icon: "location_on", label: "Centro" },
    ],
  },
];

export function FeaturedProperties() {
  return (
    <section className="py-24 max-w-7xl mx-auto px-6">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
        <div>
          <h2 className="text-4xl font-black text-primary/90">Propiedades Destacadas</h2>
          <p className="text-slate-400 text-lg max-w-xl">
            Selección exclusiva de propiedades premium en ubicaciones codiciadas con potencial de inversión.
          </p>
        </div>
        <a
          className="text-primary/80 font-bold flex items-center gap-2 group hover:text-primary transition-colors"
          href="/real-estate"
        >
          Ver todas las propiedades
          <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">arrow_forward</span>
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {featuredProperties.map((property) => (
          <PropertyCard key={property.title} {...property} />
        ))}
      </div>
    </section>
  );
}
