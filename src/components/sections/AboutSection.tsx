import { FormattedMessage, useIntl } from 'react-intl'
import { Eye, Sparkles, Target } from 'lucide-react'
import { motion, useReducedMotion, type Variants } from 'motion/react'
import logo from '@/assets/Logo.webp'
import { Container } from '@/components/layout/Container'
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
  kickerId: 'about.vision.kicker' | 'about.message.kicker'
  titleId: 'about.vision.title' | 'about.message.title'
  bodyId: 'about.vision.body' | 'about.message.body'
  imageSrc: string
  imageAltId: 'about.vision.imageAlt' | 'about.message.imageAlt'
  icon: typeof Eye
  accent: 'secondary' | 'primary'
  imageFirst?: boolean
  reduceMotion: boolean | null
}

const PillarCard = ({
  kickerId,
  titleId,
  bodyId,
  imageSrc,
  imageAltId,
  icon: Icon,
  accent,
  imageFirst = false,
  reduceMotion,
}: PillarCardProps) => {
  const intl = useIntl()
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
          <div className="flex aspect-4/3 items-center justify-center overflow-hidden bg-white p-10 sm:p-14">
            <img
              src={imageSrc}
              alt={intl.formatMessage({ id: imageAltId })}
              className="h-full w-full object-contain transition-transform duration-700 ease-out hover:scale-105"
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
        <motion.p
          className="mb-3 text-sm font-semibold tracking-wide text-secondary-600"
          variants={fadeUp}
        >
          <FormattedMessage id={kickerId} />
        </motion.p>
        <motion.h3
          className="mb-4 text-2xl font-semibold leading-snug text-primary sm:text-3xl"
          variants={fadeUp}
        >
          <FormattedMessage id={titleId} />
        </motion.h3>
        <motion.p className="text-base leading-relaxed text-tertiary-600 sm:text-lg" variants={fadeUp}>
          <FormattedMessage id={bodyId} />
        </motion.p>
      </motion.div>
    </motion.article>
  )
}

export const AboutSection = () => {
  const reduceMotion = useReducedMotion()

  return (
    <section id="about" className="relative scroll-mt-24 overflow-hidden py-20 sm:py-24">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary-200 to-transparent"
        aria-hidden
      />
      <Container>
        <motion.div
          className="relative mx-auto mb-16 max-w-3xl text-center sm:mb-20"
          initial={reduceMotion ? false : 'hidden'}
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={stagger}
        >
          <motion.div
            className="mb-4 inline-flex items-center gap-2 rounded-full bg-secondary-50 px-4 py-1.5 text-sm font-medium text-secondary-700 ring-1 ring-secondary-200/80"
            variants={fadeUp}
          >
            <Sparkles className="size-4 text-secondary-500" />
            <FormattedMessage id="about.kicker" />
          </motion.div>
          <motion.h2
            className="mb-5 text-3xl font-semibold leading-tight text-primary sm:text-4xl lg:text-[2.5rem]"
            variants={fadeUp}
          >
            <FormattedMessage id="about.title" />
          </motion.h2>
          <motion.p
            className="text-base leading-relaxed text-tertiary-600 sm:text-lg"
            variants={fadeUp}
          >
            <FormattedMessage id="about.body" />
          </motion.p>
        </motion.div>

        <div className="flex flex-col gap-16 sm:gap-20">
          <PillarCard
            kickerId="about.vision.kicker"
            titleId="about.vision.title"
            bodyId="about.vision.body"
            imageSrc={logo}
            imageAltId="about.vision.imageAlt"
            icon={Eye}
            accent="secondary"
            reduceMotion={reduceMotion}
          />

          <PillarCard
            kickerId="about.message.kicker"
            titleId="about.message.title"
            bodyId="about.message.body"
            imageSrc={logo}
            imageAltId="about.message.imageAlt"
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
