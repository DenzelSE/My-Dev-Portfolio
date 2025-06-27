import Hero from "@/components/hero"
import Navbar from "@/components/navbar"
import About from "@/components/about"
import Skills from "@/components/skills"
import Projects from "@/components/projects"
import Contact from "@/components/contact"
import Footer from "@/components/footer"
import ScrollProgress from "@/components/scroll-progress"

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0f172a]">
      <ScrollProgress />
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Contact />
      <Footer />
    </main>
  )
}
