import { Container } from '@/components/layout/Container'
import { DEFAULT_LOCALE, type Locale } from '@/i18n/locales'
import { getLocalizedPath } from '@/i18n/navigation'
import { fetchServiceContent, type ServiceContent } from '@/lib/content'
import { ArrowLeft, Sparkles } from 'lucide-react'
import { useEffect, useState } from 'react'
import { FormattedMessage } from 'react-intl'
import { Link, useLocation, useParams } from 'react-router-dom'

export const ServiceDetailPage = () => {
  const { slug } = useParams()
  const { pathname } = useLocation()
  const locale: Locale = pathname.startsWith('/en') ? 'en' : DEFAULT_LOCALE

  const [service, setService] = useState<ServiceContent | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!slug) {
      setService(null)
      setIsLoading(false)
      return
    }

    let cancelled = false
    setIsLoading(true)

    fetchServiceContent(slug)
      .then((data) => {
        if (cancelled) return
        setService(data)
      })
      .catch((error) => {
        console.error('Error fetching service:', error)
        if (!cancelled) setService(null)
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [slug, locale])

  if (isLoading) {
    return <Container className="py-20">{null}</Container>
  }

  if (!service) {
    return (
      <Container className="py-20 text-center">
        <h1 className="text-3xl text-primary">
          <FormattedMessage id="services.notFound" />
        </h1>

        <Link
          to={getLocalizedPath('/services', locale)}
          className="mt-4 inline-flex text-secondary-600"
          viewTransition={true}
        >
          <FormattedMessage id="services.back" />
        </Link>
      </Container>
    )
  }

  return (
    <Container className="py-20">
      <Link
        to={getLocalizedPath('/services', locale)}
        className="my-8 inline-flex items-center gap-2 text-sm font-semibold text-secondary-600 hover:text-primary"
        viewTransition={true}
      >
        <ArrowLeft className="size-4 rtl:rotate-180" />
        <FormattedMessage id="services.back" />
      </Link>

      <section className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <article className="text-start">
          <div className="inline-flex items-center gap-2 rounded-full bg-secondary/10 px-3 py-1 text-xs font-semibold tracking-[0.16em] text-secondary-700 uppercase">
            <Sparkles className="h-3.5 w-3.5" />
            <FormattedMessage id="services.kicker" />
          </div>

          <h1 className="mt-4 text-4xl font-semibold text-[#0C0A28] sm:text-5xl">
            {service.title}
          </h1>

          <p className="mt-5 text-lg leading-8 text-tertiary-600">
            {service.description}
          </p>


        </article>

        <div className="space-y-5">
          <div className="overflow-hidden rounded-[32px] border border-primary-100 bg-white shadow-[0_22px_60px_rgba(12,10,40,0.08)]">
            <div className="relative aspect-[1.15/1] overflow-hidden">
              <img
                src={service.image_url}
                alt={service.title}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-primary/75 via-primary/10 to-transparent" />
            </div>
          </div>
        </div>
      </section>



    </Container>
  )
}