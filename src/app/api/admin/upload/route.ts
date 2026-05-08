import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { supabaseAdmin } from '@/lib/supabase/server'

export async function POST(req: NextRequest) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const formData = await req.formData()
    const files = formData.getAll('files') as File[]
    console.log(`[upload] received ${files.length} file(s):`, files.map(f => f.name))

    if (!files.length) {
      return NextResponse.json({ error: 'No files provided' }, { status: 400 })
    }

    const urls: string[] = []

    for (const file of files) {
      const buffer = Buffer.from(await file.arrayBuffer())
      const ext = file.name.split('.').pop()?.toLowerCase() ?? 'jpg'
      const filename = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}.${ext}`
      console.log(`[upload] uploading to storage: ${filename}`)

      const { error } = await supabaseAdmin.storage
        .from('listing-images')
        .upload(filename, buffer, {
          contentType: file.type,
          upsert: false,
        })

      if (error) {
        console.error(`[upload] storage error for ${filename}:`, error)
        throw error
      }

      const { data } = supabaseAdmin.storage
        .from('listing-images')
        .getPublicUrl(filename)

      console.log(`[upload] public URL: ${data.publicUrl}`)
      urls.push(data.publicUrl)
    }

    console.log(`[upload] returning ${urls.length} URL(s)`)
    return NextResponse.json({ urls })
  } catch (err) {
    console.error('Upload error:', err)
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
  }
}
