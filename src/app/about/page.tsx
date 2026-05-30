import { Metadata } from 'next'
import ConsultationCTA from '@/components/ConsultationCTA'
import { Target, Layers, Users } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About Landman Auctions',
  description:
    'Landman Auctions builds custom marketing strategies, multi-par auctions, and broker participation programs to bring every qualified buyer to the table.',
}

const approachItems = [
  {
    icon: Target,
    title: 'Targeted Marketing Strategy',
    body: 'No two properties are alike, so no two marketing plans should be either. We build a custom strategy for each property and use it to reach the full range of qualified buyers, locally, regionally, and nationally, bringing every capable buyer to the table.',
  },
  {
    icon: Layers,
    title: 'Multi-Par Auctions',
    body: 'For ranches, farmland, and development tracts, a single buyer is not always the path to the highest value. Our multi-par auctions allow your property to be offered as a whole, in individual parcels, or in any combination, with the bidding determining which configuration produces the strongest result. More ways to buy bring more qualified buyers to the table.',
  },
  {
    icon: Users,
    title: 'Broker Participation Program',
    body: 'Many qualified buyers work through their own brokers. Our Broker Participation Program invites outside brokers to register and bring their buyers to the auction, expanding the pool of competition and recognizing the agents who contribute to a successful sale.',
  },
]

const team = [
  {
    name: 'Craig Meier',
    title: 'Auctioneer & Founder',
    initials: 'CM',
    bio: 'Craig has spent 28 years in the auction industry and has conducted thousands of auctions since 1998 across a variety of asset classes. As owner of three of the nation\u2019s largest auction schools, he is both a working auctioneer and a nationally recognized educator who trains new professionals across the country. That dual role keeps him at the forefront of auction strategy and performance, and he brings that depth of experience to every property Landman represents. Sellers work directly with Craig, gaining the judgment and presence that only decades in the profession can provide.',
  },
  {
    name: 'Grace Kirkland',
    title: 'Chief Marketing Officer',
    initials: 'GK',
    bio: 'Grace is a licensed auctioneer who partners with Craig in running Landman Auctions and leads its marketing strategy. She also serves as Director of Operations and Marketing for three of the nation\u2019s leading auction schools, where she and Craig work side by side and bring the same expertise that trains professional auctioneers directly to the properties Landman represents. Before entering the auction profession, Grace built a career in corporate brand and communication strategy, developing marketing and performance programs used internationally. She brings that strategic background to every auction, with a focus on sound strategy, careful execution, and marketing that delivers.',
  },
]

export default function AboutPage() {
  return (
    <>
      {/* ── HERO ───────────────────────────────────────────────────────── */}
      <section className="pt-40 pb-24 px-6 bg-shadow">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sunset text-[11px] tracking-[0.3em] uppercase font-medium mb-5">
            Who We Are
          </p>
          <h1 className="font-serif text-display-xl text-offwhite">
            About Landman Auctions
          </h1>
        </div>
      </section>

      {/* ── COMPANY INTRO ──────────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-offwhite">
        <div className="max-w-3xl mx-auto text-center">
          <div className="w-10 h-px bg-sunset mx-auto mb-8" />
          <p className="text-shadow/75 text-lg leading-relaxed">
            Marketing is the foundation of a successful auction. A property
            reaches its true value only when the right buyers know about it,
            understand it, and arrive prepared to compete. That principle
            drives how we approach every property we represent.
          </p>
        </div>
      </section>

      {/* ── OUR APPROACH ───────────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-earth">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-sand text-[11px] tracking-[0.3em] uppercase font-medium mb-4">
              How We Work
            </p>
            <h2 className="font-serif text-display-md text-offwhite">
              Our Approach
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {approachItems.map(({ icon: Icon, title, body }) => (
              <div
                key={title}
                className="bg-shadow/40 border border-sand/15 p-8 flex flex-col"
              >
                <Icon className="w-7 h-7 text-sunset mb-6" strokeWidth={1.5} />
                <h3 className="font-serif text-xl text-offwhite mb-4 leading-snug">
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

      {/* ── MEET THE TEAM ──────────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-offwhite">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-clay text-[11px] tracking-[0.3em] uppercase font-medium mb-4">
              Leadership
            </p>
            <h2 className="font-serif text-display-md text-shadow">
              Meet the Team
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            {team.map(({ name, title, initials, bio }) => (
              <div key={name} className="flex flex-col">
                <div className="relative w-full aspect-[4/5] bg-sand/40 mb-6 flex items-center justify-center">
                  <span className="font-serif text-7xl text-shadow/30 tracking-wide">
                    {initials}
                  </span>
                </div>
                <h3 className="font-serif text-2xl text-shadow mb-1">
                  {name}
                </h3>
                <p className="text-sunset text-[11px] tracking-[0.15em] uppercase font-medium mb-5">
                  {title}
                </p>
                <p className="text-shadow/70 text-base leading-relaxed">
                  {bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ConsultationCTA headline="Ready to Work With Us?" subtext="" />
    </>
  )
}
