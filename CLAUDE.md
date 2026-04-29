# PDX AI Atlas — Claude Code project context

This file is auto-loaded when Claude Code opens this folder. Read it first before exploring.

## What this is

A demo landscape for **PhoenixDX's AI capabilities across the SDLC**. Single-page web app, intended to be hosted on Firebase and visited by stakeholders.

## Stack at a glance

- React 19 + Vite 6 + TypeScript 5
- Tailwind CSS 3 (PhoenixDX red `#E11D2B` is the primary brand token — sampled from the logo, refine when an official brand guide is available)
- React Router v7 (library mode, `BrowserRouter`)
- Firebase Web SDK: Auth + Firestore (Hosting pending — admin is enabling it)
- Heroicons, clsx

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

- ✅ Scaffold complete: bare-bones dashboard with collapsible sidebar, topbar with env badge, four placeholder pages (Dashboard, AI Capabilities, Demo Landscape, Settings).
- ✅ Build passes (`npm run build`).
- ✅ Dev server runs on `http://localhost:5173` (`npm run dev`).
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
├── App.tsx                     Routes
├── main.tsx                    React root + BrowserRouter
├── index.css                   Tailwind directives + base layer
├── components/
│   ├── DashboardLayout.tsx     Shell — owns sidebar collapsed state (persisted to localStorage as 'pdx-sidebar-collapsed')
│   ├── Sidebar.tsx             Collapsible (desktop) / drawer (mobile)
│   └── Topbar.tsx              Sticky header with env badge + collapse toggle
├── pages/
│   ├── Dashboard.tsx           Hero + 3 stat cards + getting-started panel
│   ├── Capabilities.tsx        Empty state — Firestore wiring TODO
│   ├── DemoLandscape.tsx       Skeleton tile grid
│   └── Settings.tsx            Reads from env.ts to display runtime config
└── lib/
    ├── env.ts                  Single source of truth for env vars
    ├── firebase.ts             Initialises Firebase app, auth, db
    ├── firestore.ts            col() + docRef() — env-prefixed wrappers
    └── nav.ts                  Shared nav item list (used by Sidebar + Topbar)
```

## Style notes for new code

- TypeScript strict. No `any`.
- Use `clsx` for conditional class names, not template strings.
- Tailwind tokens to prefer: `phoenix-*` for brand, `ink-*` for text/dividers, `surface*` for backgrounds. `card` is a shorthand component class for the standard card shell.
- Heroicons 24/outline style throughout for visual consistency.
- Pages are self-contained — keep cross-page concerns in `lib/` or `components/`.

## Decisions log

See [docs/decisions.md](./docs/decisions.md).
