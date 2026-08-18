import { useEffect, useState } from 'react'
import { ArrowLeft, ArrowRight, Quote, Star } from 'lucide-react'
import { FormattedMessage, useIntl } from 'react-intl'
import { Container } from '@/components/layout/Container'
import { Button } from '@/components/ui/button'
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from '@/components/ui/carousel'
import { cn } from '@/lib/utils'

const items = [
  {
    id: 1,
    image: '/imgs/services/strategic-consulting.webp',
    initials: 'LH',
    avatarClassName: 'bg-secondary text-white',
  },
  {
    id: 2,
    image: '/imgs/services/content-production.webp',
    initials: 'OA',
    avatarClassName: 'bg-primary text-white',
  },
  {
    id: 3,
    image: '/imgs/services/digital-platforms.webp',
    initials: 'SN',
    avatarClassName: 'bg-amber-500 text-white',
  },
  {
    id: 1,
    image: '/imgs/services/brand-identity.webp',
    initials: 'LH',
    avatarClassName: 'bg-secondary text-white',
  },
  {
    id: 2,
    image: '/imgs/services/ad-campaigns.webp',
    initials: 'OA',
    avatarClassName: 'bg-primary text-white',
  },
] as const

export const FeedbackTextSection = () => {
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
    }, 3500)

    return () => window.clearInterval(intervalId)
  }, [api])

  return (
    <section id="feedback" className="scroll-mt-24 bg-white py-18">
      <Container>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
          <div className="mx-auto max-w-2xl text-center sm:mx-0 sm:text-start">
            <p className="text-sm font-semibold tracking-[0.28em] text-secondary-600 uppercase sm:text-base lg:text-lg">
              <FormattedMessage id="feedback.kicker" />
            </p>
            <h2 className="mt-2 text-3xl font-semibold text-primary sm:mt-3 sm:text-4xl lg:text-5xl">
              <FormattedMessage id="feedback.title" />
            </h2>
          </div>

          <div className="flex items-center justify-center gap-2 sm:self-start">
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
          <CarouselContent className="ml-0 py-6 -ms-4">
            {items.map((item, index) => (
              <CarouselItem
                key={`${item.id}-${index}`}
                className="group min-w-0 max-w-full basis-full pl-0! ps-4 md:basis-1/2 lg:basis-1/3"
              >
                <blockquote className="flex h-full min-w-0 flex-col overflow-hidden rounded-[24px] border border-primary-100/70 bg-white text-start  transition-all duration-300 hover:-translate-y-1 sm:rounded-[30px]">
                  <div className="relative m-3 aspect-4/3 overflow-visible sm:aspect-[1.32/0.92]">
                    <div className="h-full overflow-hidden rounded-[20px] sm:rounded-[24px]">
                      <img
                        src={item.image}
                        alt=""
                        className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-primary/80 via-primary/20 to-transparent" />
                    </div>
                    <div className="absolute top-4 inset-e-4 flex h-10 w-10 items-center justify-center rounded-2xl bg-white/92 text-primary shadow-sm sm:h-11 sm:w-11">
                      <Quote className="h-5 w-5" />
                    </div>
                    <div
                      className={cn(
                        'absolute inset-e-5 -bottom-6 flex h-14 w-14 items-center justify-center rounded-full border-4 border-white text-sm font-semibold shadow-[0_10px_25px_rgba(12,10,40,0.14)]',
                        item.avatarClassName
                      )}
                    >
                      {item.initials}
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col space-y-5 px-5 pb-6 pt-8 sm:px-6">
                    <p className="flex-1 text-sm leading-7 text-primary sm:text-base sm:leading-8">
                      “<FormattedMessage id={`feedback.item${item.id}.quote`} />”
                    </p>

                    <footer className="flex items-center justify-between gap-3 border-t border-primary-100 pt-4">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-primary">
                          <FormattedMessage id={`feedback.item${item.id}.name`} />
                        </p>
                        <p className="mt-1 line-clamp-2 text-xs leading-5 text-tertiary-600">
                          <FormattedMessage id={`feedback.item${item.id}.role`} />
                        </p>
                      </div>
                      <div className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-700">
                        <Star className="h-3.5 w-3.5 fill-current text-amber-500" />
                        <span>5.0</span>
                      </div>
                    </footer>
                  </div>
                </blockquote>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </Container>
    </section>
  )
}
