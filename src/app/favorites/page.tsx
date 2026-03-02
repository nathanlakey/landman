import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { supabaseAdmin } from '@/lib/supabase/server'
import PropertyCard from '@/components/PropertyCard'
import type { Listing } from '@/types'
import type { Metadata } from 'next'
import Link from 'next/link'
import { Heart } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Saved Properties',
  description: 'Your saved Landman property listings.',
}

async function getUserFavorites(userId: string): Promise<Listing[]> {
  try {
    const { data } = await supabaseAdmin
      .from('favorites')
      .select('listing:listings(*, agent:agents(id,name,title,phone,email,photo_url))')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    return (data?.map((f: { listing: unknown }) => f.listing).filter(Boolean) as Listing[]) || []
  } catch {
    return []
  }
}

export default async function FavoritesPage() {
  const { userId } = auth()
  if (!userId) redirect('/sign-in')

  const listings = await getUserFavorites(userId)

  return (
    <div className="min-h-screen pt-24 pb-20">
      {/* Header */}
      <div className="bg-brand-brown border-b border-brand-tan/10 py-16 px-4">
        <div className="max-w-7xl mx-auto flex items-end justify-between">
          <div>
            <p className="text-brand-tan text-xs tracking-[0.3em] uppercase mb-3">My Account</p>
            <h1 className="font-serif text-5xl text-brand-off-white flex items-center gap-3">
              <Heart className="w-8 h-8 text-brand-tan" />
              Saved Properties
            </h1>
            {listings.length > 0 && (
              <p className="text-brand-off-white/50 mt-3 text-sm">
                {listings.length} saved {listings.length === 1 ? 'property' : 'properties'}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {listings.length === 0 ? (
          <div className="text-center py-24">
            <Heart className="w-16 h-16 text-brand-tan/20 mx-auto mb-5" />
            <h2 className="font-serif text-3xl text-brand-off-white mb-3">No Saved Properties</h2>
            <p className="text-brand-off-white/50 mb-8 max-w-sm mx-auto">
              Browse our listings and click &ldquo;Save Property&rdquo; to build your collection of favorite ranches and land.
            </p>
            <Link
              href="/listings"
              className="inline-flex items-center gap-2 bg-brand-tan text-brand-dark font-semibold text-sm tracking-wider uppercase px-8 py-4 hover:bg-brand-tan-light transition-colors"
            >
              Browse Properties
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {listings.map((listing) => (
              <PropertyCard key={listing.id} listing={listing} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
