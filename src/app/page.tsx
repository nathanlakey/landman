import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, CheckCircle, TrendingUp, Users, Clock, Shield, MapPin, Building2, Home, Wrench, Briefcase, Package } from 'lucide-react'
import EvaluationForm from '@/components/EvaluationForm'
import AuctionAlertForm from '@/components/AuctionAlertForm'

// ─── Data ─────────────────────────────────────────────────────────────────────

const auctionAdvantages = [
  {
    icon: TrendingUp,
    title: 'Maximum Market Value',
    body: 'Competitive bidding drives prices up, not down. Buyers compete openly, meaning you capture the true ceiling of your land\'s worth — not a broker\'s best guess.',
  },
  {
    icon: Clock,
    title: 'Certainty & Speed',
    body: 'Set the date. Close the deal. Auctions eliminate months of showings, lowball offers, and renegotiations. You know exactly when you\'re done.',
  },
  {
    icon: Users,
    title: 'Broader Buyer Pool',
    body: 'Craig\'s bilingual reach and established network attracts qualified buyers from across Texas and beyond — buyers a local broker never reaches.',
  },
  {
    icon: Shield,
    title: 'Seller Controls the Terms',
    body: 'You set the minimum. You choose the date. You control the conditions. This is your land — the auction process keeps it that way.',
  },
]

const processSteps = [
  {
    number: '01',
    title: 'Property Evaluation',
    body: 'Craig meets with you to assess your land, understand your goals, and establish the right strategy to maximize your sale.',
  },
  {
    number: '02',
    title: 'Marketing Campaign',
    body: 'We build a targeted campaign — digital, print, and network — to put your property in front of qualified, motivated buyers.',
  },
  {
    number: '03',
    title: 'Auction Day',
    body: 'Craig runs a professional auction event — live, online, or both — generating real-time competitive bidding on your terms.',
  },
  {
    number: '04',
    title: 'Closing',
    body: 'Buyer is identified and under contract on auction day. We guide both parties to a clean, efficient close.',
  },
]

const whoWeServe = [
  { label: 'Farm & Crop Land Owners', desc: 'Multi-generational working farms ready for transition.' },
  { label: 'Estate & Inherited Property', desc: 'Complex land estates requiring a decisive, fair process.' },
  { label: 'Ranch & Pasture Owners', desc: 'Large acreage ranches needing maximum buyer exposure.' },
  { label: 'Development Tract Owners', desc: 'Raw land positioned for residential or commercial growth.' },
]

const credentials = [
  { value: '2007', label: 'World Champion Auctioneer' },
  { value: '2003', label: 'Texas State Champion Auctioneer' },
  { value: '25+', label: 'Years of Experience' },
  { value: '450+', label: 'Auctions Conducted Annually' },
]

