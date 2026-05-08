import { auth } from '@clerk/nextjs/server'
import { redirect, notFound } from 'next/navigation'
import { supabaseAdmin } from '@/lib/supabase/server'
import AdminLayout from '@/components/AdminLayout'
import ListingForm from '../../ListingForm'

async function getListing(id: string) {
  const { data } = await supabaseAdmin.from('listings').select('*').eq('id', id).single()
  return data
}

export default async function EditListingPage({ params }: { params: { id: string } }) {
  const { userId } = await auth()
  if (!userId) redirect('/admin/sign-in')

  const listing = await getListing(params.id)
  if (!listing) notFound()

  return (
    <AdminLayout>
      <div>
        <h1 className="font-serif text-3xl text-offwhite mb-8">Edit Listing</h1>
        <ListingForm listing={listing} />
      </div>
    </AdminLayout>
  )
}
