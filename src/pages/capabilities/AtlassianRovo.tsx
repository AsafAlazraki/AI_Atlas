import {
  DocumentTextIcon,
  ClipboardDocumentListIcon,
  BoltIcon,
} from '@heroicons/react/24/outline';
import Slideshow from '../../components/Slideshow';
import HeroStage, {
  HeroStats,
  HeroStat,
} from '../../components/slideshow/HeroStage';
import ContentStage from '../../components/slideshow/ContentStage';
import VideoGridStage, {
  type GridVideo,
} from '../../components/slideshow/VideoGridStage';
import FAQStage, { type FAQItem } from '../../components/slideshow/FAQStage';
import type { SlideshowStage } from '../../types/slideshow';

const sdlcStages = [
  { stage: 'Discovery', use: 'Surface prior decisions and similar work across Confluence and Jira.' },
  { stage: 'Design', use: 'Generate ADRs and architecture summaries from threads and docs.' },
  { stage: 'Build', use: 'Draft PR descriptions, summarise diffs, and answer questions about a repo.' },
  { stage: 'Test', use: 'Triage incoming bugs, suggest reproduction steps, and link related tickets.' },
  { stage: 'Deploy', use: 'Auto-compose release notes from merged PRs and Jira tickets.' },
  { stage: 'Operate', use: 'Triage incidents and recall the last time something similar happened.' },
];

const demoVideos: GridVideo[] = [
  {
    id: 'overview',
    title: 'Rovo in 2 minutes',
    description: 'A quick walkthrough of Rovo answering questions across Jira, Confluence, and GitHub.',
    durationLabel: '2:14',
    // storagePath: path.capabilityVideo('atlassian-rovo', 'overview.mp4')
  },
  {
    id: 'confluence',
    title: 'Rovo in Confluence',
    description: 'Search, summarise, and draft new pages without leaving the space you are in.',
    durationLabel: '3:02',
  },
  {
    id: 'jira',
    title: 'Rovo in Jira',
    description: 'Triage, link, and auto-draft tickets and release notes directly from the board.',
    durationLabel: '2:48',
  },
  {
    id: 'custom-agents',
    title: 'Building a custom agent',
    description: 'Create a skill-based agent that bridges Confluence and Jira on a real workflow.',
    durationLabel: '4:21',
  },
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
      "Rovo respects every source system's ACLs. Users only see answers and references they already have permission to read in the underlying tool — no permission elevation. PhoenixDX hardens this further during deployment.",
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
      "No. Atlassian's Rovo runs on enterprise-grade LLMs and does not use customer data to train shared models. PhoenixDX validates this for each engagement against your compliance posture.",
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
    <HeroStage
      kicker="AI Capabilities · Atlassian"
      title="Atlassian Rovo —"
      titleAccent="grounded in your knowledge"
      tagline="Rovo connects to the tools your teams already use — Jira, Confluence, GitHub, Slack and beyond — to find, learn, and act on the work happening across your organisation. PhoenixDX deploys Rovo as a productivity multiplier across every stage of the SDLC."
    >
      <HeroStats>
        <HeroStat
          label="Connectors"
          value="50+"
          hint="Atlassian, GitHub, Slack, Microsoft, Google"
        />
        <HeroStat
          label="Permission-aware"
          value="100%"
          hint="Source-system ACLs honoured for every result"
        />
        <HeroStat
          label="Time saved"
          value="6+ hrs"
          hint="Per developer per week (typical PhoenixDX rollout)"
        />
      </HeroStats>
    </HeroStage>
  );
}

