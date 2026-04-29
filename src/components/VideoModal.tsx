import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { PlayIcon } from '@heroicons/react/24/solid';
import { resolveVideoUrl } from '../lib/storage';

export type ModalVideo = {
  id: string;
  title: string;
  description?: string;
  /** Firebase Storage path. Omit to render the placeholder. */
  storagePath?: string;
  posterPath?: string;
  durationLabel?: string;
};

type Props = {
  video: ModalVideo;
  onClose: () => void;
};

/**
 * Lightbox-style video modal. Opens via a portal, respects ESC,
 * locks body scroll, click-outside closes. Resolves the Firebase
 * Storage URL lazily; if no storagePath, shows the placeholder
 * inside the modal so the click still feels responsive.
 */
export default function VideoModal({ video, onClose }: Props) {
  const [src, setSrc] = useState<string | null>(null);
  const [poster, setPoster] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    if (!video.storagePath) return;
    resolveVideoUrl(video.storagePath)
      .then((url) => {
        if (!cancelled) setSrc(url);
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to load video');
        }
      });
    return () => {
      cancelled = true;
    };
  }, [video.storagePath]);

  useEffect(() => {
    let cancelled = false;
    if (!video.posterPath) return;
    resolveVideoUrl(video.posterPath)
      .then((url) => {
        if (!cancelled) setPoster(url);
      })
      .catch(() => {
        // Poster is optional — silent fail.
      });
    return () => {
      cancelled = true;
    };
  }, [video.posterPath]);

  // ESC closes.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  // Lock body scroll while open.
  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = original;
    };
  }, []);

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-midnight-950/85 p-4 backdrop-blur-md sm:p-8"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={video.title}
    >
      <div
        className="relative w-full max-w-5xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close video"
          className="absolute -top-12 right-0 flex h-10 w-10 items-center justify-center rounded-full bg-midnight-800 text-white ring-1 ring-midnight-700 transition-colors hover:bg-midnight-700"
        >
          <XMarkIcon className="h-5 w-5" />
        </button>

        <header className="mb-4">
          <h3 className="text-lg font-semibold text-white sm:text-xl">{video.title}</h3>
          {video.description && (
            <p className="mt-1 text-sm text-midnight-300">{video.description}</p>
          )}
        </header>

        <div className="overflow-hidden rounded-2xl bg-black shadow-2xl ring-1 ring-midnight-700/60">
          {src && (
            <video
              key={src}
              controls
              className="aspect-video w-full"
              poster={poster ?? undefined}
            >
              <source src={src} type="video/mp4" />
              Your browser does not support HTML5 video.
            </video>
          )}
          {video.storagePath && !src && !error && <ModalSkeleton />}
          {video.storagePath && error && <ModalError message={error} />}
          {!video.storagePath && <ModalPlaceholder />}
        </div>
      </div>
    </div>,
    document.body,
  );
}

function ModalSkeleton() {
  return (
    <div className="flex aspect-video w-full animate-pulse items-center justify-center">
      <PlayIcon className="h-14 w-14 text-midnight-700" />
    </div>
  );
}

function ModalError({ message }: { message: string }) {
  return (
    <div className="flex aspect-video w-full flex-col items-center justify-center gap-2 ring-1 ring-phoenix-500/30">
      <span className="text-sm font-semibold text-phoenix-400">Couldn't load video</span>
      <span className="max-w-md text-center text-xs text-midnight-400">{message}</span>
    </div>
  );
}

function ModalPlaceholder() {
  return (
    <div className="flex aspect-video w-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-midnight-900 to-midnight-800">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-phoenix-500/15 ring-1 ring-inset ring-phoenix-500/30">
        <PlayIcon className="h-6 w-6 text-phoenix-400" />
      </div>
      <p className="text-sm font-semibold text-white">Coming soon</p>
      <p className="max-w-sm text-center text-xs text-midnight-400">
        This video will play here once it's uploaded to Firebase Storage.
      </p>
    </div>
  );
}
