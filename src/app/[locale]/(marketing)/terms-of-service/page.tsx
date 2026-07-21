import { getLocale } from "next-intl/server";
import { LegalDocument } from "@/components/legal/LegalDocument";

export default async function TermsOfServicePage() {
  const locale = (await getLocale()) === "en" ? "en" : "es";
  const content = locale === "es" ? {
    eyebrow: "INFORMACIÓN LEGAL", title: "Términos de servicio", updated: "Última actualización: 21 de julio de 2026",
    introduction: "Estos términos regulan el uso informativo de este sitio web de Driven Group.",
    sections: [
      { title: "Uso del sitio", paragraphs: ["Puedes utilizar el sitio para conocer Driven Group, sus servicios y propiedades. No debes interferir con su funcionamiento, intentar acceder a áreas no autorizadas ni utilizar su contenido de manera ilícita."] },
      { title: "Información de propiedades", paragraphs: ["Las propiedades, imágenes, planos, disponibilidad y demás materiales se muestran únicamente con fines informativos. No constituyen una oferta, promesa de disponibilidad ni asesoría financiera, legal, fiscal o de inversión. Confirma cualquier información con nuestro equipo antes de tomar una decisión."] },
      { title: "Propiedad intelectual", paragraphs: ["Las marcas, textos, imágenes, diseños y demás contenidos pertenecen a Driven Group o a sus respectivos titulares. No pueden copiarse, distribuirse o utilizarse sin autorización previa por escrito."] },
      { title: "Enlaces y servicios externos", paragraphs: ["El sitio puede enlazar a recursos de terceros. Driven Group no controla esos recursos ni asume responsabilidad por su contenido, disponibilidad o prácticas de privacidad."] },
      { title: "Cambios", paragraphs: ["Podemos actualizar estos términos cuando cambie el sitio o sus servicios. La fecha de actualización indicará la versión vigente."] },
    ],
    notice: "Borrador informativo: requiere revisión jurídica antes de su publicación definitiva y antes de definir jurisdicción, ley aplicable o mecanismos formales de resolución de controversias.", contactLabel: "Consultas sobre estos términos:",
  } : {
    eyebrow: "LEGAL INFORMATION", title: "Terms of service", updated: "Last updated: July 21, 2026",
    introduction: "These terms govern informational use of this Driven Group website.",
    sections: [
      { title: "Use of the site", paragraphs: ["You may use the site to learn about Driven Group, its services, and properties. You must not interfere with its operation, attempt to access unauthorized areas, or use its content unlawfully."] },
      { title: "Property information", paragraphs: ["Properties, images, floor plans, availability, and other materials are shown for informational purposes only. They do not constitute an offer, promise of availability, or financial, legal, tax, or investment advice. Confirm any information with our team before making a decision."] },
      { title: "Intellectual property", paragraphs: ["Trademarks, text, images, designs, and other content belong to Driven Group or their respective owners. They may not be copied, distributed, or used without prior written authorization."] },
      { title: "External links and services", paragraphs: ["The site may link to third-party resources. Driven Group does not control those resources and is not responsible for their content, availability, or privacy practices."] },
      { title: "Changes", paragraphs: ["We may update these terms when the site or its services change. The update date identifies the current version."] },
    ],
    notice: "Informational draft: legal review is required before final publication and before selecting jurisdiction, governing law, or formal dispute-resolution mechanisms.", contactLabel: "Questions about these terms:",
  };
  return <LegalDocument {...content} locale={locale} />;
}
