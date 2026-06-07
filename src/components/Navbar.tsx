'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { useUser } from '@clerk/nextjs'
import { ADMIN_EMAILS } from '@/lib/admin'

type NavLink = { href: string; label: string; external?: boolean }

const navLinks: NavLink[] = [
  {
    href: 'https://landmanauctions.auctioneersoftware.com/auctions',
    label: 'Find Auctions',
    external: true,
  },
  { href: '/buying', label: 'Buying at Auction' },
  { href: '/sell', label: 'Sell Your Property' },
  { href: '/brokers', label: 'For Brokers' },
  { href: '/why-auction', label: 'Why Auction' },
  { href: '/about', label: 'About Us' },
]

export default function Navbar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const pathname = usePathname()
  const { user } = useUser()

  const userEmail = user?.primaryEmailAddress?.emailAddress?.toLowerCase() ?? ''
  const isAdmin = !!userEmail && ADMIN_EMAILS.map((e) => e.toLowerCase()).includes(userEmail)

  useEffect(() => {
    setIsMobileOpen(false)
  }, [pathname])

  return (
    <header
      className="sticky top-0 z-50 bg-[#F6F3EC] shadow-md"
    >
      <nav className="max-w-5xl mx-auto px-6 lg:px-10">
        <div className="flex items-center h-20">

          {/* Logo — pinned left */}
          <Link href="/" className="flex items-center shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/landman-logo-wide.svg"
              alt="Landman Auctions"
              style={{ height: '44px', width: 'auto', maxWidth: '150px' }}
            />
          </Link>

          {/* Nav links — centered in remaining space (desktop only) */}
          <div className="hidden lg:flex flex-1 items-center justify-center gap-7 pl-8">
            {navLinks.map((link) => {
              const baseClass = `text-[11px] tracking-[0.06em] uppercase font-medium whitespace-nowrap transition-colors duration-200 ${
                !link.external && pathname.startsWith(link.href)
                  ? 'text-[#201E3D]'
                  : 'text-[#201E3D]/70 hover:text-[#201E3D]'
              }`
              return link.external ? (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={baseClass}
                >
                  {link.label}
                </a>
              ) : (
                <Link key={link.href} href={link.href} className={baseClass}>
                  {link.label}
                </Link>
              )
            })}
            {isAdmin && (
              <Link
                href="/admin"
                className={`text-[11px] tracking-[0.06em] uppercase font-medium whitespace-nowrap transition-colors duration-200 ${
                  pathname.startsWith('/admin')
                    ? 'text-[#FF9500]'
                    : 'text-[#201E3D]/50 hover:text-[#FF9500]'
                }`}
              >
                Admin
              </Link>
            )}
          </div>

          {/* CTA — hidden on mobile, visible md+ */}
          <Link
            href="/contact"
            className="hidden md:inline-flex ml-auto lg:ml-8 shrink-0 bg-[#FF9500] text-white text-[11px] lg:text-[12px] tracking-[0.07em] uppercase font-medium px-4 lg:px-5 py-2.5 hover:bg-[#e08600] transition-all duration-200"
          >
            Schedule Consultation
          </Link>

          {/* Hamburger — visible below lg, sits right of CTA */}
          <button
            className="lg:hidden ml-auto md:ml-3 shrink-0 text-[#FF9500] transition-colors"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            aria-label="Toggle menu"
          >
            {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile + tablet menu */}
      {isMobileOpen && (
        <div className="lg:hidden bg-[#F6F3EC] border-t border-[#201E3D]/10">
          <div className="px-6 py-6 flex flex-col gap-5">
            {navLinks.map((link) => {
              const mobileClass = `text-sm tracking-[0.1em] uppercase font-medium transition-colors ${
                !link.external && pathname.startsWith(link.href)
                  ? 'text-[#201E3D]'
                  : 'text-[#201E3D]/70 hover:text-[#201E3D]'
              }`
              return link.external ? (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={mobileClass}
                >
                  {link.label}
                </a>
              ) : (
                <Link key={link.href} href={link.href} className={mobileClass}>
                  {link.label}
                </Link>
              )
            })}
            {isAdmin && (
              <Link
                href="/admin"
                className={`text-sm tracking-[0.1em] uppercase font-medium transition-colors ${
                  pathname.startsWith('/admin') ? 'text-[#FF9500]' : 'text-[#201E3D]/50 hover:text-[#FF9500]'
                }`}
              >
                Admin
              </Link>
            )}
            <Link
              href="/contact"
              className="mt-2 inline-flex items-center justify-center bg-[#FF9500] text-white text-sm tracking-[0.07em] uppercase font-medium px-5 py-3 hover:bg-[#e08600] transition-all duration-200"
            >
              Schedule Consultation
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}


