import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { supabaseAdmin } from '@/lib/supabase/server'
import AdminLayout from '@/components/AdminLayout'
import { LayoutDashboard, ListTree, MessageSquare, Users } from 'lucide-react'

async function getDashboardStats() {
  try {
    const [listingsRes, inquiriesRes, agentsRes, favoritesRes] = await Promise.all([
      supabaseAdmin.from('listings').select('id, status', { count: 'exact' }),
      supabaseAdmin.from('inquiries').select('id', { count: 'exact' }),
      supabaseAdmin.from('agents').select('id', { count: 'exact' }),
      supabaseAdmin.from('favorites').select('id', { count: 'exact' }),
    ])

    const activeCount = listingsRes.data?.filter((l) => l.status === 'active').length || 0
    const soldCount = listingsRes.data?.filter((l) => l.status === 'sold').length || 0

    return {
      totalListings: listingsRes.count || 0,
      activeListings: activeCount,
      soldListings: soldCount,
      inquiries: inquiriesRes.count || 0,
      agents: agentsRes.count || 0,
      favorites: favoritesRes.count || 0,
    }
  } catch {
    return { totalListings: 0, activeListings: 0, soldListings: 0, inquiries: 0, agents: 0, favorites: 0 }
  }
}

async function getRecentInquiries() {
  try {
    const { data } = await supabaseAdmin
      .from('inquiries')
      .select('*, listing:listings(title)')
      .order('created_at', { ascending: false })
      .limit(5)
    return data || []
  } catch {
    return []
  }
}

export default async function AdminDashboard() {
  const { userId } = auth()
  if (!userId) redirect('/sign-in')

  const [stats, recentInquiries] = await Promise.all([getDashboardStats(), getRecentInquiries()])

  const statCards = [
    { label: 'Total Listings', value: stats.totalListings, icon: ListTree, color: 'text-brand-tan' },
    { label: 'Active Listings', value: stats.activeListings, icon: LayoutDashboard, color: 'text-brand-tan-light' },
    { label: 'Total Inquiries', value: stats.inquiries, icon: MessageSquare, color: 'text-brand-off-white' },
    { label: 'Total Agents', value: stats.agents, icon: Users, color: 'text-brand-tan/80' },
  ]

  return (
    <AdminLayout>
      <div>
        <h1 className="font-serif text-3xl text-brand-off-white mb-8">Dashboard</h1>

        {/* Stat cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {statCards.map((card) => {
            const Icon = card.icon
            return (
              <div key={card.label} className="p-5 bg-brand-brown border border-brand-tan/10">
                <div className="flex items-start justify-between mb-3">
                  <Icon className={`w-5 h-5 ${card.color}`} />
                </div>
                <p className={`font-serif text-3xl ${card.color} mb-1`}>{card.value}</p>
                <p className="text-brand-off-white/50 text-xs uppercase tracking-wider">{card.label}</p>
              </div>
            )
          })}
        </div>

        {/* Recent inquiries */}
        <div>
          <h2 className="font-serif text-xl text-brand-off-white mb-4">Recent Inquiries</h2>
          {recentInquiries.length === 0 ? (
            <p className="text-brand-off-white/40 text-sm">No inquiries yet.</p>
          ) : (
            <div className="border border-brand-tan/10 overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-brand-tan/10 bg-brand-brown">
                    <th className="text-left p-3 text-brand-off-white/50 font-medium text-xs uppercase tracking-wider">Name</th>
                    <th className="text-left p-3 text-brand-off-white/50 font-medium text-xs uppercase tracking-wider hidden sm:table-cell">Email</th>
                    <th className="text-left p-3 text-brand-off-white/50 font-medium text-xs uppercase tracking-wider hidden md:table-cell">Property</th>
                    <th className="text-left p-3 text-brand-off-white/50 font-medium text-xs uppercase tracking-wider">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {recentInquiries.map((inq: { id: string; name: string; email: string; listing?: { title: string }; created_at: string }) => (
                    <tr key={inq.id} className="border-b border-brand-tan/5 hover:bg-brand-tan/5 transition-colors">
                      <td className="p-3 text-brand-off-white/80">{inq.name}</td>
                      <td className="p-3 text-brand-off-white/60 hidden sm:table-cell">{inq.email}</td>
                      <td className="p-3 text-brand-off-white/60 hidden md:table-cell truncate max-w-xs">
                        {inq.listing?.title || '—'}
                      </td>
                      <td className="p-3 text-brand-off-white/40 text-xs">
                        {new Date(inq.created_at).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  )
}
