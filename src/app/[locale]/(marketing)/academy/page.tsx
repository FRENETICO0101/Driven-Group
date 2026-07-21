import type { Metadata } from "next";
import { AcademyHeroSection } from "@/components/academy/AcademyHeroSection";
import { AcademyCTA } from "@/components/academy/AcademyCTA";

export const dynamic = "force-dynamic";

const siteUrl = "https://drivengroup.com";

export const metadata: Metadata = {
  title: "Modo Rico™ — Driven Academy",
  description:
    "Un método práctico para recuperar el control de tu dinero, construir estabilidad y crear patrimonio con dirección.",
  openGraph: {
    title: "Modo Rico™ — Driven Academy",
    description: "Educación financiera práctica para construir patrimonio con dirección.",
    url: `${siteUrl}/academy`,
    type: "website",
    images: [{ url: `${siteUrl}/og-image.png`, width: 1200, height: 630, alt: "Modo Rico™ — Driven Academy" }],
  },
  alternates: { canonical: `${siteUrl}/academy` },
};

const phases = [
  {
    number: "01",
    name: "Diagnóstico y control",
    outcome: "Claridad total sobre tu situación y un plan para tomar las riendas.",
    modules: [
      { title: "Despertar Financiero", description: "El diagnóstico honesto de tu realidad económica." },
      { title: "Reprogramación Mental", description: "Reconstruye tu relación con el dinero." },
      { title: "Control Total", description: "Toma las riendas de tus ingresos y decisiones." },
    ],
  },
  {
    number: "02",
    name: "Estrategia y crecimiento",
    outcome: "Deuda bajo control, escudo financiero activado y patrimonio en marcha.",
    modules: [
      { title: "Libertad del Caos", description: "Reestructura deuda y crédito con inteligencia." },
      { title: "Fortaleza Financiera", description: "Construye tu base de estabilidad." },
      { title: "Expansión Inteligente", description: "Impulsa patrimonio con visión moderna." },
    ],
  },
  {
    number: "03",
    name: "Patrimonio y legado",
    outcome: "Una vida financiera consolidada que trasciende a tu familia.",
    modules: [
      { title: "Visión de Legado", description: "Diseña tu futuro y el de los tuyos." },
      { title: "Identidad Modo Rico", description: "Consolida una nueva forma de vivir tus finanzas." },
    ],
  },
];

const challenges = [
  "Ganas bien, pero el dinero se evapora cada mes.",
  "Sabes que deberías invertir, pero no sabes por dónde empezar.",
  "Necesitas nuevas fuentes de ingreso y una estrategia real.",
  "Has consumido información financiera, pero sigues sin avanzar.",
];

const included = [
  { icon: "account_tree", title: "Método Modo Rico completo", copy: "Una ruta práctica y progresiva para pasar de caos a patrimonio." },
  { icon: "group", title: "Comunidad privada", copy: "Un espacio para dudas, oportunidades y networking." },
  { icon: "dashboard", title: "Nexora by Driven Academy", copy: "Tu panel de control financiero personal." },
  { icon: "description", title: "Plantillas premium", copy: "Diagnósticos, calculadoras, trackers y simuladores aplicables." },
  { icon: "play_circle", title: "Acceso online 24/7", copy: "Avanza a tu ritmo, desde donde estés." },
  { icon: "task_alt", title: "Formación práctica", copy: "Ejercicios aplicables desde el primer día." },
];

const bonuses = [
  { number: "01", title: "Plan de Acción 90 Días", copy: "Tu hoja de ruta para los primeros tres meses: ejecución clara y medible." },
  { number: "02", title: "Reto 21 Días Modo Rico", copy: "Un desafío diario para reprogramar hábitos y generar tracción." },
  { number: "03", title: "GPT Privado Modo Rico", copy: "Un asistente entrenado con el método para resolver dudas y acompañarte." },
];

