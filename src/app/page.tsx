import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { supabase } from '@/lib/supabase/client'
import PropertyCard from '@/components/PropertyCard'
import type { Listing, Agent } from '@/types'

async function getFeaturedListings(): Promise<Listing[]> {
  try {
    const { data } = await supabase
      .from('listings')
      .select('*, agent:agents(id,name,title,email,phone,photo_url)')
      .eq('status', 'active')
      .order('created_at', { ascending: false })
      .limit(6)
    return data || []
  } catch {
    return []
  }
}

async function getFeaturedAgents(): Promise<Agent[]> {
  try {
    const { data } = await supabase
      .from('agents')
      .select('*')
      .limit(3)
    return data || []
  } catch {
    return []
  }
}

const testimonials = [
  {
    quote:
      '"Landman found us the perfect 2,400-acre Hill Country ranch. Their knowledge of Texas land is unmatched."',
    author: 'Robert & Claire Whitfield',
    context: 'Purchased Blanco County Ranch',
  },
  {
    quote:
      '"Professional, discreet, and deeply experienced. They sold our family ranch above asking in under 30 days."',
    author: 'The Hargrove Family',
    context: 'Sold 1,800-acre Frio County Property',
  },
  {
    quote:
      '"From hunting leases to trophy properties, Landman is the only name in Texas land real estate."',
    author: 'James Dunbar',
    context: 'Investor, Multiple Texas Counties',
  },
]

const values = [
  {
    title: 'Legacy',
    description:
      'We understand that Texas land is more than real estate. It is heritage, passed from one generation to the next with pride.',
  },
  {
    title: 'Expertise',
    description:
      'Decades of combined experience navigating Texas ranch markets, water rights, mineral rights, and wildlife management.',
  },
  {
    title: 'Service',
    description:
      'From initial inquiry to closing day, our agents provide white-glove service at every step of the transaction.',
  },
]

