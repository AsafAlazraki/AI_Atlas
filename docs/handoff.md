# Handoff: mirror to work GitHub + wire up Firebase

This is the playbook for when a different device (the work-account Claude Code session) takes over the build. It mirrors the personal repo to the work GitHub org, then wires the app to the live Firebase project.

Each numbered prompt is **paste-ready** into a fresh Claude Code session on the target device. The prompts are self-contained: they don't depend on any prior conversation context.

---

## Project facts

| Thing                | Value                                              |
| -------------------- | -------------------------------------------------- |
| Personal mirror repo | `https://github.com/AsafAlazraki/AI_Atlas`         |
| Work repo (target)   | `https://github.com/Phoenix-DX/PDX_AI_Atlas`       |
| Firebase project     | `pdx-ai-demos` (GCP org: `phoenix.services`)       |
| Hosting URL pattern  | `https://pdx-ai-demos.web.app` (single site)       |
| Per-branch sites     | `pdx-ai-atlas-{dev,test,prod}.web.app` (Prompt C)  |

---

## Pre-flight checklist (do these on the work device before any prompt)

1. **GitHub** — confirm the work account can push to `Phoenix-DX/PDX_AI_Atlas`. Test with `gh auth status` or just expect Prompt A's first push to challenge for credentials.
2. **Firebase project** — open the [Firebase Console](https://console.firebase.google.com/project/pdx-ai-demos), confirm:
   - **Authentication** is set up (Sign-in method tab; enable Email/Password and/or Google).
   - **Firestore Database** is created (Production mode, location `australia-southeast1` or whatever your admin chose).
   - **Cloud Storage** is enabled (same location as Firestore).
   - **Hosting** is enabled (Get started clicked).
3. **Web app config** — Project Settings → General → Your apps → click `</>` if there's no Web app yet (name it "PDX AI Atlas"). Copy the config object; you'll need:
   - `apiKey`
   - `authDomain`
   - `projectId` (should be `pdx-ai-demos`)
   - `storageBucket`
   - `messagingSenderId`
   - `appId`
4. **Firebase CLI** — `npm install -g firebase-tools`, then `firebase login` (interactive; do this before pasting Prompt B).

---

## Prompt A: Mirror to the work GitHub

Paste into a fresh Claude Code session in any folder where you want the project to land.

````
I want you to mirror an existing repo of mine into a different GitHub
org. Source is on my personal account; destination is the work org.

  Source       https://github.com/AsafAlazraki/AI_Atlas.git
  Destination  https://github.com/Phoenix-DX/PDX_AI_Atlas.git

Steps:

1. Pick a fresh folder named PDX_AI_ATLAS in the current directory and
   clone the source there. Default branch will land as 'dev'.
       git clone https://github.com/AsafAlazraki/AI_Atlas.git PDX_AI_ATLAS
       cd PDX_AI_ATLAS

2. Materialise the test and prod tracking branches locally (clone only
   creates the default):
       git checkout -b test  origin/test
       git checkout -b prod  origin/prod
       git checkout dev

3. Rename the personal remote so it stays as a backup, then point
   'origin' at the work repo:
       git remote rename origin personal
       git remote add origin https://github.com/Phoenix-DX/PDX_AI_Atlas.git
       git remote -v
   Expect:
       origin    https://github.com/Phoenix-DX/PDX_AI_Atlas.git  (fetch+push)
       personal  https://github.com/AsafAlazraki/AI_Atlas.git    (fetch+push)

4. Push all three branches to the work remote, dev first so it
   becomes the default:
       git push -u origin dev
       git push -u origin test
       git push -u origin prod

   If any push fails with 403, stop and tell me; the work account
   doesn't have write access yet. Don't try to force-push.

5. On the GitHub web UI for Phoenix-DX/PDX_AI_Atlas:
   - Settings → Branches → confirm 'dev' is the default branch.
   - Settings → Branches → add a branch protection rule for each of
     dev, test, prod: require PR + 1 approval, no force-push, no
     direct push.

After this is done, read CLAUDE.md before any code changes; it has
the project's hard invariants. Don't change code in this prompt;
this is mirror-only.
````

---

## Prompt B: Wire up Firebase (single Hosting site)

Same folder, same Claude Code session (or a new one in the same folder).

````
The repo is now on the work GitHub. Now wire it to the live Firebase
project. Project facts:

  Firebase project ID:  pdx-ai-demos
  GCP org:              phoenix.services

The repo already has a committed .firebaserc pointing at pdx-ai-demos.
The repo also has firestore.rules, storage.rules, firebase.json, and
.env.example. .env.local is gitignored and you need to create it from
the values I'll paste.

Steps:

1. Confirm Firebase CLI is installed and I'm logged in:
       firebase --version
       firebase use   # should print pdx-ai-demos
   If 'firebase use' prints something else, run 'firebase use default'
   (the alias 'default' maps to pdx-ai-demos in .firebaserc).
   If firebase-tools isn't installed, install it globally:
       npm install -g firebase-tools
       firebase login
   (firebase login is interactive; I'll do it.)

2. Ask me for the Firebase web app config (apiKey, authDomain,
   projectId, storageBucket, messagingSenderId, appId from Firebase
   Console → Project Settings → Your apps → Web app config). Create
   .env.local at the repo root using .env.example as the template.
   Set:
       VITE_APP_ENV=dev
       VITE_FIRESTORE_PREFIX=dev_
       VITE_FIREBASE_API_KEY=<value>
       VITE_FIREBASE_AUTH_DOMAIN=pdx-ai-demos.firebaseapp.com
       VITE_FIREBASE_PROJECT_ID=pdx-ai-demos
       VITE_FIREBASE_STORAGE_BUCKET=pdx-ai-demos.appspot.com
       VITE_FIREBASE_MESSAGING_SENDER_ID=<value>
       VITE_FIREBASE_APP_ID=<value>
   Confirm .env.local is gitignored. Never commit it.

3. Smoke-test the SDK locally:
       npm install
       npm run dev
   Open http://localhost:5173, open browser dev-tools console. Should
   see ZERO errors and zero warnings (the placeholder warning from
   src/lib/firebase.ts disappears once VITE_FIREBASE_API_KEY is set).
   If it still warns, env vars aren't being picked up. Debug.

4. Deploy the security rules to Firebase:
       firebase deploy --only firestore:rules
       firebase deploy --only storage
   Verify in Firebase Console → Firestore → Rules and Storage → Rules
   that the rules are live. The model is public-read for capability
   data, admin-only writes via the role:"admin" custom claim.

5. Build and deploy the app to Firebase Hosting (single site for now;
   per-branch multi-site comes in a later prompt):
       npm run build
       firebase deploy --only hosting
   When deploy succeeds, it prints the Hosting URL. Open it and verify:
   - Dashboard renders (cycling typewriter, animated phoenix on right,
     flowing wireframes drifting in the background)
   - Sidebar collapsed by default with the wordmark
   - /capabilities loads the catalog of 9 cards
   - /capabilities/atlassian-rovo loads the slideshow with 5 stages,
     navigable via stepper-click and ← / → keyboard
   - Browser console has zero errors

6. Smoke-test Firestore connectivity. In Firebase Console → Firestore
   → Data, create a doc by hand at:
       dev_capabilities/test-doc
       { "name": "smoke test", "order": 999 }
   Tell me when it's created. I'll then have you write a tiny
   read-from-Firestore probe (e.g. on the Settings page) using col()
   from src/lib/firestore.ts to confirm the env-prefixed read works.
   After the read works, we'll delete the test doc and revert the
   probe.

Stop after step 5 and tell me the Hosting URL. We'll do step 6
together once the deploy is verified.

Read CLAUDE.md before any code changes. Hard invariants apply:
- Firestore reads/writes only via col() / docRef() from
  src/lib/firestore.ts (never direct collection(db, ...)).
- Storage paths via path.* helpers in src/lib/storage.ts (never
  hand-build).
- No em-dashes in copy or comments.
- Capability pages are slideshows, no scroll, snap-to-fit.
````

---

## Prompt C: Multi-site Hosting + GitHub Actions auto-deploy

Run when you've used the single-site setup for a while and want per-branch separation. Skip if single-site is enough for now.

````
We have one Firebase Hosting site working from Prompt B (deployed at
pdx-ai-demos.web.app). Now upgrade to three sites (one per branch)
with auto-deploy from GitHub.

Project facts:
  Firebase project:  pdx-ai-demos
  Site IDs to create: pdx-ai-atlas-dev, pdx-ai-atlas-test, pdx-ai-atlas-prod
  GitHub repo:       Phoenix-DX/PDX_AI_Atlas

Steps:

1. In Firebase Console (pdx-ai-demos) → Hosting → "Add another site"
   three times, creating:
       pdx-ai-atlas-dev
       pdx-ai-atlas-test
       pdx-ai-atlas-prod
   These site IDs become subdomains: pdx-ai-atlas-dev.web.app, etc.
   Confirm with me before creating; site IDs are globally unique.

2. Update firebase.json so 'hosting' is an array of three targets,
   each pointing at one of the new sites. Apply targets:
       firebase target:apply hosting dev   pdx-ai-atlas-dev
       firebase target:apply hosting test  pdx-ai-atlas-test
       firebase target:apply hosting prod  pdx-ai-atlas-prod
   This writes to .firebaserc; commit those target mappings.

3. Verify locally by deploying each target manually with the right
   env vars at build time:
       VITE_APP_ENV=dev   VITE_FIRESTORE_PREFIX=dev_   npm run build && firebase deploy --only hosting:dev
       VITE_APP_ENV=test  VITE_FIRESTORE_PREFIX=test_  npm run build && firebase deploy --only hosting:test
       VITE_APP_ENV=prod  VITE_FIRESTORE_PREFIX=prod_  npm run build && firebase deploy --only hosting:prod
   Open each URL; the env badge in the topbar must match (DEV/TEST/PROD).

4. Set up GitHub Actions for auto-deploy on push to dev/test/prod
   branches. Before writing the workflow, walk me through the secrets
   I need to add in GitHub Settings → Secrets and variables → Actions:
   - FIREBASE_SERVICE_ACCOUNT (a service-account JSON; generate at
     Firebase Console → Project Settings → Service Accounts → Generate
     new private key)
   - VITE_FIREBASE_API_KEY
   - VITE_FIREBASE_AUTH_DOMAIN
   - VITE_FIREBASE_PROJECT_ID
   - VITE_FIREBASE_STORAGE_BUCKET
   - VITE_FIREBASE_MESSAGING_SENDER_ID
   - VITE_FIREBASE_APP_ID
   I'll add the secrets, then tell you when to write the workflow.

5. Write .github/workflows/deploy.yml with three jobs (one per branch),
   triggered on push to that branch. Each job:
   - Checks out the matching ref
   - Sets VITE_APP_ENV and VITE_FIRESTORE_PREFIX based on which branch
   - Reads VITE_FIREBASE_* from secrets
   - Runs `npm ci && npm run build`
   - Deploys with FirebaseExtended/action-hosting-deploy@v0 using
     FIREBASE_SERVICE_ACCOUNT and the matching --target

6. Open a feature branch off dev with the workflow + firebase.json +
   .firebaserc updates. Verify the action runs successfully on the
   feature push (it should NOT deploy from a feature branch; only
   dev/test/prod branches trigger deploys). Then merge into dev and
   watch the live deploy.

7. Update CLAUDE.md "Current state" and docs/recipes.md (Deploy
   section) to reflect that auto-deploy is wired.

Read CLAUDE.md and docs/data-model.md before changing anything.
````

---

## Prompt D: Set up an admin user + upload first content

Run when you have a real video to upload (or other content to write to Firestore).

````
I'm ready to upload my first demo video for the Atlassian Rovo
capability. Set up an admin user (so I can write to Firestore and
Storage without being blocked by rules) and walk me through uploading.

Steps:

1. Confirm I have a Firebase Auth user account. Two paths:
   (a) Via the deployed app's sign-in UI (when one exists), or
   (b) Via Firebase Console → Authentication → Users → Add user
       (email + password, simplest for now).
   Tell me the user UID after I confirm the account exists.

2. Set the admin custom claim on that user. Create a tooling-only
   script at scripts/set-admin.mjs:
       import admin from 'firebase-admin';
       import { readFileSync } from 'node:fs';
       const serviceAccount = JSON.parse(readFileSync('./service-account.json', 'utf8'));
       admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
       const uid = process.argv[2];
       if (!uid) { console.error('Usage: node scripts/set-admin.mjs <uid>'); process.exit(1); }
       await admin.auth().setCustomUserClaims(uid, { role: 'admin' });
       console.log('Admin claim set on', uid + '. Sign out and back in for it to take effect.');
   Add scripts/ and service-account.json to .gitignore (don't commit
   either). Tell me to:
   - Download a service-account JSON from Firebase Console → Project
     Settings → Service Accounts → Generate new private key
   - Save it as service-account.json in the repo root (will be
     gitignored)
   - Run: npm install firebase-admin (as a devDependency or one-off)
   - Run: node scripts/set-admin.mjs <my-uid>
   Then sign out and back in in the app for the new claim to take
   effect.

3. Upload the first Atlassian Rovo demo video. The video file is at
   <I'll paste the local path>. Upload to Firebase Storage at exactly:
       capabilities/atlassian-rovo/videos/overview.mp4
   Two ways:
   (a) Firebase Console → Storage → Upload file (drag in, set the path
       manually).
   (b) A one-off script using the admin SDK.
   Pick whichever is easier; I usually prefer (a) for the first one.

4. Update src/pages/capabilities/AtlassianRovo.tsx — find the
   demoVideos array, set storagePath on the 'overview' video to:
       path.capabilityVideo('atlassian-rovo', 'overview.mp4')
   Import { path } from '../../lib/storage' if it isn't already.

5. Build and deploy:
       npm run build
       firebase deploy --only hosting:dev
   (or whichever site I'm testing on)

6. Open the deployed Atlassian Rovo page → step to "Demo videos" →
   click the first card → modal should open and the video should
   play. If it shows the placeholder, check (a) the storage path
   matches exactly, (b) storage.rules allow public read on
   capabilities/** (it should, by default).

Don't commit service-account.json or scripts/set-admin.mjs to the
shared remote without discussing first; admin tooling stays local
until we decide where it should live.

Read CLAUDE.md before any code changes. Hard invariants on storage
paths and Firestore env prefix apply.
````

---

## Order of operations

| # | When                                            | Prompt |
| - | ----------------------------------------------- | ------ |
| 1 | Now, on the work device                         | A      |
| 2 | After Prompt A succeeds                         | B      |
| 3 | Days/weeks later, when per-env hosting matters  | C      |
| 4 | When you have a real video to upload            | D      |
