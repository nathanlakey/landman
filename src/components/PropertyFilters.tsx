'use client'

import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { useCallback } from 'react'
import { SlidersHorizontal } from 'lucide-react'

const PROPERTY_TYPES = [
  { value: '', label: 'All Types' },
  { value: 'ranch', label: 'Ranch' },
  { value: 'farm', label: 'Farm' },
  { value: 'hunting', label: 'Hunting' },
  { value: 'recreational', label: 'Recreational' },
  { value: 'agricultural', label: 'Agricultural' },
]

const PRICE_RANGES = [
  { value: '', label: 'Any Price' },
  { value: '0-500000', label: 'Under $500K' },
  { value: '500000-1000000', label: '$500K – $1M' },
  { value: '1000000-3000000', label: '$1M – $3M' },
  { value: '3000000-10000000', label: '$3M – $10M' },
  { value: '10000000-', label: '$10M+' },
]

const ACREAGE_RANGES = [
  { value: '', label: 'Any Size' },
  { value: '0-100', label: 'Under 100 acres' },
  { value: '100-500', label: '100 – 500 acres' },
  { value: '500-1000', label: '500 – 1,000 acres' },
  { value: '1000-5000', label: '1,000 – 5,000 acres' },
  { value: '5000-', label: '5,000+ acres' },
]

const SORT_OPTIONS = [
  { value: 'created_at_desc', label: 'Newest First' },
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
  { value: 'acreage_asc', label: 'Acreage: Small to Large' },
  { value: 'acreage_desc', label: 'Acreage: Large to Small' },
]

const STATUS_OPTIONS = [
  { value: '', label: 'All Status' },
  { value: 'active', label: 'Active' },
  { value: 'reduced', label: 'Price Reduced' },
  { value: 'sold', label: 'Sold' },
]

export default function PropertyFilters() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const createQueryString = useCallback(
    (updates: Record<string, string>) => {
      const params = new URLSearchParams(searchParams.toString())
      Object.entries(updates).forEach(([key, value]) => {
        if (value) {
          params.set(key, value)
        } else {
          params.delete(key)
        }
      })
      params.delete('page') // reset pagination on filter change
      return params.toString()
    },
    [searchParams]
  )

  const handleChange = (key: string, value: string) => {
    const qs = createQueryString({ [key]: value })
    router.push(`${pathname}?${qs}`, { scroll: false })
  }

  const selectClass =
    'w-full bg-brand-dark border border-brand-tan/30 text-brand-off-white/80 text-sm px-3 py-2.5 focus:outline-none focus:border-brand-tan focus:ring-1 focus:ring-brand-tan/30 transition-colors'

  return (
      <div className="bg-brand-brown/70 border border-brand-tan/20 p-4 sm:p-6">
      <div className="flex items-center gap-2 mb-5">
        <SlidersHorizontal className="w-4 h-4 text-brand-tan" />
        <span className="text-brand-tan text-sm font-semibold tracking-widest uppercase">
          Filter Properties
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {/* Property Type */}
        <select
          value={searchParams.get('property_type') || ''}
          onChange={(e) => handleChange('property_type', e.target.value)}
          className={selectClass}
        >
          {PROPERTY_TYPES.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        {/* Price Range */}
        <select
          value={searchParams.get('price_range') || ''}
          onChange={(e) => handleChange('price_range', e.target.value)}
          className={selectClass}
        >
          {PRICE_RANGES.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        {/* Acreage Range */}
        <select
          value={searchParams.get('acreage_range') || ''}
          onChange={(e) => handleChange('acreage_range', e.target.value)}
          className={selectClass}
        >
          {ACREAGE_RANGES.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        {/* Status */}
        <select
          value={searchParams.get('status') || ''}
          onChange={(e) => handleChange('status', e.target.value)}
          className={selectClass}
        >
          {STATUS_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        {/* Sort */}
        <select
          value={searchParams.get('sort') || 'created_at_desc'}
          onChange={(e) => handleChange('sort', e.target.value)}
          className={selectClass}
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
