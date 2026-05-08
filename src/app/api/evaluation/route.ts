import { NextRequest, NextResponse } from 'next/server'
import { resend } from '@/lib/resend'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, phone, email, propertyType, location, acreage, message } = body

    if (!name || !phone || !location) {
      return NextResponse.json(
        { error: 'Name, phone, and location are required.' },
        { status: 400 }
      )
    }

    const adminEmail = process.env.ADMIN_EMAIL
    if (!adminEmail) {
      console.error('ADMIN_EMAIL is not set')
      return NextResponse.json({ error: 'Server configuration error.' }, { status: 500 })
    }

    await resend.emails.send({
      from: 'Landman Auctions <onboarding@resend.dev>',
      to: adminEmail,
      subject: `New Property Evaluation Request from ${name}${propertyType ? ` — ${propertyType}` : ''}`,
      html: `
        <div style="font-family: sans-serif; color: #333; max-width: 600px; border: 1px solid #e0d8cc; padding: 32px;">
          <h2 style="color: #4B3A2A; font-family: Georgia, serif; margin-top: 0;">
            New Property Evaluation Request — Landman
          </h2>
          <hr style="border-color: #CBBBA0; margin: 16px 0;" />

          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Phone:</strong> <a href="tel:${phone}" style="color: #A86A3D;">${phone}</a></p>
          ${email ? `<p><strong>Email:</strong> <a href="mailto:${email}" style="color: #A86A3D;">${email}</a></p>` : ''}
          ${propertyType ? `<p><strong>Property Type:</strong> ${propertyType}</p>` : ''}
          <p><strong>Property Location:</strong> ${location}</p>
          ${acreage ? `<p><strong>Approximate Acreage:</strong> ${acreage}</p>` : ''}

          ${message ? `
          <hr style="border-color: #CBBBA0; margin: 16px 0;" />
          <p><strong>Additional Details:</strong></p>
          <p style="background: #F6F3EC; padding: 16px; border-left: 3px solid #FF9500; line-height: 1.6;">
            ${message.replace(/\n/g, '<br/>')}
          </p>` : ''}

          <hr style="border-color: #CBBBA0; margin: 16px 0;" />
          <p style="color: #888; font-size: 12px;">
            Submitted via the Landman free property evaluation form.
          </p>
        </div>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Evaluation POST error:', err)
    return NextResponse.json(
      { error: 'Failed to submit evaluation request.' },
      { status: 500 }
    )
  }
}
