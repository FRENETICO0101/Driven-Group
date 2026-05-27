import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-sans", weight: ["300", "400", "500", "600"] });

const siteUrl = "https://drivengroup.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Driven Group | Ecosistema de Inversión Inmobiliaria Premium",
  description:
    "Plataforma editorial de inversión corporativa. Accede a propiedades estratégicas, patrimoniales y de alto rendimiento.",
  keywords: [
    "real estate",
    "inversión inmobiliaria",
    "propiedades comerciales",
    "patrimonio corporativo",
    "activos estratégicos",
  ],
  authors: [{ name: "Driven Group" }],
  creator: "Driven Group",
  publisher: "Driven Group",
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: siteUrl,
    siteName: "Driven Group",
    title: "Driven Group | Ecosistema de Inversión Inmobiliaria Premium",
    description:
      "Plataforma editorial de inversión corporativa. Accede a propiedades estratégicas, patrimoniales y de alto rendimiento.",
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Driven Group - Inversión Inmobiliaria Premium",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Driven Group | Ecosistema de Inversión Inmobiliaria Premium",
    description:
      "Plataforma editorial de inversión corporativa. Accede a propiedades estratégicas, patrimoniales y de alto rendimiento.",
    images: [`${siteUrl}/og-image.png`],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${montserrat.variable}`}>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
