import {
  BookOpenIcon,
  DocumentTextIcon,
  CommandLineIcon,
  ArrowPathRoundedSquareIcon,
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
  title: 'Documentation',
  titleAccent: 'Generation',
  tagline:
    "Auto-generate the docs your team would write if they had time — READMEs, API references, architecture decision records, onboarding guides. Then keep them in sync as the code evolves, so nothing rots.",
};

const faqs: FAQItem[] = [
  {
    id: 'what-docs',
    question: 'What kind of docs does it generate?',
    answer:
      'READMEs, package-level API references, ADRs (from PR descriptions and Slack threads), runbooks (from incident postmortems), onboarding guides (from your repo + tickets). Configurable per project.',
  },
  {
    id: 'sync',
    question: 'How does it stay in sync with the code?',
    answer:
      "On every merge to main, the agent diffs the change against the doc and proposes the smallest update. Goes through normal review — never auto-commits. If the change is a no-op, no PR is opened.",
  },
  {
    id: 'voice',
    question: "Will it sound like our team?",
    answer:
      'PhoenixDX primes the agent on existing docs you already approve of. The voice carries — terse if you write terse, thorough if you write thorough. Tone is reviewable before each PR lands.',
  },
  {
    id: 'truth',
    question: "How do you avoid hallucinated 'facts' in the docs?",
    answer:
      "Every claim is grounded in code or git history; the agent links each claim to its source line / commit. If it can't ground a claim, it omits it rather than invents.",
  },
  {
    id: 'privacy',
    question: 'Does our code leave our network?',
    answer:
      "It doesn't have to. Models can run inside your VPC (Bedrock, Azure OpenAI, on-prem Anthropic) or your enterprise SaaS endpoint. PhoenixDX validates the boundary per engagement.",
  },
];

function Overview() {
  return (
    <ContentStage
      eyebrow="What it does"
      heading="Docs that don't rot"
      subtitle="Generation is half the job. The other half is keeping docs accurate as code evolves — and that's where most documentation efforts die."
    >
      <div className="grid gap-5 md:grid-cols-3">
        <Stat label="Generation" value="Code → docs" hint="From repo, PRs, tickets, threads" />
        <Stat label="Maintenance" value="On every merge" hint="Smallest diff to keep docs accurate" />
        <Stat label="Onboarding time" value="Down 40%" hint="Typical PhoenixDX-engagement reduction" />
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
      eyebrow="The pipeline"
      heading="Four doc-generation modes"
      subtitle="Each mode targets a different doc style with its own grounding sources."
    >
      <FeatureGrid>
        <FeatureCard
          icon={BookOpenIcon}
          heading="READMEs & guides"
          body="Project overviews, getting-started, architecture diagrams. Grounded in repo structure + entry points."
        />
        <FeatureCard
          icon={CommandLineIcon}
          heading="API references"
          body="Endpoint-level docs from OpenAPI / GraphQL / SDK source. Examples auto-generated from real test calls."
        />
        <FeatureCard
          icon={DocumentTextIcon}
          heading="ADRs"
          body="Architecture Decision Records reconstructed from PR descriptions, Slack threads, and ticket discussions."
        />
        <FeatureCard
          icon={ArrowPathRoundedSquareIcon}
          heading="Runbooks"
          body="Generated from incident postmortems and on-call notes. Becomes the foundation for the Incident Response Copilot."
        />
      </FeatureGrid>
    </ContentStage>
  );
}

const stages: SlideshowStage[] = [
  { id: 'overview', label: 'Overview', content: <Overview /> },
  { id: 'modes', label: 'Doc modes', content: <HowItWorks /> },
  {
    id: 'demo',
    label: 'Demo video',
    content: (
      <VideoStage
        heading="From a stale repo to fresh docs"
        description="Watch the agent generate a README, API reference, and ADR set for a real project."
        storagePath={undefined}
      />
    ),
  },
  { id: 'faq', label: 'FAQ', content: <FAQStage faqs={faqs} /> },
];

export default function DocumentationGeneration() {
  return <Slideshow hero={hero} stages={stages} />;
}
