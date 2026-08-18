import { CheckCircle2, Sparkles } from 'lucide-react'
import { motion, useReducedMotion, type Variants } from 'motion/react'
import { FormattedMessage } from 'react-intl'
import { Container } from '@/components/layout/Container'
import { cn } from '@/lib/utils'

const items = [1, 2, 3, 4] as const
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
    transition: { staggerChildren: 0.1, delayChildren: 0.06 },
  },
}

export const UspSection = () => {
  const reduceMotion = useReducedMotion()

  return (
    <section className="relative overflow-hidden bg-primary py-18 text-white">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(17,144,207,0.3),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.1),transparent_24%)]"
        aria-hidden
      />
      <Container>
        <motion.div
          className="grid items-stretch gap-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]"
          initial={reduceMotion ? false : 'hidden'}
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={stagger}
        >
          <motion.div
            className="relative flex h-full flex-col overflow-hidden rounded-[28px] border border-white/12 bg-white/6 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.18)] backdrop-blur-sm sm:p-8"
            variants={fadeUp}
          >
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/60 to-transparent"
              aria-hidden
            />
            <div className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-sm text-white/85">
              <Sparkles className="h-4 w-4 text-secondary-200" />
              <FormattedMessage id="usp.kicker" />
            </div>
            <h2 className="max-w-md text-3xl font-semibold leading-tight text-white! sm:text-4xl">
              <FormattedMessage id="usp.title" />
            </h2>
            <p className="mt-4 max-w-lg text-sm leading-7 text-primary-100 sm:text-base">
              <FormattedMessage id="usp.item1.body" />
            </p>
            <motion.div
              className="relative mt-8 min-h-52 overflow-hidden rounded-[22px] border border-white/10"
              variants={fadeUp}
            >
              <motion.img
                src="/imgs/services/strategic-consulting.webp"
                alt=""
                className="h-full w-full object-cover"
                initial={reduceMotion ? undefined : { scale: 1.06 }}
                whileInView={reduceMotion ? undefined : { scale: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.9, ease }}
              />
              <div
                className="pointer-events-none absolute inset-0 bg-linear-to-t from-primary/85 via-primary/20 to-transparent"
                aria-hidden
              />
            </motion.div>
          </motion.div>

          <motion.div className="grid auto-rows-fr gap-4 sm:grid-cols-2" variants={stagger}>
            {items.map((n) => (
              <motion.div
                key={n}
                className={cn(
                  'group relative flex h-full flex-col overflow-hidden rounded-[24px] border border-white/12 bg-white/8 p-6 shadow-[0_20px_40px_rgba(0,0,0,0.14)] backdrop-blur-sm transition-transform duration-300 hover:-translate-y-1',
                  'before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-linear-to-r before:from-transparent before:via-white/60 before:to-transparent before:content-[""]'
                )}
                variants={fadeUp}
              >
                <div className="mb-5 flex items-center justify-between gap-3">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-secondary/18 text-secondary-100 ring-1 ring-white/10">
                    <CheckCircle2 className="h-5 w-5" />
                  </span>
                  <span className="text-sm font-medium tracking-[0.24em] text-white/35">0{n}</span>
                </div>
                <h3 className="mb-2 text-lg font-semibold text-white">
                  <FormattedMessage id={`usp.item${n}.title`} />
                </h3>
                <p className="text-sm leading-7 text-primary-100">
                  <FormattedMessage id={`usp.item${n}.body`} />
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
}
