# portfolio-website

Personal portfolio website for Cole Hackman — CS student at Cal Poly SLO.

[![Standard Readme compliant](https://img.shields.io/badge/readme-standard-brightgreen.svg)](https://github.com/RichardLitt/standard-readme)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](#license)
[![Next.js](https://img.shields.io/badge/Next.js-14-000000.svg)](https://nextjs.org/)
[![Deployed on Vercel](https://img.shields.io/badge/deployed-Vercel-black.svg)](https://colehackman.dev)

**Live site:** [colehackman.dev](https://colehackman.dev)

## 1. What Is the Project?

**portfolio-website** is a personal, responsive portfolio application for Cole Hackman. It serves as a central hub to showcase projects, work experience, education, and technical skills in a clean and minimal interface.

## 2. Why Was This Project Built?

This project was built to establish a professional online presence and create a centralized place to display my background and technical capabilities. It serves as a dynamic, easily accessible resume for connecting with peers, recruiters, and clients.

## 3. What Problems Did It Solve?

Traditional static resumes can be difficult to quickly parse and don't effectively showcase interactive or responsive design skills. This portfolio provides a fast, responsive, and easily navigable interface to present my experience while demonstrating proficiency with modern web development tools like Next.js and Tailwind CSS. It also serves as a central directory for all my professional links (LinkedIn, GitHub, Email).

## 4. What Technologies Are Used?

- **Frontend Framework:** Next.js 14, React 18
- **Styling:** Tailwind CSS 4
- **UI Components:** Radix UI primitives, Lucide React
- **Fonts:** Inter, JetBrains Mono (via Google Fonts)
- **Deployment & Analytics:** Vercel

## 5. What Did You Implement?

- Fully responsive design for seamless mobile and desktop viewing
- Dark/light mode toggle with system preference detection and local storage
- Interactive and animated sections using Intersection Observer for scroll animations
- Custom contact form with `mailto` integration for direct communication
- SEO optimization with semantic HTML structure

## 6. How Can Someone Run It Locally?

Requires **Node.js 18+** and **pnpm**.

```bash
# Clone the repository
git clone https://github.com/cole-hackman/portfolio-website
cd portfolio-website

# Install dependencies
pnpm install

# Run the development server
pnpm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
pnpm run build
pnpm start
```

## Maintainers

- [@cole-hackman](https://github.com/cole-hackman)

## License

MIT (SPDX: MIT). © 2025 Cole Hackman.
