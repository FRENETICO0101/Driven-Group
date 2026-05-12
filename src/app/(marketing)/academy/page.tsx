import type { Metadata } from "next";
import { AcademyHeroSection } from "@/components/academy/AcademyHeroSection";
import { AcademyProgram } from "@/components/academy/AcademyProgram";
import { AcademyCTA } from "@/components/academy/AcademyCTA";

const siteUrl = "https://drivengroup.com";

export const metadata: Metadata = {
  title: "Academy — Driven Group",
  description:
    "Premium education in leadership, entrepreneurship, and financial mastery. Transform your future with Driven Group Academy.",
  openGraph: {
    title: "Academy — Driven Group",
    description:
      "Premium education in leadership, entrepreneurship, and financial mastery.",
    url: `${siteUrl}/academy`,
    type: "website",
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Driven Group Academy",
      },
    ],
  },
  alternates: {
    canonical: `${siteUrl}/academy`,
  },
};

export default function AcademyPage() {
  return (
    <main className="min-h-screen bg-white">
      <AcademyHeroSection />

      <section id="programs" className="py-20 sm:py-24 md:py-32 px-6 sm:px-8 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-16 sm:mb-20">
          <p className="editorial-label text-slate-400 mb-4">DRIVEN GROUP ACADEMY</p>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 leading-[1.1] mb-6">
            Three Pathways to Mastery
          </h2>
          <p className="text-slate-600 text-lg leading-relaxed max-w-2xl">
            Comprehensive programs designed to elevate your expertise in leadership, entrepreneurship, and financial strategy.
          </p>
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {/* Cursos */}
          <AcademyProgram
            title="Cursos"
            subtitle="Foundational Knowledge"
            description="Structured learning modules covering essential principles and practical applications across our core competencies."
            topics={[
              "Leadership Fundamentals",
              "Business Strategy Essentials",
              "Financial Literacy Basics",
              "Market Analysis & Research",
            ]}
            icon="book"
            comingSoon
          />

          {/* Mentoring */}
          <AcademyProgram
            title="Mentoring"
            subtitle="Personalized Guidance"
            description="One-on-one sessions with industry experts and successful entrepreneurs to accelerate your professional growth."
            topics={[
              "Executive Coaching",
              "Entrepreneurial Mentorship",
              "Financial Planning & Wealth Management",
              "Strategic Decision Making",
            ]}
            icon="person"
            comingSoon
          />

          {/* Mastering */}
          <AcademyProgram
            title="Mastering"
            subtitle="Advanced Excellence"
            description="Elite-level programs for those ready to master complex strategies and lead transformational initiatives."
            topics={[
              "Advanced Leadership",
              "Venture Building & Scaling",
              "Alternative Investments",
              "Legacy & Wealth Stewardship",
            ]}
            icon="star"
            comingSoon
          />
        </div>
      </section>

      {/* CTA Section */}
      <AcademyCTA />

      {/* Value Proposition */}
      <section className="py-20 sm:py-24 md:py-32 px-6 sm:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          {/* Industry Leaders */}
          <div>
            <div className="w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center mb-6">
              <span className="material-symbols-outlined text-slate-900">verified</span>
            </div>
            <h3 className="text-xl font-black text-slate-900 mb-4">Industry Leaders</h3>
            <p className="text-slate-600 text-base leading-relaxed">
              Learn directly from entrepreneurs, investors, and executives with proven track records of success.
            </p>
          </div>

          {/* Practical Application */}
          <div>
            <div className="w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center mb-6">
              <span className="material-symbols-outlined text-slate-900">build</span>
            </div>
            <h3 className="text-xl font-black text-slate-900 mb-4">Practical Application</h3>
            <p className="text-slate-600 text-base leading-relaxed">
              Real-world case studies and frameworks you can immediately apply to your business and life.
            </p>
          </div>

          {/* Community Access */}
          <div>
            <div className="w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center mb-6">
              <span className="material-symbols-outlined text-slate-900">group</span>
            </div>
            <h3 className="text-xl font-black text-slate-900 mb-4">Community Access</h3>
            <p className="text-slate-600 text-base leading-relaxed">
              Join a network of ambitious learners and successful entrepreneurs for meaningful connections.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
