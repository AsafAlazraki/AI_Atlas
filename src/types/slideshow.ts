import type { ReactNode } from 'react';

export type SlideshowStage = {
  /** Stable id used as React key and aria-controls handle. */
  id: string;
  /** Short label shown in the stepper (≤ 18 chars works best). */
  label: string;
  /** Stage content. Use ContentStage / VideoStage / FAQStage helpers, or any JSX. */
  content: ReactNode;
};

export type CapabilityHeroData = {
  kicker: string;
  title: string;
  /** Optional accent phrase appended to the title via the .accent-phrase span. */
  titleAccent?: string;
  tagline: string;
};
