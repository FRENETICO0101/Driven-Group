"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Icon } from "@/components/ui/Icon";
import menuBrandLogo from "../../../assets/logos/logo-dg-blanco.png";

const navigation = [
  { key: "home", href: "/" },
  { key: "realEstate", href: "/real-estate" },
  { key: "business", href: "/business" },
  { key: "academy", href: "/academy" },
  { key: "contact", href: "/contact" },
  { key: "about", href: "/about" },
] as const;

const cities = [
  { label: "Miami", tz: "America/New_York", tempBase: 82 },
  { label: "Madrid", tz: "Europe/Madrid", tempBase: 63 },
];

const localCity = { label: "Mexico", tz: "America/Mexico_City", tempBase: 68 };

function getCityInfo(city: (typeof cities)[number], locale: string) {
  const now = new Date();
  const formatLocale = locale === "es" ? "es-MX" : "en-US";

  return {
    time: now.toLocaleTimeString(formatLocale, { hour: "2-digit", minute: "2-digit", hour12: true, timeZone: city.tz }),
    date: now.toLocaleDateString(formatLocale, { weekday: "short", month: "short", day: "numeric", timeZone: city.tz }),
    temp: city.tempBase + Math.floor(Math.sin(now.getMinutes()) * 3),
  };
}

function formatTemperature(fahrenheit: number, locale: string) {
  return locale === "es" ? `${Math.round((fahrenheit - 32) * 5 / 9)}°C` : `${fahrenheit}°F`;
}

