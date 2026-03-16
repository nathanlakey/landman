'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ArrowRight, TrendingUp, Calendar, BarChart2, Users } from 'lucide-react'

// ─── Data ─────────────────────────────────────────────────────────────────────

const myths = [
  {
    myth: 'Auctions are for desperate sellers',
    truth:
      'Auctions are used by savvy sellers who want competition, not charity. When buyers compete, prices go up.',
  },
  {
    myth: "You'll sell for less at auction",
    truth:
      'Competitive bidding often drives prices above what a traditional listing would achieve — especially for land.',
  },
  {
    myth: "Auctions don't work for my type of property",
    truth:
      'We auction ranches, farms, development land, residential property, commercial assets, and equipment. If it has value, auction can work.',
  },
]

const benefits = [
  {
    icon: TrendingUp,
    title: 'Competitive Bidding',
    desc: 'Multiple buyers competing in real time drives the final price higher than a take-it-or-leave-it listing.',
  },
  {
    icon: Calendar,
    title: 'Defined Sale Date',
    desc: 'No months of uncertainty. Auction gives you a clear timeline so you can plan what comes next.',
  },
  {
    icon: BarChart2,
    title: 'Transparent Market Value',
    desc: 'You see exactly what the market will pay — no guessing, no lowball offers, no drawn-out negotiations.',
  },
  {
    icon: Users,
    title: 'Qualified Buyers Only',
    desc: 'Auction attracts serious, pre-qualified buyers. No tire kickers, no wasted showings.',
  },
]

const steps = [
  {
    number: '01',
    title: 'Property Evaluation',
    body: 'We review your property, discuss your goals, and determine if auction is the right fit.',
  },
  {
    number: '02',
    title: 'Marketing Campaign',
    body: 'We build a targeted campaign — signage, digital ads, email blasts, and auction listings — to drive maximum buyer attention.',
  },
  {
    number: '03',
    title: 'Auction Day',
    body: 'Qualified buyers compete in real time. You set the terms. We run the event.',
  },
  {
    number: '04',
    title: 'Closing',
    body: 'Once the hammer falls, we manage the paperwork and coordinate a smooth closing.',
  },
]

const PROPERTY_TYPES = [
  { value: '', label: 'Select property type...' },
  { value: 'Ranch/Farm', label: 'Ranch / Farm' },
  { value: 'Development Land', label: 'Development Land' },
  { value: 'Residential', label: 'Residential' },
  { value: 'Commercial', label: 'Commercial' },
  { value: 'Farm Equipment', label: 'Farm Equipment' },
  { value: 'Estate/Other', label: 'Estate / Other' },
]

