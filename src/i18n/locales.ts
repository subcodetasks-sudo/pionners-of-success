export const LOCALES = ['en', 'ar'] as const

export type Locale = (typeof LOCALES)[number]

export const DEFAULT_LOCALE: Locale = 'ar'

export const LOCALE_DIR: Record<Locale, 'ltr' | 'rtl'> = {
  en: 'ltr',
  ar: 'rtl',
}

export const isLocale = (value: string | undefined): value is Locale =>
  LOCALES.includes(value as Locale)

export const getCurrentLocale = (): Locale => {
  if (typeof window === 'undefined') return DEFAULT_LOCALE

  const documentLang = document.documentElement.lang
  if (isLocale(documentLang)) return documentLang

  return window.location.pathname.startsWith('/en') ? 'en' : DEFAULT_LOCALE
}
