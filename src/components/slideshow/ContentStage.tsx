import type { ReactNode } from 'react';

type Props = {
  /** Optional eyebrow label shown above the heading. */
  eyebrow?: string;
  heading: string;
  /** Optional subtitle line shown below the heading. */
  subtitle?: string;
  children: ReactNode;
};

/**
 * Reusable shell for content-style slideshow stages.
 *
 * Fills its container (h-full) so the stage occupies one viewport with
 * no scroll. Header is fixed-height; body grows to fill the remainder.
 *
 * Stages MUST be designed to fit one viewport. If your content
 * overflows, redesign it (split across stages, drop a row, tighten copy).
 * Don't add overflow-y-auto.
 */
export default function ContentStage({ eyebrow, heading, subtitle, children }: Props) {
  return (
    <section className="card-glow flex h-full flex-col overflow-hidden p-6 sm:p-8 lg:p-10">
      <header className="gsap-stage-fade max-w-3xl flex-shrink-0">
        {eyebrow && (
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-phoenix-400">
            {eyebrow}
          </p>
        )}
        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
          {heading}
        </h2>
        {subtitle && <p className="mt-3 text-sm text-midnight-300 sm:text-base">{subtitle}</p>}
      </header>
      <div className="gsap-stage-fade mt-6 flex-1 overflow-hidden">{children}</div>
    </section>
  );
}

/** Two-column responsive grid for feature lists inside a ContentStage. */
export function FeatureGrid({ children }: { children: ReactNode }) {
  return <div className="grid h-full grid-cols-1 gap-4 sm:grid-cols-2">{children}</div>;
}

/** A single feature card with an icon, heading, and body. */
export function FeatureCard({
  icon: Icon,
  heading,
  body,
}: {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  heading: string;
  body: string;
}) {
  return (
    <article className="group flex flex-col rounded-2xl border border-midnight-700/60 bg-midnight-900/40 p-5 transition-all hover:border-phoenix-500/40 hover:bg-midnight-800/40">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-azure-300/10 text-azure-300 ring-1 ring-inset ring-azure-300/30 transition-colors group-hover:bg-azure-300/20">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </div>
      <h3 className="mt-4 text-base font-semibold text-white">{heading}</h3>
      <p className="mt-1.5 text-sm text-midnight-300">{body}</p>
    </article>
  );
}
