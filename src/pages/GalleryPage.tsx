import { useEffect, useMemo, useState } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import AccordionGallery, { type AccordionGalleryItem } from '@/components/AccordionGallery'
import { Container } from '@/components/layout/Container'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog'
import { fetchGalleryContent } from '@/lib/content'

const PAGE_SIZE = 5

const placeholderImages = [
  '/imgs/services/brand-identity.webp',
  '/imgs/services/digital-platforms.webp',
  '/imgs/services/ad-campaigns.webp',
  '/imgs/services/content-production.webp',
  '/imgs/services/influencer-marketing.webp',
] as const

type GalleryItem = {
  id: string
  image: string
  thumb: string
  title: string
  description: string
}

const chunkItems = <T,>(items: T[], size: number) => {
  const rows: T[][] = []
  for (let i = 0; i < items.length; i += size) {
    rows.push(items.slice(i, i + size))
  }
  return rows
}

const toAccordionItem = (item: GalleryItem): AccordionGalleryItem => ({
  image: item.thumb,
  label: item.title || undefined,
  description: item.description || undefined,
  alt: item.title || item.description || undefined,
})

export const GalleryPage = () => {
  const intl = useIntl()
  const [selected, setSelected] = useState<GalleryItem | null>(null)
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)
  const introText = intl.locale.startsWith('ar')
    ? 'نظرة بصرية سريعة على بعض الأعمال والمخرجات الإبداعية التي تعكس أسلوبنا في بناء التجارب، وصناعة المحتوى، وتقديم الحلول بصورة أوضح وأكثر تأثيرًا.'
    : 'A visual snapshot of selected work and creative outputs that reflect how we shape experiences, build content, and present ideas more clearly and effectively.'

  const fallbackItems = useMemo<GalleryItem[]>(
    () =>
      placeholderImages.map((image, index) => ({
        id: `fallback-${index}`,
        image,
        thumb: image,
        title: '',
        description: '',
      })),
    [],
  )

  const [items, setItems] = useState<GalleryItem[]>(fallbackItems)

  useEffect(() => {
    setItems(fallbackItems)
    setVisibleCount(PAGE_SIZE)
    setSelected(null)

    let cancelled = false

    fetchGalleryContent()
      .then((data) => {
        if (cancelled || !data?.length) return
        setItems(
          data.map((item) => ({
            id: String(item.id),
            image: item.image_url?.trim() || item.thumb_url?.trim() || '',
            thumb: item.thumb_url?.trim() || item.image_url?.trim() || '',
            title: item.title?.trim() || '',
            description: item.description?.trim() || '',
          })).filter((item) => item.image || item.thumb),
        )
        setVisibleCount(PAGE_SIZE)
      })
      .catch(() => {
        if (!cancelled) setItems(fallbackItems)
      })

    return () => {
      cancelled = true
    }
  }, [fallbackItems, intl.locale])

  const visibleItems = items.slice(0, visibleCount)
  const rows = chunkItems(visibleItems, PAGE_SIZE)
  const hasMore = visibleCount < items.length

  return (
    <div className="bg-white">
      <Container className="py-20">
        <div className="mx-auto my-10 max-w-3xl text-center">
          <h1 className="text-4xl font-semibold text-[#0C0A28] sm:text-5xl">
            <FormattedMessage id="gallery.page.title" />
          </h1>
          <p className="mt-5 text-base leading-8 text-tertiary-600 sm:text-lg">
            {introText}
          </p>
        </div>
        <div className="space-y-10">
          {rows.map((row) => (
            <AccordionGallery
              key={row.map((item) => item.id).join('-')}
              items={row.map(toAccordionItem)}
              defaultIndex={0}
              expandRatio={0.52}
              trigger="hover"
              grayscale={false}
              accentColor="#1190CF"
              overlayColor="#0C0A28"
              textColor="#ffffff"
              radius={24}
              gap={12}
              height={520}
              onItemClick={(_, index) => {
                const next = row[index]
                if (next) setSelected(next)
              }}
            />
          ))}
        </div>
        {hasMore ? (
          <div className="mt-10 flex justify-center">
            <Button
              size="lg"
              className="h-11 rounded-full border-secondary-300 bg-secondary-200 px-6 text-primary-950 hover:bg-secondary-300 hover:text-primary-950"
              onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}
            >
              <FormattedMessage id="gallery.loadMore" />
            </Button>
          </div>
        ) : null}
      </Container>
      <Dialog
        open={selected !== null}
        onOpenChange={(open) => {
          if (!open) setSelected(null)
        }}
      >
        <DialogContent className="max-h-[90dvh] w-auto max-w-[min(96vw,960px)] overflow-hidden bg-white p-3 pt-12 sm:max-w-[min(96vw,960px)]">
          <DialogTitle>
            {selected?.title || intl.formatMessage({ id: 'gallery.page.title' })}
          </DialogTitle>
          <DialogDescription
            className={selected?.description ? 'mt-1 text-tertiary-600' : 'sr-only'}
          >
            {selected?.description || intl.formatMessage({ id: 'gallery.dialog.description' })}
          </DialogDescription>
          {selected ? (
            <img
              src={selected.image}
              alt={selected.title || selected.description || ''}
              className="mx-auto max-h-[75dvh] w-auto max-w-full bg-white object-contain"
            />
          ) : null}
        </DialogContent>
      </Dialog>
    </div>
  )
}
