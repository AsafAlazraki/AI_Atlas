# Data model

This document describes how Atlas data is shaped, where it lives, how environments are isolated, and how access is controlled.

If you're adding a new collection, follow the patterns here, don't invent new ones.

---

## 1. Storage strategy at a glance

| Concern                | Where                                                              |
| ---------------------- | ------------------------------------------------------------------ |
| Structured data        | Cloud Firestore                                                    |
| Video / image binaries | Firebase Storage                                                   |
| Identity               | Firebase Auth (admin role gated by custom claim `role: "admin"`)   |
| Server logic           | None today, direct client access secured by rules                 |

**No Cloud Functions yet.** Add them only when we genuinely need server-side work (e.g. video transcoding, webhook handling). Until then, the client talks to Firestore + Storage directly.

---

## 2. Environment isolation

The user chose **single Firebase project, three Firestore collection prefixes**:

| Branch | `VITE_APP_ENV` | `VITE_FIRESTORE_PREFIX` | Example collection name |
| ------ | -------------- | ----------------------- | ----------------------- |
| `dev`  | `dev`          | `dev_`                  | `dev_capabilities`      |
| `test` | `test`         | `test_`                 | `test_capabilities`     |
| `prod` | `prod`         | `prod_`                 | `prod_capabilities`     |

**Hard invariant**, *every* Firestore read/write must go through `col()` / `docRef()` from `src/lib/firestore.ts`. Those helpers prepend the prefix. Direct `collection(db, …)` calls bypass env isolation and are a code-review blocker.

Storage is a single shared bucket because demo videos are content, not user data. If dev/test/prod pollution becomes a concern, we'll either prefix top-level Storage folders by env or move to per-env buckets.

---

## 3. Collections

### `capabilities`

One doc per AI capability shown in the catalog. Doc id = slug = the URL segment.

```ts
type Capability = {
  id: string;             // doc id, same as slug
  slug: string;           // 'atlassian-rovo', 'multi-agent-analysis', 'spec-to-design'
  name: string;
  tagline: string;
  description: string;
  iconKey: string;        // mapped to a Heroicon in code (see ICON_MAP in src/lib/nav.ts)
  order: number;
  status: 'live' | 'roadmap';
  createdAt: Timestamp;
  updatedAt: Timestamp;
};
```

Source: [`src/types/capability.ts`](../src/types/capability.ts).

> Today, capabilities are also reflected in `src/lib/nav.ts` so the sidebar renders without hitting Firestore. When we wire to Firestore, the catalog page will fetch from `dev_capabilities` and the sidebar will keep its hardcoded entries (the sidebar is part of the app shell, not data).

### `videos`

One doc per demo video. Each video belongs to a capability.

```ts
type Video = {
  id: string;
  capabilityId: string;
  title: string;
  description?: string;
  storagePath: string;        // path inside Firebase Storage
  posterPath?: string;
  durationLabel?: string;     // e.g. '2:14'
  order: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
};
```

Source: [`src/types/video.ts`](../src/types/video.ts).

### `faqs`

One doc per FAQ entry. Each FAQ belongs to a capability.

```ts
type FAQ = {
  id: string;
  capabilityId: string;
  question: string;
  answer: string;
  order: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
};
```

Source: [`src/types/faq.ts`](../src/types/faq.ts).

---

## 4. Storage layout

All capability media lives under a predictable, capability-scoped path. **Use the `path` helpers in `src/lib/storage.ts`** instead of building strings inline.

| Asset            | Path                                                                |
| ---------------- | ------------------------------------------------------------------- |
| Capability video | `capabilities/{capabilityId}/videos/{filename}.mp4`                 |
| Video poster     | `capabilities/{capabilityId}/posters/{filename}.jpg`                |
| Thumbnail        | `capabilities/{capabilityId}/thumbs/{filename}.jpg`                 |

Helper:

```ts
import { path } from '../lib/storage';

const videoPath = path.capabilityVideo('atlassian-rovo', 'intro.mp4');
//                  → 'capabilities/atlassian-rovo/videos/intro.mp4'
```

To resolve a Storage path to a download URL:

```ts
import { resolveVideoUrl } from '../lib/storage';

const url = await resolveVideoUrl(videoPath);
```

The `<VideoStage>` component handles this internally, pages don't usually call `resolveVideoUrl` directly.

---

## 5. Security rules

Both [`firestore.rules`](../firestore.rules) and [`storage.rules`](../storage.rules) follow the same model:

- **Public reads** on capability data (catalog, videos, FAQs), the Atlas is meant to be browsed by prospects without sign-in.
- **Admin-only writes** gated by Firebase Auth custom claim `role: "admin"`.
- Storage uploads have a 500 MB size ceiling per file as a guardrail.
- Default-deny on anything else.

### Setting an admin

Until the team has an admin tool, custom claims are set via the Firebase Admin SDK from a one-off script:

```js
// requires firebase-admin and a service account
const admin = require('firebase-admin');
admin.initializeApp(/* … */);
await admin.auth().setCustomUserClaims(uid, { role: 'admin' });
```

The user must sign out and back in for the new claim to land in their token.

---

## 6. Firestore typed access

`src/lib/firestore.ts` exposes `col()` and `docRef()`, both prepend the env prefix.

```ts
import { col, docRef } from '../lib/firestore';
import type { Capability } from '../types/capability';

// Typed collection ref
const capRef = col<Capability>('capabilities');
// → CollectionReference<Capability> for 'dev_capabilities' / 'test_capabilities' / 'prod_capabilities'

// Single doc
const docR = docRef<Capability>('capabilities', 'atlassian-rovo');
```

Pattern for fetching a list:

```ts
import { getDocs, query, orderBy } from 'firebase/firestore';

const snap = await getDocs(query(col<Capability>('capabilities'), orderBy('order')));
const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
```

Add this kind of fetch logic to a `src/lib/data/<entity>.ts` module so it's reusable across pages.

---

## 7. Adding a new collection

1. Add the TypeScript type to `src/types/<entity>.ts`.
2. Update [`firestore.rules`](../firestore.rules), add the suffix to the regex match if it follows the public-read / admin-write pattern; otherwise write a dedicated rule block.
3. If the collection has compound queries, add the index to [`firestore.indexes.json`](../firestore.indexes.json) (Firebase will tell you the exact JSON in the dev console after you run a query that needs an index).
4. Add a fetcher module at `src/lib/data/<entity>.ts` that calls `col<NewEntity>('newentity')` and returns typed results.
5. Update this doc with the new collection's schema.

---

## 8. Local emulators

[`firebase.json`](../firebase.json) includes emulator config for Auth, Firestore, Storage, and Hosting. To run them once Firebase CLI is installed:

```bash
firebase emulators:start
```

Emulator UI: http://localhost:4000

In `.env.local`, point the SDK at the emulator by setting `VITE_FIREBASE_PROJECT_ID=demo-pdx-ai-atlas` (any `demo-*` project id triggers emulator-only mode in the SDK when emulators are running). For now we don't auto-connect to emulators, wire that up when we start needing it.
