"use client"

import { useState } from "react"
import { ArrowRight, Check } from "lucide-react"

export function CTA() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.name && formData.email) {
      setIsSubmitted(true)
    }
  }

  return (
    <section id="contact" className="section-aman">
      <div className="mx-auto max-w-[1800px] px-6 lg:px-12">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
          {/* Content */}
          <div>
            <p className="label-aman mb-4">Begin Your Journey</p>
            <h2 className="heading-aman">
              Let Us Guide
              <br />
              Your Search
            </h2>
            
            <p className="mt-8 body-aman max-w-md">
              Whether you are seeking a primary residence, a retreat, or an 
              investment opportunity, our team is prepared to assist you in 
              discovering the extraordinary.
            </p>

            {/* Contact Info */}
            <div className="mt-12 space-y-4">
              <div>
                <p className="text-[11px] tracking-[0.2em] text-muted-foreground uppercase mb-2">
                  Telephone
                </p>
                <a 
                  href="tel:+13105550199" 
                  className="text-lg text-foreground transition-colors duration-500 hover:text-muted-foreground"
                >
                  +1 310 555 0199
                </a>
              </div>
              <div>
                <p className="text-[11px] tracking-[0.2em] text-muted-foreground uppercase mb-2">
                  Email
                </p>
                <a 
                  href="mailto:inquiries@driven.com" 
                  className="text-lg text-foreground transition-colors duration-500 hover:text-muted-foreground"
                >
                  inquiries@driven.com
                </a>
              </div>
            </div>
          </div>

          {/* Form */}
          <div>
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div>
                  <input
                    type="text"
                    placeholder="Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="input-aman"
                    required
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="input-aman"
                    required
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    placeholder="Telephone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="input-aman"
                  />
                </div>
                <div>
                  <textarea
                    placeholder="How may we assist you?"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={4}
                    className="input-aman resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="btn-aman group"
                >
                  Submit Inquiry
                  <ArrowRight size={14} className="ml-3 transition-transform duration-500 group-hover:translate-x-1" />
                </button>
              </form>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="mb-6 flex h-16 w-16 items-center justify-center border border-foreground">
                  <Check className="h-8 w-8 text-foreground" />
                </div>
                <h3 className="font-serif text-2xl text-foreground">
                  Thank You
                </h3>
                <p className="mt-4 text-muted-foreground max-w-sm">
                  A member of our team will be in contact within 24 hours to 
                  discuss your requirements.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
