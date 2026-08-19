"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { sendContactAction } from "@/server/actions/contact.actions";

type ContactSubject = "real-estate" | "business" | "academy" | "general";

const countryCodes = [
  { code: "+52", iso: "mx", label: "México" },
  { code: "+1", iso: "us", label: "Estados Unidos" },
  { code: "+1", iso: "ca", label: "Canadá" },
  { code: "+34", iso: "es", label: "España" },
  { code: "+57", iso: "co", label: "Colombia" },
  { code: "+54", iso: "ar", label: "Argentina" },
  { code: "+55", iso: "br", label: "Brasil" },
  { code: "+56", iso: "cl", label: "Chile" },
  { code: "+51", iso: "pe", label: "Perú" },
  { code: "+44", iso: "gb", label: "Reino Unido" },
  { code: "+33", iso: "fr", label: "Francia" },
  { code: "+49", iso: "de", label: "Alemania" },
  { code: "+971", iso: "ae", label: "Emiratos Árabes Unidos" },
] as const;

export function GetInTouchForm({ defaultSubject, sectionId = "form" }: { defaultSubject?: ContactSubject; sectionId?: string }) {
  const t = useTranslations("contactForm");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [country, setCountry] = useState<(typeof countryCodes)[number]>(countryCodes[0]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");
    setErrorMessage("");

    try {
      const formData = new FormData(event.currentTarget);
      const result = await sendContactAction({
        name: String(formData.get("name")),
        email: String(formData.get("email")),
        phone: formData.get("phone") ? `${country.code} ${String(formData.get("phone")).trim()}` : "",
        subject: formData.get("subject") as ContactSubject,
        message: String(formData.get("message")),
      });

      if (result.success) {
        setSubmitStatus("success");
        event.currentTarget.reset();
        setCountry(countryCodes[0]);
      } else {
        setSubmitStatus("error");
        setErrorMessage(result.error || t("error"));
      }
    } catch {
      setSubmitStatus("error");
      setErrorMessage(t("unexpectedError"));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id={sectionId} className="mx-auto max-w-4xl px-6 py-20 sm:px-8 sm:py-24 md:py-32">
      <div className="mb-16 sm:mb-20">
        <p className="editorial-label mb-2 text-gray">{t("eyebrow")}</p>
        <h2 className="font-serif text-4xl font-black leading-[1.1] tracking-tight text-black sm:text-5xl md:text-6xl">{t("title")}</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-7 rounded-2xl border border-light-gray bg-white p-5 shadow-[0_18px_42px_rgba(37,37,37,0.045)] sm:p-8 md:p-10">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <Field id="name" label={t("name")} placeholder={t("namePlaceholder")} required />
          <Field id="email" type="email" label={t("email")} placeholder="you@email.com" required />
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <PhoneField country={country} onCountryChange={setCountry} label={t("phone")} />
          {defaultSubject ? (
            <input type="hidden" name="subject" value={defaultSubject} />
          ) : <div className="flex flex-col">
            <label htmlFor="subject" className="editorial-label mb-3 tracking-wide text-dark-gray">{t("subject")}</label>
            <select id="subject" name="subject" required defaultValue="" className="cursor-pointer rounded-lg border border-light-gray bg-white px-4 py-3 text-black transition-all focus:border-dark-gray focus:outline-none focus:ring-4 focus:ring-dark-gray/10">
              <option value="" disabled>{t("selectTopic")}</option>
              <option value="real-estate">{t("realEstate")}</option>
              <option value="business">{t("business")}</option>
              <option value="academy">{t("academy")}</option>
              <option value="general">{t("general")}</option>
            </select>
          </div>}
        </div>
        <div className="flex flex-col">
          <label htmlFor="message" className="editorial-label mb-3 tracking-wide text-dark-gray">{t("message")}</label>
          <textarea id="message" name="message" required rows={6} placeholder={t("messagePlaceholder")} className="resize-none rounded-lg border border-light-gray bg-white px-4 py-3 text-black placeholder-gray transition-all focus:border-dark-gray focus:outline-none focus:ring-4 focus:ring-dark-gray/10" />
        </div>
        <div className="flex flex-wrap items-center gap-4 pt-3">
          <button type="submit" disabled={isSubmitting} aria-busy={isSubmitting} className="min-w-48 rounded-lg bg-black px-8 py-4 font-semibold tracking-wide text-white transition-all hover:-translate-y-0.5 hover:bg-dark-gray disabled:cursor-not-allowed disabled:opacity-50">{isSubmitting ? t("sending") : t("send")}</button>
          {submitStatus === "success" && <p aria-live="polite" className="text-sm font-medium tracking-wide text-green-700">{t("success")}</p>}
          {submitStatus === "error" && <p aria-live="polite" className="text-sm font-medium tracking-wide text-red-700">{errorMessage || t("error")}</p>}
        </div>
      </form>
    </section>
  );
}

function PhoneField({ country, onCountryChange, label }: { country: (typeof countryCodes)[number]; onCountryChange: (country: (typeof countryCodes)[number]) => void; label: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const closeMenu = (event: MouseEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) setIsOpen(false);
    };
    document.addEventListener("mousedown", closeMenu);
    return () => document.removeEventListener("mousedown", closeMenu);
  }, []);

  return <div className="flex flex-col">
    <label htmlFor="phone" className="editorial-label mb-3 tracking-wide text-dark-gray">{label}</label>
    <div className="flex rounded-lg border border-light-gray bg-white transition-all focus-within:border-dark-gray focus-within:ring-4 focus-within:ring-dark-gray/10">
      <div ref={menuRef} className="relative shrink-0 border-r border-light-gray">
        <button type="button" onClick={() => setIsOpen((open) => !open)} aria-haspopup="listbox" aria-expanded={isOpen} className="flex h-full min-w-[7.5rem] items-center gap-2 px-3 text-sm font-medium text-black hover:bg-light-gray/30">
          <Image src={`https://flagcdn.com/w40/${country.iso}.png`} alt="" width={20} height={15} className="rounded-sm shadow-sm" />
          <span>{country.code}</span>
          <span className="material-symbols-outlined text-base">expand_more</span>
        </button>
        {isOpen && <div role="listbox" aria-label="País y código telefónico" className="absolute left-0 top-[calc(100%+0.5rem)] z-20 max-h-72 w-72 overflow-y-auto rounded-xl border border-light-gray bg-white p-1.5 shadow-xl">
          {countryCodes.map((option) => <button key={`${option.iso}-${option.code}`} type="button" role="option" aria-selected={option.iso === country.iso} onClick={() => { onCountryChange(option); setIsOpen(false); }} className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${option.iso === country.iso ? "bg-black text-white" : "text-dark-gray hover:bg-light-gray"}`}>
            <Image src={`https://flagcdn.com/w40/${option.iso}.png`} alt="" width={20} height={15} className="rounded-sm shadow-sm" />
            <span className="w-11 tabular-nums">{option.code}</span><span>{option.label}</span>
          </button>)}
        </div>}
      </div>
      <input id="phone" name="phone" type="tel" inputMode="tel" placeholder="33 3344 78420" className="min-w-0 flex-1 rounded-r-lg bg-transparent px-4 py-3 text-black placeholder-gray outline-none" />
    </div>
  </div>;
}

function Field({ id, label, placeholder, type = "text", required = false }: { id: string; label: string; placeholder: string; type?: string; required?: boolean }) {
  return <div className="flex flex-col"><label htmlFor={id} className="editorial-label mb-3 tracking-wide text-dark-gray">{label}</label><input type={type} id={id} name={id} required={required} placeholder={placeholder} className="rounded-lg border border-light-gray bg-white px-4 py-3 text-black placeholder-gray transition-all focus:border-dark-gray focus:outline-none focus:ring-4 focus:ring-dark-gray/10" /></div>;
}