export default async function HomePage() {
  const [listings, agents] = await Promise.all([getFeaturedListings(), getFeaturedAgents()])

  return (
    <>
      {/* ─── HERO ─── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=1800&q=80"
            alt="Texas ranch landscape"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/70 via-brand-dark/50 to-brand-dark" />
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <p className="text-brand-tan text-xs tracking-[0.4em] uppercase mb-6">
            Texas Ranch &amp; Land Brokerage
          </p>
          <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl text-brand-off-white leading-tight mb-6">
            Find Texas Ranches<br />
            <span className="text-brand-tan italic">For Sale</span>
          </h1>
          <p className="text-brand-off-white/70 text-lg sm:text-xl max-w-2xl mx-auto mb-10">
            Rooted in Texas Land. From sweeping Hill Country ranches to expansive Panhandle
            farms, we connect discerning buyers and sellers with exceptional rural properties.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/listings"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-brand-tan to-brand-tan-light text-brand-dark font-semibold text-sm tracking-wider uppercase px-8 py-4 hover:brightness-110 hover:shadow-[0_0_24px_rgba(200,146,42,0.4)] transition-all"
            >
              Search Properties
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 border border-brand-off-white/40 text-brand-off-white/80 text-sm tracking-wider uppercase px-8 py-4 hover:border-brand-tan hover:text-brand-tan transition-colors"
            >
              Speak with an Agent
            </Link>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
          <ChevronDown className="w-6 h-6 text-brand-tan/60" />
        </div>
      </section>

      {/* ─── FEATURED LISTINGS ─── */}
      <section className="py-24 px-4 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12 gap-4">
          <div>
            <p className="text-brand-tan text-xs tracking-[0.3em] uppercase mb-3">
              Available Properties
            </p>
            <h2 className="font-serif text-4xl text-brand-off-white">Featured Listings</h2>
          </div>
          <Link
            href="/listings"
            className="flex items-center gap-2 text-brand-tan text-sm tracking-wider uppercase hover:gap-3 transition-all"
          >
            View All Properties <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        {listings.length === 0 ? (
          <div className="text-center py-20 text-brand-off-white/40">
            <p className="text-lg">No listings available at this time.</p>
            <p className="text-sm mt-2">Check back soon or contact us for off-market properties.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {listings.map((listing) => (
              <PropertyCard key={listing.id} listing={listing} />
            ))}
          </div>
        )}
      </section>

      {/* ─── BRAND STORY ─── */}
      <section className="py-24 bg-brand-brown border-y border-brand-tan/10">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-brand-tan text-xs tracking-[0.3em] uppercase mb-4">Our Story</p>
            <h2 className="font-serif text-4xl lg:text-5xl text-brand-off-white leading-tight mb-6">
              Rooted in<br /><span className="text-brand-tan italic">Texas Land</span>
            </h2>
            <p className="text-brand-off-white/60 leading-relaxed mb-6">
              Landman was founded by Texas ranchers and land professionals who believed the state
              deserved a brokerage as serious about the land as the people who work it. For over
              two decades, we have matched families, investors, and operators with the ranches and
              farms that define the Texas spirit.
            </p>
            <p className="text-brand-off-white/60 leading-relaxed mb-8">
              Whether you are searching for a hunting retreat in the South Texas brush country, a
              productive farm in the Panhandle, or a legacy Hill Country ranch to pass to the
              next generation, Landman&apos;s agents bring unparalleled local knowledge and
              unwavering commitment to every transaction.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 border border-brand-tan text-brand-tan text-sm tracking-wider uppercase px-6 py-3 hover:bg-brand-tan hover:text-brand-dark transition-colors"
            >
              Learn Our Story <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {values.map((v) => (
              <div key={v.title} className="p-6 border border-brand-tan/10 hover:border-brand-tan/30 transition-colors">
                <h3 className="font-serif text-xl text-brand-tan mb-3">{v.title}</h3>
                <p className="text-brand-off-white/60 text-sm leading-relaxed">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section className="py-24 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-brand-tan text-xs tracking-[0.3em] uppercase mb-3">Client Voices</p>
          <h2 className="font-serif text-4xl text-brand-off-white">What Our Clients Say</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div key={i} className="p-8 bg-brand-brown border border-brand-tan/10 flex flex-col justify-between">
              <p className="font-serif text-brand-off-white/80 text-lg leading-relaxed italic mb-6">{t.quote}</p>
              <div className="pt-6 border-t border-brand-tan/10">
                <p className="text-brand-off-white font-medium text-sm">{t.author}</p>
                <p className="text-brand-tan/70 text-xs mt-1 tracking-wide">{t.context}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── AGENT PREVIEW ─── */}
      {agents.length > 0 && (
        <section className="py-24 bg-brand-brown border-t border-brand-tan/10">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12 gap-4">
              <div>
                <p className="text-brand-tan text-xs tracking-[0.3em] uppercase mb-3">Our People</p>
                <h2 className="font-serif text-4xl text-brand-off-white">Meet Our Agents</h2>
              </div>
              <Link href="/team" className="flex items-center gap-2 text-brand-tan text-sm tracking-wider uppercase hover:gap-3 transition-all">
                Full Team <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {agents.map((agent) => (
                <div key={agent.id} className="text-center">
                  <div className="relative w-32 h-32 mx-auto mb-5 overflow-hidden rounded-full">
                    {agent.photo_url ? (
                      <Image src={agent.photo_url} alt={agent.name} fill className="object-cover" sizes="128px" />
                    ) : (
                      <div className="w-full h-full bg-brand-dark flex items-center justify-center">
                        <span className="text-brand-tan font-serif text-3xl">{agent.name.charAt(0)}</span>
                      </div>
                    )}
                  </div>
                  <h3 className="font-serif text-xl text-brand-off-white">{agent.name}</h3>
                  {agent.title && <p className="text-brand-tan/70 text-xs tracking-widest uppercase mt-1">{agent.title}</p>}
                  {agent.email && (
                    <a href={`mailto:${agent.email}`} className="block text-brand-off-white/50 text-sm mt-3 hover:text-brand-tan transition-colors">{agent.email}</a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── CTA BANNER ─── */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1800&q=80"
            alt="Texas landscape"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-brand-dark/80" />
        </div>
        <div className="relative z-10 text-center px-4">
          <h2 className="font-serif text-4xl sm:text-5xl text-brand-off-white mb-4">Ready to Find Your Land?</h2>
          <p className="text-brand-off-white/60 text-lg max-w-xl mx-auto mb-10">
            Connect with a Landman agent today and begin your search for the perfect Texas ranch or farm property.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/listings" className="bg-gradient-to-r from-brand-tan to-brand-tan-light text-brand-dark font-semibold text-sm tracking-wider uppercase px-8 py-4 hover:brightness-110 hover:shadow-[0_0_24px_rgba(200,146,42,0.4)] transition-all">
              Browse Properties
            </Link>
            <Link href="/contact" className="border border-brand-off-white/40 text-brand-off-white/80 text-sm tracking-wider uppercase px-8 py-4 hover:border-brand-tan hover:text-brand-tan transition-colors">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
