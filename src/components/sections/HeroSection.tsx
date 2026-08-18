import { FormattedMessage, useIntl } from 'react-intl'
import { Link, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { motion, useReducedMotion, type Variants } from 'motion/react'
import logo from '@/assets/Logo.webp'
import CountUp from '@/components/CountUp'
import Grainient from '@/components/Grainient'
import { Container } from '@/components/layout/Container'
import { buttonVariants } from '@/components/ui/button'
import { DEFAULT_LOCALE, type Locale } from '@/i18n/locales'
import { getLocalizedPath } from '@/i18n/navigation'
import { fetchHeroContent, fetchStatsContent } from '@/lib/content'
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
    transition: { staggerChildren: 0.14, delayChildren: 0.28 },
  },
}

const fallbackStats = [
  { id: 'stat-1', to: 12, suffix: '+', labelId: 'about.stat1.label' },
  { id: 'stat-2', to: 180, suffix: '+', labelId: 'about.stat2.label' },
  { id: 'stat-3', to: 40, suffix: '+', labelId: 'about.stat3.label' },
] as const

type HeroView = {
  title: string
  subtitle: string
  ctaText: string
  ctaUrl: string
  imageUrl: string
}

type StatView = {
  id: string
  to: number | null
  prefix: string
  suffix: string
  display: string
  label: string
}

const isExternalUrl = (url: string) => /^https?:\/\//i.test(url)

const parseStatValue = (value: string) => {
  const match = value.trim().match(/^([^\d]*)(\d+(?:[.,]\d+)?)(.*)$/)
  if (!match) {
    return { prefix: '', to: null, suffix: '', display: value.trim() }
  }

  return {
    prefix: match[1],
    to: Number(match[2].replace(',', '')),
    suffix: match[3],
    display: value.trim(),
  }
}

