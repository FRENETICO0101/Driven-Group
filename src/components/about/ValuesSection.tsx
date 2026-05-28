interface Value {
  title: string;
  description: string;
  icon: string;
}

const values: Value[] = [
  {
    title: "Misión",
    description: "Contribuir al desarrollo de nuestros clientes, parteners, colaboradores y aliados estrategicos, mediante la mejora continua de las personas y construccion de negocios sostenibles, sustentados en la confianza, el valor compartido y relaciones de largo plazo.",
    icon: "target",
  },
  {
    title: "Pasión",
    description: "Nos mueve la conviccion de hacer las cosas bien, incluso cuando nadie esta viendo. Creemos en la lealtad, en la palabra cumplida y en la confianza que se construye con hechos. Desde ahi nacen decisiones, neustras alianzas y el valor que permanece.",
    icon: "favorite",
  },
  {
    title: "Visión",
    description: "Consolidarnos como un grupo empresarial global referente por su capacidad de construir, integrar y escalar ecosostemas de negocio, generadndo crecimiento sostenible, innovación constante y valor estratégico a través de múltiples industrias.",
    icon: "visibility",
  },
];

export function ValuesSection() {
  return (
    <section id="mission" className="py-20 sm:py-24 md:py-32 max-w-7xl mx-auto px-6 sm:px-8">
      <div className="mb-16 sm:mb-20">
        <p className="editorial-label text-gray mb-2">OUR FOUNDATION</p>
        <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-black text-black tracking-tight leading-[1.1]">
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
            <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-black mb-4 tracking-tight">
              {value.title}
            </h3>
            <p className="text-base sm:text-lg text-dark-gray leading-[1.8] font-light">
              {value.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
