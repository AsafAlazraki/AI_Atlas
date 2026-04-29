import type { ReactNode } from 'react';

type Props = {
  /** Eyebrow line above the title (e.g., "AI Capabilities · Atlassian"). */
  kicker: string;
  /** Main title text — keep it short. */
  title: string;
  /** Optional accent phrase rendered with the .accent-phrase azure colour. */
  titleAccent?: string;
  /** Tagline / longer description sitting below the title. */
  tagline: string;
  /** Optional content (e.g., stat-card row) rendered below the tagline. */
  children?: ReactNode;
};

/**
 * Stage 1 of every capability slideshow — the intro + overview.
 *
 * Layout: kicker → display heading → tagline → optional children.
 * Designed to fit one viewport at any reasonable window size.
 */
export default function HeroStage({
  kicker,
  title,
  titleAccent,
  tagline,
  children,
}: Props) {
  return (
    <section className="relative flex h-full flex-col justify-center overflow-hidden">
      {/* Decorative glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 -top-12 h-72 w-72 rounded-full bg-phoenix-500/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-32 h-64 w-64 rounded-full bg-azure-300/10 blur-3xl"
      />

      <div className="relative max-w-4xl">
        <p className="gsap-stage-fade text-xs font-semibold uppercase tracking-[0.18em] text-phoenix-400">
          {kicker}
        </p>
        <h1 className="gsap-stage-fade mt-3 text-display-md sm:text-display-lg">
          {title}
          {titleAccent && (
            <>
              {' '}
              <span className="accent-phrase">{titleAccent}</span>
            </>
          )}
        </h1>
        <p className="gsap-stage-fade mt-5 max-w-3xl text-base text-midnight-300 sm:text-lg">
          {tagline}
        </p>
        {children && <div className="gsap-stage-fade mt-8">{children}</div>}
      </div>
    </section>
  );
}

/** Compact 3-up stat row for the hero. */
export function HeroStats({ children }: { children: ReactNode }) {
  return (
    <div className="grid gap-4 sm:grid-cols-3">{children}</div>
  );
}

export function HeroStat({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint: string;
}) {
  return (
    <div className="rounded-2xl border border-midnight-700/60 bg-midnight-900/40 p-4">
      <div className="text-[11px] font-semibold uppercase tracking-wider text-midnight-400">
        {label}
      </div>
      <div className="mt-1 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
        {value}
      </div>
      <div className="mt-1 text-xs text-midnight-300">{hint}</div>
    </div>
  );
}
