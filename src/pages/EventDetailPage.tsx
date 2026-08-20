import { useEffect, useState } from 'react'
import { FormattedMessage } from 'react-intl'
import { Link, useLocation, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, CalendarDays, MapPin } from 'lucide-react'
import { Container } from '@/components/layout/Container'
import { EventMediaCarousel } from '@/components/EventMediaCarousel'
import { DEFAULT_LOCALE, type Locale } from '@/i18n/locales'
import { getLocalizedPath } from '@/i18n/navigation'
import { fetchEventContent, type EventContent } from '@/lib/content'

export const EventDetailPage = () => {
  const { slug: id } = useParams()
  const { pathname } = useLocation()
  const locale: Locale = pathname.startsWith('/en') ? 'en' : DEFAULT_LOCALE

  const [event, setEvent] = useState<EventContent | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const eventsHome = `${getLocalizedPath('/', locale)}#events`

  useEffect(() => {
    if (!id) {
      setEvent(null)
      setIsLoading(false)
      return
    }

    let cancelled = false
    setIsLoading(true)

    fetchEventContent(id)
      .then((data) => {
        if (cancelled) return
        setEvent(data)
      })
      .catch((error) => {
        console.error('Error fetching event:', error)
        if (!cancelled) setEvent(null)
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [id, locale])

  if (isLoading) {
    return <Container className="py-20">{null}</Container>
  }

  if (!event) {
    return (
      <Container className="py-20 text-center">
        <h1 className="text-3xl text-primary">
          <FormattedMessage id="events.notFound" />
        </h1>
        <Link to={eventsHome} className="mt-4 inline-flex text-secondary-600" viewTransition={true}>
          <FormattedMessage id="events.back" />
        </Link>
      </Container>
    )
  }

  const coverMedia = event.image_url
    ? [
        {
          id: -1,
          event_id: event.id,
          type: 'image' as const,
          description: null,
          video_url: null,
          file_url: event.image_url,
          thumb_url: event.thumb_url || event.image_url,
          files: [],
          order: -1,
          lang: event.lang,
        },
      ]
    : []
  const galleryMedia = [...coverMedia, ...(event.media ?? [])]

  return (
    <Container className="py-20">
      <Link
        to={eventsHome}
        className="my-8 inline-flex items-center gap-2 text-sm font-semibold text-secondary-600 hover:text-primary"
        viewTransition={true}
      >
        <ArrowLeft className="size-4 rtl:rotate-180" />
        <FormattedMessage id="events.back" />
      </Link>

      <section className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <article className="text-start">

          <div className="mt-5 flex flex-wrap items-center gap-3 text-sm font-medium text-tertiary-700">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#f7b500] px-3 py-1 text-primary">
              <CalendarDays className="h-4 w-4" />
              {event.event_date}
            </span>
            {event.location && (
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-4 w-4 text-secondary-600" />
                {event.location}
              </span>
            )}
          </div>
          <h1 className="mt-4 text-4xl font-semibold text-[#0C0A28] sm:text-5xl">{event.title}</h1>


          {event.description && (
            <p className="mt-5 text-lg leading-8 text-tertiary-600">{event.description}</p>
          )}

          {event.cta_url && (
            <a
              href={event.cta_url}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex items-center gap-3 rounded-full bg-secondary py-2.5 ps-5 pe-2.5 text-sm font-semibold text-white transition hover:brightness-110"
            >
              <FormattedMessage id="events.cta" />
              <span className="flex size-7 items-center justify-center rounded-full bg-white">
                <ArrowRight className="size-3.5 rtl:-rotate-135 ltr:-rotate-45 text-secondary!" />
              </span>
            </a>
          )}
        </article>

        <div className="overflow-hidden rounded-[32px] border border-primary-100 bg-white shadow-[0_22px_60px_rgba(12,10,40,0.08)]">
          <EventMediaCarousel media={galleryMedia} fallbackImage={event.image_url} title={event.title} />
        </div>
      </section>

      {galleryMedia.length > 1 && (
        <section className="mt-16">
          <h2 className="text-2xl font-semibold text-[#0C0A28]">
            <FormattedMessage id="events.detail.overview" />
          </h2>
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {galleryMedia.map((item) => (
              <div
                key={item.id}
                className="relative aspect-square overflow-hidden rounded-[20px] border border-primary-100 bg-white shadow-[0_12px_30px_rgba(12,10,40,0.06)]"
              >
                {item.type === 'video' ? (
                  <video
                    src={item.file_url}
                    poster={item.thumb_url}
                    className="h-full w-full object-cover"
                    muted
                    loop
                    playsInline
                    autoPlay
                  />
                ) : (
                  <img
                    src={item.thumb_url || item.file_url}
                    alt={event.title}
                    className="h-full w-full object-cover"
                  />
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="mt-16 rounded-[32px] border border-primary-100 bg-primary p-8 text-white shadow-[0_24px_60px_rgba(12,10,40,0.16)] sm:p-10">
        <h2 className="text-2xl font-semibold text-white!">
          <FormattedMessage id="events.detail.ctaTitle" />
        </h2>
        <p className="mt-3 max-w-3xl text-primary-100">
          <FormattedMessage id="events.detail.ctaBody" />
        </p>
        <Link
          to={eventsHome}
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-secondary px-5 py-3 text-sm font-semibold text-white transition hover:brightness-110"
          viewTransition={true}
        >
          <FormattedMessage id="events.detail.ctaButton" />
          <ArrowRight className="h-4 w-4 rtl:rotate-180" />
        </Link>
      </section>
    </Container>
  )
}
