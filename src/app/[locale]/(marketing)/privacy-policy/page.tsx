import { getLocale } from "next-intl/server";
import { LegalDocument } from "@/components/legal/LegalDocument";
import { buildLocalizedMetadata } from "@/lib/seo";

export async function generateMetadata() {
  const locale = await getLocale();
  const isEnglish = locale === "en";
  return buildLocalizedMetadata({
    locale,
    pathname: "/privacy-policy",
    title: isEnglish ? "Privacy Policy | Driven Group" : "Política de privacidad | Driven Group",
    description: isEnglish ? "How Driven Group handles personal information." : "Cómo Driven Group trata la información personal.",
    imageAlt: "Driven Group",
  });
}

export default async function PrivacyPolicyPage() {
  const locale = (await getLocale()) === "en" ? "en" : "es";
  const content = locale === "es" ? {
    eyebrow: "INFORMACIÓN LEGAL", title: "Política de privacidad", updated: "Última actualización: 21 de julio de 2026",
    introduction: "Esta política explica cómo Driven Group trata la información personal cuando utilizas nuestro sitio, solicitas información o te comunicas con nuestro equipo.",
    sections: [
      { title: "Información que recibimos", items: ["Datos de contacto que proporcionas en formularios, como nombre, correo electrónico, teléfono y mensaje.", "Información sobre la propiedad o servicio que te interesa.", "Datos técnicos necesarios para operar y proteger el sitio, como preferencias de idioma y datos de sesión administrativa."] },
      { title: "Cómo utilizamos la información", items: ["Responder solicitudes, coordinar consultas y proporcionar información sobre los servicios de Driven Group.", "Mantener la seguridad, prevenir usos indebidos y mejorar la operación del sitio.", "Cumplir obligaciones legales y gestionar comunicaciones relacionadas con una solicitud."] },
      { title: "Cuándo compartimos información", paragraphs: ["No vendemos información personal. Podemos compartirla con proveedores que nos ayudan a operar el sitio o prestar servicios, cuando sea necesario para atender tu solicitud, o cuando la ley lo requiera."] },
      { title: "Conservación y seguridad", paragraphs: ["Conservamos la información durante el tiempo necesario para las finalidades descritas y aplicamos medidas razonables para protegerla. Ningún método de transmisión o almacenamiento es completamente seguro."] },
      { title: "Tus solicitudes", paragraphs: ["Puedes solicitar acceso, corrección o eliminación de la información personal que nos hayas proporcionado. Escríbenos a la dirección de contacto indicada abajo para que podamos evaluar tu solicitud."] },
    ],
    notice: "Borrador informativo: este texto debe ser revisado y aprobado por asesoría jurídica antes de una publicación comercial definitiva, especialmente según las jurisdicciones donde Driven Group opere.", contactLabel: "Consultas de privacidad:",
  } : {
    eyebrow: "LEGAL INFORMATION", title: "Privacy policy", updated: "Last updated: July 21, 2026",
    introduction: "This policy explains how Driven Group handles personal information when you use our site, request information, or contact our team.",
    sections: [
      { title: "Information we receive", items: ["Contact details you provide through forms, such as name, email address, phone number, and message.", "Information about the property or service you are interested in.", "Technical data needed to operate and protect the site, such as language preferences and administrative session data."] },
      { title: "How we use information", items: ["To respond to requests, arrange consultations, and provide information about Driven Group services.", "To maintain security, prevent misuse, and improve site operations.", "To comply with legal obligations and manage communications related to a request."] },
      { title: "When we share information", paragraphs: ["We do not sell personal information. We may share it with providers who help us operate the site or deliver services, when needed to respond to your request, or when required by law."] },
      { title: "Retention and security", paragraphs: ["We retain information for as long as needed for the purposes described and apply reasonable measures to protect it. No method of transmission or storage is completely secure."] },
      { title: "Your requests", paragraphs: ["You may request access to, correction of, or deletion of personal information you have provided. Contact us using the address below so we can review your request."] },
    ],
    notice: "Informational draft: this text must be reviewed and approved by legal counsel before final commercial publication, especially for the jurisdictions in which Driven Group operates.", contactLabel: "Privacy questions:",
  };
  return <LegalDocument {...content} locale={locale} />;
}
