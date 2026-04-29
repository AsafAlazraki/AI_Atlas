import { useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRightIcon,
  SparklesIcon,
  RocketLaunchIcon,
  ServerStackIcon,
} from '@heroicons/react/24/outline';
import { useEntrance } from '../lib/useEntrance';

export default function Dashboard() {
  const scope = useRef<HTMLDivElement>(null);
  useEntrance(scope);

  return (
    <div ref={scope} className="space-y-10">
      <Hero />

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard
          label="AI capabilities"
          value="1"
          hint="Rovo"
          icon={SparklesIcon}
          tone="phoenix"
        />
        <StatCard
          label="Live demos"
          value="—"
          hint="coming soon"
          icon={RocketLaunchIcon}
          tone="azure"
        />
        <StatCard
          label="Environments"
          value="3"
          hint="dev · test · prod"
          icon={ServerStackIcon}
          tone="phoenix"
        />
      </section>

      <section className="card-glow gsap-fade overflow-hidden p-8 sm:p-10">
        <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              The AI Atlas, built on the PhoenixDX stack
            </h2>
            <p className="mt-2 max-w-2xl text-midnight-300">
              Discovery, design, code, test, deploy, observe — every stage of the
              SDLC has an AI capability we&apos;ve productionised. This Atlas is
              the showcase.
            </p>
          </div>
          <Link to="/capabilities" className="btn-primary whitespace-nowrap">
            Explore capabilities
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Decorative glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-phoenix-500/15 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-10 h-64 w-64 rounded-full bg-azure-300/10 blur-3xl"
      />

      <p className="gsap-fade text-xs font-semibold uppercase tracking-[0.18em] text-phoenix-400">
        PhoenixDX · AI Atlas
      </p>
      <h1 className="gsap-fade mt-3 max-w-4xl text-display-md sm:text-display-lg">
        AI-powered <span className="accent-phrase">software development</span>
      </h1>
      <p className="gsap-fade mt-5 max-w-2xl text-lg text-midnight-300">
        A demo landscape showcasing PhoenixDX&apos;s AI capabilities across the
        software development lifecycle — from discovery and design through
        delivery and operations.
      </p>
      <div className="gsap-fade mt-7 flex flex-wrap items-center gap-3">
        <Link to="/capabilities" className="btn-primary">
          Browse AI capabilities
          <ArrowRightIcon className="h-4 w-4" />
        </Link>
        <Link to="/capabilities/rovo" className="btn-ghost">
          See Rovo in action
        </Link>
      </div>
    </section>
  );
}

function StatCard({
  label,
  value,
  hint,
  icon: Icon,
  tone,
}: {
  label: string;
  value: string;
  hint: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  tone: 'phoenix' | 'azure';
}) {
  const tint =
    tone === 'phoenix'
      ? 'bg-phoenix-500/10 text-phoenix-400 ring-phoenix-500/20'
      : 'bg-azure-300/10 text-azure-300 ring-azure-300/20';
  return (
    <div className="card gsap-fade flex items-center gap-4 p-5">
      <div
        className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl ring-1 ring-inset ${tint}`}
      >
        <Icon className="h-6 w-6" aria-hidden="true" />
      </div>
      <div className="min-w-0">
        <div className="text-[11px] font-semibold uppercase tracking-wider text-midnight-400">
          {label}
        </div>
        <div className="mt-0.5 flex items-baseline gap-2">
          <div className="text-2xl font-semibold text-white">{value}</div>
          <div className="truncate text-xs text-midnight-400">{hint}</div>
        </div>
      </div>
    </div>
  );
}
