"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

const navigation = [
  { name: "Home", href: "/", index: "01" },
  { name: "Real Estate", href: "/real-estate", index: "02" },
  { name: "Business", href: "/business", index: "03" },
  { name: "Academy", href: "/academy", index: "04" },
  { name: "Contact Us", href: "/contact", index: "05" },
  { name: "About Us", href: "/about", index: "06" },
];

const cities = [
  { label: "Miami",  tz: "America/New_York",      tempBase: 82 },
  { label: "GDL",    tz: "America/Monterrey",      tempBase: 74 },
  { label: "CDMX",   tz: "America/Mexico_City",    tempBase: 68 },
  { label: "NYC",    tz: "America/New_York",        tempBase: 58 },
  { label: "Madrid", tz: "Europe/Madrid",           tempBase: 63 },
  { label: "Dubai",  tz: "Asia/Dubai",              tempBase: 95 },
];

interface CityInfo {
  time: string;
  date: string;
  temp: number;
}

function getCityInfo(tz: string, tempBase: number): CityInfo {
  const now = new Date();
  return {
    time: now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true, timeZone: tz }),
    date: now.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", timeZone: tz }),
    temp: tempBase + Math.floor(Math.sin(now.getMinutes()) * 3),
  };
}

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeCityIdx, setActiveCityIdx] = useState(0);
  const [cityPickerOpen, setCityPickerOpen] = useState(false);
  const [tick, setTick] = useState(0);
  const pickerRef = useRef<HTMLDivElement>(null);

  // Clock tick every minute
  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 60000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMenuOpen]);

  // Close picker on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(e.target as Node)) {
        setCityPickerOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const overlayVisible = isScrolled || isMenuOpen;
  const activeCity = cities[activeCityIdx];
  const cityInfo = getCityInfo(activeCity.tz, activeCity.tempBase);

  return (
    <>
      <header
        className={`fixed left-0 right-0 top-0 z-50 transition-all duration-700 ${
          overlayVisible
            ? "bg-black/95 border-b border-white/5 backdrop-blur-md"
            : "bg-transparent"
        }`}
        aria-label="Navegación principal"
      >
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <div className="grid h-16 sm:h-20 items-center" style={{ gridTemplateColumns: "1fr auto 1fr" }}>

            {/* Left — hamburger + compact city/time */}
            <div className="flex items-center gap-5 sm:gap-6">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`flex items-center gap-2.5 transition-colors duration-500 focus:outline-none focus-visible:ring-1 focus-visible:ring-white/30 rounded ${
                  overlayVisible ? "text-white" : "text-white/80"
                } hover:text-white`}
                aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
                aria-expanded={isMenuOpen}
              >
                <div className="w-5 h-4 flex flex-col justify-between">
                  <span className={`block h-px bg-current transition-all duration-500 origin-center ${isMenuOpen ? "rotate-45 translate-y-1.75" : ""}`} />
                  <span className={`block h-px bg-current transition-all duration-300 ${isMenuOpen ? "opacity-0 scale-x-0" : ""}`} />
                  <span className={`block h-px bg-current transition-all duration-500 origin-center ${isMenuOpen ? "-rotate-45 -translate-y-2.25" : ""}`} />
                </div>
                <span className="hidden sm:inline editorial-label text-current opacity-60">Menu</span>
              </button>

              {/* Compact city + time — header bar */}
              {cityInfo.time && (
                <div
                  className={`hidden md:flex items-center gap-3 pl-5 border-l transition-colors duration-700 ${
                    overlayVisible ? "border-white/10" : "border-white/15"
                  }`}
                >
                  <span className="editorial-label text-white/45">{activeCity.label}</span>
                  <span className="editorial-label text-white/65 tabular-nums">{cityInfo.time}</span>
                  <span className="editorial-label text-white/40 tabular-nums">{cityInfo.temp}°F</span>
                </div>
              )}
            </div>

            {/* Center — wordmark */}
            <Link
              href="/"
              className="justify-self-center focus:outline-none focus-visible:ring-1 focus-visible:ring-white/30 rounded"
              aria-label="Driven Group — Inicio"
            >
              <span className={`text-sm sm:text-base md:text-lg font-semibold tracking-[0.25em] uppercase transition-colors duration-700 ${overlayVisible ? "text-white" : "text-white/90"}`}>
                DRIVEN GROUP
              </span>
            </Link>

            {/* Right — utility icons */}
            <div className="flex items-center justify-end gap-4 sm:gap-5">
              <Link
                href="/contact"
                className={`hidden sm:flex items-center gap-1.5 transition-colors duration-500 ${overlayVisible ? "text-white/70 hover:text-white" : "text-white/60 hover:text-white/90"}`}
                aria-label="Contacto"
              >
                <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>phone</span>
                <span className="hidden lg:inline editorial-label text-current">Contact</span>
              </Link>
              <button
                className={`hidden md:flex items-center gap-1.5 transition-colors duration-500 ${overlayVisible ? "text-white/70 hover:text-white" : "text-white/60 hover:text-white/90"}`}
                aria-label="Idioma"
              >
                <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>language</span>
                <span className="editorial-label text-current">EN</span>
              </button>
              <button
                className={`transition-colors duration-500 ${overlayVisible ? "text-white/70 hover:text-white" : "text-white/60 hover:text-white/90"}`}
                aria-label="Cuenta"
              >
                <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>person</span>
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Full-screen overlay menu */}
      <div
        className={`fixed inset-0 z-40 bg-black transition-all duration-700 ${isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"}`}
        aria-hidden={!isMenuOpen}
      >
        <div className="flex h-full pt-20 px-8 sm:px-12 lg:px-20">

          {/* Navigation — left column */}
          <div className="flex flex-col justify-center flex-1 min-w-0">
            <nav aria-label="Menú principal">
              <ul className="space-y-0">
                {navigation.map((item, i) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="group flex items-baseline gap-5 sm:gap-8 py-2.5 sm:py-3"
                      style={{
                        opacity: isMenuOpen ? 1 : 0,
                        transform: isMenuOpen ? "translateY(0)" : "translateY(12px)",
                        transition: `opacity 600ms cubic-bezier(0.22, 1, 0.36, 1) ${i * 55 + 60}ms, transform 600ms cubic-bezier(0.22, 1, 0.36, 1) ${i * 55 + 60}ms`,
                      }}
                    >
                      <span className="editorial-label text-white/20 w-6 tabular-nums">{item.index}</span>
                      <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-white/75 transition-all duration-500 group-hover:text-white group-hover:translate-x-2">
                        {item.name}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Bottom bar */}
            <div
              className="mt-auto pb-10 sm:pb-12 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 border-t border-white/8 pt-8"
              style={{
                opacity: isMenuOpen ? 1 : 0,
                transition: "opacity 600ms cubic-bezier(0.22, 1, 0.36, 1) 440ms",
              }}
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
                <a href="tel:+13055550123" className="editorial-label text-white/40 hover:text-white/70 transition-colors">+1 (305) 555-0123</a>
                <span className="hidden sm:inline text-white/15">|</span>
                <a href="mailto:info@drivengroup.com" className="editorial-label text-white/40 hover:text-white/70 transition-colors">info@drivengroup.com</a>
              </div>
              <div className="flex gap-6">
                {["Instagram", "LinkedIn", "YouTube"].map((s) => (
                  <a key={s} href="#" className="editorial-label text-white/30 hover:text-white/60 transition-colors duration-300">{s.toUpperCase()}</a>
                ))}
              </div>
            </div>
          </div>

          {/* City widget — right column, desktop only */}
          <div
            className="hidden lg:flex flex-col justify-center w-64 xl:w-72 pl-12 xl:pl-16 border-l border-white/8 ml-12 xl:ml-16"
            style={{
              opacity: isMenuOpen ? 1 : 0,
              transition: "opacity 700ms cubic-bezier(0.22, 1, 0.36, 1) 200ms",
            }}
            ref={pickerRef}
          >
            {/* Active city display */}
            <div className="mb-8">
              <p className="editorial-label text-white/30 mb-5 tracking-[0.2em]">Local Time</p>

              {/* Big time */}
              <p className="text-5xl xl:text-6xl font-extralight text-white tabular-nums tracking-tight leading-none mb-2">
                {cityInfo.time}
              </p>

              {/* Date + temp row */}
              <div className="flex items-center gap-3 mt-3">
                <span className="editorial-label text-white/45">{cityInfo.date}</span>
                <span className="text-white/20">·</span>
                <span className="editorial-label text-white/45 tabular-nums">{cityInfo.temp}°F</span>
              </div>
            </div>

            {/* City selector */}
            <div>
              <p className="editorial-label text-white/25 mb-3 tracking-[0.2em]">City</p>
              <div className="space-y-0.5">
                {cities.map((city, idx) => {
                  const info = getCityInfo(city.tz, city.tempBase);
                  const isActive = idx === activeCityIdx;
                  return (
                    <button
                      key={city.label}
                      onClick={() => setActiveCityIdx(idx)}
                      className={`w-full flex items-center justify-between py-2.5 px-3 rounded transition-all duration-300 group ${
                        isActive
                          ? "bg-white/8 text-white"
                          : "text-white/40 hover:text-white/70 hover:bg-white/4"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {isActive && (
                          <span className="w-1 h-1 rounded-full bg-white/60 shrink-0" />
                        )}
                        {!isActive && <span className="w-1 h-1 shrink-0" />}
                        <span className="editorial-label text-current">{city.label}</span>
                      </div>
                      <span className="editorial-label text-current tabular-nums opacity-70">
                        {info.time}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* City widget — mobile (compact, inside menu below nav) */}
          {cityInfo.time && (
            <div
              className="lg:hidden absolute bottom-20 left-8 right-8 sm:left-12 sm:right-12 border-t border-white/8 pt-6"
              style={{
                opacity: isMenuOpen ? 1 : 0,
                transition: "opacity 600ms cubic-bezier(0.22, 1, 0.36, 1) 420ms",
              }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="editorial-label text-white/35">{activeCity.label}</span>
                  <span className="text-white/15">·</span>
                  <span className="editorial-label text-white/55 tabular-nums">{cityInfo.time}</span>
                  <span className="editorial-label text-white/35 tabular-nums">{cityInfo.temp}°F</span>
                  <span className="editorial-label text-white/25">{cityInfo.date}</span>
                </div>
                {/* Mobile city switcher — horizontal pills */}
                <div className="flex items-center gap-1.5">
                  {cities.map((city, idx) => (
                    <button
                      key={city.label}
                      onClick={() => setActiveCityIdx(idx)}
                      className={`editorial-label px-2 py-1 rounded transition-all duration-300 ${
                        idx === activeCityIdx
                          ? "text-white bg-white/10"
                          : "text-white/30 hover:text-white/60"
                      }`}
                    >
                      {city.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </>
  );
}
