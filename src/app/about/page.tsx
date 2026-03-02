import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Landman',
  description: 'Landman is Texas\' premier ranch and land brokerage. Rooted in Texas Land since 2002.',
}

const timeline = [
  { year: '2002', event: 'Landman founded in Austin, TX by rancher and broker Dale Harmon.' },
  { year: '2007', event: 'Expanded operations to South Texas, Panhandle, and East Texas regions.' },
  { year: '2012', event: 'Surpassed $500 million in total land sales across the Lone Star State.' },
  { year: '2016', event: 'Launched proprietary land evaluation and wildlife management advisory.' },
  { year: '2020', event: 'Named Top Texas Land Brokerage by Texas REALTORS® for fifth consecutive year.' },
  { year: '2026', event: 'Operating statewide with over 50 licensed agents and 1,200+ transactions closed.' },
]

const values = [
  {
    title: 'Legacy',
    icon: '⬡',
    description:
      'Texas land is not just real estate. It is heritage, habitat, and history. We approach every transaction with the reverence it deserves.',
  },
  {
    title: 'Expertise',
    icon: '⬡',
    description:
      'Our agents are experts in water rights, mineral rights, wildlife management, agricultural production, and ranch operations.',
  },
  {
    title: 'Service',
    icon: '⬡',
    description:
      'White-glove service from first call to closing day. We represent buyers and sellers with equal dedication and transparency.',
  },
  {
    title: 'Integrity',
    icon: '⬡',
    description:
      'Our reputation is built on honest counsel and fair dealing. We earn client trust through accuracy, discretion, and results.',
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[480px] flex items-end overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1567448400815-dd30a1bb17e4?w=1800&q=80"
            alt="Texas hill country"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/60 to-brand-dark/20" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 pb-16 w-full">
          <p className="text-brand-tan text-xs tracking-[0.4em] uppercase mb-4">Est. 2002</p>
          <h1 className="font-serif text-5xl sm:text-6xl text-brand-off-white">
            Landman — Rooted in<br />
            <span className="text-brand-tan italic">Texas Land</span>
          </h1>
        </div>
      </section>

      {/* Brand narrative */}
      <section className="py-24 max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-brand-tan text-xs tracking-[0.3em] uppercase mb-4">Our Story</p>
            <h2 className="font-serif text-4xl text-brand-off-white mb-6">
              Built by Texans, for Texas Land
            </h2>
            <p className="text-brand-off-white/70 leading-relaxed mb-5">
              Landman was born from a simple conviction: that the people entrusted to buy and sell
              Texas land should know it as intimately as the ranchers and farmers who work it.
              Founder Dale Harmon spent 20 years operating cattle ranches across the Hill Country
              before establishing Landman in 2002.
            </p>
            <p className="text-brand-off-white/70 leading-relaxed mb-5">
              Over two decades later, Landman has grown into Texas&apos; most respected rural
              property brokerage, with offices in Austin, San Antonio, and Lubbock. Our agents
              collectively own and operate tens of thousands of acres across the state.
            </p>
            <p className="text-brand-off-white/70 leading-relaxed mb-8">
              We specialize in ranches, farms, hunting properties, recreational land, and
              agricultural investments throughout all 254 Texas counties. No matter the size or
              region, Landman brings the same depth of knowledge, the same commitment to detail,
              and the same unwavering advocacy for our clients.
            </p>
            <Link
              href="/team"
              className="inline-flex items-center gap-2 border border-brand-tan text-brand-tan text-sm tracking-wider uppercase px-6 py-3 hover:bg-brand-tan hover:text-brand-dark transition-colors"
            >
              Meet Our Team <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { stat: '$2.4B+', label: 'In Closed Transactions' },
              { stat: '1,200+', label: 'Properties Sold' },
              { stat: '254', label: 'Texas Counties Served' },
              { stat: '50+', label: 'Licensed Agents' },
            ].map((item) => (
              <div key={item.stat} className="p-8 bg-brand-brown border border-brand-tan/10 text-center">
                <p className="font-serif text-4xl text-brand-tan mb-2">{item.stat}</p>
                <p className="text-brand-off-white/50 text-sm uppercase tracking-widest">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-brand-brown border-y border-brand-tan/10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <p className="text-brand-tan text-xs tracking-[0.3em] uppercase mb-3">What We Stand For</p>
            <h2 className="font-serif text-4xl text-brand-off-white">Our Values</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => (
              <div key={v.title} className="p-8 border border-brand-tan/10 hover:border-brand-tan/30 transition-colors text-center">
                <p className="text-brand-tan text-3xl mb-4">{v.icon}</p>
                <h3 className="font-serif text-xl text-brand-off-white mb-3">{v.title}</h3>
                <p className="text-brand-off-white/55 text-sm leading-relaxed">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 max-w-4xl mx-auto px-4">
        <div className="text-center mb-14">
          <p className="text-brand-tan text-xs tracking-[0.3em] uppercase mb-3">Milestones</p>
          <h2 className="font-serif text-4xl text-brand-off-white">Our Journey</h2>
        </div>
        <div className="relative">
          <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-px bg-brand-tan/20" />
          <div className="space-y-10">
            {timeline.map((item, i) => (
              <div
                key={item.year}
                className={`relative flex items-start gap-6 sm:gap-0 ${
                  i % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'
                }`}
              >
                {/* Dot */}
                <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 w-3 h-3 bg-brand-tan rounded-full mt-1.5" />
                {/* Content */}
                <div className={`ml-12 sm:ml-0 sm:w-1/2 ${i % 2 === 0 ? 'sm:pr-12' : 'sm:pl-12'}`}>
                  <div className="p-5 bg-brand-brown border border-brand-tan/10">
                    <p className="text-brand-tan font-serif text-xl mb-1">{item.year}</p>
                    <p className="text-brand-off-white/70 text-sm leading-relaxed">{item.event}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-brand-brown border-t border-brand-tan/10 text-center px-4">
        <h2 className="font-serif text-4xl text-brand-off-white mb-4">Ready to Work With Us?</h2>
        <p className="text-brand-off-white/55 max-w-xl mx-auto mb-8">
          Whether buying or selling Texas land, the Landman team is ready to put our expertise to work for you.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/listings" className="bg-gradient-to-r from-brand-tan to-brand-tan-light text-brand-dark font-semibold text-sm tracking-wider uppercase px-8 py-4 hover:brightness-110 hover:shadow-[0_0_24px_rgba(200,146,42,0.4)] transition-all">
            Browse Properties
          </Link>
          <Link href="/contact" className="border border-brand-off-white/30 text-brand-off-white/70 text-sm tracking-wider uppercase px-8 py-4 hover:border-brand-tan hover:text-brand-tan transition-colors">
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  )
}
