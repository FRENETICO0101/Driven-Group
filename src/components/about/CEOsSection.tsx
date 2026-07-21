import Image from "next/image";

interface CEO {
  name: string;
  title: string;
  bio: string;
  image: string;
}

const ceos: CEO[] = [
  {
    name: "Iván Rodríguez",
    title: "Chief Executive Officer & Founder",
    bio: "Fundador de Driven Group en 2022 con la visión de construir una empresa global desde Guadalajara, Jalisco. Iván ha liderado la evolución de la compañía desde el sector inmobiliario hacia un ecosistema empresarial integrado que abarca negocio, real estate y educación, consolidando operaciones en Europa y América del Norte.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=600&fit=crop&q=90",
  },
  {
    name: "Ricardo Hernández",
    title: "Strategic Partner & Co-Founder",
    bio: "Se incorporó a Driven Group en 2026 como socio estratégico para fortalecer y acelerar la consolidación y expansión del grupo. Ricardo aporta experiencia en desarrollo empresarial y visión estratégica para la escalabilidad de las divisiones de negocio, real estate y educación.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&h=600&fit=crop&q=90",
  },
];

export function CEOsSection() {
  return (
    <section className="py-20 sm:py-24 md:py-32 max-w-7xl mx-auto px-6 sm:px-8">
      <div className="mb-16 sm:mb-20">
        <p className="editorial-label text-gray mb-2">LEADERSHIP</p>
        <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-black text-black tracking-tight leading-[1.1]">
          Our Leadership
        </h2>
      </div>

      {/* CEOs Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 md:gap-20">
        {ceos.map((ceo) => (
          <div key={ceo.name} className="flex flex-col">
            {/* Image */}
            <div className="relative aspect-square overflow-hidden rounded-xl mb-8">
              <Image
                src={ceo.image}
                alt={ceo.name}
                fill
                className="object-cover"
              />
            </div>

            {/* Content */}
            <div>
              <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-black mb-2 tracking-tight">
                {ceo.name}
              </h3>
              <p className="editorial-label text-yellow-600 mb-6 tracking-wide">
                {ceo.title}
              </p>
              <p className="text-base sm:text-lg text-dark-gray leading-[1.8] font-light">
                {ceo.bio}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
