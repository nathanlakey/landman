import Link from 'next/link'
import { Metadata } from 'next'
import ConsultationCTA from '@/components/ConsultationCTA'
import { ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Our Land Auction Process | North Texas Land Auctions',
  description: 'Craig Meier\'s 4-step land auction process — from first consultation to closing day. Understand exactly what to expect when selling your land, farm, or ranch at auction.',
}

const steps = [
  {
    number: '01',
    title: 'Consultation & Property Assessment',
    duration: 'Week 1',
    description:
      'Craig meets with you — in person whenever possible — to understand your land, your goals, and your situation. We discuss the property\'s characteristics, market context, realistic value expectations, and your timeline. There\'s no obligation at this stage, and no pressure. Just a clear-eyed conversation.',
    details: [
      'Property walkthrough and assessment',
      'Review of any existing surveys, legal descriptions, or mineral rights',
      'Discussion of your goals: price expectations, timeline, terms',
      'Initial auction strategy recommendation',
      'Clear explanation of all costs and fee structures',
    ],
  },
  {
    number: '02',
    title: 'Strategy, Marketing & Preparation',
    duration: 'Weeks 2–6',
    description:
      'Once you decide to move forward, we build the campaign. This is where Craig\'s reach separates him from anyone else in the market. We develop targeted marketing to reach qualified land buyers across digital platforms, direct mail, and Craig\'s established statewide buyer database.',
    details: [
      'Professional photography and aerial imagery (drone)',
      'Detailed property description and legal package preparation',
      'Targeted digital and print advertising campaign',
      'Direct buyer outreach via Craig\'s statewide network',
      'Property information package distributed to all registered bidders',
      'On-site signage and public notice (as required)',
    ],
  },
  {
    number: '03',
    title: 'Auction Day',
    duration: 'Day of Event',
    description:
      'Craig runs the auction — live on-site, online, or a simultaneous combination. This is what 25+ years of championship-level auction craft looks like in practice: building momentum, managing competitive energy, and driving the bidding to its natural ceiling. The result is a contract executed on the same day.',
    details: [
      'Pre-event registration and credential verification for all bidders',
      'Live auctioneer-led bidding — Craig calls the auction personally',
      'Simultaneous online bidding available for remote buyers',
      'Immediate execution of purchase contract upon hammer drop',
      'Required earnest money collected same day',
      'Clear, transparent terms — no post-auction surprises',
    ],
  },
  {
    number: '04',
    title: 'Closing',
    duration: 'Within 30–45 Days',
    description:
      'Auction contracts are designed to close quickly and cleanly. The buyer is committed from hammer drop — no inspection contingencies, no financing renegotiations. We coordinate with title companies and attorneys to guide the transaction to a smooth, efficient close.',
    details: [
      'Title company coordination and escrow setup',
      'Closing timeline typically 30–45 days post-auction',
      'No buyer inspection contingencies — sold as-is',
      'Craig and team available to answer any post-auction questions',
      'Final proceeds distributed at closing',
    ],
  },
]

const timeline = [
  { phase: 'Consultation', time: 'Week 1', note: 'No obligation' },
  { phase: 'Prep & Marketing', time: 'Weeks 2–6', note: 'Active campaign' },
  { phase: 'Auction Day', time: 'Week 6–8', note: 'Contract executed' },
  { phase: 'Closing', time: 'Week 10–12', note: 'Funds distributed' },
]

