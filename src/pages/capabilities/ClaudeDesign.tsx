import {
  SwatchIcon,
  CursorArrowRaysIcon,
  Squares2X2Icon,
  ChatBubbleLeftRightIcon,
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
  kicker: 'AI Capabilities · Anthropic',
  title: 'Claude',
  titleAccent: 'Design',
  tagline:
    "Conversational design with Claude — generate live, interactive UI directly from a brief. Iterate in plain English, get a working component back in seconds, and copy it into your codebase or your design system.",
};

const faqs: FAQItem[] = [
  {
    id: 'how-different',
    question: 'How is this different from Spec to Design?',
    answer:
      'Spec to Design is a structured pipeline (parse spec → wireframe → high-fidelity Figma). Claude Design is conversational — open Claude, describe what you want, get an interactive React component back immediately. Best for early exploration and copy-tweak iteration; less structured but much faster.',
  },
  {
    id: 'output',
    question: "What format is the output?",
    answer:
      'Live React + Tailwind components rendered as Claude Artifacts. You can interact with them in the chat, iterate on copy and layout, then copy the code into your repo. PhoenixDX has tooling to map them to your design system.',
  },
  {
    id: 'design-system',
    question: 'Does it respect our design system?',
    answer:
      "Out of the box: it uses Claude's general aesthetic. With PhoenixDX's design-system priming, every output uses your tokens, components, and copy voice. Setup is a one-off discovery sprint.",
  },
  {
    id: 'use-case',
    question: 'When should we use Claude Design vs. open Figma?',
    answer:
      "Claude Design wins for: exploring shape early, generating multiple variants quickly, drafting marketing pages, prototyping landing experiments. Figma still wins for: production design at fidelity, multi-screen flow design, design-system curation. They compose, not compete.",
  },
  {
    id: 'access',
    question: 'How do customers get started?',
    answer:
      "PhoenixDX runs onboarding workshops on Anthropic's platform — accounts, prompt templates tuned for your design system, and team training. Most teams ship their first Claude-Design-driven feature within two weeks.",
  },
];

function Overview() {
  return (
    <ContentStage
      eyebrow="What it is"
      heading="Design at the speed of conversation"
      subtitle="Open Claude. Describe a screen. Get a working component. Iterate in chat. Ship."
    >
      <div className="grid gap-5 md:grid-cols-3">
        <Stat label="Time to first artifact" value="< 60s" hint="From prompt to interactive UI" />
        <Stat label="Iterations per session" value="20+" hint="Plain-English tweaks, instant re-render" />
        <Stat label="Output" value="React + Tailwind" hint="Copyable, your design system on top" />
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
      eyebrow="What you can do"
      heading="Four modes Claude excels at for design"
      subtitle="One conversational interface, four use cases that compound."
    >
      <FeatureGrid>
        <FeatureCard
          icon={ChatBubbleLeftRightIcon}
          heading="Concept exploration"
          body="Describe a feature. Get five distinct shapes back. Pick the one that resonates and refine — without ever opening a design tool."
        />
        <FeatureCard
          icon={SwatchIcon}
          heading="Design-system priming"
          body="Prime Claude with your tokens, components, and voice. Every artifact composes your primitives instead of inventing new ones."
        />
        <FeatureCard
          icon={CursorArrowRaysIcon}
          heading="Copy iteration"
          body="Loop on microcopy in seconds. A/B variants, tone shifts, length tradeoffs — all reviewable next to the rendered UI."
        />
        <FeatureCard
          icon={Squares2X2Icon}
          heading="Prototyping"
          body="Spin up a clickable multi-screen prototype to put in front of users — without committing engineering effort."
        />
      </FeatureGrid>
    </ContentStage>
  );
}

const stages: SlideshowStage[] = [
  { id: 'overview', label: 'Overview', content: <Overview /> },
  { id: 'modes', label: 'What you can do', content: <HowItWorks /> },
  {
    id: 'demo',
    label: 'Demo video',
    content: (
      <VideoStage
        heading="Claude designing a settings page, live"
        description="Watch a real conversation produce a fully-styled, interactive settings UI in under three minutes."
        storagePath={undefined}
      />
    ),
  },
  { id: 'faq', label: 'FAQ', content: <FAQStage faqs={faqs} /> },
];

export default function ClaudeDesign() {
  return <Slideshow hero={hero} stages={stages} />;
}
