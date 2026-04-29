# PDX AI Atlas — Claude Code project context

This file is auto-loaded when Claude Code opens this folder. Read it first before exploring.

## What this is

A demo landscape for **PhoenixDX's AI capabilities across the SDLC**. Single-page web app, intended to be hosted on Firebase and visited by stakeholders.

## Stack at a glance

- React 19 + Vite 6 + TypeScript 5
- Tailwind CSS 3 — **dark theme** matching phoenix-dx.com. Three palettes:
  `phoenix.*` (red, brand), `midnight.*` (navy surfaces, page bg = `midnight-950`),
  `azure.*` (light-blue accent — used for highlighted phrases like the
  "software development" treatment on phoenix-dx.com).
- React Router v7 (library mode, `BrowserRouter`)
- Firebase Web SDK: Auth + Firestore (Hosting pending — admin is enabling it)
- **GSAP + @gsap/react** for entrance animations (`useEntrance` hook applies a
  staggered fade-up to any `.gsap-fade` element inside the page scope)
- Heroicons, clsx
- Brand assets: `public/phoenixdx-wordmark.png` (full logo, dark-bg-ready) and
  `public/phoenixdx-icon.jpg` (square icon — also the favicon)

## Hard invariants — do not break these

### 1. Never read or write Firestore directly

All Firestore access **must** go through `src/lib/firestore.ts` (`col()` / `docRef()`). These prepend `VITE_FIRESTORE_PREFIX` (e.g. `dev_`, `test_`, `prod_`) to every collection name so the build uses the correct env's data set.

Wrong:
```ts
import { collection } from 'firebase/firestore';
import { db } from './lib/firebase';
collection(db, 'capabilities');   // hits the un-prefixed collection
```

Right:
```ts
import { col } from './lib/firestore';
col('capabilities');              // resolves to dev_capabilities / test_capabilities / prod_capabilities
```

### 2. Branch model is dev / test / prod — no `main`

Three long-lived branches. Working branches (`feature/*`, `fix/*`, `chore/*`) are cut from `dev`. Promotion is **dev → test → prod**, never skipping a stage. Hot-fixes start on `fix/*` cut from `prod`, then merge back into `prod`, `test`, `dev` to keep history aligned.

`dev` is intended to be the GitHub default branch.

