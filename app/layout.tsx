import type React from "react"
import type { Metadata } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import { Suspense } from "react"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Cole Hackman - CS Student & Developer Portfolio",
  description:
    "Personal portfolio of Cole Hackman, a Computer Science student at Cal Poly SLO specializing in AI automation, full-stack development, and entrepreneurship. Previously built $150K+ businesses.",
  keywords: [
    "Cole Hackman",
    "Computer Science",
    "Cal Poly SLO",
    "Developer",
    "AI Automation",
    "Full Stack",
    "React",
    "Next.js",
    "Python",
    "Entrepreneur",
  ],
  authors: [{ name: "Cole Hackman", url: "https://github.com/cole-hackman" }],
  creator: "Cole Hackman",
  publisher: "Cole Hackman",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://colehackman.dev"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Cole Hackman - CS Student & Developer Portfolio",
    description:
      "Personal portfolio of Cole Hackman, a Computer Science student at Cal Poly SLO specializing in AI automation, full-stack development, and entrepreneurship.",
    url: "https://colehackman.dev",
    siteName: "Cole Hackman Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Cole Hackman - Developer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cole Hackman - CS Student & Developer Portfolio",
    description:
      "Personal portfolio of Cole Hackman, a Computer Science student at Cal Poly SLO specializing in AI automation, full-stack development, and entrepreneurship.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
  generator: "v0.app",
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Cole Hackman",
  jobTitle: "Computer Science Student & Developer",
  description:
    "Computer Science student at Cal Poly SLO specializing in AI automation, full-stack development, and entrepreneurship.",
  url: "https://colehackman.dev",
  sameAs: ["https://github.com/cole-hackman", "https://www.linkedin.com/in/colehackman/"],
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "California Polytechnic State University, San Luis Obispo",
    alternateName: "Cal Poly SLO",
  },
  knowsAbout: [
    "Computer Science",
    "AI Automation",
    "Full Stack Development",
    "React",
    "Next.js",
    "Python",
    "JavaScript",
    "Entrepreneurship",
  ],
  email: "hackman@calpoly.edu",
  address: {
    "@type": "PostalAddress",
    addressLocality: "San Luis Obispo",
    addressRegion: "CA",
    addressCountry: "US",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </head>
      <body className={`font-sans ${inter.variable} ${jetbrainsMono.variable}`}>
        <Suspense fallback={null}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}
