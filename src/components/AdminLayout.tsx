'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  ListTree,
  MessageSquare,
  PlusCircle,
  ChevronRight,
} from 'lucide-react'

const adminLinks: { href: string; label: string; icon: React.ElementType; exact?: boolean }[] = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { href: '/admin/inquiries', label: 'Inquiries', icon: MessageSquare },
  { href: '/admin/listings', label: 'Listings (Phase 2)', icon: ListTree },
  { href: '/admin/listings/new', label: 'New Listing', icon: PlusCircle },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="min-h-screen flex pt-20 bg-shadow">
      {/* Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-shadow border-r border-offwhite/10 shrink-0">
        <div className="p-6 border-b border-offwhite/10">
          <h2 className="font-serif text-offwhite text-lg tracking-wide">Admin Panel</h2>
          <p className="text-offwhite/30 text-xs mt-1">Craig Meier Land Auctions</p>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {adminLinks.map((link) => {
            const isActive = link.exact
              ? pathname === link.href
              : pathname.startsWith(link.href)
            const Icon = link.icon
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 px-3 py-2.5 text-sm transition-colors ${
                  isActive
                    ? 'bg-sunset/15 text-sunset'
                    : 'text-offwhite/55 hover:text-offwhite hover:bg-offwhite/5'
                }`}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                {link.label}
                {isActive && <ChevronRight className="w-3 h-3 ml-auto" />}
              </Link>
            )
          })}
        </nav>
        <div className="p-4 border-t border-offwhite/10">
          <Link
            href="/"
            className="text-offwhite/30 text-xs hover:text-offwhite/70 transition-colors"
          >
            ← Back to Website
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 min-w-0 overflow-auto">
        {/* Mobile nav */}
        <div className="lg:hidden flex gap-2 overflow-x-auto p-4 bg-shadow border-b border-offwhite/10">
          {adminLinks.map((link) => {
            const isActive = link.exact
              ? pathname === link.href
              : pathname.startsWith(link.href)
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`shrink-0 text-xs px-3 py-1.5 border transition-colors ${
                  isActive
                    ? 'border-sunset text-sunset bg-sunset/10'
                    : 'border-offwhite/15 text-offwhite/55 hover:border-offwhite/30'
                }`}
              >
                {link.label}
              </Link>
            )
          })}
        </div>
        <div className="p-6 lg:p-8">{children}</div>
      </div>
    </div>
  )
}