const inputClass =
  'w-full border border-sand bg-white px-4 py-3 text-shadow text-sm focus:outline-none focus:border-sunset transition-colors placeholder-shadow/30'

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function SellPage() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    propertyType: '',
    location: '',
    acreage: '',
    message: '',
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/evaluation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      setStatus(res.ok ? 'success' : 'error')
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="pb-20 md:pb-0">

      {/* ── 1. HERO ──────────────────────────────────────────────────────── */}
      <section className="bg-shadow pt-36 pb-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-sunset text-[11px] tracking-[0.3em] uppercase font-medium mb-5">
            Sell Your Property
          </p>
          <h1 className="font-serif text-display-xl text-offwhite mb-6 leading-[1.05]">
            Your Land Deserves a Competitive Market.
          </h1>
          <p className="text-offwhite/65 text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
            Auction isn&apos;t a last resort — it&apos;s a strategy. One that creates urgency,
            drives competition, and delivers results on your timeline.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#evaluation"
              className="inline-flex items-center gap-2 bg-sunset text-white font-semibold text-sm tracking-[0.08em] uppercase px-8 py-4 hover:bg-[#e08600] transition-colors duration-200"
            >
              Get My Free Evaluation
              <ArrowRight className="w-4 h-4" />
            </a>
            <Link
              href="/quiz"
              className="inline-flex items-center gap-1.5 text-sand/70 text-sm hover:text-sand transition-colors"
            >
              Not sure? Take the quiz
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── 2. MYTH-BUSTING ──────────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-offwhite">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-clay text-[11px] tracking-[0.3em] uppercase font-medium mb-4">
              Common Misconceptions
            </p>
            <h2 className="font-serif text-display-lg text-shadow mb-4">
              Understanding the Auction Advantage
            </h2>
            <p className="text-shadow/60 text-base max-w-xl mx-auto">
              Many landowners have questions about selling at auction. Here&apos;s how the process actually works.
            </p>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {myths.map(({ myth, truth }) => (
              <div key={myth} className="bg-white border border-sand/50 p-8">
                <div className="mb-5">
                  <span className="inline-block text-[10px] tracking-[0.2em] uppercase font-semibold text-clay/70 bg-clay/8 border border-clay/20 px-3 py-1 mb-3">
                    Myth
                  </span>
                  <p className="font-serif text-lg text-shadow/60 italic leading-snug">
                    &ldquo;{myth}&rdquo;
                  </p>
                </div>
                <div className="border-t border-sand/50 pt-5">
                  <span className="inline-block text-[10px] tracking-[0.2em] uppercase font-semibold text-sage bg-sage/8 border border-sage/20 px-3 py-1 mb-3">
                    Truth
                  </span>
                  <p className="text-shadow/75 text-sm leading-relaxed">{truth}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. WHY AUCTION WORKS FOR SELLERS ────────────────────────────── */}
      <section className="py-24 px-6 bg-shadow">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-sunset text-[11px] tracking-[0.3em] uppercase font-medium mb-4">
              The Seller Advantage
            </p>
            <h2 className="font-serif text-display-lg text-offwhite">
              Why Smart Sellers Choose Auction.
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {benefits.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="border border-offwhite/15 p-10 hover:border-sunset/40 hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200">
                <Icon className="w-7 h-7 text-sunset mb-6" />
                <h3 className="font-serif text-lg text-offwhite mb-3">{title}</h3>
                <p className="text-offwhite/60 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. SELLER PROCESS ────────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-offwhite border-t border-sand/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-clay text-[11px] tracking-[0.3em] uppercase font-medium mb-4">
              The Process
            </p>
            <h2 className="font-serif text-display-lg text-shadow mb-4">
              From Evaluation to Closing.
            </h2>
            <p className="text-shadow/60 text-base max-w-lg mx-auto">
              A simple, proven process that puts you in control.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map(({ number, title, body }, i) => (
              <div key={number} className="relative">
                {/* Connector line — desktop only */}
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-full w-full h-px bg-sand/50 -translate-x-4 z-0" />
                )}
                <span className="font-serif text-[5rem] leading-none text-sand/40 block mb-2 select-none">
                  {number}
                </span>
                <h3 className="font-serif text-xl text-shadow mb-3">{title}</h3>
                <p className="text-shadow/60 text-sm leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. EVALUATION FORM ───────────────────────────────────────────── */}
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
              Free, no-obligation evaluation from Craig Meier — World Champion Auctioneer
            </p>
          </div>

          {status === 'success' ? (
            <div className="bg-sage/10 border border-sage/30 px-8 py-12 text-center">
              <p className="font-serif text-2xl text-shadow mb-3">Thank you!</p>
              <p className="text-shadow/70 text-base">
                Craig will be in touch within 1 business day.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-shadow/60 text-xs tracking-[0.12em] uppercase mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={form.name}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="John Smith"
                  />
                </div>
                <div>
                  <label className="block text-shadow/60 text-xs tracking-[0.12em] uppercase mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={form.phone}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="(555) 000-0000"
                  />
                </div>
              </div>

              <div>
                <label className="block text-shadow/60 text-xs tracking-[0.12em] uppercase mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="you@email.com"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-shadow/60 text-xs tracking-[0.12em] uppercase mb-2">
                    Property Type *
                  </label>
                  <select
                    name="propertyType"
                    required
                    value={form.propertyType}
                    onChange={handleChange}
                    className={inputClass}
                  >
                    {PROPERTY_TYPES.map((opt) => (
                      <option key={opt.value} value={opt.value} disabled={!opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-shadow/60 text-xs tracking-[0.12em] uppercase mb-2">
                    Property Location *
                  </label>
                  <input
                    type="text"
                    name="location"
                    required
                    value={form.location}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="City or county"
                  />
                </div>
              </div>

              <div>
                <label className="block text-shadow/60 text-xs tracking-[0.12em] uppercase mb-2">
                  Approximate Acreage
                </label>
                <input
                  type="text"
                  name="acreage"
                  value={form.acreage}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="e.g. 150 acres"
                />
              </div>

              <div>
                <label className="block text-shadow/60 text-xs tracking-[0.12em] uppercase mb-2">
                  Tell Us About Your Property
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={4}
                  className={`${inputClass} resize-none`}
                  placeholder="Tell us more about your property and goals..."
                />
              </div>

              {status === 'error' && (
                <p className="text-red-600 text-sm">
                  Something went wrong. Please try again or call us directly.
                </p>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-sunset text-white font-semibold text-sm tracking-[0.08em] uppercase px-8 py-4 hover:bg-[#e08600] transition-colors duration-200 disabled:opacity-60"
              >
                {status === 'loading' ? 'Sending...' : 'Request My Free Evaluation'}
                {status !== 'loading' && <ArrowRight className="w-4 h-4" />}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* ── 6. FINAL CTA STRIP ───────────────────────────────────────────── */}
      <section className="py-16 px-6 bg-[#201E3D] text-center">
        <div className="max-w-2xl mx-auto">
          <p className="text-offwhite/70 text-base mb-6">
            Still not sure if auction is right for you?
          </p>
          <Link
            href="/quiz"
            className="inline-flex items-center gap-2 bg-sunset text-white font-semibold text-sm tracking-[0.08em] uppercase px-8 py-4 hover:bg-[#e08600] transition-colors duration-200"
          >
            Take the 2-Minute Quiz
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ── STICKY MOBILE CTA ────────────────────────────────────────────── */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#201E3D] border-t border-offwhite/10 px-4 py-3 flex items-center justify-between gap-3 shadow-lg">
        <p className="text-offwhite text-sm font-medium">Ready to sell your land?</p>
        <a
          href="#evaluation"
          className="inline-flex items-center gap-1.5 bg-sunset text-white text-xs font-semibold tracking-[0.08em] uppercase px-4 py-2.5 hover:bg-[#e08600] transition-colors whitespace-nowrap"
        >
          Get Free Evaluation
          <ArrowRight className="w-3.5 h-3.5" />
        </a>
      </div>

    </div>
  )
}
