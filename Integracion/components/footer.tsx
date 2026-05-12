import Link from "next/link"
import { Instagram, Linkedin, Youtube, Mail, Phone, MapPin } from "lucide-react"

const divisions = [
  { name: "Real Estate", href: "/real-estate" },
  { name: "Business", href: "/business" },
  { name: "Academy", href: "/academy" },
]

const businessAreas = [
  { name: "Digital Commerce", href: "/business#digital-commerce" },
  { name: "Global Markets", href: "/business#global-markets" },
  { name: "Strategic Alliances", href: "/business#strategic-alliances" },
  { name: "Luxury Assets", href: "/business#luxury-assets" },
]

const academy = [
  { name: "Courses", href: "/academy#courses" },
  { name: "Mentoring", href: "/academy#mentoring" },
  { name: "Mastering", href: "/academy#mastering" },
]

const company = [
  { name: "About Us", href: "/about" },
  { name: "Contact Us", href: "/contact" },
  { name: "Careers", href: "/careers" },
]

export function Footer() {
  return (
    <footer className="border-t border-border bg-charcoal">
      <div className="mx-auto max-w-[1800px] px-6 py-16 lg:px-12 lg:py-24">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-6">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block">
              <span className="font-serif text-2xl tracking-[0.2em] text-cream">
                DRIVEN GROUP
              </span>
            </Link>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-cream/60">
              A vertically integrated holding company spanning real estate, 
              global commerce, and executive education. Building legacies, 
              transforming industries.
            </p>

            {/* Contact Info */}
            <div className="mt-8 space-y-3">
              <a 
                href="tel:+13055550123" 
                className="flex items-center gap-3 text-sm text-cream/60 transition-colors hover:text-cream"
              >
                <Phone size={14} />
                +1 (305) 555-0123
              </a>
              <a 
                href="mailto:info@drivengroup.com" 
                className="flex items-center gap-3 text-sm text-cream/60 transition-colors hover:text-cream"
              >
                <Mail size={14} />
                info@drivengroup.com
              </a>
              <div className="flex items-center gap-3 text-sm text-cream/60">
                <MapPin size={14} />
                Miami, FL
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-8 flex gap-6">
              <a
                href="#"
                className="text-cream/40 transition-colors duration-500 hover:text-cream"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a
                href="#"
                className="text-cream/40 transition-colors duration-500 hover:text-cream"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="#"
                className="text-cream/40 transition-colors duration-500 hover:text-cream"
                aria-label="YouTube"
              >
                <Youtube size={18} />
              </a>
            </div>
          </div>

          {/* Divisions */}
          <div>
            <p className="mb-6 text-[11px] uppercase tracking-[0.2em] text-cream/40">
              Divisions
            </p>
            <ul className="space-y-4">
              {divisions.map((item) => (
                <li key={item.name}>
                  <Link 
                    href={item.href} 
                    className="text-sm text-cream/80 transition-colors duration-500 hover:text-cream"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Business */}
          <div>
            <p className="mb-6 text-[11px] uppercase tracking-[0.2em] text-cream/40">
              Business
            </p>
            <ul className="space-y-4">
              {businessAreas.map((item) => (
                <li key={item.name}>
                  <Link 
                    href={item.href} 
                    className="text-sm text-cream/80 transition-colors duration-500 hover:text-cream"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Academy */}
          <div>
            <p className="mb-6 text-[11px] uppercase tracking-[0.2em] text-cream/40">
              Academy
            </p>
            <ul className="space-y-4">
              {academy.map((item) => (
                <li key={item.name}>
                  <Link 
                    href={item.href} 
                    className="text-sm text-cream/80 transition-colors duration-500 hover:text-cream"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
              <li>
                <span className="inline-flex items-center gap-2 text-xs text-gold">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-gold" />
                  Coming Soon
                </span>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <p className="mb-6 text-[11px] uppercase tracking-[0.2em] text-cream/40">
              Company
            </p>
            <ul className="space-y-4">
              {company.map((item) => (
                <li key={item.name}>
                  <Link 
                    href={item.href} 
                    className="text-sm text-cream/80 transition-colors duration-500 hover:text-cream"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 flex flex-col gap-6 border-t border-cream/10 pt-8 md:flex-row md:items-center md:justify-between">
          <p className="text-xs text-cream/40">
            &copy; {new Date().getFullYear()} Driven Group. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-6 md:gap-8">
            <Link 
              href="/privacy" 
              className="text-xs text-cream/40 transition-colors duration-500 hover:text-cream"
            >
              Privacy Policy
            </Link>
            <Link 
              href="/terms" 
              className="text-xs text-cream/40 transition-colors duration-500 hover:text-cream"
            >
              Terms of Service
            </Link>
            <Link 
              href="/cookies" 
              className="text-xs text-cream/40 transition-colors duration-500 hover:text-cream"
            >
              Cookie Settings
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
