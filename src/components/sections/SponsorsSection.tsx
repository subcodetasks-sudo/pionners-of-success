import logo from '@/assets/Logo.webp';
import { type LogoItem } from '@/components/LogoLoop';
import { fetchPartnersContent } from '@/lib/content';
import { useEffect, useRef, useState } from 'react';
import { useIntl } from 'react-intl';
import { Marquee } from '../ui/marquee';

const fallbackSponsorLogos: LogoItem[] = [
  { src: '/imgs/sponsers/ahmed-almaghribi.webp', alt: 'Ahmed Almaghribi' },
  { src: '/imgs/sponsers/al-ahli-club.webp', alt: 'Al Ahli Club' },
  { src: '/imgs/sponsers/alhadaya-center.webp', alt: 'Alhadaya Center' },
  { src: '/imgs/sponsers/alsaif-gallery.webp', alt: 'Alsaif Gallery' },
  { src: '/imgs/sponsers/alsorayai-group.webp', alt: 'Alsorayai Group' },
  { src: '/imgs/sponsers/alwafa.webp', alt: 'Alwafa' },
  { src: '/imgs/sponsers/b-laban.webp', alt: 'B Laban' },
  { src: '/imgs/sponsers/bayut.webp', alt: 'Bayut' },
  { src: '/imgs/sponsers/beauty-secrets.webp', alt: 'Beauty Secrets' },
  { src: '/imgs/sponsers/beesline.webp', alt: 'Beesline' },
  { src: '/imgs/sponsers/bin-shihon.webp', alt: 'Bin Shihon' },
  { src: '/imgs/sponsers/blooming.webp', alt: 'Blooming' },
  { src: '/imgs/sponsers/blue-green.webp', alt: 'Blue Green' },
  { src: '/imgs/sponsers/boqsha.webp', alt: 'Boqsha' },
  { src: '/imgs/sponsers/care-outlet.webp', alt: 'Care Outlet' },
  { src: '/imgs/sponsers/centrepoint.webp', alt: 'Centrepoint' },
  { src: '/imgs/sponsers/chuck-e-cheese.webp', alt: "Chuck E. Cheese" },
  { src: '/imgs/sponsers/circle-k.webp', alt: 'Circle K' },
  { src: '/imgs/sponsers/danube-properties.webp', alt: 'Danube Properties' },
  { src: '/imgs/sponsers/dune-london.webp', alt: 'Dune London' },
  { src: '/imgs/sponsers/enjaz.webp', alt: 'Enjaz' },
  { src: '/imgs/sponsers/faces.webp', alt: 'Faces' },
  { src: '/imgs/sponsers/fresh.webp', alt: 'Fresh' },
  { src: '/imgs/sponsers/gap.webp', alt: 'GAP' },
  { src: '/imgs/sponsers/hamadah-albaher.webp', alt: 'Hamadah Albaher' },
  { src: '/imgs/sponsers/honor.webp', alt: 'Honor' },
  { src: '/imgs/sponsers/ibraq.webp', alt: 'Ibraq' },
  { src: '/imgs/sponsers/max.webp', alt: 'Max' },
  { src: '/imgs/sponsers/mira-mart.webp', alt: 'Mira Mart' },
  { src: '/imgs/sponsers/nahdi.webp', alt: 'Nahdi' },
  { src: '/imgs/sponsers/nayomi.webp', alt: 'Nayomi' },
  { src: '/imgs/sponsers/okaz.webp', alt: 'Okaz' },
  { src: '/imgs/sponsers/promise.webp', alt: 'Promise' },
  { src: '/imgs/sponsers/qasr-alawani.webp', alt: 'Qasr Alawani' },
  { src: '/imgs/sponsers/redtag.webp', alt: 'Redtag' },
  { src: '/imgs/sponsers/sadan.webp', alt: 'Sadan' },
  { src: '/imgs/sponsers/samsung.webp', alt: 'Samsung' },
  { src: '/imgs/sponsers/sheglam.webp', alt: 'Sheglam' },
  { src: '/imgs/sponsers/shein.webp', alt: 'SHEIN' },
  { src: '/imgs/sponsers/skechers.webp', alt: 'Skechers' },
  { src: '/imgs/sponsers/splash.webp', alt: 'Splash' },
  { src: '/imgs/sponsers/the-body-shop.webp', alt: 'The Body Shop' },
  { src: '/imgs/sponsers/tim-hortons.png', alt: 'Tim Hortons' },
  { src: '/imgs/sponsers/trendyol.png', alt: 'Trendyol' },
  { src: '/imgs/sponsers/united-pharmacy.png', alt: 'United Pharmacy' },
  { src: '/imgs/sponsers/zahran.webp', alt: 'Zahran' },
]

const toPartnerLogo = (partner: { name: string; url: string; logo_url: string }): LogoItem => {
  const href = partner.url?.trim()
  return {
    src: partner.logo_url?.trim() || logo,
    alt: partner.name,
    title: partner.name,
    href: href || undefined,
    fallbackSrc: logo,
  }
}

export const SponsorsSection = () => {
  const { locale } = useIntl()
  // const isRtl = isLocale(locale) ? LOCALE_DIR[locale] === 'rtl' : true
  const sectionRef = useRef<HTMLElement>(null)
  const [logos, setLogos] = useState<LogoItem[]>(fallbackSponsorLogos)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    let cancelled = false
    setLogos(fallbackSponsorLogos)

    const loadPartners = () => {
      fetchPartnersContent()
        .then((data) => {
          if (cancelled || !data?.length) return
          setLogos(data.map(toPartnerLogo))
        })
        .catch(() => {
          if (!cancelled) setLogos(fallbackSponsorLogos)
        })
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()
        loadPartners()
      },
      { rootMargin: '280px 0px' },
    )

    observer.observe(section)

    return () => {
      cancelled = true
      observer.disconnect()
    }
  }, [locale])

  return (
    <section ref={sectionRef} className="overflow-hidden   pt-6">

      <div className="my-10">

        <div dir="ltr" className="relative flex w-full flex-row items-center justify-center overflow-hidden">
        <Marquee pauseOnHover className="[--duration:90s]">
  {logos?.map((logo) => (
    <a
      href={logo.href || ""}
      target="_blank"
      rel="noopener noreferrer"
      key={logo.id}
      className="flex w-32 h-24 items-center justify-center shrink-0"
    >
      <img
        src={logo.src}
        alt=""
        className="w-full h-full object-contain"
      />
    </a>
  ))}
</Marquee>
      <div className="from-background pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r"></div>
      <div className="from-background pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l"></div>
    </div>
      </div>
    </section>
  )
}
