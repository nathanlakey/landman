import Link from 'next/link'
import { MapPin, Phone, Mail } from 'lucide-react'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/why-auction', label: 'Why Auction' },
  { href: '/our-process', label: 'Our Process' },
  { href: '/about', label: 'About Craig' },
]

const resourceLinks = [
  { href: '/resources', label: 'Blog & Resources' },
  { href: '/resources#faq', label: 'FAQ' },
  { href: '/contact', label: 'Contact' },
]

export default function Footer() {
  return (
    <footer className="bg-shadow text-offwhite">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Brand */}
          <div className="lg:col-span-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/landman-logo-tall-light.svg"
              alt="Landman Auctions"
              style={{ height: '180px', width: 'auto' }}
              className="mb-5"
            />
            <p className="text-offwhite/60 text-sm leading-relaxed mb-6 max-w-xs">
              World Champion Auctioneer. 25+ years of experience delivering maximum
              value. When you&apos;re ready to talk, Craig is ready to listen.
            </p>
            <Link
              href="/contact"
              className="inline-block bg-sunset text-shadow text-[13px] tracking-[0.08em] uppercase font-semibold px-6 py-3 hover:bg-offwhite transition-colors duration-200"
            >
              Schedule a Consultation
            </Link>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sand text-xs tracking-[0.2em] uppercase font-medium mb-5">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-offwhite/60 text-sm hover:text-offwhite transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <h3 className="text-sand text-xs tracking-[0.2em] uppercase font-medium mt-8 mb-5">
              Resources
            </h3>
            <ul className="space-y-3">
              {resourceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-offwhite/60 text-sm hover:text-offwhite transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sand text-xs tracking-[0.2em] uppercase font-medium mb-5">
              Contact
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-clay mt-0.5 flex-shrink-0" />
                <span className="text-offwhite/60 text-sm leading-relaxed">
                  Ennis, TX — Ellis County
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-clay flex-shrink-0" />
                <a
                  href="tel:+19035550100"
                  className="text-offwhite/60 text-sm hover:text-offwhite transition-colors"
                >
                  (903) 555-0100
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-clay flex-shrink-0" />
                <a
                  href="mailto:craig@landman.com"
                  className="text-offwhite/60 text-sm hover:text-offwhite transition-colors"
                >
                  craig@landman.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-offwhite/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <p className="text-offwhite/35 text-xs">
            © 2026 Craig Meier Land Auctions / Landman. All rights reserved.
          </p>
          <p className="text-offwhite/35 text-xs">
            Licensed Texas Auctioneer · TDLR License #00000000 ·{' '}
            <a
              href="https://www.tdlr.texas.gov"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-offwhite/60 transition-colors"
            >
              TDLR Info
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}


