import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, TrendingUp, Users, Clock, MapPin, Building2, Home, Wrench, Briefcase, Package } from 'lucide-react'
import { supabaseAdmin } from '@/lib/supabase/server'
import AuctionAlertForm from '@/components/AuctionAlertForm'
import type { Listing } from '@/types'

// ─── Data ─────────────────────────────────────────────────────────────────────

const credentials = [
  { value: '2007', label: 'World Champion Auctioneer' },
  { value: '2003', label: 'Texas State Champion Auctioneer' },
  { value: '25+', label: 'Years of Experience' },
  { value: '450+', label: 'Auctions Annually' },
]

const sellerBenefits = [
  {
    icon: TrendingUp,
    title: 'Competitive Bidding',
    body: 'Multiple buyers compete openly, driving prices up — not down. Auction finds the true ceiling of your land\'s value.',
  },
  {
    icon: Clock,
    title: 'Defined Sale Date',
    body: 'No months of waiting. Set the auction date, run the campaign, close the deal. Certainty from day one.',
  },
  {
    icon: Users,
    title: 'Qualified Buyers',
    body: 'Craig\'s statewide network puts your land in front of serious, motivated buyers — not casual browsers.',
  },
]



// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function HomePage() {
  // Featured listings — top 3 active
  let featuredListings: Listing[] = []
  try {
    const { data } = await supabaseAdmin
      .from('listings')
      .select('*')
      .eq('status', 'active')
      .order('auction_date', { ascending: true })
      .limit(3)
    featuredListings = (data as Listing[]) ?? []
  } catch {
    featuredListings = []
  }

  return (
    <div className="pb-20 md:pb-0">

      {/* ── 1. HERO ──────────────────────────────────────────────────────── */}
      <section className="relative h-screen flex items-center overflow-hidden">
        <Image
          src="/images/ranchphoto.jpg"
          alt="Texas ranch land — wide open acreage with warm horizon light"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-[#201E3D]/65" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-28 pb-20">
          <div className="max-w-3xl">
            <p className="text-sunset text-[11px] tracking-[0.3em] uppercase font-medium mb-6">
              Land Auction Specialist
            </p>
            <h1 className="font-serif text-display-xl text-offwhite mb-5 leading-[1.05]">
              Your Land Deserves More Than a Listing.
            </h1>
            <p className="text-sunset text-xl font-light tracking-wide mb-5">
              Specialists in Land Auctions and High-Value Assets
            </p>
            {/* Category capability list */}
            <div className="flex flex-wrap items-center gap-y-2 mb-10">
              {[
                { label: 'Ranches & Farmland', primary: true },
                { label: 'Development Land', primary: true },
                { label: 'Residential Property', primary: false },
                { label: 'Farm Equipment & Machinery', primary: false },
                { label: 'Commercial Assets', primary: false },
                { label: 'Estate & Liquidation Auctions', primary: false },
              ].map(({ label, primary }, i, arr) => (
                <span key={label} className="flex items-center">
                  <span className={primary ? 'text-offwhite text-sm font-semibold tracking-wide' : 'text-sand/55 text-sm'}>
                    {label}
                  </span>
                  {i < arr.length - 1 && (
                    <span className="mx-3 text-offwhite/20 select-none">&middot;</span>
                  )}
                </span>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/sell"
                className="inline-flex items-center justify-center gap-2 bg-sunset text-white font-semibold text-sm tracking-[0.08em] uppercase px-8 py-4 hover:bg-[#e08600] transition-colors duration-200"
              >
                Sell Your Property
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/find-a-property"
                className="inline-flex items-center justify-center gap-2 border border-offwhite/40 text-offwhite text-sm tracking-[0.08em] uppercase px-8 py-4 hover:bg-offwhite/10 transition-colors duration-200"
              >
                Find Auctions
              </Link>
            </div>
            <Link
              href="/quiz"
              className="inline-flex items-center gap-1.5 text-sand/70 text-sm hover:text-sand transition-colors mt-4"
            >
              Not sure? Take the quiz
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── 2. PATH SELECTOR ─────────────────────────────────────────────── */}
      <section className="py-16 px-6 bg-offwhite">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">
          {/* Seller card */}
          <div className="bg-shadow p-10 flex flex-col">
            <p className="text-sunset text-[11px] tracking-[0.3em] uppercase font-semibold mb-4">
              For Sellers
            </p>
            <h2 className="font-serif text-3xl text-offwhite mb-4 leading-tight">
              Sell Your Property
            </h2>
            <p className="text-offwhite/65 text-sm leading-relaxed mb-8 flex-1">
              Craig Meier helps landowners, farmers, and estate owners maximize value through competitive auction — not months of negotiations and lowball offers.
            </p>
            <Link
              href="/sell"
              className="inline-flex items-center gap-2 bg-sunset text-white font-semibold text-sm tracking-[0.08em] uppercase px-7 py-4 hover:bg-[#e08600] transition-colors duration-200 self-start"
            >
              Get My Free Evaluation
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          {/* Buyer card */}
          <div className="bg-white border border-sand/40 p-10 flex flex-col">
            <p className="text-clay text-[11px] tracking-[0.3em] uppercase font-semibold mb-4">
              For Buyers
            </p>
            <h2 className="font-serif text-3xl text-shadow mb-4 leading-tight">
              Find Auctions
            </h2>
            <p className="text-shadow/65 text-sm leading-relaxed mb-8 flex-1">
              Browse active and upcoming land auctions across North Texas. Farm, ranch, development land, and high-value assets — all through a transparent competitive bidding process.
            </p>
            <Link
              href="/find-a-property"
              className="inline-flex items-center gap-2 border border-shadow text-shadow font-semibold text-sm tracking-[0.08em] uppercase px-7 py-4 hover:bg-shadow hover:text-offwhite transition-colors duration-200 self-start"
            >
              Browse Active Listings
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── 3. CREDIBILITY STRIP ─────────────────────────────────────────── */}
      <section className="bg-[#201E3D] py-12 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-offwhite/10">
            {credentials.map(({ value, label }) => (
              <div key={label} className="bg-[#201E3D] px-8 py-8 text-center">
                <p className="font-serif text-4xl text-sunset mb-1">{value}</p>
                <p className="text-offwhite/55 text-xs tracking-[0.12em] uppercase leading-snug">{label}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-offwhite/35 text-xs tracking-[0.15em] uppercase mt-6">
            North Texas Land Auction Specialist &middot; Ellis County &amp; Beyond
          </p>
        </div>
      </section>

      {/* ── 4. FEATURED AUCTIONS ─────────────────────────────────────────── */}
      <section className="py-16 px-6 bg-offwhite">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <p className="text-clay text-[11px] tracking-[0.3em] uppercase font-medium mb-3">
                Available Now
              </p>
              <h2 className="font-serif text-display-lg text-shadow">
                Active Land Auctions.
              </h2>
            </div>
            <Link
              href="/find-a-property"
              className="inline-flex items-center gap-2 text-earth font-medium text-sm tracking-wide hover:text-sunset transition-colors shrink-0"
            >
              View All Auctions
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          {featuredListings.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredListings.map((listing) => (
                <Link
                  key={listing.id}
                  href={`/listings/${listing.slug}`}
                  className="group bg-white border border-sand/40 overflow-hidden hover:border-sunset/40 hover:shadow-md transition-all duration-200"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-sand/20">
                    {listing.images?.[0] ? (
                      <Image
                        src={listing.images[0]}
                        alt={listing.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <MapPin className="w-8 h-8 text-sand/50" />
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="font-serif text-lg text-shadow mb-3 leading-snug group-hover:text-earth transition-colors">
                      {listing.title}
                    </h3>
                    <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-shadow/55 text-xs">
                      {listing.location_county && (
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />{listing.location_county} County
                        </span>
                      )}
                      {listing.acreage && (
                        <span>{listing.acreage.toLocaleString()} acres</span>
                      )}
                      {listing.auction_date && (
                        <span className="text-sunset font-medium">
                          Auction: {new Date(listing.auction_date + 'T12:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                      )}
                    </div>
                    {listing.price && (
                      <p className="text-earth text-sm font-semibold mt-3">
                        {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(listing.price)}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 border border-sand/30">
              <p className="text-shadow/50 text-base mb-6">New properties coming soon.</p>
              <Link
                href="/find-a-property"
                className="inline-flex items-center justify-center gap-2 bg-sunset text-white font-semibold text-sm tracking-[0.08em] uppercase px-8 py-4 hover:bg-[#e08600] transition-colors duration-200"
              >
                View All Auctions
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* ── 5. AUCTION ALERTS ───────────────────────────────────────────── */}
      <section className="py-16 px-6 bg-earth">
        <div className="max-w-xl mx-auto text-center">
          <p className="text-sand text-[11px] tracking-[0.3em] uppercase font-semibold mb-4">
            Auction Alerts
          </p>
          <h2 className="font-serif text-display-lg text-offwhite mb-4">
            Never Miss an Auction.
          </h2>
          <p className="text-offwhite/60 text-base leading-relaxed mb-10">
            Get notified when new ranch, farm, and land auctions are announced
            across North Texas.
          </p>
          <AuctionAlertForm />
          <p className="text-offwhite/30 text-xs mt-4 tracking-wide">
            No spam. Only auction announcements.
          </p>
        </div>
      </section>

      {/* ── 6. MORE THAN LAND ────────────────────────────────────────────── */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-clay text-[11px] tracking-[0.3em] uppercase font-medium mb-4">
              What We Auction
            </p>
            <h2 className="font-serif text-display-lg text-shadow mb-4">
              More Than Land.
            </h2>
            <p className="text-shadow/60 text-base max-w-xl mx-auto">
              Specialists in Land Auctions and High-Value Assets
            </p>
          </div>
          {/* Core specialty */}
          <p className="text-sunset text-[11px] tracking-[0.2em] uppercase font-semibold mb-4">Our Core Specialty</p>
          <div className="grid sm:grid-cols-2 gap-6 mb-10">
            <div className="bg-offwhite border-2 border-sunset/30 p-8 hover:border-sunset/60 hover:shadow-md transition-all duration-200">
              <MapPin className="w-6 h-6 text-sunset mb-4" />
              <h3 className="font-serif text-xl text-shadow mb-2">Ranches &amp; Farmland</h3>
              <p className="text-shadow/65 text-sm leading-relaxed">Working ranches, crop land, and pasture acreage across North Texas. Land auctions are what we do best — and what we&apos;ve built our reputation on.</p>
            </div>
            <div className="bg-offwhite border-2 border-sunset/30 p-8 hover:border-sunset/60 hover:shadow-md transition-all duration-200">
              <Building2 className="w-6 h-6 text-sunset mb-4" />
              <h3 className="font-serif text-xl text-shadow mb-2">Development Land</h3>
              <p className="text-shadow/65 text-sm leading-relaxed">Raw tracts and entitled land primed for residential or commercial growth. Competitive bidding finds the true ceiling for high-potential acreage.</p>
            </div>
          </div>
          {/* Adjacent asset classes */}
          <p className="text-shadow/40 text-[11px] tracking-[0.2em] uppercase font-semibold mb-4">Adjacent Asset Classes</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: Home, title: 'Residential Property', desc: 'Single-family homes, rural homesteads, and hobby farms.' },
              { icon: Wrench, title: 'Farm Equipment & Machinery', desc: 'Tractors, implements, irrigation systems, and operational assets.' },
              { icon: Briefcase, title: 'Commercial Assets', desc: 'Business liquidations, commercial real estate, and industrial properties.' },
              { icon: Package, title: 'Estate & Liquidation Auctions', desc: 'Complete estate settlements handled with care, speed, and maximum return.' },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-offwhite border border-sand/40 p-6 hover:border-shadow/20 transition-all duration-200">
                <Icon className="w-5 h-5 text-shadow/40 mb-3" />
                <h3 className="font-serif text-base text-shadow mb-2">{title}</h3>
                <p className="text-shadow/55 text-xs leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. SELLER VALUE ──────────────────────────────────────────────── */}
      <section className="py-16 px-6 bg-shadow">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-sunset text-[11px] tracking-[0.3em] uppercase font-medium mb-4">
              Why Auction
            </p>
            <h2 className="font-serif text-display-lg text-offwhite">
              Three Reasons Sellers Choose Auction.
            </h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-6 mb-10">
            {sellerBenefits.map(({ icon: Icon, title, body }) => (
              <div key={title} className="border border-offwhite/10 p-8 hover:border-sunset/30 transition-colors">
                <Icon className="w-7 h-7 text-sunset mb-5" />
                <h3 className="font-serif text-xl text-offwhite mb-3">{title}</h3>
                <p className="text-offwhite/55 text-sm leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link
              href="/sell"
              className="inline-flex items-center justify-center gap-2 bg-sunset text-white font-semibold text-sm tracking-[0.08em] uppercase px-8 py-4 hover:bg-[#e08600] transition-colors duration-200"
            >
              Learn About Selling
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── 8. ABOUT CRAIG ───────────────────────────────────────────────── */}
      <section className="py-16 px-6 bg-offwhite">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-[4/5] overflow-hidden bg-sand/20">
              <Image
                src="https://placehold.co/800x1000/4B3A2A/F6F3EC?text=Craig+Meier"
                alt="Craig Meier — World Champion Auctioneer"
                fill
                className="object-cover"
                unoptimized
              />
            </div>
            <div>
              <p className="text-clay text-[11px] tracking-[0.3em] uppercase font-medium mb-4">
                About Craig
              </p>
              <h2 className="font-serif text-display-lg text-shadow mb-6">
                World Champion Auctioneer.
              </h2>
              <div className="grid grid-cols-2 gap-px bg-sand/30 mb-8">
                {credentials.map(({ value, label }) => (
                  <div key={label} className="bg-offwhite px-5 py-5 text-center">
                    <p className="font-serif text-3xl text-earth mb-1">{value}</p>
                    <p className="text-shadow/55 text-[10px] tracking-[0.1em] uppercase leading-snug">{label}</p>
                  </div>
                ))}
              </div>
              <p className="text-shadow/70 text-sm leading-relaxed mb-6">
                Born and bred Texan from Ennis — Texas State Champion (2003), World Champion
                Auctioneer (2007). With 25+ years and 450+ auctions annually, Craig brings
                unmatched expertise to every land transaction in North Texas.
              </p>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-earth font-medium text-sm tracking-wide hover:text-sunset transition-colors"
              >
                Read Craig&apos;s Full Story
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── 9. FINAL CTA ─────────────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-[#201E3D] text-center">
        <div className="max-w-2xl mx-auto">
          <p className="text-sunset text-[11px] tracking-[0.3em] uppercase font-medium mb-4">
            Get Started
          </p>
          <h2 className="font-serif text-display-lg text-offwhite mb-5">
            Ready to Sell Your Land?
          </h2>
          <p className="text-offwhite/60 text-base leading-relaxed mb-10">
            A conversation with Craig costs nothing. What it could earn you on auction day is a different story.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-sunset text-white font-semibold text-sm tracking-[0.08em] uppercase px-8 py-4 hover:bg-[#e08600] transition-colors duration-200"
            >
              Schedule Consultation
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/sell"
              className="inline-flex items-center justify-center gap-2 border border-offwhite/40 text-offwhite text-sm tracking-[0.08em] uppercase px-8 py-4 hover:bg-offwhite/10 transition-colors duration-200"
            >
              Sell Your Property
            </Link>
          </div>
        </div>
      </section>

      {/* ── STICKY MOBILE CTA (fixed, mobile only) ───────────────────────── */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#201E3D] border-t border-offwhite/10 px-4 py-3 flex items-center justify-between gap-3 shadow-lg">
        <p className="text-offwhite text-sm font-medium">
          Ready to sell your land?
        </p>
        <Link
          href="/sell#evaluation"
          className="inline-flex items-center gap-1.5 bg-sunset text-white text-xs font-semibold tracking-[0.08em] uppercase px-4 py-2.5 hover:bg-[#e08600] transition-colors whitespace-nowrap"
        >
          See What Your Property Could Bring
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  )
}
