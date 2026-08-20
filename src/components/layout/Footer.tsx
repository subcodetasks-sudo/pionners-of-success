import { useEffect, useState } from 'react'
import { FormattedMessage } from 'react-intl'
import { Link, useLocation } from 'react-router-dom'
import { Mail, MapPin, Phone } from 'lucide-react'
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter, FaWhatsapp } from 'react-icons/fa'
import logo from '@/assets/logo.svg'
import { Container } from '@/components/layout/Container'
import { DEFAULT_LOCALE, type Locale } from '@/i18n/locales'
import { getLocalizedPath } from '@/i18n/navigation'
import { fetchContactContent, type ContactContent } from '@/lib/content'

export const Footer = () => {
  const { pathname } = useLocation()
  const locale: Locale = pathname.startsWith('/en') ? 'en' : DEFAULT_LOCALE
  const year = new Date().getFullYear()
  const [contact, setContact] = useState<ContactContent | null>(null)

  useEffect(() => {
    fetchContactContent()
      .then((data) => setContact(data))
      .catch((error) => {
        console.error('Error fetching contact:', error)
      })
  }, [locale])

  const socialLinks = [
    { url: contact?.facebook, label: 'Facebook', Icon: FaFacebookF },
    { url: contact?.instagram, label: 'Instagram', Icon: FaInstagram },
    { url: contact?.twitter, label: 'Twitter', Icon: FaTwitter },
    { url: contact?.linkedin, label: 'LinkedIn', Icon: FaLinkedinIn },
  ].filter((item): item is { url: string; label: string; Icon: typeof FaFacebookF } => Boolean(item.url))

  return (
    <footer className="border-t border-primary-900/20 bg-primary text-primary-100">
      <Container className="grid gap-8 py-12 sm:grid-cols-2 lg:grid-cols-3 items-end">
        <div>
          <Link to={getLocalizedPath('/', locale)} className="mb-3 flex items-center gap-2" viewTransition={true}>
            <img src={logo} alt="" className="size-9" />
            <span className="font-semibold text-white">
              <FormattedMessage id="brand.name" />
            </span>
          </Link>
          <p className="max-w-sm text-sm text-primary-200">
            <FormattedMessage id="footer.tagline" />
          </p>

          {socialLinks.length > 0 && (
            <div className="mt-5 flex items-center gap-3">
              {socialLinks.map(({ url, label, Icon }) => (
                <a
                  key={label}
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="flex size-9 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-secondary hover:text-white"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          )}
        </div>

        <div className="text-sm">
          <p className="mb-2 font-medium text-white">
            <FormattedMessage id="footer.contact" />
          </p>
          <div className="flex flex-col gap-2">
            {contact?.email ? (
              <a
                className="inline-flex items-center gap-2 text-secondary-300 hover:text-white"
                href={`mailto:${contact.email}`}
              >
                <Mail className="size-4 shrink-0" />
                {contact.email}
              </a>
            ) : (
              <a className="inline-flex items-center gap-2 text-secondary-300 hover:text-white" href="mailto:hello@pioneersofsuccess.com">
                <Mail className="size-4 shrink-0" />
                <FormattedMessage id="footer.email" />
              </a>
            )}

            {contact?.phone && (
              <a
                className="inline-flex items-center gap-2 text-secondary-300 hover:text-white"
                href={`tel:${contact.phone}`}
              >
                <Phone className="size-4 shrink-0" />
                {contact.phone}
              </a>
            )}

            {contact?.whatsapp && (
              <a
                className="inline-flex items-center gap-2 text-secondary-300 hover:text-white"
                href={`https://wa.me/${contact.whatsapp.replace(/[^\d]/g, '')}`}
                target="_blank"
                rel="noreferrer"
              >
                <FaWhatsapp className="size-4 shrink-0" />
                {contact.whatsapp}
              </a>
            )}

            {contact?.address && (
              <span className="inline-flex items-center gap-2 text-primary-200">
                <MapPin className="size-4 shrink-0" />
                {contact.address}
              </span>
            )}
          </div>
        </div>

        <div className="flex items-end text-sm text-primary-300 lg:justify-end">
          <p>
            © {year} <FormattedMessage id="brand.name" />. <FormattedMessage id="footer.rights" />
          </p>
        </div>
      </Container>
    </footer>
  )
}
