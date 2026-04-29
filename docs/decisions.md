# Decisions log

Append-only record of architectural / process decisions. Most recent at top.

---

## 2026-04-29 — Capability pages snap-to-fit; placeholder pattern; Rovo → Atlassian Rovo

User asked for capability pages to be no-scroll, snap-to-fit slideshows where each stage is one viewport with beautiful animated transitions. Plus: leave all capability pages blank except Atlassian Rovo (renamed from Rovo), with the intended structure preserved so future contributors can fill them in cleanly.

### Slideshow refactored to no-scroll snap-to-fit

`<Slideshow>` no longer takes a separate `hero` prop — stage 1 *is* the hero. The component now sizes itself to `h-[calc(100vh-8rem)]` and lays out as: `[StageNav]` → `[active stage, flex-1]` → `[stage indicator]`. Each stage MUST be designed to fit one viewport. The cardinal sin is adding internal scroll.

New `<HeroStage>` component renders stage 1: kicker → display heading → tagline → optional stats (`<HeroStats>` + `<HeroStat>`).

`<ContentStage>`, `<VideoStage>`, and `<FAQStage>` updated to `flex h-full flex-col overflow-hidden` so they fill the stage area without overflow.

### Side-arrow navigation

Floating circular nav buttons appear on the left/right edges of the stage area when there's somewhere to go. They scale + glow on hover (phoenix-tinted). Plus stepper-click and keyboard arrows. Three ways to navigate, all polished.

GSAP transition between stages: outgoing fades + slides in the opposite direction; incoming fades from the appropriate side, slight scale-up. Inner `.gsap-stage-fade` elements stagger after the stage transition.

### Placeholder pattern: `CapabilityComingSoon`

New component for unbuilt capability pages. Renders a clean no-scroll hero with a "Coming soon" badge, the kicker / title / tagline (so the visual rhythm matches a real capability page), a 5-step "what this page will look like" footprint of the standard slideshow stages, and CTAs back to the catalog and to Atlassian Rovo as a reference.

Each placeholder page file keeps its **intended slideshow structure** as a top-level JSDoc comment block — so when a contributor (or Claude session) goes to fill it in, the icon picks, stage labels, and content shape are pre-decided.

Eight pages converted to placeholder: MultiAgentAnalysis, GitHubCopilot, CodeReview, AutomatedTesting, DocumentationGeneration, SpecToDesign, ClaudeDesign, ReleaseNotes.

### Rovo → Atlassian Rovo

Display label renamed throughout (sidebar nav, page hero). URL slug stays `/capabilities/rovo` for stability. Page file renamed `Rovo.tsx` → `AtlassianRovo.tsx`; the route and nav both point at the new file.

Atlassian Rovo is the single fully-built capability today. It's the canonical reference for any future capability page — when filling in a placeholder, copy its shape.

### CLAUDE.md updated

Hard invariant #3 (capability pages are slideshows) updated to reflect the no-scroll requirement and the placeholder pattern: pages are *either* a built `<Slideshow>` *or* a `<CapabilityComingSoon>`. File map updated with the new components and reflects which capability pages are built vs. placeholder.

---

## 2026-04-29 — Capability catalog expanded; AI/tool-agnostic codified

User added five more capabilities to the catalog and stated the system needs to be AI/tool agnostic. New capability pages (slideshow pattern, full content):

- **Code Review** (`/capabilities/code-review`) — project-aware PR review.
- **Automated Testing** (`/capabilities/automated-testing`) — generation + maintenance + flake detection.
- **Documentation Generation** (`/capabilities/documentation-generation`) — READMEs, API refs, ADRs, runbooks.
- **Claude Design** (`/capabilities/claude-design`) — conversational design with Claude Artifacts.
- **Release Notes Generation** (`/capabilities/release-notes`) — customer-facing notes from PRs/tickets.

