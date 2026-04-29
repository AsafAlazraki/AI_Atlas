import { useEffect, useState } from 'react';
import { PlayIcon } from '@heroicons/react/24/solid';
import { resolveVideoUrl } from '../../lib/storage';

type Props = {
  /** Heading shown above the video. */
  heading: string;
  /** Optional intro / context line. */
  description?: string;
  /**
   * Path inside Firebase Storage, e.g. `capabilities/atlassian-rovo/videos/intro.mp4`.
   * Leave undefined to render the placeholder.
   */
  storagePath?: string;
  /** Optional Storage path to a poster image (jpg/png). */
  posterPath?: string;
  /** Optional duration label, e.g. "2:14". */
  durationLabel?: string;
};

/**
 * Demo-video slideshow stage. Resolves the Firebase Storage download URL
 * lazily on mount. While loading, shows a skeleton. If `storagePath`
 * is omitted entirely, renders the "video coming soon" placeholder.
 *
 * Sized to fit one viewport — header on top, video fills remaining space.
 */
export default function VideoStage({
  heading,
  description,
  storagePath,
  posterPath,
  durationLabel,
}: Props) {
  const [src, setSrc] = useState<string | null>(null);
  const [poster, setPoster] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    if (!storagePath) return;
    resolveVideoUrl(storagePath)
      .then((url) => {
        if (!cancelled) setSrc(url);
      })
      .catch((err: unknown) => {
        if (!cancelled) setError(err instanceof Error ? err.message : 'Failed to load video');
      });
    return () => {
      cancelled = true;
    };
  }, [storagePath]);

  useEffect(() => {
    let cancelled = false;
    if (!posterPath) return;
    resolveVideoUrl(posterPath)
      .then((url) => {
        if (!cancelled) setPoster(url);
      })
      .catch(() => {
        // Poster is optional — silently ignore failures.
      });
    return () => {
      cancelled = true;
    };
  }, [posterPath]);

  return (
    <section className="card-glow flex h-full flex-col overflow-hidden p-6 sm:p-8 lg:p-10">
      <header className="gsap-stage-fade flex flex-shrink-0 flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-phoenix-400">
            Demo video
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            {heading}
          </h2>
          {description && (
            <p className="mt-2 max-w-3xl text-sm text-midnight-300 sm:text-base">{description}</p>
          )}
        </div>
        {durationLabel && (
          <span className="inline-flex items-center rounded-full bg-midnight-800/80 px-3 py-1 text-xs font-medium text-midnight-200 ring-1 ring-inset ring-midnight-700">
            {durationLabel}
          </span>
        )}
      </header>

      <div className="gsap-stage-fade mt-6 flex flex-1 items-center overflow-hidden">
        <div className="w-full">
          {storagePath && src && (
            <div className="overflow-hidden rounded-2xl bg-black shadow-2xl ring-1 ring-midnight-700/60">
              <video
                key={src}
                controls
                className="aspect-video w-full"
                poster={poster ?? undefined}
              >
                <source src={src} type="video/mp4" />
                Your browser does not support HTML5 video.
              </video>
            </div>
          )}
          {storagePath && !src && !error && <VideoSkeleton />}
          {storagePath && error && <VideoError message={error} />}
          {!storagePath && <VideoPlaceholder />}
        </div>
      </div>
    </section>
  );
}

function VideoSkeleton() {
  return (
    <div className="flex aspect-video w-full animate-pulse items-center justify-center rounded-2xl bg-midnight-900/60 ring-1 ring-midnight-700/60">
      <PlayIcon className="h-12 w-12 text-midnight-700" />
    </div>
  );
}

function VideoError({ message }: { message: string }) {
  return (
    <div className="flex aspect-video w-full flex-col items-center justify-center gap-2 rounded-2xl bg-midnight-900/60 ring-1 ring-phoenix-500/30">
      <span className="text-sm font-semibold text-phoenix-400">Couldn't load video</span>
      <span className="max-w-md text-center text-xs text-midnight-400">{message}</span>
    </div>
  );
}

function VideoPlaceholder() {
  return (
    <div className="flex aspect-video w-full flex-col items-center justify-center gap-3 rounded-2xl bg-gradient-to-br from-midnight-900/80 to-midnight-800/60 ring-1 ring-midnight-700/60">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-phoenix-500/15 ring-1 ring-inset ring-phoenix-500/30">
        <PlayIcon className="h-6 w-6 text-phoenix-400" />
      </div>
      <p className="text-sm font-semibold text-white">Demo video coming soon</p>
      <p className="max-w-sm text-center text-xs text-midnight-400">
        Videos render here once they're uploaded to Firebase Storage.
      </p>
    </div>
  );
}
