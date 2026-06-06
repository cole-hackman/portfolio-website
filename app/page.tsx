"use client"

import type React from "react"

import { useState, useEffect, useLayoutEffect, useRef } from "react"
import { IntroSplash } from "@/components/ui/intro-splash"
import { TypingAnimation } from "@/components/ui/typing-animation"
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler"
import { applyTheme, getInitialDarkMode } from "@/lib/theme"
import {
  Github,
  Linkedin,
  Mail,
} from "lucide-react"

const navIconClass =
  "inline-flex size-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"

const projects = [
  {
    name: "SC Toolkit",
    description:
      "Web toolkit for SoundCloud DJs and power users — playlist merging, bulk unlike/unfollow, dead track detection. Built with Next.js + Node.js/Express REST backend, SoundCloud OAuth2 + PKCE, AES-256-GCM token encryption, HMAC-signed sessions, and PostgreSQL + Prisma. 2,200+ users, 360K+ tracks/month.",
    url: "https://soundcloudtoolkit.com",
  },
  {
    name: "unfollowr",
    description:
      "Local-first Instagram analytics tool (browser-side parsing) serving 1K+ users. Upload your data exports to see who unfollowed you — no login required. Opt-in Google Gemini AI classifies accounts server-side via Flask and scores unfollow suggestions. Ranks #2 on Google.",
    url: "https://unfollowr.app",
  },
  {
    name: "RushRank",
    description:
      "Rush management app for fraternity recruitment — live anonymous voting with a swipe-based interface, real-time results over custom FastAPI WebSockets. Built with Next.js + FastAPI, PostgreSQL/Supabase via asyncpg, Supabase Auth (magic-link), RLS policies, and QR check-in. In pilot at Beta Theta Pi (Cal Poly SLO), expanding Fall 2026.",
  },
  {
    name: "AI Listing Generator",
    description:
      "GPT-5-powered tool for real estate professionals to generate listing descriptions in minutes. Multi-step form with Zod validation, Supabase Auth with domain-restricted RLS, generation history, and AI output comparison. Built with React, TypeScript, and Supabase.",
  },
  {
    name: "PolyEats",
    description:
      "Meal planning and macro tracking app for Cal Poly students, built around campus dining menus. AI-generated meal plans via Supabase Edge Functions + OpenAI, with a local planner fallback. Budget optimizer and progress tracking. Currently in development.",
  },
  {
    name: "Lake Washington Detailing Website",
    description:
      "Mobile detailing business site with Calendly scheduling and vehicle-based estimator that cut quoting time 87%.",
  },
]

const pastWork = [
  {
    year: "(Aug 2025 - Dec 2025)",
    name: "AI & Software Engineering Intern @ Elite Bricks",
    bullets: [
      "Engineered Python Discord bot automating promo code distribution for 700+ clients.",
      "Built internal automation workflows using n8n/Make and external APIs.",
    ],
  },
  {
    year: "(2020 - 2025)",
    name: "Founder @ Lake Washington Detailing",
    bullets: [
      "Car detailing business serving 200+ clients.",
    ],
  },
]

const workExperience = [
  {
    year: "(Jan 2026 - Present)",
    name: "Backend Software Developer @ PolyBuys (CodeBox Club)",
    bullets: [
      "Built backend authentication and authorization flows for campus-restricted marketplace.",
      "Implemented listing-scoped messaging services with conversation creation and permission checks.",
      "Collaborated using GitHub issues, PRs, unit tests, and CI.",
      "Scaled to 250+ downloads since launching in May 2026.",
    ],
  },
  {
    year: "(Oct 2025 - Present)",
    name: "CS Lead @ AIEL (AI Ethics Lab)",
    bullets: [
      "Leading the computer science side of an interdisciplinary research lab.",
      "Co-authoring a report on AI use and policy at Cal Poly in collaboration with the Academic Senate's Ad Hoc Committee on Generative AI.",
      "Work includes faculty interviews, benchmarking university AI policies, and drafting recommendations for administration.",
    ],
  },
  {
    year: "(June 2026 - Present)",
    name: "Technical Operating Partner @ Redbrick Ventures",
    bullets: [
      "Provide hands-on technical support to portfolio startups, including code review, architecture and infrastructure recommendations, product development, and debugging.",
      "Build internal tools and automations to streamline firm operations.",
      "Help grow the community of student founders and builders.",
    ],
  },
  {
    year: "(Mar 2020 - Present)",
    name: "Founder & Operator @ Cole Soles",
    bullets: [
      "Founded and scaled e-commerce business to $300K+ in sales across 1,000+ transactions.",
      "Built inventory and profitability tracking systems to manage stock, margin, and cash flow.",
    ],
  },
]

