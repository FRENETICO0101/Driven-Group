import Image from "next/image";

interface CEO {
  name: string;
  title: string;
  bio: string;
  image: string;
}

const ceos: CEO[] = [
  {
    name: "Carlos Eduardo Villegas",
    title: "Chief Executive Officer & Founder",
    bio: "With over 25 years of experience in luxury real estate and strategic investments, Carlos has shaped Driven Group into a global leader in premium property curation. His visionary approach to market dynamics and deep relationships with institutional investors have defined the company's trajectory.",
    image: "/images1/ceo-1.jpg",
  },
  {
    name: "Marina Castillo Romero",
    title: "Chief Operating Officer & Co-Founder",
    bio: "Marina brings unparalleled expertise in corporate strategy and operational excellence. Her innovative approach to client engagement and commitment to sustainable growth has transformed Driven Group into an ecosystem of trust, driving transformative outcomes across all business divisions.",
    image: "/images1/ceo-2.jpg",
  },
];

export function CEOsSection() {
  return (
    <section className="py-24 sm:py-28 md:py-36 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 border-t border-pale">

      {/* Header */}
      <div className="mb-16 sm:mb-20">
        <p className="editorial-label text-gray mb-3">Leadership</p>
        <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-ink tracking-tight leading-[1.05] text-balance">
          Our Founders
        </h2>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 sm:gap-20">
        {ceos.map((ceo, i) => (
          <div key={ceo.name} className="flex flex-col">
            {/* Image — portrait aspect */}
            <div className="relative aspect-[3/4] overflow-hidden mb-8 group">
              <Image
                src={ceo.image}
                alt={ceo.name}
                fill
                className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.03]"
              />
              {/* Index badge */}
              <div className="absolute bottom-5 left-5 editorial-label text-white/50">
                {String(i + 1).padStart(2, "0")}
              </div>
            </div>

            {/* Copy */}
            <div>
              <h3 className="font-serif text-2xl sm:text-3xl text-ink mb-1.5 tracking-tight">
                {ceo.name}
              </h3>
              <p className="editorial-label text-gray mb-6">
                {ceo.title}
              </p>
              <p className="text-sm sm:text-base text-dark-gray leading-[1.9] font-light">
                {ceo.bio}
              </p>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}
