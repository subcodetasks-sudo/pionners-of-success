import { Container } from '@/components/layout/Container';
import { SectionHeading } from '@/components/layout/SectionHeading';
import { BentoCard, BentoGrid } from '@/components/ui/bento-grid';
import { DEFAULT_LOCALE, type Locale } from '@/i18n/locales';
import { getLocalizedPath } from '@/i18n/navigation';
import { fetchServicesContent } from '@/lib/content';
import { cn } from '@/lib/utils';
import { ArrowRightIcon } from '@radix-ui/react-icons';
import {
    FileVideo2,
    Fingerprint,
    LineChart,
    Megaphone,
    MonitorSmartphone,
    Users,
} from 'lucide-react';
import { motion, useMotionTemplate, useMotionValue, type Variants } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Link, useLocation } from 'react-router-dom';

 export type ServiceView = {
    id: number
    title: string
    description: string
    icon: typeof Fingerprint | typeof MonitorSmartphone | typeof Megaphone | typeof FileVideo2 | typeof Users | typeof  LineChart | string
    image_url: string
    order: number
}


const ease = [0.22, 1, 0.36, 1] as const

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 36 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease },
  },
}

const serviceIcons = [Fingerprint, MonitorSmartphone, Megaphone, FileVideo2, Users, LineChart]

/** Bento layout for 6 items across a 3-col grid:
 *  Row 1: [2col, 1col]
 *  Row 2: [1col, 2col]
 *  Row 3: [1col, 1col, 1col] – last two fill cleanly when limit=3: [2col,1col] */
const bentoColSpan = [
  'col-span-3 lg:col-span-2', // 0 – wide
  'col-span-3 lg:col-span-1', // 1 – narrow
  'col-span-3 lg:col-span-1', // 2 – narrow
  'col-span-3 lg:col-span-2', // 3 – wide
  'col-span-3 lg:col-span-1', // 4 – narrow
  'col-span-3 lg:col-span-2', // 5 – wide (mirrors row 1 pattern)
]

type ServiceCardWrapperProps = {
  index: number
  service: ServiceView
  href: string
  cta: string
}

const ServiceCardWrapper = ({ index, service, href, cta }: ServiceCardWrapperProps) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(-999)
  const mouseY = useMotionValue(-999)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect()
    if (!rect) return
    mouseX.set(e.clientX - rect.left)
    mouseY.set(e.clientY - rect.top)
  }
  const handleMouseLeave = () => {
    mouseX.set(-999)
    mouseY.set(-999)
  }

  const borderGlow = useMotionTemplate`radial-gradient(220px circle at ${mouseX}px ${mouseY}px, rgba(17,144,207,0.6), transparent 70%)`
  const spotlight = useMotionTemplate`radial-gradient(260px circle at ${mouseX}px ${mouseY}px, rgba(17,144,207,0.10), transparent 80%)`

  const Icon = serviceIcons[index] ?? Fingerprint

  const background = (
    <div className="relative h-48 w-full overflow-hidden">
      <img
        src={service.image_url}
        alt=""
        className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
      />
      <div
        className="pointer-events-none absolute inset-0 "
        aria-hidden
      />
    </div>
  )

  return (
    <motion.div
      ref={cardRef}
      className={cn('relative flex flex-col', bentoColSpan[index])}
      variants={cardVariants}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* moving border glow — sits behind the card ring */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl"
        style={{ background: borderGlow }}
        aria-hidden
      />
      {/* spotlight */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-0 rounded-xl"
        style={{ background: spotlight }}
        aria-hidden
      />

      <BentoCard
        name={service.title}
        className="flex-1"
        background={background}
        Icon={Icon || Fingerprint}
        description={service.description}
        href={href}
        cta={cta}
      />
    </motion.div>
  )
}

type ServicesSectionProps = {
  showViewAll?: boolean
}

export const ServicesSection = ({ showViewAll = true }: ServicesSectionProps) => {
  const { pathname } = useLocation()
  const intl = useIntl()
  
  const locale: Locale = pathname.startsWith('/en') ? 'en' : DEFAULT_LOCALE
  
  const cta = intl.formatMessage({ id: 'services.viewDetails' })
  
  const [services, setServices] = useState<ServiceView[]>([])
  
  const isServicesPage = pathname.endsWith('/services')
  
  const displayedServices = isServicesPage
    ? services
    : services.slice(0, 4)



    useEffect(() => {
      fetchServicesContent()
        .then((data) => {
          console.log('Services data:', data)
    
          if (!data) return
    
          setServices(
            data.map((service) => ({
              id: service.id,
              title: service.title,
              description: service.description,
              icon: service.icon,
              image_url: service.image_url,
              order: service.order,
            }))
          )
        })
        .catch((error) => {
          console.error('Error fetching services:', error)
        })
    }, [locale])

  return (
    <section id="services" className="scroll-mt-30 bg-white pt-24 pb-18">
      <Container>
        <SectionHeading
          kicker="services.kicker"
          title="services.title"
          subtitle="services.subtitle"
        />

<div>
  <BentoGrid className="auto-rows-auto items-stretch">
    {displayedServices.map((service, i) => (
      <ServiceCardWrapper
        key={service.id}
        index={i}
        service={service}
        href={getLocalizedPath(`/services/${service.id}`, locale)}
        cta={cta}
      />
    ))}
  </BentoGrid>
</div>

        {showViewAll ? (
          <div className="mt-10 flex justify-center">
            <Link
              to={getLocalizedPath('/services', locale)}
              className="inline-flex items-center gap-2 rounded-full bg-primary! py-2 ps-5 pe-2 text-sm font-semibold text-white transition-all duration-200 hover:brightness-110"
              viewTransition={true}
            >
              <FormattedMessage id="services.viewAll" />
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white">
                <ArrowRightIcon className="size-3.5 rtl:-rotate-135 ltr:-rotate-45 text-primary!" />
              </span>
            </Link>
          </div>
        ) : null}
      </Container>
    </section>
  )
}
