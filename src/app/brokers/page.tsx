import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'For Brokers | Landman Auctions',
  description: 'Partner with Landman Auctions. Information for real estate brokers looking to collaborate on Texas land auctions.',
}

export default function BrokersPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <h1 className="font-cormorant text-5xl md:text-6xl font-light text-[#201E3D] mb-6">
        For Brokers
      </h1>
      <p className="text-[#201E3D]/70 text-lg max-w-xl mb-10">
        Broker partnership information is coming soon. If you&apos;re a real estate professional interested in collaborating, we&apos;d love to hear from you.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          href="/contact"
          className="bg-[#FF9500] text-white text-[12px] tracking-[0.07em] uppercase font-medium px-6 py-3 hover:bg-[#e08600] transition-all duration-200"
        >
          Get in Touch
        </Link>
        <Link
          href="/about"
          className="border border-[#201E3D] text-[#201E3D] text-[12px] tracking-[0.07em] uppercase font-medium px-6 py-3 hover:bg-[#201E3D] hover:text-white transition-all duration-200"
        >
          About Us
        </Link>
      </div>
    </div>
  )
}
