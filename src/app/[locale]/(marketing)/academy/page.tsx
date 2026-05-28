import type { Metadata } from "next";
import { AcademyHeroSection } from "@/components/academy/AcademyHeroSection";
import { AcademyCTA } from "@/components/academy/AcademyCTA";

export const dynamic = 'force-dynamic';

const siteUrl = "https://drivengroup.com";

export const metadata: Metadata = {
  title: "Modo Rico™ — Driven Academy",
  description:
    "Sistema guiado de transformación financiera. Recupera el control de tu dinero, construye estabilidad y libertad a largo plazo.",
  openGraph: {
    title: "Modo Rico™ — Driven Academy",
    description: "Sistema guiado de transformación financiera.",
    url: `${siteUrl}/academy`,
    type: "website",
    images: [{ url: `${siteUrl}/og-image.png`, width: 1200, height: 630, alt: "Modo Rico™ — Driven Academy" }],
  },
  alternates: { canonical: `${siteUrl}/academy` },
};

const modulos = [
  {
    numero: "01",
    titulo: "Despertar Financiero",
    subtitulo: "El diagnóstico de tu caos financiero",
    temas: ["Hábitos destructivos", "Fugas financieras", "Impulsividad y ansiedad económica", "Patrones que te mantienen estancado"],
    resultado: "Ahora entiendo qué está destruyendo mi estabilidad.",
  },
  {
    numero: "02",
    titulo: "Reprogramación Financiera",
    subtitulo: "Reconstruyendo tu relación con el dinero",
    temas: ["Mentalidad y creencias", "Identidad financiera", "Control emocional", "Disciplina financiera"],
    resultado: "La estabilidad financiera sí es posible para mí.",
  },
  {
    numero: "03",
    titulo: "Control y Orden",
    subtitulo: "Tomando control de tu dinero",
    temas: ["Organización financiera", "Presupuesto moderno", "Control de gastos", "Herramientas y estructura financiera"],
    resultado: "Por primera vez tengo claridad financiera.",
  },
  {
    numero: "04",
    titulo: "Eliminando el Caos",
    subtitulo: "Saliendo del desorden financiero",
    temas: ["Eliminación de deudas", "Uso inteligente del crédito", "Historial crediticio", "Decisiones financieras responsables"],
    resultado: "Estoy recuperando estabilidad y paz mental.",
  },
  {
    numero: "05",
    titulo: "Construcción de Estabilidad",
    subtitulo: "Creando una base financiera fuerte",
    temas: ["Ahorro inteligente", "Planificación y objetivos", "Estabilidad sostenida", "Visión financiera"],
    resultado: "Ya no siento que sobrevivo.",
  },
  {
    numero: "06",
    titulo: "Crecimiento Financiero",
    subtitulo: "Haciendo crecer tu dinero con dirección",
    temas: ["Fundamentos de inversión", "Crecimiento patrimonial", "Visión financiera moderna", "Construcción de patrimonio responsable"],
    resultado: "Ahora mi dinero tiene dirección.",
  },
  {
    numero: "07",
    titulo: "Identidad Modo Rico™",
    subtitulo: "Convertirte en una persona financieramente fuerte",
    temas: ["Disciplina y hábitos permanentes", "Control emocional avanzado", "Evolución personal", "Fortaleza financiera"],
    resultado: "Ya no soy la misma persona.",
  },
  {
    numero: "08",
    titulo: "Evolución y Expansión",
    subtitulo: "Tu nueva vida financiera",
    temas: ["Crecimiento continuo", "Comunidad y mastermind", "Expansión patrimonial", "Visión de largo plazo"],
    resultado: "Esto apenas comienza.",
  },
];

const filosofia = ["EDUCAR.", "ENFOCAR.", "EJECUTAR.", "TRANSFORMAR."];

const incluye = [
  { icon: "play_circle", label: "Clases en Video de Alto Valor" },
  { icon: "description", label: "Guías y Plantillas Descargables" },
  { icon: "groups", label: "Comunidad Privada" },
  { icon: "videocam", label: "Sesiones en Vivo" },
  { icon: "workspace_premium", label: "Certificado Acreditado" },
];

