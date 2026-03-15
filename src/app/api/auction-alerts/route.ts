import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase/server'
import { resend } from '@/lib/resend'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { email } = body

    if (!email) {
      return NextResponse.json({ error: 'Email is required.' }, { status: 400 })
    }

    // Save email to auction_alerts table
    const { error: dbError } = await supabaseAdmin
      .from('auction_alerts')
      .insert({ email: email.toLowerCase().trim() })

    if (dbError) {
      // Unique constraint violation — email already signed up
      if (dbError.code === '23505') {
        return NextResponse.json(
          { error: 'This email is already signed up for auction alerts.' },
          { status: 409 }
        )
      }
      console.error('Supabase insert error:', dbError)
      return NextResponse.json(
        { error: 'Failed to save your signup. Please try again.' },
        { status: 500 }
      )
    }

    // Send confirmation email to subscriber
    await resend.emails.send({
      from: 'Landman Auctions <noreply@landman.com>',
      to: email,
      subject: "You're signed up for Landman Auction Alerts",
      html: `
        <div style="font-family: sans-serif; color: #333; max-width: 600px; border: 1px solid #e0d8cc; padding: 32px;">
          <h2 style="color: #4B3A2A; font-family: Georgia, serif; margin-top: 0;">
            You're on the list.
          </h2>
          <p style="color: #555; line-height: 1.6;">
            Thanks for signing up for Landman Auction Alerts. We'll notify you as soon as
            new properties hit the auction block in North Texas.
          </p>
          <p style="color: #555; line-height: 1.6;">
            In the meantime, browse our current listings at
            <a href="https://landmanauctions.com/find-a-property" style="color: #A86A3D;">
              landmanauctions.com/find-a-property
            </a>.
          </p>
          <hr style="border-color: #CBBBA0; margin: 24px 0;" />
          <p style="color: #888; font-size: 12px;">
            You're receiving this because you signed up at landmanauctions.com.
            To unsubscribe, reply to this email with "unsubscribe."
          </p>
        </div>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Auction alerts POST error:', err)
    return NextResponse.json(
      { error: 'Failed to process your signup.' },
      { status: 500 }
    )
  }
}
