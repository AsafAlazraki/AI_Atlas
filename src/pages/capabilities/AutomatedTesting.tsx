import {
  BeakerIcon,
  ShieldCheckIcon,
  ArrowPathIcon,
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
  title: 'Automated',
  titleAccent: 'Testing',
  tagline:
    "Generate unit, integration and end-to-end tests from specs and existing code paths — then keep them green as the codebase evolves. Less brittle than record-and-playback, smarter than scaffolded test stubs.",
};

const faqs: FAQItem[] = [
  {
    id: 'languages',
    question: 'What languages and frameworks are supported?',
    answer:
      'TypeScript / JavaScript (Vitest, Jest, Playwright, Cypress), Python (pytest, unittest), Go (testing), Java (JUnit), C# (xUnit, NUnit). Custom frameworks are configurable.',
  },
  {
    id: 'maintenance',
    question: 'What about test maintenance when code changes?',
    answer:
      "When a PR breaks tests, the maintenance agent looks at the diff and proposes the smallest test edit that restores green — flagged for human review. Stops the test suite from rotting into noise.",
  },
  {
    id: 'flakes',
    question: 'How do you handle flaky tests?',
    answer:
      'A flake-detection layer runs new and existing tests under jitter. Tests that fail intermittently are quarantined and the flake report goes to the team — never silently retried.',
  },
  {
    id: 'coverage',
    question: 'Will it just chase 100% coverage with worthless tests?',
    answer:
      'No. The generator targets behaviours from specs and risky code paths first (cyclomatic-complexity hot-spots, recently changed code, lacking-coverage critical paths). Coverage is a side effect, not the goal.',
  },
  {
    id: 'human',
    question: 'Where does the human stay in the loop?',
    answer:
      'Every generated test is a PR opened by the agent. Engineers review like any human-authored test. The agent never bypasses code review.',
  },
];

function Overview() {
  return (
    <ContentStage
      eyebrow="What it does"
      heading="Tests that keep up with your code"
      subtitle="Generation, maintenance, and flake detection in one pipeline. The goal isn't more tests — it's tests you trust."
    >
      <div className="grid gap-5 md:grid-cols-3">
        <Stat label="Generation" value="Spec → test" hint="From user stories, OpenAPI, or existing code paths" />
        <Stat label="Maintenance" value="Auto-repair" hint="When a PR breaks tests, propose the smallest fix" />
        <Stat label="Trust" value="Flake-free" hint="Quarantine flaky tests, surface root causes" />
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
      heading="Four agents, one goal"
      subtitle="Each agent owns a slice of the test lifecycle and reports back to a shared review queue."
    >
      <FeatureGrid>
        <FeatureCard
          icon={BeakerIcon}
          heading="Generator"
          body="Reads specs, OpenAPI, and existing code paths. Produces unit / integration / E2E tests targeting actual behaviours, not implementation details."
        />
        <FeatureCard
          icon={ArrowPathIcon}
          heading="Maintainer"
          body="Watches PRs. When a code change breaks tests, proposes minimal test edits that match the new intent — never rewrites silently."
        />
        <FeatureCard
          icon={ShieldCheckIcon}
          heading="Flake hunter"
          body="Runs candidate tests under jitter, varying timing and ordering. Quarantines unstable tests with a root-cause report."
        />
        <FeatureCard
          icon={ChartBarIcon}
          heading="Coverage strategist"
          body="Prioritises generation effort on risky code: high cyclomatic complexity, recently changed, customer-impacting paths."
        />
      </FeatureGrid>
    </ContentStage>
  );
}

function InAction() {
  return (
    <ContentStage
      eyebrow="In action"
      heading="From a feature spec to a green test suite"
      subtitle="Walking through a real PhoenixDX engagement."
    >
      <ol className="space-y-3">
        {[
          { n: '1', label: 'Spec ingest', body: 'PRD + OpenAPI for the new "shareable links" feature loaded into the workspace.' },
          { n: '2', label: 'Test generation', body: '38 candidate tests proposed: 24 unit (happy path + 6 edge cases per endpoint), 9 integration, 5 E2E.' },
          { n: '3', label: 'Human review', body: 'Engineer accepts 32 as-is, edits 4, rejects 2 (out of scope). All become a single PR.' },
          { n: '4', label: 'Maintenance kicks in', body: 'Two weeks later the team renames a field. Maintainer agent updates 6 tests, flags 1 as needing semantic review.' },
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
  { id: 'pipeline', label: 'Pipeline', content: <HowItWorks /> },
  { id: 'in-action', label: 'In action', content: <InAction /> },
  {
    id: 'demo',
    label: 'Demo video',
    content: (
      <VideoStage
        heading="Automated Testing in 3 minutes"
        description="Watch the pipeline take a feature spec from blank slate to a reviewed test PR."
        storagePath={undefined}
      />
    ),
  },
  { id: 'faq', label: 'FAQ', content: <FAQStage faqs={faqs} /> },
];

export default function AutomatedTesting() {
  return <Slideshow hero={hero} stages={stages} />;
}
