import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import StageNav from './slideshow/StageNav';
import type { SlideshowStage } from '../types/slideshow';

type Props = {
  stages: SlideshowStage[];
  /** Stage index to start on. */
  initialIdx?: number;
};

/**
 * Capability slideshow — snap-to-fit, no-scroll, one stage per viewport.
 *
 *  ┌─────────────────────────────────────────┐
 *  │  Stepper nav (clickable segments)       │
 *  ├─────────────────────────────────────────┤
 *  │                                         │
 *  │  Active stage content (animates in/out) │
 *  │  ←                                  →   │
 *  │                                         │
 *  ├─────────────────────────────────────────┤
 *  │       Stage 1 of 5 · Overview           │
 *  └─────────────────────────────────────────┘
 *
 * Conventions:
 *  - Stage 1 is always the hero / intro / overview (use `HeroStage`).
 *  - Each stage MUST be designed to fit one viewport — no internal scroll.
 *  - Navigation: clickable stepper segments, or ← / → keyboard arrows.
 */
export default function Slideshow({ stages, initialIdx = 0 }: Props) {
  const [idx, setIdx] = useState(initialIdx);
  const directionRef = useRef<'forward' | 'backward' | 'initial'>('initial');
  const stageRef = useRef<HTMLDivElement>(null);

  const goTo = (next: number) => {
    if (next === idx) return;
    if (next < 0 || next >= stages.length) return;
    directionRef.current = next > idx ? 'forward' : 'backward';
    setIdx(next);
  };

  // Stage transition — fade + horizontal slide + inner stagger.
  useEffect(() => {
    if (!stageRef.current) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    const direction = directionRef.current;
    const xFrom =
      direction === 'backward' ? '-3%' : direction === 'forward' ? '3%' : '1%';

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.fromTo(
      stageRef.current,
      { x: xFrom, opacity: 0, scale: 0.985 },
      { x: 0, opacity: 1, scale: 1, duration: 0.55, clearProps: 'transform' },
    );
    tl.from(
      stageRef.current.querySelectorAll('.gsap-stage-fade'),
      { y: 14, opacity: 0, duration: 0.45, stagger: 0.05, clearProps: 'transform,opacity' },
      '-=0.35',
    );
    return () => {
      tl.kill();
    };
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

  return (
    <div className="flex h-[calc(100vh-8rem)] flex-col">
      <div className="gsap-fade flex-shrink-0">
        <StageNav stages={stages} activeIdx={idx} onJump={goTo} />
      </div>

      <div className="relative mt-6 flex-1">
        <div
          ref={stageRef}
          key={idx}
          className="absolute inset-0 overflow-hidden"
        >
          {stages[idx]?.content}
        </div>
      </div>

      <div className="mt-4 flex flex-shrink-0 items-center justify-center gap-3 text-xs uppercase tracking-wider text-midnight-400">
        <span className="text-midnight-500">{idx + 1}</span>
        <span aria-hidden="true">·</span>
        <span>{stages[idx]?.label}</span>
        <span aria-hidden="true">·</span>
        <span className="text-midnight-500">{stages.length}</span>
      </div>
    </div>
  );
}
