import { useLocation } from 'react-router-dom';
import clsx from 'clsx';
import {
  Bars3Icon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import { appEnv } from '../lib/env';
import { allLeaves } from '../lib/nav';

type Props = {
  collapsed: boolean;
  onToggleCollapse: () => void;
  onOpenMobile: () => void;
};

const envStyles: Record<typeof appEnv, string> = {
  dev: 'bg-sky-500/10 text-sky-300 ring-sky-400/30',
  test: 'bg-amber-500/10 text-amber-300 ring-amber-400/30',
  prod: 'bg-emerald-500/10 text-emerald-300 ring-emerald-400/30',
};

export default function Topbar({ collapsed, onToggleCollapse, onOpenMobile }: Props) {
  const { pathname } = useLocation();
  const current =
    allLeaves.find((l) => (l.to === '/' ? pathname === '/' : pathname === l.to)) ??
    allLeaves.find((l) => pathname.startsWith(l.to) && l.to !== '/');

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-midnight-800/80 bg-midnight-950/70 px-4 backdrop-blur-xl sm:px-6">
      <button
        type="button"
        onClick={onOpenMobile}
        className="rounded-md p-2 text-midnight-300 hover:bg-midnight-800 hover:text-white md:hidden"
        aria-label="Open menu"
      >
        <Bars3Icon className="h-5 w-5" />
      </button>

      <button
        type="button"
        onClick={onToggleCollapse}
        className="hidden rounded-md p-2 text-midnight-400 hover:bg-midnight-800 hover:text-white md:inline-flex"
        aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        {collapsed ? (
          <ChevronDoubleRightIcon className="h-5 w-5" />
        ) : (
          <ChevronDoubleLeftIcon className="h-5 w-5" />
        )}
      </button>

      <div className="min-w-0 flex-1">
        <h1 className="truncate text-base font-semibold text-white sm:text-lg">
          {current?.label ?? 'PDX AI Atlas'}
        </h1>
      </div>

      <span
        className={clsx(
          'inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider ring-1 ring-inset',
          envStyles[appEnv],
        )}
        title={`Environment: ${appEnv}`}
      >
        <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-current" aria-hidden="true" />
        {appEnv}
      </span>

      <button
        type="button"
        className="rounded-full p-1 text-midnight-300 hover:bg-midnight-800 hover:text-white"
        aria-label="Account"
      >
        <UserCircleIcon className="h-7 w-7" />
      </button>
    </header>
  );
}
