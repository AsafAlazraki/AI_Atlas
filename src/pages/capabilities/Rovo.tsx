import { useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRightIcon,
  MagnifyingGlassIcon,
  CpuChipIcon,
  BoltIcon,
  Squares2X2Icon,
} from '@heroicons/react/24/outline';
import { useEntrance } from '../../lib/useEntrance';

const features = [
  {
    icon: MagnifyingGlassIcon,
    title: 'Enterprise search',
    body:
      "Find anything across Jira, Confluence, GitHub, Slack, Drive, SharePoint and your own tools — with answers grounded in your team's actual work.",
  },
  {
    icon: CpuChipIcon,
    title: 'Rovo Agents',
    body:
      'Skill-based AI teammates that take initiative — drafting tickets, summarising standups, reviewing PRs, generating release notes.',
  },
  {
    icon: BoltIcon,
    title: 'Workflow automation',
    body:
      'Trigger agents on Jira transitions, schedule recurring summaries, and chain tools together with natural-language prompts.',
  },
  {
    icon: Squares2X2Icon,
    title: 'Built on your knowledge',
    body:
      'Permission-aware retrieval, fine-grained sources, and audit trails — so every answer is traceable and safe to act on.',
  },
];

export default function Rovo() {
  const scope = useRef<HTMLDivElement>(null);
  useEntrance(scope);

  return (
    <div ref={scope} className="space-y-12">
      <Hero />
      <FeatureGrid />
      <SDLC />
      <CTA />
    </div>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 -top-24 h-72 w-72 rounded-full bg-phoenix-500/15 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-20 h-64 w-64 rounded-full bg-azure-300/10 blur-3xl"
      />

      <p className="gsap-fade text-xs font-semibold uppercase tracking-[0.18em] text-phoenix-400">
        AI Capabilities · Atlassian
      </p>
      <h1 className="gsap-fade mt-3 text-display-md sm:text-display-lg">
        Rovo
      </h1>
      <p className="gsap-fade mt-3 max-w-3xl text-xl text-midnight-200 sm:text-2xl">
        AI agents and enterprise search,{' '}
        <span className="accent-phrase">grounded in your knowledge</span>.
      </p>
      <p className="gsap-fade mt-5 max-w-2xl text-base text-midnight-300">
        Rovo connects to the tools your teams already use — Jira, Confluence,
        GitHub, Slack, and beyond — to find, learn, and act on the
        work happening across your organisation. PhoenixDX deploys Rovo as a
        productivity multiplier across every stage of the SDLC.
      </p>
      <div className="gsap-fade mt-8 flex flex-wrap items-center gap-3">
        <a
          href="https://www.atlassian.com/software/rovo"
          target="_blank"
          rel="noreferrer noopener"
          className="btn-primary"
        >
          Learn about Rovo
          <ArrowRightIcon className="h-4 w-4" />
        </a>
        <Link to="/capabilities" className="btn-ghost">
          Back to capabilities
        </Link>
      </div>
    </section>
  );
}

function FeatureGrid() {
  return (
    <section>
      <div className="gsap-fade flex items-center gap-3">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-midnight-300">
          What Rovo does
        </h2>
        <span className="hairline flex-1" />
      </div>
      <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2">
        {features.map((f) => (
          <article
            key={f.title}
            className="card-glow gsap-fade group relative overflow-hidden p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-phoenix-500/30 hover:shadow-lift"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-azure-300/10 text-azure-300 ring-1 ring-inset ring-azure-300/30 transition-all duration-300 group-hover:bg-azure-300/20">
              <f.icon className="h-6 w-6" aria-hidden="true" />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-white">{f.title}</h3>
            <p className="mt-2 text-sm text-midnight-300">{f.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function SDLC() {
  const stages = [
    { stage: 'Discovery', use: 'Surface prior decisions and similar work across Confluence and Jira.' },
    { stage: 'Design', use: 'Generate ADRs and architecture summaries from threads and docs.' },
    { stage: 'Build', use: 'Draft PR descriptions, summarise diffs, and answer questions about a repo.' },
    { stage: 'Test', use: 'Triage incoming bugs, suggest reproduction steps, and link related tickets.' },
    { stage: 'Deploy', use: 'Auto-compose release notes from merged PRs and Jira tickets.' },
    { stage: 'Operate', use: 'Triage incidents and recall the last time something similar happened.' },
  ];
  return (
    <section>
      <div className="gsap-fade flex items-center gap-3">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-midnight-300">
          Across the SDLC
        </h2>
        <span className="hairline flex-1" />
      </div>
      <div className="card mt-4 divide-y divide-midnight-800 overflow-hidden">
        {stages.map((s) => (
          <div
            key={s.stage}
            className="gsap-fade flex flex-col gap-1 p-5 transition-colors hover:bg-midnight-800/30 sm:flex-row sm:items-center sm:gap-6"
          >
            <div className="w-32 flex-shrink-0 text-sm font-semibold uppercase tracking-wider text-phoenix-400">
              {s.stage}
            </div>
            <div className="text-sm text-midnight-200">{s.use}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="card-glow gsap-fade relative overflow-hidden p-8 sm:p-10">
      <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            Ready to put Rovo to work?
          </h2>
          <p className="mt-2 max-w-2xl text-midnight-300">
            PhoenixDX runs deployment workshops to get Rovo connected, secured,
            and adopted across your teams in weeks — not quarters.
          </p>
        </div>
        <a
          href="https://phoenix-dx.com"
          target="_blank"
          rel="noreferrer noopener"
          className="btn-primary whitespace-nowrap"
        >
          Talk to PhoenixDX
          <ArrowRightIcon className="h-4 w-4" />
        </a>
      </div>
    </section>
  );
}