Never commit directly to `dev`, `test`, or `prod` once branch protection is on (it isn't yet — but treat it as if it is). Use PRs.

### 3. Don't bypass the env layer

`src/lib/env.ts` is the single source of truth for `appEnv` and `firestorePrefix`. Read from it, don't read `import.meta.env.VITE_*` directly elsewhere unless you're adding a new variable to that file.

## Current state

- ✅ Dark-themed dashboard matching phoenix-dx.com brand aesthetic. Real PhoenixDX logos in place (`public/phoenixdx-wordmark.png`, `public/phoenixdx-icon.jpg`).
- ✅ Sidebar with expandable nav groups (AI Capabilities is a group), Settings pinned to the bottom.
- ✅ Pages: Dashboard, Capabilities (showcase/overview), Capabilities → Rovo (flagship demo page), Settings.
- ✅ GSAP entrance animations on every page via `useEntrance` hook + `.gsap-fade` class.
- ✅ Build passes (`npm run build`).
- ✅ Dev server runs (`npm run dev`).
- ✅ Firebase SDK wired but **not initialized with real config** — `.env.local` is missing.
- ✅ Three local branches at the same initial commit: `dev`, `test`, `prod`.
- ⏳ **No git remote configured.** Intended remote: `https://github.com/Phoenix-DX/PDX_AI_Atlas.git`. First push attempt failed with 403 because the AsafAlazraki account doesn't have write access to the Phoenix-DX org. Will be pushed from a device whose credentials have access.
- ⏳ Firebase Hosting pending admin enablement.

## When you next pick this up — likely tasks

In rough order of priority:

1. **Push to GitHub** (when on a device with org write access):
   ```bash
   git remote add origin https://github.com/Phoenix-DX/PDX_AI_Atlas.git
   git push -u origin dev      # push first so it becomes default
   git push -u origin test
   git push -u origin prod
   ```
   Then on GitHub: confirm `dev` is the default branch, add branch protection to all three (require PR + 1 approval + status checks; no force-push, no direct push).

2. **Wire Firebase env vars.** Get the web-app config from Firebase Console → Project Settings, populate `.env.local` from `.env.example`. Verify auth and a Firestore read work.

3. **Add a sign-in screen.** Firebase Auth is already imported but no UI yet.

4. **Populate seed data** in Firestore for `dev_capabilities` and `dev_demos` so the placeholder pages render real content.

5. **Set up CI/CD** when Firebase Hosting is available: GitHub Action that builds and deploys to the matching Firebase Hosting site on every push to `dev` / `test` / `prod`, injecting the right `VITE_*` env vars at build time.

## Common commands

```bash
npm run dev         # dev server (port 5173)
npm run build       # production bundle (also typechecks)
npm run preview     # serve the built bundle
npm run typecheck   # tsc -b --noEmit
```

## Where things live

```
src/
├── App.tsx                     Routes (/, /capabilities, /capabilities/rovo, /settings)
├── main.tsx                    React root + BrowserRouter
├── index.css                   Tailwind directives + base layer + component classes
├── components/
│   ├── DashboardLayout.tsx     Shell — owns sidebar collapsed state (persisted to localStorage as 'pdx-sidebar-collapsed')
│   ├── Sidebar.tsx             Collapsible (desktop) / drawer (mobile). Supports NavLeaf + NavGroup (with sub-items + auto-expand). Brand wordmark or icon based on collapsed state.
│   └── Topbar.tsx              Sticky header with env badge + collapse toggle
├── pages/
│   ├── Dashboard.tsx           Hero + stat cards + capability CTA panel
│   ├── Capabilities.tsx        Overview/showcase — links to each sub-page; "On the roadmap" section for future capabilities
│   ├── capabilities/
│   │   └── Rovo.tsx            Atlassian Rovo capability page — hero, feature grid, SDLC use cases, CTA
│   └── Settings.tsx            Runtime config display
└── lib/
    ├── env.ts                  Single source of truth for env vars
    ├── firebase.ts             Initialises Firebase app, auth, db
    ├── firestore.ts            col() + docRef() — env-prefixed wrappers
    ├── nav.ts                  NavLeaf + NavGroup types; primaryNav, footerNav, allLeaves, capabilityLeaves exports
    └── useEntrance.ts          GSAP hook — apply `.gsap-fade` to elements inside a page-scoped ref
```

### Adding a new AI capability page

1. Create `src/pages/capabilities/<Name>.tsx`. Copy `Rovo.tsx` as a starting point (Hero + FeatureGrid + SDLC + CTA).
2. Add the route under the `capabilities` parent in `src/App.tsx`:
   `<Route path="<slug>" element={<Name />} />`
3. Add a `NavLeaf` to the `AI Capabilities` group's `children` array in `src/lib/nav.ts` — set a `description` (it shows on the Capabilities overview page card).
4. Use Heroicons for the leaf `icon`. For consistency, keep to `24/outline`.
5. Pages should follow the established hero pattern: kicker label (uppercase tracking-wide phoenix-400) → display heading → subtitle (with optional `accent-phrase` span on highlighted words) → CTA buttons.

## Style notes for new code

- **Dark theme only.** Page bg is `midnight-950`; text default is white. Don't reach for light Tailwind colors (`bg-white`, `text-gray-900`) — they'll break the visual language.
- **TypeScript strict.** No `any`.
- **Use `clsx`** for conditional class names, not template strings.
- **Tailwind tokens to prefer:**
  - `phoenix-*` for brand red (CTAs, active state, accent glows).
  - `midnight-*` for surfaces and muted text. Common: `midnight-950` page, `midnight-800` cards, `midnight-700` borders, `midnight-300` muted text.
  - `azure-300` for the light-blue accent on highlighted phrases. Use the `accent-phrase` component class.
- **Component classes** in `index.css`: `card`, `card-glow` (with subtle corner-glow gradient), `btn-primary` (phoenix-red pill), `btn-ghost` (outlined), `accent-phrase`, `hairline`.
- **Heroicons 24/outline** style throughout for visual consistency. Use `20/solid` only for tight chevrons.
- **Animation pattern:** every page has a top-level scope ref + `useEntrance(scope)`. Add `gsap-fade` to elements you want in the entrance stagger. Hovered/interactive animations use Tailwind transitions, not GSAP.
- **Hero pattern** for any new page: kicker (`text-xs font-semibold uppercase tracking-[0.18em] text-phoenix-400`) → display heading (`text-display-md sm:text-display-lg`) → subtitle (`text-midnight-300`, with optional `accent-phrase` highlight) → CTA buttons.
- Pages are self-contained — keep cross-page concerns in `lib/` or `components/`.

## Decisions log

See [docs/decisions.md](./docs/decisions.md).
