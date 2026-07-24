"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { ThemeToggle } from "@/components/ThemeToggle";

const navigation = [
  { key: "home", href: "/", index: "01" },
  { key: "realEstate", href: "/real-estate", index: "02" },
  { key: "business", href: "/business", index: "03" },
  { key: "academy", href: "/academy", index: "04" },
  { key: "contact", href: "/contact", index: "05" },
  { key: "about", href: "/about", index: "06" },
] as const;

const cities = [
  { label: "Miami", tz: "America/New_York", tempBase: 82 },
  { label: "Mexico", tz: "America/Mexico_City", tempBase: 68 },
  { label: "Madrid", tz: "Europe/Madrid", tempBase: 63 },
];

function getCityInfo(city: (typeof cities)[number], locale: string) {
  const now = new Date();
  const formatLocale = locale === "es" ? "es-MX" : "en-US";

  return {
    time: now.toLocaleTimeString(formatLocale, { hour: "2-digit", minute: "2-digit", hour12: true, timeZone: city.tz }),
    date: now.toLocaleDateString(formatLocale, { weekday: "short", month: "short", day: "numeric", timeZone: city.tz }),
    temp: city.tempBase + Math.floor(Math.sin(now.getMinutes()) * 3),
  };
}

export function Navbar() {
  const t = useTranslations();
  const locale = useLocale();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeCityIdx, setActiveCityIdx] = useState(0);
  const [isNight, setIsNight] = useState(() => typeof document !== "undefined" && document.documentElement.dataset.theme === "night");
  const [, setTick] = useState(0);

  useEffect(() => {
    const intervalId = window.setInterval(() => setTick((value) => value + 1), 60_000);
    return () => window.clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const updateScrollState = () => setIsScrolled(window.scrollY > 50);
    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });
    return () => window.removeEventListener("scroll", updateScrollState);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMenuOpen]);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMenuOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  const activeCity = cities[activeCityIdx];
  const cityInfo = getCityInfo(activeCity, locale);
  const overlayVisible = isScrolled || isMenuOpen;
  const isRealEstate = pathname.includes("/real-estate");
  const isBusiness = pathname.includes("/business");
  const isAcademy = pathname.includes("/academy");

  return (
    <>
      <header className={`fixed inset-x-0 top-0 ${isMenuOpen ? "z-[1210]" : "z-50"} transition-all duration-700 ${overlayVisible ? "border-b border-light-gray bg-white/95 backdrop-blur-md" : "bg-transparent"}`} aria-label={t("ui.mainNavigation")}>
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <div className="grid h-16 items-center sm:h-20" style={{ gridTemplateColumns: "1fr auto 1fr" }}>
            <div className="flex items-center gap-5 sm:gap-6">
              <button onClick={() => setIsMenuOpen((open) => !open)} className="flex items-center gap-2.5 rounded text-dark-gray transition-colors hover:text-black focus:outline-none focus-visible:ring-1 focus-visible:ring-light-gray" aria-label={isMenuOpen ? t("ui.closeMenu") : t("ui.openMenu")} aria-controls="driven-main-menu" aria-expanded={isMenuOpen}>
                <span className="flex h-4 w-5 flex-col justify-between">
                  <span className={`block h-px bg-current transition-all ${isMenuOpen ? "translate-y-[7px] rotate-45" : ""}`} />
                  <span className={`block h-px bg-current transition-all ${isMenuOpen ? "scale-x-0 opacity-0" : ""}`} />
                  <span className={`block h-px bg-current transition-all ${isMenuOpen ? "-translate-y-[7px] -rotate-45" : ""}`} />
                </span>
                <span className="editorial-label hidden text-gray sm:inline">{t("ui.menu")}</span>
              </button>
              <div className="hidden items-center gap-3 border-l border-light-gray pl-5 md:flex">
                <span className="editorial-label text-gray">{activeCity.label}</span>
                <span className="editorial-label tabular-nums text-dark-gray">{cityInfo.time}</span>
                <span className="editorial-label tabular-nums text-gray">{cityInfo.temp}°F</span>
              </div>
            </div>

            <Link href="/" className="justify-self-center rounded focus:outline-none focus-visible:ring-1 focus-visible:ring-light-gray" aria-label={t("ui.homeAria")}>
              <BrandLogo className={isRealEstate || isBusiness || isAcademy ? "w-28 sm:w-40 md:w-48" : "w-20 sm:w-24"} variant={isRealEstate ? "realEstate" : isBusiness ? "business" : isAcademy ? "academy" : "corporate"} dark={isNight} />
            </Link>

            <div className="flex items-center justify-end gap-4 sm:gap-5">
              <Link href="/contact" className="hidden items-center gap-1.5 text-dark-gray transition-colors hover:text-black sm:flex" aria-label={t("ui.contact")}>
                <span className="material-symbols-outlined text-[18px]">phone</span>
                <span className="editorial-label hidden lg:inline">{t("ui.contact")}</span>
              </Link>
              <LanguageSwitcher />
              <ThemeToggle onThemeChange={setIsNight} />
              <Link href={`/${locale}/login`} className="rounded text-dark-gray transition-colors hover:text-black focus:outline-none focus-visible:ring-1 focus-visible:ring-light-gray" aria-label={t("ui.account")}>
                <span className="material-symbols-outlined text-[18px]">person</span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div id="driven-main-menu" role="dialog" aria-modal="true" className={`fixed inset-0 z-[1200] bg-white transition-all duration-500 ${isMenuOpen ? "visible opacity-100" : "invisible pointer-events-none opacity-0"}`} aria-hidden={!isMenuOpen}>
        <div className="grid h-full grid-cols-1 pt-20 xl:grid-cols-[minmax(19rem,20vw)_minmax(0,1fr)_minmax(15rem,17vw)]">
          <div className="relative z-10 flex min-w-0 flex-col justify-center px-8 sm:px-12 lg:px-20 xl:px-10 2xl:px-12">
            <nav aria-label={t("ui.mainNavigation")}>
              <ul>
                {navigation.map((item, index) => (
                  <li key={item.key}>
                    <Link href={item.href} onClick={() => setIsMenuOpen(false)} className="group flex items-baseline gap-5 py-2.5 sm:gap-8 sm:py-3" style={{ opacity: isMenuOpen ? 1 : 0, transform: isMenuOpen ? "translateY(0)" : "translateY(12px)", transition: `opacity 500ms ease ${index * 55 + 60}ms, transform 500ms ease ${index * 55 + 60}ms` }}>
                      <span className="editorial-label w-6 tabular-nums text-light-gray">{item.index}</span>
                      <span className="text-3xl font-semibold tracking-tight text-dark-gray transition-all duration-300 group-hover:translate-x-2 group-hover:text-black sm:text-4xl xl:text-5xl 2xl:text-6xl">{item.key === "realEstate" ? "Real Estate" : item.key === "business" ? "Business" : item.key === "academy" ? "Academy" : t(`nav.${item.key}`)}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="mt-auto flex flex-col gap-6 border-t border-light-gray pb-10 pt-8 sm:flex-row sm:items-center sm:justify-between sm:pb-12">
              <a href="mailto:info@drivengroup.com" className="editorial-label text-gray transition-colors hover:text-black">info@drivengroup.com</a>
            </div>
          </div>

          <div className="menu-brand-panel relative hidden overflow-hidden border-x border-white/10 xl:flex xl:items-center xl:justify-center">
            <BrandLogo className="menu-brand-logo relative z-10 w-72 2xl:w-80" imageClassName="brightness-0 invert" />
          </div>

          <aside className="relative z-10 hidden flex-col justify-center border-l border-light-gray px-8 xl:flex 2xl:px-10">
            <p className="editorial-label mb-5 tracking-[0.2em] text-gray">{t("ui.localTime")}</p>
            <p className="mb-2 text-5xl font-extralight leading-none tracking-tight text-black tabular-nums xl:text-6xl">{cityInfo.time}</p>
            <div className="mt-3 flex items-center gap-3">
              <span className="editorial-label text-dark-gray">{cityInfo.date}</span>
              <span className="text-light-gray">·</span>
              <span className="editorial-label tabular-nums text-dark-gray">{cityInfo.temp}°F</span>
            </div>
            <p className="editorial-label mb-3 mt-10 tracking-[0.2em] text-gray">{t("ui.city")}</p>
            <div className="space-y-0.5">
              {cities.map((city, index) => {
                const info = getCityInfo(city, locale);
                const isActive = index === activeCityIdx;
                return <button key={city.label} onClick={() => setActiveCityIdx(index)} className={`flex w-full items-center justify-between rounded px-3 py-2.5 transition-colors ${isActive ? "bg-light-gray text-black" : "text-gray hover:bg-light-gray/60 hover:text-dark-gray"}`}><span className="editorial-label">{city.label}</span><span className="editorial-label tabular-nums opacity-70">{info.time}</span></button>;
              })}
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
