"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ArrowRight, BookOpen, Users, Trophy, Lightbulb, TrendingUp, DollarSign, Bell, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const programs = [
  {
    id: "courses",
    number: "01",
    title: "Courses",
    subtitle: "Cursos",
    description: "Programas estructurados diseñados para transformar tu visión empresarial y acelerar tu crecimiento profesional.",
    longDescription: "Nuestros cursos combinan teoría avanzada con aplicación práctica, impartidos por líderes de industria con décadas de experiencia en los mercados más competitivos del mundo.",
    image: "/images/academy-courses.jpg",
    topics: [
      { icon: Lightbulb, name: "Liderazgo Ejecutivo", description: "Desarrolla habilidades de liderazgo transformacional" },
      { icon: TrendingUp, name: "Emprendimiento", description: "Estrategias para crear y escalar negocios exitosos" },
      { icon: DollarSign, name: "Educación Financiera", description: "Domina las finanzas personales y corporativas" },
    ],
    status: "Coming Q1 2025",
  },
  {
    id: "mentoring",
    number: "02",
    title: "Mentoring",
    subtitle: "Mentoría",
    description: "Acompañamiento personalizado uno a uno con expertos que han recorrido el camino que tú deseas transitar.",
    longDescription: "Sesiones privadas diseñadas para abordar tus desafíos específicos, con mentores seleccionados que comparten tu visión y entienden tu industria.",
    image: "/images/academy-mentoring.jpg",
    topics: [
      { icon: Lightbulb, name: "Liderazgo Personal", description: "Descubre y potencia tu estilo de liderazgo único" },
      { icon: TrendingUp, name: "Estrategia de Negocios", description: "Planificación y ejecución de alto impacto" },
      { icon: DollarSign, name: "Gestión Patrimonial", description: "Protege y multiplica tu patrimonio" },
    ],
    status: "Coming Q2 2025",
  },
  {
    id: "mastering",
    number: "03",
    title: "Mastering",
    subtitle: "Maestría",
    description: "Programas de inmersión exclusivos para quienes buscan dominar completamente un área de expertise.",
    longDescription: "Experiencias transformadoras en formato de retiro ejecutivo, donde la élite empresarial se reúne para compartir conocimiento, crear alianzas y alcanzar la maestría.",
    image: "/images/academy-mastering.jpg",
    topics: [
      { icon: Lightbulb, name: "Liderazgo Visionario", description: "Lidera movimientos y transforma industrias" },
      { icon: TrendingUp, name: "Venture Building", description: "Crea múltiples empresas exitosas" },
      { icon: DollarSign, name: "Wealth Mastery", description: "Estrategias de los ultra-high-net-worth" },
    ],
    status: "Coming Q3 2025",
  },
]

