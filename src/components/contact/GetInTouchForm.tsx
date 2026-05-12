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
      const formData = new FormData(e.currentTarget);
      const data = {
        name: formData.get("name"),
        email: formData.get("email"),
        phone: formData.get("phone"),
        subject: formData.get("subject"),
        message: formData.get("message"),
      };

      await new Promise((resolve) => setTimeout(resolve, 1000));

      setSubmitStatus("success");
      e.currentTarget.reset();

      setTimeout(() => setSubmitStatus("idle"), 5000);
    } catch {
      setSubmitStatus("error");
      setTimeout(() => setSubmitStatus("idle"), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="form" className="py-20 sm:py-24 md:py-32 max-w-4xl mx-auto px-6 sm:px-8">
      <div className="mb-16 sm:mb-20">
        <p className="editorial-label text-slate-400 mb-2">REACH OUT</p>
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 tracking-tight leading-[1.1]">
          Get In Touch With Us
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Name & Email Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col">
            <label htmlFor="name" className="editorial-label text-slate-600 mb-3 tracking-wide">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="px-4 py-3 border border-slate-300 rounded-lg bg-white text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
              placeholder="Your name"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="email" className="editorial-label text-slate-600 mb-3 tracking-wide">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="px-4 py-3 border border-slate-300 rounded-lg bg-white text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
              placeholder="your@email.com"
            />
          </div>
        </div>

        {/* Phone & Subject Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col">
            <label htmlFor="phone" className="editorial-label text-slate-600 mb-3 tracking-wide">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              className="px-4 py-3 border border-slate-300 rounded-lg bg-white text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
              placeholder="+1 (305) 555-0000"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="subject" className="editorial-label text-slate-600 mb-3 tracking-wide">
              Subject
            </label>
            <select
              id="subject"
              name="subject"
              required
              className="px-4 py-3 border border-slate-300 rounded-lg bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all cursor-pointer"
            >
              <option value="">Select a topic</option>
              <option value="real-estate">Real Estate Inquiry</option>
              <option value="business">Business Partnership</option>
              <option value="academy">Academy Programs</option>
              <option value="general">General Inquiry</option>
            </select>
          </div>
        </div>

        {/* Message */}
        <div className="flex flex-col">
          <label htmlFor="message" className="editorial-label text-slate-600 mb-3 tracking-wide">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={6}
            className="px-4 py-3 border border-slate-300 rounded-lg bg-white text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all resize-none"
            placeholder="Tell us about your inquiry or partnership opportunity..."
          />
        </div>

        {/* Submit Button & Status */}
        <div className="flex items-center justify-between pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-8 py-4 bg-slate-900 text-white font-semibold tracking-wide hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors rounded-lg"
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>

          {submitStatus === "success" && (
            <p className="text-green-600 font-semibold tracking-wide text-sm">
              ✓ Message sent successfully!
            </p>
          )}
          {submitStatus === "error" && (
            <p className="text-red-600 font-semibold tracking-wide text-sm">
              ✗ Error sending message. Please try again.
            </p>
          )}
        </div>
      </form>
    </section>
  );
}
