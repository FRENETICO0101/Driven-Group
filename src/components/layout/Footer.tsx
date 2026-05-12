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
              <a href="#" className="text-slate-400 hover:text-slate-900 transition-colors">
                <span className="material-symbols-outlined">instagram</span>
              </a>
              <a href="#" className="text-slate-400 hover:text-slate-900 transition-colors">
                <span className="material-symbols-outlined">language</span>
              </a>
              <a href="#" className="text-slate-400 hover:text-slate-900 transition-colors">
                <span className="material-symbols-outlined">business</span>
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
                    <a href="#" className="hover:text-slate-900 transition-colors">Business</a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-slate-900 transition-colors">Academy</a>
                  </li>
                </ul>
              </div>

              {/* BUSINESS */}
              <div>
                <h4 className="editorial-label text-slate-400 mb-5 tracking-[0.15em] text-xs font-semibold">BUSINESS</h4>
                <ul className="space-y-3 text-slate-700 text-sm">
                  <li>
                    <a href="#" className="hover:text-slate-900 transition-colors">Digital Commerce</a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-slate-900 transition-colors">Global Markets</a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-slate-900 transition-colors">Strategic Alliances</a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-slate-900 transition-colors">Luxury Assets</a>
                  </li>
                </ul>
              </div>

              {/* ACADEMY */}
              <div>
                <h4 className="editorial-label text-slate-400 mb-5 tracking-[0.15em] text-xs font-semibold">ACADEMY</h4>
                <ul className="space-y-3 text-slate-700 text-sm">
                  <li>
                    <a href="#" className="hover:text-slate-900 transition-colors">Courses</a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-slate-900 transition-colors">Mentoring</a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-slate-900 transition-colors">Mastering</a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-slate-900 transition-colors">Coming Soon</a>
                  </li>
                </ul>
              </div>

              {/* COMPANY */}
              <div>
                <h4 className="editorial-label text-slate-400 mb-5 tracking-[0.15em] text-xs font-semibold">COMPANY</h4>
                <ul className="space-y-3 text-slate-700 text-sm">
                  <li>
                    <a href="/about" className="hover:text-slate-900 transition-colors">About Us</a>
                  </li>
                  <li>
                    <a href="/contact" className="hover:text-slate-900 transition-colors">Contact Us</a>
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
