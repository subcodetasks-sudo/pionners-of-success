import { FormattedMessage } from 'react-intl'
import { Container } from '@/components/layout/Container'
import { ServicesSection } from '@/components/sections/ServicesSection'

export const ServicesPage = () => {
  return (
    <div className="pb-8">
      <Container className="pt-12 text-center">
        <h1 className="text-4xl text-primary">
          <FormattedMessage id="services.page.title" />
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-tertiary-600">
          <FormattedMessage id="services.page.subtitle" />
        </p>
      </Container>
      <ServicesSection showViewAll={false} />
    </div>
  )
}
