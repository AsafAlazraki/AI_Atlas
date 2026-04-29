import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import type { RefObject } from 'react';

/**
 * Stagger fade-up entrance for any element with a `.gsap-fade` class
 * inside the given scope. Use a unique scope per page so re-entering
 * a route replays the animation.
 */
export function useEntrance(scope: RefObject<HTMLElement | null>) {
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
    { scope, dependencies: [] },
  );
}
