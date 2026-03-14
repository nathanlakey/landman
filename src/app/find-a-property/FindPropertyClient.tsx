'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase/client'
import type { Listing } from '@/types'
import {
  MapPin,
  Maximize2,
  SlidersHorizontal,
  X,
  Search,
  ChevronDown,
} from 'lucide-react'

// ─── Types ────────────────────────────────────────────────────────────────────

interface Filters {
  priceMin: string
  priceMax: string
  acreageMin: string
  acreageMax: string
  county: string
  propertyType: string
  status: string
  sort: string
}

const DEFAULT_FILTERS: Filters = {
  priceMin: '',
  priceMax: '',
  acreageMin: '',
  acreageMax: '',
  county: '',
  propertyType: '',
  status: '',
  sort: 'created_at_desc',
}

const PROPERTY_TYPES = [
  { value: '', label: 'All Types' },
  { value: 'ranch', label: 'Ranch' },
  { value: 'farm', label: 'Farm' },
  { value: 'estate', label: 'Estate' },
  { value: 'development', label: 'Development' },
  { value: 'recreational', label: 'Recreational' },
  { value: 'hunting', label: 'Hunting' },
  { value: 'agricultural', label: 'Agricultural' },
]

const STATUS_OPTIONS = [
  { value: '', label: 'All Status' },
  { value: 'active', label: 'Active' },
  { value: 'reduced', label: 'Price Reduced' },
  { value: 'sold', label: 'Sold' },
]

const SORT_OPTIONS = [
  { value: 'created_at_desc', label: 'Newest First' },
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
  { value: 'acreage_asc', label: 'Acreage: Small to Large' },
  { value: 'acreage_desc', label: 'Acreage: Large to Small' },
]

const statusBadge: Record<string, string> = {
  active:  'bg-green-100 text-green-800 border border-green-200',
  reduced: 'bg-[#FF9500]/10 text-[#FF9500] border border-[#FF9500]/30',
  sold:    'bg-[#201E3D]/10 text-[#201E3D]/60 border border-[#201E3D]/15',
}

