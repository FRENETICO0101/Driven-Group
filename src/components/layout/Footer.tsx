import { BrandLogo } from "@/components/ui/BrandLogo";

export function Footer() {
  return (
    <footer className="bg-ink text-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-20 sm:py-24 md:py-32">

        {/* Main grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-12 sm:gap-10 lg:gap-8 mb-16 sm:mb-20">

          {/* Brand block — col 1-4 */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3 mb-7">
              <BrandLogo className="h-7 sm:h-8 w-auto text-white" />
              <span className="text-xs font-semibold tracking-[0.3em] uppercase text-white">
                DRIVEN GROUP
              </span>
            </div>

            <p className="text-sm text-light-gray leading-[1.8] font-light mb-8 max-w-xs">
              A vertically integrated holding company spanning real estate, global commerce, and executive education. Building legacies, transforming industries.
            </p>

            <div className="space-y-2.5 mb-8">
              <a
                href="tel:+13055550123"
                className="block text-sm text-gray hover:text-white transition-colors duration-500 font-light"
              >
                +1 (305) 555-0123
              </a>
              <a
                href="mailto:info@drivengroup.com"
                className="block text-sm text-gray hover:text-white transition-colors duration-500 font-light"
              >
                info@drivengroup.com
              </a>
              <p className="text-sm text-gray font-light">Miami, FL</p>
            </div>

            {/* Social */}
            <div className="flex gap-5">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray hover:text-white transition-colors duration-500"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37Z" />
                  <circle cx="17.5" cy="6.5" r="1.5" />
                </svg>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray hover:text-white transition-colors duration-500"
                aria-label="LinkedIn"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray hover:text-white transition-colors duration-500"
                aria-label="YouTube"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Navigation columns — col 5-12 */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-10 sm:gap-8">
            {/* Divisions */}
            <div>
              <h4 className="editorial-label text-mid-gray mb-6">Divisions</h4>
              <ul className="space-y-3.5">
                {[
                  { href: "/real-estate", label: "Real Estate" },
                  { href: "/business",    label: "Business" },
                  { href: "/academy",     label: "Academy" },
                ].map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      className="text-sm text-light-gray hover:text-white transition-colors duration-500 font-light"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Business */}
            <div>
              <h4 className="editorial-label text-mid-gray mb-6">Business</h4>
              <ul className="space-y-3.5">
                {[
                  { href: "/business#digital-commerce",    label: "Digital Commerce" },
                  { href: "/business#global-markets",      label: "Global Markets" },
                  { href: "/business#strategic-alliances", label: "Strategic Alliances" },
                  { href: "/business#luxury-assets",       label: "Luxury Assets" },
                ].map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      className="text-sm text-light-gray hover:text-white transition-colors duration-500 font-light"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Academy */}
            <div>
              <h4 className="editorial-label text-mid-gray mb-6">Academy</h4>
              <ul className="space-y-3.5">
                {[
                  { href: "/academy#courses",   label: "Courses" },
                  { href: "/academy#mentoring", label: "Mentoring" },
                  { href: "/academy#mastering", label: "Mastering" },
                ].map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      className="text-sm text-light-gray hover:text-white transition-colors duration-500 font-light"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
                <li className="flex items-center gap-2 pt-1">
                  <span className="editorial-label text-mid-gray">Coming Soon</span>
                  <span className="inline-block w-1 h-1 rounded-full bg-mid-gray animate-pulse" />
                </li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="editorial-label text-mid-gray mb-6">Company</h4>
              <ul className="space-y-3.5">
                {[
                  { href: "/",       label: "Home" },
                  { href: "/about",  label: "About Us" },
                  { href: "/contact", label: "Contact" },
                  { href: "/careers", label: "Careers" },
                ].map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      className="text-sm text-light-gray hover:text-white transition-colors duration-500 font-light"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-dark-gray/40 pt-8 sm:pt-10">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-5">
            <p className="editorial-label text-mid-gray">© 2026 Driven Group. All rights reserved.</p>
            <div className="flex flex-col sm:flex-row gap-5 sm:gap-8">
              {["Privacy Policy", "Terms of Service", "Cookie Settings"].map((l) => (
                <a
                  key={l}
                  href="#"
                  className="editorial-label text-mid-gray hover:text-white transition-colors duration-500"
                >
                  {l}
                </a>
              ))}
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
