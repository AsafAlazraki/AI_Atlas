# PDX AI Atlas — Claude Code project context

This file is auto-loaded when Claude Code opens this folder. **Read it first** before exploring or editing.

For deeper specifics, see:

- [CONTRIBUTING.md](CONTRIBUTING.md) — how to contribute, branch model, PR process
- [docs/design-system.md](docs/design-system.md) — brand, typography, components, motion
- [docs/data-model.md](docs/data-model.md) — Firestore schemas, security rules, Storage layout
- [docs/recipes.md](docs/recipes.md) — step-by-step playbooks for common changes
- [docs/decisions.md](docs/decisions.md) — append-only log of architectural decisions

## What this is

A demo landscape for **PhoenixDX's AI capabilities across the SDLC**. Customer-facing single-page web app — every screen will be shown to a prospect at some point. Visual polish is a feature, not an afterthought.

## Stack at a glance

- React 19 + Vite 6 + TypeScript 5
- Tailwind CSS 3, **dark theme only** matching phoenix-dx.com. Three palettes: `phoenix.*` (red brand), `midnight.*` (navy surfaces), `azure.*` (light-blue accent).
- React Router v7 (library mode, `BrowserRouter`)
- Firebase Web SDK: Auth + Firestore + Storage (Hosting pending — admin enabling it)
- **GSAP + @gsap/react** for animation (see Motion below)
- Heroicons (`24/outline` body, `20/solid` chevrons), clsx
- Brand assets: `public/phoenixdx-wordmark.png`, `public/phoenixdx-icon.jpg`

## Hard invariants — do not break these

### 1. Never read or write Firestore directly

All Firestore access must go through `src/lib/firestore.ts` (`col()` / `docRef()`). These prepend `VITE_FIRESTORE_PREFIX` (`dev_`, `test_`, `prod_`) so the build uses the correct env's data set.

```ts
// WRONG — bypasses env isolation
collection(db, 'capabilities');

// RIGHT
import { col } from './lib/firestore';
col<Capability>('capabilities');
```

### 2. Branch model is dev / test / prod — no `main`

Three long-lived branches. Working branches (`feature/*`, `fix/*`, `chore/*`) are cut from `dev`. Promotion is **dev → test → prod**, never skipping a stage. `dev` is the GitHub default.

Never commit directly to `dev`, `test`, or `prod`. Use PRs.

### 3. AI Capability pages are slideshows — always

Every capability page uses `<Slideshow>` from `src/components/Slideshow.tsx`. Stages compose `<ContentStage>` / `<VideoStage>` / `<FAQStage>` building blocks. The standard stage order is **Overview → How it works → In action → Demo video → FAQ**.

Don't write a one-off page layout for a capability. If a capability needs a layout the slideshow can't provide, extend the slideshow primitives — don't fork the pattern.

### 4. Don't bypass the env layer

`src/lib/env.ts` is the single source of truth for `appEnv` and `firestorePrefix`. Read from it; don't read `import.meta.env.VITE_*` directly elsewhere unless you're adding a new variable to that file.

### 5. Storage media uses canonical paths

Use the `path` helpers from `src/lib/storage.ts` — never hand-build storage paths. Canonical layout is `capabilities/<id>/videos|posters|thumbs/<filename>`.

### 6. Animation respects `prefers-reduced-motion`

All ambient and entrance animation must check `window.matchMedia('(prefers-reduced-motion: reduce)').matches` and bail. The existing `useEntrance`, `AnimatedBackground`, `CyclingText`, and `PhoenixVisual` already do this — copy the pattern.

## Current state

