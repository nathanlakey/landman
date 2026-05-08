/*
 * Run in Supabase SQL Editor before using this feature:
 *
 * -- 1. Storage bucket (if not already created)
 * insert into storage.buckets (id, name, public)
 * values ('listing-documents', 'listing-documents', true)
 * on conflict do nothing;
 *
 * -- 2. Documents table
 * create table if not exists public.listing_documents (
 *   id          uuid        default gen_random_uuid() primary key,
 *   listing_id  uuid        references public.listings(id) on delete cascade,
 *   label       text        not null,
 *   file_url    text        not null,
 *   file_size   text,
 *   sort_order  integer     default 0,
 *   created_at  timestamp with time zone default now()
 * );
 *
 * alter table public.listing_documents enable row level security;
 *
 * create policy "Anyone can view listing documents"
 *   on public.listing_documents for select using (true);
 */

import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { supabaseAdmin } from '@/lib/supabase/server'

export async function POST(req: NextRequest) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const formData = await req.formData()
    const file = formData.get('file') as File | null
    const listingId = formData.get('listing_id') as string | null
    const label = (formData.get('label') as string | null) ?? ''
    const sortOrder = parseInt((formData.get('sort_order') as string | null) ?? '0', 10)

    if (!file) return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    if (!listingId) return NextResponse.json({ error: 'listing_id required' }, { status: 400 })

    const buffer = Buffer.from(await file.arrayBuffer())
    const safeName = file.name.replace(/[^a-z0-9._-]/gi, '-').toLowerCase()
    const storagePath = `${listingId}/${Date.now()}-${safeName}`

    const { error: uploadError } = await supabaseAdmin.storage
      .from('listing-documents')
      .upload(storagePath, buffer, {
        contentType: 'application/pdf',
        upsert: false,
      })

    if (uploadError) throw uploadError

    const { data: urlData } = supabaseAdmin.storage
      .from('listing-documents')
      .getPublicUrl(storagePath)

    const sizeBytes = file.size
    const fileSize =
      sizeBytes >= 1024 * 1024
        ? `${(sizeBytes / (1024 * 1024)).toFixed(1)} MB`
        : `${Math.round(sizeBytes / 1024)} KB`

    const { data: doc, error: dbError } = await supabaseAdmin
      .from('listing_documents')
      .insert({
        listing_id: listingId,
        label: label || file.name.replace(/\.pdf$/i, ''),
        file_url: urlData.publicUrl,
        file_size: fileSize,
        sort_order: sortOrder,
      })
      .select()
      .single()

    if (dbError) throw dbError

    return NextResponse.json(doc)
  } catch (err) {
    console.error('Document upload error:', err)
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
  }
}

