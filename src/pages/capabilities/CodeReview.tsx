/**
 * Code Review. Placeholder until content is filled in.
 *
 * INTENDED SLIDESHOW STRUCTURE (no-scroll, snap-to-fit):
 *
 *  1. Overview (HeroStage)
 *     - kicker: "AI Capabilities · PhoenixDX"
 *     - title: "Code" + accent "Review"
 *     - tagline: A project-aware code-review agent that catches what static
 *       analysis misses: security drift, architectural violations, team
 *       conventions. Senior engineers stop being a bottleneck on every typo.
 *     - 3 stat cards: Coverage / Senior time saved / Latency
 *
 *  2. What it catches (ContentStage + FeatureGrid 2x2)
 *     - Security (ShieldCheckIcon)
 *     - Architecture (CodeBracketIcon)
 *     - Team conventions (AdjustmentsHorizontalIcon)
 *     - Diff focus (ArrowsPointingInIcon)
 *
 *  3. In action (ContentStage + 4 example PR comments)
 *     - Each as a finding card with severity tag + body
 *
 *  4. Demo video (VideoStage)
 *     - storagePath: path.capabilityVideo('code-review', '...')
 *
 *  5. FAQ (FAQStage)
 *     - Replace humans? Noise? Conventions? Security/data? Workflow?
 *
 * See src/pages/capabilities/AtlassianRovo.tsx for a built example.
 */
import CapabilityComingSoon from '../../components/CapabilityComingSoon';

export default function CodeReview() {
  return (
    <CapabilityComingSoon
      kicker="AI Capabilities · PhoenixDX"
      title="Code"
      titleAccent="Review"
      tagline="A project-aware code-review agent that catches what static analysis misses: security drift, architectural violations, and team-specific conventions. Turns your senior engineers into the second pair of eyes on every PR, instead of the only pair."
    />
  );
}