export const HeroSection = () => {
  const intl = useIntl()
  const { pathname } = useLocation()
  const locale: Locale = pathname.startsWith('/en') ? 'en' : DEFAULT_LOCALE
  const reduceMotion = useReducedMotion()

  const fallback: HeroView = {
    title: intl.formatMessage({ id: 'hero.title' }),
    subtitle: intl.formatMessage({ id: 'hero.subtitle' }),
    ctaText: intl.formatMessage({ id: 'hero.cta.primary' }),
    ctaUrl: getLocalizedPath('/services', locale),
    imageUrl: logo,
  }

  const [hero, setHero] = useState<HeroView>(fallback)
  const [stats, setStats] = useState<StatView[]>(
    fallbackStats.map((stat) => ({
      id: stat.id,
      to: stat.to,
      prefix: '',
      suffix: stat.suffix,
      display: `${stat.to}${stat.suffix}`,
      label: intl.formatMessage({ id: stat.labelId }),
    })),
  )

  useEffect(() => {
    setHero(fallback)
    setStats(
      fallbackStats.map((stat) => ({
        id: stat.id,
        to: stat.to,
        prefix: '',
        suffix: stat.suffix,
        display: `${stat.to}${stat.suffix}`,
        label: intl.formatMessage({ id: stat.labelId }),
      })),
    )

    let cancelled = false

    fetchHeroContent()
      .then((data) => {
        if (cancelled || !data) return

        const ctaUrl = data.cta_url?.trim()
        setHero({
          title: data.title?.trim() || fallback.title,
          subtitle: data.subtitle?.trim() || fallback.subtitle,
          ctaText: data.cta_text?.trim() || fallback.ctaText,
          ctaUrl: ctaUrl
            ? isExternalUrl(ctaUrl)
              ? ctaUrl
              : getLocalizedPath(ctaUrl, locale)
            : fallback.ctaUrl,
          imageUrl: data.image_url?.trim() || fallback.imageUrl,
        })
      })
      .catch(() => {
        if (!cancelled) setHero(fallback)
      })

    fetchStatsContent()
      .then((data) => {
        if (cancelled || !data?.length) return

        setStats(
          data.map((stat) => {
            const parsed = parseStatValue(stat.value || '')
            return {
              id: String(stat.id),
              to: parsed.to,
              prefix: parsed.prefix,
              suffix: parsed.suffix,
              display: parsed.display || stat.value,
              label: stat.label?.trim() || '',
            }
          }),
        )
      })
      .catch(() => {
        if (!cancelled) {
          setStats(
            fallbackStats.map((stat) => ({
              id: stat.id,
              to: stat.to,
              prefix: '',
              suffix: stat.suffix,
              display: `${stat.to}${stat.suffix}`,
              label: intl.formatMessage({ id: stat.labelId }),
            })),
          )
        }
      })

    return () => {
      cancelled = true
    }
  }, [locale, intl])

  const ctaClassName = cn(
    buttonVariants({ size: 'lg' }),
    'h-11 gap-2 rounded-full border-secondary-300 bg-secondary-200 px-6 text-primary-950 hover:bg-secondary-300 hover:text-primary-950',
  )

  return (
    <section id="home" className="relative flex min-h-dvh scroll-mt-24 items-center overflow-hidden">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <Grainient
          color1="#F4F8FE"
          color2="#BAE6FD"
          color3="#E2E2EC"
          contrast={1.08}
          gamma={1.12}
          saturation={0.85}
          grainAmount={0.06}
          timeSpeed={0.18}
          warpStrength={0.7}
          warpAmplitude={70}
        />
      </div>
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-24 bg-linear-to-b from-transparent to-white"
        aria-hidden
      />
      <Container className="relative z-10 flex w-full flex-col items-center py-24 text-center">
        <motion.div
          className="flex w-full flex-col items-center"
          initial={reduceMotion ? false : 'hidden'}
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={stagger}
        >
          <motion.img
            src={hero.imageUrl}
            alt={intl.formatMessage({ id: 'brand.name' })}
            className="h-20 w-auto sm:h-25"
            variants={fadeUp}
          />
          <motion.h1
            className="mb-4 max-w-3xl text-4xl leading-tight text-primary! sm:text-5xl"
            variants={fadeUp}
          >
            {hero.title}
          </motion.h1>
          <motion.p
            className="max-w-xl text-base text-primary-800 sm:text-lg"
            variants={fadeUp}
          >
            {hero.subtitle}
          </motion.p>
          <motion.div className="mt-12 flex flex-wrap justify-center gap-3" variants={fadeUp}>
            {isExternalUrl(hero.ctaUrl) ? (
              <a href={hero.ctaUrl} className={ctaClassName}>
                {hero.ctaText}
                <ArrowRight className="size-4 rtl:rotate-180" />
              </a>
            ) : (
              <Link to={hero.ctaUrl} className={ctaClassName} viewTransition={true}>
                {hero.ctaText}
                <ArrowRight className="size-4 rtl:rotate-180" />
              </Link>
            )}
            <a
              href={`${getLocalizedPath('/', locale)}#events`}
              className={cn(
                buttonVariants({ variant: 'outline', size: 'lg' }),
                'h-11 gap-2 rounded-full border-primary-300 bg-white/40 px-6 text-primary-950 backdrop-blur-sm hover:bg-primary-50 hover:text-primary-950',
              )}
            >
              <FormattedMessage id="hero.cta.secondary" />
            </a>
          </motion.div>

          

          <motion.div
            className="mt-10 flex w-full max-w-3xl flex-wrap items-start justify-center gap-8 sm:gap-12"
            variants={fadeUp}
          >
            {stats.map((stat) => (
              <div key={stat.id} className="min-w-28">
                <p className="text-3xl font-semibold tracking-tight text-primary-950 sm:text-4xl">
                  {stat.to === null ? (
                    stat.display
                  ) : (
                    <>
                      {stat.prefix}
                      <CountUp to={stat.to} duration={1.6} />
                      {stat.suffix}
                    </>
                  )}
                </p>
                <p className="mt-1 text-sm text-primary-800">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
}