- ✅ Dark-themed, customer-grade UI matching phoenix-dx.com aesthetic.
- ✅ Sidebar with expandable AI Capabilities group, Settings pinned to bottom.
- ✅ Pages: Dashboard, Capabilities (catalog), Rovo, Multi Agent Analysis, Spec to Design, Settings.
- ✅ Slideshow pattern in place — every capability page is a stepped slideshow ending with Demo Video + FAQ.
- ✅ Continuous ambient animation: flowing wireframe `AnimatedBackground` (global) + `PhoenixVisual` orbital particles (Dashboard).
- ✅ Cycling typewriter hero text on Dashboard.
- ✅ Build passes (`npm run build`).
- ✅ Firebase SDK wired (Auth, Firestore, Storage). `.env.local` is missing — needs real config to actually talk to Firebase.
- ✅ Security rules drafted (`firestore.rules`, `storage.rules`) — public reads, admin-only writes via `role: "admin"` custom claim.
- ✅ Three local branches at the same commit: `dev`, `test`, `prod`.
- ⏳ **No git remote.** Intended remote: `https://github.com/Phoenix-DX/PDX_AI_Atlas.git`. Initial push 403'd — `AsafAlazraki` lacks write access to the Phoenix-DX org. Will be pushed from a device with org credentials.
- ⏳ Firebase Hosting pending admin enablement.
- ⏳ No demo videos uploaded yet — `<VideoStage>` renders the placeholder until `storagePath` is set on each stage.

## When you next pick this up

1. **Push to GitHub** (when on a device with org write access):
   ```bash
   git remote add origin https://github.com/Phoenix-DX/PDX_AI_Atlas.git
   git push -u origin dev    # push first so it becomes default
   git push -u origin test
   git push -u origin prod
   ```
