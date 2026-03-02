import Link from 'next/link'
import { MapPin, Phone, Mail, Facebook, Instagram, Twitter } from 'lucide-react'

const propertyLinks = [
  { href: '/listings?property_type=ranch', label: 'Ranch Properties' },
  { href: '/listings?property_type=farm', label: 'Farm Land' },
  { href: '/listings?property_type=hunting', label: 'Hunting Land' },
  { href: '/listings?property_type=recreational', label: 'Recreational' },
  { href: '/listings?property_type=agricultural', label: 'Agricultural' },
]

const companyLinks = [
  { href: '/about', label: 'About Landman' },
  { href: '/team', label: 'Our Team' },
  { href: '/contact', label: 'Contact' },
  { href: '/listings', label: 'All Properties' },
]

const accountLinks = [
  { href: '/favorites', label: 'Saved Properties' },
  { href: '/sign-in', label: 'Sign In' },
  { href: '/sign-up', label: 'Create Account' },
]

export default function Footer() {
  return (
    <footer className="bg-brand-brown border-t border-brand-tan/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-5 h-5 text-brand-tan" />
              <span className="font-serif text-2xl font-bold text-brand-tan tracking-wide">
                LANDMAN
              </span>
            </div>
            <p className="text-brand-off-white/60 text-sm leading-relaxed mb-6">
              Texas&apos; premier ranch and land brokerage. We specialize in connecting buyers
              and sellers with the finest rural properties across the Lone Star State.
            </p>
            <div className="flex gap-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"
                className="text-brand-off-white/40 hover:text-brand-tan transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                className="text-brand-off-white/40 hover:text-brand-tan transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"
                className="text-brand-off-white/40 hover:text-brand-tan transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Properties */}
          <div>
            <h3 className="text-brand-tan font-serif text-sm tracking-[0.15em] uppercase mb-5">
              Properties
            </h3>
            <ul className="space-y-3">
              {propertyLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}
                    className="text-brand-off-white/60 text-sm hover:text-brand-tan transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-brand-tan font-serif text-sm tracking-[0.15em] uppercase mb-5">
              Company
            </h3>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}
                    className="text-brand-off-white/60 text-sm hover:text-brand-tan transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-brand-tan font-serif text-sm tracking-[0.15em] uppercase mb-5">
              Contact
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-brand-tan mt-0.5 flex-shrink-0" />
                <span className="text-brand-off-white/60 text-sm">
                  4500 Ranch Road 1826<br />
                  Austin, TX 78739
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-brand-tan flex-shrink-0" />
                <a href="tel:+15125550100"
                  className="text-brand-off-white/60 text-sm hover:text-brand-tan transition-colors">
                  (512) 555-0100
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-brand-tan flex-shrink-0" />
                <a href="mailto:info@landman.com"
                  className="text-brand-off-white/60 text-sm hover:text-brand-tan transition-colors">
                  info@landman.com
                </a>
              </li>
            </ul>
            <ul className="space-y-3 mt-6">
              {accountLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}
                    className="text-brand-off-white/60 text-sm hover:text-brand-tan transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-brand-tan/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-brand-off-white/40 text-xs">
            © 2026 Landman. All rights reserved.
          </p>
          <p className="text-brand-off-white/40 text-xs text-center md:text-right">
            Landman is a licensed Texas Real Estate Brokerage. TREC License #9876543.
            Information About Brokerage Services |{' '}
            <a
              href="https://www.trec.texas.gov/forms/consumer-protection-notice"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-brand-tan transition-colors"
            >
              TREC Consumer Protection Notice
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
