"use client"

import type React from "react"

import { useState, useEffect, useLayoutEffect, useRef } from "react"
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
    name: "Track Toolkit",
    description:
      "Web toolkit for SoundCloud DJs and power users — playlist merging, bulk unlike/unfollow, repost management, dead track detection. Built with Next.js + Node.js/Express REST backend, SoundCloud OAuth2 + PKCE, AES-256-GCM token encryption, HMAC-signed sessions, and PostgreSQL + Prisma. 4,149 users, 2.5M tracks processed.",
    url: "https://tracktoolkit.com",
  },
  {
    name: "unfollowr",
    description:
      "Local-first Instagram analytics tool (browser-side parsing) serving ~2,000 users. Upload your data exports to see who unfollowed you — no login required. Non-followers are segmented by a client-side heuristic; only anonymous usage analytics leave the browser.",
    url: "https://unfollowr.app",
  },
  {
    name: "RushRank",
    description:
      "Rush management app for fraternity recruitment — live voting with a swipe-based interface, real-time results over custom FastAPI WebSockets. Built with Next.js + FastAPI, PostgreSQL/Supabase via asyncpg, Supabase Auth (magic-link), and QR check-in. Beta-tested with an independent Interfraternity Council near Chico State for Fall 2026 rush.",
  },
  {
    name: "decks",
    description:
      "Local-first desktop app for Rekordbox DJ libraries — reads the encrypted library directly and gives DJs the bulk edits and duplicate detection the official software doesn't expose. Rust, Tauri, TypeScript, SQLCipher. In development.",
    url: "https://github.com/cole-hackman/decks",
  },
  {
    name: "AI Listing Generator",
    description:
      "OpenAI-powered tool for real estate professionals to generate listing descriptions in minutes. Multi-step form with Zod validation, Supabase Auth with domain-restricted RLS, generation history, and AI output comparison. Built with React, TypeScript, and Supabase.",
  },
  {
    name: "PolyEats",
    description:
      "Nutrition tracking and meal planning for Cal Poly students, built around campus dining menus pulled from three dining-service APIs into one schema. Native SwiftUI iOS app and React web client on one Supabase backend; AI meal plans via Supabase Edge Functions and OpenAI with a local fallback; budget and progress tracking. 1.0.0 TestFlight build in preparation.",
  },
  {
    name: "Lake Washington Detailing Website",
    description:
      "Mobile detailing business site with Calendly scheduling and vehicle-based estimator.",
  },
]

const pastWork = [
  {
    year: "(Jun 2026 - Aug 2026)",
    name: "Product Engineering Intern @ Keystone Strategy, Seattle",
    bullets: [
      "Interviewed consultants across healthcare, technology, and business development to find where manual relationship tracking cost the most time, surfacing that only 39 of 96 tracked contacts had a recorded last touch.",
      "Built the Python platform as its sole engineer, turning law-firm news and email digests into routed relationship signals that matched 86.9% of 465 signals to the firm or person who owned them.",
      "Raised usable article text from 19% to 73% across 86 items with a full-body top-up stage, converting snippets extraction could not parse into content that yielded named attorneys.",
      "Reframed the brief from lead generation to relationship intelligence after finding existing tooling already served the original framing, then recommended a three-use-case MVP with costed options.",
    ],
  },
  {
    year: "(Jan 2026 - Jun 2026)",
    name: "Full Stack Software Engineer @ PolyBuys (CodeBox Club)",
    bullets: [
      "Built buyer-to-seller messaging end to end, from the Postgres access model to the React thread UI, scoping conversations to a single listing so neither party could open threads they were not part of.",
      "Restricted marketplace access to verified Cal Poly accounts with role-based permissions across a TypeScript monorepo, supporting a launch that reached 250+ downloads and signups in its first month.",
    ],
  },
  {
    year: "(Aug 2025 - Nov 2025)",
    name: "AI & Software Engineering Intern @ Elite Bricks",
    bullets: [
      "Engineered a Python Discord bot to automate internal distribution processes.",
      "Built internal automation workflows using n8n/Make and external APIs.",
    ],
  },
  {
    year: "(Jun 2019 - 2025)",
    name: "Founder @ Lake Washington Detailing",
    bullets: [
      "Founded and ran a mobile car-detailing business in the Seattle area, growing to 200+ clients through flyers, customer referrals, and neighborhood marketing on Nextdoor and Facebook.",
    ],
  },
]

