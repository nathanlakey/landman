import { Metadata } from 'next'
import ConsultationCTA from '@/components/ConsultationCTA'
import { CheckCircle, XCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Why Auction Outperforms Traditional Listings | Landman Auctions',
  description: 'Discover why the auction method consistently outperforms traditional brokerage. Competitive bidding, controlled timelines, and broader exposure put more money in sellers\' hands.',
}

const comparisonRows = [
  {
    topic: 'Pricing',
    broker: 'Priced to attract offers — often below ceiling value',
    auction: 'Competitive bidding drives price to its natural value',
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
    broker: 'Ongoing negotiations typically do not result in the seller’s favor',
    auction: 'Sold according to your terms — no post bid surprises',
    auctionWins: true,
  },
  {
    topic: 'Buyer Pool',
    broker: 'Broker drives interest, posts on MLS, and waits for calls',
    auction: 'Strategic marketing campaign to target interested and qualified buyers',
    auctionWins: true,
  },
  {
    topic: 'Seller Control',
    broker: 'Broker drives the process; seller waits',
    auction: 'You set the date, reserve, and conditions of sale',
    auctionWins: true,
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
            Why Auction Outperforms Traditional Listings.
          </h1>
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
                    Landman Auctions
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

      {/* ── COMPETITIVE BIDDING ─────────────────────────────────────────── */}
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
          <div className="space-y-6">
            <p className="text-offwhite/70 text-base leading-relaxed">
              No one knows exactly what a property is worth. The traditional approach is to build a comparable, but that&apos;s really just an educated opinion, and real estate values can shift dramatically over time. You&apos;re setting a price based on what similar properties did in the past, not what buyers are willing to pay today.
            </p>
            <p className="text-offwhite/70 text-base leading-relaxed">
              Competitive bidding takes a different path. Instead of guessing at value up front, it lets real demand decide. When qualified buyers compete in the open, the price reflects what the market will actually bear, in real time, not an estimate.
            </p>
            <p className="text-offwhite/70 text-base leading-relaxed">
              There&apos;s also a hidden cost to naming a price: an asking price becomes a ceiling. Buyers rarely offer more than what you&apos;ve put in front of them. An auction removes that ceiling and lets your property find its true value, with nothing capping what a motivated buyer is willing to pay.
            </p>
          </div>
        </div>
      </section>

      <ConsultationCTA
        headline="A Professional, Experienced Auction Company Can Make a Big Difference"
        subtext=""
      />
    </>
  )
}
