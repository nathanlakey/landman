import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Buying at Auction | Landman Auctions',
  description: 'Learn how to buy land at auction with Landman Auctions. Find upcoming Texas land auctions and bid with confidence.',
}

export default function BuyingPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <h1 className="font-cormorant text-5xl md:text-6xl font-light text-[#201E3D] mb-6">
        Buying at Auction
      </h1>
      <p className="text-[#201E3D]/70 text-lg max-w-xl mb-10">
        Information for buyers is coming soon. In the meantime, browse current listings or reach out with any questions.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          href="/find-a-property"
          className="bg-[#FF9500] text-white text-[12px] tracking-[0.07em] uppercase font-medium px-6 py-3 hover:bg-[#e08600] transition-all duration-200"
        >
          Browse Listings
        </Link>
        <Link
          href="/contact"
          className="border border-[#201E3D] text-[#201E3D] text-[12px] tracking-[0.07em] uppercase font-medium px-6 py-3 hover:bg-[#201E3D] hover:text-white transition-all duration-200"
        >
          Contact Us
        </Link>
      </div>
    </div>
  )
}
