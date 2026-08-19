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
