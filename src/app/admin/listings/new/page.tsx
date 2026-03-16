import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import AdminLayout from '@/components/AdminLayout'
import ListingForm from '../ListingForm'

export default async function NewListingPage() {
  const { userId } = await auth()
  if (!userId) redirect('/sign-in')

  return (
    <AdminLayout>
      <div>
        <h1 className="font-serif text-3xl text-offwhite mb-8">New Listing</h1>
        <ListingForm />
      </div>
    </AdminLayout>
  )
}
