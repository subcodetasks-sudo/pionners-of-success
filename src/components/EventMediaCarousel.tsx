import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

import { cn } from '@/lib/utils'
import type { EventMedia } from '@/lib/content'

interface EventMediaCarouselProps {
  media: EventMedia[]
  fallbackImage?: string
  title: string
}

export const EventMediaCarousel = ({
  media,
  fallbackImage,
  title,
}: EventMediaCarouselProps) => {
  const [activeIndex, setActiveIndex] = useState(0)

  const items = media?.length
    ? media
    : fallbackImage
      ? [
          {
            id: 0,
            type: 'image' as const,
            file_url: fallbackImage,
            thumb_url: fallbackImage,
          },
        ]
      : []

  if (!items.length) return null

  const current = items[activeIndex]

  const next = () => {
    setActiveIndex((prev) => (prev + 1) % items.length)
  }

  const prev = () => {
    setActiveIndex((prev) => (prev - 1 + items.length) % items.length)
  }

  return (
    <div className="relative aspect-4/3 w-full overflow-hidden sm:aspect-5/4">
      {current.type === 'video' ? (
        <video
          key={current.id}
          src={current.file_url}
          poster={current.thumb_url}
          controls
          playsInline
          autoPlay
          muted
          loop
          className="h-full w-full object-cover"
        />
      ) : (
        <img
          src={current.file_url}
          alt={title}
          className="h-full w-full object-cover"
        />
      )}

      {/* Navigation */}
      {items.length > 1 && (
        <>
          <button
            type="button"
            onClick={prev}
            className="absolute start-3 top-1/2 z-10 flex size-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition hover:bg-black/60"
          >
            <ChevronLeft className="size-4 rtl:rotate-180" />
          </button>

          <button
            type="button"
            onClick={next}
            className="absolute end-3 top-1/2 z-10 flex size-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition hover:bg-black/60"
          >
            <ChevronRight className="size-4 rtl:rotate-180" />
          </button>
        </>
      )}

      {/* Dots */}
      {items.length > 1 && (
        <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 items-center gap-1.5">
          {items.map((item, index) => (
            <button
              key={item.id}
              type="button"
              aria-label={`Go to media ${index + 1}`}
              onClick={() => setActiveIndex(index)}
              className={cn(
                'h-1.5 rounded-full bg-white/50 transition-all',
                index === activeIndex
                  ? 'w-5 bg-white'
                  : 'w-1.5 hover:bg-white/80'
              )}
            />
          ))}
        </div>
      )}

      {/* Gradient */}
      <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent" />
    </div>
  )
}