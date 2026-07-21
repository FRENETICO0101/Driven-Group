interface Value {
  title: string;
  description: string;
  icon: string;
}

const values: Value[] = [
  {
    title: "Misión",
    description: "Contribuir al desarrollo de nuestros clientes, partners, colaboradores y aliados estratégicos, mediante la mejora continua de las personas y construcción de negocios sostenibles, sustentados en la confianza, el valor compartido y relaciones de largo plazo.",
    icon: "target",
  },
  {
    title: "Pasión",
    description: "Nos mueve la convicción de hacer las cosas bien, incluso cuando nadie está viendo. Creemos en la lealtad, en la palabra cumplida y en la confianza que se construye con hechos. Desde ahí nacen decisiones, nuestras alianzas y el valor que permanece.",
    icon: "favorite",
  },
  {
    title: "Visión",
    description: "Consolidarnos como un grupo empresarial global referente por su capacidad de construir, integrar y escalar ecosistemas de negocio, generando crecimiento sostenible, innovación constante y valor estratégico a través de múltiples industrias.",
    icon: "visibility",
  },
];

export function ValuesSection() {
  return (
    <section id="mission" className="py-20 sm:py-24 md:py-32 max-w-7xl mx-auto px-6 sm:px-8">
      <div className="mb-12 sm:mb-16">
        <p className="editorial-label text-gray mb-2">NUESTRA BASE</p>
        <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-black text-black tracking-tight leading-[1.1]">
          Misión, Pasión y Visión
        </h2>
      </div>

      {/* Values Grid */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3 sm:gap-6">
        {values.map((value) => (
          <article key={value.title} className="group rounded-2xl border border-light-gray bg-white p-6 transition-all hover:-translate-y-1 hover:border-dark-gray hover:shadow-[0_14px_32px_rgba(37,37,37,0.08)] sm:p-8">
            {/* Icon */}
            <div className="mb-7">
              <div className="flex h-14 w-14 items-center justify-center rounded-full border border-light-gray bg-light-gray/10 transition-colors group-hover:bg-black">
                <span className="material-symbols-outlined text-xl text-dark-gray transition-colors group-hover:text-white">
                  {value.icon}
                </span>
              </div>
            </div>

            {/* Content */}
            <h3 className="mb-4 font-serif text-2xl font-semibold tracking-tight text-black sm:text-3xl">
              {value.title}
            </h3>
            <p className="text-base font-light leading-[1.8] text-dark-gray sm:text-lg">
              {value.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
