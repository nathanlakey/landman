import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { supabaseAdmin } from '@/lib/supabase/server'

export async function POST(req: NextRequest) {
  const { userId } = auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const formData = await req.formData()
    const files = formData.getAll('files') as File[]

    if (!files.length) {
      return NextResponse.json({ error: 'No files provided' }, { status: 400 })
    }

    const urls: string[] = []

    for (const file of files) {
      const buffer = Buffer.from(await file.arrayBuffer())
      const filename = `${Date.now()}-${file.name.replace(/[^a-z0-9.]/gi, '-')}`

      const { error } = await supabaseAdmin.storage
        .from('listing-images')
        .upload(filename, buffer, {
          contentType: file.type,
          upsert: false,
        })

      if (error) throw error

      const { data } = supabaseAdmin.storage
        .from('listing-images')
        .getPublicUrl(filename)

      urls.push(data.publicUrl)
    }

    return NextResponse.json({ urls })
  } catch (err) {
    console.error('Upload error:', err)
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
  }
}
