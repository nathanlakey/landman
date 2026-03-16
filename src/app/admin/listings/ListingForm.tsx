'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Upload } from 'lucide-react'
import type { Listing } from '@/types'

interface ListingFormProps {
  listing?: Partial<Listing>
}

const PROPERTY_TYPES = ['ranch', 'farm', 'estate', 'development', 'recreational']
const STATUSES = ['draft', 'upcoming', 'active', 'sold', 'withdrawn']

export default function ListingForm({ listing }: ListingFormProps) {
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
    status: listing?.status || 'draft',
    auction_date: listing?.auction_date || '',
    published: listing?.published ?? false,
  })
  const [imageFiles, setImageFiles] = useState<File[]>([])
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))

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
    setSubmitStatus('loading')
    setErrorMsg('')

    try {
      const images = await uploadImages()
      const payload = {
        ...form,
        acreage: form.acreage ? parseFloat(form.acreage) : null,
        price: form.price ? parseFloat(form.price) : null,
        auction_date: form.auction_date || null,
        features: form.features.split('\n').map((f) => f.trim()).filter(Boolean),
        images,
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
      setSubmitStatus('error')
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong')
    }
  }

  const inputCls =
    'w-full bg-shadow border border-offwhite/15 text-offwhite placeholder-offwhite/30 px-4 py-3 text-sm focus:outline-none focus:border-sunset/50 transition-colors'
  const labelCls = 'block text-offwhite/55 text-xs tracking-wider uppercase mb-1.5'

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

        {/* Title */}
        <div className="sm:col-span-2">
          <label className={labelCls}>Title *</label>
          <input
            type="text" name="title" value={form.title} onChange={handleChange}
            required placeholder="Spring Creek Ranch — 1,200 Acres"
            className={inputCls}
          />
        </div>

        {/* Slug */}
        <div>
          <label className={labelCls}>Slug *</label>
          <input
            type="text" name="slug" value={form.slug} onChange={handleChange}
            required placeholder="spring-creek-ranch"
            className={inputCls}
          />
        </div>

        {/* Status */}
        <div>
          <label className={labelCls}>Status</label>
          <select name="status" value={form.status} onChange={handleChange} className={inputCls}>
            {STATUSES.map((s) => (
              <option key={s} value={s} className="bg-shadow capitalize">
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* Auction Date */}
        <div>
          <label className={labelCls}>Auction Date</label>
          <input
            type="date" name="auction_date" value={form.auction_date}
            onChange={handleChange} className={inputCls}
          />
        </div>

        {/* Published */}
        <div className="flex items-center gap-3 pt-6">
          <input
            type="checkbox" id="published" name="published"
            checked={form.published} onChange={handleChange}
            className="w-4 h-4 accent-sunset"
          />
          <label htmlFor="published" className="text-offwhite/70 text-sm cursor-pointer">
            Published (visible on site)
          </label>
        </div>

        {/* City */}
        <div>
          <label className={labelCls}>City</label>
          <input
            type="text" name="location_city" value={form.location_city}
            onChange={handleChange} placeholder="Kerrville" className={inputCls}
          />
        </div>

        {/* County */}
        <div>
          <label className={labelCls}>County</label>
          <input
            type="text" name="location_county" value={form.location_county}
            onChange={handleChange} placeholder="Kerr" className={inputCls}
          />
        </div>

        {/* Acreage */}
        <div>
          <label className={labelCls}>Acreage</label>
          <input
            type="number" name="acreage" value={form.acreage}
            onChange={handleChange} placeholder="1200" step="0.01" className={inputCls}
          />
        </div>

        {/* Price */}
        <div>
          <label className={labelCls}>Price / Starting Bid ($)</label>
          <input
            type="number" name="price" value={form.price}
            onChange={handleChange} placeholder="2500000" className={inputCls}
          />
        </div>

        {/* Property Type */}
        <div className="sm:col-span-2">
          <label className={labelCls}>Property Type</label>
          <select name="property_type" value={form.property_type} onChange={handleChange} className={inputCls}>
            <option value="" className="bg-shadow">Select type...</option>
            {PROPERTY_TYPES.map((t) => (
              <option key={t} value={t} className="bg-shadow capitalize">
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* Description */}
        <div className="sm:col-span-2">
          <label className={labelCls}>Description</label>
          <textarea
            name="description" value={form.description} onChange={handleChange}
            rows={6} placeholder="Describe the property..."
            className={`${inputCls} resize-none`}
          />
        </div>

        {/* Features */}
        <div className="sm:col-span-2">
          <label className={labelCls}>Features (one per line)</label>
          <textarea
            name="features" value={form.features} onChange={handleChange}
            rows={5}
            placeholder="Wildlife-fed creek"
            className={`${inputCls} resize-none`}
          />
        </div>

        {/* Images */}
        <div className="sm:col-span-2">
          <label className={labelCls}>Upload Images</label>
          <label className="flex items-center gap-3 border border-dashed border-offwhite/20 p-6 cursor-pointer hover:border-offwhite/40 transition-colors">
            <Upload className="w-5 h-5 text-offwhite/40" />
            <span className="text-offwhite/45 text-sm">
              {imageFiles.length > 0
                ? `${imageFiles.length} file(s) selected`
                : 'Click to select images'}
            </span>
            <input
              type="file" accept="image/*" multiple className="hidden"
              onChange={(e) => setImageFiles(Array.from(e.target.files || []))}
            />
          </label>
          {listing?.images && listing.images.length > 0 && (
            <p className="text-offwhite/35 text-xs mt-2">
              {listing.images.length} existing image(s). New uploads will be appended.
            </p>
          )}
        </div>
      </div>

      {submitStatus === 'error' && (
        <p className="text-red-400 text-sm">{errorMsg}</p>
      )}

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={submitStatus === 'loading'}
          className="bg-sunset text-shadow font-semibold text-sm tracking-[0.06em] uppercase px-8 py-3 hover:bg-[#e08600] transition-colors disabled:opacity-60"
        >
          {submitStatus === 'loading' ? 'Saving...' : isEdit ? 'Save Changes' : 'Create Listing'}
        </button>
        <button
          type="button"
          onClick={() => router.push('/admin/listings')}
          className="border border-offwhite/20 text-offwhite/55 text-sm tracking-[0.06em] uppercase px-6 py-3 hover:border-offwhite/40 hover:text-offwhite/80 transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}