export default function AcademyPage() {
  const [email, setEmail] = useState("")
  const [selectedProgram, setSelectedProgram] = useState<string | null>(null)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsSubmitted(true)
      setEmail("")
    }
  }

  return (
    <main className="min-h-screen bg-cream">
      <Header />

      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[500px]">
        <div className="absolute inset-0">
          <Image
            src="/images/academy-hero.jpg"
            alt="Driven Academy"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal/60 via-charcoal/40 to-charcoal/80" />
        </div>

        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
          <span className="mb-4 font-sans text-xs uppercase tracking-[0.3em] text-cream/70">
            Coming Soon
          </span>
          <h1 className="font-serif text-5xl font-light text-cream md:text-7xl lg:text-8xl">
            Driven Academy
          </h1>
          <p className="mt-6 max-w-2xl font-sans text-lg font-light text-cream/80 md:text-xl">
            Donde los visionarios se forman. Donde los líderes evolucionan.
          </p>
          
          {/* Animated scroll indicator */}
          <div className="absolute bottom-12 flex flex-col items-center gap-2">
            <span className="text-xs uppercase tracking-[0.2em] text-cream/50">Descubre más</span>
            <div className="h-12 w-px animate-pulse bg-gradient-to-b from-cream/50 to-transparent" />
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="section-aman">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <span className="font-sans text-xs uppercase tracking-[0.3em] text-stone">
            Nuestra Visión
          </span>
          <h2 className="mt-4 font-serif text-3xl font-light text-charcoal md:text-4xl lg:text-5xl">
            Formamos la próxima generación de líderes empresariales
          </h2>
          <p className="mt-8 font-sans text-lg font-light leading-relaxed text-stone">
            Driven Academy nace de la convicción de que el verdadero éxito empresarial 
            requiere más que conocimiento técnico. Requiere visión, mentalidad y las 
            conexiones correctas. Estamos preparando una experiencia educativa sin 
            precedentes que transformará la forma en que piensas sobre los negocios, 
            el liderazgo y tu propio potencial.
          </p>
        </div>
      </section>

      {/* Programs Grid */}
      <section className="bg-sand/30 py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-16 text-center">
            <span className="font-sans text-xs uppercase tracking-[0.3em] text-stone">
              Programas
            </span>
            <h2 className="mt-4 font-serif text-3xl font-light text-charcoal md:text-4xl">
              Tres pilares de transformación
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {programs.map((program) => (
              <div
                key={program.id}
                className="group relative cursor-pointer"
                onMouseEnter={() => setSelectedProgram(program.id)}
                onMouseLeave={() => setSelectedProgram(null)}
              >
                {/* Image */}
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image
                    src={program.image}
                    alt={program.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/40 to-transparent" />
                  
                  {/* Content Overlay */}
                  <div className="absolute inset-0 flex flex-col justify-end p-8">
                    <span className="font-serif text-6xl font-light text-cream/20">
                      {program.number}
                    </span>
                    <h3 className="mt-2 font-serif text-3xl font-light text-cream">
                      {program.title}
                    </h3>
                    <span className="mt-1 font-sans text-sm text-cream/60">
                      {program.subtitle}
                    </span>
                    <p className="mt-4 font-sans text-sm font-light leading-relaxed text-cream/80">
                      {program.description}
                    </p>
                    
                    {/* Status Badge */}
                    <div className="mt-6 inline-flex items-center gap-2 self-start border border-cream/30 px-4 py-2">
                      <span className="h-2 w-2 animate-pulse rounded-full bg-gold" />
                      <span className="font-sans text-xs uppercase tracking-wider text-cream/70">
                        {program.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Programs (Expandable) */}
      <section className="section-aman">
        <div className="mx-auto max-w-6xl px-6">
          {programs.map((program, index) => (
            <div
              key={program.id}
              className={`border-t border-charcoal/10 py-16 ${index === programs.length - 1 ? "border-b" : ""}`}
            >
              <div className="grid gap-12 md:grid-cols-2">
                <div>
                  <span className="font-serif text-7xl font-light text-charcoal/10">
                    {program.number}
                  </span>
                  <h3 className="mt-4 font-serif text-3xl font-light text-charcoal">
                    {program.title}
                  </h3>
                  <p className="mt-6 font-sans text-base font-light leading-relaxed text-stone">
                    {program.longDescription}
                  </p>
                </div>

                <div className="space-y-6">
                  <span className="font-sans text-xs uppercase tracking-[0.2em] text-stone">
                    Áreas de Enfoque
                  </span>
                  {program.topics.map((topic) => (
                    <div key={topic.name} className="flex gap-4">
                      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center border border-charcoal/10">
                        <topic.icon className="h-5 w-5 text-charcoal/60" />
                      </div>
                      <div>
                        <h4 className="font-sans text-sm font-medium text-charcoal">
                          {topic.name}
                        </h4>
                        <p className="mt-1 font-sans text-sm font-light text-stone">
                          {topic.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Waitlist CTA */}
      <section className="relative py-32">
        <div className="absolute inset-0 bg-charcoal" />
        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
          <Bell className="mx-auto h-10 w-10 text-gold" />
          <h2 className="mt-8 font-serif text-3xl font-light text-cream md:text-4xl lg:text-5xl">
            Sé el primero en saber
          </h2>
          <p className="mx-auto mt-6 max-w-xl font-sans text-base font-light text-cream/70">
            Únete a nuestra lista exclusiva y recibe acceso anticipado a nuestros 
            programas, contenido exclusivo y oportunidades especiales de inscripción.
          </p>

          {isSubmitted ? (
            <div className="mt-12 inline-flex items-center gap-3 border border-gold/30 bg-gold/10 px-8 py-4">
              <span className="h-2 w-2 rounded-full bg-gold" />
              <span className="font-sans text-sm text-cream">
                Gracias por unirte. Te contactaremos pronto.
              </span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-12">
              <div className="mx-auto flex max-w-md flex-col gap-4 sm:flex-row">
                <div className="relative flex-1">
                  <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-cream/40" />
                  <Input
                    type="email"
                    placeholder="Tu correo electrónico"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-14 border-cream/20 bg-cream/5 pl-12 font-sans text-cream placeholder:text-cream/40 focus:border-gold focus:ring-gold"
                  />
                </div>
                <Button
                  type="submit"
                  className="h-14 bg-cream px-8 font-sans text-sm uppercase tracking-wider text-charcoal transition-all duration-300 hover:bg-gold"
                >
                  Unirme a la Lista
                </Button>
              </div>
              <p className="mt-4 font-sans text-xs text-cream/50">
                Sin spam. Solo actualizaciones importantes sobre Driven Academy.
              </p>
            </form>
          )}

          {/* Expected Launch */}
          <div className="mt-16 grid gap-8 border-t border-cream/10 pt-16 sm:grid-cols-3">
            <div>
              <span className="font-serif text-4xl font-light text-cream">Q1</span>
              <span className="ml-2 font-sans text-sm text-cream/50">2025</span>
              <p className="mt-2 font-sans text-xs uppercase tracking-wider text-cream/40">
                Lanzamiento Courses
              </p>
            </div>
            <div>
              <span className="font-serif text-4xl font-light text-cream">Q2</span>
              <span className="ml-2 font-sans text-sm text-cream/50">2025</span>
              <p className="mt-2 font-sans text-xs uppercase tracking-wider text-cream/40">
                Lanzamiento Mentoring
              </p>
            </div>
            <div>
              <span className="font-serif text-4xl font-light text-cream">Q3</span>
              <span className="ml-2 font-sans text-sm text-cream/50">2025</span>
              <p className="mt-2 font-sans text-xs uppercase tracking-wider text-cream/40">
                Lanzamiento Mastering
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