export default function AcademyPage() {
  return (
    <main>
      <AcademyHeroSection />

      {/* Intro — El Sistema */}
      <section className="py-20 sm:py-24 md:py-32 max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-start">
          <div>
            <p className="editorial-label text-gray mb-3">EL SISTEMA</p>
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-black text-black tracking-tight leading-[1.1] mb-8">
              No es un curso de finanzas. Es una transformación.
            </h2>
            <p className="text-base sm:text-lg text-dark-gray leading-[1.8] font-light mb-6">
              MODO RICO™ es un sistema guiado diseñado para ayudarte a <strong className="text-black font-semibold">recuperar el control de tu dinero</strong>, reorganizar tu vida financiera y construir estabilidad, crecimiento y libertad a largo plazo.
            </p>
            <p className="text-base sm:text-lg text-dark-gray leading-[1.8] font-light">
              El método DRIVEN™ combina educación financiera moderna, mentalidad, disciplina, control emocional, organización, crédito inteligente y <strong className="text-black font-semibold">inteligencia patrimonial</strong>. Todo dentro de una experiencia práctica, emocional y progresiva.
            </p>
          </div>

          {/* Quote */}
          <div className="bg-black rounded-lg p-10 sm:p-12 md:p-14">
            <span className="font-serif text-6xl text-gray leading-none block mb-6">"</span>
            <p className="font-serif text-xl sm:text-2xl text-white leading-[1.65] mb-10">
              No se trata de ganar más, se trata de convertirte en la persona que sabe{" "}
              <span className="text-gray">qué hacer con ello.</span>
            </p>
            <div className="border-t border-white/10 pt-8">
              <p className="editorial-label text-white/30 mb-6">FILOSOFÍA DRIVEN™</p>
              <div className="grid grid-cols-2 gap-3">
                {filosofia.map((f) => (
                  <p key={f} className="text-white font-black text-lg tracking-tight">{f}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Módulos */}
      <section id="modulos" className="py-20 sm:py-24 md:py-32 bg-black">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="mb-16 sm:mb-20">
            <p className="editorial-label text-white/30 mb-3">MÉTODO DRIVEN™</p>
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-[1.1]">
              Estructura Estratégica
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10">
            {modulos.map((m) => (
              <div key={m.numero} className="bg-black p-8 sm:p-10 md:p-12">
                <div className="flex items-start gap-5 mb-6">
                  <span className="font-serif text-4xl font-black text-gray leading-none shrink-0">{m.numero}</span>
                  <div>
                    <h3 className="font-serif text-xl sm:text-2xl font-black text-white leading-tight mb-1">
                      {m.titulo}
                    </h3>
                    <p className="text-white/50 text-sm font-light italic">&ldquo;{m.subtitulo}&rdquo;</p>
                  </div>
                </div>

                <div className="space-y-2 mb-6">
                  {m.temas.map((t) => (
                    <div key={t} className="flex items-center gap-3">
                      <span className="w-1 h-1 rounded-full bg-gray shrink-0" />
                      <span className="text-white/70 text-sm">{t}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-white/10 pt-5">
                  <p className="text-white/40 text-xs tracking-widest uppercase mb-1">Resultado</p>
                  <p className="font-serif text-white/80 italic text-sm">&ldquo;{m.resultado}&rdquo;</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* La Diferencia */}
      <section className="py-20 sm:py-24 md:py-32 max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-start">

          {/* Qué incluye */}
          <div>
            <p className="editorial-label text-gray mb-3">CONTENIDO</p>
            <h2 className="font-serif text-4xl sm:text-5xl font-black text-black tracking-tight leading-[1.1] mb-10">
              ¿Qué incluye Modo Rico™?
            </h2>
            <div className="space-y-4">
              {incluye.map((item) => (
                <div key={item.label} className="flex items-center gap-5 p-5 border border-light-gray rounded-lg">
                  <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-gray text-xl">{item.icon}</span>
                  </div>
                  <p className="text-black font-semibold">{item.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* La Diferencia */}
          <div>
            <p className="editorial-label text-gray mb-3">LA DIFERENCIA</p>
            <h2 className="font-serif text-4xl sm:text-5xl font-black text-black tracking-tight leading-[1.1] mb-8">
              No enseñamos teoría. Creamos una nueva identidad financiera.
            </h2>
            <p className="text-base sm:text-lg text-dark-gray leading-[1.8] font-light mb-10">
              La verdadera transformación financiera ocurre cuando una persona piensa diferente, se organiza diferente, controla sus emociones, toma mejores decisiones y construye estabilidad con dirección.
            </p>

            <div className="space-y-4">
              {[
                { icon: "close", label: "No solo números o teoría financiera", negative: true },
                { icon: "check_circle", label: "Una nueva identidad financiera", negative: false },
                { icon: "check_circle", label: "Control, claridad y dirección", negative: false },
                { icon: "check_circle", label: "Libertad y estabilidad a largo plazo", negative: false },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-4">
                  <span className={`material-symbols-outlined shrink-0 text-xl ${item.negative ? "text-gray" : "text-black"}`}>
                    {item.icon}
                  </span>
                  <p className={`text-base ${item.negative ? "text-gray line-through" : "text-black font-semibold"}`}>
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <AcademyCTA />
    </main>
  );
}
