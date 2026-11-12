# colehackman.com

Cole's personal site. Next.js 14, React 18, Tailwind 4, pnpm. Public repo. Read `STATE.md` first.
All content is hardcoded arrays at the top of `app/page.tsx`.

## Ship policy (default from the 2026-11-10 audit; Cole to edit)
- Branch from `origin/main` with a new name every time. Never reuse an old branch (`chore/content-edits` was reused three times).
- May do without asking: commit and push to a feature branch, open a PR, and for content, interface and documentation changes merge your own PR once `next build` passes and the Vercel check is green, then verify live.
- Always stops for Cole: Vercel project or domain settings, environment variables, dependency or framework upgrades, anything in the Decisions section of `STATE.md`.
- Stricter rule kept: `STATE.md` Decisions still says "Show Cole the diff before every commit" (2026-10-08). Follow it until Cole removes it.
- Deploy path: merge to `main`, Vercel builds and serves www.colehackman.com (project `cole-hackman-portfolio`). No other pipeline.
- Verified means `/verify-deploy` on https://www.colehackman.com: fetch the page and grep for the changed text, and screenshot the first screen at 1440 and 390 px. A green Vercel preview is not verified.
- State file: `STATE.md` in the repo root. Rewrite it with `/handoff` before ending work.

## Facts about Cole
- Titles, dates, numbers and contact details come from the resume catalog (`~/Desktop/latexresumetool/resumes/catalog.md`, read-only) and from Cole's own corrections. A correction from Cole outranks the catalog; say so and tell him the catalog needs updating. Never change a fact to match your own guess.
- Do not change any title, number or email without Cole's instruction. An automated facts check is planned; it does not exist yet.

## Commits
Follow the global rules in `~/.claude/CLAUDE.md`: Conventional Commits, written as Cole, no mention of any tool, no trailers.
