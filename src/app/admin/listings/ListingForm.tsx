'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Upload, FileText } from 'lucide-react'
import type { Listing } from '@/types'

interface ListingFormProps {
  listing?: Partial<Listing>
}

const PROPERTY_TYPES = ['ranch', 'farm', 'estate', 'development', 'recreational']
const STATUSES = ['draft', 'upcoming', 'active', 'sold', 'withdrawn']
const AUCTION_METHODS = ['absolute', 'reserve', 'minimum_bid', 'online_only', 'live_and_online']
const AUCTION_METHOD_LABELS: Record<string, string> = {
  absolute: 'Absolute',
  reserve: 'Reserve',
  minimum_bid: 'Minimum Bid',
  online_only: 'Online Only',
  live_and_online: 'Live & Online',
}

export default function ListingForm({ listing }: ListingFormProps) {
  const router = useRouter()
  const isEdit = !!listing?.id

  const [form, setForm] = useState({
    // Basic Info
    title: listing?.title || '',
    slug: listing?.slug || '',
    status: listing?.status || 'draft',
    published: listing?.published ?? false,
    auction_method: listing?.auction_method || '',
    is_featured: listing?.is_featured ?? false,
    // Location
    address: listing?.address || '',
    location_city: listing?.location_city || '',
    location_county: listing?.location_county || '',
    state: listing?.state || 'TX',
    zip_code: listing?.zip_code || '',
    // Property Details
    acreage: listing?.acreage?.toString() || '',
    price: listing?.price?.toString() || '',
    property_type: listing?.property_type || '',
    short_description: listing?.short_description || '',
    description: listing?.description || '',
    features: listing?.features?.join('\n') || '',
    highlights: listing?.highlights || '',
    square_footage: listing?.square_footage?.toString() || '',
    year_built: listing?.year_built?.toString() || '',
    bedrooms: listing?.bedrooms?.toString() || '',
    bathrooms: listing?.bathrooms?.toString() || '',
    // Auction Details
    auction_date: listing?.auction_date || '',
    auction_end_date: listing?.auction_end_date || '',
    auction_location: listing?.auction_location || '',
    online_bidding_url: listing?.online_bidding_url || '',
    registration_required: listing?.registration_required ?? false,
    auction_terms: listing?.auction_terms || '',
    bidder_requirements: listing?.bidder_requirements || '',
    // Media
    video_url: listing?.video_url || '',
    virtual_tour_url: listing?.virtual_tour_url || '',
    brochure_url: listing?.brochure_url || '',
    // SEO
    meta_title: listing?.meta_title || listing?.title || '',
    meta_description: listing?.meta_description || listing?.short_description || '',
  })

  // Existing images (already saved) — user can remove them
  const [existingImages, setExistingImages] = useState<string[]>(listing?.images || [])
  // New images selected but not yet uploaded
  type PendingImage = { file: File; preview: string; tempId: string }
  const [pendingImages, setPendingImages] = useState<PendingImage[]>([])

  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  // Supporting documents state
  type PendingDoc = { file: File; label: string; tempId: string }
  type ExistingDoc = { id: string; label: string; file_url: string; file_size?: string }
  const [pendingDocs, setPendingDocs] = useState<PendingDoc[]>([])
  const [existingDocs, setExistingDocs] = useState<ExistingDoc[]>([])
  const [docsToDelete, setDocsToDelete] = useState<string[]>([])
  const [existingDocEdits, setExistingDocEdits] = useState<Record<string, string>>({})
  const [docsLoading, setDocsLoading] = useState(false)

  useEffect(() => {
    if (!isEdit || !listing?.id) return
    setDocsLoading(true)
    fetch(`/api/admin/documents?listing_id=${listing.id}`)
      .then((r) => r.json())
      .then((docs) => { if (Array.isArray(docs)) setExistingDocs(docs) })
      .catch(console.error)
      .finally(() => setDocsLoading(false))
  }, [isEdit, listing?.id])

  const handleDocFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const tempId = `${Date.now()}-${Math.random()}`
    const defaultLabel = file.name.replace(/\.pdf$/i, '').replace(/[-_]/g, ' ')
    setPendingDocs((prev) => [...prev, { file, label: defaultLabel, tempId }])
    e.target.value = ''
  }

  const updateExistingDocLabel = (id: string, label: string) => {
    setExistingDocEdits((prev) => ({ ...prev, [id]: label }))
    setExistingDocs((prev) => prev.map((d) => d.id === id ? { ...d, label } : d))
  }

  const updatePendingDocLabel = (tempId: string, label: string) =>
    setPendingDocs((prev) => prev.map((d) => (d.tempId === tempId ? { ...d, label } : d)))

  const removePendingDoc = (tempId: string) =>
    setPendingDocs((prev) => prev.filter((d) => d.tempId !== tempId))

  const removeExistingDoc = (id: string) => {
    setExistingDocs((prev) => prev.filter((d) => d.id !== id))
    setDocsToDelete((prev) => [...prev, id])
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked

    setForm((prev) => {
      const updated = { ...prev, [name]: type === 'checkbox' ? checked : value }

      if (name === 'title' && !isEdit) {
        updated.slug = value
          .toLowerCase()
          .replace(/[^a-z0-9\s-]/g, '')
          .replace(/\s+/g, '-')
          .replace(/-+/g, '-')
        updated.meta_title = value
      }

      if (name === 'short_description' && !isEdit) {
        updated.meta_description = value
      }

      return updated
    })
  }

  const handleImageFilesSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (!files.length) return
    const newPending: PendingImage[] = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      tempId: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
    }))
    setPendingImages((prev) => [...prev, ...newPending])
    e.target.value = ''
  }

  const removePendingImage = (tempId: string) => {
    setPendingImages((prev) => {
      const removed = prev.find((p) => p.tempId === tempId)
      if (removed) URL.revokeObjectURL(removed.preview)
      return prev.filter((p) => p.tempId !== tempId)
    })
  }

  const removeExistingImage = (url: string) => {
    setExistingImages((prev) => prev.filter((u) => u !== url))
  }

  const uploadImages = async (): Promise<string[]> => {
    if (pendingImages.length === 0) return existingImages
    const uploadedUrls: string[] = []
    for (const pending of pendingImages) {
      const formData = new FormData()
      formData.append('files', pending.file)
      const res = await fetch('/api/admin/upload', { method: 'POST', body: formData })
      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        throw new Error(`Image upload failed for "${pending.file.name}": ${err?.error ?? res.status}`)
      }
      const { urls } = await res.json()
      if (Array.isArray(urls) && urls.length > 0) {
        uploadedUrls.push(urls[0])
      }
    }
    return [...existingImages, ...uploadedUrls]
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
        square_footage: form.square_footage ? parseFloat(form.square_footage) : null,
        year_built: form.year_built ? parseInt(form.year_built) : null,
        bedrooms: form.bedrooms ? parseInt(form.bedrooms) : null,
        bathrooms: form.bathrooms ? parseFloat(form.bathrooms) : null,
        auction_date: form.auction_date || null,
        auction_end_date: form.auction_end_date || null,
        auction_method: form.auction_method || null,
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
      const savedListing = await res.json()
      const listingId: string = savedListing.id || listing?.id || ''

      // Delete removed documents
      for (const docId of docsToDelete) {
        await fetch(`/api/admin/documents/${docId}`, { method: 'DELETE' })
      }

      // Patch renamed existing documents
      for (const [docId, newLabel] of Object.entries(existingDocEdits)) {
        if (!docsToDelete.includes(docId)) {
          await fetch(`/api/admin/documents/${docId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ label: newLabel }),
          })
        }
      }

      // Upload and save new documents (single combined call)
      for (let i = 0; i < pendingDocs.length; i++) {
        const doc = pendingDocs[i]
        const fd = new FormData()
        fd.append('file', doc.file)
        fd.append('listing_id', listingId)
        fd.append('label', doc.label || doc.file.name.replace(/\.pdf$/i, ''))
        fd.append('sort_order', String(i))
        await fetch('/api/admin/documents/upload', { method: 'POST', body: fd })
      }

      router.push('/admin/listings')
      router.refresh()
    } catch (err: unknown) {
      setSubmitStatus('error')
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong')
    }
  }

  const inputCls =
    'w-full bg-offwhite/[0.07] border border-offwhite/20 text-offwhite placeholder-offwhite/25 px-4 py-3 text-sm focus:outline-none focus:border-sunset/60 focus:bg-offwhite/[0.1] transition-colors'
  const labelCls = 'block text-offwhite/60 text-xs tracking-wider uppercase mb-1.5'
  const hintCls = 'text-offwhite/30 text-xs mb-2'
  const sectionHeadingCls =
    'text-offwhite/50 text-xs tracking-[0.15em] uppercase font-semibold border-b border-offwhite/15 pb-2 mb-5'
  const sectionCls = 'bg-offwhite/[0.03] border border-offwhite/[0.07] p-6'

  return (
    <form onSubmit={handleSubmit} className="space-y-10 max-w-3xl">

      {/* ── BASIC INFO ── */}
      <section className={sectionCls}>
        <p className={sectionHeadingCls}>Basic Info</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

          <div className="sm:col-span-2">
            <label className={labelCls}>Title *</label>
            <input
              type="text" name="title" value={form.title} onChange={handleChange}
              required placeholder="Spring Creek Ranch — 1,200 Acres"
              className={inputCls}
            />
          </div>

          <div>
            <label className={labelCls}>Slug *</label>
            <input
              type="text" name="slug" value={form.slug} onChange={handleChange}
              required placeholder="spring-creek-ranch" className={inputCls}
            />
          </div>

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

          <div>
            <label className={labelCls}>Auction Method</label>
            <select name="auction_method" value={form.auction_method} onChange={handleChange} className={inputCls}>
              <option value="" className="bg-shadow">Select method...</option>
              {AUCTION_METHODS.map((m) => (
                <option key={m} value={m} className="bg-shadow">
                  {AUCTION_METHOD_LABELS[m]}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col justify-end gap-3 pb-1">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox" name="published" checked={form.published}
                onChange={handleChange} className="w-4 h-4 accent-sunset"
              />
              <span className="text-offwhite/70 text-sm">Published (visible on site)</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox" name="is_featured" checked={form.is_featured}
                onChange={handleChange} className="w-4 h-4 accent-sunset"
              />
              <span className="text-offwhite/70 text-sm">Feature this listing on the homepage</span>
            </label>
          </div>

        </div>
      </section>

      {/* ── LOCATION ── */}
      <section className={sectionCls}>
        <p className={sectionHeadingCls}>Location</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

          <div className="sm:col-span-2">
            <label className={labelCls}>Street Address</label>
            <input
              type="text" name="address" value={form.address} onChange={handleChange}
              placeholder="1234 Ranch Road 100" className={inputCls}
            />
          </div>

          <div>
            <label className={labelCls}>City</label>
            <input
              type="text" name="location_city" value={form.location_city}
              onChange={handleChange} placeholder="Kerrville" className={inputCls}
            />
          </div>

          <div>
            <label className={labelCls}>County</label>
            <input
              type="text" name="location_county" value={form.location_county}
              onChange={handleChange} placeholder="Kerr" className={inputCls}
            />
          </div>

          <div>
            <label className={labelCls}>State</label>
            <input
              type="text" name="state" value={form.state}
              onChange={handleChange} placeholder="TX" className={inputCls}
            />
          </div>

          <div>
            <label className={labelCls}>Zip Code</label>
            <input
              type="text" name="zip_code" value={form.zip_code}
              onChange={handleChange} placeholder="78028" className={inputCls}
            />
          </div>

        </div>
      </section>

      {/* ── PROPERTY DETAILS ── */}
      <section className={sectionCls}>
        <p className={sectionHeadingCls}>Property Details</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

          <div>
            <label className={labelCls}>Acreage</label>
            <input
              type="number" name="acreage" value={form.acreage}
              onChange={handleChange} placeholder="1200" step="0.01" className={inputCls}
            />
          </div>

          <div>
            <label className={labelCls}>Price / Starting Bid ($)</label>
            <input
              type="number" name="price" value={form.price}
              onChange={handleChange} placeholder="2500000" className={inputCls}
            />
          </div>

          <div>
            <label className={labelCls}>Square Footage</label>
            <input
              type="number" name="square_footage" value={form.square_footage}
              onChange={handleChange} placeholder="3200" className={inputCls}
            />
          </div>

          <div>
            <label className={labelCls}>Year Built</label>
            <input
              type="number" name="year_built" value={form.year_built}
              onChange={handleChange} placeholder="1998" className={inputCls}
            />
          </div>

          <div>
            <label className={labelCls}>Bedrooms</label>
            <input
              type="number" name="bedrooms" value={form.bedrooms}
              onChange={handleChange} placeholder="4" className={inputCls}
            />
          </div>

          <div>
            <label className={labelCls}>Bathrooms</label>
            <input
              type="number" name="bathrooms" value={form.bathrooms}
              onChange={handleChange} placeholder="3" step="0.5" className={inputCls}
            />
          </div>

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

          <div className="sm:col-span-2">
            <label className={labelCls}>Short Description</label>
            <p className={hintCls}>Brief summary used for card previews</p>
            <textarea
              name="short_description" value={form.short_description} onChange={handleChange}
              rows={3} placeholder="A stunning 1,200-acre ranch in the Texas Hill Country..."
              className={`${inputCls} resize-none`}
            />
          </div>

          <div className="sm:col-span-2">
            <label className={labelCls}>Description</label>
            <textarea
              name="description" value={form.description} onChange={handleChange}
              rows={6} placeholder="Describe the property in full detail..."
              className={`${inputCls} resize-none`}
            />
          </div>

          <div className="sm:col-span-2">
            <label className={labelCls}>Features (one per line)</label>
            <textarea
              name="features" value={form.features} onChange={handleChange}
              rows={5} placeholder="Wildlife-fed creek"
              className={`${inputCls} resize-none`}
            />
          </div>

          <div className="sm:col-span-2">
            <label className={labelCls}>Highlights</label>
            <p className={hintCls}>Key selling points, one per line</p>
            <textarea
              name="highlights" value={form.highlights} onChange={handleChange}
              rows={4} placeholder={'Perimeter fenced\nHunting blinds included\nWell water'}
              className={`${inputCls} resize-none`}
            />
          </div>

        </div>
      </section>

      {/* ── AUCTION DETAILS ── */}
      <section className={sectionCls}>
        <p className={sectionHeadingCls}>Auction Details</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

          <div>
            <label className={labelCls}>Auction Date</label>
            <input
              type="date" name="auction_date" value={form.auction_date}
              onChange={handleChange} className={inputCls}
            />
          </div>

          <div>
            <label className={labelCls}>Auction End Date</label>
            <input
              type="datetime-local" name="auction_end_date" value={form.auction_end_date}
              onChange={handleChange} className={inputCls}
            />
          </div>

          <div>
            <label className={labelCls}>Auction Location</label>
            <input
              type="text" name="auction_location" value={form.auction_location}
              onChange={handleChange} placeholder="Kerrville Civic Center" className={inputCls}
            />
          </div>

          <div>
            <label className={labelCls}>Online Bidding URL</label>
            <input
              type="text" name="online_bidding_url" value={form.online_bidding_url}
              onChange={handleChange} placeholder="https://bidplatform.com/auction/123" className={inputCls}
            />
          </div>

          <div className="sm:col-span-2">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox" name="registration_required" checked={form.registration_required}
                onChange={handleChange} className="w-4 h-4 accent-sunset"
              />
              <span className="text-offwhite/70 text-sm">Registration Required</span>
            </label>
          </div>

          <div className="sm:col-span-2">
            <label className={labelCls}>Auction Terms</label>
            <p className={hintCls}>Terms and conditions shown on the listing page</p>
            <textarea
              name="auction_terms" value={form.auction_terms} onChange={handleChange}
              rows={4} placeholder="Property sells to the highest bidder..."
              className={`${inputCls} resize-none`}
            />
          </div>

          <div className="sm:col-span-2">
            <label className={labelCls}>Bidder Requirements</label>
            <textarea
              name="bidder_requirements" value={form.bidder_requirements} onChange={handleChange}
              rows={3} placeholder="10% deposit required day of auction"
              className={`${inputCls} resize-none`}
            />
          </div>

        </div>
      </section>

      {/* ── MEDIA ── */}
      <section className={sectionCls}>
        <p className={sectionHeadingCls}>Media</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

          <div className="sm:col-span-2">
            <label className={labelCls}>Images</label>

            {/* Existing saved images */}
            {existingImages.length > 0 && (
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 mb-3">
                {existingImages.map((url) => (
                  <div key={url} className="relative group aspect-[4/3] overflow-hidden bg-offwhite/10">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={url} alt="" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => removeExistingImage(url)}
                      className="absolute top-1 right-1 w-5 h-5 bg-black/70 text-white text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500"
                      aria-label="Remove image"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Pending new images */}
            {pendingImages.length > 0 && (
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 mb-3">
                {pendingImages.map((p) => (
                  <div key={p.tempId} className="relative group aspect-[4/3] overflow-hidden bg-offwhite/10 border border-sunset/30">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.preview} alt="" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => removePendingImage(p.tempId)}
                      className="absolute top-1 right-1 w-5 h-5 bg-black/70 text-white text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500"
                      aria-label="Remove image"
                    >
                      ✕
                    </button>
                    <div className="absolute bottom-0 left-0 right-0 bg-sunset/80 text-[9px] text-white text-center py-0.5 tracking-wide uppercase">New</div>
                  </div>
                ))}
              </div>
            )}

            {/* Upload trigger */}
            <label className="flex items-center gap-3 border border-dashed border-offwhite/20 p-5 cursor-pointer hover:border-offwhite/40 transition-colors">
              <Upload className="w-5 h-5 text-offwhite/40 shrink-0" />
              <span className="text-offwhite/45 text-sm">Click to add images (select multiple at once or click again to add more)</span>
              <input
                type="file" accept="image/*" multiple className="hidden"
                onChange={handleImageFilesSelected}
              />
            </label>
          </div>

          <div className="sm:col-span-2">
            <label className={labelCls}>Video URL</label>
            <p className={hintCls}>YouTube or Vimeo URL for aerial or walkthrough video</p>
            <input
              type="text" name="video_url" value={form.video_url}
              onChange={handleChange} placeholder="https://youtube.com/watch?v=..." className={inputCls}
            />
          </div>

          <div>
            <label className={labelCls}>Virtual Tour URL</label>
            <p className={hintCls}>Optional 360 tour link</p>
            <input
              type="text" name="virtual_tour_url" value={form.virtual_tour_url}
              onChange={handleChange} placeholder="https://my.matterport.com/..." className={inputCls}
            />
          </div>

          <div>
            <label className={labelCls}>Brochure / PDF URL</label>
            <p className={hintCls}>Optional downloadable marketing brochure link</p>
            <input
              type="text" name="brochure_url" value={form.brochure_url}
              onChange={handleChange} placeholder="https://..." className={inputCls}
            />
          </div>

        </div>
      </section>

      {/* ── SUPPORTING DOCUMENTS ── */}
      <section className={sectionCls}>
        <p className={sectionHeadingCls}>Supporting Documents</p>
        <p className={hintCls}>Upload PDF files visitors can download from the listing page (e.g. property brochure, terms &amp; conditions).</p>

        {docsLoading && (
          <p className="text-offwhite/35 text-xs mb-4">Loading documents…</p>
        )}

        {/* Existing saved documents */}
        {existingDocs.length > 0 && (
          <div className="space-y-2 mb-5">
            {existingDocs.map((doc) => (
              <div
                key={doc.id}
                className="flex items-center gap-3 border border-offwhite/15 px-4 py-3 bg-offwhite/[0.03]"
              >
                <FileText className="w-4 h-4 text-sunset/60 shrink-0" />
                <input
                  type="text"
                  value={doc.label}
                  onChange={(e) => updateExistingDocLabel(doc.id, e.target.value)}
                  placeholder="Document label"
                  className={`${inputCls} flex-1 py-1.5`}
                />
                {doc.file_size && (
                  <span className="text-offwhite/30 text-xs shrink-0">{doc.file_size}</span>
                )}
                <button
                  type="button"
                  onClick={() => removeExistingDoc(doc.id)}
                  aria-label="Remove document"
                  className="text-offwhite/30 hover:text-red-400 transition-colors text-base leading-none ml-1"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Pending new documents */}
        {pendingDocs.length > 0 && (
          <div className="space-y-2 mb-5">
            {pendingDocs.map((doc) => (
              <div
                key={doc.tempId}
                className="flex items-center gap-3 border border-sunset/25 px-4 py-3 bg-sunset/[0.04]"
              >
                <FileText className="w-4 h-4 text-sunset/60 shrink-0" />
                <input
                  type="text"
                  value={doc.label}
                  onChange={(e) => updatePendingDocLabel(doc.tempId, e.target.value)}
                  placeholder="Document label (e.g. Property Brochure)"
                  className={`${inputCls} flex-1 py-1.5`}
                />
                <span className="text-offwhite/30 text-xs shrink-0 max-w-[120px] truncate">
                  {doc.file.name}
                </span>
                <button
                  type="button"
                  onClick={() => removePendingDoc(doc.tempId)}
                  aria-label="Remove document"
                  className="text-offwhite/30 hover:text-red-400 transition-colors text-base leading-none ml-1"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Upload trigger */}
        <label className="flex items-center gap-3 border border-dashed border-offwhite/20 p-5 cursor-pointer hover:border-offwhite/40 transition-colors">
          <Upload className="w-5 h-5 text-offwhite/40 shrink-0" />
          <span className="text-offwhite/45 text-sm">Click to add a PDF document</span>
          <input
            type="file"
            accept=".pdf,application/pdf"
            className="hidden"
            onChange={handleDocFileSelect}
          />
        </label>
      </section>

      {/* ── SEO ── */}
      <section className={sectionCls}>
        <p className={sectionHeadingCls}>SEO</p>
        <div className="grid grid-cols-1 gap-5">

          <div>
            <label className={labelCls}>Meta Title</label>
            <input
              type="text" name="meta_title" value={form.meta_title}
              onChange={handleChange}
              placeholder="Spring Creek Ranch — 1,200 Acres | Landman Auctions"
              className={inputCls}
            />
          </div>

          <div>
            <label className={labelCls}>Meta Description</label>
            <textarea
              name="meta_description" value={form.meta_description} onChange={handleChange}
              rows={2} placeholder="A brief description for search engines..."
              className={`${inputCls} resize-none`}
            />
            <p className={`text-xs mt-1.5 transition-colors ${
              form.meta_description.length > 155 ? 'text-red-400' : 'text-offwhite/35'
            }`}>
              {form.meta_description.length} / 155 characters
              {form.meta_description.length > 155 && ' — too long'}
            </p>
          </div>

        </div>
      </section>

      {submitStatus === 'error' && (
        <p className="text-red-400 text-sm border border-red-400/20 bg-red-400/5 px-4 py-3">
          {errorMsg}
        </p>
      )}

      <div className="flex gap-4 pb-10">
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