export default function OurProcessPage() {
  return (
    <>
      {/* ── HERO ───────────────────────────────────────────────────────── */}
      <section className="pt-40 pb-24 px-6 bg-shadow">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sunset text-[11px] tracking-[0.3em] uppercase font-medium mb-5">
            How It Works
          </p>
          <h1 className="font-serif text-display-xl text-offwhite mb-7">
            Four Steps. Complete Clarity.
          </h1>
          <p className="text-sand text-lg leading-relaxed max-w-2xl mx-auto">
            Craig&apos;s land auction process is built to keep you informed and in control
            at every stage — from first conversation through final closing.
            No surprises. No waiting in the dark.
          </p>
        </div>
      </section>

      {/* ── TIMELINE OVERVIEW ──────────────────────────────────────────── */}
      <section className="py-16 px-6 bg-earth">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-offwhite/10">
            {timeline.map(({ phase, time, note }) => (
              <div key={phase} className="bg-earth px-6 py-8 text-center">
                <p className="font-serif text-lg text-offwhite mb-1">{phase}</p>
                <p className="text-sunset text-xs tracking-[0.12em] uppercase font-medium mb-1">{time}</p>
                <p className="text-offwhite/40 text-xs">{note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STEP DETAILS ───────────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-offwhite">
        <div className="max-w-5xl mx-auto">
          <div className="space-y-20">
            {steps.map(({ number, title, duration, description, details }, i) => (
              <div
                key={number}
                className={`grid lg:grid-cols-2 gap-12 items-start ${
                  i % 2 !== 0 ? 'lg:direction-rtl' : ''
                }`}
              >
                {/* Text block */}
                <div className={i % 2 !== 0 ? 'lg:order-2' : ''}>
                  <div className="flex items-baseline gap-4 mb-5">
                    <span className="font-serif text-[4rem] leading-none text-sand/50 select-none">
                      {number}
                    </span>
                    <div>
                      <p className="text-sunset text-[10px] tracking-[0.25em] uppercase font-medium mb-0.5">
                        {duration}
                      </p>
                      <h2 className="font-serif text-2xl text-shadow">{title}</h2>
                    </div>
                  </div>
                  <p className="text-shadow/65 text-base leading-relaxed mb-8">
                    {description}
                  </p>
                </div>

                {/* Details list */}
                <div
                  className={`bg-earth/6 border border-sand/40 p-8 ${
                    i % 2 !== 0 ? 'lg:order-1' : ''
                  }`}
                >
                  <p className="text-shadow/50 text-[10px] tracking-[0.2em] uppercase font-medium mb-5">
                    What happens at this stage
                  </p>
                  <ul className="space-y-3">
                    {details.map((detail) => (
                      <li key={detail} className="flex items-start gap-3">
                        <span className="w-1 h-1 rounded-full bg-sunset mt-2.5 flex-shrink-0" />
                        <span className="text-shadow/70 text-sm leading-relaxed">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT SELLERS SAY ───────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-shadow">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-sunset text-[11px] tracking-[0.3em] uppercase font-medium mb-4">
              What to Expect
            </p>
            <h2 className="font-serif text-display-md text-offwhite mb-6">
              Transparency Is Built Into the Process.
            </h2>
            <p className="text-sand text-base leading-relaxed max-w-2xl mx-auto">
              At every stage, Craig communicates clearly about where things stand,
              what&apos;s happening next, and what it means for you. You&apos;re never
              guessing. You&apos;re always informed.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-8">
            {[
              {
                headline: 'No Hidden Costs',
                body: 'Fee structures are explained completely in consultation — before you commit to anything.',
              },
              {
                headline: 'Your Property, Your Terms',
                body: 'You set the minimum acceptable bid. Craig advises strategically; you decide.',
              },
              {
                headline: 'Personal Attention',
                body: 'Craig handles your auction personally. You\'re not handed off to a junior agent.',
              },
            ].map(({ headline, body }) => (
              <div key={headline} className="border border-offwhite/10 p-7">
                <div className="w-8 h-px bg-sunset mb-5" />
                <h3 className="font-serif text-lg text-offwhite mb-3">{headline}</h3>
                <p className="text-offwhite/55 text-sm leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INLINE CTA ─────────────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-offwhite border-t border-sand/40">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-serif text-display-md text-shadow mb-5">
            Ready to start the conversation?
          </h2>
          <p className="text-shadow/60 text-base leading-relaxed mb-8">
            Step one is a free consultation. Craig will walk you through exactly
            what the process would look like for your specific property.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-earth text-offwhite font-medium text-sm tracking-[0.08em] uppercase px-8 py-4 hover:bg-sunset hover:text-shadow transition-colors duration-200"
          >
            Schedule Your Consultation
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <ConsultationCTA
        headline="Let's map out your auction."
        subtext="Craig will walk through the full process with your specific property in mind — acreage, location, timeline, and goals."
      />
    </>
  )
}
