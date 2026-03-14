'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { href: '/why-auction', label: 'Why Auction' },
  { href: '/our-process', label: 'Our Process' },
  { href: '/find-a-property', label: 'Find a Property' },
  { href: '/about', label: 'About' },
  { href: '/resources', label: 'Resources' },
  { href: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setIsMobileOpen(false)
  }, [pathname])

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 bg-[#F6F3EC] shadow-md"
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <Link href="/" className="flex items-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/landman-logo-wide.svg"
              alt="Landman Auctions"
              style={{ height: '48px', width: 'auto' }}
            />
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-[13px] tracking-[0.1em] uppercase font-medium transition-colors duration-200 ${
                  pathname.startsWith(link.href)
                    ? 'text-[#201E3D]'
                    : 'text-[#201E3D]/70 hover:text-[#201E3D]'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="ml-2 bg-[#FF9500] text-white text-[13px] tracking-[0.08em] uppercase font-medium px-5 py-2.5 hover:bg-[#e08600] transition-all duration-200"
            >
              Schedule Consultation
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-[#201E3D] transition-colors"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            aria-label="Toggle menu"
          >
            {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {isMobileOpen && (
        <div className="md:hidden bg-[#F6F3EC] border-t border-[#201E3D]/10">
          <div className="px-6 py-6 flex flex-col gap-5">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm tracking-[0.1em] uppercase font-medium transition-colors ${
                  pathname.startsWith(link.href) ? 'text-[#201E3D]' : 'text-[#201E3D]/70 hover:text-[#201E3D]'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="bg-[#FF9500] text-white text-sm tracking-widest uppercase font-medium px-5 py-3 text-center hover:bg-[#e08600] transition-all duration-200"
            >
              Schedule Consultation
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}


