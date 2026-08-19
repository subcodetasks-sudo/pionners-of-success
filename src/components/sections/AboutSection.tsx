import { useIntl } from 'react-intl'
import { useEffect, useState } from 'react'
import { Eye, Sparkles, Target } from 'lucide-react'
import { motion, useReducedMotion, type Variants } from 'motion/react'
import logo from '@/assets/Logo.webp'
import { Container } from '@/components/layout/Container'
import { fetchAboutContent } from '@/lib/content'
import { cn } from '@/lib/utils'

const ease = [0.22, 1, 0.36, 1] as const

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease },
  },
}

const stagger: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.08 },
  },
}

const imageReveal: Variants = {
  hidden: { opacity: 0, scale: 0.94, y: 24 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.75, ease },
  },
}

type PillarCardProps = {
  title: string
  body: string
  imageSrc: string
  imageAlt: string
  icon: typeof Eye
  accent: 'secondary' | 'primary'
  imageFirst?: boolean
  reduceMotion: boolean | null
}

const PillarCard = ({
  title,
  body,
  imageSrc,
  imageAlt,
  icon: Icon,
  accent,
  imageFirst = false,
  reduceMotion,
}: PillarCardProps) => {
  const accentRing = accent === 'secondary' ? 'ring-secondary-200/60' : 'ring-primary-200/60'
  const accentBg = accent === 'secondary' ? 'bg-secondary-100 text-secondary-700' : 'bg-primary-100 text-primary-800'
  const accentGlow =
    accent === 'secondary'
      ? 'bg-secondary-400/20'
      : 'bg-primary-400/15'

  return (
    <motion.article
      className={cn(
        'grid items-center gap-8 lg:grid-cols-2 lg:gap-12',
        imageFirst && 'lg:[&>div:first-child]:order-2 lg:[&>div:last-child]:order-1',
      )}
      initial={reduceMotion ? false : 'hidden'}
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={stagger}
    >
      <motion.div className="relative" variants={imageReveal}>
        <div
          className={cn(
            'pointer-events-none absolute -inset-3 rounded-[2rem] blur-2xl',
            accentGlow,
          )}
          aria-hidden
        />
        <div className={cn('relative overflow-hidden rounded-3xl ring-1 shadow-lg', accentRing)}>
          <div
            className={cn(
              'flex aspect-4/3 items-center justify-center overflow-hidden bg-white',
              imageSrc === logo ? 'p-10 sm:p-14' : '',
            )}
          >
            <img
              src={imageSrc}
              alt={imageAlt}
              loading="lazy"
              decoding="async"
              className={cn(
                'h-full w-full transition-transform duration-700 ease-out hover:scale-105',
                imageSrc === logo ? 'object-contain' : 'object-cover',
              )}
              onError={(event) => {
                if (event.currentTarget.dataset.fallbackApplied === 'true') return
                event.currentTarget.dataset.fallbackApplied = 'true'
                event.currentTarget.src = logo
              }}
            />
          </div>
        </div>
        <div
          className={cn(
            'absolute -bottom-4 inset-s-4 flex size-14 items-center justify-center rounded-2xl shadow-md ring-1 ring-white/80',
            accentBg,
          )}
        >
          <Icon className="size-6" strokeWidth={1.75} />
        </div>
      </motion.div>

      <motion.div className="text-start lg:py-4" variants={stagger}>
        <motion.h3
          className="mb-4 text-2xl font-semibold leading-snug text-primary sm:text-3xl"
          variants={fadeUp}
        >
          {title}
        </motion.h3>
        <motion.p className="text-base leading-relaxed text-tertiary-600 sm:text-lg" variants={fadeUp}>
          {body}
        </motion.p>
      </motion.div>
    </motion.article>
  )
}

type AboutView = {
  title: string
  body: string
  imageUrl: string
}

type PillarView = {
  title: string
  body: string
  imageUrl: string
  imageAlt: string
}

