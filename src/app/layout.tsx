/**
 *             _ 
 *            / \ 
 *           (   )
 *          / \_/ \
 *         (   |   )
 *        / \_/ \_/ \
 *       (   |   |   )
 *      / \_/ \_/ \_/ \
 *     (   |   |   |   )
 *    /_\_/_\_/_\_/_\_/_\
 *   =====================
 *         B A B E L
 *         SOLUTIONS
 * 
 *   @project Takashi - Driven Academy
 *   @developer Babel Solutions Team by r&r
 */
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Driven Academy",
  description: "Transformamos Líderes y a sus Equipos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet" />
      </head>
      <body className={`${inter.className} bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 antialiased bg-black`}>
        {children}
      </body>
    </html>
  );
}
