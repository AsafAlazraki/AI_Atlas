# Recipes

Step-by-step playbooks for the most common changes. Run through the matching recipe before improvising — it'll save review cycles and keep the codebase coherent.

---

## Add a new AI capability

Goal: a new entry in the AI Capabilities sidebar group, a new card on the Capabilities overview page, and a new slideshow page at `/capabilities/<slug>`.

**1. Pick a slug.** Lowercase, hyphenated, URL-safe. e.g. `code-review-agent`. This will be: the route segment, the Firestore doc id, and the Storage folder name. Pick once.

**2. Create the page file.** `src/pages/capabilities/<PascalName>.tsx`. Copy `src/pages/capabilities/Rovo.tsx` as a starting template. Replace:

- `hero` (kicker, title, titleAccent, tagline)
- The stage components (Overview / How it works / SDLC etc.)
- The FAQs array
- Stage list

Stages are typed as `SlideshowStage[]` from `src/types/slideshow.ts`. Use `<ContentStage>`, `<VideoStage>`, `<FAQStage>` building blocks — don't reinvent.

**3. Wire the route.** In `src/App.tsx`, add a new `<Route>` under `/capabilities`:

```tsx
<Route path="<slug>" element={<NewCapability />} />
```

**4. Add the nav entry.** In `src/lib/nav.ts`, add a `NavLeaf` to the `AI Capabilities` group's `children`:

```ts
{
  type: 'leaf',
  label: 'New Capability',
  to: '/capabilities/<slug>',
  icon: SomeHeroicon,
  description: 'One-line blurb shown on the catalog card.',
},
```

The Capabilities overview page reads from `capabilityLeaves` automatically — your new capability will appear there with no extra work.

**5. Verify.**

```bash
npm run typecheck
npm run dev
```

Click through: sidebar entry → catalog card → page → step through every slideshow stage → keyboard arrows.

**6. Commit.** Conventional Commits format: `feat: add <capability> capability page`.

---

## Add a demo video to a capability

Pre-req: video file (`.mp4`, H.264 + AAC, < 500 MB).

**1. Decide on a filename.** Lowercase, hyphenated, descriptive. e.g. `intro.mp4`, `walkthrough.mp4`, `deep-dive.mp4`.

**2. Upload to Firebase Storage** at the canonical path:

```
capabilities/<capabilityId>/videos/<filename>.mp4
```

Use either:

- The Firebase Console (manual)
- An admin upload script (when one exists) using `uploadFile` from `src/lib/storage.ts`

**3. Reference the video in the page.** In the capability's page file, locate the demo stage and set `storagePath`:

```tsx
import { path } from '../../lib/storage';

{
  id: 'demo',
  label: 'Demo video',
  content: (
    <VideoStage
      heading="Capability in 2 minutes"
      description="What you'll see in this walkthrough."
      storagePath={path.capabilityVideo('<capabilityId>', '<filename>.mp4')}
      durationLabel="2:14"
    />
  ),
},
```

**4. (Optional) Upload a poster image.** Same pattern with `path.capabilityPoster(...)`. Pass it as `posterPath` on `<VideoStage>`.

**5. Verify in dev.** The video player should resolve the URL from Storage and render. If it shows the placeholder, check (a) the path is correct, (b) Storage rules allow read on that path.

**6. Commit.** `feat: add demo video to <capability>`.

> **Once we wire video metadata to Firestore** (see [data-model.md](data-model.md)), step 3 becomes "create a `videos` doc in Firestore", and the page will read videos for the capability automatically. Until then, video metadata lives inline in the page file.

---

## Add or edit FAQs for a capability

**Today** (FAQs hardcoded in the page file): edit the `faqs` array in `src/pages/capabilities/<Capability>.tsx`. Each entry needs a stable `id` (used as React key + open-state handle), a `question`, and an `answer`.

**Later** (when wired to Firestore): create / update docs in `<prefix>faqs` with `capabilityId` set. The page will fetch them via a `useFaqs(capabilityId)` hook.

Don't add a question whose answer is "TBD". Either write the real answer or leave the FAQ off until you have one.

---

## Modify brand colours

Brand tokens live in `tailwind.config.ts` under `theme.extend.colors`. Change there and Tailwind regenerates utility classes.

**Don't:**
- Hard-code hexes inline in components.
- Add a colour to one component without adding a token.
- Use Tailwind's stock `red-*` / `blue-*` / `slate-*` for brand-purpose elements — they drift.

After changing a token, scan the diff with `git grep` for any inline hexes that should now use the new token. Update [docs/design-system.md](design-system.md) if you've added or renamed a token.

---

## Add a new top-level nav item

Discuss with the team first — the IA is intentionally narrow (Dashboard / AI Capabilities / Settings). Adding a top-level item is rare and meaningful.

If approved:

1. Add a `NavLeaf` (or `NavGroup`) to `primaryNav` in `src/lib/nav.ts`.
2. Add the route in `src/App.tsx`.
3. Create the page file under `src/pages/`.
4. Update [CLAUDE.md](../CLAUDE.md) and this doc with the new IA.

---

## Run Firebase emulators locally

Pre-req: Firebase CLI (`npm install -g firebase-tools`).

```bash
firebase login                  # one-time
firebase emulators:start
```

Emulator UI: http://localhost:4000

The emulator config is already in `firebase.json`. The current app code talks to the live Firebase project; we'll wire emulator-aware initialisation when there's a workflow that needs it (e.g. seeding test data).

---

## Set up an admin user (when Firebase is enabled)

Until we have an admin tool, custom claims are set with a one-off Node script:

```js
const admin = require('firebase-admin');
const serviceAccount = require('./service-account.json');

admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });

(async () => {
  const user = await admin.auth().getUserByEmail('admin@phoenix-dx.com');
  await admin.auth().setCustomUserClaims(user.uid, { role: 'admin' });
  console.log('Done. User must sign out and back in.');
})();
```

After this, the user can write to Firestore and Storage per the rules. Don't commit the service account JSON — keep it out of the repo.

---

## Deploy (placeholder)

Firebase Hosting is pending admin enablement. When it's available:

1. Hosting site per branch — `pdx-ai-atlas-dev`, `pdx-ai-atlas-test`, `pdx-ai-atlas-prod`.
2. GitHub Action builds on push to each branch and deploys to the matching Hosting site.
3. Branch-specific `VITE_*` env vars injected at build time.
4. Branch protection on all three branches.

This recipe will be filled in once the GitHub Action is wired.

---

## Update CLAUDE.md / these docs

If your PR adds or changes:

- A hard invariant (something every future contributor must know) → update [CLAUDE.md](../CLAUDE.md).
- A reusable pattern (a new component, hook, or convention) → update [design-system.md](design-system.md) or [data-model.md](data-model.md).
- A repeatable task → add a recipe here.

If you're not sure whether a change deserves a doc update: when in doubt, write the doc. Future-you (or future-Claude) will thank you.
