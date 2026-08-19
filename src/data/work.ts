import type { LucideIcon } from 'lucide-react'
import { Clapperboard, Megaphone, MonitorSmartphone, Palette } from 'lucide-react'
import type { MessageKey } from '@/i18n/messages/en'

export type WorkImage = {
  src: string
  altKey: MessageKey
}

export type WorkCategory = {
  id: string
  icon: LucideIcon
  titleKey: MessageKey
  descriptionKey: MessageKey
  images: WorkImage[]
}

export const workCategories: WorkCategory[] = [
  {
    id: 'branding',
    icon: Palette,
    titleKey: 'work.tab.branding.title',
    descriptionKey: 'work.tab.branding.description',
    images: [
      { src: '/imgs/services/brand-identity.webp', altKey: 'work.tab.branding.image1' },
      { src: '/imgs/services/strategic-consulting.webp', altKey: 'work.tab.branding.image2' },
      { src: '/imgs/services/content-production.webp', altKey: 'work.tab.branding.image3' },
    ],
  },
  {
    id: 'campaigns',
    icon: Megaphone,
    titleKey: 'work.tab.campaigns.title',
    descriptionKey: 'work.tab.campaigns.description',
    images: [
      { src: '/imgs/services/ad-campaigns.webp', altKey: 'work.tab.campaigns.image1' },
      { src: '/imgs/services/influencer-marketing.webp', altKey: 'work.tab.campaigns.image2' },
      { src: '/imgs/services/brand-identity.webp', altKey: 'work.tab.campaigns.image3' },
    ],
  },
  {
    id: 'content',
    icon: Clapperboard,
    titleKey: 'work.tab.content.title',
    descriptionKey: 'work.tab.content.description',
    images: [
      { src: '/imgs/services/content-production.webp', altKey: 'work.tab.content.image1' },
      { src: '/imgs/services/influencer-marketing.webp', altKey: 'work.tab.content.image2' },
      { src: '/imgs/services/ad-campaigns.webp', altKey: 'work.tab.content.image3' },
    ],
  },
  {
    id: 'digital',
    icon: MonitorSmartphone,
    titleKey: 'work.tab.digital.title',
    descriptionKey: 'work.tab.digital.description',
    images: [
      { src: '/imgs/services/digital-platforms.webp', altKey: 'work.tab.digital.image1' },
      { src: '/imgs/services/strategic-consulting.webp', altKey: 'work.tab.digital.image2' },
      { src: '/imgs/services/brand-identity.webp', altKey: 'work.tab.digital.image3' },
    ],
  },
]
