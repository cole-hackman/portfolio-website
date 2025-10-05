"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"

const projects = [
  {
    name: "unfollowr",
    description:
      "See who isn't following you back on Instagram: fast, private, and API-free (uses your exported HTML).",
    url: "https://github.com/cole-hackman/unfollowr",
  },
  {
    name: "SoundCloud Toolkit",
    description:
      "Web toolkit for SoundCloud power users: merge playlists, turn likes into playlists, reorder; secure sessions",
    url: "https://github.com/cole-hackman/soundcloud-toolkit",
  },
  {
    name: "Lake Washington Detailing Website",
    description:
      "Mobile detailing business site with Calendly scheduling and vehicle-based estimator that cut quoting time 87%.",
    url: "https://lakewashingtondetailing.com",
  },
]

const previousVentures = [
  { year: "(2020 - 2024)", name: "Cole Soles", description: "Ecommerce resale business - $150K revenue, 25% margins" },
  { year: "(2020 - 2025)", name: "Lake Washington Detailing", description: "Car detailing business - 200+ clients" },
  { year: "(2024 - 2025)", name: "Seatowns Vintage", description: "Vintage sourcing and resale business - 600+ sales" },
]

const workExperience = [
  {
    year: "(Aug 2025 - Present)",
    name: "Elite Bricks",
    description: "AI & Software Engineering Intern: Python Discord bot, automation",
  },
  {
    year: "(Jun 2025 - Aug 2025)",
    name: "Ewing and Clark, Inc.",
    description: "AI Development Intern: GPT-4 + Python service, React frontend",
  },
  {
    year: "(Sep 2025 - Present)",
    name: "Perplexity AI",
    description: "Campus Partner: representing AI tools at Cal Poly",
  },
]

const education = [
  {
    year: "(2024 - 2028)",
    name: "Cal Poly SLO",
    description: "B.S. Computer Science, Junior Standing",
    activities: "Involvement: CS+AI Club, AWS Cloud Club",
  },
  {
    year: "(2020 - 2024)",
    name: "Seattle Preparatory School",
    description: "High School Diploma",
    activities:
      "Involvement: Panther Journalism Online Editor, Business Club Executive, Kairos Team Leader, NHS Master Tutor",
  },
]

const directoryItems = [
  { name: "contact", url: "mailto:hackman@calpoly.edu" },
  { name: "linkedin", url: "https://www.linkedin.com/in/colehackman/" },
  { name: "github", url: "https://github.com/cole-hackman/" },
]

const expandableSections = [
  { id: "how-started", title: "HOW I STARTED" },
  { id: "goal", title: "MY GOAL" },
  { id: "motivations", title: "MY MOTIVATIONS" },
  { id: "where-see-myself", title: "MY FUTURE?" },
]

function useIntersectionObserver(options = {}) {
  const [isIntersecting, setIsIntersecting] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting)
      },
      { threshold: 0.1, ...options },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  return [ref, isIntersecting] as const
}

function LazySection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <>{children}</>
}

