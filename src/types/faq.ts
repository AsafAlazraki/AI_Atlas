import type { Timestamp } from 'firebase/firestore';

/**
 * Frequently-asked-question entry attached to a capability.
 * Stored in Firestore at `<prefix>faqs/<id>`.
 */
export type FAQ = {
  /** Firestore doc id. */
  id: string;
  /** Capability this FAQ belongs to. */
  capabilityId: string;
  question: string;
  /** Plain text or short markdown. The FAQ component renders as text today. */
  answer: string;
  order: number;
  createdAt: Timestamp | string;
  updatedAt: Timestamp | string;
};
