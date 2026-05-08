'use client'

import { useState } from 'react'
import { Send, CheckCircle } from 'lucide-react'

interface InquiryFormProps {
  listingId?: string
  listingTitle?: string
}

export default function InquiryForm({ listingId, listingTitle }: InquiryFormProps) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')

    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, listing_id: listingId }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Something went wrong.')
      }

      setStatus('success')
      setForm({ name: '', email: '', phone: '', message: '' })
    } catch (err: unknown) {
      setStatus('error')
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong.')
    }
  }

  const inputClass =
    'w-full bg-brand-dark border border-brand-tan/20 text-brand-off-white placeholder-brand-off-white/30 px-4 py-3 text-sm focus:outline-none focus:border-brand-tan transition-colors'

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-center gap-4">
        <CheckCircle className="w-12 h-12 text-brand-tan" />
        <h3 className="font-serif text-xl text-brand-off-white">Message Received</h3>
        <p className="text-brand-off-white/60 text-sm">
          Thank you for your interest{listingTitle ? ` in ${listingTitle}` : ''}. An agent will
          reach out to you shortly.
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="text-brand-tan text-sm underline hover:no-underline mt-2"
        >
          Send another message
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {listingTitle && (
        <p className="text-brand-off-white/50 text-xs tracking-wide">
          Inquiring about:{' '}
          <span className="text-brand-tan">{listingTitle}</span>
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
          Message *
        </label>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="I'm interested in this property and would like to schedule a showing..."
          required
          rows={5}
          className={`${inputClass} resize-none`}
        />
      </div>

      {status === 'error' && (
        <p className="text-red-400 text-sm">{errorMsg}</p>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-brand-tan to-brand-tan-light text-brand-dark font-semibold text-sm tracking-wider uppercase px-6 py-4 hover:brightness-110 hover:shadow-[0_0_20px_rgba(200,146,42,0.35)] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === 'loading' ? (
          <>
            <span className="w-4 h-4 border-2 border-brand-dark/40 border-t-brand-dark rounded-full animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            Request Information
          </>
        )}
      </button>
    </form>
  )
}