const workExperience = [
  {
    year: "(Aug 2026 - Present)",
    name: "Software Engineer, Student Volunteer @ AIS4R (Cal Poly Computer Science Department)",
    bullets: [
      "Built incident-level access control for IntelliSAR, a search-and-rescue coordination dashboard, so coordinators and responders can read only the operations they are assigned to.",
      "Remediated authorization and IDOR vulnerabilities across a Next.js and Firebase application, enforcing incident isolation with Firebase Authentication and Firestore Security Rules.",
    ],
  },
  {
    year: "(Jan 2026 - Present)",
    name: "Computer Science Lead @ AI Ethics Lab (AIEL), Cal Poly",
    bullets: [
      "Lead the computer science side of an interdisciplinary research lab.",
      "Co-authored a report on AI use and policy at Cal Poly in collaboration with the Academic Senate's Ad Hoc Committee on Generative AI.",
      "Conducted 12 of the team's 20 faculty interviews.",
      "Work included faculty interviews, benchmarking university AI policies, and drafting recommendations for administration.",
    ],
  },
  {
    year: "(June 2026 - Present)",
    name: "Technical Operating Partner @ Redbrick Ventures",
  },
  {
    year: "(Mar 2020 - Present)",
    name: "Founder & Operator @ Cole Soles",
    bullets: [
      "Founded and scaled e-commerce business to $300K+ in revenue across 1,000+ transactions.",
      "Built inventory and profitability tracking systems to manage stock, margin, and cash flow.",
    ],
  },
]

const education = [
  {
    year: "(Sep 2024 - May 2028)",
    name: "Cal Poly SLO",
    description: "B.S. in Computer Science, AI and Machine Learning Concentration — GPA: 3.85",
    bullets: [
      "Dean's List every quarter",
      "Y Combinator Startup School 2026",
      "Campus Partner for Perplexity AI",
      "Creative Ambassador for CapCut",
      "Ambassador for Lovable",
      "CS Lead at the AI Ethics Lab (AIEL)",
    ],
    coursework: {
      completed:
        "Data Structures · Object-Oriented Programming & Design · Design & Analysis of Algorithms · Systems Programming · Computer Organization · Operating Systems · Computer Security · Programming Languages · Discrete Structures · Statistical Methods for Engineers · Linear Analysis · Calculus II/III · Logic & Argumentative Writing",
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
    if (!ref.current) return

    // Once a section has entered the viewport, keep it visible. Without this,
    // sections re-toggle opacity every time they cross the viewport edge,
    // causing content to fade out/in repeatedly while scrolling.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1, ...options },
    )

    observer.observe(ref.current)

    return () => observer.disconnect()
  }, [])

  return [ref, isIntersecting] as const
}

function LazySection({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

export default function Portfolio() {
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

  const [introRef, introInView] = useIntersectionObserver()

  const [educationRef, educationInView] = useIntersectionObserver()
  const [projectsRef, projectsInView] = useIntersectionObserver()

  useLayoutEffect(() => {
    applyTheme(getInitialDarkMode())
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
            <TypingAnimation
              as="h1"
              className="text-xl md:text-2xl font-bold mb-4"
              startOnView={false}
              typeSpeed={70}
            >
              Hey, I&apos;m Cole.
            </TypingAnimation>
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
                      <p>{edu.coursework.completed}</p>
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
            <h2 className="text-base md:text-lg font-bold mb-2">SOME PROJECTS I'M WORKING ON:</h2>
            <p className="text-xs text-muted-foreground mb-6 italic">Metrics as of September 2026.</p>
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
              <strong>Languages:</strong> Python, TypeScript/JavaScript, Swift, Java, Rust, C, SQL
            </p>
            <p>
              <strong>Backend & Security:</strong> Node.js, Express, FastAPI, Deno, REST APIs, WebSockets, PostgreSQL, Supabase, Firebase/Firestore, Prisma, asyncpg, SQLCipher, Snowflake, OAuth2/PKCE, JWT/JWKS, AES-256-GCM, row-level security
            </p>
            <p>
              <strong>Frontend & Mobile:</strong> SwiftUI, Next.js, React, Tauri, Tailwind CSS, shadcn/ui
            </p>
            <p>
              <strong>Infrastructure & Testing:</strong> Linux/Unix, Azure, Docker, GitHub Actions CI, AWS Bedrock, OpenAI API, Model Context Protocol, Playwright, pytest, Vitest, XCTest, Git
            </p>
            <p>
              <strong>Product:</strong> product requirements, user research, stakeholder interviews, competitive analysis, prioritization, roadmapping, sprint planning, KPI tracking, SEO, product analytics (PostHog), Linear
            </p>
            <p>
              <strong>AI Tooling:</strong> Claude Code, Cursor, OpenAI Codex, Gemini CLI
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
        <span>© 2026 COLE HACKMAN</span>
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