2. **Wire Firebase env vars** — populate `.env.local` from `.env.example` with real Firebase web config.
3. **Upload first demo videos** — see [recipes.md](docs/recipes.md#add-a-demo-video-to-a-capability).
4. **Add a sign-in screen** — Firebase Auth wired but no UI yet.
5. **Populate seed Firestore data** for `dev_capabilities`, `dev_videos`, `dev_faqs` so the catalog can read live data instead of relying on hardcoded nav entries.
6. **Set up CI/CD** when Hosting is enabled — GitHub Action per branch, env-aware build.

## Common commands

```bash
npm run dev         # dev server (port 5173)
npm run build       # production bundle (also typechecks)
npm run preview     # serve the built bundle
npm run typecheck   # tsc -b --noEmit
```

## Where things live

```
PDX_AI_ATLAS/
├── CLAUDE.md                         You are here
├── README.md                         Project overview, branch strategy diagram
├── CONTRIBUTING.md                   Contribution playbook
├── firebase.json                     Firestore + Storage + Hosting + Emulator config
├── firestore.rules                   Public-read / admin-write rules
├── firestore.indexes.json            Firestore composite indexes (currently empty)
├── storage.rules                     Public-read / admin-write rules + 500 MB cap
├── .firebaserc.example               Project alias template
├── .env.example                      VITE_* template (Firebase web config + env prefix)
├── docs/
│   ├── design-system.md              Brand, typography, components, motion
│   ├── data-model.md                 Firestore schemas, security model, Storage layout
│   ├── recipes.md                    Step-by-step playbooks
│   └── decisions.md                  Append-only architectural log
├── public/
│   ├── phoenixdx-wordmark.png        Full horizontal logo (dark-bg-ready)
│   └── phoenixdx-icon.jpg            Square icon (favicon + collapsed sidebar + dashboard centre)
└── src/
    ├── App.tsx                       Routes
    ├── main.tsx                      React root + BrowserRouter
    ├── index.css                     Tailwind directives + base layer + component classes
    ├── components/
    │   ├── AnimatedBackground.tsx    Global flowing wireframe SVG (mounted in DashboardLayout)
    │   ├── CyclingText.tsx           Typewriter cycle through phrases
    │   ├── DashboardLayout.tsx       Shell: AnimatedBackground + Sidebar + Topbar + Outlet
    │   ├── PhoenixVisual.tsx         Animated brand visual for Dashboard (orbital particles)
    │   ├── Sidebar.tsx               Collapsible/drawer; supports NavLeaf + NavGroup w/ sub-items
    │   ├── Slideshow.tsx             Capability slideshow orchestrator (hero + stepper + stage + footer)
    │   ├── Topbar.tsx                Sticky header with env badge + collapse toggle
    │   └── slideshow/
    │       ├── ContentStage.tsx      Reusable shell for content stages + FeatureGrid + FeatureCard
    │       ├── FAQStage.tsx          Accordion FAQ stage
    │       ├── StageNav.tsx          Stepper progress nav (clickable segments)
    │       └── VideoStage.tsx        Firebase Storage video player + placeholder
    ├── pages/
    │   ├── Dashboard.tsx             Two-column hero (left) + PhoenixVisual (right), no scroll
    │   ├── Capabilities.tsx          Catalog overview — auto-renders cards from capabilityLeaves
    │   ├── Settings.tsx              Runtime config display
    │   └── capabilities/
    │       ├── Rovo.tsx              Atlassian Rovo
    │       ├── MultiAgentAnalysis.tsx Multi-agent codebase analysis
    │       └── SpecToDesign.tsx      Spec → Figma designs pipeline
    ├── lib/
    │   ├── env.ts                    appEnv + firestorePrefix (read VITE_* once)
    │   ├── firebase.ts               app, auth, db, storage initialisation
    │   ├── firestore.ts              col() + docRef() — env-prefixed wrappers
    │   ├── nav.ts                    NavLeaf + NavGroup; primaryNav, footerNav, capabilityLeaves
    │   ├── storage.ts                resolveVideoUrl(), uploadFile(), path.* helpers
    │   └── useEntrance.ts            GSAP hook — staggered fade-up on `.gsap-fade` elements
    └── types/
        ├── capability.ts             Capability Firestore type
        ├── faq.ts                    FAQ Firestore type
        ├── slideshow.ts              SlideshowStage + CapabilityHeroData
        └── video.ts                  Video Firestore type
```

## Page composition pattern

Every page should look like this at the top level:

```tsx
import { useRef } from 'react';
import { useEntrance } from '../lib/useEntrance';

export default function MyPage() {
  const scope = useRef<HTMLDivElement>(null);
  useEntrance(scope);

  return (
    <div ref={scope} className="space-y-10">
      <header>
        <p className="gsap-fade text-xs font-semibold uppercase tracking-[0.18em] text-phoenix-400">
          KICKER
        </p>
        <h1 className="gsap-fade mt-3 text-display-md sm:text-display-lg">
          Title <span className="accent-phrase">accent</span>
        </h1>
        <p className="gsap-fade mt-4 max-w-2xl text-midnight-300">Tagline.</p>
      </header>
      {/* Sections, each with .gsap-fade on the element to animate */}
    </div>
  );
}
```

Capability pages skip this and use `<Slideshow>` instead — see [recipes.md](docs/recipes.md#add-a-new-ai-capability).

## Style notes for new code

- **Dark theme only** — page bg `midnight-950`, text white. No `bg-white`, no `text-gray-*`.
- **TypeScript strict.** No `any`.
- **`clsx`** for conditional class names — not template strings.
- **Component classes** in `index.css`: `card`, `card-glow`, `btn-primary`, `btn-ghost`, `accent-phrase`, `hairline`. Prefer these over re-rolling.
- **Animation modes:**
  - *Entrance* — `useEntrance` + `.gsap-fade` class (one-shot, on mount).
  - *Ambient* — `AnimatedBackground`, `PhoenixVisual` (continuous, GSAP-driven, `prefers-reduced-motion`-aware).
  - *Interaction* — Tailwind `hover:*` / `transition-*` only. Don't use GSAP for hover.
- **Heroicons 24/outline** by default; `20/solid` for chevrons / status dots.
- **No `any`.** No light-mode classes. No direct `collection(db, …)`. No hand-built storage paths. These are review blockers.

## Decisions log

See [docs/decisions.md](./docs/decisions.md). Append every architectural decision worth recording — most-recent at top.
