"use client"

import { useState } from "react"
import Image from "next/image"
import { Clock, Mail, MapPin, Phone, Send, Building2, Globe, MessageSquare } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    interest: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    setSubmitted(true)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <main className="min-h-screen bg-cream">
      <Header />

      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[450px]">
        <div className="absolute inset-0">
          <Image
            src="/images/contact-hero.jpg"
            alt="Driven Group Contact"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal/60 via-charcoal/40 to-charcoal/70" />
        </div>
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
          <p className="mb-4 font-sans text-sm uppercase tracking-[0.3em] text-cream/80">
            Get In Touch
          </p>
          <h1 className="font-serif text-5xl font-light text-cream md:text-7xl lg:text-8xl">
            Contact Us
          </h1>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="relative z-10 -mt-20 px-6">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-6 md:grid-cols-3">
            {/* Phone */}
            <div className="bg-white p-8 shadow-lg">
              <Phone className="mb-4 h-8 w-8 text-charcoal" />
              <h3 className="mb-2 font-serif text-xl text-charcoal">Call Us</h3>
              <p className="mb-4 text-sm text-stone">Available Mon-Fri, 9AM-6PM EST</p>
              <a href="tel:+13055551234" className="font-sans text-lg text-charcoal hover:underline">
                +1 (305) 555-1234
              </a>
            </div>

            {/* Email */}
            <div className="bg-white p-8 shadow-lg">
              <Mail className="mb-4 h-8 w-8 text-charcoal" />
              <h3 className="mb-2 font-serif text-xl text-charcoal">Email Us</h3>
              <p className="mb-4 text-sm text-stone">We respond within 24 hours</p>
              <a href="mailto:info@drivengroup.com" className="font-sans text-lg text-charcoal hover:underline">
                info@drivengroup.com
              </a>
            </div>

            {/* Location */}
            <div className="bg-white p-8 shadow-lg">
              <MapPin className="mb-4 h-8 w-8 text-charcoal" />
              <h3 className="mb-2 font-serif text-xl text-charcoal">Visit Us</h3>
              <p className="mb-4 text-sm text-stone">Brickell Financial District</p>
              <p className="font-sans text-charcoal">
                1001 Brickell Bay Dr<br />
                Miami, FL 33131
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="section-aman">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-16 lg:grid-cols-2">
            {/* Left - Company Info */}
            <div>
              <p className="mb-4 font-sans text-sm uppercase tracking-[0.3em] text-stone">
                Let&apos;s Connect
              </p>
              <h2 className="mb-8 font-serif text-4xl font-light text-charcoal md:text-5xl">
                We&apos;d Love to<br />Hear From You
              </h2>
              <p className="mb-12 text-lg leading-relaxed text-stone">
                Whether you&apos;re interested in our real estate portfolio, exploring business 
                partnerships, or have questions about our services, our team is here to help. 
                Reach out and let&apos;s start a conversation.
              </p>

              {/* Office Details */}
              <div className="mb-12 space-y-8">
                <div>
                  <h3 className="mb-4 font-serif text-xl text-charcoal">Headquarters</h3>
                  <div className="space-y-3 text-stone">
                    <div className="flex items-start gap-3">
                      <Building2 className="mt-1 h-5 w-5 text-charcoal/60" />
                      <div>
                        <p className="font-medium text-charcoal">Driven Group Tower</p>
                        <p>1001 Brickell Bay Drive, Suite 3200</p>
                        <p>Miami, FL 33131, USA</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="h-5 w-5 text-charcoal/60" />
                      <p>Monday - Friday: 9:00 AM - 6:00 PM EST</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="mb-4 font-serif text-xl text-charcoal">Departments</h3>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="border-l-2 border-charcoal/20 pl-4">
                      <p className="font-medium text-charcoal">Real Estate Inquiries</p>
                      <a href="mailto:realestate@drivengroup.com" className="text-sm text-stone hover:text-charcoal">
                        realestate@drivengroup.com
                      </a>
                    </div>
                    <div className="border-l-2 border-charcoal/20 pl-4">
                      <p className="font-medium text-charcoal">Business Development</p>
                      <a href="mailto:business@drivengroup.com" className="text-sm text-stone hover:text-charcoal">
                        business@drivengroup.com
                      </a>
                    </div>
                    <div className="border-l-2 border-charcoal/20 pl-4">
                      <p className="font-medium text-charcoal">Academy Programs</p>
                      <a href="mailto:academy@drivengroup.com" className="text-sm text-stone hover:text-charcoal">
                        academy@drivengroup.com
                      </a>
                    </div>
                    <div className="border-l-2 border-charcoal/20 pl-4">
                      <p className="font-medium text-charcoal">Media & Press</p>
                      <a href="mailto:press@drivengroup.com" className="text-sm text-stone hover:text-charcoal">
                        press@drivengroup.com
                      </a>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="mb-4 font-serif text-xl text-charcoal">Global Offices</h3>
                  <div className="flex flex-wrap gap-6 text-sm text-stone">
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4" />
                      <span>Miami</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4" />
                      <span>New York</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4" />
                      <span>London</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4" />
                      <span>Dubai</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right - Contact Form */}
            <div className="bg-sand/30 p-8 lg:p-12">
              <div className="mb-8 flex items-center gap-3">
                <MessageSquare className="h-6 w-6 text-charcoal" />
                <h3 className="font-serif text-2xl text-charcoal">Get In Touch With Us</h3>
              </div>

              {submitted ? (
                <div className="flex min-h-[400px] flex-col items-center justify-center text-center">
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-charcoal">
                    <Send className="h-8 w-8 text-cream" />
                  </div>
                  <h4 className="mb-4 font-serif text-2xl text-charcoal">Thank You!</h4>
                  <p className="text-stone">
                    Your message has been received. A member of our team will contact you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <label htmlFor="firstName" className="mb-2 block text-sm font-medium text-charcoal">
                        First Name *
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        required
                        value={formData.firstName}
                        onChange={handleChange}
                        className="w-full border-b border-charcoal/30 bg-transparent py-3 text-charcoal placeholder:text-stone/50 focus:border-charcoal focus:outline-none"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="mb-2 block text-sm font-medium text-charcoal">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        required
                        value={formData.lastName}
                        onChange={handleChange}
                        className="w-full border-b border-charcoal/30 bg-transparent py-3 text-charcoal placeholder:text-stone/50 focus:border-charcoal focus:outline-none"
                        placeholder="Doe"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="mb-2 block text-sm font-medium text-charcoal">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full border-b border-charcoal/30 bg-transparent py-3 text-charcoal placeholder:text-stone/50 focus:border-charcoal focus:outline-none"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <label htmlFor="phone" className="mb-2 block text-sm font-medium text-charcoal">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full border-b border-charcoal/30 bg-transparent py-3 text-charcoal placeholder:text-stone/50 focus:border-charcoal focus:outline-none"
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>
                    <div>
                      <label htmlFor="company" className="mb-2 block text-sm font-medium text-charcoal">
                        Company
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full border-b border-charcoal/30 bg-transparent py-3 text-charcoal placeholder:text-stone/50 focus:border-charcoal focus:outline-none"
                        placeholder="Your Company"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="interest" className="mb-2 block text-sm font-medium text-charcoal">
                      Area of Interest *
                    </label>
                    <select
                      id="interest"
                      name="interest"
                      required
                      value={formData.interest}
                      onChange={handleChange}
                      className="w-full border-b border-charcoal/30 bg-transparent py-3 text-charcoal focus:border-charcoal focus:outline-none"
                    >
                      <option value="">Select an option</option>
                      <option value="real-estate">Real Estate</option>
                      <option value="digital-commerce">Digital Commerce</option>
                      <option value="global-markets">Global Markets</option>
                      <option value="strategic-alliances">Strategic Alliances</option>
                      <option value="luxury-assets">Luxury Assets</option>
                      <option value="academy">Academy Programs</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="mb-2 block text-sm font-medium text-charcoal">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full resize-none border-b border-charcoal/30 bg-transparent py-3 text-charcoal placeholder:text-stone/50 focus:border-charcoal focus:outline-none"
                      placeholder="Tell us about your inquiry..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group flex w-full items-center justify-center gap-3 border border-charcoal bg-charcoal px-8 py-4 font-sans text-sm uppercase tracking-[0.2em] text-cream transition-all duration-300 hover:bg-transparent hover:text-charcoal disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      "Sending..."
                    ) : (
                      <>
                        Send Message
                        <Send className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </>
                    )}
                  </button>

                  <p className="text-center text-xs text-stone">
                    By submitting this form, you agree to our Privacy Policy and Terms of Service.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Map Placeholder */}
      <section className="h-[400px] bg-stone/20">
        <div className="flex h-full items-center justify-center">
          <div className="text-center">
            <MapPin className="mx-auto mb-4 h-12 w-12 text-stone" />
            <p className="font-serif text-2xl text-charcoal">1001 Brickell Bay Drive</p>
            <p className="text-stone">Miami, FL 33131</p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