const faqs = [
  { question: "¿Necesito conocimientos previos en finanzas?", answer: "No. Modo Rico empieza desde los fundamentos y avanza paso a paso, con ejercicios aplicables desde el primer día." },
  { question: "¿Cuánto tiempo tengo para completar el programa?", answer: "El acceso es online 24/7 y puedes avanzar a tu ritmo. La ruta está diseñada para completarse aproximadamente en 8 a 12 semanas." },
  { question: "¿Es teoría o podré aplicarlo?", answer: "Cada etapa incluye herramientas prácticas, plantillas y ejercicios para convertir la información en decisiones concretas." },
  { question: "¿Qué pasa si el programa no es para mí?", answer: "La primera generación cuenta con una garantía de 7 días para evaluar si el método cumple tus expectativas." },
];

export default function AcademyPage() {
  return (
    <main>
      <AcademyHeroSection />

      <section className="mx-auto grid max-w-7xl gap-14 px-6 py-20 sm:px-8 sm:py-24 lg:grid-cols-[1.1fr_0.9fr] lg:gap-24 md:py-32">
        <div>
          <p className="editorial-label mb-3 text-gray">EL MÉTODO</p>
          <h2 className="font-serif text-4xl font-black leading-[1.1] tracking-tight text-black sm:text-5xl md:text-6xl">
            Deja de ganar para gastar. Empieza a construir.
          </h2>
          <p className="mt-8 text-base font-light leading-[1.8] text-dark-gray sm:text-lg">
            Modo Rico es un sistema construido desde experiencia real dentro del sector financiero para transformar el caos en estabilidad, sin importar cuánto ganes hoy.
          </p>
          <p className="mt-5 text-base font-light leading-[1.8] text-dark-gray sm:text-lg">
            No se trata solo de ganar más. Se trata de convertirte en la persona que sabe qué hacer con su dinero, toma decisiones con dirección y construye patrimonio real.
          </p>
        </div>

        <aside className="rounded-2xl border border-light-gray bg-[#f7f7f7] p-7 sm:p-10">
          <p className="editorial-label mb-5 text-gray">¿ESTO ES PARA TI?</p>
          <h3 className="font-serif text-2xl font-black leading-tight text-black sm:text-3xl">Si te identificas con una de estas situaciones, no estás solo.</h3>
          <div className="mt-7 space-y-4">
            {challenges.map((challenge) => (
              <div key={challenge} className="flex gap-3 border-t border-black/10 pt-4 first:border-0 first:pt-0">
                <span className="material-symbols-outlined mt-0.5 text-lg text-black">arrow_forward</span>
                <p className="text-sm leading-relaxed text-dark-gray sm:text-base">{challenge}</p>
              </div>
            ))}
          </div>
        </aside>
      </section>

      <section id="modulos" className="bg-black py-20 sm:py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <div className="max-w-3xl">
            <p className="editorial-label mb-3 text-white/35">CURRÍCULA DEL PROGRAMA</p>
            <h2 className="font-serif text-4xl font-black leading-[1.1] tracking-tight text-white sm:text-5xl md:text-6xl">Una ruta clara: de control a legado.</h2>
            <p className="mt-6 text-base font-light leading-relaxed text-white/60 sm:text-lg">Ocho módulos organizados en tres fases para transformar tu relación con el dinero y convertir ingresos en patrimonio.</p>
          </div>

          <div className="mt-14 grid gap-5 lg:grid-cols-3">
            {phases.map((phase) => (
              <article key={phase.number} className="rounded-2xl border border-white/15 bg-white/[0.04] p-6 sm:p-8">
                <div className="flex items-start justify-between gap-5 border-b border-white/10 pb-6">
                  <div>
                    <p className="font-serif text-4xl font-black text-gray">{phase.number}</p>
                    <h3 className="mt-4 font-serif text-2xl font-black text-white">{phase.name}</h3>
                  </div>
                  <span className="material-symbols-outlined text-white/40">account_balance</span>
                </div>
                <div className="mt-6 space-y-3">
                  {phase.modules.map((module) => (
                    <details key={module.title} className="group rounded-xl bg-white/[0.06] px-4 py-3 open:bg-white/[0.1]">
                      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-sm font-semibold text-white">
                        {module.title}
                        <span className="material-symbols-outlined text-base text-white/60 transition-transform group-open:rotate-45">add</span>
                      </summary>
                      <p className="pt-3 text-sm leading-relaxed text-white/60">{module.description}</p>
                    </details>
                  ))}
                </div>
                <p className="mt-7 border-t border-white/10 pt-5 text-sm leading-relaxed text-white/65"><span className="font-semibold text-white">Resultado: </span>{phase.outcome}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 sm:px-8 sm:py-24 md:py-32">
        <div className="grid gap-14 lg:grid-cols-[0.75fr_1.25fr] lg:gap-24">
          <div>
            <p className="editorial-label mb-3 text-gray">MÁS VALOR PARA TU CRECIMIENTO</p>
            <h2 className="font-serif text-4xl font-black leading-[1.1] tracking-tight text-black sm:text-5xl">Todo lo que recibes al entrar.</h2>
            <p className="mt-6 text-base font-light leading-[1.8] text-dark-gray sm:text-lg">No es información para algún día. Es un sistema con herramientas que puedes poner en práctica ahora.</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {included.map((item) => (
              <article key={item.title} className="group rounded-xl border border-light-gray p-6 transition-all hover:-translate-y-1 hover:border-black hover:shadow-xl">
                <span className="material-symbols-outlined rounded-lg bg-black p-3 text-xl text-white">{item.icon}</span>
                <h3 className="mt-5 font-serif text-xl font-black text-black">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-dark-gray">{item.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f3f3f3] py-20 sm:py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-24">
            <div>
              <p className="editorial-label mb-3 text-gray">PRIMERA GENERACIÓN</p>
              <h2 className="font-serif text-4xl font-black leading-[1.1] tracking-tight text-black sm:text-5xl">Entra con herramientas para ejecutar desde el inicio.</h2>
              <p className="mt-6 text-base font-light leading-[1.8] text-dark-gray sm:text-lg">Los bonos de lanzamiento acompañan la implementación del método con una ruta clara, hábitos medibles y apoyo práctico.</p>
            </div>
            <div className="space-y-3">
              {bonuses.map((bonus) => (
                <article key={bonus.number} className="group flex gap-5 rounded-xl border border-black/10 bg-white p-6 transition-shadow hover:shadow-lg sm:gap-7 sm:p-7">
                  <span className="font-serif text-3xl font-black text-gray">{bonus.number}</span>
                  <div>
                    <h3 className="font-serif text-xl font-black text-black">{bonus.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-dark-gray">{bonus.copy}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
          <div className="mt-12 flex flex-col gap-5 rounded-2xl bg-black p-7 text-white sm:flex-row sm:items-center sm:justify-between sm:p-9">
            <div>
              <p className="editorial-label text-white/40">GARANTÍA DE TRANQUILIDAD</p>
              <h3 className="mt-2 font-serif text-2xl font-black">Tu inversión está protegida durante los primeros 7 días.</h3>
            </div>
            <span className="material-symbols-outlined text-4xl text-gray">verified_user</span>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-20 sm:px-8 sm:py-24 md:py-32">
        <p className="editorial-label mb-3 text-gray">PREGUNTAS FRECUENTES</p>
        <h2 className="font-serif text-4xl font-black leading-[1.1] tracking-tight text-black sm:text-5xl">Todo claro antes de comenzar.</h2>
        <div className="mt-10 divide-y divide-light-gray border-y border-light-gray">
          {faqs.map((faq, index) => (
            <details key={faq.question} open={index === 0} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-5 font-serif text-lg font-black text-black sm:text-xl">
                {faq.question}
                <span className="material-symbols-outlined shrink-0 text-black transition-transform group-open:rotate-45">add</span>
              </summary>
              <p className="max-w-3xl pt-4 text-sm leading-relaxed text-dark-gray sm:text-base">{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <AcademyCTA />
    </main>
  );
}
