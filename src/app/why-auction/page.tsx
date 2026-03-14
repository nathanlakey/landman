import Link from 'next/link'
import { Metadata } from 'next'
import ConsultationCTA from '@/components/ConsultationCTA'
import { ArrowRight, CheckCircle, XCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Why Auction Your Land',
  description: 'Discover why the auction process consistently outperforms traditional brokerage when selling Texas land. Learn how competitive bidding, controlled timelines, and broader exposure put more money in sellers\' hands.',
}

const comparisonRows = [
  {
    topic: 'Pricing',
    broker: 'Priced to attract offers — often below ceiling value',
    auction: 'Competitive bidding drives price to its natural maximum',
    auctionWins: true,
  },
  {
    topic: 'Timeline',
    broker: '6–18 months average from list to close',
    auction: 'Auction date set in advance — typically closes within 60–90 days',
    auctionWins: true,
  },
  {
    topic: 'Certainty',
    broker: 'Deals fall through — financing, inspections, cold feet',
    auction: 'Bidder is pre-qualified; contract executed same day',
    auctionWins: true,
  },
  {
    topic: 'Negotiations',
    broker: 'Ongoing renegotiations drain time and value',
    auction: 'Sold as-is on your terms — no post-bid concessions',
    auctionWins: true,
  },
  {
    topic: 'Buyer Pool',
    broker: 'Whoever happens to see the MLS listing',
    auction: 'Actively marketed campaign to Craig\'s statewide buyer network',
    auctionWins: true,
  },
  {
    topic: 'Seller Control',
    broker: 'Broker drives the process; seller waits',
    auction: 'You set the date, the minimums, and the conditions',
    auctionWins: true,
  },
]

const objections = [
  {
    objection: '"Won\'t auction mean I get less for my land?"',
    answer:
      'The opposite is typically true. Competitive bidding creates urgency and rivalry between buyers — the same psychological drivers that make estate auctions consistently achieve above-estimate prices. Auction doesn\'t discount your land; it exposes it to its true market.',
  },
  {
    objection: '"What if no one shows up to bid?"',
    answer:
      'Craig\'s pre-auction marketing is robust and targeted. We don\'t open the doors and hope. Every auction includes a disciplined buyer outreach campaign — direct mail, digital marketing, Craig\'s buyer database, and bilingual Spanish-language outreach — to ensure qualified bidders are in the room.',
  },
  {
    objection: '"I\'ve heard auctions are only for distressed properties."',
    answer:
      'That\'s a dated perception. Today, auction is the preferred exit strategy for sophisticated landowners who want certainty, speed, and maximum value. From working farms to large ranch tracts to estate parcels, auction works across every land asset class.',
  },
  {
    objection: '"What does the auction process cost me?"',
    answer:
      'Auction fee structures vary by property and circumstance. Craig walks through every cost clearly in your consultation — no surprises. The goal is always that the net result to you exceeds what a traditional listing would realistically achieve.',
  },
]

