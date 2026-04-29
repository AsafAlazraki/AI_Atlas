/**
 * Automated Testing. Placeholder until content is filled in.
 *
 * INTENDED SLIDESHOW STRUCTURE (no-scroll, snap-to-fit):
 *
 *  1. Overview (HeroStage)
 *     - kicker: "AI Capabilities · PhoenixDX"
 *     - title: "Automated" + accent "Testing"
 *     - tagline: Generate, maintain, and de-flake unit / integration / E2E
 *       tests from specs and existing code paths. The goal isn't more tests;
 *       it's tests you trust.
 *     - 3 stat cards: Generation / Maintenance / Trust (flake-free)
 *
 *  2. The pipeline (ContentStage + FeatureGrid 2x2)
 *     - Generator (BeakerIcon)
 *     - Maintainer (ArrowPathIcon)
 *     - Flake hunter (ShieldCheckIcon)
 *     - Coverage strategist (ChartBarIcon)
 *
 *  3. In action (ContentStage + 4-step real-engagement scenario)
 *     - Spec ingest → Test generation → Human review → Maintenance kicks in
 *
 *  4. Demo video (VideoStage)
 *     - storagePath: path.capabilityVideo('automated-testing', '...')
 *
 *  5. FAQ (FAQStage)
 *     - Languages? Maintenance? Flakes? Coverage chasing? Human in the loop?
 *
 * See src/pages/capabilities/AtlassianRovo.tsx for a built example.
 */
import CapabilityComingSoon from '../../components/CapabilityComingSoon';

export default function AutomatedTesting() {
  return (
    <CapabilityComingSoon
      kicker="AI Capabilities · PhoenixDX"
      title="Automated"
      titleAccent="Testing"
      tagline="Generate unit, integration and end-to-end tests from specs and existing code paths, then keep them green as the codebase evolves. Less brittle than record-and-playback, smarter than scaffolded test stubs."
    />
  );
}
