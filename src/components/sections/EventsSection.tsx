import { useEffect, useState } from 'react'
import { ArrowLeft, ArrowRight, CalendarDays, MapPin } from 'lucide-react'
import { FormattedMessage, useIntl } from 'react-intl'
import { Link, useLocation } from 'react-router-dom'
import { Container } from '@/components/layout/Container'
import { Button } from '@/components/ui/button'
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from '@/components/ui/carousel'
import { events } from '@/data/events'
import { DEFAULT_LOCALE, type Locale } from '@/i18n/locales'
import { getLocalizedPath } from '@/i18n/navigation'
import { cn } from '@/lib/utils'

export const EventsSection = () => {
  const intl = useIntl()
  const { pathname } = useLocation()
  const locale: Locale = pathname.startsWith('/en') ? 'en' : DEFAULT_LOCALE
  const [api, setApi] = useState<CarouselApi>()
  const isArabic = intl.locale.startsWith('ar')

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

  return (
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
              className="group min-w-0 max-w-full basis-full pl-0! ps-4 sm:basis-full md:basis-1/2 lg:basis-1/3"
            >
              <div className="flex h-full min-w-0 flex-col overflow-hidden rounded-[24px] border border-primary-100 bg-white sm:rounded-[30px]">
                <div className="relative aspect-4/3 w-full overflow-hidden sm:aspect-5/4">
                  <img
                    src={item.image}
                    alt={intl.formatMessage({ id: item.titleKey })}
                    className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-black/10" />

                  <div className="absolute inset-x-3 top-3 flex flex-wrap items-start justify-between gap-2 text-white sm:inset-x-4 sm:top-4">
                    <div className="rounded-full bg-black/30 px-2.5 py-1 text-[11px] font-medium backdrop-blur-sm sm:px-3 sm:text-xs">
                      <FormattedMessage id="events.kicker" />
                    </div>
                    <div className="inline-flex max-w-full items-center gap-1.5 rounded-full bg-[#f7b500] px-2 py-1 text-[11px] font-semibold text-primary sm:px-2.5 sm:text-xs">
                      <CalendarDays className="h-3.5 w-3.5 shrink-0" />
                      <span className="max-w-28 truncate sm:max-w-36">
                        <FormattedMessage id={item.metaKey} />
                      </span>
                    </div>
                  </div>

                  <div className="absolute inset-x-3 bottom-3 flex items-center justify-between gap-2 text-white sm:inset-x-4 sm:bottom-4 sm:gap-4">
                    <div className="flex min-w-0 items-center gap-1.5 text-[11px] text-white/85 sm:text-xs">
                      <MapPin className="h-3.5 w-3.5 shrink-0" />
                      <span className="truncate">
                        <FormattedMessage id={item.metaKey} />
                      </span>
                    </div>
                    <div className="hidden items-center gap-1.5 sm:flex">
                      {events.map(({ id }) => (
                        <span
                          key={id}
                          className={cn(
                            'h-1.5 rounded-full bg-white/55 transition-all',
                            id === item.id ? 'w-5 bg-white' : 'w-1.5'
                          )}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex flex-1 flex-col space-y-3 px-4 py-4 text-start sm:px-5">
                  <h3 className="line-clamp-2 text-base font-semibold text-primary sm:text-lg">
                    <FormattedMessage id={item.titleKey} />
                  </h3>
                  <p className="line-clamp-2 flex-1 text-sm leading-6 text-tertiary-600">
                    <FormattedMessage id={item.bodyKey} />
                  </p>
                  <Link
                    to={getLocalizedPath(`/events/${item.slug}`, locale)}
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
  )
}