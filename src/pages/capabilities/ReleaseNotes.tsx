import {
  MegaphoneIcon,
  TagIcon,
  ListBulletIcon,
  UserGroupIcon,
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
  title: 'Release Notes',
  titleAccent: 'Generation',
  tagline:
    "Compose customer-grade release notes from merged PRs and shipped tickets — grouped by audience, written in your voice, ready to publish. Engineering managers stop dreading release day.",
};

const faqs: FAQItem[] = [
  {
    id: 'sources',
    question: 'What does it pull from?',
    answer:
      'Merged PRs, linked Jira / Linear tickets, commit messages, and your existing release-notes archive (for voice). Optionally: customer-impact tags, support-ticket spikes, feature-flag rollout state.',
  },
  {
    id: 'audience',
    question: 'Customer notes vs. internal notes?',
    answer:
      "Both, in one pass. The agent emits an internal changelog (every merged PR) AND a customer-facing release note (only what customers will perceive, in non-engineering language). They're separate artifacts that share a source.",
  },
  {
    id: 'voice',
    question: "Will it match our voice?",
    answer:
      'Primed on your last 12 months of release notes. Tone, length, formality, even your standard headings carry. Drift from that voice is reviewable as a diff.',
  },
  {
    id: 'review',
    question: 'How does PM / marketing fit in?',
    answer:
      "The output is a draft, not a publish. PM reviews and tweaks; marketing approves customer-facing copy. The agent collapses the boring synthesis step, not the editorial step.",
  },
  {
    id: 'distribution',
    question: 'How does it publish?',
    answer:
      "Anywhere. Markdown for changelog repos, HTML for newsletter platforms, structured JSON for in-app changelog widgets. PhoenixDX wires the distribution into your existing tooling.",
  },
];

function Overview() {
  return (
    <ContentStage
      eyebrow="What it does"
      heading="Release notes that engineering managers don't dread"
      subtitle="The synthesis step that nobody wants to do, automated. The editorial step still belongs to humans."
    >
      <div className="grid gap-5 md:grid-cols-3">
        <Stat label="Time to draft" value="< 5 min" hint="From release tag to reviewable draft" />
        <Stat label="Audiences" value="Two passes" hint="Internal changelog + customer-facing notes" />
        <Stat label="Voice match" value="100%" hint="Primed on your existing release archive" />
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
      eyebrow="How it works"
      heading="Four passes, one publishable draft"
      subtitle="Each pass narrows the scope until what's left is the story your customers will actually read."
    >
      <FeatureGrid>
        <FeatureCard
          icon={ListBulletIcon}
          heading="1 — Ingest"
          body="Pull every merged PR + linked ticket between two release tags. De-duplicate, drop chores, classify by area."
        />
        <FeatureCard
          icon={TagIcon}
          heading="2 — Score by audience"
          body="Each change is scored for customer impact. Bug fixes invisible to users get internal-only treatment."
        />
        <FeatureCard
          icon={UserGroupIcon}
          heading="3 — Group + summarise"
          body="Group changes into themes. Write a customer-language summary per theme using your historical voice."
        />
        <FeatureCard
          icon={MegaphoneIcon}
          heading="4 — Format for distribution"
          body="Emit Markdown, HTML, JSON. PM reviews, marketing approves, ship. The agent never publishes directly."
        />
      </FeatureGrid>
    </ContentStage>
  );
}

const stages: SlideshowStage[] = [
  { id: 'overview', label: 'Overview', content: <Overview /> },
  { id: 'pipeline', label: 'How it works', content: <HowItWorks /> },
  {
    id: 'demo',
    label: 'Demo video',
    content: (
      <VideoStage
        heading="From release tag to ready-to-publish notes in 5 minutes"
        description="A real release: 47 merged PRs become a single customer note and a clean internal changelog."
        storagePath={undefined}
      />
    ),
  },
  { id: 'faq', label: 'FAQ', content: <FAQStage faqs={faqs} /> },
];

export default function ReleaseNotes() {
  return <Slideshow hero={hero} stages={stages} />;
}
