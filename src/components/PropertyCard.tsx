import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Maximize2, DollarSign } from 'lucide-react'
import type { Listing } from '@/types'

interface PropertyCardProps {
  listing: Listing
  className?: string
}

const statusColors: Record<string, string> = {
  active: 'bg-brand-tan/25 text-brand-tan-light border border-brand-tan/30',
  sold: 'bg-brand-dark/80 text-brand-off-white/70 border border-brand-off-white/20',
  reduced: 'bg-brand-tan/15 text-brand-tan border border-brand-tan/25',
}

const statusLabels: Record<string, string> = {
  active: 'Active',
  sold: 'Sold',
  reduced: 'Price Reduced',
}

export default function PropertyCard({ listing, className = '' }: PropertyCardProps) {
  const heroImage = listing.images?.[0]
  const formattedPrice = listing.price
    ? new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0,
      }).format(listing.price)
    : 'Price Upon Request'

  const formattedAcreage = listing.acreage
    ? `${listing.acreage.toLocaleString()} acres`
    : null

  return (
    <Link
      href={`/listings/${listing.slug}`}
      className={`group block bg-brand-brown border border-brand-tan/10 hover:border-brand-tan/40 transition-all duration-300 overflow-hidden shadow-[0_4px_24px_rgba(26,15,10,0.6)] hover:shadow-[0_8px_32px_rgba(200,146,42,0.14)] ${className}`}
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-brand-dark">
        {heroImage ? (
          <Image
            src={heroImage}
            alt={listing.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <MapPin className="w-12 h-12 text-brand-tan/30" />
          </div>
        )}

        {/* Status badge */}
        <div className="absolute top-3 left-3">
          <span
            className={`text-xs font-semibold px-2.5 py-1 tracking-wider uppercase ${
              statusColors[listing.status] || statusColors.active
            }`}
          >
            {statusLabels[listing.status] || listing.status}
          </span>
        </div>

        {/* Property type badge */}
        {listing.property_type && (
          <div className="absolute top-3 right-3">
            <span className="text-xs font-medium px-2 py-1 bg-black/60 text-brand-tan/90 capitalize tracking-wide">
              {listing.property_type}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-serif text-lg text-brand-off-white group-hover:text-brand-tan transition-colors line-clamp-2 mb-2">
          {listing.title}
        </h3>

        {(listing.location_city || listing.location_county) && (
          <p className="flex items-center gap-1.5 text-brand-off-white/50 text-sm mb-4">
            <MapPin className="w-3.5 h-3.5 text-brand-tan/60 flex-shrink-0" />
            {[listing.location_city, listing.location_county && `${listing.location_county} County`]
              .filter(Boolean)
              .join(', ')}
            {listing.state && `, ${listing.state}`}
          </p>
        )}

        <div className="flex items-center justify-between pt-4 border-t border-brand-tan/10">
          {formattedAcreage && (
            <div className="flex items-center gap-1.5 text-brand-off-white/70 text-sm">
              <Maximize2 className="w-3.5 h-3.5 text-brand-tan/60" />
              {formattedAcreage}
            </div>
          )}
          <div className="flex items-center gap-1 ml-auto">
            <DollarSign className="w-3.5 h-3.5 text-brand-tan" />
            <span className="text-brand-tan font-semibold text-sm">
              {listing.price
                ? formattedPrice
                : 'Price Upon Request'}
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}
