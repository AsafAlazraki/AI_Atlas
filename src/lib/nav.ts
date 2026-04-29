import {
  HomeIcon,
  SparklesIcon,
  RocketLaunchIcon,
  Cog6ToothIcon,
  UsersIcon,
  PaintBrushIcon,
  BeakerIcon,
  SwatchIcon,
  CodeBracketIcon,
  BookOpenIcon,
  MegaphoneIcon,
  CommandLineIcon,
} from '@heroicons/react/24/outline';
import type { ComponentType, SVGProps } from 'react';

export type Icon = ComponentType<SVGProps<SVGSVGElement>>;

export type NavLeaf = {
  type: 'leaf';
  label: string;
  to: string;
  icon: Icon;
  /** Short blurb shown on overview pages and hover tooltips. */
  description?: string;
};

export type NavGroup = {
  type: 'group';
  label: string;
  icon: Icon;
  /** Path used to mark the group active when on the overview/index page. */
  basePath: string;
  children: NavLeaf[];
};

export type NavEntry = NavLeaf | NavGroup;

/** Items rendered in the main scrollable nav region. */
export const primaryNav: NavEntry[] = [
  { type: 'leaf', label: 'Dashboard', to: '/', icon: HomeIcon },
  {
    type: 'group',
    label: 'AI Capabilities',
    icon: SparklesIcon,
    basePath: '/capabilities',
    children: [
      {
        type: 'leaf',
        label: 'Atlassian Rovo',
        to: '/capabilities/atlassian-rovo',
        icon: RocketLaunchIcon,
        description:
          'AI agents and enterprise search powered by your knowledge — across the SDLC.',
      },
      {
        type: 'leaf',
        label: 'Multi Agent Analysis',
        to: '/capabilities/multi-agent-analysis',
        icon: UsersIcon,
        description:
          'A team of specialised AI agents that analyse codebases, requirements, and architecture together — each agent owning a domain.',
      },
      {
        type: 'leaf',
        label: 'GitHub Copilot',
        to: '/capabilities/github-copilot',
        icon: CommandLineIcon,
        description:
          "GitHub's AI pair programmer — code completion, chat, multi-file planning, and autonomous agents, all where engineers already work.",
      },
      {
        type: 'leaf',
        label: 'Code Review',
        to: '/capabilities/code-review',
        icon: CodeBracketIcon,
        description:
          'Project-aware PR review that catches what static analysis misses — security drift, architecture violations, and team conventions.',
      },
      {
        type: 'leaf',
        label: 'Automated Testing',
        to: '/capabilities/automated-testing',
        icon: BeakerIcon,
        description:
          'Generate, maintain, and de-flake unit / integration / E2E tests — keeping suites green as the codebase evolves.',
      },
      {
        type: 'leaf',
        label: 'Documentation Generation',
        to: '/capabilities/documentation-generation',
        icon: BookOpenIcon,
        description:
          'Auto-generate READMEs, API references, ADRs, and runbooks — and keep them in sync as code evolves.',
      },
      {
        type: 'leaf',
        label: 'Spec to Design',
        to: '/capabilities/spec-to-design',
        icon: PaintBrushIcon,
        description:
          'Turn product requirements and user stories into Figma-ready wireframes and high-fidelity designs in minutes.',
      },
      {
        type: 'leaf',
        label: 'Claude Design',
        to: '/capabilities/claude-design',
        icon: SwatchIcon,
        description:
          'Conversational design with Claude — generate live, interactive UI directly from a brief and iterate in plain English.',
      },
      {
        type: 'leaf',
        label: 'Release Notes Generation',
        to: '/capabilities/release-notes-generation',
        icon: MegaphoneIcon,
        description:
          'Compose customer-grade release notes from merged PRs and shipped tickets — grouped by audience, written in your voice.',
      },
    ],
  },
];

/** Items pinned to the bottom of the sidebar. */
export const footerNav: NavEntry[] = [
  { type: 'leaf', label: 'Settings', to: '/settings', icon: Cog6ToothIcon },
];

/** Flat list of every leaf — used by the topbar to resolve the current page title. */
export const allLeaves: NavLeaf[] = [
  ...primaryNav.flatMap((e) => (e.type === 'leaf' ? [e] : e.children)),
  ...footerNav.flatMap((e) => (e.type === 'leaf' ? [e] : e.children)),
];

/** All capability leaves — used to render the Capabilities overview. */
export const capabilityLeaves: NavLeaf[] = primaryNav
  .filter((e): e is NavGroup => e.type === 'group' && e.basePath === '/capabilities')
  .flatMap((g) => g.children);
