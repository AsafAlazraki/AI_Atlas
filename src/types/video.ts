import type { Timestamp } from 'firebase/firestore';

/**
 * A demo video associated with a capability.
 * Stored in Firestore at `<prefix>videos/<id>`. Each doc references its
 * capability by id, plus the Storage paths for the media + poster.
 */
export type Video = {
  /** Firestore doc id. */
  id: string;
  /** Capability this video belongs to. */
  capabilityId: string;
  /** Display title — shown above the player. */
  title: string;
  /** Optional description shown beneath the title. */
  description?: string;
  /** Firebase Storage path to the .mp4. */
  storagePath: string;
  /** Optional Storage path to a poster image. */
  posterPath?: string;
  /** Optional duration label, e.g. "2:14" — purely for display. */
  durationLabel?: string;
  /** Order within the capability (low = first). */
  order: number;
  createdAt: Timestamp | string;
  updatedAt: Timestamp | string;
};
