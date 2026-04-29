import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const OUTER_COUNT = 18;
const INNER_COUNT = 12;
const OUTER_RADIUS = 178;
const INNER_RADIUS = 132;

/**
 * Animated phoenix brand visual for the dashboard.
 *
 * Layered:
 *  - Soft halo blurs (CSS)
 *  - Three pulsing/expanding rings
 *  - Two orbital rings of particles, counter-rotating
 *  - Centre PhoenixDX icon (slow breathing scale)
 *
 * Respects prefers-reduced-motion (skips all GSAP tweens, renders static).
 */
export default function PhoenixVisual() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduced) return;

      // Centre breathing
      gsap.to('.pv-core', {
        scale: 1.04,
        duration: 3.4,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      });

      // Counter-rotating orbits
      gsap.to('.pv-orbit-outer', {
        rotation: 360,
        transformOrigin: '200px 200px',
        duration: 75,
        ease: 'none',
        repeat: -1,
      });
      gsap.to('.pv-orbit-inner', {
        rotation: -360,
        transformOrigin: '200px 200px',
        duration: 95,
        ease: 'none',
        repeat: -1,
      });

      // Pulse rings: staggered ripple
      gsap.fromTo(
        '.pv-ring',
        { scale: 0.55, opacity: 0.55, transformOrigin: '200px 200px' },
        {
          scale: 1.35,
          opacity: 0,
          transformOrigin: '200px 200px',
          duration: 3.6,
          ease: 'power2.out',
          repeat: -1,
          stagger: 1.2,
        },
      );

      // Particle twinkle
      gsap.utils.toArray<SVGCircleElement>('.pv-particle').forEach((p, i) => {
        gsap.to(p, {
          scale: gsap.utils.random(0.6, 1.4),
          duration: gsap.utils.random(2, 4),
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
          delay: i * 0.07,
          transformOrigin: 'center',
        });
      });
    },
    { scope: ref, dependencies: [] },
  );

  return (
    <div
      ref={ref}
      className="relative mx-auto aspect-square w-full max-w-[28rem]"
      aria-hidden="true"
    >
      {/* Soft halos */}
      <div className="absolute inset-0 rounded-full bg-phoenix-500/20 blur-[80px]" />
      <div className="absolute inset-12 rounded-full bg-azure-300/10 blur-3xl" />

      <svg
        viewBox="0 0 400 400"
        className="absolute inset-0 h-full w-full overflow-visible"
        aria-hidden="true"
      >
        <defs>
          <radialGradient id="pv-grad-red" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#F26773" stopOpacity="1" />
            <stop offset="60%" stopColor="#F26773" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#F26773" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="pv-grad-blue" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#9CC8E8" stopOpacity="1" />
            <stop offset="60%" stopColor="#9CC8E8" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#9CC8E8" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Pulse rings */}
        <circle className="pv-ring" cx="200" cy="200" r="110" fill="none" stroke="#E11D2B" strokeOpacity="0.5" strokeWidth="1.2" />
        <circle className="pv-ring" cx="200" cy="200" r="110" fill="none" stroke="#E11D2B" strokeOpacity="0.5" strokeWidth="1.2" />
        <circle className="pv-ring" cx="200" cy="200" r="110" fill="none" stroke="#9CC8E8" strokeOpacity="0.4" strokeWidth="1" />

        {/* Decorative orbit guide circles */}
        <circle cx="200" cy="200" r={OUTER_RADIUS} fill="none" stroke="#1E293B" strokeWidth="0.5" strokeDasharray="2 6" />
        <circle cx="200" cy="200" r={INNER_RADIUS} fill="none" stroke="#1E293B" strokeWidth="0.5" strokeDasharray="1 5" />

        {/* Outer orbit: phoenix particles */}
        <g className="pv-orbit-outer">
          {Array.from({ length: OUTER_COUNT }).map((_, i) => {
            const a = (i * 360) / OUTER_COUNT;
            const x = 200 + OUTER_RADIUS * Math.cos((a * Math.PI) / 180);
            const y = 200 + OUTER_RADIUS * Math.sin((a * Math.PI) / 180);
            return (
              <circle
                key={`o-${i}`}
                className="pv-particle"
                cx={x}
                cy={y}
                r={3.5}
                fill="url(#pv-grad-red)"
              />
            );
          })}
        </g>

        {/* Inner orbit: azure particles */}
        <g className="pv-orbit-inner">
          {Array.from({ length: INNER_COUNT }).map((_, i) => {
            const a = (i * 360) / INNER_COUNT;
            const x = 200 + INNER_RADIUS * Math.cos((a * Math.PI) / 180);
            const y = 200 + INNER_RADIUS * Math.sin((a * Math.PI) / 180);
            return (
              <circle
                key={`i-${i}`}
                className="pv-particle"
                cx={x}
                cy={y}
                r={2.6}
                fill="url(#pv-grad-blue)"
              />
            );
          })}
        </g>
      </svg>

      {/* Core PhoenixDX icon */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="pv-core">
          <img
            src="/phoenixdx-icon.jpg"
            alt=""
            draggable={false}
            className="h-32 w-32 select-none rounded-2xl shadow-2xl shadow-phoenix-500/50 ring-1 ring-white/10 sm:h-40 sm:w-40"
          />
        </div>
      </div>
    </div>
  );
}
