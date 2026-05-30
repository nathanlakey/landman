import Link from 'next/link'
import { Metadata } from 'next'
import { Eye, CalendarClock, Gavel, Scale, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Buying at Auction | Landman Auctions',
  description:
    'Learn how to bid and buy real estate at auction. Transparent process, clear timelines, and a level playing field for every qualified buyer.',
}

const whyBuy = [
  {
    icon: Eye,
    title: 'Transparency',
    body: "Every bid is visible. You know exactly what you're competing against and exactly what the property sold for. There's no wondering whether a better offer was quietly accepted behind yours.",
  },
  {
    icon: CalendarClock,
    title: 'A Clear Timeline',
    body: "Auctions run on a defined schedule with a firm sale date. You know when the property sells and when you'll close, with none of the open-ended waiting that comes with traditional listings.",
  },
  {
    icon: Gavel,
    title: 'You Set Your Own Price',
    body: "You decide what the property is worth to you and bid accordingly. No anchoring to a seller's asking price, no negotiation games, just your number against the market.",
  },
  {
    icon: Scale,
    title: 'A Level Playing Field',
    body: "Every buyer plays by the same rules, on the same timeline, with the same information. The process is the same whether you're a first-time bidder or a seasoned investor.",
  },
]

const beforeYouBid = [
  {
    title: "The Buyer's Premium",
    body: "A buyer's premium is a percentage added to your winning bid to determine the final purchase price. It's standard practice at auction, and we're upfront about it for every property so you can factor it into your number before you bid. The premium and all terms are clearly stated in each property's auction details.",
  },
  {
    title: 'Do Your Homework Early',
    body: 'Auction properties move on a firm timeline, so we encourage you to complete any inspections, due diligence, and financing arrangements before the auction date. Reviewing the property and lining up your funds ahead of time means you can bid with confidence when it goes live.',
  },
  {
    title: 'Preview the Property',
    body: "We want you to know exactly what you're bidding on. Each auction includes details and previews so you can review the property thoroughly before deciding what it's worth to you.",
  },
]

export default function BuyingPage() {
  return (
    <>
      {/* ── HERO ───────────────────────────────────────────────────────── */}
      <section className="pt-40 pb-24 px-6 bg-shadow">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-sunset text-[11px] tracking-[0.3em] uppercase font-medium mb-5">
            For Buyers
          </p>
          <h1 className="font-serif text-display-xl text-offwhite mb-8">
            Buying at Auction
          </h1>
          <div className="space-y-5 text-left md:text-center">
            <p className="text-sand text-lg leading-relaxed">
              In a traditional sale, you submit an offer and hope. You don&apos;t know what anyone else offered, whether the seller is weighing a higher bid, or whether you left money on the table. You&apos;re negotiating blind.
            </p>
            <p className="text-sand text-lg leading-relaxed">
              An auction flips that. Every bid is out in the open. You see exactly what others are willing to pay and decide, in real time, what the property is worth to you. You&apos;re never guessing, and you never overpay past your own number.
            </p>
            <p className="text-sand text-lg leading-relaxed">
              This is simply another way to sell real estate, and in many ways a better one. Serious, desirable, one-of-a-kind properties come to auction because the method works. The transparency that protects the seller protects you too.
            </p>
          </div>
        </div>
      </section>

      {/* ── WHY BUY AT AUCTION ─────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-offwhite">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-clay text-[11px] tracking-[0.3em] uppercase font-medium mb-4">
              The Advantage
            </p>
            <h2 className="font-serif text-display-md text-shadow">
              Why Buy at Auction
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {whyBuy.map(({ icon: Icon, title, body }) => (
              <div
                key={title}
                className="bg-sand/20 border border-shadow/10 p-8 flex flex-col"
              >
                <Icon className="w-7 h-7 text-sunset mb-6" strokeWidth={1.5} />
                <h3 className="font-serif text-xl text-shadow mb-4 leading-snug">
                  {title}
                </h3>
                <p className="text-shadow/70 text-base leading-relaxed">
                  {body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT TO KNOW BEFORE YOU BID ────────────────────────────────── */}
      <section className="py-24 px-6 bg-earth">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-sand text-[11px] tracking-[0.3em] uppercase font-medium mb-4">
              Preparation
            </p>
            <h2 className="font-serif text-display-md text-offwhite">
              What to Know Before You Bid
            </h2>
          </div>

          <div className="space-y-8">
            {beforeYouBid.map(({ title, body }) => (
              <div key={title} className="border-l-2 border-sunset pl-7 py-2">
                <h3 className="font-serif text-xl text-offwhite mb-3">
                  {title}
                </h3>
                <p className="text-offwhite/70 text-base leading-relaxed">
                  {body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW TO PREQUALIFY ──────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-offwhite">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-clay text-[11px] tracking-[0.3em] uppercase font-medium mb-4">
            Getting Started
          </p>
          <h2 className="font-serif text-display-md text-shadow mb-8">
            How to Prequalify
          </h2>
          <div className="w-10 h-px bg-sunset mx-auto mb-8" />
          <p className="text-shadow/75 text-lg leading-relaxed">
            Before bidding, every buyer completes a guided bidder registration online. It&apos;s a straightforward process that confirms you&apos;re ready to purchase and clears you to compete on auction day. Our team is available throughout to walk you through each step and answer any questions along the way.
          </p>
        </div>
      </section>

      {/* ── WHAT HAPPENS IF YOU WIN ────────────────────────────────────── */}
      <section className="py-24 px-6 bg-shadow">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-sunset text-[11px] tracking-[0.3em] uppercase font-medium mb-4">
            Winning the Bid
          </p>
          <h2 className="font-serif text-display-md text-offwhite mb-8">
            What Happens If You Win
          </h2>
          <div className="w-10 h-px bg-sunset mx-auto mb-8" />
          <p className="text-sand text-lg leading-relaxed">
            When the bidding ends and you&apos;re the high bidder, you&apos;ll sign the purchase agreement and submit your deposit. From there, you move toward closing on the timeline set for that auction. Because the terms are defined up front, there are no surprises, you know exactly what comes next from the moment the gavel falls.
          </p>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────────────── */}
      <section className="bg-earth py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="w-10 h-px bg-sunset mx-auto mb-8" />
          <h2 className="font-serif text-display-md text-offwhite mb-10 leading-tight">
            Ready to Find Your Next Property?
          </h2>
          <Link
            href="/find-a-property"
            className="inline-flex items-center gap-2 bg-sunset text-shadow font-semibold text-sm tracking-[0.08em] uppercase px-8 py-4 hover:bg-offwhite transition-colors duration-200"
          >
            Find Upcoming Auctions
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  )
}