function HowItWorks() {
  return (
    <ContentStage
      eyebrow="How it works"
      heading="One assistant across the Atlassian suite"
      subtitle="Rovo lives where your teams already work — and PhoenixDX builds custom agents that bridge the surfaces."
    >
      <div className="flex h-full flex-col gap-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <SurfaceCard
            icon={DocumentTextIcon}
            surface="Rovo in Confluence"
            items={[
              'Search across spaces with answers grounded in your team\'s actual writing.',
              'Summarise long pages — and the threads that produced them.',
              'Generate ADRs from decision discussions and meeting notes.',
              'Draft new pages from a brief; refine in plain English.',
            ]}
          />
          <SurfaceCard
            icon={ClipboardDocumentListIcon}
            surface="Rovo in Jira"
            items={[
              'Triage incoming bugs and link related tickets automatically.',
              'Suggest reproduction steps and likely owners.',
              'Compose release notes from completed tickets in one pass.',
              'Draft tickets from acceptance criteria or Slack threads.',
            ]}
          />
        </div>

        <CustomAgentsBlock />
      </div>
    </ContentStage>
  );
}

function SurfaceCard({
  icon: Icon,
  surface,
  items,
}: {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  surface: string;
  items: string[];
}) {
  return (
    <article className="rounded-2xl border border-midnight-700/60 bg-midnight-900/40 p-5">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-azure-300/10 text-azure-300 ring-1 ring-inset ring-azure-300/30">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </div>
        <h3 className="text-base font-semibold text-white">{surface}</h3>
      </div>
      <ul className="mt-3 space-y-1.5">
        {items.map((item) => (
          <li key={item} className="flex gap-2 text-sm text-midnight-200">
            <span
              className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-azure-300/70"
              aria-hidden="true"
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}

function CustomAgentsBlock() {
  const examples = [
    'Weekly digest agents',
    'Change-management ushers',
    'On-call summarisers',
    'Cross-team status pulses',
  ];
  return (
    <article className="rounded-2xl border border-phoenix-500/30 bg-gradient-to-br from-phoenix-500/5 via-midnight-900/40 to-midnight-900/40 p-5">
      <div className="flex items-start gap-4">
        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-phoenix-500/15 text-phoenix-300 ring-1 ring-inset ring-phoenix-500/40">
          <BoltIcon className="h-5 w-5" aria-hidden="true" />
        </div>
        <div className="flex-1">
          <h3 className="text-base font-semibold text-white">Custom Rovo Agents</h3>
          <p className="mt-1 text-sm text-midnight-300">
            Build skill-based agents that bridge Confluence and Jira — triggered by Jira
            transitions, schedules, or page edits. PhoenixDX designs, builds, and maintains
            your custom agents.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {examples.map((ex) => (
              <span
                key={ex}
                className="inline-flex items-center rounded-full bg-midnight-800/80 px-2.5 py-1 text-[11px] font-medium text-midnight-200 ring-1 ring-inset ring-midnight-700"
              >
                {ex}
              </span>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}

function AcrossTheSDLC() {
  return (
    <ContentStage
      eyebrow="Use cases"
      heading="Rovo across the SDLC"
      subtitle="One assistant, six stages of value. PhoenixDX maps Rovo to your team's existing rituals."
    >
      <div className="grid h-full grid-cols-1 gap-2 sm:grid-cols-2">
        {sdlcStages.map((s) => (
          <div
            key={s.stage}
            className="flex items-start gap-4 rounded-2xl border border-midnight-700/60 bg-midnight-900/40 p-4 transition-colors hover:border-phoenix-500/30"
          >
            <div className="w-20 flex-shrink-0 text-xs font-semibold uppercase tracking-wider text-phoenix-400">
              {s.stage}
            </div>
            <div className="text-sm text-midnight-200">{s.use}</div>
          </div>
        ))}
      </div>
    </ContentStage>
  );
}

const stages: SlideshowStage[] = [
  { id: 'overview', label: 'Overview', content: <Overview /> },
  { id: 'how', label: 'How it works', content: <HowItWorks /> },
  { id: 'sdlc', label: 'Across the SDLC', content: <AcrossTheSDLC /> },
  {
    id: 'demo',
    label: 'Demo videos',
    content: (
      <VideoGridStage
        heading="Watch Rovo in action"
        description="Click a video to play. More demos land here as customer engagements ship."
        videos={demoVideos}
      />
    ),
  },
  {
    id: 'faq',
    label: 'FAQ',
    content: <FAQStage faqs={faqs} />,
  },
];

export default function AtlassianRovo() {
  return <Slideshow stages={stages} />;
}
