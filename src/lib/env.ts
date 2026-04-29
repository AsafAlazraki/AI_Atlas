export type AppEnv = 'dev' | 'test' | 'prod';

export const appEnv: AppEnv = (import.meta.env.VITE_APP_ENV ?? 'dev') as AppEnv;

/**
 * Trailing-underscore prefix applied to every Firestore collection name.
 * Each branch (dev/test/prod) builds with its own value so all reads/writes
 * go to that environment's collection set inside a single Firestore database.
 */
export const firestorePrefix = import.meta.env.VITE_FIRESTORE_PREFIX ?? 'dev_';
