"use client";

import { useState } from "react";

export function GetInTouchForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      await new Promise((resolve) => setTimeout(resolve, 1200));
      setSubmitStatus("success");
      e.currentTarget.reset();
      setTimeout(() => setSubmitStatus("idle"), 6000);
    } catch {
      setSubmitStatus("error");
      setTimeout(() => setSubmitStatus("idle"), 6000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass =
    "w-full bg-transparent border-0 border-b border-pale pb-3 pt-1 text-sm text-ink placeholder-light-gray focus:outline-none focus:border-dark-gray transition-colors duration-300 font-light";
  const labelClass = "editorial-label text-gray block mb-2";

  return (
    <section id="form" className="py-24 sm:py-28 md:py-36 border-t border-pale">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">

        {/* Header */}
        <div className="mb-16 sm:mb-20 grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div>
            <p className="editorial-label text-gray mb-3">Private Consultation</p>
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-ink tracking-tight leading-[1.05] text-balance">
              Begin Your<br className="hidden sm:block" /> Conversation
            </h2>
          </div>
          <div className="flex items-end">
            <p className="text-sm sm:text-base text-dark-gray leading-[1.9] font-light max-w-sm">
              Our team of specialists responds within 24 hours. All inquiries are handled with the utmost discretion.
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="max-w-4xl">
          {/* Row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
            <div>
              <label htmlFor="name" className={labelClass}>Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className={inputClass}
                placeholder="Your full name"
              />
            </div>
            <div>
              <label htmlFor="email" className={labelClass}>Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className={inputClass}
                placeholder="your@email.com"
              />
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
            <div>
              <label htmlFor="phone" className={labelClass}>Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                className={inputClass}
                placeholder="+1 (305) 555-0000"
              />
            </div>
            <div>
              <label htmlFor="subject" className={labelClass}>Subject</label>
              <select
                id="subject"
                name="subject"
                required
                className={`${inputClass} cursor-pointer appearance-none`}
              >
                <option value="" className="text-gray">Select a topic</option>
                <option value="real-estate">Real Estate Inquiry</option>
                <option value="business">Business Partnership</option>
                <option value="academy">Academy Programs</option>
                <option value="general">General Inquiry</option>
              </select>
            </div>
          </div>

          {/* Message */}
          <div className="mb-14">
            <label htmlFor="message" className={labelClass}>Message</label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              className={`${inputClass} resize-none`}
              placeholder="Describe your inquiry or the nature of your partnership opportunity…"
            />
          </div>

          {/* Submit */}
          <div className="flex items-center gap-8">
            <button
              type="submit"
              disabled={isSubmitting}
              className="dark-button px-10 py-3.5 text-sm font-semibold rounded disabled:opacity-40 disabled:cursor-not-allowed inline-flex items-center gap-3"
            >
              {isSubmitting ? (
                <>
                  <span>Sending</span>
                  <span className="w-1 h-1 rounded-full bg-white/60 animate-pulse" />
                </>
              ) : (
                <>
                  <span>Send Inquiry</span>
                  <span
                    className="material-symbols-outlined"
                    style={{ fontSize: "14px", fontVariationSettings: "'wght' 200" }}
                  >
                    arrow_outward
                  </span>
                </>
              )}
            </button>

            {submitStatus === "success" && (
              <p className="editorial-label text-dark-gray">
                Inquiry received — we will be in touch shortly.
              </p>
            )}
            {submitStatus === "error" && (
              <p className="editorial-label text-mid-gray">
                Something went wrong. Please try again.
              </p>
            )}
          </div>
        </form>

      </div>
    </section>
  );
}
