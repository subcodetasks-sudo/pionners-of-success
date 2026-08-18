import { useMemo, useState } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import AccordionGallery, { type AccordionGalleryItem } from '@/components/AccordionGallery'
import { Container } from '@/components/layout/Container'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog'

const placeholderImages = [
  '/imgs/services/brand-identity.webp',
  '/imgs/services/digital-platforms.webp',
  '/imgs/services/ad-campaigns.webp',
  '/imgs/services/content-production.webp',
  '/imgs/services/influencer-marketing.webp',
] as const

type GalleryItem = AccordionGalleryItem & {
  title: string
}

export const GalleryPage = () => {
  const intl = useIntl()
  const [selected, setSelected] = useState<AccordionGalleryItem | null>(null)
  const introText = intl.locale.startsWith('ar')
    ? 'نظرة بصرية سريعة على بعض الأعمال والمخرجات الإبداعية التي تعكس أسلوبنا في بناء التجارب، وصناعة المحتوى، وتقديم الحلول بصورة أوضح وأكثر تأثيرًا.'
    : 'A visual snapshot of selected work and creative outputs that reflect how we shape experiences, build content, and present ideas more clearly and effectively.'

  const items = useMemo<GalleryItem[]>(
    () =>
      placeholderImages.map((image, index) => ({
        image,
        title: intl.formatMessage({ id: 'gallery.item' }, { n: index + 1 }),
      })),
    [intl],
  )

  return (
    <div className="bg-white">
      <Container className="py-20">
        <div className="mx-auto my-10 max-w-3xl text-center">
          <h1 className="text-4xl font-semibold text-primary sm:text-5xl">
            <FormattedMessage id="gallery.page.title" />
          </h1>
          <p className="mt-5 text-base leading-8 text-tertiary-600 sm:text-lg">
            {introText}
          </p>
        </div>
<div className='space-y-10'>
        <AccordionGallery
          items={items.map((item) => ({
            image: item.image,
            label: item.title,
            alt: item.title,
          }))}
          defaultIndex={0}
          expandRatio={0.52}
          trigger="hover"
          accentColor="#1190CF"
          overlayColor="#0C0A28"
          textColor="#ffffff"
          radius={24}
          gap={12}
          height={520}
          onItemClick={(_, index) => {
            const next = items[index]
            if (!next) return
            setSelected({
              image: next.image,
              label: next.title,
              alt: next.title,
            })
          }}
        />
        <AccordionGallery
          items={items.map((item) => ({
            image: item.image,
            label: item.title,
            alt: item.title,
          }))}
          defaultIndex={2}
          expandRatio={0.52}
          trigger="hover"
          accentColor="#1190CF"
          overlayColor="#0C0A28"
          textColor="#ffffff"
          radius={24}
          gap={12}
          height={520}
          onItemClick={(_, index) => {
            const next = items[index]
            if (!next) return
            setSelected({
              image: next.image,
              label: next.title,
              alt: next.title,
            })
          }}
        />
        <AccordionGallery
          items={items.map((item) => ({
            image: item.image,
            label: item.title,
            alt: item.title,
          }))}
          defaultIndex={4}
          expandRatio={0.52}
          trigger="hover"
          accentColor="#1190CF"
          overlayColor="#0C0A28"
          textColor="#ffffff"
          radius={24}
          gap={12}
          height={520}
          onItemClick={(_, index) => {
            const next = items[index]
            if (!next) return
            setSelected({
              image: next.image,
              label: next.title,
              alt: next.title,
            })
          }}
        />
</div>
      </Container>
      <Dialog
        open={selected !== null}
        onOpenChange={(open) => {
          if (!open) setSelected(null)
        }}
      >
        <DialogContent className="max-h-[90dvh] w-auto max-w-[min(96vw,960px)] overflow-hidden bg-white p-3 pt-12 sm:max-w-[min(96vw,960px)]">
          <DialogTitle>
            {selected?.label ?? intl.formatMessage({ id: 'gallery.page.title' })}
          </DialogTitle>
          <DialogDescription className="sr-only">
            <FormattedMessage id="gallery.dialog.description" />
          </DialogDescription>
          {selected ? (
            <img
              src={selected.image}
              alt={selected.alt ?? selected.label ?? ''}
              className="mx-auto max-h-[75dvh] w-auto max-w-full bg-white object-contain"
            />
          ) : null}
        </DialogContent>
      </Dialog>
    </div>
  )
}
