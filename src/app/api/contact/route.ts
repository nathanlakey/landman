import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase/server'
import { resend } from '@/lib/resend'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, phone, subject, message } = body

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Name, email, and message are required.' }, { status: 400 })
    }

    // Save as a general inquiry (no listing_id)
    const { error: dbError } = await supabaseAdmin.from('inquiries').insert({
      name,
      email,
      phone: phone || null,
      message: subject ? `[${subject}]\n${message}` : message,
      listing_id: null,
    })

    if (dbError) throw dbError

    // Email the admin
    await resend.emails.send({
      from: 'Landman Website <noreply@landman.com>',
      to: process.env.ADMIN_EMAIL!,
      subject: `Contact Form: ${subject || 'General Inquiry'} from ${name}`,
      html: `
        <div style="font-family: sans-serif; color: #333; max-width: 600px;">
          <h2 style="color: #c9a86c;">New Contact Form Submission — Landman</h2>
          <p><strong>Subject:</strong> ${subject || 'General Inquiry'}</p>
          <hr />
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
          <p><strong>Message:</strong></p>
          <p style="background: #f5f0e8; padding: 12px; border-left: 3px solid #c9a86c;">${message}</p>
          <hr />
          <p style="color: #888; font-size: 12px;">Submitted via the Landman contact form.</p>
        </div>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Contact POST error:', err)
    return NextResponse.json({ error: 'Failed to send message.' }, { status: 500 })
  }
}
