import type { Metadata } from 'next'
import ContactClient from './ContactClient'

export const metadata: Metadata = {
  title: 'Schedule a Consultation',
  description: 'Contact Craig Meier to discuss your Texas land. Free, no-obligation consultation with a World Champion Auctioneer. Based in Ennis, TX — serving landowners across Texas.',
}

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-40 pb-16 px-6 bg-shadow">
        <div className="max-w-4xl mx-auto">
          <p className="text-sunset text-[11px] tracking-[0.3em] uppercase font-medium mb-5">
            Contact Craig
          </p>
          <h1 className="font-serif text-display-xl text-offwhite mb-6">
            Let&apos;s Talk About Your Land.
          </h1>
          <p className="text-sand text-lg leading-relaxed max-w-xl">
            A 30-minute consultation costs you nothing and obligates you to nothing.
            It&apos;s just a straight conversation about your property and what auction
            could realistically do for it.
          </p>
        </div>
      </section>

      <ContactClient />
    </>
  )
}

