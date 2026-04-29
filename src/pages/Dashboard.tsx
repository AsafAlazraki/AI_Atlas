import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import CyclingText from '../components/CyclingText';
import PhoenixVisual from '../components/PhoenixVisual';

const cyclingPhrases = [
  'software development',
  'digital innovation',
  'knowledge workflows',
  'the SDLC',
  'enterprise teams',
];

export default function Dashboard() {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduced) return;

      gsap.from('.gsap-fade', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.08,
        clearProps: 'transform,opacity',
      });
      gsap.from('.gsap-visual', {
        opacity: 0,
        scale: 0.92,
        duration: 1.1,
        ease: 'power3.out',
        delay: 0.25,
        clearProps: 'transform,opacity',
      });
    },
    { scope, dependencies: [] },
  );

  return (
    <div
      ref={scope}
      className="flex min-h-[calc(100vh-8rem)] items-center"
    >
      <div className="grid w-full grid-cols-1 items-center gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
        {/* Left: Hero */}
        <section className="relative">
          <p className="gsap-fade text-xs font-semibold uppercase tracking-[0.18em] text-phoenix-400">
            PhoenixDX · AI Atlas
          </p>
          <h1 className="gsap-fade mt-3 text-display-md text-white">
            AI-powered
            <br />
            <CyclingText
              words={cyclingPhrases}
              className="accent-phrase whitespace-nowrap"
            />
          </h1>
          <p className="gsap-fade mt-5 max-w-xl text-base text-midnight-300 sm:text-lg">
            A demo landscape showcasing PhoenixDX&apos;s AI capabilities across
            the software development lifecycle — discovery, design, build, test,
            deploy, operate.
          </p>
          <div className="gsap-fade mt-8 flex flex-wrap items-center gap-3">
            <Link to="/capabilities" className="btn-primary">
              Browse AI capabilities
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </div>
        </section>

        {/* Right: Animated phoenix visual */}
        <div className="gsap-visual">
          <PhoenixVisual />
        </div>
      </div>
    </div>
  );
}