const statusLabel: Record<string, string> = {
  active:  'Active',
  reduced: 'Price Reduced',
  sold:    'Sold',
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatPrice(price: number | null): string {
  if (!price) return 'Contact for Price'
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(price)
}

function formatAcreage(acres: number | null): string | null {
  if (!acres) return null
  return `${acres.toLocaleString()} acres`
}

// ─── Skeleton Card ────────────────────────────────────────────────────────────

function SkeletonCard() {
  return (
    <div className="bg-white border border-[#CBBBA0]/30 overflow-hidden animate-pulse">
      <div className="aspect-[4/3] bg-[#CBBBA0]/20" />
      <div className="p-5 space-y-3">
        <div className="h-5 bg-[#CBBBA0]/20 rounded w-3/4" />
        <div className="h-4 bg-[#CBBBA0]/20 rounded w-1/2" />
        <div className="h-px bg-[#CBBBA0]/20 mt-4" />
        <div className="flex justify-between pt-1">
          <div className="h-4 bg-[#CBBBA0]/20 rounded w-1/4" />
          <div className="h-4 bg-[#CBBBA0]/20 rounded w-1/3" />
        </div>
      </div>
    </div>
  )
}

// ─── Property Card ────────────────────────────────────────────────────────────

function PropertyCard({ listing }: { listing: Listing }) {
  const heroImage = listing.images?.[0]

  return (
    <div className="group bg-white border border-[#CBBBA0]/30 hover:border-[#FF9500]/40 hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col">
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-[#F6F3EC]">
        {heroImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={heroImage}
            alt={listing.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-2">
            <MapPin className="w-10 h-10 text-[#CBBBA0]/40" />
            <span className="text-xs text-[#CBBBA0]/60 tracking-widest uppercase">No Photo</span>
          </div>
        )}

        {/* Status badge */}
        <div className="absolute top-3 left-3">
          <span className={`text-[10px] font-semibold px-2.5 py-1 tracking-wider uppercase ${statusBadge[listing.status] ?? statusBadge.active}`}>
            {statusLabel[listing.status] ?? listing.status}
          </span>
        </div>

        {/* Property type badge */}
        {listing.property_type && (
          <div className="absolute top-3 right-3">
            <span className="text-[10px] font-medium px-2 py-1 bg-black/50 text-white/90 capitalize tracking-wide">
              {listing.property_type}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-serif text-lg text-[#201E3D] group-hover:text-[#FF9500] transition-colors line-clamp-2 mb-1.5">
          {listing.title}
        </h3>

        {(listing.location_city || listing.location_county) && (
          <p className="flex items-center gap-1.5 text-[#201E3D]/50 text-sm mb-4">
            <MapPin className="w-3.5 h-3.5 text-[#A86A3D]/70 flex-shrink-0" />
            {[
              listing.location_city,
              listing.location_county && `${listing.location_county} County`,
            ]
              .filter(Boolean)
              .join(', ')}
          </p>
        )}

        <div className="flex items-center justify-between mt-auto pt-4 border-t border-[#CBBBA0]/25">
          {listing.acreage ? (
            <div className="flex items-center gap-1.5 text-[#201E3D]/60 text-sm">
              <Maximize2 className="w-3.5 h-3.5 text-[#A86A3D]/70" />
              {formatAcreage(listing.acreage)}
            </div>
          ) : (
            <span />
          )}
          <span className="text-[#FF9500] font-semibold text-sm ml-auto">
            {formatPrice(listing.price)}
          </span>
        </div>

        <Link
          href={`/listings/${listing.slug}`}
          className="mt-4 block text-center bg-[#201E3D] text-[#F6F3EC] text-[12px] tracking-[0.1em] uppercase font-medium py-2.5 px-4 hover:bg-[#FF9500] hover:text-white transition-colors duration-200"
        >
          View Property
        </Link>
      </div>
    </div>
  )
}

// ─── Select ───────────────────────────────────────────────────────────────────

function FilterSelect({
  value,
  onChange,
  options,
  placeholder,
}: {
  value: string
  onChange: (v: string) => void
  options: { value: string; label: string }[]
  placeholder?: string
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full appearance-none bg-white border border-[#CBBBA0]/50 text-[#201E3D] text-sm px-3 py-2.5 pr-8 focus:outline-none focus:border-[#FF9500] focus:ring-1 focus:ring-[#FF9500]/20 transition-colors cursor-pointer"
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#201E3D]/40 pointer-events-none" />
    </div>
  )
}

function PriceInput({
  value,
  onChange,
  placeholder,
}: {
  value: string
  onChange: (v: string) => void
  placeholder: string
}) {
  return (
    <input
      type="number"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      step={50000}
      min={0}
      className="w-full bg-white border border-[#CBBBA0]/50 text-[#201E3D] text-sm px-3 py-2.5 focus:outline-none focus:border-[#FF9500] focus:ring-1 focus:ring-[#FF9500]/20 transition-colors placeholder:text-[#201E3D]/30"
    />
  )
}

function AcreageInput({
  value,
  onChange,
  placeholder,
}: {
  value: string
  onChange: (v: string) => void
  placeholder: string
}) {
  return (
    <input
      type="number"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      step={50}
      min={0}
      className="w-full bg-white border border-[#CBBBA0]/50 text-[#201E3D] text-sm px-3 py-2.5 focus:outline-none focus:border-[#FF9500] focus:ring-1 focus:ring-[#FF9500]/20 transition-colors placeholder:text-[#201E3D]/30"
    />
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

interface FindPropertyClientProps {
  initialListings: Listing[]
  initialCounties: string[]
}

export default function FindPropertyClient({
  initialListings,
  initialCounties,
}: FindPropertyClientProps) {
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS)
  const [listings, setListings] = useState<Listing[]>(initialListings)
  const [loading, setLoading] = useState(false)
  const [totalCount, setTotalCount] = useState(initialListings.length)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const fetchListings = useCallback(async (f: Filters) => {
    setLoading(true)
    try {
      let query = supabase
        .from('listings')
        .select('*', { count: 'exact' })

      if (f.priceMin) query = query.gte('price', Number(f.priceMin))
      if (f.priceMax) query = query.lte('price', Number(f.priceMax))
      if (f.acreageMin) query = query.gte('acreage', Number(f.acreageMin))
      if (f.acreageMax) query = query.lte('acreage', Number(f.acreageMax))
      if (f.county) query = query.eq('location_county', f.county)
      if (f.propertyType) query = query.eq('property_type', f.propertyType)
      if (f.status) query = query.eq('status', f.status)

      // Sort
      switch (f.sort) {
        case 'price_asc':
          query = query.order('price', { ascending: true })
          break
        case 'price_desc':
          query = query.order('price', { ascending: false })
          break
        case 'acreage_asc':
          query = query.order('acreage', { ascending: true })
          break
        case 'acreage_desc':
          query = query.order('acreage', { ascending: false })
          break
        default:
          query = query.order('created_at', { ascending: false })
      }

      const { data, count, error } = await query

      if (!error) {
        setListings((data as Listing[]) ?? [])
        setTotalCount(count ?? 0)
      }
    } finally {
      setLoading(false)
    }
  }, [])

  // Debounced filter effect
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      fetchListings(filters)
    }, 300)
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
  }, [filters, fetchListings])

  const setFilter = (key: keyof Filters, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const clearFilters = () => setFilters(DEFAULT_FILTERS)

  const isFiltered =
    filters.priceMin ||
    filters.priceMax ||
    filters.acreageMin ||
    filters.acreageMax ||
    filters.county ||
    filters.propertyType ||
    filters.status

  const countyOptions = initialCounties.map((c) => ({ value: c, label: `${c} County` }))

  return (
    <div className="bg-[#F6F3EC] min-h-screen">
      {/* ── Sticky Filter Bar ── */}
      <div className="sticky top-20 z-40 bg-white border-b border-[#CBBBA0]/30 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 mb-3">
            <SlidersHorizontal className="w-4 h-4 text-[#FF9500]" />
            <span className="text-[#201E3D] text-xs font-semibold tracking-[0.15em] uppercase">
              Filter Properties
            </span>
            {isFiltered && (
              <button
                onClick={clearFilters}
                className="ml-auto flex items-center gap-1.5 text-xs text-[#201E3D]/50 hover:text-[#FF9500] transition-colors"
              >
                <X className="w-3.5 h-3.5" />
                Clear All
              </button>
            )}
          </div>

          {/* Filter grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
            {/* Price Min */}
            <PriceInput
              value={filters.priceMin}
              onChange={(v) => setFilter('priceMin', v)}
              placeholder="Min Price ($)"
            />
            {/* Price Max */}
            <PriceInput
              value={filters.priceMax}
              onChange={(v) => setFilter('priceMax', v)}
              placeholder="Max Price ($)"
            />
            {/* Acreage Min */}
            <AcreageInput
              value={filters.acreageMin}
              onChange={(v) => setFilter('acreageMin', v)}
              placeholder="Min Acres"
            />
            {/* Acreage Max */}
            <AcreageInput
              value={filters.acreageMax}
              onChange={(v) => setFilter('acreageMax', v)}
              placeholder="Max Acres"
            />
            {/* County */}
            <FilterSelect
              value={filters.county}
              onChange={(v) => setFilter('county', v)}
              options={countyOptions}
              placeholder="All Counties"
            />
            {/* Property Type */}
            <FilterSelect
              value={filters.propertyType}
              onChange={(v) => setFilter('propertyType', v)}
              options={PROPERTY_TYPES}
              placeholder="All Types"
            />
          </div>

          {/* Second row: status + sort */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-2.5">
            <FilterSelect
              value={filters.status}
              onChange={(v) => setFilter('status', v)}
              options={STATUS_OPTIONS}
              placeholder="All Status"
            />
            <FilterSelect
              value={filters.sort}
              onChange={(v) => setFilter('sort', v)}
              options={SORT_OPTIONS}
            />
          </div>
        </div>
      </div>

      {/* ── Results ── */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10">
        {/* Result count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-[#201E3D]/60 text-sm">
            {loading ? (
              <span className="animate-pulse">Searching...</span>
            ) : (
              <>
                <span className="font-semibold text-[#201E3D]">{totalCount}</span>{' '}
                {totalCount === 1 ? 'property' : 'properties'} found
              </>
            )}
          </p>
        </div>

        {/* Skeleton */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        )}

        {/* Results grid */}
        {!loading && listings.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {listings.map((listing) => (
              <PropertyCard key={listing.id} listing={listing} />
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && listings.length === 0 && (
          <div className="text-center py-24">
            <Search className="w-12 h-12 text-[#CBBBA0]/50 mx-auto mb-4" />
            <h3 className="font-serif text-2xl text-[#201E3D] mb-2">
              No properties match your search
            </h3>
            <p className="text-[#201E3D]/50 text-sm mb-6 max-w-sm mx-auto">
              Try adjusting your filters or browse all available listings.
            </p>
            {isFiltered && (
              <button
                onClick={clearFilters}
                className="inline-flex items-center gap-2 bg-[#201E3D] text-[#F6F3EC] text-sm tracking-[0.08em] uppercase font-medium px-6 py-3 hover:bg-[#FF9500] transition-colors duration-200"
              >
                <X className="w-4 h-4" />
                Clear Filters
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
