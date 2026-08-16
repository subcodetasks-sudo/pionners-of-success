import { useLayoutEffect, useMemo, useState } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import DriftWall, { type DriftWallItem } from '@/components/DriftWall'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog'

const placeholderImages = [
  '/imgs/sponsers/samsung.webp',
  '/imgs/sponsers/honor.webp',
  '/imgs/sponsers/nahdi.webp',
  '/imgs/sponsers/centrepoint.webp',
  '/imgs/sponsers/shein.webp',
  '/imgs/sponsers/trendyol.png',
  '/imgs/sponsers/faces.webp',
  '/imgs/sponsers/the-body-shop.webp',
  '/imgs/sponsers/chuck-e-cheese.webp',
  '/imgs/sponsers/tim-hortons.png',
  '/imgs/sponsers/gap.webp',
  '/imgs/sponsers/skechers.webp',
] as const

type WallLayout = {
  columns: number
  tileWidth: number
  tileHeight: number
  gap: number
  scale: number
  tilt: number
  turn: number
  depth: number
  fade: number
}

const getWallLayout = (width: number): WallLayout => {
  if (width < 640) {
    return {
      columns: 2,
      tileWidth: 118,
      tileHeight: 88,
      gap: 10,
      scale: 1.55,
      tilt: 8,
      turn: -6,
      depth: 40,
      fade: 0.2,
    }
  }
  if (width < 1024) {
    return {
      columns: 4,
      tileWidth: 170,
      tileHeight: 118,
      gap: 14,
      scale: 1.7,
      tilt: 10,
      turn: -8,
      depth: 60,
      fade: 0.22,
    }
  }
  return {
    columns: 8,
    tileWidth: 170,
    tileHeight: 114,
    gap: 14,
    scale: 1.85,
    tilt: 10,
    turn: -8,
    depth: 70,
    fade: 0.18,
  }
}

export const GalleryPage = () => {
  const intl = useIntl()
  const [selected, setSelected] = useState<DriftWallItem | null>(null)
  const [layout, setLayout] = useState<WallLayout>(() =>
    getWallLayout(typeof window === 'undefined' ? 1280 : window.innerWidth),
  )

  useLayoutEffect(() => {
    const update = () => setLayout(getWallLayout(window.innerWidth))
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  const items = useMemo<DriftWallItem[]>(
    () =>
      placeholderImages.map((image, index) => ({
        image,
        title: intl.formatMessage({ id: 'gallery.item' }, { n: index + 1 }),
      })),
    [intl],
  )

  return (
    <div className="relative h-dvh overflow-hidden bg-white">
      <DriftWall
        items={items}
        className="h-full"
        columns={layout.columns}
        tileWidth={layout.tileWidth}
        tileHeight={layout.tileHeight}
        gap={layout.gap}
        scale={layout.scale}
        tilt={layout.tilt}
        turn={layout.turn}
        depth={layout.depth}
        fade={layout.fade}
        overlayColor="transparent"
        tileBackground="#ffffff"
        imageFit="contain"
        dim={1}
        grayscale={false}
        onItemClick={(item) => {
          window.setTimeout(() => setSelected(item), 0)
        }}
      />
      <Dialog
        open={selected !== null}
        onOpenChange={(open) => {
          if (!open) setSelected(null)
        }}
      >
        <DialogContent className="max-h-[90dvh] w-auto max-w-[min(96vw,960px)] overflow-hidden bg-white p-3 pt-12 sm:max-w-[min(96vw,960px)]">
          <DialogTitle>
            {selected?.title ?? intl.formatMessage({ id: 'gallery.page.title' })}
          </DialogTitle>
          <DialogDescription className="sr-only">
            <FormattedMessage id="gallery.dialog.description" />
          </DialogDescription>
          {selected ? (
            <img
              src={selected.image}
              alt={selected.title ?? ''}
              className="mx-auto max-h-[75dvh] w-auto max-w-full bg-white object-contain"
            />
          ) : null}
        </DialogContent>
      </Dialog>
    </div>
  )
}
