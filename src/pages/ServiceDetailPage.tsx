import { FormattedMessage } from 'react-intl'
import { Link, useLocation, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, CheckCircle2, Clock3, Layers3, Sparkles, Target } from 'lucide-react'
import { Container } from '@/components/layout/Container'
import { getServiceBySlug } from '@/data/services'
import { DEFAULT_LOCALE, type Locale } from '@/i18n/locales'
import { getLocalizedPath } from '@/i18n/navigation'

export const ServiceDetailPage = () => {
  const { slug } = useParams()
  const { pathname } = useLocation()
  const locale: Locale = pathname.startsWith('/en') ? 'en' : DEFAULT_LOCALE
  const service = getServiceBySlug(slug)
  const isArabic = locale === 'ar'

  const fakeContent = isArabic
    ? {
        overviewTitle: 'نظرة عامة',
        overviewBody:
          'هذه صفحة تجريبية توضح كيف يمكن عرض الخدمة بشكل أكثر اكتمالًا للعملاء المحتملين، من خلال إبراز القيمة، وخطوات التنفيذ، والمخرجات المتوقعة، بما يساعد على تحويل الاهتمام إلى تواصل فعلي.',
        highlightTitle: 'ما الذي نقدمه ضمن هذه الخدمة',
        highlights: [
          'تشخيص سريع للوضع الحالي والفرص المتاحة.',
          'خطة تنفيذ واضحة بجدول زمني ومؤشرات متابعة.',
          'مخرجات قابلة للتطبيق مباشرة داخل الفريق أو المؤسسة.',
        ],
        stats: [
          { value: '3-6', label: 'أسابيع للمرحلة الأولى', icon: Clock3 },
          { value: '4+', label: 'مخرجات أساسية', icon: Layers3 },
          { value: '100%', label: 'مخصصة حسب الهدف', icon: Target },
        ],
        deliverablesTitle: 'مخرجات متوقعة',
        deliverables: [
          'إطار عمل واضح للخدمة وتفاصيل النطاق.',
          'وثيقة توصيات أو خطة تشغيل أولية.',
          'قوالب عملية للفريق تسهّل التنفيذ والمتابعة.',
          'جلسة مراجعة نهائية وتوصيات للخطوة التالية.',
        ],
        processTitle: 'كيف نعمل',
        process: [
          {
            title: 'فهم الهدف',
            body: 'نبدأ بجلسة قصيرة لفهم الأولويات والسياق وتحديد النتيجة المطلوبة بدقة.',
          },
          {
            title: 'بناء الحل',
            body: 'نحوّل الاحتياج إلى مسار عمل واضح ومخرجات محددة تناسب المرحلة الحالية.',
          },
          {
            title: 'التسليم والمتابعة',
            body: 'نسلّم المخرجات بشكل عملي مع توجيهات تساعد الفريق على التطبيق بثقة.',
          },
        ],
        ctaTitle: 'هل ترغب في تنفيذ هذه الخدمة داخل مؤسستك؟',
        ctaBody: 'يمكن استخدام هذه المساحة لاحقًا لإضافة نموذج تواصل أو زر واتساب أو دعوة لحجز اجتماع تعريفي.',
        ctaButton: 'العودة إلى الخدمات',
      }
    : {
        overviewTitle: 'Overview',
        overviewBody:
          'This is sample content showing how the single service page can communicate value more clearly through scope, process, and expected outcomes, helping turn interest into a real inquiry.',
        highlightTitle: 'What this service can include',
        highlights: [
          'A fast diagnosis of the current situation and available opportunities.',
          'A clear execution plan with timeline and tracking points.',
          'Practical outputs the team can apply immediately.',
        ],
        stats: [
          { value: '3-6', label: 'weeks for phase one', icon: Clock3 },
          { value: '4+', label: 'core deliverables', icon: Layers3 },
          { value: '100%', label: 'tailored to your goals', icon: Target },
        ],
        deliverablesTitle: 'Expected deliverables',
        deliverables: [
          'A clear service framework and scoped workplan.',
          'An initial recommendation document or activation plan.',
          'Practical team templates that support implementation.',
          'A final review session with next-step recommendations.',
        ],
        processTitle: 'How we work',
        process: [
          {
            title: 'Understand the goal',
            body: 'We begin with a focused session to understand the context, priorities, and desired outcome.',
          },
          {
            title: 'Build the solution',
            body: 'We translate the need into a clear workstream with defined outputs for the current stage.',
          },
          {
            title: 'Deliver and support',
            body: 'We hand over the outputs in a practical format that the team can apply with confidence.',
          },
        ],
        ctaTitle: 'Interested in activating this service for your organization?',
        ctaBody: 'This space can later hold a contact form, a WhatsApp CTA, or a short call-booking prompt.',
        ctaButton: 'Back to services',
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

          <h1 className="mt-4 text-4xl font-semibold text-primary sm:text-5xl">
            <FormattedMessage id={service.titleKey} />
          </h1>

          <p className="mt-5 text-lg leading-8 text-tertiary-600">
            <FormattedMessage id={service.summaryKey} />
          </p>

          <p className="mt-5 text-base leading-8 text-tertiary-700">
            {fakeContent.overviewBody}
          </p>

          <div className="mt-8 space-y-3 rounded-[28px] border border-primary-100 bg-white p-6 shadow-[0_18px_45px_rgba(12,10,40,0.06)]">
            <h2 className="text-lg font-semibold text-primary">{fakeContent.highlightTitle}</h2>
            <ul className="space-y-3 text-sm text-tertiary-700">
              {fakeContent.highlights.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-4.5 w-4.5 shrink-0 text-secondary-600" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </article>

        <div className="space-y-5">
          <div className="overflow-hidden rounded-[32px] border border-primary-100 bg-white shadow-[0_22px_60px_rgba(12,10,40,0.08)]">
            <div className="relative aspect-[1.15/1] overflow-hidden">
              <img
                src={service.image}
                alt={isArabic ? 'صورة الخدمة' : 'Service image'}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-primary/75 via-primary/10 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      <section className="mt-16 grid gap-6 lg:grid-cols-2">
        <div className="rounded-[28px] border border-primary-100 bg-white p-6 shadow-[0_18px_45px_rgba(12,10,40,0.06)] sm:p-8">
          <h2 className="text-2xl font-semibold text-primary">{fakeContent.deliverablesTitle}</h2>
          <div className="mt-6 grid gap-4">
            {fakeContent.deliverables.map((item, index) => (
              <div key={item} className="rounded-[22px] bg-primary-50/55 p-4">
                <p className="mb-2 text-sm font-semibold text-secondary-700">
                  {isArabic ? `مخرج ${index + 1}` : `Deliverable ${index + 1}`}
                </p>
                <p className="text-sm leading-7 text-tertiary-700">{item}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[28px] border border-primary-100 bg-white p-6 shadow-[0_18px_45px_rgba(12,10,40,0.06)] sm:p-8">
          <h2 className="text-2xl font-semibold text-primary">{fakeContent.processTitle}</h2>
          <div className="mt-6 space-y-4">
            {fakeContent.process.map((step, index) => (
              <div key={step.title} className="flex gap-4 rounded-[22px] bg-white ring-1 ring-primary-100 p-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary text-sm font-semibold text-white">
                  {index + 1}
                </div>
                <div>
                  <h3 className="text-base font-semibold text-primary">{step.title}</h3>
                  <p className="mt-1 text-sm leading-7 text-tertiary-700">{step.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-16 rounded-[32px] border border-primary-100 bg-primary p-8 text-white shadow-[0_24px_60px_rgba(12,10,40,0.16)] sm:p-10">
        <h2 className="text-2xl font-semibold">{fakeContent.ctaTitle}</h2>
        <p className="mt-3 max-w-3xl text-primary-100">{fakeContent.ctaBody}</p>
        <Link
          to={getLocalizedPath('/services', locale)}
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-secondary px-5 py-3 text-sm font-semibold text-white transition hover:brightness-110"
          viewTransition={true}
        >
          {fakeContent.ctaButton}
          <ArrowRight className="h-4 w-4 rtl:rotate-180" />
        </Link>
      </section>
    </Container>
  )
}