export default function Portfolio() {
  const [expandedSections, setExpandedSections] = useState<string[]>([])
  const [showBackToTop, setShowBackToTop] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [showContactForm, setShowContactForm] = useState(false)
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [isDarkMode, setIsDarkMode] = useState(false)

  const [introRef, introInView] = useIntersectionObserver()
  const [achievementsRef, achievementsInView] = useIntersectionObserver()
  const [educationRef, educationInView] = useIntersectionObserver()
  const [projectsRef, projectsInView] = useIntersectionObserver()

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme")
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    const shouldBeDark = savedTheme === "dark" || (!savedTheme && prefersDark)

    setIsDarkMode(shouldBeDark)
    document.documentElement.classList.toggle("dark", shouldBeDark)
  }, [])

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode
    setIsDarkMode(newDarkMode)
    document.documentElement.classList.toggle("dark", newDarkMode)
    localStorage.setItem("theme", newDarkMode ? "dark" : "light")
  }

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId) ? prev.filter((id) => id !== sectionId) : [...prev, sectionId],
    )
  }

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMobileMenuOpen(false)
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission (replace with actual form handling)
    try {
      // Create mailto link with form data
      const subject = encodeURIComponent(contactForm.subject || "Contact from Portfolio")
      const body = encodeURIComponent(
        `Name: ${contactForm.name}\nEmail: ${contactForm.email}\n\nMessage:\n${contactForm.message}`,
      )
      const mailtoLink = `mailto:hackman@calpoly.edu?subject=${subject}&body=${body}`

      window.location.href = mailtoLink

      setSubmitStatus("success")
      setContactForm({ name: "", email: "", subject: "", message: "" })

      // Close form after success
      setTimeout(() => {
        setShowContactForm(false)
        setSubmitStatus("idle")
      }, 2000)
    } catch (error) {
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setContactForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="flex justify-between items-start p-4 md:p-6 sticky top-0 bg-background/95 backdrop-blur-sm z-10">
        <div className="text-lg font-bold font-mono">CCH</div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-6 text-sm items-center">
          <button onClick={() => scrollToSection("projects")} className="hover:underline">
            PROJECTS
          </button>
          <button onClick={() => scrollToSection("education")} className="hover:underline">
            EDUCATION
          </button>
          <button onClick={() => setShowContactForm(true)} className="hover:underline">
            CONTACT
          </button>
          <a
            href="https://www.linkedin.com/in/colehackman/"
            className="hover:underline"
            rel="noopener noreferrer"
            target="_blank"
          >
            LINKEDIN
          </a>
          <a
            href="https://github.com/cole-hackman/"
            className="hover:underline"
            rel="noopener noreferrer"
            target="_blank"
          >
            GITHUB
          </a>
          <button
            onClick={toggleDarkMode}
            className="p-2 hover:bg-muted rounded-md transition-colors"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              </svg>
            )}
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 text-sm"
          aria-label="Toggle menu"
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? "CLOSE" : "MENU"}
        </button>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-background/95 backdrop-blur-sm border-b border-border md:hidden">
            <nav className="flex flex-col gap-4 p-4 text-sm" role="navigation" aria-label="Mobile navigation">
              <button onClick={() => scrollToSection("projects")} className="text-left hover:underline">
                PROJECTS
              </button>
              <button onClick={() => scrollToSection("education")} className="text-left hover:underline">
                EDUCATION
              </button>
              <button onClick={() => setShowContactForm(true)} className="text-left hover:underline">
                CONTACT
              </button>
              <a
                href="https://www.linkedin.com/in/colehackman/"
                className="hover:underline"
                rel="noopener noreferrer"
                target="_blank"
              >
                LINKEDIN
              </a>
              <a
                href="https://github.com/cole-hackman/"
                className="hover:underline"
                rel="noopener noreferrer"
                target="_blank"
              >
                GITHUB
              </a>
              <button onClick={toggleDarkMode} className="flex items-center gap-2 text-left hover:underline">
                {isDarkMode ? "LIGHT MODE" : "DARK MODE"}
              </button>
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-4 md:px-6 pb-12">
        {/* Introduction */}
        <LazySection>
          <section
            ref={introRef}
            className={`mb-12 transition-all duration-700 ${
              introInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <h1 className="text-xl md:text-2xl font-bold mb-4">Hey, I'm Cole.</h1>
            <p className="mb-2 text-sm md:text-base">
              I'm a CS student at{" "}
              <a
                href="https://calpoly.edu"
                className="text-accent hover:underline"
                rel="noopener noreferrer"
                target="_blank"
              >
                Cal Poly SLO
              </a>
              , originally from Seattle.
            </p>
            <p className="mb-8 text-sm md:text-base">
              I've been building businesses and solving problems with technology since I was young.
            </p>
          </section>
        </LazySection>

        {/* Achievements */}
        <LazySection>
          <section
            ref={achievementsRef}
            className={`mb-12 transition-all duration-700 delay-100 ${
              achievementsInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <h2 className="text-base md:text-lg font-bold mb-4">A FEW ACHIEVEMENTS:</h2>
            <ul className="space-y-2 text-xs md:text-sm" role="list">
              <li>• Built Cole Soles to $150K revenue with 25% margins in high school</li>
              <li>• Cut listing description time by 90% with AI automation at E&C</li>
              <li>• Scaled support for 700+ clients with automated Discord bot</li>
              <li>• Managed 200+ client detailing business with custom booking system</li>
              <li>• Selected as Campus Partner for Perplexity AI</li>
            </ul>
          </section>
        </LazySection>

        {/* Education */}
        <LazySection>
          <section
            id="education"
            ref={educationRef}
            className={`mb-12 transition-all duration-700 delay-200 ${
              educationInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <h2 className="text-base md:text-lg font-bold mb-6">EDUCATION:</h2>
            <div className="space-y-6">
              {education.map((edu, index) => (
                <article key={index} className="border-l-2 border-accent pl-3 md:pl-4">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-2">
                    <h3 className="text-accent font-medium text-sm md:text-base">{edu.name}</h3>
                    <time className="text-xs text-muted-foreground">{edu.year}</time>
                  </div>
                  <p className="text-xs md:text-sm text-foreground leading-relaxed">{edu.description}</p>
                  <p className="text-xs md:text-sm text-foreground leading-relaxed">{edu.activities}</p>
                </article>
              ))}
            </div>
          </section>
        </LazySection>

        {/* Current Projects */}
        <LazySection>
          <section
            id="projects"
            ref={projectsRef}
            className={`mb-12 transition-all duration-700 delay-300 ${
              projectsInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <h2 className="text-base md:text-lg font-bold mb-6">SOME PROJECTS I'M WORKING ON:</h2>
            <div className="space-y-6">
              {projects.map((project, index) => (
                <article key={index} className="border-l-2 border-accent pl-3 md:pl-4">
                  <div className="flex items-center gap-2 mb-2">
                    <a
                      href={project.url}
                      className="text-accent hover:underline font-medium text-sm md:text-base"
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      {project.name}
                    </a>
                    <span className="text-xs text-muted-foreground" aria-label="External link">
                      ↗
                    </span>
                  </div>
                  <p className="text-xs md:text-sm text-foreground leading-relaxed">{project.description}</p>
                </article>
              ))}
            </div>
            <p className="text-xs md:text-sm mt-6 text-muted-foreground italic">
              Currently focused on AI automation, full-stack development, and building tools that solve real problems.
            </p>
          </section>
        </LazySection>

        {/* Current Work */}
        <section className="mb-12">
          <h2 className="text-base md:text-lg font-bold mb-6">CURRENT WORK:</h2>
          <div className="space-y-6">
            {workExperience.map((work, index) => (
              <article key={index} className="border-l-2 border-accent pl-3 md:pl-4">
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-2">
                  <h3 className="text-accent font-medium text-sm md:text-base">{work.name}</h3>
                  <time className="text-xs text-muted-foreground">{work.year}</time>
                </div>
                <p className="text-xs md:text-sm text-foreground leading-relaxed">{work.description}</p>
              </article>
            ))}
          </div>
        </section>

        {/* Previous Ventures */}
        <section className="mb-12">
          <h2 className="text-base md:text-lg font-bold mb-6">MY PREVIOUS VENTURES:</h2>
          <div className="space-y-6">
            {previousVentures.map((venture, index) => (
              <article key={index} className="border-l-2 border-accent pl-3 md:pl-4">
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-2">
                  <h3 className="text-accent font-medium text-sm md:text-base">{venture.name}</h3>
                  <time className="text-xs text-muted-foreground">{venture.year}</time>
                </div>
                <p className="text-xs md:text-sm text-foreground leading-relaxed">{venture.description}</p>
              </article>
            ))}
          </div>
        </section>

        {/* Technical Skills */}
        <section className="mb-12">
          <h2 className="text-base md:text-lg font-bold mb-4">TECHNICAL SKILLS:</h2>
          <div className="text-xs md:text-sm space-y-2">
            <p>
              <strong>Languages:</strong> Python, Java, JavaScript
            </p>
            <p>
              <strong>Frameworks:</strong> React, Next.js, Node.js, Flask, Express, Tailwind
            </p>
            <p>
              <strong>Tools:</strong> Git, Docker, DigitalOcean, Figma, OpenAI API, Hugging Face
            </p>
          </div>
        </section>

        {/* TL;DR */}
        <section className="mb-12">
          <h2 className="text-base md:text-lg font-bold mb-4">TL;DR:</h2>
          <p className="text-xs md:text-sm mb-4">I started building businesses early and haven't stopped.</p>
          <p className="text-xs md:text-sm mb-4">
            From reselling shoes to automating real estate listings with AI, I love finding ways to use technology to
            solve real problems and create value.
          </p>
          <p className="text-xs md:text-sm">
            Currently studying CS at Cal Poly while working on AI automation and full-stack projects.
          </p>
        </section>

        {/* Expandable Sections */}
        <section className="mb-12">
          {expandableSections.map((section) => (
            <details key={section.id} className="border-b border-border py-4">
              <summary
                onClick={(e) => {
                  e.preventDefault()
                  toggleSection(section.id)
                }}
                className="flex justify-between items-center w-full text-left text-xs md:text-sm hover:text-accent cursor-pointer list-none"
              >
                <span>{section.title}</span>
                <span className="text-xs">{expandedSections.includes(section.id) ? "CLOSE" : "OPEN"}</span>
              </summary>
              {expandedSections.includes(section.id) && (
                <div className="mt-4 text-xs md:text-sm text-muted-foreground">
                  {section.id === "how-started" && (
                    <p>
                      Started with Cole Soles in high school, learning ecommerce and business fundamentals. Discovered I
                      loved the intersection of technology and business problem-solving.
                    </p>
                  )}
                  {section.id === "goal" && (
                    <p>
                      To build technology that creates real value and solves meaningful problems. Interested in AI
                      automation, full-stack development, and entrepreneurship.
                    </p>
                  )}
                  {section.id === "motivations" && (
                    <p>
                      I'm motivated by the challenge of turning ideas into reality and the impact of well-built
                      technology on real businesses and people.
                    </p>
                  )}
                  {section.id === "where-see-myself" && (
                    <p>
                      Ideally, I will be building my own company that combines AI/ML with practical business
                      applications, or working at a high-growth tech company solving complex problems.
                    </p>
                  )}
                </div>
              )}
            </details>
          ))}
        </section>

        {/* Directory */}
        <section id="contact-section" className="mb-12">
          <h2 className="text-base md:text-lg font-bold mb-4">DIRECTORY:</h2>
          <ul className="space-y-2 text-xs md:text-sm" role="list">
            <li>
              •{" "}
              <button onClick={() => setShowContactForm(true)} className="text-accent hover:underline">
                contact
              </button>
            </li>
            <li>
              •{" "}
              <a
                href="https://www.linkedin.com/in/colehackman/"
                className="text-accent hover:underline"
                rel="noopener noreferrer"
                target="_blank"
              >
                linkedin
              </a>
            </li>
            <li>
              •{" "}
              <a
                href="https://github.com/cole-hackman/"
                className="text-accent hover:underline"
                rel="noopener noreferrer"
                target="_blank"
              >
                github
              </a>
            </li>
          </ul>
        </section>
      </main>

      {/* Footer */}
      <footer className="flex flex-col sm:flex-row justify-between items-center px-4 md:px-6 py-4 text-xs text-muted-foreground gap-2">
        <span>© 2025 COLE HACKMAN</span>
        <span>BUILT WITH NEXT.JS</span>
      </footer>

      {/* Contact Form Modal */}
      {showContactForm && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="contact-form-title"
        >
          <div className="bg-background border border-border rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 id="contact-form-title" className="text-lg font-bold font-mono">
                  GET IN TOUCH
                </h3>
                <button
                  onClick={() => setShowContactForm(false)}
                  className="text-muted-foreground hover:text-foreground text-sm"
                  aria-label="Close contact form"
                >
                  CLOSE
                </button>
              </div>

              {submitStatus === "success" && (
                <div className="mb-4 p-3 bg-accent/10 border border-accent/20 rounded text-sm text-accent" role="alert">
                  Thanks! Your email client should open with the message ready to send.
                </div>
              )}

              {submitStatus === "error" && (
                <div
                  className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded text-sm text-red-500"
                  role="alert"
                >
                  Something went wrong. Please try again or email me directly.
                </div>
              )}

              <form onSubmit={handleContactSubmit} className="space-y-4" noValidate>
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={contactForm.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 bg-background border border-border rounded text-sm focus:outline-none focus:border-accent"
                    placeholder="Your name"
                    autoComplete="name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={contactForm.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 bg-background border border-border rounded text-sm focus:outline-none focus:border-accent"
                    placeholder="your.email@example.com"
                    autoComplete="email"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={contactForm.subject}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-background border border-border rounded text-sm focus:outline-none focus:border-accent"
                    placeholder="What's this about?"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={contactForm.message}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full px-3 py-2 bg-background border border-border rounded text-sm focus:outline-none focus:border-accent resize-none"
                    placeholder="Tell me about your project, question, or just say hi!"
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 bg-accent text-accent-foreground py-2 px-4 rounded text-sm font-medium hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
                  >
                    {isSubmitting ? "SENDING..." : "SEND MESSAGE"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowContactForm(false)}
                    className="px-4 py-2 border border-border rounded text-sm hover:bg-muted/50 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
                  >
                    CANCEL
                  </button>
                </div>
              </form>

              <div className="mt-6 pt-4 border-t border-border">
                <p className="text-xs text-muted-foreground">
                  Or email me directly at{" "}
                  <a href="mailto:hackman@calpoly.edu" className="text-accent hover:underline">
                    hackman@calpoly.edu
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-4 md:bottom-6 right-4 md:right-6 bg-accent text-accent-foreground p-3 rounded-full shadow-lg hover:bg-accent/90 transition-all duration-200 z-20 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
          aria-label="Back to top"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      )}
    </div>
  )
}
