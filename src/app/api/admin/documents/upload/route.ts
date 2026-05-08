import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { supabaseAdmin } from '@/lib/supabase/server'

export async function POST(req: NextRequest) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const formData = await req.formData()
    const file = formData.get('file') as File

    if (!file) return NextResponse.json({ error: 'No file provided' }, { status: 400 })

    const buffer = Buffer.from(await file.arrayBuffer())
    const safeName = file.name.replace(/[^a-z0-9._-]/gi, '-').toLowerCase()
    const filename = `${Date.now()}-${safeName}`

    const { error } = await supabaseAdmin.storage
      .from('listing-documents')
      .upload(filename, buffer, {
        contentType: 'application/pdf',
        upsert: false,
      })

    if (error) throw error

    const { data } = supabaseAdmin.storage
      .from('listing-documents')
      .getPublicUrl(filename)

    const sizeBytes = file.size
    const sizeStr =
      sizeBytes >= 1024 * 1024
        ? `${(sizeBytes / (1024 * 1024)).toFixed(1)} MB`
        : `${Math.round(sizeBytes / 1024)} KB`

    return NextResponse.json({ url: data.publicUrl, size: sizeStr })
  } catch (err) {
    console.error('Document upload error:', err)
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
  }
}
