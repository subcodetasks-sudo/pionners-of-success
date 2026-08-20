import { api } from '@/lib/api'

export type HeroContent = {
  id: number
  title: string
  subtitle: string
  cta_text: string
  cta_url: string
  image_url: string
  lang: string
}

type HeroResponse = {
  data: HeroContent | null
}

export const fetchHeroContent = async (): Promise<HeroContent | null> => {
  const { data } = await api.get<HeroResponse>('/v1/content/hero')
  return data?.data ?? null
}

export type StatContent = {
  id: number
  label: string
  value: string
  icon: string
  order: number
  lang: string
}

type StatsResponse = {
  data: StatContent[] | null
}

export const fetchStatsContent = async (): Promise<StatContent[] | null> => {
  const { data } = await api.get<StatsResponse>('/v1/content/stats')
  if (!data?.data?.length) return null
  return [...data.data].sort((a, b) => a.order - b.order)
}

export type PartnerContent = {
  id: number
  name: string
  url: string
  logo_url: string
  order: number
}

type PartnersResponse = {
  data: PartnerContent[] | null
  lang?: string
}

export const fetchPartnersContent = async (): Promise<PartnerContent[] | null> => {
  const { data } = await api.get<PartnersResponse>('/v1/content/partners')
  if (!data?.data?.length) return null
  return [...data.data].sort((a, b) => a.order - b.order)
}

export type AboutSectionBlock = {
  title: string
  content: string
  image_url?: string | null
}

export type AboutContent = {
  id: number
  title: string
  content: string
  image_url: string
  lang: string
  vision?: AboutSectionBlock | null
  message?: AboutSectionBlock | null
  mission?: AboutSectionBlock | null
}

type AboutResponse = {
  data: AboutContent | null
}

export const fetchAboutContent = async (): Promise<AboutContent | null> => {
  const { data } = await api.get<AboutResponse>('/v1/content/about')
  return data?.data ?? null
}

export type AdvantageItem = {
  id: number
  title: string
  content: string
  icon?: string | null
  order: number
}

export type AdvantagesContent = {
  id: number
  kicker: string
  title: string
  content: string
  image_url: string
  lang: string
  items: AdvantageItem[]
}

type AdvantagesResponse = {
  data: AdvantagesContent | null
}

export const fetchAdvantagesContent = async (): Promise<AdvantagesContent | null> => {
  const { data } = await api.get<AdvantagesResponse>('/v1/content/advantages')
  if (!data?.data) return null
  return {
    ...data.data,
    items: [...(data.data.items ?? [])].sort((a, b) => a.order - b.order),
  }
}

export type WorkImageContent = {
  id: number
  title?: string | null
  description?: string | null
  image_url: string
  thumb_url?: string | null
  order: number
}

export type WorkTabContent = {
  id: number
  slug: string
  title: string
  content: string
  icon?: string | null
  order: number
  images: WorkImageContent[]
}

export type WorksContent = {
  id: number
  title: string
  content: string
  lang: string
  tabs: WorkTabContent[]
}

type WorksResponse = {
  data: WorksContent | null
}

export const fetchWorksContent = async (): Promise<WorksContent | null> => {
  const { data } = await api.get<WorksResponse>('/v1/content/works')
  if (!data?.data) return null

  return {
    ...data.data,
    tabs: [...(data.data.tabs ?? [])]
      .sort((a, b) => a.order - b.order)
      .map((tab) => ({
        ...tab,
        images: [...(tab.images ?? [])].sort((a, b) => a.order - b.order),
      })),
  }
}

export type GalleryContent = {
  id: number
  title: string | null
  description: string | null
  image_url: string
  thumb_url: string
  order: number
  lang: string
}

type GalleryResponse = {
  data: GalleryContent[] | null
}

export const fetchGalleryContent = async (): Promise<GalleryContent[] | null> => {
  const { data } = await api.get<GalleryResponse>('/v1/content/gallery')
  if (!data?.data?.length) return null
  return [...data.data].sort((a, b) => a.order - b.order)
}



export type ServiceContent = {
  id: number
  title: string
  description: string
  icon: string
  image_url: string
  order: number
  lang: string
}

type ServiceResponse = {
  data: ServiceContent[] | null}

export const fetchServicesContent = async (): Promise<ServiceContent[] | null> => {
  const { data } = await api.get<ServiceResponse>('/v1/content/services')
  if (!data?.data?.length) return null
  return [...data.data].sort((a, b) => a.order - b.order)
}

type ServiceDetailResponse = {
  data: ServiceContent | null
}

export const fetchServiceContent = async (id: number | string): Promise<ServiceContent | null> => {
  const { data } = await api.get<ServiceDetailResponse>(`/v1/content/services/${id}`)
  return data?.data ?? null
}


export type FeedbackContent = {
  id: number|string
  author_name : string|null
  content: string|null
  rating: number|null
  avatar_url: string|null
  background_image_url: string|null
  order: number
  lang: string
}

type FeedbackResponse = {
  data: FeedbackContent[] | null
}

export const fetchFeedbackContent = async (): Promise<FeedbackContent[] | null> => {
  const { data } = await api.get<FeedbackResponse>('/v1/content/testimonials')
  if (!data?.data?.length) return null
  return [...data.data].sort((a, b) => a.order - b.order)
} 


export type EventMediaFile = {
  url: string;
  thumb_url: string;
}

export type EventMedia = {
  id: number;
  event_id: number;
  type: "video" | "image";
  description: string | null;
  video_url: string | null;
  file_url: string;
  thumb_url: string;
  files: EventMediaFile[];
  order: number;
  lang: string;
}

export type EventContent = {
  id: number;
  title: string;
  description: string;
  location: string | null;
  event_date: string;
  cta_url: string;
  image_url: string;
  thumb_url: string;
  order: number;
  lang: string;
  media: EventMedia[];
}

type EventResponse = {
  data: {
    items: EventContent[] | null
    lang: string
  }
}

export const fetchEventsContent = async (): Promise<EventContent[] | null> => {
  const { data } = await api.get<EventResponse>('/v1/content/events')
  if (!data?.data?.items?.length) return null
  return [...data.data.items].sort((a, b) => a.order - b.order)
}

type EventDetailResponse = {
  data: EventContent | null
}

export const fetchEventContent = async (id: number | string): Promise<EventContent | null> => {
  const { data } = await api.get<EventDetailResponse>(`/v1/content/events/${id}`)
  if (!data?.data) return null
  return {
    ...data.data,
    media: [...(data.data.media ?? [])].sort((a, b) => a.order - b.order),
  }
}

export type ContactContent = {
  id: number
  email: string | null
  phone: string | null
  address: string | null
  facebook: string | null
  instagram: string | null
  twitter: string | null
  linkedin: string | null
  whatsapp: string | null
  lang: string
}

type ContactResponse = {
  data: ContactContent | null
}

export const fetchContactContent = async (): Promise<ContactContent | null> => {
  const { data } = await api.get<ContactResponse>('/v1/content/contact')
  return data?.data ?? null
}