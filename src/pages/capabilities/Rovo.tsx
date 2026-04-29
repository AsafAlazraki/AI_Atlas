import {
  MagnifyingGlassIcon,
  CpuChipIcon,
  BoltIcon,
  Squares2X2Icon,
  ArrowRightIcon,
} from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import Slideshow from '../../components/Slideshow';
import ContentStage, {
  FeatureGrid,
  FeatureCard,
} from '../../components/slideshow/ContentStage';
import VideoStage from '../../components/slideshow/VideoStage';
import FAQStage, { type FAQItem } from '../../components/slideshow/FAQStage';
import type { CapabilityHeroData, SlideshowStage } from '../../types/slideshow';

const hero: CapabilityHeroData = {
  kicker: 'AI Capabilities · Atlassian',
  title: 'Rovo —',
  titleAccent: 'AI grounded in your knowledge',
  tagline:
    "Rovo connects to the tools your teams already use — Jira, Confluence, GitHub, Slack and beyond — to find, learn, and act on the work happening across your organisation. PhoenixDX deploys Rovo as a productivity multiplier across every stage of the SDLC.",
};

const sdlcStages = [
  { stage: 'Discovery', use: 'Surface prior decisions and similar work across Confluence and Jira.' },
  { stage: 'Design', use: 'Generate ADRs and architecture summaries from threads and docs.' },
  { stage: 'Build', use: 'Draft PR descriptions, summarise diffs, and answer questions about a repo.' },
  { stage: 'Test', use: 'Triage incoming bugs, suggest reproduction steps, and link related tickets.' },
  { stage: 'Deploy', use: 'Auto-compose release notes from merged PRs and Jira tickets.' },
  { stage: 'Operate', use: 'Triage incidents and recall the last time something similar happened.' },
];

const faqs: FAQItem[] = [
  {
    id: 'sources',
    question: 'What does Rovo connect to?',
    answer:
      'Out of the box: Atlassian (Jira, Confluence, Bitbucket), GitHub, Slack, Microsoft (Teams, SharePoint, OneDrive), Google Workspace (Drive, Gmail), Figma, Notion, and more. Custom connectors can be built for internal systems.',
  },
  {
    id: 'permissions',
    question: 'How does Rovo handle permissions?',
    answer:
      'Rovo respects every source system\'s ACLs. Users only see answers and references they already have permission to read in the underlying tool — there is no permission elevation. PhoenixDX hardens this further during deployment.',
  },
  {
    id: 'agents',
    question: 'How are Rovo Agents different from chat?',
    answer:
      'Agents are skill-based teammates that take initiative on a defined job — drafting tickets, summarising standups, reviewing PRs, generating release notes. Chat is reactive; agents are proactive and run on triggers or schedules.',
  },
  {
    id: 'data',
    question: 'Is our data used to train models?',
    answer:
      'No. Atlassian\'s Rovo runs on enterprise-grade LLMs and does not use customer data to train shared models. PhoenixDX validates this for each engagement against your compliance posture.',
  },
  {
    id: 'rollout',
    question: 'How does PhoenixDX help with adoption?',
    answer:
      'A typical engagement: discovery workshop → connector + permission setup → pilot with one team → measurable rollout plan. Most customers see strong ROI within the first 6 weeks.',
  },
];

function Overview() {
  return (
    <ContentStage
      eyebrow="What is Rovo"
      heading="An AI assistant that knows your business"
      subtitle="Rovo combines enterprise search, AI agents, and workflow automation — grounded in your team's actual work, not the public internet."
    >
      <div className="grid gap-5 md:grid-cols-3">
        <Stat label="Connectors" value="50+" hint="Atlassian, GitHub, Slack, Microsoft, Google" />
        <Stat label="Permission-aware" value="100%" hint="Source-system ACLs honoured for every result" />
        <Stat label="Time saved" value="6+ hrs" hint="Per developer per week (typical PhoenixDX rollout)" />
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <a
          href="https://www.atlassian.com/software/rovo"
          target="_blank"
          rel="noreferrer noopener"
          className="btn-primary"
        >
          Atlassian Rovo product page
          <ArrowRightIcon className="h-4 w-4" />
        </a>
        <Link to="/capabilities" className="btn-ghost">
          Back to capabilities
        </Link>
      </div>
    </ContentStage>
  );
}

