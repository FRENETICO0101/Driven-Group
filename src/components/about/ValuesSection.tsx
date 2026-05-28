interface Value {
  title: string;
  description: string;
  index: string;
}

const values: Value[] = [
  {
    index: "01",
    title: "Misión",
    description: "Contribuir al desarrollo de nuestros clientes, parteners, colaboradores y aliados estrategicos, mediante la mejora continua de las personas y construccion de negocios sostenibles, sustentados en la confianza, el valor compartido y relaciones de largo plazo.",
  },
  {
    index: "02",
    title: "Pasión",
    description: "Nos mueve la conviccion de hacer las cosas bien, incluso cuando nadie esta viendo. Creemos en la lealtad, en la palabra cumplida y en la confianza que se construye con hechos. Desde ahi nacen decisiones, nuestras alianzas y el valor que permanece.",
  },
  {
    index: "03",
    title: "Visión",
    description: "Consolidarnos como un grupo empresarial global referente por su capacidad de construir, integrar y escalar ecosistemas de negocio, generando crecimiento sostenible, innovación constante y valor estratégico a través de múltiples industrias.",
  },
];

export function ValuesSection() {
  return (
    <section id="mission" className="py-24 sm:py-28 md:py-36 border-t border-pale">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">

        {/* Header */}
        <div className="mb-16 sm:mb-20">
          <p className="editorial-label text-gray mb-3">Our Foundation</p>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-ink tracking-tight leading-[1.05] text-balance">
            Mission, Passion & Vision
          </h2>
        </div>

        {/* Values — horizontal rule list */}
        <div className="divide-y divide-pale">
          {values.map((value) => (
            <div
              key={value.title}
              className="group py-10 sm:py-12 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 items-start"
            >
              <div className="md:col-span-1">
                <span className="editorial-label text-light-gray">{value.index}</span>
              </div>
              <div className="md:col-span-4">
                <h3 className="font-serif text-3xl sm:text-4xl text-ink tracking-tight leading-tight">
                  {value.title}
                </h3>
              </div>
              <div className="md:col-span-7">
                <p className="text-sm sm:text-base text-dark-gray leading-[1.9] font-light">
                  {value.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
