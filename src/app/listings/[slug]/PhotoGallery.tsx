'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react'

interface Props {
  images: string[]
  title: string
}

export default function PhotoGallery({ images, title }: Props) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

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

      {/* ── LIGHTBOX ── */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
          style={{ backgroundColor: 'rgba(0,0,0,0.92)' }}
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label="Photo lightbox"
        >
          {/* Close — fixed top-right */}
          <button
            onClick={(e) => { e.stopPropagation(); close() }}
            aria-label="Close lightbox"
            style={{ fontSize: '20px' }}
            className="fixed top-4 right-4 z-[10000] w-11 h-11 rounded-full bg-black/60 flex items-center justify-center text-white hover:bg-[#D4A843] transition-colors"
          >
            ✕
          </button>

          {/* Prev arrow */}
          {images.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); prev() }}
              aria-label="Previous photo"
              className="fixed left-4 top-1/2 -translate-y-1/2 z-[10000] w-12 h-12 rounded-full bg-black/60 flex items-center justify-center text-white hover:text-[#D4A843] transition-colors"
            >
              <ChevronLeft className="w-7 h-7" />
            </button>
          )}

          {/* Next arrow */}
          {images.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); next() }}
              aria-label="Next photo"
              className="fixed right-4 top-1/2 -translate-y-1/2 z-[10000] w-12 h-12 rounded-full bg-black/60 flex items-center justify-center text-white hover:text-[#D4A843] transition-colors"
            >
              <ChevronRight className="w-7 h-7" />
            </button>
          )}

          {/* Main image */}
          <div
            className="relative flex-shrink-0"
            style={{ width: '90vw', height: '78vh' }}
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

          {/* Counter */}
          <div
            className="mt-4 text-white/50 text-xs tracking-widest uppercase select-none"
            onClick={(e) => e.stopPropagation()}
          >
            {lightboxIndex + 1} / {images.length}
          </div>

          {/* Thumbnail strip */}
          {images.length > 1 && (
            <div
              className="flex gap-2 mt-3 overflow-x-auto max-w-[90vw] pb-4 px-1"
              onClick={(e) => e.stopPropagation()}
            >
              {images.map((src, i) => (
                <button
                  key={i}
                  onClick={() => setLightboxIndex(i)}
                  aria-label={`Go to photo ${i + 1}`}
                  className={`relative shrink-0 w-14 h-10 overflow-hidden transition-all duration-200 focus:outline-none ${
                    i === lightboxIndex
                      ? 'ring-2 ring-[#D4A843] opacity-100'
                      : 'opacity-35 hover:opacity-70'
                  }`}
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
        </div>
      )}
    </>
  )
}
