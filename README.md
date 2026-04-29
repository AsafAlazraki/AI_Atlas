# PDX AI Atlas

A demo landscape for **PhoenixDX's AI capabilities across the SDLC**.

Single-page web app (React + Vite + TypeScript) styled with Tailwind, backed by Firebase (Auth + Firestore), and deployed to Firebase Hosting.

---

## Tech stack

- **Frontend:** React 19, Vite 6, TypeScript 5
- **Styling:** Tailwind CSS 3 (PhoenixDX red as primary brand token)
- **Routing:** React Router v7 (library mode)
- **Backend:** Firebase Auth + Firestore
- **Hosting:** Firebase Hosting (to be enabled by admin — branch-mapped sites)
- **Icons:** Heroicons

---

## Local setup

```bash
npm install
cp .env.example .env.local
# fill in VITE_FIREBASE_* values from Firebase Console
npm run dev
```

Open http://localhost:5173.

| Script             | What it does                                     |
| ------------------ | ------------------------------------------------ |
| `npm run dev`      | Vite dev server with HMR                         |
| `npm run build`    | Type-check then produce a production bundle      |
| `npm run preview`  | Serve the built bundle locally                   |
| `npm run typecheck`| Type-check without emitting                      |

---

## Branch strategy

Three long-lived environment branches — each maps to a Firebase Hosting site and its own Firestore collection set. Working branches live underneath.

```
                                                 ┌──────────────┐
                                       ┌─────►   │  prod (live) │   ──►  Hosting site: prod  ·  Firestore prefix: prod_
                                       │         └──────────────┘
                                       │  PR & sign-off
                                       │
                              ┌────────┴─────┐
                              │ test (QA)    │   ──►  Hosting site: test  ·  Firestore prefix: test_
                              └──────────────┘
                                       ▲
                                       │  PR after dev verification
                                       │
                              ┌────────┴─────┐
                              │ dev          │   ──►  Hosting site: dev   ·  Firestore prefix: dev_
                              └──────────────┘
                                       ▲
                                       │  PR
                                       │
                  ┌────────────────────┴────────────────────┐
                  │  feature/*    fix/*    chore/*          │   working branches off `dev`
                  └─────────────────────────────────────────┘
```

### Rules of the road

1. **Never commit directly to `dev`, `test`, or `prod`.** Always via PR.
2. **Working branch naming:** `feature/<short-desc>`, `fix/<short-desc>`, `chore/<short-desc>`. Cut from `dev`.
3. **Promotion path:** `feature/*` → `dev` → `test` → `prod`. Don't skip stages.
4. **`test` branch is QA-stable.** Don't merge unfinished work into it.
5. **`prod` branch is release-stable.** Tag every merge to `prod` (`v0.x.y`).
6. **Hot-fixes** start on `fix/*` cut from `prod`, then merge into `prod` and back-merge into `test` and `dev` to keep history aligned.

### Branch protection (configure on GitHub once admin access is granted)

- `dev`, `test`, `prod`: require PR, require 1 approval, require status checks to pass, no force-push, no direct push.

---

## Environment / Firestore mapping

Each branch builds with environment-specific variables that point its data layer at the correct Firestore collection set.

| Branch | `VITE_APP_ENV` | `VITE_FIRESTORE_PREFIX` | Firestore collections it reads |
| ------ | -------------- | ----------------------- | ------------------------------ |
| `dev`  | `dev`          | `dev_`                  | `dev_capabilities`, `dev_demos`, … |
| `test` | `test`         | `test_`                 | `test_capabilities`, `test_demos`, … |
| `prod` | `prod`         | `prod_`                 | `capabilities`, `demos`, …  *(or `prod_` — your call)* |

All Firestore access **must** go through `src/lib/firestore.ts` (`col()` and `docRef()` helpers) so the prefix is applied consistently. Do **not** call `collection(db, …)` directly in feature code.

For local development, set `VITE_FIRESTORE_PREFIX=dev_` in `.env.local`.

---

## Project structure

```
src/
├── App.tsx                  Routes
├── main.tsx                 React root
├── index.css                Tailwind directives + base layer
├── components/
│   ├── DashboardLayout.tsx  Shell: sidebar + topbar + main outlet
│   ├── Sidebar.tsx          Collapsible sidebar (desktop) / drawer (mobile)
│   └── Topbar.tsx           Sticky header with env badge
├── pages/
│   ├── Dashboard.tsx
│   ├── Capabilities.tsx
│   ├── DemoLandscape.tsx
│   └── Settings.tsx
└── lib/
    ├── env.ts               Reads VITE_APP_ENV, VITE_FIRESTORE_PREFIX
    ├── firebase.ts          Initialises Firebase app, auth, db
    ├── firestore.ts         col() + docRef() — env-prefixed
    └── nav.ts               Shared nav item list
```

---

## Deployment

Firebase Hosting will be enabled by the admin shortly. Once available we'll wire up:

- A Firebase Hosting **site per branch** (`pdx-ai-atlas-dev`, `pdx-ai-atlas-test`, `pdx-ai-atlas-prod`).
- A GitHub Action that builds and deploys to the matching site on every push to `dev` / `test` / `prod`, injecting the right `VITE_*` env vars at build time.
- Branch-protection rules on GitHub.

Until hosting is available, `npm run build` produces a static `dist/` bundle that can be served from any static host for early review.

---

## License

Proprietary — © PhoenixDX. All rights reserved.
