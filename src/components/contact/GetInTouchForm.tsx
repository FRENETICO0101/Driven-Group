"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { sendContactAction } from "@/server/actions/contact.actions";

export function GetInTouchForm() {
  const t = useTranslations("contactForm");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

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
        phone: String(formData.get("phone") || ""),
        subject: formData.get("subject") as "real-estate" | "business" | "academy" | "general",
        message: String(formData.get("message")),
      });

      if (result.success) {
        setSubmitStatus("success");
        event.currentTarget.reset();
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
    <section id="form" className="mx-auto max-w-4xl px-6 py-20 sm:px-8 sm:py-24 md:py-32">
      <div className="mb-16 sm:mb-20">
        <p className="editorial-label mb-2 text-gray">{t("eyebrow")}</p>
        <h2 className="font-serif text-4xl font-black leading-[1.1] tracking-tight text-black sm:text-5xl md:text-6xl">{t("title")}</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <Field id="name" label={t("name")} placeholder={t("namePlaceholder")} required />
          <Field id="email" type="email" label={t("email")} placeholder="you@email.com" required />
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <Field id="phone" type="tel" label={t("phone")} placeholder="+1 (305) 555-0000" />
          <div className="flex flex-col">
            <label htmlFor="subject" className="editorial-label mb-3 tracking-wide text-dark-gray">{t("subject")}</label>
            <select id="subject" name="subject" required defaultValue="" className="cursor-pointer rounded-lg border border-light-gray bg-white px-4 py-3 text-black transition-all focus:border-transparent focus:outline-none focus:ring-2 focus:ring-yellow-500">
              <option value="" disabled>{t("selectTopic")}</option>
              <option value="real-estate">{t("realEstate")}</option>
              <option value="business">{t("business")}</option>
              <option value="academy">{t("academy")}</option>
              <option value="general">{t("general")}</option>
            </select>
          </div>
        </div>
        <div className="flex flex-col">
          <label htmlFor="message" className="editorial-label mb-3 tracking-wide text-dark-gray">{t("message")}</label>
          <textarea id="message" name="message" required rows={6} placeholder={t("messagePlaceholder")} className="resize-none rounded-lg border border-light-gray bg-white px-4 py-3 text-black placeholder-gray transition-all focus:border-transparent focus:outline-none focus:ring-2 focus:ring-yellow-500" />
        </div>
        <div className="flex flex-wrap items-center gap-5 pt-4">
          <button type="submit" disabled={isSubmitting} className="rounded-lg bg-black px-8 py-4 font-semibold tracking-wide text-white transition-colors hover:bg-dark-gray disabled:cursor-not-allowed disabled:opacity-50">{isSubmitting ? t("sending") : t("send")}</button>
          {submitStatus === "success" && <p className="text-sm font-semibold tracking-wide text-green-600">✓ {t("success")}</p>}
          {submitStatus === "error" && <p className="text-sm font-semibold tracking-wide text-red-600">✕ {errorMessage || t("error")}</p>}
        </div>
      </form>
    </section>
  );
}

function Field({ id, label, placeholder, type = "text", required = false }: { id: string; label: string; placeholder: string; type?: string; required?: boolean }) {
  return <div className="flex flex-col"><label htmlFor={id} className="editorial-label mb-3 tracking-wide text-dark-gray">{label}</label><input type={type} id={id} name={id} required={required} placeholder={placeholder} className="rounded-lg border border-light-gray bg-white px-4 py-3 text-black placeholder-gray transition-all focus:border-transparent focus:outline-none focus:ring-2 focus:ring-yellow-500" /></div>;
}
