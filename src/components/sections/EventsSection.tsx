import { useEffect, useState } from 'react'
import { ArrowLeft, ArrowRight, CalendarDays, MapPin } from 'lucide-react'
import { FormattedMessage, useIntl } from 'react-intl'
import { Link, useLocation } from 'react-router-dom'
import { Container } from '@/components/layout/Container'
import { Button } from '@/components/ui/button'
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from '@/components/ui/carousel'
import { DEFAULT_LOCALE, type Locale } from '@/i18n/locales'
import { fetchEventsContent, type EventContent } from '@/lib/content';
import { EventMediaCarousel } from '../EventMediaCarousel';

export const EventsSection = () => {
  const intl = useIntl()
  const { pathname } = useLocation()
  const locale: Locale = pathname.startsWith('/en') ? 'en' : DEFAULT_LOCALE
  const [api, setApi] = useState<CarouselApi>()
  const isArabic = intl.locale.startsWith('ar')
  const [events, setEvents] = useState<EventContent[]>([])

  useEffect(() => {
    if (!api) return

    const intervalId = window.setInterval(() => {
      if (api.canScrollNext()) {
        api.scrollNext()
      } else {
        api.scrollTo(0)
      }
    }, 2500)

    return () => window.clearInterval(intervalId)
  }, [api])

  useEffect(() => {
    console.log("Events useEffect started");
  
    fetchEventsContent()
      .then((data) => {
        setEvents(data ?? []);
      })
      .catch((error) => {
        console.error("EVENTS ERROR:", error);
      });
  }, [locale]);

  return (
    events.length > 0 ? (

    
    <section id="events" className="scroll-mt-24 py-18">
      <Container>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
          <div className="max-w-2xl text-start">
            <p className="text-sm font-semibold tracking-[0.28em] text-secondary-600 uppercase sm:text-base lg:text-lg">
              <FormattedMessage id="events.kicker" />
            </p>
            <h2 className="mt-2 text-3xl font-semibold text-[#0C0A28] sm:mt-3 sm:text-4xl lg:text-5xl">
              <FormattedMessage id="events.title" />
            </h2>
          </div>

          <div className="flex items-center gap-2 self-start">
            {isArabic ? (
              <>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="h-10 w-10 rounded-full border-primary-200 bg-white text-primary hover:bg-primary-50"
                  onClick={() => api?.scrollNext()}
                >
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="h-10 w-10 rounded-full border-primary-200 bg-white text-primary hover:bg-primary-50"
                  onClick={() => api?.scrollPrev()}
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </>
            ) : (
              <>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="h-10 w-10 rounded-full border-primary-200 bg-white text-primary hover:bg-primary-50"
                  onClick={() => api?.scrollPrev()}
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="h-10 w-10 rounded-full border-primary-200 bg-white text-primary hover:bg-primary-50"
                  onClick={() => api?.scrollNext()}
                >
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </>
            )}
          </div>
        </div>

        <Carousel
          setApi={setApi}
          opts={{
            align: 'start',
            loop: true,
            direction: isArabic ? 'rtl' : 'ltr',
            containScroll: 'trimSnaps',
          }}
          className="mt-10 w-full overflow-hidden"
        >
          <CarouselContent className="ml-0 py-3 -ms-4 sm:py-4">
            {events.map((item) => (
            <CarouselItem
              key={item.id}
              className="group min-w-0 max-w-full basis-full rtl:pl-0! ps-4 sm:basis-full md:basis-1/2 lg:basis-1/3"
            >
              <div className="flex h-full min-w-0 flex-col overflow-hidden rounded-[24px] border border-primary-100 bg-white sm:rounded-[30px]">
              <div className="relative">
  <EventMediaCarousel
    media={item.media}
    fallbackImage={item.thumb_url}
    title={item.title}
  />

  {/* Event info */}
  <div className="pointer-events-none absolute inset-x-3 top-3 z-20 flex flex-wrap items-start justify-between gap-2 text-white sm:inset-x-4 sm:top-4">
    <div className="rounded-full bg-black/30 px-2.5 py-1 text-[11px] font-medium backdrop-blur-sm sm:px-3 sm:text-xs">
      <FormattedMessage id="events.kicker" />
    </div>

    <div className="inline-flex max-w-full items-center gap-1.5 rounded-full bg-[#f7b500] px-2 py-1 text-[11px] font-semibold text-primary sm:px-2.5 sm:text-xs">
      <CalendarDays className="h-3.5 w-3.5 shrink-0" />

      <span className="max-w-28 truncate sm:max-w-36">
        {item.event_date } . {item.location}
      </span>
    </div>
  </div>

  <div className="pointer-events-none absolute inset-x-3 bottom-3 z-20 flex items-center gap-2 text-white sm:inset-x-4 sm:bottom-4">
    <div className="flex min-w-0 items-center gap-1.5 text-[11px] text-white/85 sm:text-xs">
      <MapPin className="h-3.5 w-3.5 shrink-0" />

      <span className="truncate">
        {item.location } . {item.event_date}
      </span>
    </div>
  </div>
</div>

                <div className="flex flex-1 flex-col space-y-3 px-4 py-4 text-start sm:px-5">
                  <h3 className="line-clamp-2 text-base font-semibold text-primary sm:text-lg">
                    {item.title}
                  </h3>
                  <p className="line-clamp-2 flex-1 text-sm leading-6 text-tertiary-600">
                    {item.description}
                  </p>
                  <Link
                    to={`/events/${item?.id}`}
                    className="mt-6 flex h-auto w-fit items-center gap-3 rounded-full bg-secondary! py-1.5 ps-4 pe-2 text-xs font-semibold text-white hover:brightness-110 sm:gap-5"
                    viewTransition={true}
                  >
                    <FormattedMessage id="events.cta" />
                    <span className="flex size-6 items-center justify-center rounded-full bg-white">
                      <ArrowRight className="size-3 rtl:-rotate-135 ltr:-rotate-45 text-secondary!" />
                    </span>
                  </Link>
                </div>
              </div>
            </CarouselItem>
          ))}
          </CarouselContent>
        </Carousel>
      </Container>
    </section>
    ):
    null
  )
}