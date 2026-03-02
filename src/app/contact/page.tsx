import type { Metadata } from 'next'
import ContactClient from './ContactClient'

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Contact Landman to buy or sell Texas ranch and land properties.',
}

export default function ContactPage() {
  return <ContactClient />
}
