# STATE — colehackman.com

## Now (2026-11-12)
Nothing in flight on the site. `origin/main` is eb7d872 (PR #11 merged 2026-10-13) and is
live: www.colehackman.com serves "Computer Science Officer" (checked 2026-11-12 with
`curl -s https://www.colehackman.com | grep -o "Computer Science Officer"`). This
branch only adds `CLAUDE.md`, this file and `docs/log/2026-10.md`. No facts changed.

## Next
1. Cole answers the disputed facts (AIEL title: site says Officer, resume catalog says
   Lead; Elite Bricks wording; email: site uses outlook, profile README uses calpoly.edu).
2. Then make the site and catalog agree, in one PR, and verify live.
3. Later: a facts check against the catalog (not built).

## Decisions
- Site facts come only from resumes/catalog.md in ~/Desktop/latexresumetool, which is
  read-only (cite it, never edit it). Add no number that isn't in the catalog — 2026-10-08
- Show Cole the diff before every commit — 2026-10-08
- Keystone heading stays "Software Development Engineer Intern, Product Engineering
  @ Keystone, Seattle" (catalog §3.1 site form) — Cole, 2026-10-08
- Keystone keeps the 19%→73% and reframe/12-use-case bullets — Cole, 2026-10-08
- Keystone never says production, deployed or adopted (catalog §1d) — 2026-10-08
- PolyBuys: Expo/Convex/TS monorepo; no Postgres; no messaging claim until Cole
  confirms catalog §6a #45 — 2026-10-08
- AIEL: no interview count anywhere on the site — 2026-10-08
- AIS4R: exactly one line, no IDOR or vulnerability remediation — 2026-10-08
- Elite Bricks: one NDA line only; no numbers, no Discord bot, no promo codes — 2026-10-08
- Lake Washington Detailing: no 87% quoting-time figure unless Cole confirms — 2026-10-08
- No Redbrick Ventures. Lovable (Apr–Jul 2026) and Perplexity (Sep 2025–Jan 2026)
  stay in Past Work as ended — 2026-10-08
- Track Toolkit is never called "SoundCloud Toolkit"; Unfollowr stays because it was
  already on the site — 2026-10-08
- Visual design stays as it is (audit option 0). Field Notes, Signal Console and Swiss
  Ledger were mocked up and declined. Don't propose a new look, palette, fonts or
  layout — Cole, 2026-10-13

## Landmines
- pnpm 11 (local) rewrites a placeholder `pnpm-workspace.yaml` on install: `allowBuilds:
  '@tailwindcss/oxide': set this to true or false`; `pnpm install` then fails with
  ERR_PNPM_IGNORED_BUILDS and `pnpm build` fails. Fix locally: set it to `true`
  (file is 42 bytes, untracked, not committed). Vercel does not need it: production
  built eb7d872 without it. Do not commit it without checking a Vercel preview.
- Local `main` in ~/Developer/portfolio-website is 16 commits behind origin/main and the
  checkout sits on the merged `ui-audit`. Always branch from `origin/main`; use a worktree.
- Every remote branch is already merged into main and none is deleted (8 besides main).
  Never reuse one; `chore/content-edits` was merged three times (#6, #7, #9).
- `next.config.mjs` sets `ignoreBuildErrors` and `ignoreDuringBuilds`; `tsc --noEmit`
  reports 2 errors (`components/ui/animated-theme-toggler.tsx` lines 187, 214). Deploys anyway.
- All site content is hardcoded arrays at the top of `app/page.tsx`; facts are typed twice
  (catalog and page). Numbers (users, tracks) carry no date or source.
- Resume catalog may say "CS Lead" for AIEL while the site says "Officer" and "Co-lead";
  Cole has not settled it (per 2026-11-10 audit; catalog unreadable by agents in a terminal).

## Verify
Deploy path and live check are in `CLAUDE.md`: `/verify-deploy` on https://www.colehackman.com.
