import Image from 'next/image'
import Link from 'next/link'
import { Metadata } from 'next'
import ConsultationCTA from '@/components/ConsultationCTA'
import { ArrowRight, Award, Globe, BookOpen } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About Craig Meier | North Texas Land Auctions',
  description: 'Craig Meier is a World Champion Auctioneer and North Texas land auction specialist with 25+ years of experience. When land needs to sell, Craig delivers results.',
}

const credentials = [
  {
    icon: Award,
    title: 'World Champion Auctioneer — 2007',
    body: 'Craig earned the most prestigious title in the auction profession, competing against the world\'s best at the International Auctioneers Championship. He also earned World Champion Auction Team the same year — a rare double.',
  },
  {
    icon: Award,
    title: 'Texas State Champion Auctioneer — 2003',
    body: 'Before his world title, Craig claimed the Texas State Auctioneer Championship, establishing himself as the top calling talent in one of the country\'s most competitive auction markets.',
  },
  {
    icon: BookOpen,
    title: 'Co-Owner, America\'s Auction Academy',
    body: 'Craig co-owns one of the most respected auction training institutions in the nation. He doesn\'t just practice excellence in the auction industry — he teaches it to the next generation of professionals.',
  },
  {
    icon: Globe,
    title: 'Bilingual — English & Spanish',
    body: 'Craig\'s bilingual fluency gives his clients a distinct competitive advantage. Spanish-language buyer outreach expands the qualified bidder pool across Texas and into international markets.',
  },
]

const stats = [
  { value: '25+', label: 'Years Experience' },
  { value: '450+', label: 'Auctions Per Year' },
  { value: '2007', label: 'World Champion' },
  { value: '2003', label: 'Texas State Champion' },
]

