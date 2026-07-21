import Link from "next/link";
import type { ReactNode } from "react";

export interface LegalSection {
  title: string;
  paragraphs?: string[];
  items?: string[];
}

interface LegalDocumentProps {
  eyebrow: string;
  title: string;
  updated: string;
  introduction: string;
  sections: LegalSection[];
  notice: string;
  contactLabel: string;
  locale: string;
  children?: ReactNode;
}

export function LegalDocument({ eyebrow, title, updated, introduction, sections, notice, contactLabel, locale, children }: LegalDocumentProps) {
  return (
    <main className="min-h-screen bg-white pt-24 sm:pt-32">
      <article className="mx-auto max-w-4xl px-6 pb-24 sm:px-8 sm:pb-32">
        <header className="border-b border-light-gray pb-10 sm:pb-14">
          <p className="editorial-label mb-4 text-gray">{eyebrow}</p>
          <h1 className="font-serif text-4xl font-black leading-tight text-black sm:text-5xl md:text-6xl">{title}</h1>
          <p className="mt-5 text-sm text-dark-gray">{updated}</p>
          <p className="mt-8 max-w-3xl text-lg leading-relaxed text-dark-gray">{introduction}</p>
        </header>

        <div className="space-y-10 py-12 sm:space-y-12 sm:py-16">
          {sections.map((section) => (
            <section key={section.title}>
              <h2 className="font-serif text-2xl font-bold text-black sm:text-3xl">{section.title}</h2>
              {section.paragraphs?.map((paragraph) => <p key={paragraph} className="mt-4 text-base leading-relaxed text-dark-gray">{paragraph}</p>)}
              {section.items && (
                <ul className="mt-4 space-y-3 border-l border-light-gray pl-5 text-base leading-relaxed text-dark-gray">
                  {section.items.map((item) => <li key={item}>{item}</li>)}
                </ul>
              )}
            </section>
          ))}
        </div>

        <aside className="rounded-xl border border-light-gray bg-light-gray/20 p-5 text-sm leading-relaxed text-dark-gray sm:p-6">
          {notice}
        </aside>

        {children && <div className="mt-8">{children}</div>}

        <div className="mt-10 border-t border-light-gray pt-8 text-sm text-dark-gray">
          <p>{contactLabel} <a className="font-semibold text-black underline underline-offset-4" href="mailto:info@drivengroup.com">info@drivengroup.com</a></p>
          <Link href={`/${locale}`} className="mt-5 inline-flex text-sm font-semibold text-black underline underline-offset-4">← Driven Group</Link>
        </div>
      </article>
    </main>
  );
}
