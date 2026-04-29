/**
 * Documentation Generation — placeholder until content is filled in.
 *
 * INTENDED SLIDESHOW STRUCTURE (no-scroll, snap-to-fit):
 *
 *  1. Overview (HeroStage)
 *     - kicker: "AI Capabilities · PhoenixDX"
 *     - title: "Documentation" + accent "Generation"
 *     - tagline: Auto-generate the docs your team would write if they had
 *       time — READMEs, API references, ADRs, onboarding guides. Then keep
 *       them in sync as the code evolves, so nothing rots.
 *     - 3 stat cards: Generation / Maintenance / Onboarding time impact
 *
 *  2. Doc modes (ContentStage + FeatureGrid 2x2)
 *     - READMEs & guides (BookOpenIcon)
 *     - API references (CommandLineIcon)
 *     - ADRs (DocumentTextIcon)
 *     - Runbooks (ArrowPathRoundedSquareIcon)
 *
 *  3. (Optional) In action — repo-to-docs example
 *
 *  4. Demo video (VideoStage)
 *     - storagePath: path.capabilityVideo('documentation-generation', '...')
 *
 *  5. FAQ (FAQStage)
 *     - What docs? Sync? Voice match? Hallucinations? Privacy?
 *
 * See src/pages/capabilities/AtlassianRovo.tsx for a built example.
 */
import CapabilityComingSoon from '../../components/CapabilityComingSoon';

export default function DocumentationGeneration() {
  return (
    <CapabilityComingSoon
      kicker="AI Capabilities · PhoenixDX"
      title="Documentation"
      titleAccent="Generation"
      tagline="Auto-generate the docs your team would write if they had time — READMEs, API references, architecture decision records, onboarding guides. Then keep them in sync as the code evolves, so nothing rots."
    />
  );
}
