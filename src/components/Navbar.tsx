'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { UserButton, SignInButton, useAuth } from '@clerk/nextjs'
import { Menu, X, MapPin } from 'lucide-react'

const navLinks = [
  { href: '/listings', label: 'Properties' },
  { href: '/about', label: 'About' },
  { href: '/team', label: 'Our Team' },
  { href: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const pathname = usePathname()
  const { isSignedIn } = useAuth()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsMobileOpen(false)
  }, [pathname])

  const isHome = pathname === '/'

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || !isHome
          ? 'bg-brand-dark/95 backdrop-blur-md shadow-lg border-b border-brand-tan/10'
          : 'bg-gradient-to-b from-black/60 to-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <MapPin className="w-5 h-5 text-brand-tan group-hover:scale-110 transition-transform" />
            <div>
              <span className="font-serif text-2xl font-bold text-brand-tan tracking-wide">
                LANDMAN
              </span>
              <p className="text-[10px] text-brand-tan/60 tracking-[0.2em] uppercase leading-none -mt-0.5">
                Rooted in Texas Land
              </p>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm tracking-widest uppercase font-medium transition-colors duration-200 ${
                  pathname.startsWith(link.href)
                    ? 'text-brand-tan'
                    : 'text-brand-off-white/80 hover:text-brand-tan'
                }`}
              >
                {link.label}
              </Link>
            ))}
            {isSignedIn && (
              <Link
                href="/favorites"
                className={`text-sm tracking-widest uppercase font-medium transition-colors duration-200 ${
                  pathname === '/favorites'
                    ? 'text-brand-tan'
                    : 'text-brand-off-white/80 hover:text-brand-tan'
                }`}
              >
                Saved
              </Link>
            )}
          </div>

          {/* Auth + mobile toggle */}
          <div className="flex items-center gap-4">
            {isSignedIn ? (
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: 'w-9 h-9 ring-2 ring-brand-tan/30',
                  },
                }}
              />
            ) : (
              <SignInButton mode="modal">
                <button className="hidden md:inline-flex items-center gap-2 bg-gradient-to-r from-brand-tan to-brand-tan-light text-brand-dark text-sm font-semibold px-4 py-2 tracking-wider uppercase hover:brightness-110 hover:shadow-[0_0_16px_rgba(200,146,42,0.4)] transition-all">
                  Sign In
                </button>
              </SignInButton>
            )}
            <button
              className="md:hidden text-brand-off-white hover:text-brand-tan transition-colors"
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              aria-label="Toggle menu"
            >
              {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {isMobileOpen && (
        <div className="md:hidden bg-brand-dark border-t border-brand-tan/10">
          <div className="px-4 py-6 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-base tracking-widest uppercase font-medium py-2 transition-colors ${
                  pathname.startsWith(link.href)
                    ? 'text-brand-tan'
                    : 'text-brand-off-white/80 hover:text-brand-tan'
                }`}
              >
                {link.label}
              </Link>
            ))}
            {isSignedIn && (
              <Link
                href="/favorites"
                className="text-base tracking-widest uppercase font-medium py-2 text-brand-off-white/80 hover:text-brand-tan transition-colors"
              >
                Saved
              </Link>
            )}
            {!isSignedIn && (
              <SignInButton mode="modal">
                <button className="mt-2 w-full bg-gradient-to-r from-brand-tan to-brand-tan-light text-brand-dark text-sm font-semibold px-4 py-3 tracking-wider uppercase hover:brightness-110 transition-all">
                  Sign In
                </button>
              </SignInButton>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
