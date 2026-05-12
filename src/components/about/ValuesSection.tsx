"use client";

interface Value {
  title: string;
  description: string;
  icon: string;
}

const values: Value[] = [
  {
    title: "Mission",
    description: "To redefine luxury real estate investment through strategic curation, institutional partnerships, and transformative client relationships that create lasting wealth and legacies.",
    icon: "target",
  },
  {
    title: "Passion",
    description: "We are driven by an unwavering commitment to excellence, innovation, and the pursuit of architectural and lifestyle perfection in every property and partnership we undertake.",
    icon: "favorite",
  },
  {
    title: "Vision",
    description: "To establish Driven Group as the premier global ecosystem for strategic investors, where properties transcend transactions and become vehicles for legacy building and wealth consolidation.",
    icon: "visibility",
  },
];

export function ValuesSection() {
  return (
    <section id="mission" className="py-20 sm:py-24 md:py-32 max-w-7xl mx-auto px-6 sm:px-8">
      <div className="mb-16 sm:mb-20">
        <p className="editorial-label text-slate-400 mb-2">OUR FOUNDATION</p>
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 tracking-tight leading-[1.1]">
          Mission, Passion & Vision
        </h2>
      </div>

      {/* Values Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 sm:gap-16">
        {values.map((value) => (
          <div key={value.title} className="flex flex-col">
            {/* Icon */}
            <div className="mb-8">
              <div className="w-16 h-16 rounded-full bg-yellow-50 flex items-center justify-center">
                <span className="material-symbols-outlined text-yellow-600 text-2xl">
                  {value.icon}
                </span>
              </div>
            </div>

            {/* Content */}
            <h3 className="text-2xl sm:text-3xl font-semibold text-slate-900 mb-4 tracking-tight">
              {value.title}
            </h3>
            <p className="text-base sm:text-lg text-slate-600 leading-[1.8] font-light">
              {value.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
