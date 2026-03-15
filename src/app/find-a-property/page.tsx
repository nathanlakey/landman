import type { Metadata } from 'next'
import { supabaseAdmin } from '@/lib/supabase/server'
import type { Listing } from '@/types'
import FindPropertyClient from './FindPropertyClient'
import AuctionAlertForm from '@/components/AuctionAlertForm'

export const metadata: Metadata = {
  title: 'Find a Property',
  description:
    'Search North Texas farm, ranch, and land listings. Filter by price, acreage, county, and property type.',
}

async function getInitialData(): Promise<{ listings: Listing[]; counties: string[] }> {
  try {
    const [listingsRes, countiesRes] = await Promise.all([
      supabaseAdmin
        .from('listings')
        .select('*')
        .order('created_at', { ascending: false }),
      supabaseAdmin
        .from('listings')
        .select('location_county')
        .not('location_county', 'is', null),
    ])

    const listings = (listingsRes.data as Listing[]) ?? []

    // Deduplicate and sort counties
    const allCounties = (countiesRes.data ?? [])
      .map((r: { location_county: string | null }) => r.location_county)
      .filter((c): c is string => !!c)

    const seen = new Set<string>()
    const counties: string[] = []
    for (const c of allCounties) {
      if (!seen.has(c)) {
        seen.add(c)
        counties.push(c)
      }
    }
    counties.sort()

    return { listings, counties }
  } catch {
    return { listings: [], counties: [] }
  }
}

export default async function FindAPropertyPage() {
  const { listings, counties } = await getInitialData()

  return (
    <>
      {/* ── Hero ── */}
      <section className="bg-[#201E3D] pt-32 pb-14">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <p className="text-[#FF9500] text-[11px] tracking-[0.3em] uppercase font-medium mb-4">
            Available Listings
          </p>
          <h1 className="font-serif text-display-lg text-[#F6F3EC] mb-4">
            Find a Property
          </h1>
          <p className="text-[#CBBBA0] text-base max-w-xl">
            Search North Texas farm, ranch &amp; land listings. Use the filters below to narrow
            by price, acreage, county, and property type.
          </p>
        </div>
      </section>

      {/* ── Filters + Results (client) ── */}
      <FindPropertyClient initialListings={listings} initialCounties={counties} />

      {/* ── Auction Alerts ── */}
      <section className="py-16 px-6 bg-offwhite border-t border-sand/40">
        <div className="max-w-lg mx-auto text-center">
          <p className="text-clay text-[11px] tracking-[0.3em] uppercase font-medium mb-3">
            Auction Alerts
          </p>
          <h2 className="font-serif text-2xl text-shadow mb-3">
            Don&apos;t see the right property?
          </h2>
          <p className="text-shadow/60 text-sm leading-relaxed mb-8">
            Get notified when new ranch, farm, and land auctions are announced
            across North Texas.
          </p>
          <AuctionAlertForm />
          <p className="text-shadow/35 text-xs mt-4 tracking-wide">
            No spam. Only auction announcements.
          </p>
        </div>
      </section>
    </>
  )
}
