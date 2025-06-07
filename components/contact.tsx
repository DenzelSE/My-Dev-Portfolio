"use client"

import type React from "react"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Mail, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useEffect, useState } from "react"
import ParticlesBackground from "./particles-background"
import BackgroundPattern from "./background-patterns"
import { initEmailJS, sendContactEmail } from "@/lib/emailjs"
import ScrollReveal from "./scroll-reveal"
import StaggerChildren from "./stagger-children"
import ParallaxLayer from "./parallax-layer"

export default function Contact() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formStatus, setFormStatus] = useState<{
    success?: boolean
    message?: string
  }>({})
  console.log(formStatus)
  useEffect(() => {
    initEmailJS()
  }, [])

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setFormStatus({})
    try {
      const result = await sendContactEmail(formData)
      console.log("results", result)

      if (result.success){
        setFormStatus({
          success: true,
          message: "Your message has been sent successfully! We'll get back to you soon.",
        })
        // Reset form
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        })
      } else {
        throw new Error("Failed to send message")
      }
    } catch (error) {
      setFormStatus({
        success: false,
        message: "There was an error sending your message. Please try again later.",
      })
      console.log(error);
    } finally {
      setIsSubmitting(false)
    }
  }

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
    <section id="contact" className="relative py-20 overflow-hidden">
      <ParticlesBackground variant="default" className="opacity-30" />
      <ParallaxLayer speed={0.4} direction="up">
        <BackgroundPattern variant="wave" />
      </ParallaxLayer>

      <div className="container relative z-10 mx-auto px-4">
      <ScrollReveal>
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="max-w-6xl mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Get In Touch</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Have a project in mind or just want to chat? I&apos;d love to hear from you. Fill out the form below or
              reach out through my social channels.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12">
          <StaggerChildren staggerDelay={0.15}>
            <ScrollReveal direction="left" delay={0.1}>
            <motion.div variants={itemVariants} className="space-y-8">
              <div className="bg-[#131c31]/80 backdrop-blur-sm p-6 rounded-xl border border-blue-900/30 hover:border-blue-500/30 transition-all duration-300 transform hover:-translate-y-1">
                <div className="w-12 h-12 bg-blue-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-blue-500" />
                </div>
                <div className="mt-4">
                  <h3 className="text-lg font-semibold text-white mb-2">Email</h3>
                  <p className="text-blue-500">denzelselokela@gmail.com</p>
                </div>
              </div>
              </motion.div>
              </ScrollReveal>

            <ScrollReveal direction="left" delay={0.3}>
            <motion.div
                      variants={itemVariants}
                      className="bg-[#131c31]/80 backdrop-blur-sm p-6 rounded-xl border border-blue-900/30 hover:border-blue-500/30 transition-all duration-300 transform hover:-translate-y-1"
                    >
              <div className="bg-[#131c31]/80 backdrop-blur-sm p-6 rounded-xl border border-blue-900/30 hover:border-blue-500/30 transition-all duration-300 transform hover:-translate-y-1">
                <div className="w-12 h-12 bg-blue-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                  <MessageSquare className="w-5 h-5 text-blue-500" />
                </div>
                <div className="mt-4">
                  <h3 className="text-lg font-semibold text-white mb-2">Social Media</h3>
                  <div className="flex gap-4">
                    <a
                      href="https://github.com/DenzelSE"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:text-blue-400"
                    >
                      GitHub
                    </a>
                    <a
                      href="https://www.linkedin.com/in/denzel-selokela/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:text-blue-400"
                    >
                      LinkedIn
                    </a>
                    <a
                      href="https://www.youtube.com/@DenzelSE"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:text-blue-400"
                    >
                      Youtube
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
            </ScrollReveal>
            </StaggerChildren>

            <ScrollReveal direction="right" delay={0.3}>
            <motion.div variants={itemVariants}>
              <form
                onSubmit={handleSubmit}
                className="bg-[#131c31]/80 backdrop-blur-sm p-8 rounded-xl border border-blue-900/30 hover:border-blue-500/30 transition-all duration-300"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">
                      Name
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      className="bg-[#0f172a]/70 border-blue-900/30 focus:border-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">
                      Email
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Your email"
                      className="bg-[#0f172a]/70 border-blue-900/30 focus:border-blue-500"
                      required
                    />
                  </div>
                </div>
                <div className="mb-6">
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-400 mb-2">
                    Subject
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Subject"
                    className="bg-[#0f172a]/70 border-blue-900/30 focus:border-blue-500"
                    required
                  />
                </div>
                <div className="mb-6">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your message"
                    className="bg-[#0f172a]/70 border-blue-900/30 focus:border-blue-500 min-h-[150px]"
                    required
                  />
                </div>
                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </motion.div>
            </ScrollReveal>
          </div>
        </motion.div>
      </ScrollReveal>
      </div>
    </section>
  )
}
