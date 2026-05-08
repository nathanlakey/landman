import Link from 'next/link'
import { Metadata } from 'next'
import { getAllPosts } from '@/lib/blog'
import ConsultationCTA from '@/components/ConsultationCTA'
import { ArrowRight, Clock, Tag } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Resources — Blog & FAQ',
  description: 'Insights on Texas land auctions, land valuation, and the selling process from Craig Meier — World Champion Auctioneer and Texas land specialist.',
}

const faqs = [
  {
    q: 'Why should I choose auction over listing with a broker?',
    a: 'Competitive bidding drives prices up rather than down — buyers compete against each other, not against you. Auction also gives you a defined timeline, certainty of close, and eliminates post-contract renegotiations that erode value in traditional listings. For rural Texas land with appeal to multiple buyer types, auction typically delivers superior outcomes.',
  },
  {
    q: 'How is land valued before the auction?',
    a: 'Craig conducts a thorough property assessment before any auction: reviewing comparable sales, evaluating property-specific characteristics (water, soil, access, mineral rights, improvements), and assessing current market demand. The goal is to set a reserve price that protects your interests while keeping the auction genuinely competitive.',
  },
  {
    q: 'What does the auction process cost the seller?',
    a: 'Auction fee structures vary by property type and circumstances. Craig explains every cost clearly and transparently in your initial consultation — before you commit to anything. Often, auctions use a buyer\'s premium structure (a percentage paid by the buyer) which can substantially offset seller-side costs. The key question isn\'t just cost — it\'s net proceeds to you.',
  },
  {
    q: 'How long does the auction process take from start to close?',
    a: 'A typical Craig Meier auction runs 8–12 weeks from first consultation to closing. The marketing campaign runs 4–6 weeks before auction day. Closing typically follows within 30–45 days of the auction. Compare this to 6–18 months for a traditional land listing.',
  },
  {
    q: 'What types of land does Craig work with?',
    a: 'Craig specializes in large-acreage Texas land across all ownership situations: working farms and crop land, ranch and pasture property, estate and inherited parcels, development tracts, hunting land, and recreational properties. If you\'re uncertain whether your property is a fit, a quick consultation will clarify it.',
  },
  {
    q: 'What if I set a minimum and nobody bids above it?',
    a: 'Craig\'s pre-auction marketing is designed to ensure a qualified buyer pool before auction day. If bidding doesn\'t meet your reserve, the property doesn\'t sell — you retain it. This rarely happens with properly prepared auctions. Craig will give you an honest assessment of market demand before you commit to an auction date.',
  },
  {
    q: 'Can Craig handle bilingual / Spanish-speaking buyer outreach?',
    a: 'Yes. Craig is fluent in English and Spanish and actively markets to Spanish-speaking buyers across Texas and beyond. This meaningfully expands your buyer pool, particularly for agricultural land and properties in South and Central Texas.',
  },
  {
    q: 'Is the initial consultation really free?',
    a: 'Yes. Craig\'s consultation costs you nothing and obligates you to nothing. It\'s a conversation — about your land, your goals, your timeline, and whether auction is the right strategy. You\'ll leave with more clarity regardless of what you decide to do next.',
  },
]

export default async function ResourcesPage() {
  const posts = getAllPosts()

  return (
    <>
      {/* ── HERO ───────────────────────────────────────────────────────── */}
      <section className="pt-40 pb-24 px-6 bg-shadow">
        <div className="max-w-4xl mx-auto">
          <p className="text-sunset text-[11px] tracking-[0.3em] uppercase font-medium mb-5">
            Resources
          </p>
          <h1 className="font-serif text-display-xl text-offwhite mb-7">
            Insights for Texas Landowners.
          </h1>
          <p className="text-sand text-lg leading-relaxed max-w-2xl">
            Craig writes and publishes practical guidance on land auctions, valuation,
            and the selling process — straight talk from someone who&apos;s done it
            thousands of times.
          </p>
        </div>
      </section>

      {/* ── BLOG POSTS ─────────────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-offwhite">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <p className="text-clay text-[11px] tracking-[0.3em] uppercase font-medium mb-3">
              Latest Articles
            </p>
            <h2 className="font-serif text-display-md text-shadow">
              From the Blog.
            </h2>
          </div>

          {posts.length === 0 ? (
            <p className="text-shadow/50 text-base">Articles coming soon.</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/resources/${post.slug}`}
                  className="group flex flex-col border border-sand/50 hover:border-sunset/40 transition-colors bg-offwhite"
                >
                  {/* Category tag */}
                  <div className="px-7 pt-7 pb-0">
                    <div className="flex items-center gap-2 mb-4">
                      <Tag className="w-3 h-3 text-clay" />
                      <span className="text-clay text-[10px] tracking-[0.2em] uppercase font-medium">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="px-7 pb-7 flex flex-col flex-1">
                    <h3 className="font-serif text-xl text-shadow mb-3 leading-snug group-hover:text-earth transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-shadow/60 text-sm leading-relaxed mb-6 flex-1">
                      {post.excerpt}
                    </p>

                    {/* Footer */}
                    <div className="flex items-center justify-between border-t border-sand/40 pt-5">
                      <div className="flex items-center gap-1.5 text-shadow/40 text-xs">
                        <Clock className="w-3 h-3" />
                        {post.readTime}
                      </div>
                      <span className="flex items-center gap-1.5 text-earth text-xs font-medium group-hover:text-sunset transition-colors">
                        Read article
                        <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────────────────────────────── */}
      <section id="faq" className="py-24 px-6 bg-shadow scroll-mt-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-sunset text-[11px] tracking-[0.3em] uppercase font-medium mb-4">
              Frequently Asked Questions
            </p>
            <h2 className="font-serif text-display-md text-offwhite">
              Straight Answers to Common Questions.
            </h2>
          </div>

          <div className="space-y-0 divide-y divide-offwhite/10">
            {faqs.map(({ q, a }) => (
              <div key={q} className="py-8">
                <h3 className="font-serif text-xl text-offwhite mb-3 leading-snug">{q}</h3>
                <p className="text-offwhite/60 text-base leading-relaxed">{a}</p>
              </div>
            ))}
          </div>

          <div className="mt-14 text-center">
            <p className="text-offwhite/50 text-sm mb-5">
              Have a question not covered here? Bring it directly to Craig.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-sunset text-shadow font-semibold text-sm tracking-[0.08em] uppercase px-7 py-4 hover:bg-offwhite transition-colors duration-200"
            >
              Schedule a Consultation
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <ConsultationCTA
        headline="Questions about your specific property?"
        subtext="Craig gives you a straight answer — no hedge words, no broker speak. Just an honest assessment of what your land could do at auction."
      />
    </>
  )
}
