'use client'

import { useEffect, useState } from 'react'
import { Clock } from 'lucide-react'

interface Props {
  auctionDate: string
}

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

function getTimeLeft(target: string): TimeLeft | null {
  const diff = new Date(target).getTime() - Date.now()
  if (diff <= 0) return null
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  }
}

export default function AuctionCountdown({ auctionDate }: Props) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null)

  useEffect(() => {
    setTimeLeft(getTimeLeft(auctionDate))
    const id = setInterval(() => setTimeLeft(getTimeLeft(auctionDate)), 1000)
    return () => clearInterval(id)
  }, [auctionDate])

  if (!timeLeft) return null

  const units = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Min', value: timeLeft.minutes },
    { label: 'Sec', value: timeLeft.seconds },
  ]

  return (
    <div className="border border-sunset/25 bg-sunset/5 p-5">
      <p className="text-sunset text-xs tracking-[0.2em] uppercase font-medium flex items-center gap-2 mb-4">
        <Clock className="w-3.5 h-3.5" /> Auction Countdown
      </p>
      <div className="flex gap-4">
        {units.map(({ label, value }) => (
          <div key={label} className="text-center">
            <p className="font-serif text-3xl text-offwhite tabular-nums leading-none">
              {String(value).padStart(2, '0')}
            </p>
            <p className="text-offwhite/40 text-xs tracking-widest uppercase mt-1">{label}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
