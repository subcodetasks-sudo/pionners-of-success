import type { MessageKey } from '@/i18n/messages/en'

export type Service = {
  slug: string
  titleKey: MessageKey
  summaryKey: MessageKey
  bodyKey: MessageKey
  image: string
}

export const services: Service[] = [
  {
    slug: 'brand-identity-creation',
    titleKey: 'service.brandIdentity.title',
    summaryKey: 'service.brandIdentity.summary',
    bodyKey: 'service.brandIdentity.body',
    image: '/imgs/services/brand-identity.webp',
  },
  {
    slug: 'digital-platforms-management',
    titleKey: 'service.digitalPlatforms.title',
    summaryKey: 'service.digitalPlatforms.summary',
    bodyKey: 'service.digitalPlatforms.body',
    image: '/imgs/services/digital-platforms.webp',
  },
  {
    slug: 'paid-ad-campaigns',
    titleKey: 'service.adCampaigns.title',
    summaryKey: 'service.adCampaigns.summary',
    bodyKey: 'service.adCampaigns.body',
    image: '/imgs/services/ad-campaigns.webp',
  },
  {
    slug: 'content-production-brand-management',
    titleKey: 'service.contentProduction.title',
    summaryKey: 'service.contentProduction.summary',
    bodyKey: 'service.contentProduction.body',
    image: '/imgs/services/content-production.webp',
  },
  {
    slug: 'influencer-marketing',
    titleKey: 'service.influencerMarketing.title',
    summaryKey: 'service.influencerMarketing.summary',
    bodyKey: 'service.influencerMarketing.body',
    image: '/imgs/services/influencer-marketing.webp',
  },
  {
    slug: 'strategic-consulting',
    titleKey: 'service.strategicConsulting.title',
    summaryKey: 'service.strategicConsulting.summary',
    bodyKey: 'service.strategicConsulting.body',
    image: '/imgs/services/strategic-consulting.webp',
  },
]

export const getServiceBySlug = (slug: string | undefined) =>
  services.find((service) => service.slug === slug)
