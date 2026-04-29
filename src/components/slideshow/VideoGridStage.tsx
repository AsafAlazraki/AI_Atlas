import { useState } from 'react';
import { PlayIcon } from '@heroicons/react/24/solid';
import VideoModal, { type ModalVideo } from '../VideoModal';

export type GridVideo = ModalVideo;

type Props = {
  heading: string;
  description?: string;
  videos: GridVideo[];
};

/**
 * Demo-video grid stage. N video cards arranged in a responsive grid.
 * Click a card to open the lightbox modal with the player.
 *
 * Use this when a capability has multiple demo videos. For a single-
 * video capability, use VideoStage instead.
 */
export default function VideoGridStage({ heading, description, videos }: Props) {
  const [openId, setOpenId] = useState<string | null>(null);
  const openVideo = videos.find((v) => v.id === openId) ?? null;

  return (
    <section className="card-glow flex h-full flex-col overflow-hidden p-6 sm:p-8 lg:p-10">
      <header className="gsap-stage-fade max-w-3xl flex-shrink-0">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-phoenix-400">
          Demo videos
        </p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
          {heading}
        </h2>
        {description && (
          <p className="mt-3 text-sm text-midnight-300 sm:text-base">{description}</p>
        )}
      </header>

      <div className="gsap-stage-fade mt-6 flex-1 overflow-hidden">
        <div className="grid h-full grid-cols-1 gap-4 sm:grid-cols-2">
          {videos.slice(0, 4).map((v) => (
            <VideoCard key={v.id} video={v} onClick={() => setOpenId(v.id)} />
          ))}
        </div>
      </div>

      {openVideo && (
        <VideoModal video={openVideo} onClose={() => setOpenId(null)} />
      )}
    </section>
  );
}

function VideoCard({ video, onClick }: { video: GridVideo; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`Play ${video.title}`}
      className="group relative flex aspect-video w-full overflow-hidden rounded-2xl border border-midnight-700/60 bg-gradient-to-br from-midnight-800 to-midnight-900 text-left transition-all hover:-translate-y-0.5 hover:border-phoenix-500/40 hover:shadow-lift"
    >
      {/* Decorative glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-phoenix-500/10 blur-3xl transition-opacity group-hover:bg-phoenix-500/20"
      />

      {/* Centered play button */}
      <div className="absolute inset-0 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-phoenix-500/15 ring-1 ring-inset ring-phoenix-500/40 transition-all group-hover:bg-phoenix-500/30 group-hover:ring-phoenix-500/60">
          <PlayIcon className="h-6 w-6 translate-x-0.5 text-phoenix-300" aria-hidden="true" />
        </div>
      </div>

      {/* Title overlay */}
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-midnight-950 via-midnight-950/70 to-transparent p-4">
        <h3 className="text-sm font-semibold text-white sm:text-base">{video.title}</h3>
        <div className="mt-1 flex items-center gap-2 text-xs text-midnight-300">
          {video.durationLabel && <span>{video.durationLabel}</span>}
          {!video.storagePath && (
            <>
              {video.durationLabel && <span aria-hidden="true">·</span>}
              <span className="text-azure-300">Coming soon</span>
            </>
          )}
        </div>
      </div>
    </button>
  );
}
