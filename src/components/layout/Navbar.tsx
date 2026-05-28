"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

interface NavItem {
  nameKey: string;
  href: string;
  index: string;
}

const navigationKeys: NavItem[] = [
  { nameKey: "nav.home",       href: "/",           index: "01" },
  { nameKey: "nav.realEstate", href: "/real-estate", index: "02" },
  { nameKey: "nav.business",   href: "/business",    index: "03" },
  { nameKey: "nav.academy",    href: "/academy",     index: "04" },
  { nameKey: "nav.contact",    href: "/contact",     index: "05" },
  { nameKey: "nav.about",      href: "/about",       index: "06" },
];

const cities = [
  { label: "Miami",  tz: "America/New_York",    tempBase: 82 },
  { label: "GDL",    tz: "America/Monterrey",   tempBase: 74 },
  { label: "CDMX",   tz: "America/Mexico_City", tempBase: 68 },
  { label: "NYC",    tz: "America/New_York",    tempBase: 58 },
  { label: "Madrid", tz: "Europe/Madrid",       tempBase: 63 },
  { label: "Dubai",  tz: "Asia/Dubai",          tempBase: 95 },
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
  const t = useTranslations();
  const [isScrolled,   setIsScrolled]   = useState(false);
  const [isMenuOpen,   setIsMenuOpen]   = useState(false);
  const [activeCityIdx, setActiveCityIdx] = useState(0);
  const [tick, setTick] = useState(0);
  const pickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const id = setInterval(() => setTick(n => n + 1), 60000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMenuOpen]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(e.target as Node)) {
        /* noop – picker stays open until city is selected */
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const activeCity = cities[activeCityIdx];
  const cityInfo   = getCityInfo(activeCity.tz, activeCity.tempBase);
  const overlayBg  = isScrolled || isMenuOpen;

  return (
    <>
      {/* ── Primary header bar ── */}
      <header
        className={`fixed left-0 right-0 top-0 z-50 transition-all duration-700 ${
          overlayBg
            ? "bg-white/97 border-b border-pale backdrop-blur-sm"
            : "bg-transparent"
        }`}
        aria-label="Navegación principal"
      >
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div
            className="grid items-center"
            style={{ gridTemplateColumns: "1fr auto 1fr", height: "clamp(3.5rem, 5vw, 5rem)" }}
          >
            {/* Left — hamburger + city strip */}
            <div className="flex items-center gap-5 sm:gap-7">
              {/* Hamburger */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`group flex items-center gap-2.5 focus:outline-none focus-visible:ring-1 focus-visible:ring-light-gray rounded transition-colors duration-500 ${
                  overlayBg ? "text-ink" : "text-white"
                }`}
                aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
                aria-expanded={isMenuOpen}
              >
                <div className="w-5 h-3.5 flex flex-col justify-between">
                  <span
                    className={`block h-px bg-current origin-center transition-all duration-500 ${
                      isMenuOpen ? "rotate-45 translate-y-[7px]" : ""
                    }`}
                  />
                  <span
                    className={`block h-px bg-current transition-all duration-300 ${
                      isMenuOpen ? "opacity-0 scale-x-0" : ""
                    }`}
                  />
                  <span
                    className={`block h-px bg-current origin-center transition-all duration-500 ${
                      isMenuOpen ? "-rotate-45 -translate-y-[7px]" : ""
                    }`}
                  />
                </div>
                <span className="hidden sm:inline editorial-label text-current opacity-60 group-hover:opacity-100 transition-opacity">
                  {t("ui.menu")}
                </span>
              </button>

              {/* City strip — desktop only */}
              {cityInfo.time && (
                <div className="hidden md:flex items-center gap-3 pl-5 border-l border-pale">
                  <span className={`editorial-label ${overlayBg ? "text-gray" : "text-white/50"}`}>
                    {activeCity.label}
                  </span>
                  <span className={`editorial-label tabular-nums ${overlayBg ? "text-dark-gray" : "text-white/70"}`}>
                    {cityInfo.time}
                  </span>
                  <span className={`editorial-label tabular-nums ${overlayBg ? "text-gray" : "text-white/40"}`}>
                    {cityInfo.temp}°F
                  </span>
                </div>
              )}
            </div>

            {/* Center — wordmark */}
            <Link
              href="/"
              className="justify-self-center focus:outline-none focus-visible:ring-1 focus-visible:ring-light-gray rounded flex items-center gap-2.5"
              aria-label="Driven Group — Inicio"
            >
              <BrandLogo
                className={`h-4 sm:h-5 w-auto transition-colors duration-700 ${
                  overlayBg ? "text-ink" : "text-white"
                }`}
              />
              <span
                className={`text-[11px] sm:text-sm font-semibold tracking-[0.3em] uppercase transition-colors duration-700 ${
                  overlayBg ? "text-ink" : "text-white"
                }`}
              >
                DRIVEN GROUP
              </span>
            </Link>

            {/* Right — utility row */}
            <div className="flex items-center justify-end gap-4 sm:gap-5">
              <Link
                href="/contact"
                className={`hidden sm:flex items-center gap-1.5 transition-colors duration-300 ${
                  overlayBg
                    ? "text-gray hover:text-ink"
                    : "text-white/60 hover:text-white"
                }`}
                aria-label={t("nav.contact")}
              >
                <span className="material-symbols-outlined" style={{ fontSize: "16px", fontVariationSettings: "'wght' 200" }}>
                  phone
                </span>
                <span className="hidden lg:inline editorial-label">{t("nav.contact")}</span>
              </Link>

              <div className="hidden md:flex">
                <LanguageSwitcher />
              </div>

              <button
                className={`transition-colors duration-300 ${
                  overlayBg
                    ? "text-gray hover:text-ink"
                    : "text-white/60 hover:text-white"
                }`}
                aria-label={t("ui.account")}
              >
                <span
                  className="material-symbols-outlined"
                  style={{ fontSize: "16px", fontVariationSettings: "'wght' 200" }}
                >
                  person
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ── Full-screen overlay menu ── */}
      <div
        className={`fixed inset-0 z-40 bg-white transition-all duration-700 ${
          isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        }`}
        aria-hidden={!isMenuOpen}
      >
        <div className="flex h-full pt-20 px-8 sm:px-12 lg:px-16 xl:px-24">

          {/* Nav links — left column */}
          <div className="flex flex-col justify-center flex-1 min-w-0">
            <nav aria-label={t("ui.mainMenu")}>
              <ul className="space-y-0">
                {navigationKeys.map((item, i) => {
                  const navKey = item.nameKey.split(".")[1];
                  const name   = t(`nav.${navKey}`);
                  return (
                    <li key={item.nameKey}>
                      <Link
                        href={item.href}
                        onClick={() => setIsMenuOpen(false)}
                        className="group flex items-baseline gap-5 sm:gap-8 py-2 sm:py-2.5"
                        style={{
                          opacity:   isMenuOpen ? 1 : 0,
                          transform: isMenuOpen ? "translateY(0)" : "translateY(14px)",
                          transition: `opacity 700ms cubic-bezier(0.22,1,0.36,1) ${i * 60 + 80}ms,
                                       transform 700ms cubic-bezier(0.22,1,0.36,1) ${i * 60 + 80}ms`,
                        }}
                      >
                        <span className="editorial-label text-light-gray w-6 tabular-nums shrink-0">
                          {item.index}
                        </span>
                        <span className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] tracking-tight text-dark-gray transition-all duration-500 group-hover:text-ink group-hover:translate-x-2 inline-block">
                          {name}
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* Bottom bar */}
            <div
              className="mt-auto pb-10 sm:pb-12 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 border-t border-pale pt-7"
              style={{
                opacity: isMenuOpen ? 1 : 0,
                transition: "opacity 700ms cubic-bezier(0.22,1,0.36,1) 500ms",
              }}
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
                <a
                  href="tel:+13055550123"
                  className="editorial-label text-gray hover:text-ink transition-colors duration-300"
                >
                  +1 (305) 555-0123
                </a>
                <span className="hidden sm:inline w-px h-3 bg-pale" />
                <a
                  href="mailto:info@drivengroup.com"
                  className="editorial-label text-gray hover:text-ink transition-colors duration-300"
                >
                  info@drivengroup.com
                </a>
              </div>
              <div className="flex gap-6">
                {["Instagram", "LinkedIn", "YouTube"].map((s) => (
                  <a
                    key={s}
                    href="#"
                    className="editorial-label text-gray hover:text-ink transition-colors duration-300"
                  >
                    {s}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* City widget — right column, desktop only */}
          <div
            className="hidden lg:flex flex-col justify-center w-60 xl:w-72 pl-12 xl:pl-16 border-l border-pale ml-12 xl:ml-16"
            style={{
              opacity: isMenuOpen ? 1 : 0,
              transition: "opacity 800ms cubic-bezier(0.22,1,0.36,1) 250ms",
            }}
            ref={pickerRef}
          >
            {/* Active city big time */}
            <div className="mb-10">
              <p className="editorial-label text-gray mb-5">Local Time</p>
              <p className="text-5xl xl:text-6xl font-extralight text-ink tabular-nums tracking-tight leading-none mb-2">
                {cityInfo.time}
              </p>
              <div className="flex items-center gap-3 mt-3">
                <span className="editorial-label text-dark-gray">{cityInfo.date}</span>
                <span className="text-pale">·</span>
                <span className="editorial-label text-dark-gray tabular-nums">{cityInfo.temp}°F</span>
              </div>
            </div>

            {/* City selector */}
            <div>
              <p className="editorial-label text-gray mb-3">City</p>
              <div className="space-y-px">
                {cities.map((city, idx) => {
                  const info     = getCityInfo(city.tz, city.tempBase);
                  const isActive = idx === activeCityIdx;
                  return (
                    <button
                      key={city.label}
                      onClick={() => setActiveCityIdx(idx)}
                      className={`w-full flex items-center justify-between py-2.5 px-3 rounded transition-all duration-300 ${
                        isActive
                          ? "bg-off-white text-ink"
                          : "text-gray hover:text-dark-gray hover:bg-off-white"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`w-1 h-1 rounded-full shrink-0 transition-all duration-300 ${
                            isActive ? "bg-ink" : "bg-transparent"
                          }`}
                        />
                        <span className="editorial-label">{city.label}</span>
                      </div>
                      <span className="editorial-label tabular-nums opacity-70">{info.time}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* City strip — mobile (compact) */}
          {cityInfo.time && (
            <div
              className="lg:hidden absolute bottom-20 left-8 right-8 sm:left-12 sm:right-12 border-t border-pale pt-6"
              style={{
                opacity: isMenuOpen ? 1 : 0,
                transition: "opacity 700ms cubic-bezier(0.22,1,0.36,1) 480ms",
              }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="editorial-label text-gray">{activeCity.label}</span>
                  <span className="text-pale">·</span>
                  <span className="editorial-label text-dark-gray tabular-nums">{cityInfo.time}</span>
                  <span className="editorial-label text-gray tabular-nums">{cityInfo.temp}°F</span>
                </div>
                <div className="flex items-center gap-1.5">
                  {cities.map((city, idx) => (
                    <button
                      key={city.label}
                      onClick={() => setActiveCityIdx(idx)}
                      className={`editorial-label px-2 py-1 rounded transition-all duration-300 ${
                        idx === activeCityIdx
                          ? "text-ink bg-off-white"
                          : "text-gray hover:text-dark-gray"
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
