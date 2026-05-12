import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { OurStory } from "@/components/our-story"
import { FeaturedProperties } from "@/components/featured-properties"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <OurStory />
      <FeaturedProperties />
      <Footer />
    </main>
  )
}
