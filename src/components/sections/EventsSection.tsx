import { useEffect, useState } from 'react'
import { ArrowLeft, ArrowRight, CalendarDays, MapPin } from 'lucide-react'
import { FormattedMessage, useIntl } from 'react-intl'
import { Container } from '@/components/layout/Container'
import { Button } from '@/components/ui/button'
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from '@/components/ui/carousel'
import { cn } from '@/lib/utils'

const items = [
  { id: 1, image: '/imgs/services/strategic-consulting.webp' },
  { id: 2, image: '/imgs/services/content-production.webp' },
  { id: 3, image: '/imgs/services/brand-identity.webp' },
  { id: 4, image: '/imgs/services/ad-campaigns.webp' },
  { id: 5, image: '/imgs/services/digital-platforms.webp' },
] as const

export const EventsSection = () => {
  const intl = useIntl()
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
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-2xl text-start">
            <p className="text-base font-semibold tracking-[0.28em] text-secondary-600 uppercase sm:text-lg">
              <FormattedMessage id="events.kicker" />
            </p>
            <h2 className="mt-3 text-4xl font-semibold text-primary sm:text-5xl">
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
          opts={{ align: 'start', loop: true, direction: 'rtl' }}
          className="mt-10"
        >
          <CarouselContent className="py-4 pe-4 *:data-[slot=carousel-item]:basis-auto">
            {items.map((item) => (
            <CarouselItem
              key={item.id}
              className="group basis-full md:basis-1/2 lg:basis-1/3!"
            >
              <div className="overflow-hidden rounded-[30px] border border-primary-100 bg-white ">
                <div className="relative aspect-[1.05/0.88] overflow-hidden">
                  <img
                    src={item.image}
                    alt={intl.formatMessage({ id: `events.item${item.id}.title` })}
                    className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-black/10" />

                  <div className="absolute inset-x-4 top-4 flex items-start justify-between gap-3 text-white">
                    <div className="rounded-full bg-black/30 px-3 py-1 text-xs font-medium backdrop-blur-sm">
                      <FormattedMessage id="events.kicker" />
                    </div>
                    <div className="inline-flex items-center gap-1.5 rounded-full bg-[#f7b500] px-2.5 py-1 text-xs font-semibold text-primary">
                      <CalendarDays className="h-3.5 w-3.5" />
                      <span className="max-w-36 truncate">
                        <FormattedMessage id={`events.item${item.id}.meta`} />
                      </span>
                    </div>
                  </div>

                  <div className="absolute inset-x-4 bottom-4 flex items-center justify-between gap-4 text-white">
                    <div className="flex items-center gap-1.5 text-xs text-white/85">
                      <MapPin className="h-3.5 w-3.5" />
                      <span className="truncate">
                        <FormattedMessage id={`events.item${item.id}.meta`} />
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      {items.map(({ id }) => (
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

                <div className="space-y-3 px-5 py-4 text-start">
                  <h3 className="line-clamp-2 text-lg font-semibold text-primary">
                    <FormattedMessage id={`events.item${item.id}.title`} />
                  </h3>
                  <p className="line-clamp-2 text-sm leading-6 text-tertiary-600">
                    <FormattedMessage id={`events.item${item.id}.body`} />
                  </p>
                  <Button
                    type="button"
                    className="h-auto mt-4  rounded-full bg-secondary! flex items-center gap-5 py-1.5 ps-4 pe-2 text-xs font-semibold text-white hover:brightness-110"
                  >
                    <FormattedMessage id="events.cta" />
                    <span className="flex size-6 items-center justify-center rounded-full bg-white">
                      <ArrowRight className="size-3 rtl:-rotate-135 ltr:-rotate-45 text-secondary!" />
                    </span>
                  </Button>
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