import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ArrowRightIcon, ClockIcon } from '@heroicons/react/24/outline';

type Props = {
  /** Eyebrow above the title. */
  kicker: string;
  title: string;
  titleAccent?: string;
  /** Long-form description of the capability. Shown beneath the title. */
  tagline: string;
};

/**
 * Placeholder for capability pages that haven't been built out yet.
 *
 * Renders a clean no-scroll hero with the same visual rhythm as a built
 * capability's first stage, plus a "Coming soon" badge and CTAs back to
 * the catalog or to a built reference example (Atlassian Rovo).
 *
 * The page file that uses this should keep a top-level comment block
 * describing the intended slideshow stage structure, so the next
 * contributor can fill in content directly.
 */
export default function CapabilityComingSoon({
  kicker,
  title,
  titleAccent,
  tagline,
}: Props) {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduced) return;
      gsap.from('.gsap-fade', {
        y: 24,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out',
        stagger: 0.07,
        clearProps: 'transform,opacity',
      });
    },
    { scope, dependencies: [] },
  );

  return (
    <div
      ref={scope}
      className="relative flex h-[calc(100vh-8rem)] flex-col justify-center overflow-hidden"
    >
      {/* Decorative glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-12 h-72 w-72 rounded-full bg-phoenix-500/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 bottom-0 h-72 w-72 rounded-full bg-azure-300/10 blur-3xl"
      />

      <div className="relative mx-auto w-full max-w-4xl">
        <span className="gsap-fade inline-flex items-center gap-2 rounded-full bg-azure-300/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-azure-300 ring-1 ring-inset ring-azure-300/30">
          <ClockIcon className="h-3.5 w-3.5" aria-hidden="true" />
          Coming soon
        </span>
        <p className="gsap-fade mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-phoenix-400">
          {kicker}
        </p>
        <h1 className="gsap-fade mt-3 text-display-md sm:text-display-lg">
          {title}
          {titleAccent && (
            <>
              {' '}
              <span className="accent-phrase">{titleAccent}</span>
            </>
          )}
        </h1>
        <p className="gsap-fade mt-5 max-w-3xl text-base text-midnight-300 sm:text-lg">
          {tagline}
        </p>

        <div className="gsap-fade mt-10">
          <p className="text-xs font-semibold uppercase tracking-wider text-midnight-400">
            What this page will look like
          </p>
          <ol className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-5">
            {['Overview', 'How it works', 'In action', 'Demo video', 'FAQ'].map(
              (label, i) => (
                <li
                  key={label}
                  className="flex items-center gap-2 rounded-xl border border-midnight-700/60 bg-midnight-900/40 px-3 py-2"
                >
                  <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-midnight-800 text-[10px] font-semibold text-midnight-300 ring-1 ring-inset ring-midnight-700">
                    {i + 1}
                  </span>
                  <span className="truncate text-xs font-medium text-midnight-200">
                    {label}
                  </span>
                </li>
              ),
            )}
          </ol>
        </div>

        <div className="gsap-fade mt-8 flex flex-wrap items-center gap-3">
          <Link to="/capabilities/atlassian-rovo" className="btn-primary">
            See Atlassian Rovo as a built example
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
          <Link to="/capabilities" className="btn-ghost">
            Back to capabilities
          </Link>
        </div>
      </div>
    </div>
  );
}
