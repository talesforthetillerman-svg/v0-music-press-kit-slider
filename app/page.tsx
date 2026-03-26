import { Header } from "@/components/header"
import { HeroSection } from "@/components/sections/hero-section"
import { AboutSection } from "@/components/sections/about-section"
import { MembersSection } from "@/components/sections/members-section"
import { TourSection } from "@/components/sections/tour-section"
import { ReviewsSection } from "@/components/sections/reviews-section"
import { ContactSection } from "@/components/sections/contact-section"
import { ApplyChanges } from "@/components/apply-changes"
import { EditProvider } from "@/components/edit-provider"
import { ElementInspector } from "@/components/element-inspector"

export default function PressKit() {
  return (
    <main className="relative bg-background">
      <EditProvider />
      <ElementInspector />
      <ApplyChanges />
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
