import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import {
  MapPin,
  CalendarDays,
  Gavel,
  FileText,
  Video,
  Globe,
  ExternalLink,
  ArrowRight,
  Home,
  Bath,
  BedDouble,
  SquareStack,
  Download,
} from 'lucide-react'
import { supabaseAdmin } from '@/lib/supabase/server'
import type { Listing } from '@/types'
import AuctionCountdown from './AuctionCountdown'
import PhotoGallery from './PhotoGallery'

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const { data } = await supabaseAdmin
    .from('listings')
    .select('title, meta_title, meta_description, short_description, images')
    .eq('slug', params.slug)
    .single()

  if (!data) return {}

  return {
    title: data.meta_title || data.title,
    description: data.meta_description || data.short_description || '',
    openGraph: {
      images: data.images?.[0] ? [data.images[0]] : [],
    },
  }
}

export default async function ListingDetailPage({ params }: { params: { slug: string } }) {
  const { data } = await supabaseAdmin
    .from('listings')
    .select('*')
    .eq('slug', params.slug)
    .eq('published', true)
    .single()

  if (!data) notFound()

  const listing = data as Listing

  // Fetch supporting documents
  const { data: documents } = await supabaseAdmin
    .from('listing_documents')
    .select('id, label, file_url, file_size')
    .eq('listing_id', listing.id)
    .order('sort_order')
    .order('created_at')

  const docs = (documents ?? []) as { id: string; label: string; file_url: string; file_size?: string }[]

  const formattedPrice = listing.price
    ? new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0,
      }).format(listing.price)
    : null

  const statusLabels: Record<string, string> = {
    active: 'Active',
    upcoming: 'Upcoming',
    sold: 'Sold',
    withdrawn: 'Withdrawn',
    draft: 'Draft',
  }

  const statusColors: Record<string, string> = {
    active: 'bg-sunset/15 text-sunset border border-sunset/30',
    upcoming: 'bg-sage/15 text-sage border border-sage/30',
    sold: 'bg-offwhite/10 text-offwhite/50 border border-offwhite/15',
    withdrawn: 'bg-offwhite/10 text-offwhite/50 border border-offwhite/15',
    draft: 'bg-offwhite/10 text-offwhite/50 border border-offwhite/15',
  }

  const auctionMethodLabels: Record<string, string> = {
    absolute: 'Absolute Auction',
    reserve: 'Reserve Auction',
    minimum_bid: 'Minimum Bid',
    online_only: 'Online Only',
    live_and_online: 'Live & Online',
  }

  const heroImage = listing.images?.[0]
  const galleryImages = listing.images?.slice(1) ?? []

  // Build location string
  const locationParts = [
    listing.address,
    listing.location_city,
    listing.location_county ? `${listing.location_county} County` : null,
    listing.state,
    listing.zip_code,
  ].filter(Boolean)

  const hasAuction =
    listing.auction_date ||
    listing.auction_end_date ||
    listing.auction_location ||
    listing.auction_method ||
    listing.auction_terms ||
    listing.bidder_requirements ||
    listing.online_bidding_url

  return (
    <div className="bg-shadow min-h-screen">

      {/* ── HERO IMAGE ── */}
      <div className="relative h-[55vh] min-h-[380px] w-full bg-shadow/80">
        {heroImage ? (
          <Image
            src={heroImage}
            alt={listing.title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-shadow">
            <MapPin className="w-16 h-16 text-offwhite/15" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-shadow via-shadow/40 to-transparent" />

        {/* Back link */}
        <div className="absolute top-24 left-0 right-0 max-w-6xl mx-auto px-6 lg:px-8">
          <Link
            href="/find-a-property"
            className="inline-flex items-center gap-2 text-offwhite/60 text-xs tracking-widest uppercase hover:text-offwhite transition-colors"
          >
            ← All Properties
          </Link>
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className="max-w-6xl mx-auto px-6 lg:px-8 -mt-24 relative z-10 pb-24">

        {/* Title + status */}
        <div className="flex flex-wrap items-start gap-4 mb-4">
          <h1 className="font-serif text-display-md text-offwhite flex-1 min-w-0">
            {listing.title}
          </h1>
          <span className={`shrink-0 text-xs font-semibold px-3 py-1.5 tracking-wider uppercase mt-2 ${statusColors[listing.status] ?? statusColors.active}`}>
            {statusLabels[listing.status] ?? listing.status}
          </span>
        </div>

        {/* Location */}
        {locationParts.length > 0 && (
          <p className="flex items-center gap-2 text-offwhite/50 text-sm mb-8">
            <MapPin className="w-4 h-4 text-sunset/70 shrink-0" />
            {locationParts.join(', ')}
          </p>
        )}

        {/* ── STATS BAR ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-offwhite/10 border border-offwhite/10 mb-10">
          {listing.acreage && (
            <div className="bg-shadow px-5 py-4">
              <p className="text-offwhite/40 text-xs tracking-widest uppercase mb-1">Acreage</p>
              <p className="text-offwhite font-semibold text-lg">{listing.acreage.toLocaleString()} ac</p>
            </div>
          )}
          {formattedPrice && (
            <div className="bg-shadow px-5 py-4">
              <p className="text-offwhite/40 text-xs tracking-widest uppercase mb-1">
                {listing.status === 'sold' ? 'Sold Price' : 'Starting Bid'}
              </p>
              <p className="text-sunset font-semibold text-lg">{formattedPrice}</p>
            </div>
          )}
          {listing.property_type && (
            <div className="bg-shadow px-5 py-4">
              <p className="text-offwhite/40 text-xs tracking-widest uppercase mb-1">Type</p>
              <p className="text-offwhite font-semibold text-lg capitalize">{listing.property_type}</p>
            </div>
          )}
          {listing.auction_date && (
            <div className="bg-shadow px-5 py-4">
              <p className="text-offwhite/40 text-xs tracking-widest uppercase mb-1">Auction Date</p>
              <p className="text-offwhite font-semibold text-lg">
                {new Date(listing.auction_date).toLocaleDateString('en-US', {
                  month: 'short', day: 'numeric', year: 'numeric',
                })}
              </p>
            </div>
          )}
        </div>

        {/* ── STRUCTURAL STATS (beds/baths/sqft/year) ── */}
        {(listing.bedrooms || listing.bathrooms || listing.square_footage || listing.year_built) && (
          <div className="flex flex-wrap gap-6 mb-10 pb-10 border-b border-offwhite/10">
            {listing.bedrooms && (
              <div className="flex items-center gap-2 text-offwhite/70 text-sm">
                <BedDouble className="w-4 h-4 text-sunset/70" />
                {listing.bedrooms} Bedroom{listing.bedrooms !== 1 ? 's' : ''}
              </div>
            )}
            {listing.bathrooms && (
              <div className="flex items-center gap-2 text-offwhite/70 text-sm">
                <Bath className="w-4 h-4 text-sunset/70" />
                {listing.bathrooms} Bathroom{listing.bathrooms !== 1 ? 's' : ''}
              </div>
            )}
            {listing.square_footage && (
              <div className="flex items-center gap-2 text-offwhite/70 text-sm">
                <SquareStack className="w-4 h-4 text-sunset/70" />
                {listing.square_footage.toLocaleString()} sq ft
              </div>
            )}
            {listing.year_built && (
              <div className="flex items-center gap-2 text-offwhite/70 text-sm">
                <Home className="w-4 h-4 text-sunset/70" />
                Built {listing.year_built}
              </div>
            )}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* ── LEFT COLUMN ── */}
          <div className="lg:col-span-2 space-y-10">

            {/* Countdown */}
            {listing.auction_date && (
              <AuctionCountdown auctionDate={listing.auction_date} />
            )}

            {/* Short description */}
            {listing.short_description && (
              <p className="text-offwhite/70 text-lg leading-relaxed font-light border-l-2 border-sunset/40 pl-5">
                {listing.short_description}
              </p>
            )}

            {/* Full description */}
            {listing.description && (
              <div>
                <h2 className="font-serif text-2xl text-offwhite mb-4">About This Property</h2>
                <p className="text-offwhite/65 leading-relaxed whitespace-pre-line">
                  {listing.description}
                </p>
              </div>
            )}

            {/* Highlights */}
            {listing.highlights && (
              <div>
                <h2 className="font-serif text-2xl text-offwhite mb-4">Highlights</h2>
                <ul className="space-y-2">
                  {listing.highlights.split('\n').filter(Boolean).map((h, i) => (
                    <li key={i} className="flex items-start gap-3 text-offwhite/70 text-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-sunset mt-2 shrink-0" />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Features */}
            {listing.features && listing.features.length > 0 && (
              <div>
                <h2 className="font-serif text-2xl text-offwhite mb-4">Property Features</h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {listing.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-3 text-offwhite/70 text-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-sunset mt-2 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Gallery */}
            {galleryImages.length > 0 && (
              <div>
                <h2 className="font-serif text-2xl text-offwhite mb-4">Photos</h2>
                <PhotoGallery images={galleryImages} title={listing.title} />
              </div>
            )}

            {/* Video */}
            {listing.video_url && (
              <div>
                <h2 className="font-serif text-2xl text-offwhite mb-4 flex items-center gap-2">
                  <Video className="w-5 h-5 text-sunset" /> Property Video
                </h2>
                <div className="relative aspect-video bg-shadow/80">
                  <iframe
                    src={listing.video_url
                      .replace('watch?v=', 'embed/')
                      .replace('youtu.be/', 'youtube.com/embed/')
                      .replace('vimeo.com/', 'player.vimeo.com/video/')}
                    title="Property Video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                  />
                </div>
              </div>
            )}

          </div>

          {/* ── RIGHT SIDEBAR ── */}
          <div className="space-y-6">

            {/* Auction Details Card */}
            {hasAuction && (
              <div className="border border-offwhite/10 bg-offwhite/[0.03] p-6 space-y-5">
                <h3 className="font-serif text-xl text-offwhite flex items-center gap-2">
                  <Gavel className="w-4 h-4 text-sunset" /> Auction Details
                </h3>

                {listing.auction_method && (
                  <div>
                    <p className="text-offwhite/40 text-xs tracking-widest uppercase mb-1">Method</p>
                    <p className="text-offwhite text-sm">{auctionMethodLabels[listing.auction_method] ?? listing.auction_method}</p>
                  </div>
                )}

                {listing.auction_date && (
                  <div>
                    <p className="text-offwhite/40 text-xs tracking-widest uppercase mb-1">Auction Date</p>
                    <p className="text-offwhite text-sm flex items-center gap-2">
                      <CalendarDays className="w-4 h-4 text-sunset/60" />
                      {new Date(listing.auction_date).toLocaleDateString('en-US', {
                        weekday: 'long', month: 'long', day: 'numeric', year: 'numeric',
                      })}
                    </p>
                  </div>
                )}

                {listing.auction_end_date && (
                  <div>
                    <p className="text-offwhite/40 text-xs tracking-widest uppercase mb-1">Bidding Closes</p>
                    <p className="text-offwhite text-sm flex items-center gap-2">
                      <CalendarDays className="w-4 h-4 text-sunset/60" />
                      {new Date(listing.auction_end_date).toLocaleDateString('en-US', {
                        weekday: 'long', month: 'long', day: 'numeric', year: 'numeric',
                        hour: 'numeric', minute: '2-digit',
                      })}
                    </p>
                  </div>
                )}

                {listing.auction_location && (
                  <div>
                    <p className="text-offwhite/40 text-xs tracking-widest uppercase mb-1">Location</p>
                    <p className="text-offwhite text-sm flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-sunset/60 mt-0.5 shrink-0" />
                      {listing.auction_location}
                    </p>
                  </div>
                )}

                {listing.registration_required && (
                  <p className="text-sunset text-xs tracking-wide uppercase border border-sunset/25 bg-sunset/5 px-3 py-2">
                    Registration Required
                  </p>
                )}

                {listing.online_bidding_url && (
                  <a
                    href={listing.online_bidding_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full bg-sunset text-shadow font-semibold text-sm tracking-[0.06em] uppercase px-6 py-3 hover:bg-[#e08600] transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" /> Bid Online
                  </a>
                )}

                {listing.bidder_requirements && (
                  <div className="pt-2 border-t border-offwhite/10">
                    <p className="text-offwhite/40 text-xs tracking-widest uppercase mb-2">Bidder Requirements</p>
                    <p className="text-offwhite/60 text-xs leading-relaxed">{listing.bidder_requirements}</p>
                  </div>
                )}

                {listing.auction_terms && (
                  <div className="pt-2 border-t border-offwhite/10">
                    <p className="text-offwhite/40 text-xs tracking-widest uppercase mb-2">Terms</p>
                    <p className="text-offwhite/60 text-xs leading-relaxed">{listing.auction_terms}</p>
                  </div>
                )}
              </div>
            )}

            {/* Downloads / Links */}
            {(listing.brochure_url || listing.virtual_tour_url) && (
              <div className="border border-offwhite/10 bg-offwhite/[0.03] p-6 space-y-3">
                <h3 className="font-serif text-xl text-offwhite mb-4">Resources</h3>

                {listing.brochure_url && (
                  <a
                    href={listing.brochure_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-offwhite/70 text-sm hover:text-offwhite transition-colors border border-offwhite/10 px-4 py-3 hover:border-offwhite/25"
                  >
                    <FileText className="w-4 h-4 text-sunset/70 shrink-0" />
                    Download Brochure / PDF
                  </a>
                )}

                {listing.virtual_tour_url && (
                  <a
                    href={listing.virtual_tour_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-offwhite/70 text-sm hover:text-offwhite transition-colors border border-offwhite/10 px-4 py-3 hover:border-offwhite/25"
                  >
                    <Globe className="w-4 h-4 text-sunset/70 shrink-0" />
                    Virtual 360° Tour
                  </a>
                )}
              </div>
            )}

            {/* Supporting Documents */}
            {docs.length > 0 && (
              <div className="border border-offwhite/10 overflow-hidden">
                <div className="bg-offwhite/[0.06] border-b border-offwhite/10 px-5 py-3 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-sunset/70 shrink-0" />
                  <h3 className="font-serif text-lg text-offwhite">Supporting Documents</h3>
                </div>
                <div className="divide-y divide-offwhite/[0.07]">
                  {docs.map((doc) => (
                    <a
                      key={doc.id}
                      href={doc.file_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 px-5 py-3.5 bg-offwhite/[0.02] hover:bg-offwhite/[0.06] transition-colors group"
                    >
                      <span className="flex-1 text-offwhite/75 text-sm group-hover:text-offwhite transition-colors leading-snug">
                        {doc.label}
                      </span>
                      {doc.file_size && (
                        <span className="text-offwhite/30 text-xs shrink-0">{doc.file_size}</span>
                      )}
                      <Download className="w-4 h-4 text-sunset/50 group-hover:text-sunset shrink-0 transition-colors" />
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Contact CTA */}
            <div className="border border-sunset/20 bg-sunset/5 p-6">
              <h3 className="font-serif text-xl text-offwhite mb-2">Interested in This Property?</h3>
              <p className="text-offwhite/55 text-sm mb-5 leading-relaxed">
                Contact Craig Meier directly for more information, to schedule a showing, or to register for the auction.
              </p>
              <Link
                href={`/contact?listing=${listing.slug}`}
                className="flex items-center justify-center gap-2 w-full bg-sunset text-shadow font-semibold text-sm tracking-[0.06em] uppercase px-6 py-3 hover:bg-[#e08600] transition-colors"
              >
                Register Your Interest <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
