import {
  DocumentTextIcon,
  Squares2X2Icon,
  PaintBrushIcon,
  ArrowsRightLeftIcon,
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
  title: 'Spec to',
  titleAccent: 'Design',
  tagline:
    "Turn product requirements and user stories into Figma-ready wireframes and high-fidelity designs in minutes — grounded in your design system, not someone else's.",
};

const faqs: FAQItem[] = [
  {
    id: 'inputs',
    question: 'What kind of input does it accept?',
    answer:
      'User stories, acceptance criteria, PRDs, Confluence pages, Jira tickets, or freeform briefs. Bring whatever you have — the pipeline normalises it before generating designs.',
  },
  {
    id: 'design-system',
    question: 'How does it stay on-brand?',
    answer:
      "It's grounded in your existing Figma library — components, tokens, type styles, spacing scale. Generated screens compose those primitives instead of inventing new ones, so output matches the rest of your product.",
  },
  {
    id: 'output',
    question: 'What does the output look like?',
    answer:
      'A Figma file with: (1) a low-fidelity wireframe pass for fast review, (2) a high-fidelity pass using your design system, and (3) a flow diagram linking the screens. Designers iterate from there in Figma natively.',
  },
  {
    id: 'replace-designer',
    question: 'Does this replace our designers?',
    answer:
      'No — it eliminates the blank-canvas problem. Designers spend their time refining real options instead of drawing version-zero from scratch. Most teams ship faster AND higher quality after rolling this out.',
  },
];

function Overview() {
  return (
    <ContentStage
      eyebrow="What it is"
      heading="From requirement to ready-to-edit Figma"
      subtitle="A pipeline that reads your specs, lays out the screens, applies your design system, and hands designers a real starting point — not a blank canvas."
    >
      <div className="grid gap-5 md:grid-cols-3">
        <Stat label="Time to v0" value="< 10 min" hint="Spec ingest → wireframes" />
        <Stat label="Design system" value="100%" hint="Generated screens use your existing components" />
        <Stat label="Iteration speed" value="3-5×" hint="Faster than starting in Figma cold" />
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

function Pipeline() {
  return (
    <ContentStage
      eyebrow="The pipeline"
      heading="Four stages, one Figma file"
      subtitle="Each stage is reviewable on its own — pause, refine, continue."
    >
      <FeatureGrid>
        <FeatureCard
          icon={DocumentTextIcon}
          heading="1 — Parse spec"
          body="Extracts features, screens, user roles, and acceptance criteria from whatever input you provided. Highlights ambiguity for human input."
        />
        <FeatureCard
          icon={ArrowsRightLeftIcon}
          heading="2 — Map flows"
          body="Builds a navigation graph: which screens lead where, what state-changes trigger transitions, where edge cases sit."
        />
        <FeatureCard
          icon={Squares2X2Icon}
          heading="3 — Wireframe"
          body="Generates low-fidelity layouts for every screen so structure is reviewable before pixels. Fast feedback loop."
        />
        <FeatureCard
          icon={PaintBrushIcon}
          heading="4 — Apply design system"
          body="Replaces wireframe primitives with your real Figma components, tokens, and styles. Output is brand-correct from the first frame."
        />
      </FeatureGrid>
    </ContentStage>
  );
}

function InAction() {
  return (
    <ContentStage
      eyebrow="In action"
      heading="An example: shipping a settings page"
      subtitle="Walking through what the pipeline produced from a real PhoenixDX engagement."
    >
      <div className="space-y-4">
        <Step
          n="A"
          title="Spec input"
          body='"Users need to manage notification preferences with per-channel granularity (email, Slack, in-app). Admins can override per-team."'
        />
        <Step
          n="B"
          title="Pipeline produces"
          body="3 screens, 2 modal flows, 1 admin view. Wireframes ready for review in 4 minutes; high-fidelity Figma file in another 6."
        />
        <Step
          n="C"
          title="Designer takes over"
          body="Refines edge-case microcopy, adjusts a non-standard preference grid, runs accessibility checks. Ships to engineering same day."
        />
      </div>
    </ContentStage>
  );
}

function Step({ n, title, body }: { n: string; title: string; body: string }) {
  return (
    <div className="flex items-start gap-4 rounded-2xl border border-midnight-700/60 bg-midnight-900/40 p-4">
      <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-azure-300/10 text-sm font-bold text-azure-300 ring-1 ring-inset ring-azure-300/30">
        {n}
      </div>
      <div>
        <div className="text-sm font-semibold text-white">{title}</div>
        <div className="mt-0.5 text-sm text-midnight-300">{body}</div>
      </div>
    </div>
  );
}

const stages: SlideshowStage[] = [
  { id: 'overview', label: 'Overview', content: <Overview /> },
  { id: 'pipeline', label: 'Pipeline', content: <Pipeline /> },
  { id: 'in-action', label: 'In action', content: <InAction /> },
  {
    id: 'demo',
    label: 'Demo video',
    content: (
      <VideoStage
        heading="Spec to Design — a 90-second walkthrough"
        description="Watch a real spec become a Figma file, applied design system and all."
        storagePath={undefined /* path.capabilityVideo('spec-to-design', 'walkthrough.mp4') */}
      />
    ),
  },
  {
    id: 'faq',
    label: 'FAQ',
    content: <FAQStage faqs={faqs} />,
  },
];

export default function SpecToDesign() {
  return <Slideshow hero={hero} stages={stages} />;
}
