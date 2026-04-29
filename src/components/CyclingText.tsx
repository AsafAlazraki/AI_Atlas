import { useEffect, useReducer } from 'react';

type Phase = 'typing' | 'holding' | 'erasing' | 'pausing';
type State = { idx: number; text: string; phase: Phase };
type Action =
  | { kind: 'TICK'; nextText: string }
  | { kind: 'TYPED' }
  | { kind: 'HELD' }
  | { kind: 'ERASED' }
  | { kind: 'NEXT'; total: number };

function reducer(state: State, action: Action): State {
  switch (action.kind) {
    case 'TICK':
      return { ...state, text: action.nextText };
    case 'TYPED':
      return { ...state, phase: 'holding' };
    case 'HELD':
      return { ...state, phase: 'erasing' };
    case 'ERASED':
      return { ...state, phase: 'pausing' };
    case 'NEXT':
      return { idx: (state.idx + 1) % action.total, text: '', phase: 'typing' };
  }
}

type Props = {
  /** Phrases to cycle through. Cycles back to the first when finished. */
  words: string[];
  /** Per-character type-in delay (ms). Default 70. */
  typeMs?: number;
  /** Pause after a phrase is fully typed (ms). Default 3200. */
  holdMs?: number;
  /** Per-character erase delay (ms). Default 35. */
  eraseMs?: number;
  /** Pause between erase finish and next phrase start (ms). Default 900. */
  pauseMs?: number;
  /** Wrapper class — defaults to .accent-phrase from index.css */
  className?: string;
};

/**
 * Typewriter cycle through several phrases — like the phoenix-dx.com hero
 * (`AI-powered software development` → `digital innovation` → ...).
 *
 * Renders a span containing the current text plus a blinking cursor.
 * Respects prefers-reduced-motion: shows the first word, no animation.
 */
export default function CyclingText({
  words,
  typeMs = 70,
  holdMs = 3200,
  eraseMs = 35,
  pauseMs = 900,
  className = 'accent-phrase',
}: Props) {
  const [state, dispatch] = useReducer(reducer, { idx: 0, text: '', phase: 'typing' });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return; // CyclingText degrades to static first word in render

    const target = words[state.idx] ?? '';
    let timer: number;

    if (state.phase === 'typing') {
      if (state.text.length < target.length) {
        timer = window.setTimeout(
          () => dispatch({ kind: 'TICK', nextText: target.slice(0, state.text.length + 1) }),
          typeMs,
        );
      } else {
        dispatch({ kind: 'TYPED' });
      }
    } else if (state.phase === 'holding') {
      timer = window.setTimeout(() => dispatch({ kind: 'HELD' }), holdMs);
    } else if (state.phase === 'erasing') {
      if (state.text.length > 0) {
        timer = window.setTimeout(
          () => dispatch({ kind: 'TICK', nextText: state.text.slice(0, -1) }),
          eraseMs,
        );
      } else {
        dispatch({ kind: 'ERASED' });
      }
    } else if (state.phase === 'pausing') {
      timer = window.setTimeout(() => dispatch({ kind: 'NEXT', total: words.length }), pauseMs);
    }

    return () => clearTimeout(timer);
  }, [state, words, typeMs, holdMs, eraseMs, pauseMs]);

  // Reduced-motion fallback: show the first phrase, no cursor animation.
  const reduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <span className={className}>
      {reduced ? words[0] : state.text}
      {!reduced && (
        <span
          aria-hidden="true"
          className="ml-0.5 inline-block h-[0.9em] w-[2px] -translate-y-[0.05em] animate-cursor bg-current align-middle"
        />
      )}
    </span>
  );
}
