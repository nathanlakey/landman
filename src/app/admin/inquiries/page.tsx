import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { supabaseAdmin } from '@/lib/supabase/server'
import AdminLayout from '@/components/AdminLayout'

async function getInquiries() {
  const { data } = await supabaseAdmin
    .from('inquiries')
    .select('id, name, email, phone, property_type, acreage, message, created_at')
    .order('created_at', { ascending: false })
  return data || []
}

export default async function AdminInquiriesPage() {
  const { userId } = await auth()
  if (!userId) redirect('/sign-in')

  const inquiries = await getInquiries()

  return (
    <AdminLayout>
      <div>
        <h1 className="font-serif text-3xl text-offwhite mb-2">Consultation Requests</h1>
        <p className="text-offwhite/40 text-sm mb-8">
          {inquiries.length} total {inquiries.length === 1 ? 'inquiry' : 'inquiries'}
        </p>

        {inquiries.length === 0 ? (
          <p className="text-offwhite/40">No inquiries yet.</p>
        ) : (
          <div className="space-y-4">
            {inquiries.map((inq: {
              id: string; name: string; email: string; phone?: string | null;
              property_type?: string | null; acreage?: string | null;
              message?: string | null; created_at: string
            }) => (
              <div key={inq.id} className="p-6 bg-offwhite/5 border border-offwhite/10 hover:border-offwhite/20 transition-colors">
                <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                  <div>
                    <p className="text-offwhite font-medium">{inq.name}</p>
                    <div className="flex flex-wrap items-center gap-3 mt-1">
                      <a href={`mailto:${inq.email}`} className="text-sunset/80 text-sm hover:text-sunset transition-colors">
                        {inq.email}
                      </a>
                      {inq.phone && (
                        <a href={`tel:${inq.phone}`} className="text-offwhite/50 text-sm hover:text-offwhite transition-colors">
                          {inq.phone}
                        </a>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    {(inq.property_type || inq.acreage) && (
                      <p className="text-sand text-xs capitalize">
                        {[inq.property_type, inq.acreage ? `~${inq.acreage}` : null]
                          .filter(Boolean)
                          .join(' · ')}
                      </p>
                    )}
                    <p className="text-offwhite/30 text-xs mt-1">
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
                  <p className="text-offwhite/55 text-sm leading-relaxed border-t border-offwhite/10 pt-3 mt-2">
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


