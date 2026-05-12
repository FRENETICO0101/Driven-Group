import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function About() {
  return (
    <section id="about" className="section-aman">
      <div className="mx-auto max-w-[1800px] px-6 lg:px-12">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24 items-center">
          {/* Image */}
          <div className="order-2 lg:order-1">
            <div className="image-aman relative aspect-[4/5]">
              <Image
                src="/images/property-3.jpg"
                alt="Driven Group founder"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2">
            <p className="label-aman mb-4">Our Philosophy</p>
            <h2 className="heading-aman">
              Crafting
              <br />
              Legacies
            </h2>
            
            <div className="mt-8 space-y-6 body-aman">
              <p>
                At Driven, we believe that exceptional real estate is more than 
                an investment—it is a sanctuary, a legacy, and an expression of 
                one&apos;s highest aspirations.
              </p>
              
              <p>
                Founded on the principles of discretion, expertise, and unwavering 
                dedication, we have cultivated relationships with the world&apos;s 
                most discerning collectors of fine properties.
              </p>

              <p>
                Each residence we represent has been carefully selected for its 
                architectural significance, exceptional location, and potential 
                to become a treasured home for generations.
              </p>
            </div>

            <Link
              href="#contact"
              className="group mt-10 inline-flex items-center gap-3 text-[13px] tracking-wide text-foreground transition-colors duration-500 hover:text-muted-foreground"
            >
              Begin Your Journey
              <ArrowRight size={16} className="transition-transform duration-500 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
