import Link from 'next/link'
import Image from 'next/image'
import Script from 'next/script'
import { ArrowRight, TrendingUp, BarChart2, Ban, Clock } from 'lucide-react'

export const revalidate = 0

const AUCTIONS_URL = 'https://landmanauctions.auctioneersoftware.com/auctions'

// ─── Data ─────────────────────────────────────────────────────────────────────

const proofPoints = [
  {
    icon: TrendingUp,
    title: 'Competitive Bidding Establishes True Market Value',
    body: 'Multiple qualified buyers competing in the open is the most transparent way to reveal what a property is truly worth.',
  },
  {
    icon: Clock,
    title: 'Definitive Sale Date',
    body: 'You set the auction date up front, so there\'s no open-ended waiting, uncertainty, and negotiations. Properties sold through auction average 21 days on market, versus 90+ days for a traditional listing.',
  },
  {
    icon: BarChart2,
    title: 'Proactive Marketing Strategies',
    body: 'The right marketing strategy doesn\'t just list your property, it actively seeks out every qualified buyer and brings them together to compete.',
  },
  {
    icon: Ban,
    title: 'Transparent Market Value',
    body: 'The auction method lets open demand determine value, so the final price reflects exactly what the market says the property is worth.',
  },
]



// ─── Page ─────────────────────────────────────────────────────────────────────

