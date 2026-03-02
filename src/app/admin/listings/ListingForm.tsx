'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Upload } from 'lucide-react'
import type { Listing, Agent } from '@/types'

interface ListingFormProps {
  listing?: Partial<Listing>
  agents: Agent[]
}

const PROPERTY_TYPES = ['ranch', 'farm', 'hunting', 'recreational', 'agricultural']
const STATUSES = ['active', 'reduced', 'sold']

export default function ListingForm({ listing, agents }: ListingFormProps) {
  const router = useRouter()
  const isEdit = !!listing?.id

  const [form, setForm] = useState({
    title: listing?.title || '',
    slug: listing?.slug || '',
    location_city: listing?.location_city || '',
    location_county: listing?.location_county || '',
    state: listing?.state || 'TX',
    acreage: listing?.acreage?.toString() || '',
    price: listing?.price?.toString() || '',
    property_type: listing?.property_type || '',
    description: listing?.description || '',
    features: listing?.features?.join('\n') || '',
    status: listing?.status || 'active',
    agent_id: listing?.agent_id || '',
  })
  const [imageFiles, setImageFiles] = useState<File[]>([])
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))

    // Auto-generate slug from title
    if (name === 'title' && !isEdit) {
      setForm((prev) => ({
        ...prev,
        title: value,
        slug: value
          .toLowerCase()
          .replace(/[^a-z0-9\s-]/g, '')
          .replace(/\s+/g, '-')
          .replace(/-+/g, '-'),
      }))
    }
  }

  const uploadImages = async (): Promise<string[]> => {
    if (imageFiles.length === 0) return listing?.images || []

    const formData = new FormData()
    imageFiles.forEach((f) => formData.append('files', f))
    const res = await fetch('/api/admin/upload', { method: 'POST', body: formData })
    if (!res.ok) throw new Error('Image upload failed')
    const { urls } = await res.json()
    return [...(listing?.images || []), ...urls]
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')

    try {
      const images = await uploadImages()
      const payload = {
        ...form,
        acreage: form.acreage ? parseFloat(form.acreage) : null,
        price: form.price ? parseFloat(form.price) : null,
        features: form.features
          .split('\n')
          .map((f) => f.trim())
          .filter(Boolean),
        images,
        agent_id: form.agent_id || null,
      }

      const url = isEdit ? `/api/admin/listings/${listing!.id}` : '/api/admin/listings'
      const method = isEdit ? 'PATCH' : 'POST'
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Failed to save listing')
      }

      router.push('/admin/listings')
      router.refresh()
    } catch (err: unknown) {
      setStatus('error')
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong')
    }
  }

  const inputClass =
    'w-full bg-brand-dark border border-brand-tan/20 text-brand-off-white placeholder-brand-off-white/30 px-4 py-3 text-sm focus:outline-none focus:border-brand-tan transition-colors'
  const labelClass = 'block text-brand-off-white/60 text-xs tracking-wider uppercase mb-1.5'

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="sm:col-span-2">
          <label className={labelClass}>Title *</label>
          <input type="text" name="title" value={form.title} onChange={handleChange} required placeholder="Spring Creek Ranch" className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Slug *</label>
          <input type="text" name="slug" value={form.slug} onChange={handleChange} required placeholder="spring-creek-ranch" className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Status</label>
          <select name="status" value={form.status} onChange={handleChange} className={inputClass}>
            {STATUSES.map((s) => <option key={s} value={s} className="capitalize">{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
          </select>
        </div>
        <div>
          <label className={labelClass}>City</label>
          <input type="text" name="location_city" value={form.location_city} onChange={handleChange} placeholder="Kerrville" className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>County</label>
          <input type="text" name="location_county" value={form.location_county} onChange={handleChange} placeholder="Kerr" className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Acreage</label>
          <input type="number" name="acreage" value={form.acreage} onChange={handleChange} placeholder="1200" step="0.01" className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Price ($)</label>
          <input type="number" name="price" value={form.price} onChange={handleChange} placeholder="2500000" className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Property Type</label>
          <select name="property_type" value={form.property_type} onChange={handleChange} className={inputClass}>
            <option value="">Select type...</option>
            {PROPERTY_TYPES.map((t) => <option key={t} value={t} className="capitalize">{t.charAt(0).toUpperCase() + t.slice(1)}</option>)}
          </select>
        </div>
        <div>
          <label className={labelClass}>Listing Agent</label>
          <select name="agent_id" value={form.agent_id} onChange={handleChange} className={inputClass}>
            <option value="">No agent assigned</option>
            {agents.map((a) => <option key={a.id} value={a.id}>{a.name}{a.title ? ` — ${a.title}` : ''}</option>)}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label className={labelClass}>Description</label>
          <textarea name="description" value={form.description} onChange={handleChange} rows={6} placeholder="Describe the property..." className={`${inputClass} resize-none`} />
        </div>
        <div className="sm:col-span-2">
          <label className={labelClass}>Features (one per line)</label>
          <textarea name="features" value={form.features} onChange={handleChange} rows={5} placeholder={"Wildlife-fed creek\nLive oak coverage\n4-bedroom main house"} className={`${inputClass} resize-none`} />
        </div>
        <div className="sm:col-span-2">
          <label className={labelClass}>Upload Images</label>
          <label className="flex items-center gap-3 border border-dashed border-brand-tan/30 p-6 cursor-pointer hover:border-brand-tan/50 transition-colors">
            <Upload className="w-5 h-5 text-brand-tan/60" />
            <span className="text-brand-off-white/50 text-sm">
              {imageFiles.length > 0
                ? `${imageFiles.length} file(s) selected`
                : 'Click to select images'}
            </span>
            <input
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={(e) => setImageFiles(Array.from(e.target.files || []))}
            />
          </label>
          {listing?.images && listing.images.length > 0 && (
            <p className="text-brand-off-white/40 text-xs mt-2">
              {listing.images.length} existing image(s). New uploads will be appended.
            </p>
          )}
        </div>
      </div>

      {status === 'error' && <p className="text-red-400 text-sm">{errorMsg}</p>}

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={status === 'loading'}
          className="bg-gradient-to-r from-brand-tan to-brand-tan-light text-brand-dark font-semibold text-sm tracking-wider uppercase px-8 py-3 hover:brightness-110 hover:shadow-[0_0_16px_rgba(200,146,42,0.35)] transition-all disabled:opacity-60"
        >
          {status === 'loading' ? 'Saving...' : isEdit ? 'Save Changes' : 'Create Listing'}
        </button>
        <button
          type="button"
          onClick={() => router.push('/admin/listings')}
          className="border border-brand-tan/30 text-brand-off-white/60 text-sm tracking-wider uppercase px-6 py-3 hover:border-brand-tan/50 transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}
