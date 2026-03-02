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

async function getAgents(): Promise<Agent[]> {
  const { data } = await supabaseAdmin.from('agents').select('id, name, title').order('name')
  return data || []
}

export default async function EditListingPage({ params }: { params: { id: string } }) {
  const { userId } = auth()
  if (!userId) redirect('/sign-in')

  const [listing, agents] = await Promise.all([getListing(params.id), getAgents()])
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
