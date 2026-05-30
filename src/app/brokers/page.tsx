import Link from 'next/link'
import { Metadata } from 'next'
import {
  Handshake,
  Trophy,
  Zap,
  Briefcase,
  Megaphone,
  ArrowRight,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'For Brokers | Landman Auctions',
  description:
    'A broker participation program that keeps you in the deal. Refer a property or buyer, stay recognized, and protect your commission through closing.',
}

const whyPartner = [
  {
    icon: Handshake,
    title: 'Keep Your Commission and Your Client',
    body: "When you bring a property to Landman, you remain part of the transaction the whole way through. You're recognized as the referring partner, your relationship with your client stays intact, and your commission is protected through closing.",
  },
  {
    icon: Trophy,
    title: 'Win Listings You Might Otherwise Lose',
    body: "When a listing stalls, the relationship is at risk. Offering your seller the auction method gives you a credible, high-energy alternative to present, so instead of losing the client, you're the one who brought them the solution that worked.",
  },
  {
    icon: Zap,
    title: 'Move Stubborn Listings',
    body: "Every agent has a listing that won't budge. A focused marketing campaign and a firm auction date change the dynamic, turning hesitant prospects into committed buyers competing on a deadline. The marketing creates attention. The deadline creates urgency.",
  },
  {
    icon: Briefcase,
    title: 'Always Have a Strategy',
    body: "No matter the property type, price point, or market conditions, the auction method gives you an answer when the traditional market isn't delivering. You can walk into any listing appointment knowing you have a proven option your competitors don't.",
  },
  {
    icon: Megaphone,
    title: 'Your Brand Alongside Ours',
    body: "From the moment we launch a campaign, you're recognized as the referring partner across the marketing for the property. Your clients see that you brought them a creative, professional solution, which strengthens your reputation as the agent who gets results.",
  },
]

const steps = [
  {
    title: 'Refer Your Property',
    body: "Complete our property intake form with your listing details. We'll schedule a consultation to review the property, talk through strategy, and map out the best path to closing for your seller.",
  },
  {
    title: 'We Finalize the Agreement',
    body: 'Landman finalizes the auction agreement directly with the seller, with you recognized as the referring partner from the start.',
  },
  {
    title: 'Launch Marketing and Open Bidding',
    body: 'Our team produces professional photography, video, and custom marketing materials for the property, then launches a targeted multi-channel campaign reaching qualified buyers locally, regionally, and nationally. Bidding opens and builds toward a set auction date.',
  },
  {
    title: 'Auction Day',
    body: 'The auction closes and the winning buyer executes the sales contract and submits their deposit. A committed buyer, clear terms, and a direct path to closing.',
  },
  {
    title: 'Close and Get Paid',
    body: 'Closing is completed on the timeline set for the auction. Your referral commission is paid at closing, your client is served, and your reputation as a problem-solver is reinforced.',
  },
]

export default function BrokersPage() {
  return (
    <>
      {/* ── HERO ───────────────────────────────────────────────────────── */}
      <section className="pt-40 pb-24 px-6 bg-shadow">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-sunset text-[11px] tracking-[0.3em] uppercase font-medium mb-5">
            Broker Participation Program
          </p>
          <h1 className="font-serif text-display-xl text-offwhite mb-5">
            For Brokers
          </h1>
          <p className="font-serif text-2xl text-sand italic mb-10">
            A partnership that keeps you in the deal
          </p>
          <div className="space-y-5 text-left md:text-center">
            <p className="text-sand text-lg leading-relaxed">
              As a real estate professional, you&apos;re a fiduciary for your clients. Sometimes the traditional listing approach isn&apos;t the right fit, and the answer isn&apos;t walking away from the strategy. It&apos;s adding a better one to your toolkit.
            </p>
            <p className="text-sand text-lg leading-relaxed">
              Our Broker Participation Program is built for the brokers and agents who want to offer their clients the auction method without giving up the relationship. When you bring a listing or a buyer to Landman, you stay involved, you stay recognized, and your commission is protected from start to finish. This is a partnership, not a handoff.
            </p>
          </div>
        </div>
      </section>

      {/* ── WHY PARTNER WITH US ────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-offwhite">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-clay text-[11px] tracking-[0.3em] uppercase font-medium mb-4">
              The Value
            </p>
            <h2 className="font-serif text-display-md text-shadow">
              Why Partner With Us
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyPartner.map(({ icon: Icon, title, body }) => (
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

      {/* ── HOW IT WORKS ───────────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-earth">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-sand text-[11px] tracking-[0.3em] uppercase font-medium mb-4">
              The Process
            </p>
            <h2 className="font-serif text-display-md text-offwhite">
              How It Works
            </h2>
          </div>

          <div className="space-y-10">
            {steps.map(({ title, body }, i) => (
              <div key={title} className="flex gap-6 md:gap-8">
                <div className="shrink-0">
                  <span className="font-serif text-4xl text-sunset leading-none">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <div className="pt-1">
                  <h3 className="font-serif text-xl text-offwhite mb-3 leading-snug">
                    {title}
                  </h3>
                  <p className="text-offwhite/70 text-base leading-relaxed">
                    {body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────────────── */}
      <section className="bg-shadow py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="w-10 h-px bg-sunset mx-auto mb-8" />
          <h2 className="font-serif text-display-md text-offwhite mb-10 leading-tight">
            Ready to Bring a Property or Buyer to Auction?
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-sunset text-shadow font-semibold text-sm tracking-[0.08em] uppercase px-8 py-4 hover:bg-offwhite transition-colors duration-200"
            >
              Fill Out Our Broker Participation Form
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/find-a-property"
              className="inline-flex items-center justify-center gap-2 border border-sand/40 text-offwhite font-semibold text-sm tracking-[0.08em] uppercase px-8 py-4 hover:bg-sand/10 transition-colors duration-200"
            >
              Browse Our Auctions
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