export const AboutSection = () => {
  const intl = useIntl()
  const reduceMotion = useReducedMotion()

  const fallback: AboutView = {
    title: intl.formatMessage({ id: 'about.title' }),
    body: intl.formatMessage({ id: 'about.body' }),
    imageUrl: "",
  }

  const visionFallback: PillarView = {
    title: intl.formatMessage({ id: 'about.vision.title' }),
    body: intl.formatMessage({ id: 'about.vision.body' }),
    imageUrl: logo,
    imageAlt: intl.formatMessage({ id: 'about.vision.imageAlt' }),
  }

  const missionFallback: PillarView = {
    title: intl.formatMessage({ id: 'about.message.title' }),
    body: intl.formatMessage({ id: 'about.message.body' }),
    imageUrl: logo,
    imageAlt: intl.formatMessage({ id: 'about.message.imageAlt' }),
  }

  const [about, setAbout] = useState<AboutView>(fallback)
  const [vision, setVision] = useState<PillarView>(visionFallback)
  const [mission, setMission] = useState<PillarView>(missionFallback)

  useEffect(() => {
    setAbout(fallback)
    setVision(visionFallback)
    setMission(missionFallback)

    let cancelled = false

    const toPillar = (
      data: { title?: string | null; content?: string | null; image_url?: string | null } | null | undefined,
      fallbackPillar: PillarView,
      defaultImage: string,
    ): PillarView => ({
      title: data?.title?.trim() || fallbackPillar.title,
      body: data?.content?.trim() || fallbackPillar.body,
      imageUrl: data?.image_url?.trim() || defaultImage || fallbackPillar.imageUrl,
      imageAlt: data?.title?.trim() || fallbackPillar.imageAlt,
    })

    fetchAboutContent()
      .then((aboutData) => {
        if (cancelled || !aboutData) return

        const nextAbout: AboutView = {
          title: aboutData.title?.trim() || fallback.title,
          body: aboutData.content?.trim() || fallback.body,
          imageUrl: aboutData.image_url?.trim() || fallback.imageUrl,
        }

        setAbout(nextAbout)
        setVision(toPillar(aboutData.vision, visionFallback, nextAbout.imageUrl))
        setMission(toPillar(aboutData.message ?? aboutData.mission, missionFallback, nextAbout.imageUrl))
      })
      .catch(() => {
        if (cancelled) return
        setAbout(fallback)
        setVision(visionFallback)
        setMission(missionFallback)
      })

    return () => {
      cancelled = true
    }
  }, [intl])

  return (
    <section id="about" className="relative scroll-mt-24 overflow-hidden py-20 sm:py-24">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary-200 to-transparent"
        aria-hidden
      />
      <Container>
        <motion.div
          className={ cn("relative mx-auto mb-16  sm:mb-20 grid items-center gap-8 lg:grid-cols-2 lg:gap-12", about.imageUrl ? "grid items-center gap-8 lg:grid-cols-2 lg:gap-12" : "flex items-center justify-center max-w-3xl mx-auto")}
          initial={reduceMotion ? false : 'hidden'}
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={stagger}
        >
          <div className={cn( about.imageUrl ? "text-start" : "text-center")}>

            <div className="mb-5 inline-flex w-fit items-center gap-2 rounded-full  bg-primary backdrop-blur-2xl px-3 py-1 text-sm text-white">
              <Sparkles className="h-4 w-4 text-secondary-200" />
              {intl.formatMessage({ id: 'about.kicker' })}
            </div>
          <motion.h2
            className="mb-5 text-3xl font-semibold leading-tight text-[#0C0A28] sm:text-4xl lg:text-[2.5rem]"
            variants={fadeUp}
          >
            {about.title}
          </motion.h2>
          <motion.p
            className="text-base leading-relaxed text-tertiary-600 sm:text-lg"
            variants={fadeUp}
          >
            {about.body}
          </motion.p>
          </div>
          {about.imageUrl !== "" && (
            <div
            className={cn(
              'flex aspect-4/3 items-center justify-center overflow-hidden bg-white',
              "relative overflow-hidden rounded-3xl  shadow-lg" ,
            )}>
          <img
              src={about.imageUrl||logo}
              alt={about.title || 'about image'}
              loading="lazy"
              decoding="async"
              className={cn(
                'h-full w-full transition-transform duration-700 ease-out hover:scale-105',
                 'object-cover',
              )}
              onError={(event) => {
                if (event.currentTarget.dataset.fallbackApplied === 'true') return
                event.currentTarget.dataset.fallbackApplied = 'true'
                event.currentTarget.src = logo
              }}
            />
          </div>
          )}
        </motion.div>

        <div className="flex flex-col gap-16 sm:gap-20">
          <PillarCard
            title={vision.title}
            body={vision.body}
            imageSrc={vision.imageUrl}
            imageAlt={vision.imageAlt}
            icon={Eye}
            accent="secondary"
            reduceMotion={reduceMotion}
          />

          <PillarCard
            title={mission.title}
            body={mission.body}
            imageSrc={mission.imageUrl}
            imageAlt={mission.imageAlt}
            icon={Target}
            accent="primary"
            imageFirst
            reduceMotion={reduceMotion}
          />
        </div>
      </Container>
    </section>
  )
}
