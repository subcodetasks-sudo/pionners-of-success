import { FormattedMessage } from 'react-intl'
import { Link, useLocation, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { Container } from '@/components/layout/Container'
import { getServiceBySlug } from '@/data/services'
import { DEFAULT_LOCALE, type Locale } from '@/i18n/locales'
import { getLocalizedPath } from '@/i18n/navigation'

export const ServiceDetailPage = () => {
  const { slug } = useParams()
  const { pathname } = useLocation()
  const locale: Locale = pathname.startsWith('/en') ? 'en' : DEFAULT_LOCALE
  const service = getServiceBySlug(slug)

  if (!service) {
    return (
      <Container className="py-20 text-center">
        <h1 className="text-3xl text-primary">
          <FormattedMessage id="services.notFound" />
        </h1>
        <Link to={getLocalizedPath('/services', locale)} className="mt-4 inline-flex text-secondary-600" viewTransition={true}>
          <FormattedMessage id="services.back" />
        </Link>
      </Container>
    )
  }

  return (
    <Container className="py-16">
      <Link
        to={getLocalizedPath('/services', locale)}
        className="mb-8 inline-flex items-center gap-2 text-sm text-secondary-600 hover:text-primary"
        viewTransition={true}
      >
        <ArrowLeft className="size-4 rtl:rotate-180" />
        <FormattedMessage id="services.back" />
      </Link>
      <article className="max-w-3xl text-start">
        <p className="mb-2 text-sm font-medium tracking-wide text-secondary-600">
          <FormattedMessage id="services.kicker" />
        </p>
        <h1 className="mb-4 text-4xl text-primary">
          <FormattedMessage id={service.titleKey} />
        </h1>
        <p className="mb-6 text-lg text-tertiary-600">
          <FormattedMessage id={service.summaryKey} />
        </p>
        <div className="rounded-2xl bg-white p-6 ring-1 ring-primary-100">
          <p className="text-tertiary-700">
            <FormattedMessage id={service.bodyKey} />
          </p>
        </div>
      </article>
    </Container>
  )
}
