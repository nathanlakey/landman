'use client'

import { useState, useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import Image from 'next/image'
import { ZoomIn } from 'lucide-react'

interface Props {
  images: string[]
  title: string
}

const BTN_BASE: React.CSSProperties = {
  position: 'fixed',
  zIndex: 10001,
  width: '44px',
  height: '44px',
  borderRadius: '50%',
  background: 'rgba(0,0,0,0.7)',
  color: 'white',
  fontSize: '22px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  border: '2px solid rgba(255,255,255,0.3)',
  userSelect: 'none' as const,
}

const NAV_BTN: React.CSSProperties = {
  ...BTN_BASE,
  width: '48px',
  height: '48px',
  top: '50%',
  transform: 'translateY(-50%)',
}

export default function PhotoGallery({ images, title }: Props) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  const close = useCallback(() => setLightboxIndex(null), [])

  const prev = useCallback(() =>
    setLightboxIndex((i) => (i === null ? null : (i - 1 + images.length) % images.length)),
    [images.length]
  )

  const next = useCallback(() =>
    setLightboxIndex((i) => (i === null ? null : (i + 1) % images.length)),
    [images.length]
  )

  useEffect(() => {
    if (lightboxIndex === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [lightboxIndex, close, prev, next])

  if (images.length === 0) return null

  const lightboxPortal =
    mounted && lightboxIndex !== null
      ? createPortal(
          <div
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 9999,
              backgroundColor: 'rgba(0,0,0,0.92)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onClick={close}
            role="dialog"
            aria-modal="true"
            aria-label="Photo lightbox"
          >
            {/* ── CLOSE ── */}
            <button
              onClick={(e) => { e.stopPropagation(); close() }}
              aria-label="Close lightbox"
              style={{ ...BTN_BASE, top: '16px', right: '16px' }}
              onMouseEnter={(e) => { e.currentTarget.style.background = '#D4A843' }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(0,0,0,0.7)' }}
            >
              ✕
            </button>

            {/* ── PREV ── */}
            {images.length > 1 && (
              <button
                onClick={(e) => { e.stopPropagation(); prev() }}
                aria-label="Previous photo"
                style={{ ...NAV_BTN, left: '16px' }}
                onMouseEnter={(e) => { e.currentTarget.style.background = '#D4A843' }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(0,0,0,0.7)' }}
              >
                ‹
              </button>
            )}

            {/* ── NEXT ── */}
            {images.length > 1 && (
              <button
                onClick={(e) => { e.stopPropagation(); next() }}
                aria-label="Next photo"
                style={{ ...NAV_BTN, right: '16px' }}
                onMouseEnter={(e) => { e.currentTarget.style.background = '#D4A843' }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(0,0,0,0.7)' }}
              >
                ›
              </button>
            )}

            {/* ── MAIN IMAGE ── */}
            <div
              style={{ position: 'relative', flexShrink: 0, width: '90vw', height: '78vh' }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={images[lightboxIndex]}
                alt={`${title} photo ${lightboxIndex + 1}`}
                fill
                className="object-contain"
                sizes="90vw"
                priority
                style={{ boxShadow: '0 0 0 1px rgba(255,255,255,0.06), 0 8px 40px rgba(0,0,0,0.7)' }}
              />
            </div>

            {/* ── COUNTER ── */}
            <div
              style={{
                marginTop: '16px',
                color: 'rgba(255,255,255,0.5)',
                fontSize: '12px',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                userSelect: 'none',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {lightboxIndex + 1} / {images.length}
            </div>

            {/* ── THUMBNAIL STRIP ── */}
            {images.length > 1 && (
              <div
                style={{
                  display: 'flex',
                  gap: '8px',
                  marginTop: '12px',
                  overflowX: 'auto',
                  maxWidth: '90vw',
                  paddingBottom: '16px',
                  paddingLeft: '4px',
                  paddingRight: '4px',
                }}
                onClick={(e) => e.stopPropagation()}
              >
                {images.map((src, i) => (
                  <button
                    key={i}
                    onClick={() => setLightboxIndex(i)}
                    aria-label={`Go to photo ${i + 1}`}
                    style={{
                      position: 'relative',
                      flexShrink: 0,
                      width: '56px',
                      height: '40px',
                      overflow: 'hidden',
                      outline: i === lightboxIndex ? '2px solid #D4A843' : 'none',
                      opacity: i === lightboxIndex ? 1 : 0.35,
                      transition: 'opacity 0.2s',
                      cursor: 'pointer',
                      border: 'none',
                      padding: 0,
                      background: 'none',
                    }}
                    onMouseEnter={(e) => { if (i !== lightboxIndex) e.currentTarget.style.opacity = '0.7' }}
                    onMouseLeave={(e) => { if (i !== lightboxIndex) e.currentTarget.style.opacity = '0.35' }}
                  >
                    <Image
                      src={src}
                      alt={`Thumbnail ${i + 1}`}
                      fill
                      className="object-cover"
                      sizes="56px"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>,
          document.body
        )
      : null

  return (
    <>
      {/* ── THUMBNAIL GRID ── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {images.map((src, i) => (
          <button
            key={i}
            onClick={() => setLightboxIndex(i)}
            className="relative aspect-[4/3] overflow-hidden group cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-sunset"
            aria-label={`Open photo ${i + 1} of ${images.length}`}
          >
            <Image
              src={src}
              alt={`${title} photo ${i + 1}`}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
              <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-lg" />
            </div>
          </button>
        ))}
      </div>

      {lightboxPortal}
    </>
  )
}
