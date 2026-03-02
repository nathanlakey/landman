'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@clerk/nextjs'
import { Heart } from 'lucide-react'

interface FavoriteButtonProps {
  listingId: string
}

export default function FavoriteButton({ listingId }: FavoriteButtonProps) {
  const { isSignedIn } = useAuth()
  const [isFavorited, setIsFavorited] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!isSignedIn) return
    const check = async () => {
      const res = await fetch(`/api/favorites?listing_id=${listingId}`)
      if (res.ok) {
        const data = await res.json()
        setIsFavorited(data.favorited)
      }
    }
    check()
  }, [isSignedIn, listingId])

  const toggle = async () => {
    if (!isSignedIn) {
      // Redirect to sign-in
      window.location.href = '/sign-in'
      return
    }

    setLoading(true)
    try {
      if (isFavorited) {
        await fetch('/api/favorites', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ listing_id: listingId }),
        })
        setIsFavorited(false)
      } else {
        await fetch('/api/favorites', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ listing_id: listingId }),
        })
        setIsFavorited(true)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={toggle}
      disabled={loading}
      className={`flex items-center gap-2 px-4 py-2.5 border text-sm font-medium transition-colors disabled:opacity-60 ${
        isFavorited
          ? 'border-brand-tan bg-brand-tan/10 text-brand-tan'
          : 'border-brand-tan/30 text-brand-off-white/60 hover:border-brand-tan hover:text-brand-tan'
      }`}
      aria-label={isFavorited ? 'Remove from saved' : 'Save property'}
    >
      <Heart className={`w-4 h-4 ${isFavorited ? 'fill-brand-tan' : ''}`} />
      {isFavorited ? 'Saved' : 'Save Property'}
    </button>
  )
}
