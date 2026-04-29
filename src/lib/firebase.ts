import { initializeApp, type FirebaseApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';
import { getFirestore, type Firestore } from 'firebase/firestore';
import { getStorage, type FirebaseStorage } from 'firebase/storage';

/**
 * Firebase initialisation with dev-friendly fallbacks.
 *
 * If VITE_FIREBASE_API_KEY isn't set (the .env.local hasn't been
 * populated yet), we substitute placeholders so the SDK doesn't throw
 * at module load and crash the entire app shell. Firebase calls will
 * still fail when actually invoked, but the UI renders, dev keeps
 * iterating, and a single console warning is emitted.
 */
const apiKey = import.meta.env.VITE_FIREBASE_API_KEY;
export const isFirebaseConfigured = Boolean(apiKey);

if (!isFirebaseConfigured && typeof window !== 'undefined') {
  // eslint-disable-next-line no-console
  console.warn(
    '[firebase] VITE_FIREBASE_API_KEY is not set. Using placeholder config. ' +
      'Firebase reads/writes will fail. Copy .env.example → .env.local and fill in the real values.',
  );
}

const firebaseConfig = {
  apiKey: apiKey || 'AIzaSyDEMO-PLACEHOLDER-NO-ENV-LOCAL-CONFIG',
  authDomain:
    import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'demo-pdx-ai-atlas.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'demo-pdx-ai-atlas',
  storageBucket:
    import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'demo-pdx-ai-atlas.appspot.com',
  messagingSenderId:
    import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '000000000000',
  appId:
    import.meta.env.VITE_FIREBASE_APP_ID ||
    '1:000000000000:web:0000000000000000000000',
};

export const firebaseApp: FirebaseApp = initializeApp(firebaseConfig);
export const auth: Auth = getAuth(firebaseApp);
export const db: Firestore = getFirestore(firebaseApp);
export const storage: FirebaseStorage = getStorage(firebaseApp);
