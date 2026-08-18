import { Container } from '@/components/layout/Container'
import { SectionHeading } from '@/components/layout/SectionHeading'

export const FeedbackMediaSection = () => {
  return (
    <section className="py-16">
      <Container>
        <SectionHeading
          kicker="media.kicker"
          title="media.title"
          subtitle="media.subtitle"
        />

        <div className="grid gap-4 lg:grid-cols-3">

        
          <div className="relative aspect-video overflow-hidden rounded-2xl bg-black">
            <video
              controls
              className="h-full w-full object-cover"
            >
              <source
                src="/video1.mp4"
                type="video/mp4"
              />
              المتصفح لا يدعم تشغيل الفيديو
            </video>
          </div>

        
          <div className="aspect-video overflow-hidden rounded-2xl">
            <img
              src="/public/imgs/sponsers/al-ahli-club.webp"
              alt="Feedback"
              className="h-full w-full object-cover"
            />
          </div>

        
          <div className="relative aspect-video overflow-hidden rounded-2xl bg-black">
            <video
              controls
              className="h-full w-full object-cover"
            >
              <source
                src=""
                type="video/mp4"
              />
              المتصفح لا يدعم تشغيل الفيديو
            </video>
          </div>

        </div>
      </Container>
    </section>
  )
}