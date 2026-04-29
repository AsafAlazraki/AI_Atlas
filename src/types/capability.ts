import type { Timestamp } from 'firebase/firestore';

/**
 * A capability = one entry in the AI Capabilities catalog.
 * Stored in Firestore at `<prefix>capabilities/<id>`.
 *
 * The slug doubles as the route segment (`/capabilities/<slug>`) and the
 * Firestore doc id, so keep them URL-safe (lowercase, hyphens only).
 */
export type Capability = {
  /** Firestore doc id, same as `slug`. */
  id: string;
  /** URL slug, e.g. `rovo`. */
  slug: string;
  /** Display name, e.g. `Rovo`. */
  name: string;
  /** One-line tagline shown on overview cards and on the page hero. */
  tagline: string;
  /** Long-form description used by the page hero subtitle. */
  description: string;
  /** Keyword that maps to a Heroicon in code (kept off the schema for portability). */
  iconKey: string;
  /** Display order on the Capabilities overview page. */
  order: number;
  /** `live` shows it on the catalog; `roadmap` flags it as coming soon. */
  status: 'live' | 'roadmap';
  /** ISO-8601 string in dev/in-memory; Firestore Timestamp once persisted. */
  createdAt: Timestamp | string;
  updatedAt: Timestamp | string;
};
