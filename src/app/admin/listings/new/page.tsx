import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { supabaseAdmin } from '@/lib/supabase/server'
import AdminLayout from '@/components/AdminLayout'
import ListingForm from '../ListingForm'
import type { Agent } from '@/types'

async function getAgents(): Promise<Agent[]> {
  const { data } = await supabaseAdmin.from('agents').select('id, name, title').order('name')
  return data || []
}

export default async function NewListingPage() {
  const { userId } = auth()
  if (!userId) redirect('/sign-in')

  const agents = await getAgents()

  return (
    <AdminLayout>
      <div>
        <h1 className="font-serif text-3xl text-brand-off-white mb-8">New Listing</h1>
        <ListingForm agents={agents} />
      </div>
    </AdminLayout>
  )
}
