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
        className="mb-6 inline-flex items-center gap-2 text-xl text-secondary-600 hover:text-primary"
        viewTransition={true}
      >
        <ArrowLeft className="size-4 rtl:rotate-180" />
        <FormattedMessage id="services.back" />
      </Link>

      <div className="grid items-center gap-10 lg:grid-cols-2">
       
        <article className="text-start">
          <p className="text-3xl! font-medium tracking-wide text-secondary-600">
            <FormattedMessage id="services.kicker" />
          </p>

          <h1 className="mt-2 text-3xl! text-primary! sm:text-4xl!">
            <FormattedMessage id={service.titleKey} />
          </h1>

          <p className="mb-2 py-6 text-lg text-tertiary-600">
            <FormattedMessage id={service.summaryKey} />
          </p>

          <div className="rounded-2xl bg-white p-4 ring-1 ring-primary-100">
            <p className="text-tertiary-700">
              <FormattedMessage id={service.bodyKey} />
            </p>
          </div>
        </article>

        <div className="flex justify-center">
          <img
            src="/public/imgs/sponsers/al-ahli-club.webp"
            alt="Service"
            className="w-full max-w-m object-contain"
          />
        </div>

      </div>
    </Container>
  )
}