export default function HomePage() {
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
              Your Property Deserves More Than a Listing.
            </h1>
            <p className="text-sunset text-xl font-light tracking-wide mb-5">
              Specialists in Real Estate Auctions
            </p>
            {/* Category capability list */}
            <div className="flex flex-wrap items-center gap-y-2 mb-10">
              {[
                'Luxury Real Estate',
                'Residential Property',
                'Commercial and Development Land',
                'Ranches & Farmland',
              ].map((label, i, arr) => (
                <span key={label} className="flex items-center">
                  <span className="text-offwhite text-sm tracking-wide">
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
              <a
                href={AUCTIONS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 border border-offwhite/40 text-offwhite text-sm tracking-[0.08em] uppercase px-8 py-4 hover:bg-offwhite/10 transition-colors duration-200"
              >
                Find Auctions
              </a>
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

      {/* ── 2. CREDIBILITY STRIP ─────────────────────────────────────────── */}
      <section className="py-5 px-6 bg-offwhite border-b border-sand/40">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-shadow/60 text-[12px] tracking-[0.15em] uppercase font-medium">
            Members of NAA and TAA
          </p>
        </div>
      </section>

      {/* ── 3. ACTIVE AUCTIONS ──────────────────────────────────────────── */}
      <section className="py-16 px-6 bg-offwhite">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <h2 className="font-serif text-display-lg text-shadow">
                Active Auctions.
              </h2>
            </div>
            <a
              href={AUCTIONS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-earth font-medium text-sm tracking-wide hover:text-sunset transition-colors shrink-0"
            >
              View All Auctions
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Auctioneer Software embed — renders auction tiles client-side */}
          <Script
            src="https://landmanauctions.auctioneersoftware.com/asset/embed.js"
            strategy="afterInteractive"
          />
          <div
            id="auctioneer-software-auctions"
            data-display="tile"
            data-count="4"
            data-status="past"
          />
        </div>
      </section>

      {/* ── 4. WHY THE AUCTION METHOD ─────────────────────────────────────── */}
      <section className="py-16 px-6 bg-[#201E3D]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-sunset text-[11px] tracking-[0.3em] uppercase font-medium mb-4">
              The Auction Advantage
            </p>
            <h2 className="font-serif text-display-lg text-offwhite">
              Why the Auction Method.
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {proofPoints.map(({ icon: Icon, title, body }) => (
              <div key={title} className="bg-offwhite border border-sand/40 p-8 hover:border-sunset/30 hover:shadow-sm transition-all duration-200">
                <Icon className="w-6 h-6 text-sunset mb-4" />
                <h3 className="font-serif text-lg text-shadow mb-3 leading-snug">{title}</h3>
                <p className="text-shadow/60 text-sm leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. OUR SPECIALTIES ───────────────────────────────────────────────── */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-clay text-[11px] tracking-[0.3em] uppercase font-medium mb-4">
              What We Auction
            </p>
            <h2 className="font-serif text-display-lg text-shadow mb-4">
              Our Specialties.
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-6 mb-10">
            <div className="bg-offwhite border border-sand/40 p-8 hover:border-sunset/30 hover:shadow-md transition-all duration-200">
              <h3 className="font-serif text-xl text-shadow mb-3">Luxury Real Estate</h3>
              <p className="text-shadow/65 text-sm leading-relaxed">It takes a special buyer to purchase a one-of-a-kind property. Our specialized marketing strategy and Broker Participation Program reach far beyond the local market to connect your property with the qualified buyers who recognize its true worth.</p>
            </div>
            <div className="bg-offwhite border border-sand/40 p-8 hover:border-sunset/30 hover:shadow-md transition-all duration-200">
              <h3 className="font-serif text-xl text-shadow mb-3">Residential Property</h3>
              <p className="text-shadow/65 text-sm leading-relaxed">Single-family homes and rural homesteads find their real value in an open, competitive market. Our auction method and Broker Participation Program bring motivated buyers together so the property sells for exactly what the market says it&apos;s worth.</p>
            </div>
            <div className="bg-offwhite border border-sand/40 p-8 hover:border-sunset/30 hover:shadow-md transition-all duration-200">
              <h3 className="font-serif text-xl text-shadow mb-3">Ranches and Farmland</h3>
              <p className="text-shadow/65 text-sm leading-relaxed">Working ranches and farmland are in high demand. We sell as a whole when that&apos;s the right call, but our multi-par auctions let us offer your property in smaller tracts, giving more buyers a real opportunity and letting the market establish honest value.</p>
            </div>
            <div className="bg-offwhite border border-sand/40 p-8 hover:border-sunset/30 hover:shadow-md transition-all duration-200">
              <h3 className="font-serif text-xl text-shadow mb-3">Commercial and Development Land</h3>
              <p className="text-shadow/65 text-sm leading-relaxed">Investors and developers know opportunity when they see it. Our specialized marketing strategy puts your property in front of the right players, and multi-par auctions create a transparent process where the asset settles at its genuine market value.</p>
            </div>
          </div>
          <div className="text-center">
            <Link
              href="/brokers"
              className="inline-flex items-center justify-center gap-2 border border-[#201E3D] text-[#201E3D] font-semibold text-sm tracking-[0.08em] uppercase px-8 py-4 hover:bg-[#201E3D] hover:text-white transition-colors duration-200"
            >
              Ask About Broker Participation
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── 6. HOW THE AUCTION PROCESS WORKS ────────────────────────────── */}
      <section className="py-16 px-6 bg-offwhite">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-clay text-[11px] tracking-[0.3em] uppercase font-medium mb-4">
              The Process
            </p>
            <h2 className="font-serif text-display-lg text-shadow">
              How the Auction Process Works.
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: '01',
                title: 'Property Evaluation',
                body: 'We review the property and determine the right auction strategy to maximize your outcome.',
              },
              {
                step: '02',
                title: 'Marketing Campaign',
                body: 'We create a marketing strategy targeting qualified buyers to compete for your asset.',
              },
              {
                step: '03',
                title: 'Auction Day',
                body: 'We bring buyers together to set true market value through open, competitive bidding, in person, online, or hybrid.',
              },
              {
                step: '04',
                title: 'Closing',
                body: 'We manage contracts and guide you through every step of the closing process.',
              },
            ].map(({ step, title, body }) => (
              <div key={step} className="bg-white border border-sand/40 p-8 hover:border-sunset/30 hover:shadow-sm transition-all duration-200">
                <p className="font-serif text-5xl text-sunset/25 mb-5 leading-none">{step}</p>
                <h3 className="font-serif text-lg text-shadow mb-3">{title}</h3>
                <p className="text-shadow/60 text-sm leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. FINAL CTA ─────────────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-[#201E3D] text-center">
        <div className="max-w-2xl mx-auto">
          <p className="text-sunset text-[11px] tracking-[0.3em] uppercase font-medium mb-4">
            Get Started
          </p>
          <h2 className="font-serif text-display-lg text-offwhite mb-5">
            Ready to Sell Your Property?
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
