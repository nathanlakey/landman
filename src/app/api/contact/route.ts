import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase/server'
import { resend } from '@/lib/resend'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, phone, propertyType, acreage, message } = body

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Name, email, and message are required.' }, { status: 400 })
    }

    // Build extended message with property context
    const fullMessage = [
      propertyType ? `Property Type: ${propertyType}` : null,
      acreage ? `Approximate Acreage: ${acreage}` : null,
      `\n${message}`,
    ]
      .filter(Boolean)
      .join('\n')

    // Save to Supabase inquiries table
    const { error: dbError } = await supabaseAdmin.from('inquiries').insert({
      name,
      email,
      phone: phone || null,
      message: fullMessage,
      listing_id: null,
    })

    if (dbError) {
      console.error('Supabase insert error:', dbError)
      // Don't block email sending if DB fails
    }

    // Email the admin
    await resend.emails.send({
      from: 'Landman Auctions <onboarding@resend.dev>',
      to: process.env.ADMIN_EMAIL!,
      subject: `New Consultation Request from ${name}${propertyType ? ` — ${propertyType}` : ''}`,
      html: `
        <div style="font-family: sans-serif; color: #333; max-width: 600px; border: 1px solid #e0d8cc; padding: 32px;">
          <h2 style="color: #4B3A2A; font-family: Georgia, serif; margin-top: 0;">
            New Consultation Request — Landman
          </h2>
          <hr style="border-color: #CBBBA0; margin: 16px 0;" />

          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}" style="color: #A86A3D;">${email}</a></p>
          ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
          ${propertyType ? `<p><strong>Property Type:</strong> ${propertyType}</p>` : ''}
          ${acreage ? `<p><strong>Approximate Acreage:</strong> ${acreage}</p>` : ''}

          <hr style="border-color: #CBBBA0; margin: 16px 0;" />
          <p><strong>Message:</strong></p>
          <p style="background: #F6F3EC; padding: 16px; border-left: 3px solid #FF9500; line-height: 1.6;">
            ${message.replace(/\n/g, '<br/>')}
          </p>

          <hr style="border-color: #CBBBA0; margin: 16px 0;" />
          <p style="color: #888; font-size: 12px;">Submitted via the Landman consultation request form.</p>
        </div>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Contact POST error:', err)
    return NextResponse.json({ error: 'Failed to send message.' }, { status: 500 })
  }
}

