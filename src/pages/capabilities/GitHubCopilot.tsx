import {
  CommandLineIcon,
  ChatBubbleLeftRightIcon,
  CpuChipIcon,
  Squares2X2Icon,
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
  kicker: 'AI Capabilities · GitHub',
  title: 'GitHub',
  titleAccent: 'Copilot',
  tagline:
    "An AI pair programmer that lives where your engineers already work — VS Code, JetBrains, Visual Studio, and GitHub. Code completion, chat, multi-step planning, and autonomous agents in one platform. PhoenixDX deploys Copilot for enterprises that want measurable lift without forcing a tooling change.",
};

const faqs: FAQItem[] = [
  {
    id: 'models',
    question: 'Which models does Copilot use?',
    answer:
      "Copilot supports multiple models — Anthropic Claude (3.5 / 3.7 Sonnet), OpenAI GPT-4o / o1, and others — selectable per request. Engineers pick the model that fits the task; PhoenixDX configures defaults per org.",
  },
  {
    id: 'modes',
    question: 'What are the different Copilot modes?',
    answer:
      "Four: (1) Code completion in the editor — inline suggestions as you type. (2) Copilot Chat — sidebar chat with repo context. (3) Copilot Workspace — multi-file planning before code is written. (4) Copilot Agents — autonomous tasks like 'fix this issue', running in their own branch.",
  },
  {
    id: 'context',
    question: 'How does Copilot understand our codebase?',
    answer:
      "By default it has the open file + adjacent files. Copilot Enterprise adds your indexed repositories, knowledge bases, and pull-request history to every prompt. PhoenixDX tunes the indexing scope per team.",
  },
  {
    id: 'security',
    question: 'Where does our code go?',
    answer:
      "Copilot for Business and Copilot Enterprise enforce the data-handling boundary contractually — code is not used to train shared models, and prompts are retained only as configured. PhoenixDX validates the architecture against your compliance posture before rollout.",
  },
  {
    id: 'rollout',
    question: 'How do you measure adoption and impact?',
    answer:
      "GitHub provides per-user / per-team adoption metrics; PhoenixDX layers on engagement-specific dashboards (acceptance rate by language, time-to-PR, review-comment volume). The first 30 days set the baseline, the next 60 prove the lift.",
  },
];

function Overview() {
  return (
    <ContentStage
      eyebrow="What it is"
      heading="Where engineers already work"
      subtitle="The point isn't that Copilot is the smartest AI — it's that engineers don't have to switch tools to use it. Adoption follows."
    >
      <div className="grid gap-5 md:grid-cols-3">
        <Stat label="Surface area" value="VS Code · JetBrains · VS · GitHub" hint="Plus CLI and mobile" />
        <Stat label="Model choice" value="Claude · GPT · more" hint="Per-request, per-task" />
        <Stat label="Adoption velocity" value="< 2 weeks" hint="Typical PhoenixDX rollout to first measurable lift" />
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

function Modes() {
  return (
    <ContentStage
      eyebrow="The four modes"
      heading="One platform, four ways to use it"
      subtitle="Copilot covers the spectrum from microsecond-fast inline completions to long-running autonomous agents."
    >
      <FeatureGrid>
        <FeatureCard
          icon={CommandLineIcon}
          heading="Code completion"
          body="Inline suggestions as you type. Multi-line, project-aware, language-aware. The original Copilot experience and still the highest-volume use."
        />
        <FeatureCard
          icon={ChatBubbleLeftRightIcon}
          heading="Copilot Chat"
          body="Sidebar conversation with your repo as context. Explain code, refactor, generate tests, draft commit messages — without leaving the editor."
        />
        <FeatureCard
          icon={Squares2X2Icon}
          heading="Copilot Workspace"
          body="Multi-file planning. Describe a change; Copilot proposes a plan across files; you review and edit before any code is written."
        />
        <FeatureCard
          icon={CpuChipIcon}
          heading="Copilot Agents"
          body="Autonomous task execution. Assign an issue to Copilot; it works on its own branch, opens a PR, responds to review comments."
        />
      </FeatureGrid>
    </ContentStage>
  );
}

function InAction() {
  return (
    <ContentStage
      eyebrow="In action"
      heading="A typical engineering week with Copilot"
      subtitle="Each mode finds its natural home. The point isn't using all four — it's having the right one available when you need it."
    >
      <ol className="space-y-3">
        {[
          { n: 'M', label: 'Monday — autocomplete', body: 'Implementing a new API endpoint. Copilot inline completion finishes 60-70% of the boilerplate as you type.' },
          { n: 'T', label: 'Tuesday — chat', body: 'Stuck on a regex. Copilot Chat in the sidebar drafts three options with explanations. Pick one, paste in.' },
          { n: 'W', label: 'Wednesday — workspace', body: 'New feature spans 8 files. Copilot Workspace proposes the cross-file diff. You edit the plan, then accept and apply.' },
          { n: 'T', label: 'Thursday — agent', body: 'Long-tail bug from the backlog. Assign to Copilot Agent; it opens a PR overnight; you review Friday morning.' },
          { n: 'F', label: 'Friday — review', body: 'PR review pass uses Copilot Chat to ask "what changed and why" — instant context on a colleague\'s diff.' },
        ].map((s) => (
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
  { id: 'modes', label: 'The four modes', content: <Modes /> },
  { id: 'in-action', label: 'In action', content: <InAction /> },
  {
    id: 'demo',
    label: 'Demo video',
    content: (
      <VideoStage
        heading="GitHub Copilot — completion, chat, workspace, agent"
        description="A four-minute walkthrough hitting each Copilot mode on a real repo."
        storagePath={undefined}
      />
    ),
  },
  { id: 'faq', label: 'FAQ', content: <FAQStage faqs={faqs} /> },
];

export default function GitHubCopilot() {
  return <Slideshow hero={hero} stages={stages} />;
}
