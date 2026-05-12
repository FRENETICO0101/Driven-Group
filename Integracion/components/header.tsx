"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, User, Settings, Globe, Phone, MapPin } from "lucide-react"

const navigation = [
  { name: "Home", href: "/" },
  { name: "Real Estate", href: "/real-estate" },
  { name: "Business", href: "/business" },
  { name: "Academy", href: "/academy" },
  { name: "Contact Us", href: "/contact" },
  { name: "About Us", href: "/about" },
]

interface MiamiInfo {
  temperature: number
  time: string
  date: string
  isDaytime: boolean
}

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [miamiInfo, setMiamiInfo] = useState<MiamiInfo>({
    temperature: 0,
    time: "",
    date: "",
    isDaytime: true,
  })

  // Get Miami time and weather info
  useEffect(() => {
    const updateMiamiInfo = () => {
      const miamiTime = new Date().toLocaleString("en-US", {
        timeZone: "America/New_York",
      })
      const miamiDate = new Date(miamiTime)
      
      const hours = miamiDate.getHours()
      const isDaytime = hours >= 6 && hours < 19 // 6 AM to 7 PM

      setMiamiInfo({
        temperature: Math.round(75 + Math.random() * 10), // Simulated temp 75-85°F
        time: miamiDate.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
          timeZone: "America/New_York",
        }),
        date: miamiDate.toLocaleDateString("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric",
          timeZone: "America/New_York",
        }),
        isDaytime,
      })
    }

    updateMiamiInfo()
    const interval = setInterval(updateMiamiInfo, 60000) // Update every minute
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isMenuOpen])

  return (
    <>
      <header
        className={`fixed left-0 right-0 top-0 z-50 transition-all duration-700 ${
          isScrolled || isMenuOpen
            ? "bg-background border-b border-border"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto max-w-[1800px] px-4 md:px-6 lg:px-12">
          <div className="flex h-20 items-center justify-between lg:h-24">
            {/* Left - Hamburger Menu + Miami Info */}
            <div className="flex items-center gap-4 md:gap-8">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`flex items-center gap-2 md:gap-3 transition-colors duration-500 ${
                  isScrolled || isMenuOpen ? "text-foreground" : "text-cream"
                }`}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
                <span className="hidden text-[10px] tracking-[0.2em] uppercase sm:inline">
                  Menu
                </span>
              </button>

              {/* Miami Info - Desktop */}
              <div 
                className={`hidden items-center gap-4 border-l pl-4 md:flex lg:gap-6 lg:pl-8 ${
                  isScrolled || isMenuOpen ? "border-border" : "border-cream/20"
                }`}
              >
                <div className="flex items-center gap-2">
                  <MapPin 
                    size={14} 
                    className={isScrolled || isMenuOpen ? "text-muted-foreground" : "text-cream/60"} 
                  />
                  <span 
                    className={`text-[10px] tracking-[0.15em] uppercase ${
                      isScrolled || isMenuOpen ? "text-muted-foreground" : "text-cream/60"
                    }`}
                  >
                    Miami
                  </span>
                </div>
                <span 
                  className={`text-[11px] tabular-nums ${
                    isScrolled || isMenuOpen ? "text-foreground" : "text-cream"
                  }`}
                >
                  {miamiInfo.temperature}°F
                </span>
                <span 
                  className={`text-[11px] tabular-nums ${
                    isScrolled || isMenuOpen ? "text-foreground" : "text-cream"
                  }`}
                >
                  {miamiInfo.time}
                </span>
                <span 
                  className={`hidden text-[11px] lg:inline ${
                    isScrolled || isMenuOpen ? "text-muted-foreground" : "text-cream/60"
                  }`}
                >
                  {miamiInfo.date}
                </span>
              </div>
            </div>

            {/* Center - Logo */}
            <Link 
              href="/" 
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            >
              <span
                className={`font-serif text-lg tracking-[0.2em] transition-colors duration-700 sm:text-xl md:text-2xl lg:text-3xl ${
                  isScrolled || isMenuOpen ? "text-foreground" : "text-cream"
                }`}
              >
                DRIVEN GROUP
              </span>
            </Link>

            {/* Right - Contact, Language, Settings, Account */}
            <div className="flex items-center gap-3 md:gap-4 lg:gap-6">
              {/* Contact */}
              <Link
                href="/contact"
                className={`hidden items-center gap-2 transition-colors duration-500 sm:flex ${
                  isScrolled || isMenuOpen
                    ? "text-foreground hover:text-muted-foreground"
                    : "text-cream hover:text-cream/70"
                }`}
                aria-label="Contact"
              >
                <Phone size={16} />
                <span className="hidden text-[10px] tracking-[0.15em] uppercase lg:inline">
                  Contact
                </span>
              </Link>

              {/* Language */}
              <button
                className={`hidden items-center gap-2 transition-colors duration-500 md:flex ${
                  isScrolled || isMenuOpen
                    ? "text-foreground hover:text-muted-foreground"
                    : "text-cream hover:text-cream/70"
                }`}
                aria-label="Language"
              >
                <Globe size={16} />
                <span className="text-[10px] tracking-[0.15em] uppercase">
                  EN
                </span>
              </button>

              {/* Settings */}
              <button
                className={`hidden transition-colors duration-500 md:block ${
                  isScrolled || isMenuOpen
                    ? "text-foreground hover:text-muted-foreground"
                    : "text-cream hover:text-cream/70"
                }`}
                aria-label="Settings"
              >
                <Settings size={16} />
              </button>

              {/* Account */}
              <button
                className={`transition-colors duration-500 ${
                  isScrolled || isMenuOpen
                    ? "text-foreground hover:text-muted-foreground"
                    : "text-cream hover:text-cream/70"
                }`}
                aria-label="Account"
              >
                <User size={18} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Full Screen Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-background transition-all duration-700 ${
          isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        }`}
      >
        <div className="flex h-full flex-col justify-center px-6 pt-24 md:px-16 lg:px-24">
          <nav className="space-y-3 md:space-y-5">
            {navigation.map((item, index) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="group flex items-center gap-4 md:gap-6 overflow-hidden"
                style={{ 
                  transitionDelay: isMenuOpen ? `${index * 50}ms` : "0ms" 
                }}
              >
                <span className="text-[10px] tracking-[0.2em] text-muted-foreground">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="font-serif text-3xl text-foreground transition-all duration-500 group-hover:translate-x-4 group-hover:text-muted-foreground sm:text-4xl md:text-5xl lg:text-6xl">
                  {item.name}
                </span>
              </Link>
            ))}
          </nav>
          
          {/* Miami Info - Mobile (in menu) */}
          <div className="mt-12 flex items-center gap-4 border-t border-border pt-8 md:hidden">
            <MapPin size={14} className="text-muted-foreground" />
            <span className="text-[11px] text-muted-foreground">Miami</span>
            <span className="text-[11px] text-foreground">{miamiInfo.temperature}°F</span>
            <span className="text-[11px] text-foreground">{miamiInfo.time}</span>
            <span className="text-[11px] text-muted-foreground">{miamiInfo.date}</span>
          </div>
          
          <div className="mt-8 flex items-center gap-8 border-t border-border pt-8 md:mt-16">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-6">
              <a 
                href="tel:+1234567890" 
                className="text-[11px] tracking-[0.1em] text-muted-foreground transition-colors hover:text-foreground"
              >
                +1 (305) 555-0123
              </a>
              <span className="hidden text-muted-foreground/30 md:inline">|</span>
              <a 
                href="mailto:info@drivengroup.com" 
                className="text-[11px] tracking-[0.1em] text-muted-foreground transition-colors hover:text-foreground"
              >
                info@drivengroup.com
              </a>
            </div>
          </div>

          <div className="mt-8 flex items-center gap-6">
            <a 
              href="#" 
              className="text-[10px] tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
            >
              INSTAGRAM
            </a>
            <a 
              href="#" 
              className="text-[10px] tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
            >
              LINKEDIN
            </a>
            <a 
              href="#" 
              className="text-[10px] tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
            >
              YOUTUBE
            </a>
          </div>
        </div>
      </div>
    </>
  )
}

// Export isDaytime for use in other components
export function useMiamiTime() {
  const [isDaytime, setIsDaytime] = useState(true)

  useEffect(() => {
    const checkTime = () => {
      const miamiTime = new Date().toLocaleString("en-US", {
        timeZone: "America/New_York",
      })
      const hours = new Date(miamiTime).getHours()
      setIsDaytime(hours >= 6 && hours < 19)
    }

    checkTime()
    const interval = setInterval(checkTime, 60000)
    return () => clearInterval(interval)
  }, [])

  return isDaytime
}
