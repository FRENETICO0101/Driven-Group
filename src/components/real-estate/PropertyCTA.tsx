"use client";

import { useRef, useState } from "react";
import { useLocale } from "next-intl";
import { createLeadAction } from "@/server/actions/lead.actions";
import type { Property } from "@/lib/types";

type FormState = "idle" | "form" | "loading" | "success" | "error";
interface PropertyCTAProps { property: Property; }
const inputClass = "w-full rounded-lg border border-light-gray bg-white px-3 py-2 text-sm text-black placeholder-gray focus:border-primary/50 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 sm:px-4 sm:py-3 sm:text-base";
const realEstateContact = { name: "Driven Real Estate", email: "administracion@drivengroup.com.mx" };
const copy = {
  es: { title: "Agendar consulta", body: "Nuestro equipo está disponible para discutir esta oportunidad de inversión.", request: "Solicitar información", received: "Consulta recibida", reply: "Un asesor se pondrá en contacto en las próximas 24 horas.", another: "Enviar otra consulta", name: "Nombre completo", email: "Correo electrónico", phone: "Teléfono", message: "Mensaje (opcional)", send: "Enviar", sending: "Enviando...", cancel: "Cancelar", direct: "Contacto directo", error: "No fue posible enviar la consulta." },
  en: { title: "Schedule a consultation", body: "Our team is available to discuss this investment opportunity.", request: "Request information", received: "Inquiry received", reply: "An advisor will contact you within the next 24 hours.", another: "Send another inquiry", name: "Full name", email: "Email address", phone: "Phone number", message: "Message (optional)", send: "Send", sending: "Sending...", cancel: "Cancel", direct: "Direct contact", error: "We couldn't send your inquiry." },
};

export function PropertyCTA({ property }: PropertyCTAProps) {
  const locale = useLocale();
  const t = copy[locale === "en" ? "en" : "es"];
  const [state, setState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); setState("loading"); setErrorMsg("");
    const data = new FormData(event.currentTarget);
    const visitorMessage = String(data.get("message") ?? "").trim();
    const propertyContext = `[${locale === "en" ? "Property" : "Propiedad"}: ${property.title}]`;
    const result = await createLeadAction({
      name: data.get("name") as string,
      email: data.get("email") as string,
      phone: data.get("phone") as string,
      message: visitorMessage ? `${propertyContext} ${visitorMessage}` : propertyContext,
      propertyId: property.id.startsWith("catalog-") ? undefined : property.id,
    });
    if (result.success) { setState("success"); formRef.current?.reset(); } else { setState("error"); setErrorMsg(result.error ?? t.error); }
  };

  return <div className="sticky top-20 space-y-4 rounded-lg border border-light-gray bg-white p-4 shadow-sm sm:top-24 sm:space-y-6 sm:rounded-xl sm:p-6 md:p-8">
    <div><h2 className="mb-2 text-xl font-bold text-black sm:text-2xl">{t.title}</h2><p className="text-sm text-gray sm:text-base">{t.body}</p></div>
    {state === "idle" && <button onClick={() => setState("form")} className="w-full rounded-lg bg-black py-2.5 text-sm font-semibold text-white transition-transform hover:scale-105 hover:bg-dark-gray sm:py-3 sm:text-base">{t.request}</button>}
    {state === "success" && <div className="space-y-2 py-4 text-center"><p className="text-sm font-semibold text-black sm:text-base">{t.received}</p><p className="text-xs text-gray sm:text-sm">{t.reply}</p><button onClick={() => setState("idle")} className="mt-2 text-xs text-primary/70 transition-colors hover:text-primary sm:text-sm">{t.another}</button></div>}
    {(state === "form" || state === "loading" || state === "error") && <form ref={formRef} onSubmit={handleSubmit} className="space-y-3 sm:space-y-4"><input name="name" required disabled={state === "loading"} placeholder={t.name} className={inputClass} /><input name="email" type="email" required disabled={state === "loading"} placeholder={t.email} className={inputClass} /><input name="phone" type="tel" required disabled={state === "loading"} placeholder={t.phone} className={inputClass} /><textarea name="message" rows={3} disabled={state === "loading"} placeholder={t.message} className={inputClass} />{state === "error" && <p className="text-xs text-red-400 sm:text-sm">{errorMsg}</p>}<div className="flex gap-2 sm:gap-3"><button type="submit" disabled={state === "loading"} className="flex-1 rounded-lg bg-black py-2.5 text-xs font-semibold text-white transition-colors hover:bg-dark-gray disabled:opacity-50 sm:py-3 sm:text-sm">{state === "loading" ? t.sending : t.send}</button><button type="button" disabled={state === "loading"} onClick={() => { setState("idle"); setErrorMsg(""); }} className="flex-1 rounded-lg border border-light-gray bg-white py-2.5 text-xs font-semibold text-black transition-colors hover:bg-light-gray disabled:opacity-50 sm:py-3 sm:text-sm">{t.cancel}</button></div></form>}
    <div className="border-t border-dark-gray/30 pt-4 sm:pt-6"><p className="mb-2 text-xs font-medium uppercase tracking-tight text-gray sm:text-sm">{t.direct}</p><div className="space-y-1"><p className="text-sm font-semibold text-black sm:text-base">{realEstateContact.name}</p><a href={`mailto:${realEstateContact.email}`} className="break-all text-xs text-dark-gray underline underline-offset-2 transition-colors hover:text-black sm:text-sm">{realEstateContact.email}</a></div></div>
  </div>;
}
