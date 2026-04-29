# Contributing to PDX AI Atlas

This is the playbook for everyone contributing to the Atlas (humans and Claude Code agents alike). Read it once before your first PR.

For deeper specifics, see:

- [docs/design-system.md](docs/design-system.md) for brand, typography, components, motion
- [docs/data-model.md](docs/data-model.md) for Firestore schemas, security rules, Storage layout
- [docs/recipes.md](docs/recipes.md) for step-by-step how-tos (add a capability, add a video, etc.)

The single most important file for orientation is [CLAUDE.md](CLAUDE.md) at the repo root. It's auto-loaded by Claude Code in this folder and encodes the project's hard invariants. Read it before opening files; honour it in every PR.

---

## 1. Getting started

```bash
git clone <repo-url>
cd PDX_AI_ATLAS
npm install
cp .env.example .env.local        # populate with Firebase web-app config
npm run dev                       # http://localhost:5173
```

| Script              | Purpose                                            |
| ------------------- | -------------------------------------------------- |
| `npm run dev`       | Vite dev server with HMR                           |
| `npm run build`     | Type-check then produce a production bundle        |
| `npm run preview`   | Serve the built bundle locally                     |
| `npm run typecheck` | `tsc -b --noEmit`. Type-check only                 |

Until Firebase Hosting is enabled by an admin, builds are local-only.

---

## 2. Branch model

Three long-lived environment branches. **No `main`.**

```
feature/* | fix/* | chore/*   →   dev   →   test   →   prod
```

- **Cut working branches from `dev`.** Use the prefixes `feature/`, `fix/`, `chore/`.
- **Promote sequentially.** `dev` → `test` → `prod`. Don't skip stages.
- **Never commit directly to `dev` / `test` / `prod`.** Always via PR.
- **Hot-fixes** start on `fix/*` cut from `prod`, then merge into `prod` and back-merge into `test` and `dev` to keep history aligned.

Each branch maps to its own Firestore collection set via the `VITE_FIRESTORE_PREFIX` env var (`dev_`, `test_`, `prod_`). See [docs/data-model.md](docs/data-model.md) for details.

---

## 3. Commits

