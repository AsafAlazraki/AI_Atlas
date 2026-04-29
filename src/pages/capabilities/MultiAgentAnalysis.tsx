import {
  CodeBracketSquareIcon,
  ShieldCheckIcon,
  ChatBubbleLeftRightIcon,
  ChartBarIcon,
} from '@heroicons/react/24/outline';
import Slideshow from '../../components/Slideshow';
import ContentStage, {
  FeatureGrid,
  FeatureCard,
} from '../../components/slideshow/ContentStage';
import VideoStage from '../../components/slideshow/VideoStage';
import FAQStage, { type FAQItem } from '../../components/slideshow/FAQStage';
import type { CapabilityHeroData, SlideshowStage } from '../../types/slideshow';

const hero: CapabilityHeroData = {
  kicker: 'AI Capabilities · PhoenixDX',
  title: 'Multi Agent',
  titleAccent: 'Analysis',
  tagline:
    'A team of specialised AI agents that analyse a codebase, requirement set, or architecture together — each agent owning a domain (security, performance, accessibility, business logic) and converging on a single, evidence-backed report.',
};

const faqs: FAQItem[] = [
  {
    id: 'why-multi',
    question: 'Why multiple agents instead of one big model?',
    answer:
      "Specialised agents outperform a single generalist on focused domains and can run in parallel. Each agent contributes its own findings; an orchestrator merges, deduplicates, and prioritises before a human reviews.",
  },
  {
    id: 'agents',
    question: 'What agents are included?',
    answer:
      'A typical configuration: Architecture, Security, Performance, Accessibility, Test Coverage, and Business Logic. Custom agents can be added for domain-specific concerns (e.g. compliance, data privacy).',
  },
  {
    id: 'output',
    question: 'What does the output look like?',
    answer:
      'A consolidated report grouped by severity and domain, with each finding linked to the agent that raised it, the supporting evidence (file + line), and a suggested remediation.',
  },
  {
    id: 'integration',
    question: 'How does this fit our workflow?',
    answer:
      "It's typically wired into PR review (run on every PR over a size threshold), discovery sprints (run against a candidate codebase), or quarterly architecture reviews.",
  },
];

function Overview() {
  return (
    <ContentStage
      eyebrow="What it is"
      heading="A specialist team, on demand"
      subtitle="Instead of one model trying to do everything, Multi Agent Analysis runs a coordinated team of focused agents and merges their findings."
    >
      <div className="grid gap-5 md:grid-cols-3">
        <Pillar
          number="01"
          heading="Specialise"
          body="Each agent owns one domain and uses tools tuned for it — static analysis, dependency graphs, profilers, accessibility scanners."
        />
        <Pillar
          number="02"
          heading="Run in parallel"
          body="Agents work simultaneously over the same artefact, drastically reducing wall-clock time vs. a single sequential agent."
        />
        <Pillar
          number="03"
          heading="Reconcile"
          body="An orchestrator merges agent findings, drops duplicates, prioritises by impact, and links every claim to evidence."
        />
      </div>
    </ContentStage>
  );
}

function Pillar({ number, heading, body }: { number: string; heading: string; body: string }) {
  return (
    <div className="rounded-2xl border border-midnight-700/60 bg-midnight-900/40 p-5">
      <div className="text-xs font-semibold tracking-widest text-phoenix-400">{number}</div>
      <h3 className="mt-1 text-base font-semibold text-white">{heading}</h3>
      <p className="mt-2 text-sm text-midnight-300">{body}</p>
    </div>
  );
}

function Agents() {
  return (
    <ContentStage
      eyebrow="The agents"
      heading="Specialists, each with their own toolkit"
      subtitle="Standard agents shipped with every engagement. Custom agents can be added."
    >
      <FeatureGrid>
        <FeatureCard
          icon={CodeBracketSquareIcon}
          heading="Architecture agent"
          body="Module boundaries, coupling, ownership drift. Flags layering violations and god-objects with file/line evidence."
        />
        <FeatureCard
          icon={ShieldCheckIcon}
          heading="Security agent"
          body="OWASP categories, dependency CVEs, secrets exposure, IaC misconfig. Cross-references findings against your threat model."
        />
        <FeatureCard
          icon={ChartBarIcon}
          heading="Performance agent"
          body="Hot paths, N+1 queries, blocking I/O, bundle bloat. Suggests targeted fixes ranked by likely impact."
        />
        <FeatureCard
          icon={ChatBubbleLeftRightIcon}
          heading="Business logic agent"
          body="Reads requirement docs alongside code to flag implementation drift from the intended behaviour."
        />
      </FeatureGrid>
    </ContentStage>
  );
}

function HowItWorks() {
  const steps = [
    { n: '1', label: 'Ingest', body: 'Repository, requirement docs, and architecture diagrams are loaded into a shared workspace.' },
    { n: '2', label: 'Plan', body: 'The orchestrator scopes each agent\'s focus area based on what was provided.' },
    { n: '3', label: 'Run', body: 'Agents execute in parallel, calling specialised tools and producing structured findings.' },
    { n: '4', label: 'Reconcile', body: 'Findings are merged, deduplicated, and ranked. Conflicts between agents are surfaced.' },
    { n: '5', label: 'Report', body: 'A unified, evidence-backed report is generated for human review.' },
  ];
  return (
    <ContentStage
      eyebrow="How it works"
      heading="From repo to report in five stages"
      subtitle="Designed to plug into existing review workflows without slowing them down."
    >
      <ol className="space-y-3">
        {steps.map((s) => (
          <li
            key={s.n}
            className="flex items-start gap-4 rounded-2xl border border-midnight-700/60 bg-midnight-900/40 p-4"
          >
            <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-phoenix-500/15 text-sm font-bold text-phoenix-400 ring-1 ring-inset ring-phoenix-500/30">
              {s.n}
            </div>
            <div>
              <div className="text-sm font-semibold text-white">{s.label}</div>
              <div className="mt-0.5 text-sm text-midnight-300">{s.body}</div>
            </div>
          </li>
        ))}
      </ol>
    </ContentStage>
  );
}

const stages: SlideshowStage[] = [
  { id: 'overview', label: 'Overview', content: <Overview /> },
  { id: 'agents', label: 'The agents', content: <Agents /> },
  { id: 'how', label: 'How it works', content: <HowItWorks /> },
  {
    id: 'demo',
    label: 'Demo video',
    content: (
      <VideoStage
        heading="Multi-agent analysis on a real codebase"
        description="Watch the agents tear through a legacy repository in parallel and reconcile findings into a single report."
        storagePath={undefined /* path.capabilityVideo('multi-agent-analysis', 'walkthrough.mp4') */}
      />
    ),
  },
  {
    id: 'faq',
    label: 'FAQ',
    content: <FAQStage faqs={faqs} />,
  },
];

export default function MultiAgentAnalysis() {
  return <Slideshow hero={hero} stages={stages} />;
}
