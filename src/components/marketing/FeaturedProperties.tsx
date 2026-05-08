import { PropertyCard } from "@/components/real-estate/PropertyCard";

const featuredProperties = [
  {
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop",
    imageAlt: "Skyline Penthouse",
    badge: "Destacado",
    badgeFeatured: true,
    price: "$950.000",
    title: "Skyline Penthouse",
    subtitle: "4 ambientes • 180 m² • Vistas panorámicas",
    description: "Residencia de ensueño con vistas sobre la ciudad. Donde la arquitectura y el lujo convergen.",
    features: [
      { icon: "bed", label: "4 Dorm" },
      { icon: "bathroom", label: "2,5 Baños" },
    ],
  },
  {
    image: "https://images.unsplash.com/photo-1570129477492-45a003537e1f?w=400&h=300&fit=crop",
    imageAlt: "Oceanfront Residences",
    badge: "Colección Exclusiva",
    badgeFeatured: false,
    price: "$650.000",
    title: "Oceanfront Residences",
    subtitle: "5 ambientes • 320 m² • Entretenimiento",
    description: "Residencia contemporánea con espacios diseñados para vivir y crear. Minimalismo sofisticado.",
    features: [
      { icon: "bed", label: "5 Dorm" },
      { icon: "bathroom", label: "3 Baños" },
    ],
  },
  {
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop",
    imageAlt: "Brickell Executive Complex",
    badge: "Oportunidad",
    badgeFeatured: false,
    price: "$1.2M",
    title: "Brickell Executive Complex",
    subtitle: "Espacio comercial • 450 m² • Zona céntrica",
    description: "Espacio corporativo de excelencia en ubicación estratégica. Diseñado para empresas que aspiran.",
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
          <h2 className="text-4xl font-black text-primary/90">Investment Opportunities</h2>
          <p className="text-slate-400 text-lg max-w-xl">
            Carteras seleccionadas para inversionistas que buscan consolidar su patrimonio en ubicaciones de excelencia.
          </p>
        </div>
        <a
          className="text-primary/80 font-bold flex items-center gap-2 group hover:text-primary transition-colors"
          href="/real-estate"
        >
          Ver todas las oportunidades
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
