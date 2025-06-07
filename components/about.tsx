"use client"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { User, Code, Briefcase, Download } from "lucide-react"
import AnimatedBackground from "./animated-background"
import FloatingIcons from "./floating-icons"
import BackgroundPattern from "./background-patterns"
import { Button } from "@/components/ui/button"

export default function About() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  }

  return (
    <section id="about" className="relative py-10 pb-10 bg-[#0c1424] overflow-hidden">
      <AnimatedBackground variant="gradient" />
      <FloatingIcons count={10} className="opacity-10" />
      <BackgroundPattern variant="hexagon" />

      <div className="container relative z-10 mx-auto px-4">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.h2 variants={itemVariants} className="text-4xl font-bold text-white mb-4">
            About Me
          </motion.h2>
          <motion.p variants={itemVariants} className="text-gray-400 text-xl max-w-3xl mx-auto">
          I&apos;m currently on an exciting journey to become a DevOps Engineer, driven by a deep interest in automation, infrastructure as code, and continuous integration and delivery. I enjoy bridging the gap between development and operations to build efficient, scalable, and resilient systems.
          </motion.p>

        </motion.div>

        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="grid md:grid-cols-3 gap-8"
        >
          <motion.div
            variants={itemVariants}
            className="bg-[#131c31]/80 backdrop-blur-sm p-8 rounded-xl border border-blue-900/30 hover:border-blue-500/30 transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="w-16 h-16 bg-blue-900/30 rounded-full flex items-center justify-center mb-6 mx-auto">
              <User className="w-8 h-8 text-blue-500" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4 text-center">Who I Am</h3>
            <p className="text-gray-400  text-center">
              I&apos;m a software developer based in Johannesburg with 2+ years of experience free-lancing, building products for
              the web. I have a passion for creating scalable, dynamic and impactful solutions.I am an enthusiast of cutting-edge technologies such as blockchain and A.I, I was recognized as part of Top 50 students for Object Oriented Programming at WeThinkCode_.
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="bg-[#131c31]/80 backdrop-blur-sm p-8 rounded-xl border border-blue-900/30 hover:border-blue-500/30 transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="w-16 h-16 bg-blue-900/30 rounded-full flex items-center justify-center mb-6 mx-auto">
              <Code className="w-8 h-8 text-blue-500" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4 text-center">What I Do</h3>
            <p className="text-gray-400  text-center">
            I specialize in building modern web applications and scalable systems using Next.js, Spring Boot, and TypeScript. I focus on creating clean, efficient, and scalable code that delivers exceptional user experiences. I am invested in DevOps tools like Kubernetes, Docker, and cloud platforms to create robust, automated, and reliable deployment pipelines that support high-performing applications at scale.
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="bg-[#131c31]/80 backdrop-blur-sm p-8 rounded-xl border border-blue-900/30 hover:border-blue-500/30 transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="w-16 h-16 bg-blue-900/30 rounded-full flex items-center justify-center mb-6 mx-auto">
              <Briefcase className="w-8 h-8 text-blue-500" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4 text-center">My Experience</h3>
            <p className="text-gray-400  text-center">
              I&apos;ve worked with startups and co-founded OffConnectX, helping to revolutionize the payment systems in FinTech from the ground
              up. I am a freelance Technical Co-ordinator and Community Manager for Africa's Blockchain Club.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
