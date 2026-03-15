'use client'

import { useState } from 'react'
import { ArrowRight } from 'lucide-react'

export default function AuctionAlertForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')
    try {
      const res = await fetch('/api/auction-alerts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (res.ok) {
        setStatus('success')
      } else {
        const data = await res.json()
        setErrorMsg(data.error || 'Something went wrong. Please try again.')
        setStatus('error')
      }
    } catch {
      setErrorMsg('Something went wrong. Please try again.')
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <p className="text-offwhite text-base font-medium">
        You&apos;re on the list! We&apos;ll notify you of upcoming auctions.
      </p>
    )
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 border border-offwhite/20 bg-white/10 text-offwhite placeholder-offwhite/40 px-4 py-3 text-sm focus:outline-none focus:border-sunset transition-colors"
          placeholder="your@email.com"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="inline-flex items-center justify-center gap-2 bg-sunset text-white font-semibold text-sm tracking-[0.08em] uppercase px-6 py-3 hover:bg-[#e08600] transition-colors duration-200 disabled:opacity-60 whitespace-nowrap"
        >
          {status === 'loading' ? 'Signing up...' : 'Get Auction Alerts'}
          {status !== 'loading' && <ArrowRight className="w-4 h-4" />}
        </button>
      </form>
      {status === 'error' && errorMsg && (
        <p className="text-red-400 text-sm mt-3 max-w-md mx-auto">{errorMsg}</p>
      )}
    </div>
  )
}
