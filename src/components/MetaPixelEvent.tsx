'use client'

import { useEffect } from 'react'

type FbqEvent =
  | 'ViewContent'
  | 'Lead'
  | 'Contact'
  | 'CompleteRegistration'
  | 'Search'

interface MetaPixelEventProps {
  event: FbqEvent
  /**
   * Optional custom parameters to send with the event
   * (e.g. content_name, content_category, value, currency).
   */
  params?: Record<string, unknown>
}

/**
 * Fires a Meta Pixel standard event once on mount.
 * Use this from server components to trigger client-side tracking.
 */
export default function MetaPixelEvent({ event, params }: MetaPixelEventProps) {
  useEffect(() => {
    if (typeof window !== 'undefined' && window.fbq) {
      if (params) {
        window.fbq('track', event, params)
      } else {
        window.fbq('track', event)
      }
    }
  }, [event, params])

  return null
}
