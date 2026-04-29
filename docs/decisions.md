# Decisions log

Append-only record of architectural / process decisions. Most recent at top.

---

## 2026-04-29 — Visual upgrade to phoenix-dx.com fidelity

### Brand-faithful dark theme

User saw bare-bones light theme and asked for phoenix-dx.com-level polish: dark navy base, phoenix red accents, light-blue (`#9CC8E8`) for highlighted phrases, large display typography. Defined three Tailwind palettes — `phoenix.*`, `midnight.*`, `azure.*` — plus component classes (`card`, `card-glow`, `btn-primary`, `btn-ghost`, `accent-phrase`, `hairline`) and display-* font sizes with negative letter-spacing for the bold hero look.

The dark theme is **the** theme — no light variant. Every new component should assume dark surfaces.

### GSAP for entrance animations

Added `gsap` + `@gsap/react` and a project-level `useEntrance` hook that applies a stagger fade-up to any `.gsap-fade` element inside a scoped ref. Chosen over CSS-only because: (a) clean stagger, (b) `power3.out` ease, (c) `clearProps` so the elements are unaffected post-animation. Hover/interactive transitions stay in Tailwind — GSAP only for entrances.

### Real PhoenixDX logos in repo

User dropped two source files into project root: a 2048×469 wordmark (white "Phoenix" text + red "DX" + icon, designed for dark backgrounds) and a square icon JPG. Moved to `public/phoenixdx-wordmark.png` and `public/phoenixdx-icon.jpg`. The wordmark renders in the expanded sidebar; the icon renders in the collapsed sidebar and serves as the favicon. Removed the `public/phoenix.svg` placeholder.

### Nav restructured: groups, sub-items, footer slot

`AI Capabilities` is now a `NavGroup` with `children`. Auto-expands when on a child route. `Settings` moved to a dedicated `footerNav` array rendered at the bottom of the sidebar (visually separated by a hairline border). `Demo Landscape` page deleted at user request.

`Capabilities` (the overview at `/capabilities`) is now a **showcase landing page** — a grid of capability cards linking to each sub-page, plus an "On the roadmap" section with placeholders for future capabilities (Requirements Copilot, Code Review Agent, Test Generation, Observability Insights). When a new capability page is added, just add a `NavLeaf` to the group's `children` and a `Route` — the showcase auto-renders the new card.

### Rovo as the first capability page

Created `src/pages/capabilities/Rovo.tsx`. Pattern is: Hero (kicker → display heading → tagline with `accent-phrase` highlight → CTAs) → Feature grid (4 cards: enterprise search, agents, automation, knowledge) → SDLC table (one row per stage explaining how Rovo applies) → closing CTA card. Content positions Rovo as Atlassian's AI tooling that PhoenixDX deploys — reinforces the "we put AI to work for clients" framing of the Atlas.

This page template should be the model for every future capability sub-page.

---

## 2026-04-29 — Initial scaffold decisions

Made during the kick-off session. Captured here so future Claude Code sessions on other devices have the context.

### Frontend framework: React 19 + Vite 6 + TypeScript

**Why:** Static SPA deploys cleanly to Firebase Hosting (no SSR runtime needed). Vite has the fastest dev loop of the options. TypeScript catches integration errors against Firebase's typed SDK.

**Rejected:** Next.js (would require Firebase App Hosting or Cloud Run for SSR — extra moving parts for a demo). Vue/Svelte (smaller component ecosystems for dashboard widgets).

### Styling: Tailwind CSS 3

**Why:** Maximum flexibility for branding to PhoenixDX colors via theme tokens. No prebuilt component look to fight.

**Rejected:** MUI (too opinionated, hard to differentiate visually). Chakra (middle-ground, no decisive advantage). Plain CSS (slowest to bare-bones).

### Branch model: dev / test / prod (no `main`)

**Why:** User explicitly wanted three long-lived environment branches mapping to deployment environments, with working branches cut underneath. `main` would be a fourth branch with no clear purpose.

**`dev` is the intended GitHub default branch** — it's where most PRs target, so it's the natural landing branch for fresh clones.

### Firestore environment isolation: collection prefix via env var

**Why:** User stated "we have duplicate firestore collections that each branch points at". Prefix-per-env (`dev_`, `test_`, `prod_`) inside a single Firestore database is the simplest implementation: one `firestore.ts` helper (`col()`) reads `VITE_FIRESTORE_PREFIX` at build time and every call routes to the right set.

**Rejected:** Multi-database Firestore (newer feature, more setup). Three separate Firebase projects (admin overhead, the user prefers a single project).

**Invariant:** Never call `collection(db, …)` directly. Always go through `col()` / `docRef()` from `src/lib/firestore.ts`.

### Firebase services enabled now: Auth + Firestore (Hosting later)

**Why:** Firebase Hosting is gated behind admin enablement that hadn't happened yet at scaffold time. Auth and Firestore are wired in the SDK so the app can work in dev as soon as `.env.local` is filled in. Hosting + CI/CD come once admin enables it.

### Brand: PhoenixDX red `#E11D2B` as primary

**Why:** Sampled from the rendered PhoenixDX logo (red badge on white). Confidence: medium — direct CSS variables on phoenix-dx.com / phoenix-dx.ai weren't accessible during scaffold. Refine when an official brand guide or Elementor `--e-global-color-primary` is available.

Tokens defined in `tailwind.config.ts` under `phoenix.50`–`phoenix.900`. Update those in one place to re-skin the app.

### Initial push: blocked, deferred

First push to `https://github.com/Phoenix-DX/PDX_AI_Atlas.git` failed with 403 — the `AsafAlazraki` account lacks write access to the Phoenix-DX org. Decision: keep everything local with `dev`, `test`, `prod` branches at the same initial commit, push from a device with org write access. Origin remote has been removed locally so a stale config doesn't get re-tried with bad credentials.

### Other process decisions

- **Heroicons** for icons (24/outline) — single icon library, consistent stroke weight.
- **clsx** for conditional class names — established convention, lighter than alternatives.
- **`pdx-sidebar-collapsed` localStorage key** persists the desktop sidebar collapse state across sessions.
