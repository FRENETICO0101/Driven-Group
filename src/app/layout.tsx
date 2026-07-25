import type { Metadata } from "next";
import "./globals.css";
import "leaflet/dist/leaflet.css";

const siteUrl = "https://drivengroup.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Driven Group | Premium Real Estate & Investment Ecosystem",
  description:
    "Editorial platform for corporate real estate investment. Access strategic properties worldwide.",
  keywords: [
    "real estate",
    "property investment",
    "commercial properties",
    "corporate assets",
    "strategic investments",
  ],
  authors: [{ name: "Driven Group" }],
  creator: "Driven Group",
  publisher: "Driven Group",
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Driven Group",
    title: "Driven Group | Premium Real Estate & Investment Ecosystem",
    description:
      "Editorial platform for corporate real estate investment.",
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Driven Group",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Driven Group | Premium Real Estate & Investment Ecosystem",
    description:
      "Editorial platform for corporate real estate investment.",
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
    <html lang="es" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "try { if (localStorage.getItem('driven-theme') === 'night') document.documentElement.dataset.theme = 'night'; } catch {}" }} />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
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