function Stat({ label, value, hint }: { label: string; value: string; hint: string }) {
  return (
    <div className="rounded-2xl border border-midnight-700/60 bg-midnight-900/40 p-5">
      <div className="text-xs font-semibold uppercase tracking-wider text-midnight-400">
        {label}
      </div>
      <div className="mt-1 text-3xl font-semibold tracking-tight text-white">{value}</div>
      <div className="mt-1 text-xs text-midnight-300">{hint}</div>
    </div>
  );
}

function HowItWorks() {
  return (
    <ContentStage
      eyebrow="Capabilities"
      heading="What Rovo does"
      subtitle="Four modes, one connected experience."
    >
      <FeatureGrid>
        <FeatureCard
          icon={MagnifyingGlassIcon}
          heading="Enterprise search"
          body="Find anything across the tools your teams already use — with answers grounded in your team's actual work."
        />
        <FeatureCard
          icon={CpuChipIcon}
          heading="Rovo Agents"
          body="Skill-based AI teammates that take initiative — drafting tickets, summarising standups, reviewing PRs, generating release notes."
        />
        <FeatureCard
          icon={BoltIcon}
          heading="Workflow automation"
          body="Trigger agents on Jira transitions, schedule recurring summaries, and chain tools together with natural-language prompts."
        />
        <FeatureCard
          icon={Squares2X2Icon}
          heading="Built on your knowledge"
          body="Permission-aware retrieval, fine-grained sources, and audit trails — every answer is traceable and safe to act on."
        />
      </FeatureGrid>
    </ContentStage>
  );
}

function AcrossTheSDLC() {
  return (
    <ContentStage
      eyebrow="Use cases"
      heading="Rovo across the SDLC"
      subtitle="One assistant, six stages of value. PhoenixDX maps Rovo to your team's existing rituals."
    >
      <div className="overflow-hidden rounded-2xl border border-midnight-700/60">
        {sdlcStages.map((s, i) => (
          <div
            key={s.stage}
            className={`flex flex-col gap-1 p-5 transition-colors hover:bg-midnight-800/30 sm:flex-row sm:items-center sm:gap-6 ${
              i > 0 ? 'border-t border-midnight-800/80' : ''
            }`}
          >
            <div className="w-32 flex-shrink-0 text-sm font-semibold uppercase tracking-wider text-phoenix-400">
              {s.stage}
            </div>
            <div className="text-sm text-midnight-200 sm:text-base">{s.use}</div>
          </div>
        ))}
      </div>
    </ContentStage>
  );
}

const stages: SlideshowStage[] = [
  { id: 'overview', label: 'Overview', content: <Overview /> },
  { id: 'features', label: 'How it works', content: <HowItWorks /> },
  { id: 'sdlc', label: 'Across the SDLC', content: <AcrossTheSDLC /> },
  {
    id: 'demo',
    label: 'Demo video',
    content: (
      <VideoStage
        heading="Rovo in 2 minutes"
        description="A quick walkthrough of Rovo answering questions across Jira, Confluence, and GitHub."
        // When a video is uploaded, set storagePath here:
        storagePath={undefined /* path.capabilityVideo('rovo', 'intro.mp4') */}
        durationLabel="2:14"
      />
    ),
  },
  {
    id: 'faq',
    label: 'FAQ',
    content: <FAQStage faqs={faqs} />,
  },
];

export default function Rovo() {
  return <Slideshow hero={hero} stages={stages} />;
}
