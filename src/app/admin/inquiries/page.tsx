import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { supabaseAdmin } from '@/lib/supabase/server'
import AdminLayout from '@/components/AdminLayout'

async function getInquiries() {
  const { data } = await supabaseAdmin
    .from('inquiries')
    .select('*, listing:listings(title, slug)')
    .order('created_at', { ascending: false })
  return data || []
}

export default async function AdminInquiriesPage() {
  const { userId } = auth()
  if (!userId) redirect('/sign-in')

  const inquiries = await getInquiries()

  return (
    <AdminLayout>
      <div>
        <h1 className="font-serif text-3xl text-brand-off-white mb-8">Inquiries</h1>
        <p className="text-brand-off-white/50 text-sm mb-6">
          {inquiries.length} total {inquiries.length === 1 ? 'inquiry' : 'inquiries'}
        </p>

        {inquiries.length === 0 ? (
          <p className="text-brand-off-white/40">No inquiries yet.</p>
        ) : (
          <div className="space-y-4">
            {inquiries.map((inq: {
              id: string; name: string; email: string; phone: string | null;
              message: string | null; listing?: { title: string; slug: string };
              created_at: string
            }) => (
              <div key={inq.id} className="p-5 bg-brand-brown border border-brand-tan/10 hover:border-brand-tan/20 transition-colors">
                <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                  <div>
                    <p className="text-brand-off-white font-medium">{inq.name}</p>
                    <div className="flex flex-wrap items-center gap-3 mt-1">
                      <a href={`mailto:${inq.email}`} className="text-brand-tan/70 text-sm hover:text-brand-tan transition-colors">
                        {inq.email}
                      </a>
                      {inq.phone && (
                        <a href={`tel:${inq.phone}`} className="text-brand-off-white/50 text-sm hover:text-brand-tan transition-colors">
                          {inq.phone}
                        </a>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    {inq.listing && (
                      <p className="text-brand-tan/70 text-xs">
                        Re: {inq.listing.title}
                      </p>
                    )}
                    <p className="text-brand-off-white/30 text-xs mt-1">
                      {new Date(inq.created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                </div>
                {inq.message && (
                  <p className="text-brand-off-white/60 text-sm leading-relaxed border-t border-brand-tan/10 pt-3 mt-2">
                    {inq.message}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
