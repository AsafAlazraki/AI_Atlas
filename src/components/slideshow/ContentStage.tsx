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
 * Reusable shell for content-style slideshow stages — heading + body.
 * Use `<ContentStage>` to keep visual rhythm consistent across capability pages.
 */
export default function ContentStage({ eyebrow, heading, subtitle, children }: Props) {
  return (
    <section className="card-glow overflow-hidden p-6 sm:p-8 lg:p-10">
      <header className="max-w-3xl">
        {eyebrow && (
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-phoenix-400">
            {eyebrow}
          </p>
        )}
        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
          {heading}
        </h2>
        {subtitle && <p className="mt-3 text-base text-midnight-300">{subtitle}</p>}
      </header>
      <div className="mt-8">{children}</div>
    </section>
  );
}

/** Two-column responsive grid for feature lists inside a ContentStage. */
export function FeatureGrid({ children }: { children: ReactNode }) {
  return <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">{children}</div>;
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
    <article className="group rounded-2xl border border-midnight-700/60 bg-midnight-900/40 p-5 transition-all hover:border-phoenix-500/40 hover:bg-midnight-800/40">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-azure-300/10 text-azure-300 ring-1 ring-inset ring-azure-300/30 transition-colors group-hover:bg-azure-300/20">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </div>
      <h3 className="mt-4 text-base font-semibold text-white">{heading}</h3>
      <p className="mt-1.5 text-sm text-midnight-300">{body}</p>
    </article>
  );
}
