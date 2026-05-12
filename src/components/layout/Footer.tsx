export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-50">
      <div className="max-w-450 mx-auto px-6 sm:px-8 py-16 sm:py-24 md:py-32">

        {/* Main Grid: 6 Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-12 sm:gap-8 lg:gap-16 mb-12 sm:mb-16">

          {/* [Col 1-2] Brand Section */}
          <div className="lg:col-span-2">
            {/* Logo */}
            <h2 className="font-serif text-2xl sm:text-3xl tracking-[0.2em] text-slate-50 mb-4">DRIVEN GROUP</h2>

            {/* Description */}
            <p className="font-sans text-sm text-slate-300 leading-relaxed mb-8">A vertically integrated holding company spanning real estate, global commerce, and executive education. Building legacies, transforming industries.</p>

            {/* Contact Info */}
            <div className="space-y-3 mb-8">
              <div className="text-sm text-slate-400">
                <a href="tel:+13055550123" className="hover:text-slate-50 transition-colors duration-500">+1 (305) 555-0123</a>
              </div>
              <div className="text-sm text-slate-400">
                <a href="mailto:info@drivengroup.com" className="hover:text-slate-50 transition-colors duration-500">info@drivengroup.com</a>
              </div>
              <div className="text-sm text-slate-400">
                Miami, FL
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex gap-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-slate-50 transition-colors duration-500" aria-label="Instagram">
                <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37 Z" />
                  <circle cx="17.5" cy="6.5" r="1.5" />
                </svg>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-slate-50 transition-colors duration-500" aria-label="LinkedIn">
                <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-slate-50 transition-colors duration-500" aria-label="YouTube">
                <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
          </div>

          {/* [Col 3] Divisions */}
          <div>
            <h4 className="text-[11px] uppercase tracking-[0.2em] text-slate-400 mb-6 font-semibold">Divisions</h4>
            <ul className="space-y-3">
              <li>
                <a href="/real-estate" className="text-sm text-slate-300 hover:text-slate-50 transition-colors duration-500">Real Estate</a>
              </li>
              <li>
                <a href="/business" className="text-sm text-slate-300 hover:text-slate-50 transition-colors duration-500">Business</a>
              </li>
              <li>
                <a href="/academy" className="text-sm text-slate-300 hover:text-slate-50 transition-colors duration-500">Academy</a>
              </li>
            </ul>
          </div>

          {/* [Col 4] Business Units */}
          <div>
            <h4 className="text-[11px] uppercase tracking-[0.2em] text-slate-400 mb-6 font-semibold">Business</h4>
            <ul className="space-y-3">
              <li>
                <a href="/business#digital-commerce" className="text-sm text-slate-300 hover:text-slate-50 transition-colors duration-500">Digital Commerce</a>
              </li>
              <li>
                <a href="/business#global-markets" className="text-sm text-slate-300 hover:text-slate-50 transition-colors duration-500">Global Markets</a>
              </li>
              <li>
                <a href="/business#strategic-alliances" className="text-sm text-slate-300 hover:text-slate-50 transition-colors duration-500">Strategic Alliances</a>
              </li>
              <li>
                <a href="/business#luxury-assets" className="text-sm text-slate-300 hover:text-slate-50 transition-colors duration-500">Luxury Assets</a>
              </li>
            </ul>
          </div>

          {/* [Col 5] Academy */}
          <div>
            <h4 className="text-[11px] uppercase tracking-[0.2em] text-slate-400 mb-6 font-semibold">Academy</h4>
            <ul className="space-y-3">
              <li>
                <a href="/academy#courses" className="text-sm text-slate-300 hover:text-slate-50 transition-colors duration-500">Courses</a>
              </li>
              <li>
                <a href="/academy#mentoring" className="text-sm text-slate-300 hover:text-slate-50 transition-colors duration-500">Mentoring</a>
              </li>
              <li>
                <a href="/academy#mastering" className="text-sm text-slate-300 hover:text-slate-50 transition-colors duration-500">Mastering</a>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-sm text-yellow-600">Coming Soon</span>
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-yellow-600 animate-pulse"></span>
              </li>
            </ul>
          </div>

          {/* [Col 6] Company */}
          <div>
            <h4 className="text-[11px] uppercase tracking-[0.2em] text-slate-400 mb-6 font-semibold">Company</h4>
            <ul className="space-y-3">
              <li>
                <a href="/" className="text-sm text-slate-300 hover:text-slate-50 transition-colors duration-500">Home</a>
              </li>
              <li>
                <a href="/about" className="text-sm text-slate-300 hover:text-slate-50 transition-colors duration-500">About Us</a>
              </li>
              <li>
                <a href="/contact" className="text-sm text-slate-300 hover:text-slate-50 transition-colors duration-500">Contact Us</a>
              </li>
              <li>
                <a href="/careers" className="text-sm text-slate-300 hover:text-slate-50 transition-colors duration-500">Careers</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom: Legal */}
        <div className="border-t border-slate-800 pt-8 sm:pt-12">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
            <p className="text-[11px] uppercase tracking-[0.2em] text-slate-500">© 2026 Driven Group. All rights reserved.</p>
            <div className="flex flex-col sm:flex-row gap-6 sm:gap-8">
              <a href="#" className="text-[11px] uppercase tracking-[0.2em] text-slate-500 hover:text-slate-50 transition-colors duration-500">Privacy Policy</a>
              <a href="#" className="text-[11px] uppercase tracking-[0.2em] text-slate-500 hover:text-slate-50 transition-colors duration-500">Terms of Service</a>
              <a href="#" className="text-[11px] uppercase tracking-[0.2em] text-slate-500 hover:text-slate-50 transition-colors duration-500">Cookie Settings</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
