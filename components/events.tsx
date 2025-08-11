"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Calendar, MapPin, Users, Mic, Award, ExternalLink, Mail, Play, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import AnimatedBackground from "./animated-background"
import BackgroundPattern from "./background-patterns"
import ScrollReveal from "./scroll-reveal"
import StaggerChildren from "./stagger-children"
import ParallaxLayer from "./parallax-layer"
import { useState } from "react"

interface Event {
  id: string
  title: string
  type: "speaker" | "attendee" | "host" | "organizer"
  event: string
  date: string
  location: string
  description: string
  image: string
  attendees?: number
  topics?: string[]
  link?: string
  featured?: boolean
  videoUrl?: string
  youtubeId?: string
  videoTitle?: string
  videoDuration?: string
}

export default function Events() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [activeFilter, setActiveFilter] = useState<string>("all")
  const [selectedVideo, setSelectedVideo] = useState<Event | null>(null)

  const events: Event[] = [
    {
      id: "1",
      title: "Edge City South Africa: Builder Day",
      type: "speaker",
      event: "Edge City Cape Town 2025",
      date: "April 8, 2025",
      location: "Innovation City, Cape Town",
      description:
        "Join our peak programming day as we explore South Africa's innovation ecosystem, build connections, showcase talent, and highlight opportunities to our global community—laying the groundwork for a potential Edge City flagship village in 2026.",
      image: "/Events/edgecitypanel.jpg",
      attendees: 198,
      topics:  ["Web3", "AI", "Blockchain","Ecosystems"],
      link: "https://lu.ma/fy3vv0tg?tk=grQbjR",
      featured: true,
      youtubeId: "dQw4w9WgXcQ",
      videoTitle: "Edge City South Africa: Builder Daye",
      videoDuration: "00:00",
    },
    {
      id: "2",
      title: "10 Years of Ethereum - Johannesburg Celebration 🎉",
      type: "speaker",
      event: "React Conference 2024",
      date: "July 30, 2025",
      location: " La Parada Melrose Arch, Johannesburg",
      description:
        "Johannesburg crypto community will be marking Ethereum's 10th Anniversary in style and you're invited to join this special celebration.",
      image: "/Events/eth10.jpg",
      attendees: 1800,
      topics: ["Ethereum", "Web3", "Ecosystem", "Community"],
      link: "https://reactconf.com",
      youtubeId: "jNQXAC9IVRw",
      videoTitle: "Building Scalable React Applications - Panel Discussion",
      videoDuration: "32:15",
    },
    {
      id: "3",
      title: "SF Tech Meetup",
      type: "host",
      event: "Monthly Developer Meetup",
      date: "January 10, 2024",
      location: "San Francisco, CA",
      description:
        "Organized and hosted a monthly meetup for local developers. Featured talks on modern JavaScript frameworks and networking opportunities for the tech community.",
      image: "/placeholder.svg?height=300&width=400",
      attendees: 150,
      topics: ["JavaScript", "Networking", "Community"],
      youtubeId: "9bZkp7q19f0",
      videoTitle: "SF Tech Meetup - January 2024 Highlights",
      videoDuration: "28:45",
    },
    {
      id: "4",
      title: "AI in Web Development",
      type: "attendee",
      event: "Google I/O 2023",
      date: "May 10, 2023",
      location: "Mountain View, CA",
      description:
        "Attended sessions on AI integration in web development, learned about new Google Cloud AI services, and networked with industry professionals.",
      image: "/placeholder.svg?height=300&width=400",
      attendees: 7000,
      topics: ["AI", "Google Cloud", "Machine Learning"],
      link: "https://io.google.com",
    },
    {
      id: "5",
      title: "Startup Pitch Competition",
      type: "organizer",
      event: "Bay Area Startup Week",
      date: "October 5, 2023",
      location: "Palo Alto, CA",
      description:
        "Co-organized a startup pitch competition featuring 20+ early-stage companies. Managed event logistics and coordinated with investors and mentors.",
      image: "/placeholder.svg?height=300&width=400",
      attendees: 300,
      topics: ["Startups", "Entrepreneurship", "Venture Capital"],
      featured: true,
      youtubeId: "ScMzIvxBSi4",
      videoTitle: "Startup Pitch Competition - Best Moments",
      videoDuration: "15:20",
    },
    {
      id: "6",
      title: "Open Source Contributions",
      type: "speaker",
      event: "GitHub Universe 2023",
      date: "November 8, 2023",
      location: "San Francisco, CA",
      description:
        "Presented on the importance of open source contributions and demonstrated how to get started with contributing to major projects.",
      image: "/placeholder.svg?height=300&width=400",
      attendees: 1200,
      topics: ["Open Source", "GitHub", "Community"],
      link: "https://githubuniverse.com",
      youtubeId: "hFVj7Z7Z6nU",
      videoTitle: "Getting Started with Open Source - GitHub Universe",
      videoDuration: "25:10",
    },
  ]

  const filterOptions = [
    { value: "all", label: "All Events", icon: Calendar },
    { value: "speaker", label: "Speaker", icon: Mic },
    { value: "host", label: "Host", icon: Users },
    { value: "attendee", label: "Attendee", icon: MapPin },
    { value: "organizer", label: "Organizer", icon: Award },
  ]

  const filteredEvents = activeFilter === "all" ? events : events.filter((event) => event.type === activeFilter)

  const getTypeColor = (type: string) => {
    switch (type) {
      case "speaker":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
      case "host":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "attendee":
        return "bg-purple-500/20 text-purple-400 border-purple-500/30"
      case "organizer":
        return "bg-orange-500/20 text-orange-400 border-orange-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "speaker":
        return <Mic className="w-4 h-4" />
      case "host":
        return <Users className="w-4 h-4" />
      case "attendee":
        return <MapPin className="w-4 h-4" />
      case "organizer":
        return <Award className="w-4 h-4" />
      default:
        return <Calendar className="w-4 h-4" />
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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

  const VideoModal = ({ event, onClose }: { event: Event; onClose: () => void }) => {
    if (!event.youtubeId && !event.videoUrl) return null

    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-[#131c31] rounded-xl overflow-hidden max-w-4xl w-full max-h-[90vh] flex flex-col">
          <div className="flex items-center justify-between p-4 border-b border-blue-900/30">
            <div>
              <h3 className="text-lg font-semibold text-white">{event.videoTitle || event.title}</h3>
              <p className="text-sm text-gray-400">{event.event}</p>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose} className="text-gray-400 hover:text-white">
              <X className="w-5 h-5" />
            </Button>
          </div>
          <div className="aspect-video">
            {event.youtubeId ? (
              <iframe
                src={`https://www.youtube.com/embed/${event.youtubeId}?autoplay=1`}
                title={event.videoTitle || event.title}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : event.videoUrl ? (
              <video src={event.videoUrl} controls autoPlay className="w-full h-full object-cover" />
            ) : null}
          </div>
        </div>
      </div>
    )
  }

  return (
    <section id="events" className="relative py-20 bg-[#0a1020] overflow-hidden">
      <AnimatedBackground variant="gradient" />
      <ParallaxLayer speed={0.3} direction="right">
        <BackgroundPattern variant="circuit" />
      </ParallaxLayer>

      <div className="container relative z-10 mx-auto px-4">
        <ScrollReveal>
          <motion.div
            ref={ref}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={containerVariants}
            className="max-w-7xl mx-auto"
          >
            <motion.div variants={itemVariants} className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-4">Tech Community Involvement</h2>
              <p className="text-gray-400 max-w-3xl mx-auto">
                {`Active participation in the tech community through speaking engagements, hosting events, and
                contributing to the developer ecosystem. Here's my journey in building and connecting with the tech
                community.`}
              </p>
            </motion.div>

            {/* Filter Buttons */}
            <ScrollReveal direction="up" delay={0.2}>
              <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-4 mb-12">
                {filterOptions.map((option) => {
                  const Icon = option.icon
                  return (
                    <Button
                      key={option.value}
                      variant={activeFilter === option.value ? "default" : "outline"}
                      onClick={() => setActiveFilter(option.value)}
                      className={`flex items-center gap-2 ${
                        activeFilter === option.value
                          ? "bg-blue-600 hover:bg-blue-700"
                          : "border-blue-500/30 text-blue-400 hover:bg-blue-500/10"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {option.label}
                    </Button>
                  )
                })}
              </motion.div>
            </ScrollReveal>

            {/* Stats Section
            <ScrollReveal direction="up" delay={0.3}>
              <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
                <div className="bg-[#131c31]/80 backdrop-blur-sm p-6 rounded-xl border border-blue-900/30 text-center">
                  <div className="text-3xl font-bold text-blue-500 mb-2">12+</div>
                  <div className="text-gray-400 text-sm">Speaking Events</div>
                </div>
                <div className="bg-[#131c31]/80 backdrop-blur-sm p-6 rounded-xl border border-green-900/30 text-center">
                  <div className="text-3xl font-bold text-green-500 mb-2">8</div>
                  <div className="text-gray-400 text-sm">Events Hosted</div>
                </div>
                <div className="bg-[#131c31]/80 backdrop-blur-sm p-6 rounded-xl border border-purple-900/30 text-center">
                  <div className="text-3xl font-bold text-purple-500 mb-2">25+</div>
                  <div className="text-gray-400 text-sm">Events Attended</div>
                </div>
                <div className="bg-[#131c31]/80 backdrop-blur-sm p-6 rounded-xl border border-orange-900/30 text-center">
                  <div className="text-3xl font-bold text-orange-500 mb-2">5K+</div>
                  <div className="text-gray-400 text-sm">People Reached</div>
                </div>
              </motion.div>
            </ScrollReveal> */}

            {/* Events Grid */}
            <StaggerChildren staggerDelay={0.1}>
              <div className="grid gap-8">
                {filteredEvents.map((event, index) => (
                  <ScrollReveal
                    key={event.id}
                    direction={index % 2 === 0 ? "left" : "right"}
                    delay={index * 0.1}
                    threshold={0.2}
                  >
                    <motion.div
                      variants={itemVariants}
                      className={`flex flex-col ${
                        index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                      } bg-[#131c31]/80 backdrop-blur-sm rounded-xl overflow-hidden border border-blue-900/30 hover:border-blue-500/30 transition-all duration-300 ${
                        event.featured ? "ring-2 ring-blue-500/20" : ""
                      }`}
                    >
                      <div className="lg:w-1/3 relative overflow-hidden group">
                        <img
                          src={event.image || "/placeholder.svg"}
                          alt={event.title}
                          className="w-full h-64 lg:h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0a1020]/80 to-transparent"></div>

                        {(event.youtubeId || event.videoUrl) && (
                          <button
                            onClick={() => setSelectedVideo(event)}
                            className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          >
                            <div className="bg-red-600 hover:bg-red-700 rounded-full p-4 transition-colors">
                              <Play className="w-8 h-8 text-white ml-1" />
                            </div>
                          </button>
                        )}

                        {event.featured && (
                          <div className="absolute top-4 left-4 bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                            Featured
                          </div>
                        )}

                        {event.videoDuration && (
                          <div className="absolute bottom-4 left-4 bg-black/80 text-white px-2 py-1 rounded text-xs font-medium">
                            {event.videoDuration}
                          </div>
                        )}

                        <div
                          className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-medium border flex items-center gap-1 ${getTypeColor(
                            event.type,
                          )}`}
                        >
                          {getTypeIcon(event.type)}
                          {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                        </div>
                      </div>

                      <div className="lg:w-2/3 p-8 flex flex-col justify-center">
                        <div className="flex flex-wrap items-center gap-4 mb-4">
                          <h3 className="text-2xl font-bold text-white">{event.title}</h3>
                          <div className="flex items-center gap-2">
                            {(event.youtubeId || event.videoUrl) && (
                              <button
                                onClick={() => setSelectedVideo(event)}
                                className="text-red-500 hover:text-red-400 transition-colors flex items-center gap-1 text-sm"
                              >
                                <Play className="w-4 h-4" />
                                Watch
                              </button>
                            )}
                            {event.link && (
                              <a
                                href={event.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 hover:text-blue-400 transition-colors"
                              >
                                <ExternalLink className="w-5 h-5" />
                              </a>
                            )}
                          </div>
                        </div>

                        <div className="text-blue-400 font-medium mb-2">{event.event}</div>

                        <div className="flex flex-wrap items-center gap-4 text-gray-400 text-sm mb-4">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {event.date}
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {event.location}
                          </div>
                          {event.attendees && (
                            <div className="flex items-center gap-1">
                              <Users className="w-4 h-4" />
                              {event.attendees.toLocaleString()} attendees
                            </div>
                          )}
                        </div>

                        <p className="text-gray-400 mb-6 leading-relaxed">{event.description}</p>

                        {event.topics && (
                          <div className="flex flex-wrap gap-2">
                            {event.topics.map((topic) => (
                              <span
                                key={topic}
                                className="text-xs font-medium bg-blue-900/30 text-blue-400 py-1 px-3 rounded-full"
                              >
                                {topic}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  </ScrollReveal>
                ))}
              </div>
            </StaggerChildren>

            {/* Call to Action */}
            <ScrollReveal direction="up" delay={0.4}>
              <motion.div
                variants={itemVariants}
                className="mt-16 p-8 bg-[#131c31]/80 backdrop-blur-sm rounded-xl border border-blue-900/30 hover:border-blue-500/30 transition-all duration-300 text-center"
              >
                <h3 className="text-2xl font-bold text-white mb-4">{`Let's Connect at the Next Event`}</h3>
                <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
                  {`I'm always looking for opportunities to speak at conferences, host community events, or collaborate on
                  tech initiatives. If you're organizing an event or looking for speakers, I'd love to hear from you.`}
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Mail className="w-4 h-4 mr-2" />
                    Invite Me to Speak
                  </Button>
                  <Button
                    variant="outline"
                    className="border-blue-500 text-blue-500 hover:bg-blue-500/10 bg-transparent"
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    View Speaking Topics
                  </Button>
                </div>
              </motion.div>
            </ScrollReveal>
          </motion.div>
        </ScrollReveal>
      </div>

      {selectedVideo && <VideoModal event={selectedVideo} onClose={() => setSelectedVideo(null)} />}
    </section>
  )
}
