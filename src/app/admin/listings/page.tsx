import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { supabaseAdmin } from '@/lib/supabase/server'
import AdminLayout from '@/components/AdminLayout'
import Link from 'next/link'
import { PlusCircle, Edit } from 'lucide-react'
import DeleteListingButton from './DeleteListingButton'

async function getListings() {
  const { data } = await supabaseAdmin
    .from('listings')
    .select('id, title, slug, location_city, location_county, acreage, price, status, property_type, published, auction_date, created_at')
    .order('created_at', { ascending: false })
  return data || []
}

const statusColors: Record<string, string> = {
  draft: 'text-sand/70 bg-sand/10',
  upcoming: 'text-sunset bg-sunset/10',
  active: 'text-sage bg-sage/10',
  sold: 'text-offwhite/40 bg-offwhite/5',
  withdrawn: 'text-clay bg-clay/10',
  reduced: 'text-clay bg-clay/10',
}

export default async function AdminListingsPage() {
  const { userId } = await auth()
  if (!userId) redirect('/sign-in')

  const listings = await getListings()

  return (
    <AdminLayout>
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="font-serif text-3xl text-offwhite">Listings</h1>
            <p className="text-offwhite/35 text-xs mt-1">{listings.length} total listing{listings.length !== 1 ? 's' : ''}</p>
          </div>
          <Link
            href="/admin/listings/new"
            className="inline-flex items-center gap-2 bg-sunset text-shadow text-sm font-semibold tracking-[0.06em] uppercase px-4 py-2.5 hover:bg-offwhite transition-colors"
          >
            <PlusCircle className="w-4 h-4" /> New Listing
          </Link>
        </div>

        {listings.length === 0 ? (
          <div className="text-center py-20 text-offwhite/30">
            <p className="text-lg font-serif mb-3">No listings yet</p>
            <Link href="/admin/listings/new" className="text-sunset text-sm underline">
              Create your first listing
            </Link>
          </div>
        ) : (
          <div className="border border-offwhite/10 overflow-x-auto">
            <table className="w-full text-sm min-w-[700px]">
              <thead>
                <tr className="border-b border-offwhite/10 bg-offwhite/5">
                  {['Title', 'Location', 'Acreage', 'Price', 'Status', 'Auction Date', 'Published', 'Actions'].map((h) => (
                    <th key={h} className="text-left p-3 text-offwhite/35 font-medium text-xs uppercase tracking-wider">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {listings.map((listing: {
                  id: string; title: string; slug: string; location_city: string | null;
                  location_county: string | null; acreage: number | null; price: number | null;
                  status: string; property_type: string | null; published: boolean; auction_date: string | null; created_at: string
                }) => (
                  <tr key={listing.id} className="border-b border-offwhite/5 hover:bg-offwhite/5 transition-colors">
                    <td className="p-3 text-offwhite/85 max-w-[200px] truncate font-medium">
                      {listing.title}
                    </td>
                    <td className="p-3 text-offwhite/55">
                      {[listing.location_city, listing.location_county].filter(Boolean).join(', ') || '—'}
                    </td>
                    <td className="p-3 text-offwhite/55">
                      {listing.acreage ? `${listing.acreage.toLocaleString()} ac` : '—'}
                    </td>
                    <td className="p-3 text-offwhite/55">
                      {listing.price
                        ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(listing.price)
                        : '—'}
                    </td>
                    <td className="p-3">
                      <span className={`text-xs px-2 py-0.5 font-medium capitalize ${statusColors[listing.status] || ''}`}>
                        {listing.status}
                      </span>
                    </td>
                    <td className="p-3 text-offwhite/55 text-xs">
                      {listing.auction_date
                        ? new Date(listing.auction_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                        : '—'}
                    </td>
                    <td className="p-3">
                      <span className={`text-xs font-medium ${listing.published ? 'text-sage' : 'text-offwhite/30'}`}>
                        {listing.published ? 'Yes' : 'No'}
                      </span>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/admin/listings/${listing.id}/edit`}
                          className="p-1.5 text-offwhite/35 hover:text-sunset transition-colors"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <DeleteListingButton id={listing.id} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}


