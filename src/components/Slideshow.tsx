import { useEffect, useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import {
  ArrowLeftIcon,
  ArrowRightIcon,
} from '@heroicons/react/24/outline';
import StageNav from './slideshow/StageNav';
import type { CapabilityHeroData, SlideshowStage } from '../types/slideshow';

type Props = {
  hero: CapabilityHeroData;
  stages: SlideshowStage[];
  /** Stage index to start on. */
  initialIdx?: number;
};

/**
 * Capability slideshow — the standard pattern for every AI Capability page.
 *
 *  ┌─────────────────────────────────────────┐
 *  │  Capability hero (kicker, title, tag)   │
 *  ├─────────────────────────────────────────┤
 *  │  Stepper nav (clickable segments)       │
 *  ├─────────────────────────────────────────┤
 *  │  Active stage content (animates in/out) │
 *  ├─────────────────────────────────────────┤
 *  │  ← Previous                Next →       │
 *  └─────────────────────────────────────────┘
 *
 * Keyboard: Left / Right arrows step between stages (when not in an input).
 */
export default function Slideshow({ hero, stages, initialIdx = 0 }: Props) {
  const [idx, setIdx] = useState(initialIdx);
  const directionRef = useRef<'forward' | 'backward' | 'initial'>('initial');
  const stageRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  const goTo = (next: number) => {
    if (next === idx) return;
    directionRef.current = next > idx ? 'forward' : 'backward';
    setIdx(Math.max(0, Math.min(stages.length - 1, next)));
  };

  // Hero entrance — runs once on mount.
  useGSAP(
    () => {
      gsap.from('.gsap-fade', {
        y: 24,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out',
        stagger: 0.07,
        clearProps: 'transform,opacity',
      });
    },
    { scope: heroRef, dependencies: [] },
  );

  // Stage transition — runs when idx changes.
  useEffect(() => {
    if (!stageRef.current) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    const direction = directionRef.current;
    const xFrom = direction === 'backward' ? -32 : direction === 'forward' ? 32 : 16;

    gsap.fromTo(
      stageRef.current,
      { x: xFrom, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.45, ease: 'power3.out', clearProps: 'transform' },
    );
  }, [idx]);

  // Keyboard nav.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement | null)?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;
      if (e.key === 'ArrowLeft') goTo(idx - 1);
      else if (e.key === 'ArrowRight') goTo(idx + 1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idx, stages.length]);

  const isFirst = idx === 0;
  const isLast = idx === stages.length - 1;

  return (
    <div className="space-y-8 sm:space-y-10">
      {/* Hero */}
      <div ref={heroRef} className="relative">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-24 -top-16 h-64 w-64 rounded-full bg-phoenix-500/10 blur-3xl"
        />
        <p className="gsap-fade text-xs font-semibold uppercase tracking-[0.18em] text-phoenix-400">
          {hero.kicker}
        </p>
        <h1 className="gsap-fade mt-3 text-display-md sm:text-display-lg">
          {hero.title}
          {hero.titleAccent && (
            <>
              {' '}
              <span className="accent-phrase">{hero.titleAccent}</span>
            </>
          )}
        </h1>
        <p className="gsap-fade mt-4 max-w-3xl text-base text-midnight-300 sm:text-lg">
          {hero.tagline}
        </p>
      </div>

      {/* Stepper */}
      <StageNav stages={stages} activeIdx={idx} onJump={goTo} />

      {/* Active stage */}
      <div ref={stageRef} className="min-h-[440px]">
        {stages[idx]?.content}
      </div>

      {/* Footer nav */}
      <div className="flex items-center justify-between gap-4 pt-2">
        <button
          type="button"
          onClick={() => goTo(idx - 1)}
          disabled={isFirst}
          className={
            isFirst
              ? 'btn-ghost cursor-not-allowed opacity-40'
              : 'btn-ghost'
          }
        >
          <ArrowLeftIcon className="h-4 w-4" />
          Previous
        </button>
        <div className="hidden text-xs uppercase tracking-wider text-midnight-400 sm:block">
          Stage {idx + 1} of {stages.length} · {stages[idx]?.label}
        </div>
        <button
          type="button"
          onClick={() => goTo(idx + 1)}
          disabled={isLast}
          className={
            isLast
              ? 'btn-primary cursor-not-allowed opacity-40'
              : 'btn-primary'
          }
        >
          Next
          <ArrowRightIcon className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
