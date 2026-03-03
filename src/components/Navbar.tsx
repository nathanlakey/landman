'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { href: '/why-auction', label: 'Why Auction' },
  { href: '/our-process', label: 'Our Process' },
  { href: '/about', label: 'About' },
  { href: '/resources', label: 'Resources' },
  { href: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 30)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsMobileOpen(false)
  }, [pathname])

  const isHome = pathname === '/'

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
        isScrolled || !isHome
          ? 'bg-offwhite/95 backdrop-blur-md shadow-sm border-b border-sand/40'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <Link href="/" className="flex flex-col leading-none group">
            <span
              className={`font-serif text-2xl font-semibold tracking-wide transition-colors duration-300 ${
                isScrolled || !isHome ? 'text-earth' : 'text-offwhite'
              }`}
            >
              LANDMAN
            </span>
            <span
              className={`text-[9px] tracking-[0.22em] uppercase transition-colors duration-300 ${
                isScrolled || !isHome ? 'text-clay' : 'text-sand'
              }`}
            >
              Craig Meier Land Auctions
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-[13px] tracking-[0.1em] uppercase font-medium transition-colors duration-200 ${
                  pathname.startsWith(link.href)
                    ? isScrolled || !isHome ? 'text-earth' : 'text-offwhite'
                    : isScrolled || !isHome
                      ? 'text-shadow/70 hover:text-earth'
                      : 'text-offwhite/75 hover:text-offwhite'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="ml-2 bg-earth text-offwhite text-[13px] tracking-[0.08em] uppercase font-medium px-5 py-2.5 hover:bg-sunset hover:text-shadow transition-all duration-200"
            >
              Schedule Consultation
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className={`md:hidden transition-colors ${
              isScrolled || !isHome ? 'text-shadow' : 'text-offwhite'
            }`}
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            aria-label="Toggle menu"
          >
            {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {isMobileOpen && (
        <div className="md:hidden bg-offwhite border-t border-sand/40">
          <div className="px-6 py-6 flex flex-col gap-5">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm tracking-[0.1em] uppercase font-medium transition-colors ${
                  pathname.startsWith(link.href) ? 'text-earth' : 'text-shadow/70 hover:text-earth'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="bg-earth text-offwhite text-sm tracking-widest uppercase font-medium px-5 py-3 text-center hover:bg-sunset hover:text-shadow transition-all duration-200"
            >
              Schedule Consultation
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}


