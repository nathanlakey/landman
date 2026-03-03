'use client'

import { useState } from 'react'
import { MapPin, Phone, Mail, Clock, CheckCircle, Send } from 'lucide-react'

const propertyTypes = [
  { value: '', label: 'Select property type…' },
  { value: 'farm', label: 'Farm / Crop Land' },
  { value: 'ranch', label: 'Ranch / Pasture' },
  { value: 'estate', label: 'Estate / Inherited Property' },
  { value: 'development', label: 'Development Tract' },
  { value: 'recreational', label: 'Recreational / Hunting Land' },
  { value: 'other', label: 'Other / Not Sure' },
]

export default function ContactClient() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    propertyType: '',
    acreage: '',
    message: '',
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Something went wrong.')
      }
      setStatus('success')
      setForm({ name: '', email: '', phone: '', propertyType: '', acreage: '', message: '' })
    } catch (err: unknown) {
      setStatus('error')
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong.')
    }
  }

  const inputClass =
    'w-full bg-white border border-sand/60 text-shadow placeholder-shadow/35 px-4 py-3 text-sm focus:outline-none focus:border-earth focus:ring-1 focus:ring-earth/20 transition-colors'

  const labelClass = 'block text-shadow/60 text-xs tracking-[0.12em] uppercase font-medium mb-2'

  return (
    <section className="py-24 px-6 bg-offwhite">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16">

          {/* ── Form ─────────────────────────────────────────────── */}
          <div>
            <p className="text-clay text-[11px] tracking-[0.3em] uppercase font-medium mb-4">
              Get in Touch
            </p>
            <h2 className="font-serif text-display-md text-shadow mb-3">
              Let&apos;s Talk About Your Land.
            </h2>
            <p className="text-shadow/60 text-base leading-relaxed mb-10">
              Fill out the form below and Craig will personally follow up —
              usually within one business day.
            </p>

            {status === 'success' ? (
              <div className="border border-sage/40 bg-sage/8 p-8 text-center">
                <CheckCircle className="w-10 h-10 text-sage mx-auto mb-4" />
                <h3 className="font-serif text-xl text-shadow mb-2">Message Received.</h3>
                <p className="text-shadow/60 text-sm leading-relaxed">
                  Craig will be in touch shortly. Thank you for reaching out.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className={labelClass} htmlFor="name">Full Name *</label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass} htmlFor="email">Email Address *</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className={inputClass}
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className={labelClass} htmlFor="phone">Phone Number</label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="(000) 000-0000"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass} htmlFor="acreage">Approximate Acreage</label>
                    <input
                      id="acreage"
                      name="acreage"
                      type="text"
                      value={form.acreage}
                      onChange={handleChange}
                      placeholder="e.g. 200 acres"
                      className={inputClass}
                    />
                  </div>
                </div>

                <div>
                  <label className={labelClass} htmlFor="propertyType">Property Type</label>
                  <select
                    id="propertyType"
                    name="propertyType"
                    value={form.propertyType}
                    onChange={handleChange}
                    className={inputClass}
                  >
                    {propertyTypes.map(({ value, label }) => (
                      <option key={value} value={value}>{label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className={labelClass} htmlFor="message">Tell Craig About Your Property *</label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Location, situation, timeline, any questions you have…"
                    className={`${inputClass} resize-none`}
                  />
                </div>

                {status === 'error' && (
                  <p className="text-clay text-sm">{errorMsg}</p>
                )}

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full flex items-center justify-center gap-2 bg-earth text-offwhite font-semibold text-sm tracking-[0.08em] uppercase py-4 hover:bg-sunset hover:text-shadow disabled:opacity-60 disabled:cursor-not-allowed transition-colors duration-200"
                >
                  {status === 'loading' ? (
                    'Sending…'
                  ) : (
                    <>
                      Send Message
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>

                <p className="text-shadow/35 text-xs text-center">
                  Your information is never shared or sold.
                </p>
              </form>
            )}
          </div>

          {/* ── Contact Info ──────────────────────────────────── */}
          <div className="lg:pt-20">
            <div className="space-y-10">
              <div>
                <div className="w-8 h-px bg-sunset mb-6" />
                <h3 className="font-serif text-xl text-shadow mb-4">
                  Craig Meier Land Auctions
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-clay mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-shadow/80 text-sm font-medium">Location</p>
                      <p className="text-shadow/55 text-sm">Ennis, TX — Ellis County</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Phone className="w-4 h-4 text-clay mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-shadow/80 text-sm font-medium">Phone</p>
                      <a href="tel:+19035550100" className="text-shadow/55 text-sm hover:text-earth transition-colors">
                        (903) 555-0100
                      </a>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Mail className="w-4 h-4 text-clay mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-shadow/80 text-sm font-medium">Email</p>
                      <a href="mailto:craig@landman.com" className="text-shadow/55 text-sm hover:text-earth transition-colors">
                        craig@landman.com
                      </a>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Clock className="w-4 h-4 text-clay mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-shadow/80 text-sm font-medium">Availability</p>
                      <p className="text-shadow/55 text-sm">Mon – Fri, 8am – 6pm CT</p>
                      <p className="text-shadow/55 text-sm">Sat by appointment</p>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Expectation-setting note */}
              <div className="bg-earth/6 border border-sand/50 p-6">
                <p className="font-serif text-lg text-shadow mb-2">
                  What to expect after you submit:
                </p>
                <ul className="space-y-2">
                  {[
                    'Craig personally reviews every inquiry',
                    'Response within 1 business day',
                    'No obligation, no pressure',
                    'Bilingual (English / Spanish) — habla español',
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-shadow/65 text-sm">
                      <span className="w-1 h-1 rounded-full bg-sunset flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