export default function AboutPage() {
  return (
    <>
      {/* ── HERO ───────────────────────────────────────────────────────── */}
      <section className="pt-40 pb-24 px-6 bg-shadow">
        <div className="max-w-4xl mx-auto">
          <p className="text-sunset text-[11px] tracking-[0.3em] uppercase font-medium mb-5">
            About Craig Meier
          </p>
          <h1 className="font-serif text-display-xl text-offwhite mb-7 max-w-3xl">
            When the Land Matters, the Auctioneer Matters.
          </h1>
          <p className="text-sand text-lg leading-relaxed max-w-2xl">
            Craig Meier is North Texas&apos;s leading land auction specialist — and one of the
            most decorated auctioneers in the world. His credentials are unmatched.
            His commitment to his clients is unconditional.
          </p>
        </div>
      </section>

      {/* ── STATS BAR ──────────────────────────────────────────────────── */}
      <section className="bg-earth">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-offwhite/10">
            {stats.map(({ value, label }) => (
              <div key={label} className="bg-earth px-8 py-10 text-center">
                <p className="font-serif text-4xl text-offwhite mb-2">{value}</p>
                <p className="text-sand text-xs tracking-[0.12em] uppercase font-medium">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BIO ────────────────────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-offwhite">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Photo */}
            <div className="sticky top-28">
              <div className="relative aspect-[3/4] overflow-hidden bg-sand/20">
                {/* Replace src with real photo when available */}
                {/* Intent: confident, warm portrait — natural light, open land backdrop */}
                <Image
                  src="https://placehold.co/900x1200/4B3A2A/F6F3EC?text=Craig+Meier"
                  alt="Craig Meier — World Champion Auctioneer and Texas land specialist"
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
              <div className="mt-5 flex items-center gap-3">
                <div className="w-6 h-px bg-sunset" />
                <p className="text-clay text-xs tracking-[0.15em] uppercase font-medium">
                  Ennis, TX — Ellis County
                </p>
              </div>
            </div>

            {/* Bio text */}
            <div>
              <h2 className="font-serif text-display-md text-shadow mb-8">
                Craig Meier.
              </h2>

              <div className="space-y-5 text-shadow/70 text-base leading-relaxed">
                <p>
                  Craig Meier is North Texas&apos;s most accomplished land auction specialist,
                  bringing over 25 years of experience to farm, ranch, and development land
                  transactions across the region. A born and bred Texan from Ennis, Craig has
                  built a reputation on results, integrity, and an unmatched command of the
                  auction floor.
                </p>
                <p>
                  In 2003, Craig claimed the Texas State Auctioneer Championship — and in 2007,
                  he took his talents to the world stage, earning the title of World Champion
                  Auctioneer and World Champion Auction Team. These aren&apos;t just trophies —
                  they&apos;re a testament to the skill, precision, and competitive drive Craig
                  brings to every sale.
                </p>
                <p>
                  With over 450 land auctions and asset sales conducted annually — spanning
                  farm and ranch, development tracts, residential, and commercial property —
                  Craig has facilitated more transactions across more asset classes than nearly
                  any land auctioneer in Texas. His reach extends far beyond what any
                  traditional broker can offer.
                </p>
                <p>
                  As Co-Owner of America&apos;s Auction Academy — one of the most respected
                  auction training institutions in the nation — Craig doesn&apos;t just practice
                  excellence. He teaches it.
                </p>

                <blockquote className="border-l-2 border-sunset pl-6 py-2 my-8">
                  <p className="font-serif text-xl italic text-earth leading-relaxed">
                    &ldquo;At Landman, Craig combines his championship pedigree, deep roots in
                    Texas land, and unparalleled auction expertise to deliver outcomes that
                    traditional real estate simply can&apos;t match.&rdquo;
                  </p>
                </blockquote>

                <p>
                  Craig&apos;s roots run deep in Ellis County. He understands Texas land the way
                  only a native can — the seasonal rhythms, the mineral rights conversations,
                  the generational weight of a family farm decision. He treats every property
                  with the respect it deserves.
                </p>
              </div>

              <div className="mt-10">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-earth text-offwhite font-medium text-sm tracking-[0.08em] uppercase px-7 py-4 hover:bg-sunset hover:text-shadow transition-colors duration-200"
                >
                  Schedule a Consultation with Craig
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CREDENTIALS ────────────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-shadow">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-sunset text-[11px] tracking-[0.3em] uppercase font-medium mb-4">
              Credentials & Background
            </p>
            <h2 className="font-serif text-display-md text-offwhite">
              A Record Built Over Decades.
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-8">
            {credentials.map(({ icon: Icon, title, body }) => (
              <div key={title} className="border border-offwhite/10 p-8 hover:border-sunset/25 transition-colors">
                <Icon className="w-6 h-6 text-sunset mb-5" />
                <h3 className="font-serif text-xl text-offwhite mb-3">{title}</h3>
                <p className="text-offwhite/55 text-sm leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ACADEMY NOTE ───────────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-offwhite border-b border-sand/40">
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-10 h-px bg-sunset mx-auto mb-8" />
          <h2 className="font-serif text-display-md text-shadow mb-5">
            America&apos;s Auction Academy
          </h2>
          <p className="text-shadow/65 text-base leading-relaxed max-w-2xl mx-auto mb-6">
            As co-owner of one of the nation&apos;s most respected auction training institutions,
            Craig&apos;s standards aren&apos;t just applied to his own practice — they&apos;re
            codified and taught to the next generation of professional auctioneers.
          </p>
          <p className="text-shadow/65 text-base leading-relaxed max-w-2xl mx-auto">
            When Craig calls an auction, you&apos;re benefiting from a lifetime spent at the
            intersection of professional development, competitive excellence, and practical
            Texas land experience.
          </p>
        </div>
      </section>

      <ConsultationCTA
        headline="Talk directly with Craig."
        subtext="No intake team, no junior associate. When you reach out, you're talking to Craig. That's how he operates."
      />
    </>
  )
}