Use [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>: <short summary>

<body. Optional. Focus on *why*.>
```

Common types:

- `feat` for user-visible new functionality
- `fix` for a bug fix
- `chore` for tooling, deps, config
- `docs` for documentation only
- `refactor` for a code change that doesn't add a feature or fix a bug
- `style` for formatting / visual polish
- `test` for tests only

**Subject line** is imperative, lowercase, no full stop, ≤ 72 chars.
**Body** explains *why* the change exists; the *what* is in the diff. Reference incident numbers, linked tickets, or design decisions when helpful.

Co-author Claude when it materially helped:

```
Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
```

---

## 4. PR process

1. Branch off `dev`. One feature = one branch.
2. Keep PRs small (< 400 lines diff is the sweet spot). If your change is bigger, split it.
3. PR title follows the same Conventional Commits format as commits.
4. PR body should answer: *what changed, why, how to test*.
5. Verify locally before opening:
   ```bash
   npm run typecheck
   npm run build
   npm run dev          # smoke-test the affected pages
   ```
6. Open PR against `dev`. After review and approval:
   - Squash-merge into `dev`.
   - Promote to `test` via a separate PR (`dev` → `test`) when ready for QA.
   - Promote to `prod` via a separate PR (`test` → `prod`) when releasing.

### Code review checklist

Before approving / before requesting review, walk through:

- [ ] No direct `collection(db, …)` calls; must use `col()` from `src/lib/firestore.ts`.
- [ ] No light-mode Tailwind classes (`bg-white`, `text-gray-900`, etc.). Dark theme only.
- [ ] All new pages follow the established hero pattern (kicker → display heading → tagline → CTAs).
- [ ] All capability pages use `<Slideshow>` with `<ContentStage>` / `<VideoStage>` / `<FAQStage>` building blocks.
- [ ] Animation respects `prefers-reduced-motion` (skip continuous tweens when set).
- [ ] No em-dashes (`—`) in user-visible copy or comments. Use period, comma, colon, or parentheses instead.
- [ ] No `any`. TypeScript strict.
- [ ] No new third-party deps without discussion.
- [ ] CLAUDE.md / docs/ updated if you changed an invariant or added a pattern.

---

## 5. Working in parallel

Multiple developers will be authoring and improving capabilities at the same time. Here's how to stay out of each other's way.

### One DRI per capability

Every capability page has a Directly Responsible Individual. The DRI owns the content, the structure, and the iteration cadence on that page. Anyone can open a PR into someone else's capability; the DRI reviews and merges.

The DRI list lives in a small table at the bottom of this document (or in your team's tracker if you prefer). Update it when assignments change. If a capability has no DRI, it's "open" and the next person to work on it claims it.

### Branch convention

Cut a working branch off `dev` named after the capability slug:

```
feature/atlassian-rovo-howitworks
feature/code-review-faqs
fix/release-notes-typo
```

Smallest possible scope. One PR per logical change. Don't bundle drive-by edits to other capabilities into your PR; open a separate one or hand them to the relevant DRI.

### The shared-files conflict pattern

Two files get edited every time a capability is added or renamed:

- `src/lib/nav.ts` (the sidebar entries + descriptions)
- `src/App.tsx` (the route definitions)

If two devs add capabilities at the same time, they'll both edit the `children` array in `nav.ts` and the `<Route>` block in `App.tsx`, in the same lines. **Guaranteed merge conflict.** It's a small one (resolve by hand: keep both entries, alphabetise), but worth flagging:

- **Keep entries in alphabetical order** by slug. Insertions land in predictable spots.
- **Don't reorder existing entries** in your PR unless that's the point of the PR; reordering creates phantom conflicts.
- **If you're touching shared files, ping the team first** so other in-flight branches can rebase or land before you.
- **Resolve conflicts immediately on rebase.** Don't let a feature branch sit on stale `dev` for days.

When a third-or-more dev is working in parallel often enough that this is annoying, we'll move to a manifest-driven registry (each capability self-registers, no shared-file edits). Not worth the refactor while we have one or two devs.

### When two devs share one capability

The slideshow stages are independent components inside one page file. Split by stage:

- Dev A on stages 1–2 (Overview, How it works)
- Dev B on stages 4–5 (Demo videos, FAQ)

They edit different `function` declarations in the same `.tsx` file. Git merges non-overlapping changes cleanly. Coordinate on the stage list (the `stages: SlideshowStage[]` array near the bottom of each page) since that's the only spot you both touch.

For larger split work or content that's truly co-authored, **break the page into a folder**:

```
src/pages/capabilities/atlassian-rovo/
├── index.tsx          // Slideshow + stage list
├── Overview.tsx
├── HowItWorks.tsx
├── Demo.tsx
└── FAQ.tsx
```

Folder-per-capability is supported but not required. Use it when single-file conflicts are real, not preemptively.

### Coordination cadence

- **Push your branch early**, even before the PR is ready (open a draft PR). Other devs see what's in flight.
- **Sync `dev` into your branch daily** while working. Long-lived feature branches are where conflicts compound.
- **Don't squat.** If you assign yourself a capability and stop working on it for a week, hand it back.

### DRIs (update as the team grows)

| Capability                  | DRI    |
| --------------------------- | ------ |
| Atlassian Rovo              | _open_ |
| Multi Agent Analysis        | _open_ |
| GitHub Copilot              | _open_ |
| Code Review                 | _open_ |
| Automated Testing           | _open_ |
| Documentation Generation    | _open_ |
| Spec to Design              | _open_ |
| Claude Design               | _open_ |
| Release Notes Generation    | _open_ |

---

## 6. Working with Claude Code in this repo

Multiple developers will use Claude Code on this project. To stay coherent:

1. **Trust the playbook over your assumptions.** When Claude Code hasn't seen your past sessions, it relies on `CLAUDE.md` + `docs/` to understand the project. Update these files when you establish a new pattern so every future session inherits the decision.
2. **Use recipes for repeatable tasks.** [docs/recipes.md](docs/recipes.md) has step-by-step playbooks for the most common changes. If you find yourself doing something three times, add a recipe.
3. **Plan via popups, not bullets.** Capture meaningful planning decisions via interactive popups (the user feedback memory says so). Don't bury choices in long bullet lists.
4. **Verify before reporting done.** Run `npm run build` (or at minimum `npm run typecheck`) before declaring a task complete. UI changes need a browser smoke-test.
5. **One in-progress task at a time.** Use TodoWrite to plan and track work; mark items completed as soon as they're truly done, never optimistically.

---

## 7. Where to put new code

Quick decision tree:

- **Adding a new AI capability?** → [recipes.md](docs/recipes.md#add-a-new-ai-capability)
- **Adding a video to an existing capability?** → [recipes.md](docs/recipes.md#add-a-demo-video)
- **Need a new shared component?** → `src/components/`
- **Need a new shared utility?** → `src/lib/`
- **Need a new TypeScript type?** → `src/types/`
- **Need a new top-level nav item?** Discuss with the team first; the IA is intentionally narrow.

---

## 8. Style points (concise)

- TypeScript strict; no `any`.
- `clsx` for conditional class names.
- Heroicons 24/outline for the body, 20/solid for chevrons / status dots.
- One-line comments only when the *why* is non-obvious. Don't comment what the code says.
- Don't add error handling for cases that can't happen. Trust framework guarantees.
- Don't introduce abstractions until you'd otherwise repeat yourself three times.
- Keep PR scope tight. Don't bundle drive-by refactors with feature work.
- **No em-dashes (`—`) in copy or comments.** Use period, comma, colon, or parentheses. The rule lives in user memory and is enforced in code review.

---

## 9. Reporting issues

For now: track in your team's preferred tracker (Jira / Linear / GitHub Issues, TBD per the team). Reference the issue id in the relevant commit body so future archaeology works.
