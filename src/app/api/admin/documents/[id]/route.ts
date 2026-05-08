import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { supabaseAdmin } from '@/lib/supabase/server'

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  // Fetch the document first so we can clean up storage
  const { data: doc } = await supabaseAdmin
    .from('listing_documents')
    .select('file_url')
    .eq('id', params.id)
    .single()

  if (doc?.file_url) {
    try {
      const url = new URL(doc.file_url)
      // Path looks like /storage/v1/object/public/listing-documents/<filename>
      const parts = url.pathname.split('/listing-documents/')
      if (parts[1]) {
        await supabaseAdmin.storage.from('listing-documents').remove([parts[1]])
      }
    } catch {
      // Non-fatal — proceed with row deletion even if storage cleanup fails
    }
  }

  const { error } = await supabaseAdmin
    .from('listing_documents')
    .delete()
    .eq('id', params.id)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}
