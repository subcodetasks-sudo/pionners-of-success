import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { FaWhatsapp } from 'react-icons/fa'
import { DEFAULT_LOCALE, type Locale } from '@/i18n/locales'
import { fetchContactContent } from '@/lib/content'

export const WhatsAppFloatButton = () => {
  const { pathname } = useLocation()
  const locale: Locale = pathname.startsWith('/en') ? 'en' : DEFAULT_LOCALE
  const [whatsapp, setWhatsapp] = useState<string | null>(null)

  useEffect(() => {
    fetchContactContent()
      .then((data) => setWhatsapp(data?.whatsapp ?? null))
      .catch((error) => {
        console.error('Error fetching contact:', error)
      })
  }, [locale])

  if (!whatsapp) return null

  return (
    <a
      href={`https://wa.me/${whatsapp.replace(/[^\d]/g, '')}`}
      target="_blank"
      rel="noreferrer"
      aria-label="WhatsApp"
      className="fixed right-5 bottom-5 z-50 flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_12px_30px_rgba(37,211,102,0.45)] transition hover:brightness-105 sm:right-6 sm:bottom-6"
    >
      <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-60 animate-ping" />
      <FaWhatsapp className="relative size-7" />
    </a>
  )
}