export function Navbar() {
  const t = useTranslations();
  const locale = useLocale();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUtilityMenuOpen, setIsUtilityMenuOpen] = useState(false);
  const [activeCityIdx, setActiveCityIdx] = useState<number | null>(null);
  const utilityMenuRef = useRef<HTMLDivElement>(null);
  // Keep the first client render identical to SSR. The persisted theme is read
  // after hydration, otherwise the logo source can differ from server HTML.
  const [isNight, setIsNight] = useState(false);
  const [, setTick] = useState(0);

  useEffect(() => {
    const intervalId = window.setInterval(() => setTick((value) => value + 1), 60_000);
    return () => window.clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => setIsNight(document.documentElement.dataset.theme === "night"), 0);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const updateScrollState = () => {
      setIsScrolled(window.scrollY > 50);
      setIsMenuOpen(false);
      setIsUtilityMenuOpen(false);
    };
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
      if (event.key === "Escape") {
        setIsMenuOpen(false);
        setIsUtilityMenuOpen(false);
      }
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  useEffect(() => {
    const closeOnOutsidePointer = (event: PointerEvent) => {
      if (utilityMenuRef.current && !utilityMenuRef.current.contains(event.target as Node)) {
        setIsUtilityMenuOpen(false);
      }
    };

    document.addEventListener("pointerdown", closeOnOutsidePointer);
    return () => document.removeEventListener("pointerdown", closeOnOutsidePointer);
  }, []);

  const activeCity = activeCityIdx === null ? localCity : cities[activeCityIdx];
  const cityInfo = getCityInfo(activeCity, locale);
  const temperature = formatTemperature(cityInfo.temp, locale);
  const overlayVisible = isScrolled || isMenuOpen;
  const isRealEstate = pathname.includes("/real-estate");
  const isBusiness = pathname.includes("/business");
  const isAcademy = pathname.includes("/academy");
  const isAbout = pathname.includes("/about") || pathname.includes("/nosotros");
  const isHomeRoute = pathname === "/" || pathname === `/${locale}`;

  const handleHomeNavigation = (event: MouseEvent<HTMLAnchorElement>) => {
    if (!isHomeRoute) return;

    event.preventDefault();
    setIsMenuOpen(false);
    window.requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: "smooth" }));
  };

  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-[1300] isolate transition-all duration-700 ${overlayVisible ? "border-b border-light-gray bg-white/95 backdrop-blur-md" : "bg-transparent"}`} aria-label={t("ui.mainNavigation")}>
        <div className="mx-auto max-w-7xl px-4 sm:px-8">
          <div className="grid h-16 items-center sm:h-20" style={{ gridTemplateColumns: "1fr auto 1fr" }}>
            <div className="flex min-w-0 items-center gap-3 sm:gap-6">
              <button onClick={() => { setIsUtilityMenuOpen(false); setIsMenuOpen((open) => !open); }} className="flex items-center gap-2.5 rounded text-dark-gray transition-colors hover:text-black focus:outline-none focus-visible:ring-1 focus-visible:ring-light-gray" aria-label={isMenuOpen ? t("ui.closeMenu") : t("ui.openMenu")} aria-controls="driven-main-menu" aria-expanded={isMenuOpen}>
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
                <span className="editorial-label tabular-nums text-gray">{temperature}</span>
              </div>
            </div>

            <Link href="/" onClick={handleHomeNavigation} className="min-w-0 justify-self-center rounded focus:outline-none focus-visible:ring-1 focus-visible:ring-light-gray" aria-label={t("ui.homeAria")}>
              {isAbout ? (
                <span className="relative block h-6 w-32 sm:h-7 sm:w-40 md:h-8 md:w-48">
                  <Image src={isNight ? "/images1/logo-dg-blanco-cropped.png" : "/images1/logo-dg-negro-cropped.png"} alt="Driven Group" fill priority unoptimized className="object-contain" />
                </span>
              ) : (
                <BrandLogo className={isRealEstate || isBusiness || isAcademy ? "w-20 sm:w-28 md:w-32" : "w-14 sm:w-[4.5rem] md:w-20"} variant={isRealEstate ? "realEstate" : isBusiness ? "business" : isAcademy ? "academy" : "corporate"} dark={isNight} />
              )}
            </Link>

            <div className="flex shrink-0 items-center justify-end gap-2 sm:gap-5">
              <Link href="/contact" className="hidden items-center gap-1.5 text-dark-gray transition-colors hover:text-black sm:flex" aria-label={t("ui.contact")}>
                <Icon name="phone" className="h-[18px] w-[18px]" />
                <span className="editorial-label hidden lg:inline">{t("ui.contact")}</span>
              </Link>
              <div className="hidden items-center gap-2 sm:flex sm:gap-5">
                <LanguageSwitcher />
                <ThemeToggle onThemeChange={setIsNight} />
              </div>
              <div ref={utilityMenuRef} className="relative sm:hidden">
                <button
                  type="button"
                  onClick={() => setIsUtilityMenuOpen((open) => !open)}
                  aria-expanded={isUtilityMenuOpen}
                  aria-controls="driven-mobile-preferences"
                  aria-label={locale === "es" ? "Abrir preferencias" : "Open preferences"}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-light-gray bg-white/90 text-dark-gray shadow-sm transition-colors hover:bg-light-gray focus:outline-none focus-visible:ring-1 focus-visible:ring-dark-gray"
                >
                  <Icon name="tune" className="h-[18px] w-[18px]" />
                </button>
                <div
                  id="driven-mobile-preferences"
                  className={`absolute right-0 top-[calc(100%+0.65rem)] z-[1301] w-52 origin-top-right rounded-xl border border-light-gray bg-white p-3 shadow-xl transition-all duration-200 ${isUtilityMenuOpen ? "visible translate-y-0 opacity-100" : "invisible pointer-events-none -translate-y-1 opacity-0"}`}
                >
                  <div className="flex items-center justify-between gap-4 border-b border-light-gray pb-3">
                    <span className="editorial-label text-gray">{locale === "es" ? "Idioma" : "Language"}</span>
                    <div onClickCapture={() => setIsUtilityMenuOpen(false)}>
                      <LanguageSwitcher />
                    </div>
                  </div>
                  <div className="flex items-center justify-between gap-4 pt-3">
                    <span className="editorial-label text-gray">{locale === "es" ? "Apariencia" : "Appearance"}</span>
                    <div onClickCapture={() => setIsUtilityMenuOpen(false)}>
                      <ThemeToggle onThemeChange={setIsNight} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div id="driven-main-menu" role="dialog" aria-modal="true" className={`fixed inset-0 z-[1200] bg-white transition-all duration-500 ${isMenuOpen ? "visible opacity-100" : "invisible pointer-events-none opacity-0"}`} aria-hidden={!isMenuOpen}>
        <div className="grid h-full grid-cols-1 pt-20 xl:grid-cols-[minmax(15rem,19vw)_minmax(0,1fr)_minmax(18rem,22vw)] 2xl:grid-cols-[minmax(19rem,20vw)_minmax(0,1fr)_minmax(21rem,23vw)]">
          <div className="relative z-10 flex min-w-0 flex-col justify-center px-8 sm:px-12 lg:px-20 xl:px-5 2xl:px-12">
            <nav aria-label={t("ui.mainNavigation")}>
              <ul>
                {navigation.map((item, index) => (
                  <li key={item.key}>
                    <Link href={item.href} onClick={(event) => { if (item.key === "home") handleHomeNavigation(event); else setIsMenuOpen(false); }} className="group flex items-baseline py-2.5 sm:py-3" style={{ opacity: isMenuOpen ? 1 : 0, transform: isMenuOpen ? "translateY(0)" : "translateY(12px)", transition: `opacity 500ms ease ${index * 55 + 60}ms, transform 500ms ease ${index * 55 + 60}ms` }}>
                      <span className="whitespace-nowrap text-2xl font-medium tracking-tight text-dark-gray transition-all duration-300 group-hover:translate-x-2 group-hover:text-black sm:text-3xl xl:text-[1.8rem] 2xl:text-[2.7rem]">{item.key === "realEstate" ? "Real Estate" : item.key === "business" ? "Business" : item.key === "academy" ? "Academy" : t(`nav.${item.key}`)}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="mt-auto flex min-w-0 flex-col gap-6 pb-10 pt-8 sm:flex-row sm:items-center sm:justify-between sm:pb-12">
              <a href="mailto:administracion@drivengroup.com.mx" title="administracion@drivengroup.com.mx" className="editorial-label block w-full max-w-full break-all text-[0.42rem] leading-relaxed tracking-[0.025em] text-gray transition-colors hover:text-black xl:text-[0.45rem] 2xl:text-[0.625rem] 2xl:tracking-[0.08em]">administracion@drivengroup.com.mx</a>
            </div>
          </div>

          <div className="menu-brand-panel relative hidden min-w-0 overflow-hidden border-x border-white/10 xl:flex xl:items-center xl:justify-center">
            <div className="menu-brand-logo relative z-10 h-28 w-[min(76%,26rem)] 2xl:h-36 2xl:w-[34rem]">
              <Image
                src={menuBrandLogo}
                alt="Driven Group"
                fill
                sizes="(max-width: 1536px) 448px, 544px"
                className="object-cover object-center"
              />
            </div>
          </div>

          <aside className="relative z-10 hidden min-w-0 flex-col justify-center overflow-hidden border-l border-light-gray px-4 xl:flex 2xl:px-10">
            <p className="editorial-label mb-5 tracking-[0.2em] text-gray">{t("ui.localTime")}</p>
            <p className="mb-2 whitespace-nowrap text-[clamp(2.5rem,3.5vw,3.5rem)] font-extralight leading-none tracking-tight text-black tabular-nums">{cityInfo.time}</p>
            <div className="mt-3 flex items-center gap-3">
              <span className="editorial-label text-dark-gray">{cityInfo.date}</span>
              <span className="text-light-gray">·</span>
              <span className="editorial-label tabular-nums text-dark-gray">{temperature}</span>
            </div>
            <div className="mt-9 border-t border-light-gray pt-5">
              <p className="editorial-label mb-2 tracking-[0.2em] text-gray">{t("ui.city")}</p>
              <div className="space-y-0.5">
              {cities.map((city, index) => {
                const info = getCityInfo(city, locale);
                const isActive = index === activeCityIdx;
                return <button key={city.label} type="button" onClick={() => setActiveCityIdx(index)} aria-pressed={isActive} className={`grid w-full grid-cols-[5rem_3rem_auto] items-center gap-3 rounded py-2.5 text-left transition-colors ${isActive ? "bg-light-gray text-black" : "text-gray hover:bg-light-gray/60 hover:text-dark-gray"}`}><span className="editorial-label truncate">{city.label}</span><span className="editorial-label tabular-nums opacity-60">{formatTemperature(info.temp, locale)}</span><span className="editorial-label whitespace-nowrap tabular-nums opacity-70">{info.time}</span></button>;
              })}
              </div>
            </div>
          </aside>
        </div>
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-[5.625rem] z-20 hidden xl:grid xl:grid-cols-[minmax(15rem,19vw)_minmax(0,1fr)_minmax(18rem,22vw)] 2xl:grid-cols-[minmax(19rem,20vw)_minmax(0,1fr)_minmax(21rem,23vw)]">
          <span className="border-t border-light-gray" />
          <span />
          <span className="border-t border-light-gray" />
        </div>
      </div>
    </>
  );
}
