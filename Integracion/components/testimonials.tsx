"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

const testimonials = [
  {
    quote: "The experience was nothing short of extraordinary. They understood exactly what we were seeking and presented options that exceeded our expectations.",
    author: "Michael & Sarah Chen",
    location: "Los Angeles",
  },
  {
    quote: "Discretion, expertise, and an unwavering commitment to excellence. They transformed our vision of a family sanctuary into reality.",
    author: "The Morrison Family",
    location: "Aspen",
  },
  {
    quote: "In thirty years of collecting fine properties, I have never encountered a team with such refined taste and market insight.",
    author: "Robert Williams",
    location: "Miami",
  },
]

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="section-aman bg-sand">
      <div className="mx-auto max-w-[1800px] px-6 lg:px-12">
        <div className="mx-auto max-w-4xl text-center">
          {/* Label */}
          <p className="label-aman mb-16">Client Reflections</p>

          {/* Quote */}
          <blockquote className="min-h-[200px] flex items-center justify-center">
            <p className="font-serif text-2xl leading-[1.5] text-foreground md:text-3xl lg:text-4xl">
              &ldquo;{testimonials[currentIndex].quote}&rdquo;
            </p>
          </blockquote>
          
          {/* Author */}
          <footer className="mt-12">
            <p className="text-sm tracking-wide text-foreground">
              {testimonials[currentIndex].author}
            </p>
            <p className="mt-1 text-[11px] tracking-[0.2em] text-muted-foreground uppercase">
              {testimonials[currentIndex].location}
            </p>
          </footer>

          {/* Navigation */}
          <div className="mt-16 flex items-center justify-center gap-8">
            <button
              onClick={prev}
              className="p-3 text-muted-foreground transition-colors duration-500 hover:text-foreground"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={24} />
            </button>
            
            <div className="flex gap-3">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-px w-8 transition-all duration-500 ${
                    index === currentIndex 
                      ? "bg-foreground" 
                      : "bg-border hover:bg-muted-foreground"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            
            <button
              onClick={next}
              className="p-3 text-muted-foreground transition-colors duration-500 hover:text-foreground"
              aria-label="Next testimonial"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
