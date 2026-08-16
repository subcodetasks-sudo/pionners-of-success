import { FormattedMessage } from 'react-intl'
import { Link, useLocation } from 'react-router-dom'
import { Container } from '@/components/layout/Container'
import { DEFAULT_LOCALE, type Locale } from '@/i18n/locales'
import { getLocalizedPath } from '@/i18n/navigation'

export const NotFoundPage = () => {
  const { pathname } = useLocation()
  const locale: Locale = pathname.startsWith('/en') ? 'en' : DEFAULT_LOCALE

  return (
    <Container className="py-24 text-center">
      <h1 className="text-4xl text-primary">
        <FormattedMessage id="notFound.title" />
      </h1>
      <p className="mt-3 text-tertiary-600">
        <FormattedMessage id="notFound.body" />
      </p>
      <Link to={getLocalizedPath('/', locale)} className="mt-6 inline-block text-secondary-600" viewTransition={true}>
        <FormattedMessage id="notFound.home" />
      </Link>
    </Container>
  )
}