export default function WhyAuctionPage() {
  return (
    <>
      {/* ── HERO ───────────────────────────────────────────────────────── */}
      <section className="pt-40 pb-24 px-6 bg-shadow">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sunset text-[11px] tracking-[0.3em] uppercase font-medium mb-5">
            The Case for Auction
          </p>
          <h1 className="font-serif text-display-xl text-offwhite mb-7">
            Why Auction Outperforms Traditional Land Sales.
          </h1>
          <p className="text-sand text-lg leading-relaxed max-w-2xl mx-auto">
            The math, the psychology, and the market all point the same direction.
            Competitive bidding was designed to find the ceiling of value —
            not negotiate down from it.
          </p>
        </div>
      </section>

      {/* ── COMPARISON TABLE ───────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-offwhite">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-clay text-[11px] tracking-[0.3em] uppercase font-medium mb-4">
              Side by Side
            </p>
            <h2 className="font-serif text-display-md text-shadow">
              Broker vs. Auction: An Honest Comparison.
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="text-left py-4 px-5 text-xs tracking-[0.15em] uppercase text-shadow/50 font-medium w-28 border-b border-sand/40">
                    Topic
                  </th>
                  <th className="text-left py-4 px-5 text-xs tracking-[0.15em] uppercase text-shadow/50 font-medium border-b border-sand/40">
                    Traditional Broker
                  </th>
                  <th className="text-left py-4 px-5 text-xs tracking-[0.15em] uppercase text-sunset font-medium border-b border-sand/40">
                    Craig Meier Auction
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map(({ topic, broker, auction, auctionWins: _auctionWins }, i) => (
                  <tr
                    key={topic}
                    className={i % 2 === 0 ? 'bg-offwhite' : 'bg-sand/15'}
                  >
                    <td className="py-5 px-5 text-xs tracking-[0.1em] uppercase text-shadow/50 font-medium align-top">
                      {topic}
                    </td>
                    <td className="py-5 px-5 text-sm text-shadow/65 leading-relaxed align-top">
                      <div className="flex items-start gap-2">
                        <XCircle className="w-4 h-4 text-clay/60 mt-0.5 flex-shrink-0" />
                        {broker}
                      </div>
                    </td>
                    <td className="py-5 px-5 text-sm text-shadow leading-relaxed align-top">
                      <div className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-sage mt-0.5 flex-shrink-0" />
                        {auction}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── SELLER PSYCHOLOGY ──────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-earth">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12">
            <p className="text-sand text-[11px] tracking-[0.3em] uppercase font-medium mb-4">
              The Mechanism
            </p>
            <h2 className="font-serif text-display-md text-offwhite mb-6">
              Why Competitive Bidding Works.
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            <div>
              <p className="text-offwhite/70 text-base leading-relaxed mb-5">
                When a buyer sees a land listing, they negotiate down from the asking price.
                Their strategy is to find the seller&apos;s floor. Negotiation rewards
                the patient buyer who can wait you out.
              </p>
              <p className="text-offwhite/70 text-base leading-relaxed">
                In an auction, buyers compete against each other — not against you.
                The competitive psychology flips entirely: buyers bid up to their
                maximum before another buyer takes the property away.
              </p>
            </div>
            <div>
              <p className="text-offwhite/70 text-base leading-relaxed mb-5">
                This isn&apos;t just theory. Auction is the standard exit mechanism for
                every high-stakes asset class: fine art, rare estates, commercial real
                estate, foreclosures. The reason is always the same — competitive
                bidding finds the ceiling.
              </p>
              <p className="text-offwhite/70 text-base leading-relaxed">
                Craig&apos;s role as a World Champion Auctioneer means he manages that
                competitive energy expertly — keeping bidding moving, building momentum,
                and ensuring your auction achieves everything it&apos;s capable of.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── OBJECTIONS ─────────────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-offwhite">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-clay text-[11px] tracking-[0.3em] uppercase font-medium mb-4">
              Common Questions
            </p>
            <h2 className="font-serif text-display-md text-shadow">
              Seller Objections — Answered Honestly.
            </h2>
          </div>

          <div className="space-y-8">
            {objections.map(({ objection, answer }) => (
              <div key={objection} className="border-l-2 border-sunset pl-7 py-2">
                <h3 className="font-serif text-xl text-shadow mb-3">{objection}</h3>
                <p className="text-shadow/65 text-base leading-relaxed">{answer}</p>
              </div>
            ))}
          </div>

          <div className="mt-14 text-center">
            <p className="text-shadow/60 text-sm mb-5">
              Still have questions? Bring them to Craig. Every consultation is a straight conversation — no sales pitch.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-earth text-offwhite font-medium text-sm tracking-[0.08em] uppercase px-7 py-4 hover:bg-sunset hover:text-shadow transition-colors duration-200"
            >
              Schedule a Consultation
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <ConsultationCTA
        headline="The right auctioneer changes the outcome."
        subtext="Craig's track record speaks for itself. Let's talk about what auction could mean for your land specifically."
      />
    </>
  )
}
