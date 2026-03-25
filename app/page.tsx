import { Header } from "@/components/header"
import { HeroSection } from "@/components/sections/hero-section"
import { AboutSection } from "@/components/sections/about-section"
import { MembersSection } from "@/components/sections/members-section"
import { TourSection } from "@/components/sections/tour-section"
import { ReviewsSection } from "@/components/sections/reviews-section"
import { ContactSection } from "@/components/sections/contact-section"

export default function PressKit() {
  return (
    <main className="relative bg-background">
      <Header />
      <HeroSection />
      <AboutSection />
      <MembersSection />
      <TourSection />
      <ReviewsSection />
      <ContactSection />
    </main>
  )
}
