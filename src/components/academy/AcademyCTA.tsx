"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import { sendContactAction } from "@/server/actions/contact.actions";

const copy = {
  es: {
    label: "OFERTA DE LANZAMIENTO",
    title: "Empieza a construir una vida financiera con dirección.",
    body: "Sé parte de la primera generación de Modo Rico y aplica un método práctico desde el primer día.",
    proof: "Acceso online 24/7 · Formación práctica · Garantía de 7 días",
    primary: "QUIERO APLICAR ESTE MÉTODO",
    secondary: "VER LA CURRÍCULA",
    access: "ACCESO ONLINE 24/7",
    community: "COMUNIDAD PRIVADA",
    guarantee: "GARANTÍA DE 7 DÍAS",
    formLabel: "SOLICITA INFORMACIÓN",
    formTitle: "Da el siguiente paso con Modo Rico.",
    formBody: "Compártenos tus datos y un asesor de Driven Academy se pondrá en contacto contigo.",
    name: "Nombre completo",
    nameHint: "Indícanos cómo podemos dirigirnos a ti.",
    email: "Correo electrónico",
    emailHint: "Te enviaremos la información a esta dirección.",
    phone: "Teléfono",
    phoneHint: "Incluye código de país para facilitar el seguimiento.",
    message: "¿Hay algo que quieras que sepamos? (opcional)",
    submit: "SOLICITAR INFORMACIÓN",
    sending: "ENVIANDO...",
    success: "Recibimos tus datos. Pronto nos pondremos en contacto contigo.",
    error: "No pudimos enviar tu solicitud. Inténtalo de nuevo.",
    defaultMessage: "Solicito información sobre Modo Rico.",
  },
  en: {
    label: "LAUNCH OFFER",
    title: "Start building a financial life with direction.",
    body: "Join the first Modo Rico generation and apply a practical method from day one.",
    proof: "Online access 24/7 · Practical learning · 7-day guarantee",
    primary: "I WANT TO APPLY THIS METHOD",
    secondary: "VIEW THE CURRICULUM",
    access: "ONLINE ACCESS 24/7",
    community: "PRIVATE COMMUNITY",
    guarantee: "7-DAY GUARANTEE",
    formLabel: "REQUEST INFORMATION",
    formTitle: "Take the next step with Modo Rico.",
    formBody: "Share your details and a Driven Academy advisor will contact you.",
    name: "Full name",
    nameHint: "Tell us how we should address you.",
    email: "Email address",
    emailHint: "We will send the information to this address.",
    phone: "Phone number",
    phoneHint: "Include your country code so we can follow up easily.",
    message: "Is there anything you want us to know? (optional)",
    submit: "REQUEST INFORMATION",
    sending: "SENDING...",
    success: "We received your details. We will contact you soon.",
    error: "We could not send your request. Please try again.",
    defaultMessage: "I would like information about Modo Rico.",
  },
};

export function AcademyCTA() {
  const locale = useLocale();
  const t = copy[locale === "en" ? "en" : "es"];
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("loading");
    const form = new FormData(event.currentTarget);
    const message = String(form.get("message") || "").trim() || t.defaultMessage;
    const result = await sendContactAction({
      name: String(form.get("name") || ""),
      email: String(form.get("email") || ""),
      phone: String(form.get("phone") || ""),
      subject: "academy",
      message,
    });

    if (result.success) {
      event.currentTarget.reset();
      setStatus("success");
      return;
    }

    setStatus("error");
  };

  return (
    <section id="academy-cta" className="mx-auto max-w-7xl px-6 py-20 sm:px-8 sm:py-24 md:py-32">
      <div className="rounded-2xl bg-black p-10 text-center shadow-2xl sm:p-16 md:p-20">
        <p className="editorial-label mb-4 text-white/40">{t.label}</p>
        <h2 className="mx-auto mb-6 max-w-2xl font-serif text-3xl font-black leading-[1.2] text-white sm:text-4xl md:text-5xl">{t.title}</h2>
        <p className="mx-auto mb-4 max-w-xl text-lg leading-relaxed text-white/60">{t.body}</p>
        <p className="mb-10 text-sm font-semibold uppercase tracking-wide text-gray">{t.proof}</p>
        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          <button type="button" onClick={() => { setStatus("idle"); setIsOpen(true); }} className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-7 py-3.5 text-sm font-bold text-black transition-transform hover:-translate-y-0.5 hover:bg-gray">
            {t.primary}<span className="material-symbols-outlined text-base">north_east</span>
          </button>
          <a href="#modulos" className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/30 px-7 py-3.5 text-sm font-bold text-white transition-colors hover:bg-white/10">
            {t.secondary}<span className="material-symbols-outlined text-base">arrow_upward</span>
          </a>
        </div>
        <div className="mt-10 flex flex-wrap justify-center gap-6 text-xs tracking-widest text-white/40"><span>{t.access}</span><span>{t.community}</span><span>{t.guarantee}</span></div>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 sm:p-6" role="dialog" aria-modal="true" aria-labelledby="academy-lead-title">
          <div className="w-full max-w-xl rounded-2xl bg-white p-6 shadow-2xl sm:p-9">
            <div className="mb-3 flex justify-end">
              <button type="button" onClick={() => setIsOpen(false)} className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-light-gray text-black transition-colors hover:bg-light-gray" aria-label="Close form">
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>
            {status === "success" ? (
              <div className="py-10 text-center"><span className="material-symbols-outlined text-4xl text-black">task_alt</span><p className="mt-5 text-lg font-semibold text-black">{t.success}</p></div>
            ) : (
              <>
                <p className="editorial-label text-gray">{t.formLabel}</p>
                <h2 id="academy-lead-title" className="mt-3 font-serif text-3xl font-black leading-tight text-black sm:text-4xl">{t.formTitle}</h2>
                <p className="mt-4 text-sm leading-relaxed text-dark-gray sm:text-base">{t.formBody}</p>
                <form className="mt-7 space-y-4" onSubmit={handleSubmit}>
                  <Field id="academy-name" name="name" label={t.name} hint={t.nameHint} required />
                  <Field id="academy-email" name="email" type="email" label={t.email} hint={t.emailHint} required />
                  <Field id="academy-phone" name="phone" type="tel" label={t.phone} hint={t.phoneHint} required />
                  <div>
                    <label htmlFor="academy-message" className="mb-2 block text-sm font-semibold text-black">{t.message}</label>
                    <textarea id="academy-message" name="message" rows={3} className="w-full resize-none rounded-lg border border-light-gray bg-white px-4 py-3 text-black placeholder-gray outline-none transition-colors focus:border-black" />
                  </div>
                  {status === "error" && <p className="text-sm font-medium text-red-600">{t.error}</p>}
                  <button disabled={status === "loading"} type="submit" className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-black px-6 py-3.5 text-sm font-bold text-white transition-colors hover:bg-dark-gray disabled:cursor-not-allowed disabled:opacity-60">
                    {status === "loading" ? t.sending : t.submit}<span className="material-symbols-outlined text-base">arrow_forward</span>
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

function Field({ id, name, label, hint, type = "text", required = false }: { id: string; name: string; label: string; hint: string; type?: string; required?: boolean }) {
  return <div><label htmlFor={id} className="block text-sm font-semibold text-black">{label}</label><p className="mb-2 text-xs text-dark-gray">{hint}</p><input id={id} required={required} name={name} type={type} className="w-full rounded-lg border border-light-gray bg-white px-4 py-3 text-black outline-none transition-colors focus:border-black" /></div>;
}
