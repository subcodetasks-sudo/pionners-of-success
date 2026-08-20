import { Container } from '@/components/layout/Container';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { workCategories } from '@/data/work';
import { fetchWorksContent } from '@/lib/content';
import { Clapperboard, Megaphone, MonitorSmartphone, Palette, type LucideIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';

type WorkImageView = {
  src: string
  title: string
  description: string
}

type WorkTabView = {
  id: string
  icon: LucideIcon
  title: string
  description: string
  images: WorkImageView[]
}

type WorkPageView = {
  title: string
  description: string
  tabs: WorkTabView[]
}

const iconByKey: Record<string, LucideIcon> = {
  branding: Palette,
  campaigns: Megaphone,
  content: Clapperboard,
  digital: MonitorSmartphone,
  palette: Palette,
  megaphone: Megaphone,
  clapperboard: Clapperboard,
  'monitor-smartphone': MonitorSmartphone,
  'heroicon-o-paint-brush': Palette,
  'heroicon-o-swatch': Palette,
  'heroicon-o-megaphone': Megaphone,
  'heroicon-o-film': Clapperboard,
  'heroicon-o-device-phone-mobile': MonitorSmartphone,
}

const resolveIcon = (slug?: string | null, icon?: string | null): LucideIcon => {
  const slugKey = slug?.trim().toLowerCase() || ''
  const iconKey = icon?.trim().toLowerCase() || ''
  return iconByKey[slugKey] || iconByKey[iconKey] || Palette
}

export const WorkPage = () => {
  const intl = useIntl()
  const [selected, setSelected] = useState<WorkImageView | null>(null)

  const fallback: WorkPageView = {
    title: intl.formatMessage({ id: 'work.page.title' }),
    description: intl.formatMessage({ id: 'work.page.description' }),
    tabs: workCategories.map((category) => ({
      id: category.id,
      icon: category.icon,
      title: intl.formatMessage({ id: category.titleKey }),
      description: intl.formatMessage({ id: category.descriptionKey }),
      images: category.images.map((image) => ({
        src: image.src,
        title: intl.formatMessage({ id: image.altKey }),
        description: '',
      })),
    })),
  }

  const [page, setPage] = useState<WorkPageView>(fallback)

  useEffect(() => {
    setPage(fallback)
    setSelected(null)

    let cancelled = false

    fetchWorksContent()
      .then((data) => {
        if (cancelled || !data?.tabs?.length) return

        setPage({
          title: data.title?.trim() || fallback.title,
          description: data.content?.trim() || fallback.description,
          tabs: data.tabs.map((tab, index) => ({
            id: tab.slug?.trim() || String(tab.id || index),
            icon: resolveIcon(tab.slug, tab.icon),
            title: tab.title?.trim() || fallback.tabs[index]?.title || '',
            description: tab.content?.trim() || fallback.tabs[index]?.description || '',
            images: (tab.images ?? [])
              .map((image) => ({
                src: image.image_url?.trim() || image.thumb_url?.trim() || '',
                title: image.title?.trim() || '',
                description: image.description?.trim() || '',
              }))
              .filter((image) => image.src),
          })),
        })
      })
      .catch(() => {
        if (!cancelled) setPage(fallback)
      })

    return () => {
      cancelled = true
    }
  }, [intl])

  const activeTab = page.tabs[0]?.id

  return (
    <div className="bg-white">
      <Container className="py-20">
        <div className="mx-auto my-4 max-w-3xl text-center">
          <h1 className=" font-semibold text-primary  ">{page.title}</h1>
          <p className="text-base leading-8 text-tertiary-600 ">{page.description}</p>
        </div>

        {page.tabs.length ? (
          <Tabs key={activeTab} defaultValue={activeTab} className="gap-4">
            <TabsList className="mx-auto">
              {page.tabs.map((tab) => {
                const Icon = tab.icon
                return (
                  <TabsTrigger key={tab.id} value={tab.id}>
                    <Icon className="size-4" />
                    {tab.title}
                  </TabsTrigger>
                )
              })}
            </TabsList>

            {page.tabs.map((tab) => {
            
              return (
                <TabsContent key={tab.id} value={tab.id} className="">
                  <article className="rounded-[32px] border border-primary-100 bg-neutral-50/70 p-6 sm:p-4">
                    {/* <div className="mx-auto mb-8 max-w-2xl text-center">
                      <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-2xl bg-secondary/10 text-secondary-700">
                        <Icon className="size-6" />
                      </div>
                      <h2 className="text-2xl font-semibold text-[#0C0A28] sm:text-3xl">{tab.title}</h2>
                      <p className="mt-3 text-base leading-8 text-tertiary-600">{tab.description}</p>
                    </div> */}

                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {tab.images.map((image) => (
                        <button
                          key={image.src + image.title}
                          type="button"
                          className="group overflow-hidden rounded-[24px] border border-primary-100 bg-white text-start shadow-[0_16px_40px_rgba(12,10,40,0.06)]"
                          onClick={() => setSelected(image)}
                        >
                          <img
                            src={image.src}
                            alt={image.title}
                            loading="lazy"
                            decoding="async"
                            className="aspect-4/3 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </button>
                      ))}
                    </div>
                  </article>
                </TabsContent>
              )
            })}
          </Tabs>
        ) : null}
      </Container>

      <Dialog
        open={selected !== null}
        onOpenChange={(open) => {
          if (!open) setSelected(null)
        }}
      >
        <DialogContent className="grid h-[min(90dvh,680px)] w-[min(96vw,800px)] max-w-[min(96vw,800px)] grid-rows-[auto_auto_1fr] overflow-hidden bg-white p-4 pt-12 sm:max-w-[min(96vw,800px)]">
          <DialogTitle className="truncate">
            {selected?.title || page.title}
          </DialogTitle>
          <DialogDescription
            className={selected?.description ? 'mt-1 line-clamp-2 text-tertiary-600' : 'sr-only'}
          >
            {selected?.description || intl.formatMessage({ id: 'work.dialog.description' })}
          </DialogDescription>
          {selected ? (
            <div className="min-h-0 overflow-hidden rounded-lg bg-neutral-100">
              <img
                src={selected.src}
                alt={selected.title}
                className="h-full w-full object-contain"
              />
            </div>
          ) : null}
        </DialogContent>
      </Dialog>
    </div>
  )
}
