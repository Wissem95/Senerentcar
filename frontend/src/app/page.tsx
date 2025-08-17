
import { HeroSection } from "@/components/sections/hero-section"
import { FeaturedVehicles } from "@/components/sections/featured-vehicles"
import { Testimonials } from "@/components/sections/testimonials"
import { MainLayout } from "@/components/layouts/main-layout"

export default function Home() {
  return (
    <MainLayout>
      <HeroSection />
      <FeaturedVehicles />
      <Testimonials />
    </MainLayout>
  )
}
