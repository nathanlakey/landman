import { auth } from '@clerk/nextjs/server'
import { redirect, notFound } from 'next/navigation'
import { supabaseAdmin } from '@/lib/supabase/server'
import AdminLayout from '@/components/AdminLayout'
import ListingForm from '../../ListingForm'
import type { Agent } from '@/types'

async function getListing(id: string) {
  const { data } = await supabaseAdmin.from('listings').select('*').eq('id', id).single()
  return data
}

export default async function EditListingPage({ params }: { params: { id: string } }) {
  const { userId } = await auth()
  if (!userId) redirect('/sign-in')

  const listing = await getListing(params.id)
  const agents: Agent[] = []
  if (!listing) notFound()

  return (
    <AdminLayout>
      <div>
        <h1 className="font-serif text-3xl text-brand-off-white mb-8">Edit Listing</h1>
        <ListingForm agents={agents} listing={listing} />
      </div>
    </AdminLayout>
  )
}
