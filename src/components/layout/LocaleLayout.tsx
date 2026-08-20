import { useEffect, useLayoutEffect } from 'react'
import { IntlProvider } from 'react-intl'
import { Outlet, useLocation, useParams } from 'react-router-dom'
import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'
import { WhatsAppFloatButton } from '@/components/layout/WhatsAppFloatButton'
import { DEFAULT_LOCALE, isLocale, LOCALE_DIR, type Locale } from '@/i18n/locales'
import { getMessages } from '@/i18n/messages'

const DocumentLocale = ({ locale }: { locale: Locale }) => {
  useLayoutEffect(() => {
    document.documentElement.lang = locale
    document.documentElement.dir = LOCALE_DIR[locale]
  }, [locale])

  return null
}

type LocaleLayoutProps = {
  forcedLocale?: Locale
}

export const LocaleLayout = ({ forcedLocale }: LocaleLayoutProps) => {
  const { locale: paramLocale } = useParams()
  const { pathname, hash } = useLocation()
  const activeLocale: Locale = forcedLocale || (isLocale(paramLocale) ? paramLocale : DEFAULT_LOCALE)
  const isGalleryRoute = pathname.includes('/gallery')

  // Scroll to hash section after every navigation (React Router v6 doesn't do this natively).
  // Retries for up to ~1 s to handle sections that mount asynchronously after data fetches.
  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'auto' })
      return
    }
    const id = hash.slice(1) // strip leading '#'
    let attempts = 0
    const maxAttempts = 20

    const tryScroll = () => {
      const el = document.getElementById(id)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        return
      }
      if (++attempts < maxAttempts) {
        setTimeout(tryScroll, 50)
      }
    }

    tryScroll()
  }, [pathname, hash])

  return (
    <IntlProvider locale={activeLocale} messages={getMessages(activeLocale)} defaultLocale={DEFAULT_LOCALE}>
      <DocumentLocale locale={activeLocale} />
      <div className="flex min-h-svh flex-col bg-neutral-100 text-primary">
        <Header />
        <main className="flex-1">
          <Outlet />
        </main>
        {isGalleryRoute ? null : <Footer />}
        <WhatsAppFloatButton />
      </div>
    </IntlProvider>
  )
}
