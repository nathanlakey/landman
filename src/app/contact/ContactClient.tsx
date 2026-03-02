'use client'

import { useState } from 'react'
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from 'lucide-react'

const offices = [
  {
    city: 'Austin',
    address: '4500 Ranch Road 1826\nAustin, TX 78739',
    phone: '(512) 555-0100',
    email: 'austin@landman.com',
    hours: 'Mon – Fri: 8am – 6pm\nSat: 9am – 4pm',
  },
  {
    city: 'San Antonio',
    address: '1820 Babcock Road, Suite 200\nSan Antonio, TX 78229',
    phone: '(210) 555-0200',
    email: 'sanantonio@landman.com',
    hours: 'Mon – Fri: 8am – 6pm\nSat: By Appointment',
  },
  {
    city: 'Lubbock',
    address: '3300 Slide Road, Suite 101\nLubbock, TX 79414',
    phone: '(806) 555-0300',
    email: 'lubbock@landman.com',
    hours: 'Mon – Fri: 8am – 5pm',
  },
]

export default function ContactClient() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
      setForm({ name: '', email: '', phone: '', subject: '', message: '' })
    } catch (err: unknown) {
      setStatus('error')
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong.')
    }
  }

  const inputClass =
    'w-full bg-brand-dark border border-brand-tan/20 text-brand-off-white placeholder-brand-off-white/30 px-4 py-3 text-sm focus:outline-none focus:border-brand-tan transition-colors'

  return (
    <div className="min-h-screen pt-24 pb-20">
      {/* Header */}
      <div className="bg-brand-brown border-b border-brand-tan/10 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <p className="text-brand-tan text-xs tracking-[0.3em] uppercase mb-3">Get In Touch</p>
          <h1 className="font-serif text-5xl text-brand-off-white">Contact Landman</h1>
          <p className="text-brand-off-white/50 mt-4 max-w-xl">
            Whether you are buying, selling, or simply exploring your options, our team is here to help.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Form */}
          <div>
            <h2 className="font-serif text-3xl text-brand-off-white mb-8">Send Us a Message</h2>

            {status === 'success' ? (
              <div className="flex flex-col items-center justify-center py-16 gap-4 text-center">
                <CheckCircle className="w-14 h-14 text-brand-tan" />
                <h3 className="font-serif text-2xl text-brand-off-white">Message Sent</h3>
                <p className="text-brand-off-white/55 max-w-sm">
                  Thank you for reaching out. A Landman agent will respond within one business day.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="text-brand-tan text-sm underline hover:no-underline mt-2"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-brand-off-white/60 text-xs tracking-wider uppercase mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="John Smith"
                      required
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="block text-brand-off-white/60 text-xs tracking-wider uppercase mb-1.5">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      required
                      className={inputClass}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-brand-off-white/60 text-xs tracking-wider uppercase mb-1.5">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="(512) 555-0100"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="block text-brand-off-white/60 text-xs tracking-wider uppercase mb-1.5">
                    Subject
                  </label>
                  <select
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    className={inputClass}
                  >
                    <option value="">Select a topic...</option>
                    <option value="buying">I am looking to buy land</option>
                    <option value="selling">I want to sell my property</option>
                    <option value="valuation">Property valuation inquiry</option>
                    <option value="leasing">Hunting lease inquiry</option>
                    <option value="general">General question</option>
                  </select>
                </div>
                <div>
                  <label className="block text-brand-off-white/60 text-xs tracking-wider uppercase mb-1.5">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell us about what you are looking for..."
                    required
                    rows={6}
                    className={`${inputClass} resize-none`}
                  />
                </div>

                {status === 'error' && <p className="text-red-400 text-sm">{errorMsg}</p>}

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-brand-tan to-brand-tan-light text-brand-dark font-semibold text-sm tracking-wider uppercase px-6 py-4 hover:brightness-110 hover:shadow-[0_0_20px_rgba(200,146,42,0.35)] transition-all disabled:opacity-60"
                >
                  {status === 'loading' ? (
                    <>
                      <span className="w-4 h-4 border-2 border-brand-dark/40 border-t-brand-dark rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" /> Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Offices */}
          <div>
            <h2 className="font-serif text-3xl text-brand-off-white mb-8">Our Offices</h2>
            <div className="space-y-6">
              {offices.map((office) => (
                <div
                  key={office.city}
                  className="p-6 bg-brand-brown border border-brand-tan/10 hover:border-brand-tan/30 transition-colors"
                >
                  <h3 className="font-serif text-xl text-brand-tan mb-4">{office.city}</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-4 h-4 text-brand-tan/60 mt-0.5 flex-shrink-0" />
                      <p className="text-brand-off-white/60 text-sm whitespace-pre-line">
                        {office.address}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="w-4 h-4 text-brand-tan/60 flex-shrink-0" />
                      <a
                        href={`tel:${office.phone}`}
                        className="text-brand-off-white/60 text-sm hover:text-brand-tan transition-colors"
                      >
                        {office.phone}
                      </a>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="w-4 h-4 text-brand-tan/60 flex-shrink-0" />
                      <a
                        href={`mailto:${office.email}`}
                        className="text-brand-off-white/60 text-sm hover:text-brand-tan transition-colors"
                      >
                        {office.email}
                      </a>
                    </div>
                    <div className="flex items-start gap-3">
                      <Clock className="w-4 h-4 text-brand-tan/60 mt-0.5 flex-shrink-0" />
                      <p className="text-brand-off-white/60 text-sm whitespace-pre-line">{office.hours}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Map placeholder */}
            <div className="mt-6 aspect-[4/3] bg-brand-brown border border-brand-tan/10 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-10 h-10 text-brand-tan/30 mx-auto mb-3" />
                <p className="text-brand-off-white/30 text-sm">Map coming soon</p>
                <p className="text-brand-off-white/20 text-xs mt-1">Connect your Google Maps API key</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
