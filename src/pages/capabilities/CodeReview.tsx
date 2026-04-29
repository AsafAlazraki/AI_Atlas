import {
  CodeBracketIcon,
  ShieldCheckIcon,
  AdjustmentsHorizontalIcon,
  ArrowsPointingInIcon,
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
  title: 'Code',
  titleAccent: 'Review',
  tagline:
    "A project-aware code-review agent that catches what static analysis misses — security drift, architectural violations, and team-specific conventions. Turns your senior engineers into the second pair of eyes on every PR, instead of the only pair.",
};

const faqs: FAQItem[] = [
  {
    id: 'replace',
    question: "Does this replace human review?",
    answer:
      'No — it augments it. The agent is the first pass; a human signs off. The point is: humans review the substance, not the spelling. Senior engineers stop being a bottleneck on every typo.',
  },
  {
    id: 'noise',
    question: 'How do you avoid review-comment noise?',
    answer:
      "Findings are ranked by impact and grouped by theme. The agent never leaves a comment unless it can cite specific evidence (file + line + reason). PhoenixDX tunes the threshold per repository.",
  },
  {
    id: 'conventions',
    question: 'How does it learn our team conventions?',
    answer:
      "Two ways: it ingests your style docs, ADRs, and review history; and it watches accepted vs. dismissed agent comments to refine its bar over time. The longer it runs in your repo, the better its taste.",
  },
  {
    id: 'security',
    question: "What about secrets / data leaving our network?",
    answer:
      "Code stays inside your boundary. Models are run inside your VPC or on a vetted enterprise endpoint (Anthropic, OpenAI, Azure OpenAI). PhoenixDX validates the architecture against your compliance posture before deployment.",
  },
  {
    id: 'integration',
    question: 'How does it plug into our workflow?',
    answer:
      'GitHub / Bitbucket / GitLab integrations. Comments appear like a normal reviewer; CI status reflects severity. No new tools for engineers to learn.',
  },
];

function Overview() {
  return (
    <ContentStage
      eyebrow="What it does"
      heading="Project-aware review on every PR"
      subtitle="Beyond linting: an agent that reads your architecture, your conventions, and the diff in context."
    >
      <div className="grid gap-5 md:grid-cols-3">
        <Stat label="Coverage" value="Every PR" hint="Reviews automatically on open + on push" />
        <Stat label="Senior time saved" value="40-60%" hint="On routine review pass" />
        <Stat label="Latency" value="< 2 min" hint="From push to first comment, on a typical PR" />
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
      eyebrow="What it catches"
      heading="Four review dimensions, in parallel"
      subtitle="Each pass is a focused agent, ranked by impact, deduplicated before posting."
    >
      <FeatureGrid>
        <FeatureCard
          icon={ShieldCheckIcon}
          heading="Security"
          body="OWASP top-10 patterns, secrets exposure, dependency CVEs, IaC misconfig. Cross-references against your declared threat model."
        />
        <FeatureCard
          icon={CodeBracketIcon}
          heading="Architecture"
          body="Layering violations, ownership drift, leaky abstractions, public-API contract drift. Reads your ADRs before commenting."
        />
        <FeatureCard
          icon={AdjustmentsHorizontalIcon}
          heading="Team conventions"
          body="Naming, error handling, logging style, test patterns. Trained on your accepted vs. dismissed comment history."
        />
        <FeatureCard
          icon={ArrowsPointingInIcon}
          heading="Diff focus"
          body="Doesn't comment on lines you didn't change. Doesn't relitigate decisions in unrelated files. Stays in the PR."
        />
      </FeatureGrid>
    </ContentStage>
  );
}

function InAction() {
  return (
    <ContentStage
      eyebrow="In action"
      heading="A real PR comment chain"
      subtitle="Trimmed and anonymised from a PhoenixDX engagement."
    >
      <div className="space-y-3">
        {[
          { tag: 'Security · HIGH', body: 'JWT verified with HS256 but secret comes from process.env.JWT_SECRET — fallback to a hard-coded "dev-secret" if unset. Set explicitly in prod and remove the fallback.' },
          { tag: 'Architecture · MED', body: 'New direct DB query in the route handler — repository pattern is established for this entity (see ADR-0014). Consider routing through UserRepository.' },
          { tag: 'Convention · LOW', body: 'Error logged at info level — team convention is warn or above for handled errors (see CONTRIBUTING.md §3.2).' },
          { tag: 'Test · MED', body: 'New branch in handleSignup() lacks a test. Suggest adding one for the email-already-verified path.' },
        ].map((c, i) => (
          <article
            key={i}
            className="rounded-2xl border border-midnight-700/60 bg-midnight-900/40 p-4"
          >
            <div className="text-[11px] font-semibold uppercase tracking-wider text-phoenix-400">
              {c.tag}
            </div>
            <div className="mt-1.5 text-sm text-midnight-200">{c.body}</div>
          </article>
        ))}
      </div>
    </ContentStage>
  );
}

const stages: SlideshowStage[] = [
  { id: 'overview', label: 'Overview', content: <Overview /> },
  { id: 'dimensions', label: 'What it catches', content: <HowItWorks /> },
  { id: 'in-action', label: 'In action', content: <InAction /> },
  {
    id: 'demo',
    label: 'Demo video',
    content: (
      <VideoStage
        heading="Code review on a real PR"
        description="Watch the agent walk a real diff and produce ranked findings."
        storagePath={undefined}
      />
    ),
  },
  { id: 'faq', label: 'FAQ', content: <FAQStage faqs={faqs} /> },
];

export default function CodeReview() {
  return <Slideshow hero={hero} stages={stages} />;
}
