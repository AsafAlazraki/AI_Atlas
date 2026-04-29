import {
  HomeIcon,
  SparklesIcon,
  Squares2X2Icon,
  Cog6ToothIcon,
} from '@heroicons/react/24/outline';
import type { ComponentType, SVGProps } from 'react';

export type NavItem = {
  label: string;
  to: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
};

export const navItems: NavItem[] = [
  { label: 'Dashboard', to: '/', icon: HomeIcon },
  { label: 'AI Capabilities', to: '/capabilities', icon: SparklesIcon },
  { label: 'Demo Landscape', to: '/landscape', icon: Squares2X2Icon },
  { label: 'Settings', to: '/settings', icon: Cog6ToothIcon },
];
