import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { capabilityLeaves, type NavLeaf } from '../lib/nav';
import { useEntrance } from '../lib/useEntrance';

type ComingSoon = {
  title: string;
  description: string;
};

const comingSoon: ComingSoon[] = [
  {
    title: 'Requirements Copilot',
    description:
      'Turn discovery conversations into structured user stories, acceptance criteria, and test scenarios, grounded in your domain context.',
  },
  {
    title: 'Legacy Modernisation',
    description:
      'Assisted migration of legacy codebases. Modernise frameworks, languages, and architectures incrementally without freezing the team.',
  },
  {
    title: 'Incident Response Copilot',
    description:
      'Triage incoming alerts, recall similar past incidents, and suggest remediations from runbooks and telemetry.',
  },
  {
    title: 'Observability Insights',
    description:
      'Surface anomalies, root causes, and remediation suggestions from production telemetry, in plain English.',
  },
];

export default function Capabilities() {
  const scope = useRef<HTMLDivElement>(null);
  useEntrance(scope);

  return (
    <div ref={scope} className="space-y-10">
      <header className="relative">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-12 -top-16 h-64 w-64 rounded-full bg-phoenix-500/10 blur-3xl"
        />
        <p className="gsap-fade text-xs font-semibold uppercase tracking-[0.18em] text-phoenix-400">
          Catalog
        </p>
        <h1 className="gsap-fade mt-2 text-display-sm sm:text-display-md">
          AI <span className="accent-phrase">Capabilities</span>
        </h1>
        <p className="gsap-fade mt-4 max-w-2xl text-midnight-300">
          The AI capabilities PhoenixDX has productionised across the SDLC.
          Pick one to see how it works in context. More being added every week.
        </p>
      </header>

      <section>
        <SectionLabel>Available now</SectionLabel>
        <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {capabilityLeaves.map((leaf) => (
            <CapabilityCard key={leaf.to} leaf={leaf} />
          ))}
        </div>
      </section>

      <section>
        <SectionLabel>On the roadmap</SectionLabel>
        <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {comingSoon.map((c) => (
            <ComingSoonCard key={c.title} title={c.title} description={c.description} />
          ))}
        </div>
      </section>
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="gsap-fade flex items-center gap-3">
      <h2 className="text-sm font-semibold uppercase tracking-wider text-midnight-300">
        {children}
      </h2>
      <span className="hairline flex-1" />
    </div>
  );
}

function CapabilityCard({ leaf }: { leaf: NavLeaf }) {
  return (
    <Link
      to={leaf.to}
      className="card-glow gsap-fade group relative flex h-full flex-col overflow-hidden p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-phoenix-500/40 hover:shadow-lift"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-phoenix-500/15 text-phoenix-400 ring-1 ring-inset ring-phoenix-500/30 transition-all duration-300 group-hover:bg-phoenix-500/25 group-hover:text-phoenix-300">
        <leaf.icon className="h-7 w-7" aria-hidden="true" />
      </div>
      <h3 className="mt-5 text-xl font-semibold tracking-tight text-white">{leaf.label}</h3>
      <p className="mt-2 flex-1 text-sm text-midnight-300">{leaf.description}</p>
      <div className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-phoenix-400 transition-transform duration-300 group-hover:gap-2.5">
        Open
        <ArrowRightIcon className="h-4 w-4" />
      </div>
    </Link>
  );
}

function ComingSoonCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="card gsap-fade group relative flex h-full flex-col overflow-hidden p-6 transition-colors hover:border-midnight-600">
      <div className="flex items-center gap-2">
        <span className="inline-flex items-center rounded-full bg-azure-300/10 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-azure-300 ring-1 ring-inset ring-azure-300/30">
          Roadmap
        </span>
      </div>
      <h3 className="mt-4 text-lg font-semibold text-white">{title}</h3>
      <p className="mt-2 flex-1 text-sm text-midnight-300">{description}</p>
    </div>
  );
}
