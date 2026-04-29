/**
 * Release Notes Generation — placeholder until content is filled in.
 *
 * INTENDED SLIDESHOW STRUCTURE (no-scroll, snap-to-fit):
 *
 *  1. Overview (HeroStage)
 *     - kicker: "AI Capabilities · PhoenixDX"
 *     - title: "Release Notes" + accent "Generation"
 *     - tagline: Compose customer-grade release notes from merged PRs and
 *       shipped tickets — grouped by audience, written in your voice,
 *       ready to publish.
 *     - 3 stat cards: Time to draft / Audiences (two passes) / Voice match
 *
 *  2. How it works (ContentStage + FeatureGrid 2x2)
 *     - 1 Ingest (ListBulletIcon)
 *     - 2 Score by audience (TagIcon)
 *     - 3 Group + summarise (UserGroupIcon)
 *     - 4 Format for distribution (MegaphoneIcon)
 *
 *  3. (Optional) In action — sample release-note diff
 *
 *  4. Demo video (VideoStage)
 *     - storagePath: path.capabilityVideo('release-notes', '...')
 *
 *  5. FAQ (FAQStage)
 *     - Sources? Audience splitting? Voice? PM/marketing fit? Distribution?
 *
 * See src/pages/capabilities/AtlassianRovo.tsx for a built example.
 */
import CapabilityComingSoon from '../../components/CapabilityComingSoon';

export default function ReleaseNotes() {
  return (
    <CapabilityComingSoon
      kicker="AI Capabilities · PhoenixDX"
      title="Release Notes"
      titleAccent="Generation"
      tagline="Compose customer-grade release notes from merged PRs and shipped tickets — grouped by audience, written in your voice, ready to publish. Engineering managers stop dreading release day."
    />
  );
}
