import { getLocale } from "next-intl/server";
import { CookieSettingsPanel } from "@/components/legal/CookieSettingsPanel";
import { LegalDocument } from "@/components/legal/LegalDocument";
import { buildLocalizedMetadata } from "@/lib/seo";

export async function generateMetadata() {
  const locale = await getLocale();
  const isEnglish = locale === "en";
  return buildLocalizedMetadata({
    locale,
    pathname: "/cookie-settings",
    title: isEnglish ? "Cookie Settings | Driven Group" : "Configuración de cookies | Driven Group",
    description: isEnglish ? "Cookie and privacy preferences for the Driven Group website." : "Preferencias de cookies y privacidad del sitio web de Driven Group.",
    imageAlt: "Driven Group",
  });
}

export default async function CookieSettingsPage() {
  const locale = (await getLocale()) === "en" ? "en" : "es";
  const content = locale === "es" ? {
    eyebrow: "PRIVACIDAD", title: "Configuración de cookies", updated: "Última actualización: 21 de julio de 2026",
    introduction: "Las cookies son pequeños archivos que un navegador puede guardar para recordar una preferencia o mantener una sesión. Esta página describe la configuración actual del sitio.",
    sections: [
      { title: "Cookies necesarias", paragraphs: ["El sitio utiliza una cookie funcional para recordar el idioma seleccionado. Al iniciar sesión en el área administrativa, el sistema de autenticación puede utilizar una cookie de sesión para proteger el acceso."] },
      { title: "Cookies opcionales", paragraphs: ["No hay categorías de publicidad o analítica opcionales activadas en el código actual. Si se incorpora una herramienta que use cookies opcionales, esta página y el mecanismo de consentimiento deberán actualizarse antes de activarla."] },
      { title: "Servicios de terceros", paragraphs: ["Los mapas y enlaces externos pueden estar sujetos a las políticas de sus respectivos proveedores. Consulta sus avisos de privacidad para conocer sus prácticas."] },
    ],
    notice: "La configuración descrita corresponde al código actual del sitio y debe revisarse cada vez que se agreguen servicios de analítica, publicidad, chat, vídeo u otros proveedores externos.", contactLabel: "Consultas sobre cookies:",
  } : {
    eyebrow: "PRIVACY", title: "Cookie settings", updated: "Last updated: July 21, 2026",
    introduction: "Cookies are small files a browser may save to remember a preference or maintain a session. This page describes the site’s current configuration.",
    sections: [
      { title: "Necessary cookies", paragraphs: ["The site uses a functional cookie to remember the selected language. When you sign in to the administrative area, the authentication system may use a session cookie to protect access."] },
      { title: "Optional cookies", paragraphs: ["No optional advertising or analytics cookie categories are enabled in the current code. If a tool that uses optional cookies is added, this page and the consent mechanism must be updated before activation."] },
      { title: "Third-party services", paragraphs: ["Maps and external links may be subject to their providers’ policies. Review their privacy notices for their practices."] },
    ],
    notice: "The configuration described reflects the site’s current code and must be reviewed whenever analytics, advertising, chat, video, or other external providers are added.", contactLabel: "Cookie questions:",
  };
  return <LegalDocument {...content} locale={locale}><CookieSettingsPanel locale={locale} /></LegalDocument>;
}
