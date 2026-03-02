import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { supabaseAdmin } from '@/lib/supabase/server'
import AdminLayout from '@/components/AdminLayout'
import Link from 'next/link'
import { PlusCircle, Edit, Trash2 } from 'lucide-react'
import DeleteListingButton from './DeleteListingButton'

async function getListings() {
  const { data } = await supabaseAdmin
    .from('listings')
    .select('id, title, slug, location_city, location_county, acreage, price, status, property_type, created_at')
    .order('created_at', { ascending: false })
  return data || []
}

const statusColors: Record<string, string> = {
  active: 'text-brand-tan bg-brand-tan/10',
  sold: 'text-brand-off-white/60 bg-brand-off-white/5',
  reduced: 'text-brand-tan-light bg-brand-tan-light/10',
}

export default async function AdminListingsPage() {
  const { userId } = auth()
  if (!userId) redirect('/sign-in')

  const listings = await getListings()

  return (
    <AdminLayout>
      <div>
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-serif text-3xl text-brand-off-white">Listings</h1>
          <Link
            href="/admin/listings/new"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-brand-tan to-brand-tan-light text-brand-dark text-sm font-semibold tracking-wider uppercase px-4 py-2.5 hover:brightness-110 transition-all"
          >
            <PlusCircle className="w-4 h-4" /> New Listing
          </Link>
        </div>

        {listings.length === 0 ? (
          <div className="text-center py-20 text-brand-off-white/40">
            <p className="text-lg font-serif mb-3">No listings yet</p>
            <Link href="/admin/listings/new" className="text-brand-tan text-sm underline">
              Create your first listing
            </Link>
          </div>
        ) : (
          <div className="border border-brand-tan/10 overflow-x-auto">
            <table className="w-full text-sm min-w-[700px]">
              <thead>
                <tr className="border-b border-brand-tan/10 bg-brand-brown">
                  {['Title', 'Location', 'Acreage', 'Price', 'Status', 'Type', 'Actions'].map((h) => (
                    <th key={h} className="text-left p-3 text-brand-off-white/50 font-medium text-xs uppercase tracking-wider">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {listings.map((listing: {
                  id: string; title: string; slug: string; location_city: string | null;
                  location_county: string | null; acreage: number | null; price: number | null;
                  status: string; property_type: string | null; created_at: string
                }) => (
                  <tr key={listing.id} className="border-b border-brand-tan/5 hover:bg-brand-tan/5 transition-colors">
                    <td className="p-3 text-brand-off-white/90 max-w-[200px] truncate font-medium">
                      {listing.title}
                    </td>
                    <td className="p-3 text-brand-off-white/60">
                      {[listing.location_city, listing.location_county].filter(Boolean).join(', ') || '—'}
                    </td>
                    <td className="p-3 text-brand-off-white/60">
                      {listing.acreage ? `${listing.acreage.toLocaleString()} ac` : '—'}
                    </td>
                    <td className="p-3 text-brand-off-white/60">
                      {listing.price
                        ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(listing.price)
                        : '—'}
                    </td>
                    <td className="p-3">
                      <span className={`text-xs px-2 py-1 font-medium capitalize ${statusColors[listing.status] || ''}`}>
                        {listing.status}
                      </span>
                    </td>
                    <td className="p-3 text-brand-off-white/60 capitalize">{listing.property_type || '—'}</td>
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/admin/listings/${listing.id}/edit`}
                          className="p-1.5 text-brand-off-white/40 hover:text-brand-tan transition-colors"
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
