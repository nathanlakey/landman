import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import AdminLayout from '@/components/AdminLayout'
import ListingForm from '../ListingForm'
import type { Agent } from '@/types'

export default async function NewListingPage() {
  const { userId } = await auth()
  if (!userId) redirect('/sign-in')

  const agents: Agent[] = []

  return (
    <AdminLayout>
      <div>
        <h1 className="font-serif text-3xl text-brand-off-white mb-8">New Listing</h1>
        <ListingForm agents={agents} />
      </div>
    </AdminLayout>
  )
}
