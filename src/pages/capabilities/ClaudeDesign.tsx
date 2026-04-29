/**
 * Claude Design. Placeholder until content is filled in.
 *
 * INTENDED SLIDESHOW STRUCTURE (no-scroll, snap-to-fit):
 *
 *  1. Overview (HeroStage)
 *     - kicker: "AI Capabilities · Anthropic"
 *     - title: "Claude" + accent "Design"
 *     - tagline: Conversational design with Claude. Generate live,
 *       interactive UI directly from a brief and iterate in plain English.
 *     - 3 stat cards: Time to first artifact / Iterations per session / Output format
 *
 *  2. What you can do (ContentStage + FeatureGrid 2x2)
 *     - Concept exploration (ChatBubbleLeftRightIcon)
 *     - Design-system priming (SwatchIcon)
 *     - Copy iteration (CursorArrowRaysIcon)
 *     - Prototyping (Squares2X2Icon)
 *
 *  3. (Optional) In action: example settings page in 3 minutes
 *
 *  4. Demo video (VideoStage)
 *     - storagePath: path.capabilityVideo('claude-design', '...')
 *
 *  5. FAQ (FAQStage)
 *     - Different from Spec to Design? Output format? Design system?
 *       When vs Figma? How customers get started?
 *
 * See src/pages/capabilities/AtlassianRovo.tsx for a built example.
 */
import CapabilityComingSoon from '../../components/CapabilityComingSoon';

export default function ClaudeDesign() {
  return (
    <CapabilityComingSoon
      kicker="AI Capabilities · Anthropic"
      title="Claude"
      titleAccent="Design"
      tagline="Conversational design with Claude. Generate live, interactive UI directly from a brief, iterate in plain English, and get a working component back in seconds, ready to copy into your codebase or your design system."
    />
  );
}
