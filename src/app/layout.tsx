/**
 * Driven Group - Real Estate Platform
 * Root Layout (Shared across all routes)
 */
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Driven Group | Real Estate Premium",
  description: "Plataforma premium de Real Estate con experiencia inmobiliaria de alto nivel",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body
        className={`${inter.className} bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 antialiased bg-black`}
      >
        {children}
      </body>
    </html>
  );
}
