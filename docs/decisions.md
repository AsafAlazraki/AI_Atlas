# Decisions log

Append-only record of architectural / process decisions. Most recent at top.

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
