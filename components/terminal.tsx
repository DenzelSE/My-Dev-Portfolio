"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { TerminalIcon, Minimize2, Maximize2, X } from "lucide-react"

interface TerminalCommand {
  command: string
  output: string[]
  type?: "success" | "error" | "info"
}

export default function Terminal() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [currentInput, setCurrentInput] = useState("")
  const [commandHistory, setCommandHistory] = useState<TerminalCommand[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [isTyping, setIsTyping] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)

  const availableCommands: Record<string, TerminalCommand> = {
    help: {
      command: "help",
      output: [
        "Available commands:",
        "  help          - Show this help message",
        "  about         - Learn about Alex Morgan",
        "  skills        - View technical skills",
        "  projects      - List recent projects",
        "  contact       - Get contact information",
        "  experience    - View work experience",
        "  education     - View educational background",
        "  whoami        - Display current user",
        "  ls            - List directory contents",
        "  pwd           - Print working directory",
        "  clear         - Clear terminal",
        "  exit          - Close terminal",
        "",
        "Type any command to get started!",
      ],
      type: "info",
    },
    about: {
      command: "about",
      output: [
        "Alex Morgan - Full Stack Developer",
        "================================",
        "",
        "🚀 Passionate developer with 5+ years of experience",
        "💻 Specializing in React, Node.js, and TypeScript",
        "🌟 Building scalable web applications and user experiences",
        "📍 Based in San Francisco, CA",
        "",
        "I love creating innovative solutions and contributing to",
        "the open-source community. Always learning new technologies",
        "and sharing knowledge with fellow developers.",
      ],
      type: "success",
    },
    skills: {
      command: "skills",
      output: [
        "Technical Skills",
        "===============",
        "",
        "Frontend:",
        "  ✓ JavaScript/TypeScript  ████████████ 90%",
        "  ✓ React/Next.js         ████████████ 85%",
        "  ✓ HTML/CSS/Tailwind     ████████████ 95%",
        "",
        "Backend:",
        "  ✓ Node.js/Express       ████████████ 80%",
        "  ✓ Python/Django         ████████████ 75%",
        "  ✓ GraphQL/REST APIs     ████████████ 85%",
        "",
        "Database:",
        "  ✓ MongoDB               ████████████ 75%",
        "  ✓ PostgreSQL            ████████████ 80%",
        "  ✓ Redis                 ████████████ 70%",
        "",
        "Tools & Others:",
        "  ✓ Git/GitHub            ████████████ 90%",
        "  ✓ Docker                ████████████ 75%",
        "  ✓ AWS/Cloud Services    ████████████ 70%",
      ],
      type: "success",
    },
    projects: {
      command: "projects",
      output: [
        "Recent Projects",
        "==============",
        "",
        "1. E-Commerce Platform",
        "   Tech: React, Node.js, MongoDB, Stripe",
        "   Desc: Full-featured online store with payment processing",
        "",
        "2. Task Management App",
        "   Tech: Next.js, TypeScript, Prisma, Socket.io",
        "   Desc: Collaborative task manager with real-time updates",
        "",
        "3. AI Content Generator",
        "   Tech: React, Python, OpenAI, FastAPI",
        "   Desc: AI-powered tool for content creation",
        "",
        "4. Developer Portfolio",
        "   Tech: Next.js, Tailwind, Framer Motion",
        "   Desc: Interactive portfolio with terminal interface",
        "",
        "Run 'github' to view source code repositories",
      ],
      type: "success",
    },
    contact: {
      command: "contact",
      output: [
        "Contact Information",
        "==================",
        "",
        "📧 Email:    contact@alexmorgan.dev",
        "📱 Phone:    +1 (555) 123-4567",
        "🌐 Website:  https://alexmorgan.dev",
        "💼 LinkedIn: https://linkedin.com/in/alexmorgan",
        "🐙 GitHub:   https://github.com/alexmorgan",
        "",
        "Feel free to reach out for collaborations,",
        "job opportunities, or just to say hello!",
      ],
      type: "info",
    },
    experience: {
      command: "experience",
      output: [
        "Work Experience",
        "===============",
        "",
        "Senior Full Stack Developer | TechCorp Inc.",
        "2022 - Present",
        "• Led development of microservices architecture",
        "• Mentored junior developers and code reviews",
        "• Improved application performance by 40%",
        "",
        "Full Stack Developer | StartupXYZ",
        "2020 - 2022",
        "• Built responsive web applications from scratch",
        "• Implemented CI/CD pipelines and testing",
        "• Collaborated with design and product teams",
        "",
        "Frontend Developer | WebSolutions",
        "2019 - 2020",
        "• Developed user interfaces using React",
        "• Optimized applications for performance",
        "• Maintained legacy codebases",
      ],
      type: "success",
    },
    education: {
      command: "education",
      output: [
        "Education",
        "=========",
        "",
        "🎓 Bachelor of Science in Computer Science",
        "   University of California, Berkeley",
        "   2015 - 2019",
        "   GPA: 3.8/4.0",
        "",
        "📚 Relevant Coursework:",
        "   • Data Structures and Algorithms",
        "   • Software Engineering",
        "   • Database Systems",
        "   • Web Development",
        "   • Machine Learning",
        "",
        "🏆 Certifications:",
        "   • AWS Certified Developer",
        "   • Google Cloud Professional",
        "   • MongoDB Certified Developer",
      ],
      type: "success",
    },
    whoami: {
      command: "whoami",
      output: ["alexmorgan"],
      type: "success",
    },
    ls: {
      command: "ls",
      output: [
        "total 8",
        "drwxr-xr-x  2 alexmorgan  staff   64 Jan 15 10:30 projects/",
        "drwxr-xr-x  2 alexmorgan  staff   64 Jan 15 10:30 skills/",
        "-rw-r--r--  1 alexmorgan  staff  1.2K Jan 15 10:30 resume.pdf",
        "-rw-r--r--  1 alexmorgan  staff  2.4K Jan 15 10:30 portfolio.md",
        "-rw-r--r--  1 alexmorgan  staff  856B Jan 15 10:30 contact.txt",
      ],
      type: "success",
    },
    pwd: {
      command: "pwd",
      output: ["/home/alexmorgan/portfolio"],
      type: "success",
    },
    github: {
      command: "github",
      output: [
        "Opening GitHub profile...",
        "🔗 https://github.com/alexmorgan",
        "",
        "Recent repositories:",
        "• portfolio-website",
        "• react-task-manager",
        "• ai-content-generator",
        "• e-commerce-platform",
      ],
      type: "info",
    },
  }

  const typewriterEffect = async (text: string[], callback: () => void) => {
    setIsTyping(true)
    for (let i = 0; i < text.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 50))
      setCommandHistory((prev) => {
        const newHistory = [...prev]
        const lastCommand = newHistory[newHistory.length - 1]
        if (lastCommand) {
          lastCommand.output = text.slice(0, i + 1)
        }
        return newHistory
      })
    }
    setIsTyping(false)
    callback()
  }

  const executeCommand = async (input: string) => {
    const trimmedInput = input.trim().toLowerCase()

    if (trimmedInput === "clear") {
      setCommandHistory([])
      return
    }

    if (trimmedInput === "exit") {
      setIsOpen(false)
      return
    }

    const command = availableCommands[trimmedInput]

    if (command) {
      const newCommand: TerminalCommand = {
        command: `$ ${input}`,
        output: [],
        type: command.type,
      }

      setCommandHistory((prev) => [...prev, newCommand])
      await typewriterEffect(command.output, () => {})
    } else {
      const errorCommand: TerminalCommand = {
        command: `$ ${input}`,
        output: [`Command not found: ${input}`, "Type 'help' to see available commands."],
        type: "error",
      }
      setCommandHistory((prev) => [...prev, errorCommand])
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (currentInput.trim() && !isTyping) {
      executeCommand(currentInput)
      setCurrentInput("")
      setHistoryIndex(-1)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowUp") {
      e.preventDefault()
      const commands = commandHistory.map((cmd) => cmd.command.replace("$ ", ""))
      if (commands.length > 0 && historyIndex < commands.length - 1) {
        const newIndex = historyIndex + 1
        setHistoryIndex(newIndex)
        setCurrentInput(commands[commands.length - 1 - newIndex])
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault()
      if (historyIndex > 0) {
        const commands = commandHistory.map((cmd) => cmd.command.replace("$ ", ""))
        const newIndex = historyIndex - 1
        setHistoryIndex(newIndex)
        setCurrentInput(commands[commands.length - 1 - newIndex])
      } else if (historyIndex === 0) {
        setHistoryIndex(-1)
        setCurrentInput("")
      }
    }
  }

  useEffect(() => {
    if (isOpen && !isMinimized && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen, isMinimized])

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [commandHistory])

  // Initialize with welcome message
  useEffect(() => {
    if (isOpen && commandHistory.length === 0) {
      const welcomeCommand: TerminalCommand = {
        command: "",
        output: [
          "Welcome to Alex Morgan's Portfolio Terminal",
          "==========================================",
          "",
          "Type 'help' to see available commands.",
          "Use arrow keys to navigate command history.",
          "",
        ],
        type: "info",
      }
      setCommandHistory([welcomeCommand])
    }
  }, [isOpen])

  return (
    <>
      {/* Terminal Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-green-600 hover:bg-green-700 text-white p-4 rounded-full shadow-lg transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: isOpen ? 0 : 1, y: isOpen ? 100 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <TerminalIcon className="w-6 h-6" />
      </motion.button>

      {/* Terminal Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{
              opacity: 1,
              scale: isMinimized ? 0.1 : 1,
              y: isMinimized ? 300 : 0,
            }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className={`fixed z-50 bg-gray-900 rounded-lg shadow-2xl border border-gray-700 ${
              isMinimized
                ? "bottom-6 right-6 w-64 h-16"
                : "bottom-6 right-6 w-[600px] h-[500px] max-w-[90vw] max-h-[80vh]"
            }`}
          >
            {/* Terminal Header */}
            <div className="flex items-center justify-between bg-gray-800 px-4 py-2 rounded-t-lg border-b border-gray-700">
              <div className="flex items-center gap-2">
                <div className="flex gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <span className="text-gray-300 text-sm font-mono ml-2">terminal — alexmorgan@portfolio</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
                </button>
                <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-red-400 transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Terminal Content */}
            {!isMinimized && (
              <div className="flex flex-col h-[calc(100%-48px)]">
                <div
                  ref={terminalRef}
                  className="flex-1 p-4 overflow-y-auto font-mono text-sm text-green-400 bg-black/50"
                >
                  {commandHistory.map((cmd, index) => (
                    <div key={index} className="mb-2">
                      {cmd.command && <div className="text-blue-400 mb-1">{cmd.command}</div>}
                      {cmd.output.map((line, lineIndex) => (
                        <div
                          key={lineIndex}
                          className={`${
                            cmd.type === "error"
                              ? "text-red-400"
                              : cmd.type === "info"
                                ? "text-yellow-400"
                                : "text-green-400"
                          }`}
                        >
                          {line}
                        </div>
                      ))}
                    </div>
                  ))}

                  {/* Current Input Line */}
                  <form onSubmit={handleSubmit} className="flex items-center">
                    <span className="text-blue-400 mr-2">$</span>
                    <input
                      ref={inputRef}
                      type="text"
                      value={currentInput}
                      onChange={(e) => setCurrentInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      className="flex-1 bg-transparent text-green-400 outline-none font-mono"
                      placeholder={isTyping ? "Processing..." : "Type a command..."}
                      disabled={isTyping}
                      autoComplete="off"
                    />
                    <motion.span
                      animate={{ opacity: [1, 0] }}
                      transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                      className="text-green-400 ml-1"
                    >
                      █
                    </motion.span>
                  </form>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
