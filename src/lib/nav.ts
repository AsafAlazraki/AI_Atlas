import {
  HomeIcon,
  SparklesIcon,
  RocketLaunchIcon,
  Cog6ToothIcon,
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
        label: 'Rovo',
        to: '/capabilities/rovo',
        icon: RocketLaunchIcon,
        description:
          'AI agents and enterprise search powered by your knowledge — across the SDLC.',
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
export const capabilityLeaves: NavLeaf[] =
  primaryNav
    .filter((e): e is NavGroup => e.type === 'group' && e.basePath === '/capabilities')
    .flatMap((g) => g.children);
