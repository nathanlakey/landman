import { notFound } from 'next/navigation'
import { supabase } from '@/lib/supabase/client'
import Image from 'next/image'
import Link from 'next/link'
import { MapPin, Maximize2, Phone, Mail, Check, ArrowLeft } from 'lucide-react'
import type { Listing } from '@/types'
import type { Metadata } from 'next'
import ImageGallery from '@/components/ImageGallery'
import InquiryForm from '@/components/InquiryForm'
import PropertyCard from '@/components/PropertyCard'
import FavoriteButton from './FavoriteButton'

interface Props {
  params: { slug: string }
}

async function getListing(slug: string): Promise<Listing | null> {
  const { data } = await supabase
    .from('listings')
    .select('*, agent:agents(*)')
    .eq('slug', slug)
    .single()
  return data || null
}

async function getRelatedListings(listing: Listing): Promise<Listing[]> {
  if (!listing.property_type) return []
  const { data } = await supabase
    .from('listings')
    .select('*')
    .eq('property_type', listing.property_type)
    .eq('status', 'active')
    .neq('id', listing.id)
    .limit(3)
  return data || []
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const listing = await getListing(params.slug)
  if (!listing) return { title: 'Property Not Found' }
  return {
    title: listing.title,
    description: listing.description?.slice(0, 155) || `${listing.acreage} acres in ${listing.location_county} County, TX`,
  }
}

const formattedPrice = (price: number | null) =>
  price
    ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(price)
    : 'Price Upon Request'

const statusColors: Record<string, string> = {
  active: 'bg-brand-tan/25 text-brand-tan-light border border-brand-tan/30',
  sold: 'bg-brand-dark/80 text-brand-off-white/70 border border-brand-off-white/20',
  reduced: 'bg-brand-tan/15 text-brand-tan border border-brand-tan/25',
}

