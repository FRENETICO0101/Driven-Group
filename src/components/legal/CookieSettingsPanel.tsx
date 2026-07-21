"use client";

import { useState } from "react";

export function CookieSettingsPanel({ locale }: { locale: "es" | "en" }) {
  const [cleared, setCleared] = useState(false);
  const copy = locale === "es"
    ? { title: "Preferencias guardadas", text: "El sitio utiliza una cookie funcional para recordar el idioma seleccionado. No hay categorías opcionales de analítica o publicidad activadas en el código actual.", button: "Restablecer preferencia de idioma", confirmation: "La preferencia de idioma se eliminó de este navegador.", necessary: "Necesarias", language: "Idioma", session: "Sesión de administración" }
    : { title: "Saved preferences", text: "The site uses a functional cookie to remember the selected language. No optional analytics or advertising cookie categories are enabled in the current code.", button: "Reset language preference", confirmation: "The language preference was removed from this browser.", necessary: "Necessary", language: "Language", session: "Admin session" };

  const resetLanguage = () => {
    document.cookie = "NEXT_LOCALE=; path=/; max-age=0; samesite=lax";
    setCleared(true);
  };

  return (
    <section className="rounded-xl border border-light-gray bg-white p-5 shadow-[0_8px_20px_rgba(37,37,37,0.04)] sm:p-6">
      <h2 className="font-serif text-2xl font-bold text-black">{copy.title}</h2>
      <p className="mt-3 leading-relaxed text-dark-gray">{copy.text}</p>
      <dl className="mt-6 divide-y divide-light-gray border-y border-light-gray text-sm">
        <div className="flex items-center justify-between gap-4 py-4"><dt className="font-semibold text-black">{copy.language}</dt><dd>{copy.necessary}</dd></div>
        <div className="flex items-center justify-between gap-4 py-4"><dt className="font-semibold text-black">{copy.session}</dt><dd>{copy.necessary}</dd></div>
      </dl>
      <button type="button" onClick={resetLanguage} className="mt-6 rounded-lg border border-black px-4 py-2.5 text-sm font-semibold text-black transition-colors hover:bg-black hover:text-white">{copy.button}</button>
      {cleared && <p className="mt-3 text-sm text-dark-gray" role="status">{copy.confirmation}</p>}
    </section>
  );
}
