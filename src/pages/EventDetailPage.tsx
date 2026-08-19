import { FormattedMessage, useIntl } from 'react-intl'
import { Link, useLocation, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, CalendarDays, CheckCircle2, MapPin, Sparkles } from 'lucide-react'
import { Container } from '@/components/layout/Container'
import { getEventBySlug } from '@/data/events'
import { DEFAULT_LOCALE, type Locale } from '@/i18n/locales'
import { getLocalizedPath } from '@/i18n/navigation'

const extraContent = {
  ar: {
    'leading-through-change': {
      overview:
        'ورشة عملية تساعد القادة على إدارة التحوّل بوضوح، وبناء لغة مشتركة داخل الفرق، واتخاذ قرارات أسرع دون إضعاف الثقة أو جودة التنفيذ.',
      agenda: [
        'تشخيص أنماط المقاومة داخل الفريق وتحديد أولويات التغيير.',
        'أدوات عملية لإدارة الاجتماعات والرسائل خلال مراحل التحوّل.',
        'خطة متابعة أسبوعية تساعد القائد على تثبيت السلوك الجديد.',
      ],
      audience: [
        'مديرو الإدارات وقادة الفرق الذين يقودون تحوّلًا تشغيليًا أو تنظيميًا.',
        'مسؤولو الموارد البشرية والتطوير المؤسسي الداعمون لرحلة التغيير.',
      ],
    },
    'coaching-clinic': {
      overview:
        'جلسة تدريب حيّة تركز على تحسين الحوار الفردي داخل المؤسسة، من خلال نماذج أسئلة أوضح، واستماع أعمق، ومتابعة نتائج قابلة للقياس.',
      agenda: [
        'ممارسة حية لجلسات كوتشينغ قصيرة مع تغذية راجعة فورية.',
        'إطار عمل بسيط لتحويل الاجتماع الفردي إلى اتفاق تنفيذي.',
        'أخطاء شائعة في الكوتشينغ الداخلي وكيفية تجنّبها.',
      ],
      audience: [
        'الكوتشز الداخليون ومديرو الفرق الذين يعقدون اجتماعات فردية منتظمة.',
        'قادة يرغبون في رفع جودة المتابعة دون تحويل الجلسة إلى تقييم رسمي.',
      ],
    },
    'pioneers-forum': {
      overview:
        'يوم مجتمعي يجمع الخريجين والشركاء لتبادل التجارب، ومناقشة حالات واقعية، وبناء علاقات مهنية تدعم النمو المشترك.',
      agenda: [
        'حوارات قصيرة حول تجارب نجاح وتحديات السوق.',
        'دوائر أقران مركزة حسب التخصص أو القطاع.',
        'نقاش حالات عملية واستخلاص دروس قابلة للتطبيق.',
      ],
      audience: [
        'خريجو برامج روّاد النجاح والشركاء الحاليون.',
        'المهنيون الباحثون عن شبكة علاقات أعمق داخل السوق.',
      ],
    },
    'creative-campaign-lab': {
      overview:
        'مختبر تطبيقي لبناء حملة أوضح من الفكرة حتى القياس، مع التركيز على الرسالة، والجمهور، والقنوات، ومؤشرات الأداء.',
      agenda: [
        'تفكيك الهدف التجاري وتحويله إلى فكرة حملة قابلة للتنفيذ.',
        'بناء هيكل الرسالة والمحتوى عبر القنوات الأساسية.',
        'تحديد مؤشرات المتابعة وأسلوب قراءة النتائج بعد الإطلاق.',
      ],
      audience: [
        'فرق التسويق والإبداع المسؤولة عن إطلاق الحملات.',
        'أصحاب العلامات الذين يريدون حملة أكثر وضوحًا وتأثيرًا.',
      ],
    },
    'designing-digital-platforms': {
      overview:
        'يوم مكثف يساعد فرق التسويق والمنتج على تحسين التجربة الرقمية وربطها برسائل العلامة، من الصفحة الأولى حتى مسار التحويل.',
      agenda: [
        'مراجعة سريعة لرحلة المستخدم ونقاط التسرّب.',
        'إعادة ترتيب المحتوى والرسائل بما يخدم هدف المنصة.',
        'توصيات عملية لتحسين التحويل دون تعقيد التجربة.',
      ],
      audience: [
        'فرق التسويق الرقمي والمنتج وإدارة المحتوى.',
        'المؤسسات التي تعيد بناء موقعها أو تطبيقها أو منصاتها الاجتماعية.',
      ],
    },
  },
  en: {
    'leading-through-change': {
      overview:
        'A practical workshop that helps leaders run change with more clarity, a shared team language, and faster decisions without losing trust or execution quality.',
      agenda: [
        'Diagnose resistance patterns and set change priorities.',
        'Practical tools for meetings and messaging during transformation.',
        'A weekly follow-up plan that helps lock in new leadership habits.',
      ],
      audience: [
        'Department heads and team leads running operational or organizational change.',
        'HR and organizational development partners supporting the change journey.',
      ],
    },
    'coaching-clinic': {
      overview:
        'A live practice session focused on better 1:1 conversations: clearer questions, deeper listening, and follow-up that actually moves work forward.',
      agenda: [
        'Live coaching drills with immediate feedback.',
        'A simple framework that turns a 1:1 into a clear agreement.',
        'Common internal-coaching mistakes and how to avoid them.',
      ],
      audience: [
        'Internal coaches and team leads who run regular 1:1s.',
        'Leaders who want better follow-up without turning the session into a formal review.',
      ],
    },
    'pioneers-forum': {
      overview:
        'A community day for alumni and partners to exchange experience, discuss real cases, and grow a professional network that supports shared progress.',
      agenda: [
        'Short conversations on market challenges and success stories.',
        'Peer circles grouped by discipline or sector.',
        'Case discussions with practical takeaways.',
      ],
      audience: [
        'Pioneers of Success alumni and current partners.',
        'Professionals looking for a deeper market network.',
      ],
    },
    'creative-campaign-lab': {
      overview:
        'A hands-on lab for building a clearer campaign from idea to measurement, covering message, audience, channels, and performance indicators.',
      agenda: [
        'Turn the business goal into a campaign idea that can actually ship.',
        'Shape the message and content structure across core channels.',
        'Define tracking metrics and how results will be read after launch.',
      ],
      audience: [
        'Marketing and creative teams responsible for campaign launches.',
        'Brand owners who want a clearer, more effective campaign.',
      ],
    },
    'designing-digital-platforms': {
      overview:
        'An intensive day for marketing and product teams to improve the digital experience and connect it to brand messaging, from first screen to conversion.',
      agenda: [
        'A fast review of the user journey and drop-off points.',
        'Reorder content and messaging around the platform goal.',
        'Practical conversion improvements that do not overcomplicate the experience.',
      ],
      audience: [
        'Digital marketing, product, and content teams.',
        'Organizations rebuilding a website, app, or social platform presence.',
      ],
    },
  },
} as const

