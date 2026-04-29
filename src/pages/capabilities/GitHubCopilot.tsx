/**
 * GitHub Copilot. Placeholder until content is filled in.
 *
 * INTENDED SLIDESHOW STRUCTURE (no-scroll, snap-to-fit):
 *
 *  1. Overview (HeroStage)
 *     - kicker: "AI Capabilities · GitHub"
 *     - title: "GitHub" + accent "Copilot"
 *     - tagline: A pair programmer that lives where engineers already
 *       work (VS Code, JetBrains, Visual Studio, GitHub): code completion,
 *       chat, multi-step planning, and autonomous agents in one platform.
 *     - 3 stat cards: Surface area / Model choice / Adoption velocity
 *
 *  2. The four modes (ContentStage + FeatureGrid 2x2)
 *     - Code completion (CommandLineIcon)
 *     - Copilot Chat (ChatBubbleLeftRightIcon)
 *     - Copilot Workspace (Squares2X2Icon)
 *     - Copilot Agents (CpuChipIcon)
 *
 *  3. In action (ContentStage + 5-day weekly scenario)
 *     - Mon: autocomplete → Tue: chat → Wed: workspace → Thu: agent → Fri: review
 *
 *  4. Demo video (VideoStage)
 *     - storagePath: path.capabilityVideo('github-copilot', '...')
 *
 *  5. FAQ (FAQStage)
 *     - Which models? Modes? Codebase context? Data handling? Adoption metrics?
 *
 * See src/pages/capabilities/AtlassianRovo.tsx for a built example.
 */
import CapabilityComingSoon from '../../components/CapabilityComingSoon';

export default function GitHubCopilot() {
  return (
    <CapabilityComingSoon
      kicker="AI Capabilities · GitHub"
      title="GitHub"
      titleAccent="Copilot"
      tagline="A pair programmer that lives where your engineers already work (VS Code, JetBrains, Visual Studio, GitHub). Code completion, chat, multi-step planning, and autonomous agents in one platform. PhoenixDX deploys Copilot for enterprises that want measurable lift without forcing a tooling change."
    />
  );
}
