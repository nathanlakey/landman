import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { supabaseAdmin } from '@/lib/supabase/server'

// GET — check if a listing is favorited by current user
export async function GET(req: NextRequest) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ favorited: false })

  const listingId = req.nextUrl.searchParams.get('listing_id')
  if (!listingId) return NextResponse.json({ favorited: false })

  const { data } = await supabaseAdmin
    .from('favorites')
    .select('id')
    .eq('user_id', userId)
    .eq('listing_id', listingId)
    .maybeSingle()

  return NextResponse.json({ favorited: !!data })
}

// POST — add a favorite
export async function POST(req: NextRequest) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { listing_id } = await req.json()
  if (!listing_id) return NextResponse.json({ error: 'listing_id required' }, { status: 400 })

  const { error } = await supabaseAdmin.from('favorites').upsert(
    { user_id: userId, listing_id },
    { onConflict: 'user_id,listing_id' }
  )

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}

// DELETE — remove a favorite
export async function DELETE(req: NextRequest) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { listing_id } = await req.json()
  if (!listing_id) return NextResponse.json({ error: 'listing_id required' }, { status: 400 })

  const { error } = await supabaseAdmin
    .from('favorites')
    .delete()
    .eq('user_id', userId)
    .eq('listing_id', listing_id)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}
