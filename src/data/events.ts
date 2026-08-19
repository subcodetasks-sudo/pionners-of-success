import type { MessageKey } from '@/i18n/messages/en'

export type EventItem = {
  id: number
  slug: string
  image: string
  titleKey: MessageKey
  metaKey: MessageKey
  bodyKey: MessageKey
}

export const events: EventItem[] = [
  {
    id: 1,
    slug: 'leading-through-change',
    image: '/imgs/services/strategic-consulting.webp',
    titleKey: 'events.item1.title',
    metaKey: 'events.item1.meta',
    bodyKey: 'events.item1.body',
  },
  {
    id: 2,
    slug: 'coaching-clinic',
    image: '/imgs/services/content-production.webp',
    titleKey: 'events.item2.title',
    metaKey: 'events.item2.meta',
    bodyKey: 'events.item2.body',
  },
  {
    id: 3,
    slug: 'pioneers-forum',
    image: '/imgs/services/brand-identity.webp',
    titleKey: 'events.item3.title',
    metaKey: 'events.item3.meta',
    bodyKey: 'events.item3.body',
  },
  {
    id: 4,
    slug: 'creative-campaign-lab',
    image: '/imgs/services/ad-campaigns.webp',
    titleKey: 'events.item4.title',
    metaKey: 'events.item4.meta',
    bodyKey: 'events.item4.body',
  },
  {
    id: 5,
    slug: 'designing-digital-platforms',
    image: '/imgs/services/digital-platforms.webp',
    titleKey: 'events.item5.title',
    metaKey: 'events.item5.meta',
    bodyKey: 'events.item5.body',
  },
]

export const getEventBySlug = (slug: string | undefined) =>
  events.find((event) => event.slug === slug)