const education = [
  {
    year: "(2024 - 2028)",
    name: "Cal Poly SLO",
    description: "B.S. in Computer Science — GPA: 3.884",
    bullets: [
      "Dean's List every quarter",
      "Creative Ambassador for CapCut",
      "Ambassador for Lovable",
      "CS Lead at the AI Ethics Lab (AIEL)",
    ],
    coursework: {
      completed:
        "Data Structures · Object-Oriented Programming & Design · Design & Analysis of Algorithms · Systems Programming · Computer Organization · Discrete Structures · Statistical Methods for Engineers · Linear Analysis · Calculus II/III · Logic & Argumentative Writing",
      inProgress: "Computer Security · Operating Systems · Programming Languages",
    },
  },
  {
    year: "(2020 - 2024)",
    name: "Seattle Preparatory School",
    description: "High School Diploma",
    bullets: [
      "Panther Journalism Online Editor",
      "Business Club Executive",
      "Kairos Team Leader",
      "NHS Master Tutor",
    ],
  },
]

const directoryItems = [
  { name: "contact", url: "mailto:hackman@calpoly.edu" },
  { name: "linkedin", url: "https://www.linkedin.com/in/colehackman/" },
  { name: "github", url: "https://github.com/cole-hackman/" },
]



function useIntersectionObserver(options = {}) {
  // Default to visible during SSR to avoid invisible content before hydration
  const [isIntersecting, setIsIntersecting] = useState<boolean>(typeof window === "undefined")
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === "undefined") return
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

