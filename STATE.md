# STATE — colehackman.com

## Now
Branch `chore/restore-keystone-bullets` (cut from origin/main @ d71d87e) has an
uncommitted edit to `app/page.tsx` restoring two Keystone bullets (catalog
CUR-K-03 19%→73%, CUR-K-08 reframe / 12 use cases) that PR #9 removed. `next build`
passes. Waiting on Cole's review of the diff before commit, PR, merge and live check.

## Just done
- d71d87e — PR #9 merged: site facts aligned with ~/Desktop/latexresumetool/resumes/catalog.md
  (PolyBuys, AIEL, Elite Bricks, Keystone, AIS4R, Cole Soles, LWD, Track Toolkit,
  RushRank, PolyEats). VERIFIED LIVE on www.colehackman.com 2026-10-08.
- 53dcdcb — catalog-alignment commit (in PR #9)
- 462954e / 8d7cad9 — Cole's Elite Bricks + Keystone title hand edits (shipped in PR #9)

## Next
1. Cole reviews the diff → commit, push, open PR, merge, then /verify-deploy.
2. Set the `@tailwindcss/oxide` value in `pnpm-workspace.yaml` (see Landmines).
3. When Cole resolves catalog §6a #45, revisit the PolyBuys messaging claim.

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

## Landmines
- `pnpm build` fails under pnpm 11: ERR_PNPM_IGNORED_BUILDS for @tailwindcss/oxide.
  Untracked `pnpm-workspace.yaml` still says "set this to true or false". Build with
  `./node_modules/.bin/next build` until this is fixed. Vercel builds fine.
- Local `main` is stale. Production is origin/main, auto-deployed by Vercel to
  www.colehackman.com. Always branch from `origin/main`.
- `chore/content-edits` has already been merged three times (#6, #7, #9). Start new
  branches instead of reusing it.
- All site content lives in hardcoded arrays at the top of `app/page.tsx`.
- Unconfirmed: the AIEL line "Lead the computer science side of an
  interdisciplinary research lab." was kept on the site without Cole confirming it.
