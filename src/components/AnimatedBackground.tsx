import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

/**
 * Global animated background. Flowing dotted wireframe curves like phoenix-dx.com.
 * Sits fixed behind all content (z-index: -10), pointer-events: none.
 *
 * Two SVG paths animate independently: their stroke-dashoffset cycles to
 * create a "flowing" effect, and they translate slowly to add motion.
 *
 * Respects prefers-reduced-motion (all tweens skip when set).
 */
export default function AnimatedBackground() {
  const ref = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduced) return;

      // Flow effect: dash offset moves continuously
      gsap.to('.bg-flow-azure', {
        attr: { 'stroke-dashoffset': -300 },
        duration: 10,
        ease: 'none',
        repeat: -1,
      });
      gsap.to('.bg-flow-phoenix', {
        attr: { 'stroke-dashoffset': 300 },
        duration: 14,
        ease: 'none',
        repeat: -1,
      });
      gsap.to('.bg-flow-azure-2', {
        attr: { 'stroke-dashoffset': -250 },
        duration: 18,
        ease: 'none',
        repeat: -1,
      });

      // Subtle drift on the whole layer
      gsap.to('.bg-layer', {
        x: 30,
        y: -20,
        duration: 14,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      });
    },
    { scope: ref, dependencies: [] },
  );

  return (
    <svg
      ref={ref}
      className="pointer-events-none fixed inset-0 -z-10 h-full w-full"
      viewBox="0 0 1920 1080"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="bg-grad-azure" x1="0%" x2="100%" y1="0%" y2="0%">
          <stop offset="0%" stopColor="#9CC8E8" stopOpacity="0" />
          <stop offset="50%" stopColor="#9CC8E8" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#9CC8E8" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="bg-grad-phoenix" x1="0%" x2="100%" y1="0%" y2="0%">
          <stop offset="0%" stopColor="#E11D2B" stopOpacity="0" />
          <stop offset="50%" stopColor="#E11D2B" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#E11D2B" stopOpacity="0" />
        </linearGradient>
      </defs>

      <g className="bg-layer">
        <path
          className="bg-flow-azure"
          d="M -200 760 Q 350 540 800 700 T 1500 580 T 2200 640"
          fill="none"
          stroke="url(#bg-grad-azure)"
          strokeWidth="1.5"
          strokeDasharray="2 8"
          strokeLinecap="round"
        />
        <path
          className="bg-flow-azure-2"
          d="M -200 880 Q 500 700 950 800 T 1700 720 T 2200 780"
          fill="none"
          stroke="url(#bg-grad-azure)"
          strokeWidth="1"
          strokeDasharray="1 6"
          strokeOpacity="0.6"
          strokeLinecap="round"
        />
        <path
          className="bg-flow-phoenix"
          d="M -200 200 Q 500 380 1050 280 T 1900 320 T 2200 280"
          fill="none"
          stroke="url(#bg-grad-phoenix)"
          strokeWidth="1.5"
          strokeDasharray="2 8"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}
