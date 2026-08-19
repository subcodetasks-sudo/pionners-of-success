import { AboutSection } from '@/components/sections/AboutSection';
import { EventsSection } from '@/components/sections/EventsSection';
import { FeedbackTextSection } from '@/components/sections/FeedbackTextSection';
import { HeroSection } from '@/components/sections/HeroSection';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { UspSection } from '@/components/sections/UspSection';

export const HomePage = () => {
  return (
    <>
      <HeroSection />
      {/* <SponsorsSection /> */}
      <AboutSection />
      <ServicesSection limit={4} />
      <UspSection />
      <EventsSection />
      <FeedbackTextSection />
    </>
  )
}
