/**
 * Spec to Design — placeholder until content is filled in.
 *
 * INTENDED SLIDESHOW STRUCTURE (no-scroll, snap-to-fit):
 *
 *  1. Overview (HeroStage)
 *     - kicker: "AI Capabilities · PhoenixDX"
 *     - title: "Spec to" + accent "Design"
 *     - tagline: Turn product requirements and user stories into Figma-ready
 *       wireframes and high-fidelity designs in minutes — grounded in your
 *       design system, not someone else's.
 *     - 3 stat cards: Time to v0 / Design system fidelity / Iteration speed
 *
 *  2. The pipeline (ContentStage + FeatureGrid 2x2)
 *     - 1 — Parse spec (DocumentTextIcon)
 *     - 2 — Map flows (ArrowsRightLeftIcon)
 *     - 3 — Wireframe (Squares2X2Icon)
 *     - 4 — Apply design system (PaintBrushIcon)
 *
 *  3. In action — example settings page from a real engagement
 *
 *  4. Demo video (VideoStage)
 *     - storagePath: path.capabilityVideo('spec-to-design', '...')
 *
 *  5. FAQ (FAQStage)
 *     - Inputs? Design system grounding? Output format? Replace designers?
 *
 * See src/pages/capabilities/AtlassianRovo.tsx for a built example.
 */
import CapabilityComingSoon from '../../components/CapabilityComingSoon';

export default function SpecToDesign() {
  return (
    <CapabilityComingSoon
      kicker="AI Capabilities · PhoenixDX"
      title="Spec to"
      titleAccent="Design"
      tagline="Turn product requirements and user stories into Figma-ready wireframes and high-fidelity designs in minutes — grounded in your design system, not someone else's."
    />
  );
}