const categories = [
  {
    icon: MapPin,
    title: 'Ranches & Farmland',
    desc: 'Working ranches, crop land, and pasture acreage across North Texas.',
  },
  {
    icon: Building2,
    title: 'Development Land',
    desc: 'Raw tracts and entitled land primed for residential or commercial growth.',
  },
  {
    icon: Home,
    title: 'Residential Property',
    desc: 'Single-family homes, rural homesteads, and hobby farms.',
  },
  {
    icon: Wrench,
    title: 'Farm Equipment & Machinery',
    desc: 'Tractors, implements, irrigation systems, and operational assets.',
  },
  {
    icon: Briefcase,
    title: 'Commercial Assets',
    desc: 'Business liquidations, commercial real estate, and industrial properties.',
  },
  {
    icon: Package,
    title: 'Estate & Liquidation Auctions',
    desc: 'Complete estate settlements handled with care, speed, and maximum return.',
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
            <h1 className="font-serif text-display-xl text-offwhite mb-7 leading-[1.05]">
              Your Land Deserves More Than a Listing.
            </h1>
            <p className="text-sand text-lg leading-relaxed mb-10 max-w-xl">
              Craig Meier is a World Champion Auctioneer with 25+ years of experience
              delivering maximum value for his clients. The auction process isn&apos;t just
              faster — it&apos;s strategically designed to put more money in your pocket.
            </p>
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
              className="inline-flex items-center gap-1.5 text-sand/70 text-sm hover:text-sand transition-colors mt-2"
            >
              Not sure? Take the quiz
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── 2. CREDIBILITY STRIP ─────────────────────────────────────────── */}
      <section className="bg-[#201E3D] py-10 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-offwhite/75 text-sm tracking-wide mb-6">
            Trusted by landowners, developers, and investors across North Texas
          </p>
          <div className="flex flex-wrap justify-center gap-x-10 gap-y-3">
            {['Farm Auctions', 'Commercial Liquidations', 'Estate Auctions', 'Development Land'].map((item) => (
              <span key={item} className="text-sunset text-[11px] tracking-[0.2em] uppercase font-semibold">
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. MORE THAN LAND ────────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-offwhite">
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
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white border border-sand/40 p-8 hover:border-sunset/40 hover:shadow-sm transition-all duration-200">
                <Icon className="w-6 h-6 text-sunset mb-4" />
                <h3 className="font-serif text-lg text-shadow mb-2">{title}</h3>
                <p className="text-shadow/60 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. FREE PROPERTY EVALUATION FORM ────────────────────────────── */}
      <section id="evaluation" className="py-24 px-6 bg-sand/20 border-t border-sand/30">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-clay text-[11px] tracking-[0.3em] uppercase font-medium mb-4">
              Free Evaluation
            </p>
            <h2 className="font-serif text-display-lg text-shadow mb-4">
              See What Your Property Could Bring at Auction.
            </h2>
            <p className="text-shadow/65 text-base">
              Get a free, no-obligation auction evaluation from Craig Meier
            </p>
          </div>
          <EvaluationForm />
        </div>
      </section>

      {/* ── 5. HOW THE AUCTION PROCESS WORKS ─────────────────────────── */}
      <section className="py-24 px-6 bg-offwhite border-t border-sand/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-clay text-[11px] tracking-[0.3em] uppercase font-medium mb-4">
              Our Process
            </p>
            <h2 className="font-serif text-display-lg text-shadow">
              How the Auction Process Works.
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map(({ number, title, body }) => (
              <div key={number} className="relative">
                <span className="font-serif text-[5rem] leading-none text-sand/40 block mb-2 select-none">
                  {number}
                </span>
                <h3 className="font-serif text-xl text-shadow mb-3">{title}</h3>
                <p className="text-shadow/65 text-sm leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              href="/our-process"
              className="inline-flex items-center gap-2 text-earth font-medium text-sm tracking-wide hover:text-sunset transition-colors"
            >
              See the full process breakdown
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── 6. ACTIVE AUCTIONS ───────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-shadow text-center">
        <div className="max-w-2xl mx-auto">
          <p className="text-sunset text-[11px] tracking-[0.3em] uppercase font-medium mb-4">
            Available Now
          </p>
          <h2 className="font-serif text-display-lg text-offwhite mb-6">
            Active Auctions.
          </h2>
          <p className="text-offwhite/60 text-base leading-relaxed mb-10">
            Browse current and upcoming land auctions across North Texas. New properties are added regularly.
          </p>
          <Link
            href="/find-a-property"
            className="inline-flex items-center justify-center gap-2 bg-sunset text-white font-semibold text-sm tracking-[0.08em] uppercase px-8 py-4 hover:bg-[#e08600] transition-colors duration-200"
          >
            Browse All Listings
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ── 7a. SELLER EDUCATION: THE PROBLEM ──────────────────────────── */}
      <section className="py-24 px-6 bg-offwhite">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-clay text-[11px] tracking-[0.3em] uppercase font-medium mb-4">
                The Problem
              </p>
              <h2 className="font-serif text-display-lg text-shadow mb-6">
                Traditional Land Sales Leave Money on the Table.
              </h2>
              <p className="text-shadow/70 text-base leading-relaxed mb-5">
                When you list land with a broker, you wait. You wait for showings. You wait for
                offers. You wait through negotiations, inspections, and renegotiations. And at
                the end of that waiting, you may still end up settling for less than what your
                land is worth.
              </p>
              <p className="text-shadow/70 text-base leading-relaxed mb-8">
                The traditional listing process was built for houses in subdivisions — not for
                the complex, unique, emotionally significant asset that is Texas land.
                Your land deserves a process built specifically for it.
              </p>
              <Link
                href="/why-auction"
                className="inline-flex items-center gap-2 text-earth font-medium text-sm tracking-wide hover:text-sunset transition-colors"
              >
                See why auction changes the equation
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="bg-earth/8 border border-sand/40 p-10">
              <h3 className="font-serif text-xl text-shadow mb-6">
                Typical broker experience vs. auction:
              </h3>
              <ul className="space-y-4">
                {[
                  'Months of uncertainty vs. a defined auction date',
                  'Price driven down by negotiation vs. price driven up by competition',
                  'Buyer contingencies & renegotiations vs. sold as-is on auction day',
                  'Limited local exposure vs. Craig\'s statewide buyer network',
                  'Passive waiting vs. active, marketed campaign',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-sage mt-0.5 flex-shrink-0" />
                    <span className="text-shadow/75 text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── 7b. SELLER EDUCATION: WHY AUCTION ──────────────────────────── */}
      <section className="py-24 px-6 bg-shadow">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sunset text-[11px] tracking-[0.3em] uppercase font-medium mb-4">
              Why Auction
            </p>
            <h2 className="font-serif text-display-lg text-offwhite">
              The Strategic Advantage of Auction.
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {auctionAdvantages.map(({ icon: Icon, title, body }) => (
              <div key={title} className="border border-offwhite/10 p-8 hover:border-sunset/30 transition-colors">
                <Icon className="w-7 h-7 text-sunset mb-5" />
                <h3 className="font-serif text-xl text-offwhite mb-3">{title}</h3>
                <p className="text-offwhite/55 text-sm leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              href="/why-auction"
              className="inline-flex items-center gap-2 text-sand text-sm tracking-wide hover:text-sunset transition-colors"
            >
              Deep dive into the auction advantage
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── WHO WE SERVE ─────────────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-earth">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-sand text-[11px] tracking-[0.3em] uppercase font-medium mb-4">
                Who We Serve
              </p>
              <h2 className="font-serif text-display-lg text-offwhite mb-6">
                Built for Landowners Ready to Maximize Value.
              </h2>
              <p className="text-offwhite/65 text-base leading-relaxed">
                Craig specializes in large-acreage land across every ownership situation —
                from multi-generational farms to inherited estate parcels to investment tracts
                ready for market.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              {whoWeServe.map(({ label, desc }) => (
                <div key={label} className="bg-offwhite/8 border border-offwhite/15 p-6">
                  <h3 className="font-serif text-lg text-offwhite mb-2">{label}</h3>
                  <p className="text-offwhite/55 text-sm leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── ABOUT CRAIG ──────────────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-offwhite">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-clay text-[11px] tracking-[0.3em] uppercase font-medium mb-4">
              About Craig
            </p>
            <h2 className="font-serif text-display-lg text-shadow">
              Championship-Proven. Results-Driven.
            </h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-sand/30 mb-16">
            {credentials.map(({ value, label }) => (
              <div key={label} className="bg-offwhite px-8 py-10 text-center">
                <p className="font-serif text-4xl text-earth mb-2">{value}</p>
                <p className="text-shadow/60 text-xs tracking-[0.1em] uppercase">{label}</p>
              </div>
            ))}
          </div>
          <div className="grid lg:grid-cols-2 gap-16 items-center">
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
              <p className="font-serif text-2xl italic text-earth mb-6 leading-relaxed">
                &ldquo;These aren&apos;t just trophies — they&apos;re a testament to the skill,
                precision, and competitive drive Craig brings to every sale.&rdquo;
              </p>
              <p className="text-shadow/70 text-base leading-relaxed mb-5">
                Craig Meier is one of Texas&apos;s most accomplished land and auction
                professionals. A born and bred Texan from Ennis, Craig claimed the Texas State
                Auctioneer Championship in 2003 — and in 2007, earned the title of World Champion
                Auctioneer and World Champion Auction Team.
              </p>
              <p className="text-shadow/70 text-base leading-relaxed mb-8">
                With over 450 auctions annually and bilingual fluency in English and Spanish,
                Craig&apos;s reach extends far beyond what any traditional broker can offer.
                As Co-Owner of America&apos;s Auction Academy, he doesn&apos;t just practice
                excellence — he teaches it.
              </p>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-earth font-medium text-sm tracking-wide hover:text-sunset transition-colors"
              >
                Read Craig&apos;s full story
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── 9. AUCTION ALERT SIGNUP ──────────────────────────────────────── */}
      <section className="py-20 px-6 bg-earth text-center">
        <div className="max-w-2xl mx-auto">
          <p className="text-sand text-[11px] tracking-[0.3em] uppercase font-medium mb-4">
            Stay in the Loop
          </p>
          <h2 className="font-serif text-display-lg text-offwhite mb-4">
            Never Miss an Auction.
          </h2>
          <p className="text-offwhite/60 text-base leading-relaxed mb-10">
            Get notified when new properties hit the auction block.
          </p>
          <AuctionAlertForm />
        </div>
      </section>

      {/* ── 10. FINAL CTA ────────────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-[#201E3D] text-center">
        <div className="max-w-2xl mx-auto">
          <p className="text-sunset text-[11px] tracking-[0.3em] uppercase font-medium mb-4">
            Get Started
          </p>
          <h2 className="font-serif text-display-lg text-offwhite mb-6">
            Ready to Sell?
          </h2>
          <p className="text-offwhite/60 text-base leading-relaxed mb-10">
            A conversation with Craig costs nothing. What it could earn you on auction day is a different story.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 bg-sunset text-white font-semibold text-sm tracking-[0.08em] uppercase px-8 py-4 hover:bg-[#e08600] transition-colors duration-200"
          >
            Schedule Consultation
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ── STICKY MOBILE CTA (fixed, mobile only) ───────────────────────── */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#201E3D] border-t border-offwhite/10 px-4 py-3 flex items-center justify-between gap-3 shadow-lg">
        <p className="text-offwhite text-sm font-medium">
          Ready to sell your land?
        </p>
        <Link
          href="#evaluation"
          className="inline-flex items-center gap-1.5 bg-sunset text-white text-xs font-semibold tracking-[0.08em] uppercase px-4 py-2.5 hover:bg-[#e08600] transition-colors whitespace-nowrap"
        >
          Get Free Evaluation
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  )
}

