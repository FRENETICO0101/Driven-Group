"use client";

import { useEffect, useState } from "react";

const THEME_KEY = "driven-theme";
const THEME_EVENT = "driven-theme-change";

function applyTheme(isNight: boolean) {
  document.documentElement.dataset.theme = isNight ? "night" : "day";
  localStorage.setItem(THEME_KEY, isNight ? "night" : "day");
  window.dispatchEvent(new CustomEvent(THEME_EVENT, { detail: isNight }));
}

export function ThemeToggle({ variant = "navigation", onThemeChange }: { variant?: "navigation" | "hero"; onThemeChange?: (isNight: boolean) => void }) {
  const [isNight, setIsNight] = useState(() => typeof document !== "undefined" && (document.documentElement.dataset.theme === "night" || localStorage.getItem(THEME_KEY) === "night"));

  useEffect(() => {
    const syncTheme = (event: Event) => {
      const nextNight = (event as CustomEvent<boolean>).detail;
      setIsNight(nextNight);
      onThemeChange?.(nextNight);
    };
    window.addEventListener(THEME_EVENT, syncTheme);
    return () => window.removeEventListener(THEME_EVENT, syncTheme);
  }, [onThemeChange]);

  const toggleTheme = () => {
    const nextNight = !isNight;
    setIsNight(nextNight);
    applyTheme(nextNight);
    onThemeChange?.(nextNight);
  };

  const hero = variant === "hero";
  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-pressed={isNight}
      aria-label={isNight ? "Switch to day mode" : "Switch to night mode"}
      className={hero ? "group text-center text-white transition-opacity hover:opacity-75" : "inline-flex h-8 w-8 items-center justify-center rounded-full text-dark-gray transition-colors hover:bg-light-gray/50 hover:text-black"}
    >
      <span className={`material-symbols-outlined block ${hero ? "text-2xl" : "text-[19px]"}`}>{isNight ? "dark_mode" : "light_mode"}</span>
      {hero && <span className="mt-2 block text-xs font-semibold tracking-widest">{isNight ? "NIGHT" : "DAY"}</span>}
    </button>
  );
}
