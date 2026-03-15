import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sell Your Land at Auction | North Texas Land Auctions',
  description:
    'Ready to sell your Texas land, farm, or ranch? Craig Meier delivers maximum value through competitive auction \u2014 faster timelines, broader buyer reach, and no lowball offers.',
}

export default function SellLayout({ children }: { children: React.ReactNode }) {
  return children
}