export default async function ListingDetailPage({ params }: Props) {
  const listing = await getListing(params.slug)
  if (!listing) notFound()

  const related = await getRelatedListings(listing)
  const agent = listing.agent as Listing['agent']

  return (
    <div className="min-h-screen pt-20">
      {/* Back nav */}
      <div className="max-w-7xl mx-auto px-4 py-5">
        <Link
          href="/listings"
          className="inline-flex items-center gap-2 text-brand-off-white/50 text-sm hover:text-brand-tan transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Listings
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left: gallery + details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery */}
            <ImageGallery images={listing.images} title={listing.title} />

            {/* Title & Badges */}
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 flex-wrap mb-3">
                  <span className={`text-xs font-semibold px-2.5 py-1 tracking-wider uppercase ${statusColors[listing.status] || statusColors.active}`}>
                    {listing.status === 'reduced' ? 'Price Reduced' : listing.status.charAt(0).toUpperCase() + listing.status.slice(1)}
                  </span>
                  {listing.property_type && (
                    <span className="text-xs font-medium px-2.5 py-1 bg-brand-tan/10 text-brand-tan capitalize tracking-wide">
                      {listing.property_type}
                    </span>
                  )}
                </div>
                <h1 className="font-serif text-3xl sm:text-4xl text-brand-off-white mb-2">
                  {listing.title}
                </h1>
                {(listing.location_city || listing.location_county) && (
                  <p className="flex items-center gap-1.5 text-brand-off-white/50 text-sm">
                    <MapPin className="w-4 h-4 text-brand-tan/60" />
                    {[listing.location_city, listing.location_county && `${listing.location_county} County`].filter(Boolean).join(', ')}, {listing.state}
                  </p>
                )}
              </div>
              <FavoriteButton listingId={listing.id} />
            </div>

            {/* Key stats */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-6 bg-brand-brown border border-brand-tan/10">
              {listing.price && (
                <div>
                  <p className="text-brand-off-white/40 text-xs uppercase tracking-widest mb-1">List Price</p>
                  <p className="text-brand-tan font-semibold text-xl">{formattedPrice(listing.price)}</p>
                </div>
              )}
              {listing.acreage && (
                <div>
                  <p className="text-brand-off-white/40 text-xs uppercase tracking-widest mb-1">Total Acreage</p>
                  <p className="text-brand-off-white font-semibold text-xl flex items-center gap-1">
                    <Maximize2 className="w-4 h-4 text-brand-tan/60" />
                    {listing.acreage.toLocaleString()} ac
                  </p>
                </div>
              )}
              {listing.price && listing.acreage && (
                <div>
                  <p className="text-brand-off-white/40 text-xs uppercase tracking-widest mb-1">Price Per Acre</p>
                  <p className="text-brand-off-white font-semibold text-xl">
                    ${Math.round(listing.price / listing.acreage).toLocaleString()}
                  </p>
                </div>
              )}
            </div>

            {/* Description */}
            {listing.description && (
              <div>
                <h2 className="font-serif text-2xl text-brand-off-white mb-4">Property Description</h2>
                <div className="text-brand-off-white/70 leading-relaxed whitespace-pre-line">{listing.description}</div>
              </div>
            )}

            {/* Features */}
            {listing.features && listing.features.length > 0 && (
              <div>
                <h2 className="font-serif text-2xl text-brand-off-white mb-4">Property Features</h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {listing.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2 text-brand-off-white/70 text-sm">
                      <Check className="w-4 h-4 text-brand-tan mt-0.5 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Right: sidebar */}
          <div className="space-y-6">
            {/* Price card */}
            <div className="sticky top-24 space-y-6">
              <div className="p-6 bg-brand-brown border border-brand-tan/10">
                <p className="text-brand-tan font-semibold text-2xl mb-1">
                  {formattedPrice(listing.price)}
                </p>
                {listing.acreage && (
                  <p className="text-brand-off-white/50 text-sm mb-5">
                    {listing.acreage.toLocaleString()} acres
                    {listing.location_county && ` · ${listing.location_county} County`}
                  </p>
                )}
                <div className="border-t border-brand-tan/10 pt-5">
                  <h3 className="font-serif text-lg text-brand-off-white mb-4">Request Information</h3>
                  <InquiryForm listingId={listing.id} listingTitle={listing.title} />
                </div>
              </div>

              {/* Agent card */}
              {agent && (
                <div className="p-6 bg-brand-brown border border-brand-tan/10">
                  <h3 className="font-serif text-lg text-brand-off-white mb-4">Listing Agent</h3>
                  <div className="flex items-start gap-4">
                    <div className="relative w-14 h-14 rounded-full overflow-hidden flex-shrink-0 bg-brand-dark">
                      {agent.photo_url ? (
                        <Image src={agent.photo_url} alt={agent.name} fill className="object-cover" sizes="56px" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-brand-tan font-serif text-xl">{agent.name.charAt(0)}</span>
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="text-brand-off-white font-medium">{agent.name}</p>
                      {agent.title && <p className="text-brand-tan/70 text-xs tracking-wide mt-0.5">{agent.title}</p>}
                      {agent.phone && (
                        <a href={`tel:${agent.phone}`} className="flex items-center gap-1.5 text-brand-off-white/60 text-sm mt-2 hover:text-brand-tan transition-colors">
                          <Phone className="w-3.5 h-3.5" /> {agent.phone}
                        </a>
                      )}
                      {agent.email && (
                        <a href={`mailto:${agent.email}`} className="flex items-center gap-1.5 text-brand-off-white/60 text-sm mt-1 hover:text-brand-tan transition-colors">
                          <Mail className="w-3.5 h-3.5" /> {agent.email}
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Related listings */}
        {related.length > 0 && (
          <div className="mt-20 pt-12 border-t border-brand-tan/10">
            <h2 className="font-serif text-3xl text-brand-off-white mb-8">
              Similar Properties
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((l) => (
                <PropertyCard key={l.id} listing={l} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