function LazySection({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

export default function Portfolio() {
  const [showIntro, setShowIntro] = useState(true)
  const [showBackToTop, setShowBackToTop] = useState(false)
  const [showContactForm, setShowContactForm] = useState(false)
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [isDarkMode, setIsDarkMode] = useState(getInitialDarkMode)

  const [introRef, introInView] = useIntersectionObserver()

  const [educationRef, educationInView] = useIntersectionObserver()
  const [projectsRef, projectsInView] = useIntersectionObserver()

  useLayoutEffect(() => {
    const shouldBeDark = getInitialDarkMode()
    setIsDarkMode(shouldBeDark)
    applyTheme(shouldBeDark)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

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
      {showIntro && (
        <IntroSplash onComplete={() => setShowIntro(false)} isDarkMode={isDarkMode} />
      )}

      {/* Header */}
      <header className="sticky top-0 z-10 flex items-center justify-between bg-background/95 p-4 backdrop-blur-sm md:p-6">
        <div className="text-lg font-bold font-mono">CCH</div>

        <nav className="flex items-center gap-0.5 sm:gap-1" aria-label="Main navigation">
          <button
            type="button"
            onClick={() => setShowContactForm(true)}
            className={navIconClass}
            aria-label="Contact"
          >
            <Mail className="size-4" strokeWidth={1.75} />
          </button>
          <a
            href="https://www.linkedin.com/in/colehackman/"
            rel="noopener noreferrer"
            target="_blank"
            className={navIconClass}
            aria-label="LinkedIn"
          >
            <Linkedin className="size-4" strokeWidth={1.75} />
          </a>
          <a
            href="https://github.com/cole-hackman/"
            rel="noopener noreferrer"
            target="_blank"
            className={navIconClass}
            aria-label="GitHub"
          >
            <Github className="size-4" strokeWidth={1.75} />
          </a>
          <AnimatedThemeToggler
            className={navIconClass}
            onThemeChange={setIsDarkMode}
            aria-label="Toggle dark mode"
          />
        </nav>
      </header>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-4 md:px-6 pb-12">
        {/* Introduction */}
        <LazySection>
          <section
            ref={introRef}
            className={`mb-12 transition-all duration-700 ${introInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
          >
            {showIntro ? (
              <h1 className="text-xl md:text-2xl font-bold mb-4" aria-hidden="true">
                <span className="invisible">Hey, I&apos;m Cole.</span>
              </h1>
            ) : (
              <TypingAnimation
                as="h1"
                className="text-xl md:text-2xl font-bold mb-4"
                startOnView={false}
                typeSpeed={70}
              >
                Hey, I&apos;m Cole.
              </TypingAnimation>
            )}
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



        {/* Education */}
        <LazySection>
          <section
            id="education"
            ref={educationRef}
            className={`mb-12 transition-all duration-700 delay-200 ${educationInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
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
                  {edu.description && <p className="text-xs md:text-sm text-foreground leading-relaxed">{edu.description}</p>}
                  {edu.bullets && (
                    <ul className="list-disc list-outside ml-4 mt-2 space-y-1 text-xs md:text-sm text-foreground leading-relaxed">
                      {edu.bullets.map((bullet, i) => (
                        <li key={i}>{bullet}</li>
                      ))}
                    </ul>
                  )}
                  {"coursework" in edu && edu.coursework && (
                    <div className="mt-2 space-y-1 text-xs md:text-sm text-foreground leading-relaxed">
                      <p className="font-bold">RELEVANT COURSEWORK:</p>
                      <p>
                        <strong>Completed:</strong> {edu.coursework.completed}
                      </p>
                      <p>
                        <strong>In Progress:</strong> {edu.coursework.inProgress}
                      </p>
                    </div>
                  )}
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
            className={`mb-12 transition-all duration-700 delay-300 ${projectsInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
          >
            <h2 className="text-base md:text-lg font-bold mb-6">SOME PROJECTS I'M WORKING ON:</h2>
            <div className="space-y-6">
              {projects.map((project, index) => (
                <article key={index} className="border-l-2 border-accent pl-3 md:pl-4">
                  <div className="flex items-center gap-2 mb-2">
                    {project.url ? (
                      <>
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
                      </>
                    ) : (
                      <span className="text-accent font-medium text-sm md:text-base">
                        {project.name}
                      </span>
                    )}
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
                {work.bullets && (
                  <ul className="list-disc list-outside ml-4 mt-2 space-y-1 text-xs md:text-sm text-foreground leading-relaxed">
                    {work.bullets.map((bullet, i) => (
                      <li key={i}>{bullet}</li>
                    ))}
                  </ul>
                )}
              </article>
            ))}
          </div>
        </section>

        {/* Past Work */}
        <section className="mb-12">
          <h2 className="text-base md:text-lg font-bold mb-6">PAST WORK:</h2>
          <div className="space-y-6">
            {pastWork.map((work, index) => (
              <article key={index} className="border-l-2 border-accent pl-3 md:pl-4">
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-2">
                  <h3 className="text-accent font-medium text-sm md:text-base">{work.name}</h3>
                  <time className="text-xs text-muted-foreground">{work.year}</time>
                </div>
                {work.bullets && (
                  <ul className="list-disc list-outside ml-4 mt-2 space-y-1 text-xs md:text-sm text-foreground leading-relaxed">
                    {work.bullets.map((bullet, i) => (
                      <li key={i}>{bullet}</li>
                    ))}
                  </ul>
                )}
              </article>
            ))}
          </div>
        </section>

        {/* Technical Skills */}
        <section className="mb-12">
          <h2 className="text-base md:text-lg font-bold mb-4">TECHNICAL SKILLS:</h2>
          <div className="text-xs md:text-sm space-y-2">
            <p>
              <strong>Languages:</strong> Python, Java, JavaScript/TypeScript, C, SQL
            </p>
            <p>
              <strong>Backend & Security:</strong> Node.js, Express, Flask, FastAPI, REST APIs, WebSockets, PostgreSQL, Prisma, asyncpg, Supabase, OAuth2/PKCE, JWT/JWKS, AES-256-GCM
            </p>
            <p>
              <strong>Frontend & Tools:</strong> Next.js, React, Tailwind CSS, Framer Motion, Chart.js, shadcn/ui, Vercel, Render, Git/GitHub, GitHub Actions, Linear, OpenAI API, Claude Code, OpenAI Codex, Cursor, Gemini CLI
            </p>
          </div>
        </section>

        {/* TL;DR */}
        <section className="mb-12">
          <h2 className="text-base md:text-lg font-bold mb-4">TL;DR:</h2>
          <p className="text-xs md:text-sm mb-4">
            I started building businesses early and haven't stopped. From reselling shoes to building developer tools and AI-powered apps, I like finding problems and shipping solutions. Currently studying CS at Cal Poly while building tools people actually use.
          </p>
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
