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

const adminLinks = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { href: '/admin/listings', label: 'Listings', icon: ListTree },
  { href: '/admin/listings/new', label: 'New Listing', icon: PlusCircle },
  { href: '/admin/inquiries', label: 'Inquiries', icon: MessageSquare },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="min-h-screen flex pt-20">
      {/* Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-brand-brown border-r border-brand-tan/10 shrink-0">
        <div className="p-6 border-b border-brand-tan/10">
          <h2 className="font-serif text-brand-tan text-lg tracking-wide">Admin Panel</h2>
          <p className="text-brand-off-white/40 text-xs mt-1">Landman Management</p>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {adminLinks.map((link) => {
            const isActive = link.exact
              ? pathname === link.href
              : pathname.startsWith(link.href) && !(link.exact === true && pathname !== link.href)
            const Icon = link.icon
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 px-3 py-2.5 text-sm transition-colors group ${
                  isActive
                    ? 'bg-brand-tan/15 text-brand-tan'
                    : 'text-brand-off-white/60 hover:text-brand-off-white hover:bg-brand-tan/5'
                }`}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                {link.label}
                {isActive && <ChevronRight className="w-3 h-3 ml-auto" />}
              </Link>
            )
          })}
        </nav>
        <div className="p-4 border-t border-brand-tan/10">
          <Link
            href="/"
            className="text-brand-off-white/40 text-xs hover:text-brand-tan transition-colors"
          >
            ← Back to Website
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 min-w-0 overflow-auto">
        {/* Mobile nav */}
        <div className="lg:hidden flex gap-2 overflow-x-auto p-4 bg-brand-brown border-b border-brand-tan/10">
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
                    ? 'border-brand-tan text-brand-tan bg-brand-tan/10'
                    : 'border-brand-tan/20 text-brand-off-white/60 hover:border-brand-tan/40'
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
