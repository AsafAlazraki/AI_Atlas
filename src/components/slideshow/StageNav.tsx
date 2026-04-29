import clsx from 'clsx';
import type { SlideshowStage } from '../../types/slideshow';

type Props = {
  stages: SlideshowStage[];
  activeIdx: number;
  onJump: (idx: number) => void;
};

/**
 * Top progress nav for a Slideshow. Renders one segment per stage:
 * past = filled phoenix, current = filled bright phoenix, upcoming = dim.
 * Each segment is a button: clicking jumps to that stage.
 */
export default function StageNav({ stages, activeIdx, onJump }: Props) {
  return (
    <div className="flex w-full items-stretch gap-2 sm:gap-3">
      {stages.map((stage, i) => {
        const state =
          i < activeIdx ? 'past' : i === activeIdx ? 'current' : 'upcoming';
        return (
          <button
            key={stage.id}
            type="button"
            onClick={() => onJump(i)}
            aria-current={state === 'current' ? 'step' : undefined}
            className={clsx(
              'group flex flex-1 flex-col gap-2 text-left',
              'transition-opacity',
              state === 'upcoming' && 'opacity-70 hover:opacity-100',
            )}
          >
            <span
              className={clsx(
                'block h-1 rounded-full transition-all duration-300',
                state === 'past' && 'bg-phoenix-500/60',
                state === 'current' && 'h-1.5 bg-phoenix-500 shadow-phoenix-glow-soft',
                state === 'upcoming' && 'bg-midnight-700 group-hover:bg-midnight-600',
              )}
            />
            <span className="flex items-center gap-2">
              <span
                className={clsx(
                  'inline-flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-semibold transition-colors',
                  state === 'past' && 'bg-phoenix-500/20 text-phoenix-300',
                  state === 'current' && 'bg-phoenix-500 text-white',
                  state === 'upcoming' && 'bg-midnight-800 text-midnight-400 ring-1 ring-inset ring-midnight-700',
                )}
              >
                {i + 1}
              </span>
              <span
                className={clsx(
                  'truncate text-xs font-medium uppercase tracking-wider',
                  state === 'current' ? 'text-white' : 'text-midnight-400 group-hover:text-midnight-200',
                )}
              >
                {stage.label}
              </span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
