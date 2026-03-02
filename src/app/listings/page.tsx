import { Suspense } from 'react'
import { supabase } from '@/lib/supabase/client'
import PropertyCard from '@/components/PropertyCard'
import PropertyFilters from '@/components/PropertyFilters'
import Link from 'next/link'
import type { Listing } from '@/types'
import type { Metadata } from 'next'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Texas Ranch & Land Listings',
  description: 'Browse Texas ranch, farm, hunting, and recreational land for sale.',
}

const PAGE_SIZE = 12

interface SearchParams {
  property_type?: string
  price_range?: string
  acreage_range?: string
  status?: string
  sort?: string
  page?: string
}

async function getListings(params: SearchParams): Promise<{ data: Listing[]; count: number }> {
  try {
    let query = supabase
      .from('listings')
      .select('*, agent:agents(id,name,title,phone,email)', { count: 'exact' })

    if (params.property_type) query = query.eq('property_type', params.property_type)
    if (params.status) {
      query = query.eq('status', params.status)
    } else {
      // default: exclude nothing – show all
    }

    // Price range
    if (params.price_range) {
      const [min, max] = params.price_range.split('-')
      if (min) query = query.gte('price', Number(min))
      if (max) query = query.lte('price', Number(max))
    }

    // Acreage range
    if (params.acreage_range) {
      const [min, max] = params.acreage_range.split('-')
      if (min) query = query.gte('acreage', Number(min))
      if (max) query = query.lte('acreage', Number(max))
    }

    // Sort
    const sort = params.sort || 'created_at_desc'
    const [field, dir] = sort.split('_').reduce<[string, boolean]>(
      (acc, part, i, arr) => {
        if (i === arr.length - 1) return [acc[0], part === 'asc']
        return [acc[0] ? `${acc[0]}_${part}` : part, false]
      },
      ['', false]
    )
    query = query.order(field || 'created_at', { ascending: dir })

    // Pagination
    const page = Math.max(1, Number(params.page) || 1)
    const from = (page - 1) * PAGE_SIZE
    query = query.range(from, from + PAGE_SIZE - 1)

    const { data, count } = await query
    return { data: data || [], count: count || 0 }
  } catch {
    return { data: [], count: 0 }
  }
}

export default async function ListingsPage({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  const { data: listings, count } = await getListings(searchParams)
  const page = Math.max(1, Number(searchParams.page) || 1)
  const totalPages = Math.ceil(count / PAGE_SIZE)

  const buildPageUrl = (p: number) => {
    const qs = new URLSearchParams(
      Object.fromEntries(Object.entries(searchParams).filter(([, v]) => v != null)) as Record<string, string>
    )
    qs.set('page', String(p))
    return `/listings?${qs.toString()}`
  }

  return (
    <div className="min-h-screen pt-24 pb-20">
      {/* Header */}
      <div className="bg-brand-brown border-b border-brand-tan/10 py-14 px-4">
        <div className="max-w-7xl mx-auto">
          <p className="text-brand-tan text-xs tracking-[0.3em] uppercase mb-3">
            Texas Properties
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl text-brand-off-white">
            Ranch &amp; Land Listings
          </h1>
          {count > 0 && (
            <p className="text-brand-off-white/50 mt-3 text-sm">
              {count} {count === 1 ? 'property' : 'properties'} found
            </p>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Filters */}
        <Suspense fallback={null}>
          <PropertyFilters />
        </Suspense>

        {/* Results */}
        <div className="mt-8">
          {listings.length === 0 ? (
            <div className="text-center py-24 text-brand-off-white/40">
              <p className="text-xl font-serif mb-3">No properties found</p>
              <p className="text-sm mb-6">Try adjusting your filters to see more results.</p>
              <Link
                href="/listings"
                className="text-brand-tan text-sm underline hover:no-underline"
              >
                Clear all filters
              </Link>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {listings.map((listing) => (
                  <PropertyCard key={listing.id} listing={listing} />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-12">
                  {page > 1 && (
                    <Link
                      href={buildPageUrl(page - 1)}
                      className="flex items-center gap-1 px-4 py-2 border border-brand-tan/20 text-brand-off-white/70 text-sm hover:border-brand-tan hover:text-brand-tan transition-colors"
                    >
                      <ChevronLeft className="w-4 h-4" /> Prev
                    </Link>
                  )}

                  {Array.from({ length: totalPages }, (_, i) => i + 1)
                    .filter((p) => p === 1 || p === totalPages || Math.abs(p - page) <= 2)
                    .map((p, idx, arr) => (
                      <>
                        {idx > 0 && arr[idx - 1] !== p - 1 && (
                          <span key={`ellipsis-${p}`} className="text-brand-off-white/30 px-1">…</span>
                        )}
                        <Link
                          key={p}
                          href={buildPageUrl(p)}
                          className={`w-10 h-10 flex items-center justify-center text-sm border transition-colors ${
                            p === page
                              ? 'border-brand-tan bg-brand-tan text-brand-dark font-semibold'
                              : 'border-brand-tan/20 text-brand-off-white/70 hover:border-brand-tan hover:text-brand-tan'
                          }`}
                        >
                          {p}
                        </Link>
                      </>
                    ))}

                  {page < totalPages && (
                    <Link
                      href={buildPageUrl(page + 1)}
                      className="flex items-center gap-1 px-4 py-2 border border-brand-tan/20 text-brand-off-white/70 text-sm hover:border-brand-tan hover:text-brand-tan transition-colors"
                    >
                      Next <ChevronRight className="w-4 h-4" />
                    </Link>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
