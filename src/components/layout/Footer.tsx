export function Footer() {
  return (
    <footer className="border-t border-slate-200 py-16 sm:py-20 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">

        {/* Main Content Grid: Left (Brand/Contact) + Right (4 Columns) */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 sm:gap-16 md:gap-20 mb-16 sm:mb-20">

          {/* Left: Brand & Contact */}
          <div className="lg:col-span-1">
            <h3 className="text-slate-900 font-semibold text-lg mb-4 tracking-tight">DRIVEN GROUP</h3>
            <p className="text-slate-600 text-sm leading-relaxed mb-8">A vertically integrated holding company spanning real estate, global commerce, and executive education. Building legacies, transforming industries.</p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-slate-700 text-sm">
                <span className="material-symbols-outlined text-base">phone</span>
                <a href="tel:+13055550123" className="hover:text-slate-900 transition-colors">+1 (305) 555-0123</a>
              </div>
              <div className="flex items-center gap-3 text-slate-700 text-sm">
                <span className="material-symbols-outlined text-base">mail</span>
                <a href="mailto:info@drivengroup.com" className="hover:text-slate-900 transition-colors">info@drivengroup.com</a>
              </div>
              <div className="flex items-center gap-3 text-slate-700 text-sm">
                <span className="material-symbols-outlined text-base">location_on</span>
                <span>Miami, FL</span>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex gap-4 mt-8">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-slate-900 transition-colors" aria-label="Instagram">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37 Z" />
                  <circle cx="17.5" cy="6.5" r="1.5" />
                </svg>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-slate-900 transition-colors" aria-label="LinkedIn">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-slate-900 transition-colors" aria-label="YouTube">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Right: 4 Navigation Columns */}
          <div className="lg:col-span-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">

              {/* DIVISIONS */}
              <div>
                <h4 className="editorial-label text-slate-400 mb-5 tracking-[0.15em] text-xs font-semibold">DIVISIONS</h4>
                <ul className="space-y-3 text-slate-700 text-sm">
                  <li>
                    <a href="/real-estate" className="hover:text-slate-900 transition-colors">Real Estate</a>
                  </li>
                  <li>
                    <a href="/business" className="hover:text-slate-900 transition-colors">Business</a>
                  </li>
                  <li>
                    <a href="/academy" className="hover:text-slate-900 transition-colors">Academy</a>
                  </li>
                </ul>
              </div>

              {/* BUSINESS UNITS */}
              <div>
                <h4 className="editorial-label text-slate-400 mb-5 tracking-[0.15em] text-xs font-semibold">BUSINESS UNITS</h4>
                <ul className="space-y-3 text-slate-700 text-sm">
                  <li>
                    <a href="/business#divisions" className="hover:text-slate-900 transition-colors">Digital Commerce</a>
                  </li>
                  <li>
                    <a href="/business#divisions" className="hover:text-slate-900 transition-colors">Global Markets</a>
                  </li>
                  <li>
                    <a href="/business#divisions" className="hover:text-slate-900 transition-colors">Strategic Alliances</a>
                  </li>
                  <li>
                    <a href="/business#divisions" className="hover:text-slate-900 transition-colors">Luxury Assets</a>
                  </li>
                </ul>
              </div>

              {/* ACADEMY */}
              <div>
                <h4 className="editorial-label text-slate-400 mb-5 tracking-[0.15em] text-xs font-semibold">ACADEMY</h4>
                <ul className="space-y-3 text-slate-700 text-sm">
                  <li>
                    <a href="/academy#programs" className="hover:text-slate-900 transition-colors">Cursos</a>
                  </li>
                  <li>
                    <a href="/academy#programs" className="hover:text-slate-900 transition-colors">Mentoring</a>
                  </li>
                  <li>
                    <a href="/academy#programs" className="hover:text-slate-900 transition-colors">Mastering</a>
                  </li>
                </ul>
              </div>

              {/* COMPANY */}
              <div>
                <h4 className="editorial-label text-slate-400 mb-5 tracking-[0.15em] text-xs font-semibold">COMPANY</h4>
                <ul className="space-y-3 text-slate-700 text-sm">
                  <li>
                    <a href="/" className="hover:text-slate-900 transition-colors">Home</a>
                  </li>
                  <li>
                    <a href="/about" className="hover:text-slate-900 transition-colors">About Us</a>
                  </li>
                  <li>
                    <a href="/contact" className="hover:text-slate-900 transition-colors">Contact</a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-slate-900 transition-colors">Careers</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom: Legal */}
        <div className="border-t border-slate-200 pt-8 sm:pt-12">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
            <p className="text-slate-400 text-xs tracking-wider">© 2026 DRIVEN GROUP. ALL RIGHTS RESERVED.</p>
            <div className="flex gap-6">
              <a href="#" className="text-slate-400 hover:text-slate-900 transition-colors text-xs tracking-wider">Privacy Policy</a>
              <a href="#" className="text-slate-400 hover:text-slate-900 transition-colors text-xs tracking-wider">Terms of Service</a>
              <a href="#" className="text-slate-400 hover:text-slate-900 transition-colors text-xs tracking-wider">Cookie Settings</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
