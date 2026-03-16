import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { supabaseAdmin } from '@/lib/supabase/server'
import AdminLayout from '@/components/AdminLayout'
import { MessageSquare, ListTree, TrendingUp } from 'lucide-react'

async function getDashboardStats() {
  try {
    const [inquiriesRes, inquiriesThisMonth, listingsRes] = await Promise.all([
      supabaseAdmin.from('inquiries').select('id', { count: 'exact' }),
      supabaseAdmin
        .from('inquiries')
        .select('id', { count: 'exact' })
        .gte('created_at', new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString()),
      supabaseAdmin.from('listings').select('id', { count: 'exact' }).eq('status', 'active'),
    ])

    return {
      totalInquiries: inquiriesRes.count || 0,
      inquiriesThisMonth: inquiriesThisMonth.count || 0,
      activeListings: listingsRes.count || 0,
    }
  } catch {
    return { totalInquiries: 0, inquiriesThisMonth: 0, activeListings: 0 }
  }
}

async function getRecentInquiries() {
  try {
    const { data } = await supabaseAdmin
      .from('inquiries')
      .select('id, name, email, phone, property_type, acreage, message, created_at')
      .order('created_at', { ascending: false })
      .limit(10)
    return data || []
  } catch {
    return []
  }
}

export default async function AdminDashboard() {
  const { userId } = await auth()
  if (!userId) redirect('/sign-in')

  const [stats, recentInquiries] = await Promise.all([getDashboardStats(), getRecentInquiries()])

  return (
    <AdminLayout>
      <div>
        <div className="mb-8">
          <h1 className="font-serif text-3xl text-offwhite">Dashboard</h1>
          <p className="text-offwhite/40 text-sm mt-1">Craig Meier Land Auctions — Admin</p>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          {[
                      { label: 'Total Inquiries', value: stats.totalInquiries, icon: MessageSquare, accent: 'text-sunset' },
            { label: 'This Month', value: stats.inquiriesThisMonth, icon: TrendingUp, accent: 'text-sage' },
            { label: 'Active Listings', value: stats.activeListings, icon: ListTree, accent: 'text-sand' },
          ].map(({ label, value, icon: Icon, accent }) => (
            <div key={label} className="p-6 bg-shadow/60 border border-offwhite/10">
              <Icon className={`w-5 h-5 ${accent} mb-3`} />
              <p className={`font-serif text-3xl ${accent} mb-1`}>{value}</p>
              <p className="text-offwhite/40 text-xs uppercase tracking-wider">{label}</p>
            </div>
          ))}
        </div>

        {/* Recent inquiries */}
        <div>
          <h2 className="font-serif text-xl text-offwhite mb-4">Recent Consultation Requests</h2>
          {recentInquiries.length === 0 ? (
            <p className="text-offwhite/40 text-sm">No inquiries yet.</p>
          ) : (
            <div className="border border-offwhite/10 overflow-hidden overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-offwhite/10 bg-offwhite/5">
                    <th className="text-left p-3 text-offwhite/40 font-medium text-xs uppercase tracking-wider">Name</th>
                    <th className="text-left p-3 text-offwhite/40 font-medium text-xs uppercase tracking-wider hidden sm:table-cell">Email</th>
                    <th className="text-left p-3 text-offwhite/40 font-medium text-xs uppercase tracking-wider hidden md:table-cell">Type</th>
                    <th className="text-left p-3 text-offwhite/40 font-medium text-xs uppercase tracking-wider hidden md:table-cell">Acreage</th>
                    <th className="text-left p-3 text-offwhite/40 font-medium text-xs uppercase tracking-wider">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {recentInquiries.map((inq: {
                    id: string; name: string; email: string; phone?: string;
                    property_type?: string; acreage?: string; created_at: string
                  }) => (
                    <tr key={inq.id} className="border-b border-offwhite/5 hover:bg-offwhite/5 transition-colors">
                      <td className="p-3 text-offwhite/80">{inq.name}</td>
                      <td className="p-3 text-offwhite/60 hidden sm:table-cell">
                        <a href={`mailto:${inq.email}`} className="hover:text-sunset transition-colors">{inq.email}</a>
                      </td>
                      <td className="p-3 text-offwhite/50 hidden md:table-cell capitalize">
                        {inq.property_type || '—'}
                      </td>
                      <td className="p-3 text-offwhite/50 hidden md:table-cell">
                        {inq.acreage || '—'}
                      </td>
                      <td className="p-3 text-offwhite/35 text-xs">
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

