/**
 * Multi Agent Analysis — placeholder until content is filled in.
 *
 * INTENDED SLIDESHOW STRUCTURE (no-scroll, snap-to-fit):
 *
 *  1. Overview (HeroStage)
 *     - kicker: "AI Capabilities · PhoenixDX"
 *     - title: "Multi Agent" + accent "Analysis"
 *     - tagline: A team of specialised AI agents that analyse a codebase,
 *       requirement set, or architecture together — each agent owning a domain
 *       (security, performance, accessibility, business logic) and converging
 *       on a single, evidence-backed report.
 *     - 3 stat cards: Specialise / Run in parallel / Reconcile
 *
 *  2. How it works (ContentStage + custom 5-step list)
 *     - 5-step pipeline: Ingest → Plan → Run → Reconcile → Report
 *
 *  3. The agents (ContentStage + FeatureGrid 2x2)
 *     - 4 specialised agents: Architecture, Security, Performance,
 *       Business Logic. Each card lists what they own + sample finding.
 *
 *  4. Demo video (VideoStage)
 *     - storagePath: path.capabilityVideo('multi-agent-analysis', '...')
 *
 *  5. FAQ (FAQStage)
 *     - Why multiple agents vs. one?
 *     - What agents are included?
 *     - What does the output look like?
 *     - How does this fit our workflow?
 *
 * See src/pages/capabilities/AtlassianRovo.tsx for a built example.
 */
import CapabilityComingSoon from '../../components/CapabilityComingSoon';

export default function MultiAgentAnalysis() {
  return (
    <CapabilityComingSoon
      kicker="AI Capabilities · PhoenixDX"
      title="Multi Agent"
      titleAccent="Analysis"
      tagline="A team of specialised AI agents that analyse a codebase, requirement set, or architecture together — each agent owning a domain (security, performance, accessibility, business logic) and converging on a single, evidence-backed report."
    />
  );
}
