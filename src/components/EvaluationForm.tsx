'use client'

import { useState } from 'react'
import { ArrowRight } from 'lucide-react'

const PROPERTY_TYPES = [
  { value: '', label: 'Select property type...' },
  { value: 'Ranch/Farm', label: 'Ranch / Farm' },
  { value: 'Development Land', label: 'Development Land' },
  { value: 'Residential', label: 'Residential' },
  { value: 'Commercial', label: 'Commercial' },
  { value: 'Farm Equipment', label: 'Farm Equipment' },
  { value: 'Estate/Other', label: 'Estate / Other' },
]

const inputClass =
  'w-full border border-sand bg-white px-4 py-3 text-shadow text-sm focus:outline-none focus:border-sunset transition-colors'

export default function EvaluationForm() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    propertyType: '',
    location: '',
    message: '',
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/evaluation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      setStatus(res.ok ? 'success' : 'error')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="bg-sage/10 border border-sage/30 px-8 py-10 text-center">
        <p className="font-serif text-2xl text-shadow mb-3">Thank you!</p>
        <p className="text-shadow/70 text-base">
          Craig will be in touch within 1 business day.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-shadow/60 text-xs tracking-[0.12em] uppercase mb-2">
            Full Name *
          </label>
          <input
            type="text"
            name="name"
            required
            value={form.name}
            onChange={handleChange}
            className={inputClass}
            placeholder="John Smith"
          />
        </div>
        <div>
          <label className="block text-shadow/60 text-xs tracking-[0.12em] uppercase mb-2">
            Phone Number *
          </label>
          <input
            type="tel"
            name="phone"
            required
            value={form.phone}
            onChange={handleChange}
            className={inputClass}
            placeholder="(555) 000-0000"
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-shadow/60 text-xs tracking-[0.12em] uppercase mb-2">
            Property Type *
          </label>
          <select
            name="propertyType"
            required
            value={form.propertyType}
            onChange={handleChange}
            className={inputClass}
          >
            {PROPERTY_TYPES.map((opt) => (
              <option key={opt.value} value={opt.value} disabled={!opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-shadow/60 text-xs tracking-[0.12em] uppercase mb-2">
            Property Location *
          </label>
          <input
            type="text"
            name="location"
            required
            value={form.location}
            onChange={handleChange}
            className={inputClass}
            placeholder="City or county"
          />
        </div>
      </div>

      <div>
        <label className="block text-shadow/60 text-xs tracking-[0.12em] uppercase mb-2">
          Tell Us About Your Property
        </label>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          rows={4}
          className={`${inputClass} resize-none`}
          placeholder="Tell us about your property — acreage, current use, timeline, any questions..."
        />
      </div>

      {status === 'error' && (
        <p className="text-red-600 text-sm">
          Something went wrong. Please try again or call us directly.
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-sunset text-white font-semibold text-sm tracking-[0.08em] uppercase px-8 py-4 hover:bg-[#e08600] transition-colors duration-200 disabled:opacity-60"
      >
        {status === 'loading' ? 'Sending...' : 'Request My Free Evaluation'}
        {status !== 'loading' && <ArrowRight className="w-4 h-4" />}
      </button>
    </form>
  )
}
