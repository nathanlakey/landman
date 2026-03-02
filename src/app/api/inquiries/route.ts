import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase/server'
import { resend } from '@/lib/resend'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, phone, message, listing_id } = body

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Name, email, and message are required.' }, { status: 400 })
    }

    // Save to Supabase
    const { error: dbError } = await supabaseAdmin.from('inquiries').insert({
      name,
      email,
      phone: phone || null,
      message,
      listing_id: listing_id || null,
    })

    if (dbError) throw dbError

    // Fetch listing + agent email if listing_id
    let toEmail = process.env.ADMIN_EMAIL!
    let listingTitle = 'a Landman property'

    if (listing_id) {
      const { data: listing } = await supabaseAdmin
        .from('listings')
        .select('title, agent:agents(email)')
        .eq('id', listing_id)
        .single()

      if (listing) {
        listingTitle = listing.title
        const agentEmail = (listing.agent as { email?: string })?.email
        if (agentEmail) toEmail = agentEmail
      }
    }

    // Send email via Resend
    await resend.emails.send({
      from: 'Landman <noreply@landman.com>',
      to: toEmail,
      subject: `New Inquiry: ${listingTitle}`,
      html: `
        <div style="font-family: sans-serif; color: #333; max-width: 600px;">
          <h2 style="color: #c9a86c;">New Property Inquiry — Landman</h2>
          <p><strong>Property:</strong> ${listingTitle}</p>
          <hr />
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
          <p><strong>Message:</strong></p>
          <p style="background: #f5f0e8; padding: 12px; border-left: 3px solid #c9a86c;">${message}</p>
          <hr />
          <p style="color: #888; font-size: 12px;">This inquiry was submitted via landman.com</p>
        </div>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Inquiry POST error:', err)
    return NextResponse.json({ error: 'Failed to submit inquiry.' }, { status: 500 })
  }
}
