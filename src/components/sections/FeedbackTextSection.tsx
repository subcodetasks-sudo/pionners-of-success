import { Quote, Star } from 'lucide-react'
import { FormattedMessage } from 'react-intl'
import { Container } from '@/components/layout/Container'
import { SectionHeading } from '@/components/layout/SectionHeading'
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
] as const

export const FeedbackTextSection = () => {
  return (
    <section id="feedback" className="scroll-mt-24 bg-white py-18">
      <Container>
        <SectionHeading kicker="feedback.kicker" title="feedback.title" />
        <div className="grid gap-6 lg:grid-cols-3">
          {items.map((item) => (
            <blockquote
              key={item.id}
              className="group overflow-hidden rounded-[30px] border border-primary-100/70 bg-white text-start shadow-[0_24px_55px_rgba(12,10,40,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_70px_rgba(12,10,40,0.12)]"
            >
              <div className="relative m-3 aspect-[1.32/0.92] overflow-visible">
                <div className="h-full overflow-hidden rounded-[24px]">
                  <img
                    src={item.image}
                    alt=""
                    className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-primary/80 via-primary/20 to-transparent" />
                </div>
                <div className="absolute top-4 inset-e-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-white/92 text-primary shadow-sm">
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

              <div className="space-y-5 px-6 pb-6 pt-8">
                <p className="text-base leading-8 text-primary">
                  “<FormattedMessage id={`feedback.item${item.id}.quote`} />”
                </p>

                <footer className="flex items-center justify-between gap-4 border-t border-primary-100 pt-4">
                  <div>
                    <p className="text-sm font-semibold text-primary">
                      <FormattedMessage id={`feedback.item${item.id}.name`} />
                    </p>
                    <p className="mt-1 text-xs leading-5 text-tertiary-600">
                      <FormattedMessage id={`feedback.item${item.id}.role`} />
                    </p>
                  </div>
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-700">
                    <Star className="h-3.5 w-3.5 fill-current text-amber-500" />
                    <span>5.0</span>
                  </div>
                </footer>
              </div>
            </blockquote>
          ))}
        </div>
      </Container>
    </section>
  )
}