export const EventDetailPage = () => {
  const intl = useIntl()
  const { slug } = useParams()
  const { pathname } = useLocation()
  const locale: Locale = pathname.startsWith('/en') ? 'en' : DEFAULT_LOCALE
  const event = getEventBySlug(slug)
  const details =
    event && event.slug in extraContent[locale]
      ? extraContent[locale][event.slug as keyof typeof extraContent.ar]
      : null
  const eventsHome = `${getLocalizedPath('/', locale)}#events`

  if (!event || !details) {
    return (
      <Container className="py-20 text-center">
        <h1 className="text-3xl text-primary">
          <FormattedMessage id="events.notFound" />
        </h1>
        <Link to={eventsHome} className="mt-4 inline-flex text-secondary-600" viewTransition={true}>
          <FormattedMessage id="events.back" />
        </Link>
      </Container>
    )
  }

  return (
    <Container className="py-20">
      <Link
        to={eventsHome}
        className="my-8 inline-flex items-center gap-2 text-sm font-semibold text-secondary-600 hover:text-primary"
        viewTransition={true}
      >
        <ArrowLeft className="size-4 rtl:rotate-180" />
        <FormattedMessage id="events.back" />
      </Link>

      <section className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <article className="text-start">
          <div className="inline-flex items-center gap-2 rounded-full bg-secondary/10 px-3 py-1 text-xs font-semibold tracking-[0.16em] text-secondary-700 uppercase">
            <Sparkles className="h-3.5 w-3.5" />
            <FormattedMessage id="events.kicker" />
          </div>

          <h1 className="mt-4 text-4xl font-semibold text-[#0C0A28] sm:text-5xl">
            <FormattedMessage id={event.titleKey} />
          </h1>

          <div className="mt-5 flex flex-wrap items-center gap-3 text-sm font-medium text-tertiary-700">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#f7b500] px-3 py-1 text-primary">
              <CalendarDays className="h-4 w-4" />
              <FormattedMessage id={event.metaKey} />
            </span>
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-4 w-4 text-secondary-600" />
              <FormattedMessage id={event.metaKey} />
            </span>
          </div>

          <p className="mt-5 text-lg leading-8 text-tertiary-600">
            <FormattedMessage id={event.bodyKey} />
          </p>

          <div className="mt-8 space-y-3 rounded-[28px] border border-primary-100 bg-white p-6 shadow-[0_18px_45px_rgba(12,10,40,0.06)]">
            <h2 className="text-lg font-semibold text-[#0C0A28]">
              <FormattedMessage id="events.detail.overview" />
            </h2>
            <p className="text-sm leading-7 text-tertiary-700">{details.overview}</p>
          </div>
        </article>

        <div className="overflow-hidden rounded-[32px] border border-primary-100 bg-white shadow-[0_22px_60px_rgba(12,10,40,0.08)]">
          <div className="relative aspect-[1.15/1] overflow-hidden">
            <img
              src={event.image}
              alt={intl.formatMessage({ id: event.titleKey })}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-primary/75 via-primary/10 to-transparent" />
          </div>
        </div>
      </section>

      <section className="mt-16 grid gap-6 lg:grid-cols-2">
        <div className="rounded-[28px] border border-primary-100 bg-white p-6 shadow-[0_18px_45px_rgba(12,10,40,0.06)] sm:p-8">
          <h2 className="text-2xl font-semibold text-[#0C0A28]">
            <FormattedMessage id="events.detail.agenda" />
          </h2>
          <div className="mt-6 space-y-4">
            {details.agenda.map((item, index) => (
              <div key={item} className="flex gap-4 rounded-[22px] bg-white p-4 ring-1 ring-primary-100">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary text-sm font-semibold text-white">
                  {index + 1}
                </div>
                <p className="text-sm leading-7 text-tertiary-700">{item}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[28px] border border-primary-100 bg-white p-6 shadow-[0_18px_45px_rgba(12,10,40,0.06)] sm:p-8">
          <h2 className="text-2xl font-semibold text-[#0C0A28]">
            <FormattedMessage id="events.detail.audience" />
          </h2>
          <ul className="mt-6 space-y-3 text-sm text-tertiary-700">
            {details.audience.map((item) => (
              <li key={item} className="flex items-start gap-3 rounded-[22px] bg-primary-50/55 p-4">
                <CheckCircle2 className="mt-0.5 h-4.5 w-4.5 shrink-0 text-secondary-600" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mt-16 rounded-[32px] border border-primary-100 bg-primary p-8 text-white shadow-[0_24px_60px_rgba(12,10,40,0.16)] sm:p-10">
        <h2 className="text-2xl font-semibold">
          <FormattedMessage id="events.detail.ctaTitle" />
        </h2>
        <p className="mt-3 max-w-3xl text-primary-100">
          <FormattedMessage id="events.detail.ctaBody" />
        </p>
        <Link
          to={eventsHome}
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-secondary px-5 py-3 text-sm font-semibold text-white transition hover:brightness-110"
          viewTransition={true}
        >
          <FormattedMessage id="events.detail.ctaButton" />
          <ArrowRight className="h-4 w-4 rtl:rotate-180" />
        </Link>
      </section>
    </Container>
  )
}