Catalog total is now eight capabilities. Roadmap updated: Code Review and Test Generation came off (they're shipped); Legacy Modernisation and Incident Response Copilot replaced them.

Codified hard invariant **#7: AI / tool agnostic** in `CLAUDE.md`. The framework (types, Slideshow component, env-prefixed Firestore) has no vendor field. Capability pages can name specific tools when relevant (Rovo = Atlassian, Claude Design = Anthropic), but the system never assumes a vendor. Two capabilities can solve adjacent problems with different vendors (Spec to Design vs. Claude Design) — that's intentional and shouldn't be folded into one.

Naming decision: `Spec to Design` was renamed from "Requirements to Figma" via popup with locked option `Spec to Design` (slug: `spec-to-design`).

---

## 2026-04-29 — Slideshow capability pages, ambient animation, data-layer foundation, dev playbook

User request after seeing the polished dashboard: bring it up to phoenix-dx.com animation fidelity (continuous flowing-wireframe background + cycling typewriter hero text), make the dashboard a no-scroll static viewport, prepare Firestore + Storage data layer for video demos, and document the way of building so multiple devs (each with their own Claude Code session) stay coherent.

### Capability pages become slideshows

Every AI Capability page is now a stepped slideshow rendered by `<Slideshow>`, with three reusable building blocks: `<ContentStage>`, `<VideoStage>` (Firebase-Storage-backed), `<FAQStage>` (accordion). The standard stage order is **Overview → How it works → In action → Demo video → FAQ**. Pages compose stages as `SlideshowStage[]`. Refactored Rovo to this pattern; created Multi Agent Analysis and Spec to Design (renamed from "Requirements to Figma") with full slideshow stages.

This is hard invariant #3: capability pages do not invent their own layout.

### Dashboard: no-scroll, animated phoenix visual

Two-column layout — kicker / cycling-text headline / tagline / CTAs on the left, animated `<PhoenixVisual>` on the right. Single viewport, no scroll. The `<PhoenixVisual>` has counter-rotating particle orbits, pulsing rings, halos, and a breathing centre icon. Replaces the three stat cards.

### Ambient animation + cycling text

Added `<AnimatedBackground>` (mounted in `DashboardLayout`) — flowing dotted SVG curves, three of them, each with their own dash-offset cycle and slow drift. Added `<CyclingText>` for the typewriter-style hero ("AI-powered software development → digital innovation → ..."). Both respect `prefers-reduced-motion`.

### Data-layer foundation (no backend yet)

Firebase Storage added to `firebase.ts`. New types under `src/types/` for `Capability`, `Video`, `FAQ`. New `src/lib/storage.ts` with `resolveVideoUrl`, `uploadFile`, and `path.*` helpers (canonical paths: `capabilities/<id>/videos|posters|thumbs/<filename>`). Security rules drafted: `firestore.rules` + `storage.rules` follow the public-read / admin-write model gated by `role: "admin"` custom claim. `firebase.json` includes Hosting + emulator config.

No Cloud Functions. No reads from Firestore yet (capability metadata still hardcoded in pages + nav). Hooks/fetchers will be added when the first real Firestore data lands.

### Two new capabilities added to nav

- **Multi Agent Analysis** at `/capabilities/multi-agent-analysis`
- **Spec to Design** at `/capabilities/spec-to-design` (renamed from "Requirements to Figma" via popup, locked option `Spec to Design`)

Both have full slideshow content (Overview, agents/pipeline, demo placeholder, FAQ). Sidebar's AI Capabilities group now has three children.

### Developer playbook

Created `CONTRIBUTING.md` (root) and three docs under `docs/`:

- `design-system.md` — brand tokens, typography scale, component classes, motion modes, accessibility floor.
- `data-model.md` — collections, types, env prefix invariant, security rules, Storage layout.
- `recipes.md` — step-by-step playbooks for the most common changes (add a capability, add a video, add FAQs, modify brand colours, run emulators, set up an admin user).

Updated `CLAUDE.md` to reference these and codify three additional hard invariants: capability pages are slideshows (#3), Storage uses canonical paths via `path.*` helpers (#5), animation respects `prefers-reduced-motion` (#6).

Multi-dev guidance: every meaningful pattern should be encoded in `CLAUDE.md` (invariants), the docs (patterns / schemas / recipes), or the decisions log (rationale). If a future Claude Code session can't reconstruct your reasoning by reading those, the docs need updating.

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
