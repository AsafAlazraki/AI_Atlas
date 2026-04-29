import { useLocation } from 'react-router-dom';
import clsx from 'clsx';
import {
  Bars3Icon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import { appEnv } from '../lib/env';
import { navItems } from '../lib/nav';

type Props = {
  collapsed: boolean;
  onToggleCollapse: () => void;
  onOpenMobile: () => void;
};

const envStyles: Record<typeof appEnv, string> = {
  dev: 'bg-sky-50 text-sky-700 ring-sky-200',
  test: 'bg-amber-50 text-amber-800 ring-amber-200',
  prod: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
};

export default function Topbar({ collapsed, onToggleCollapse, onOpenMobile }: Props) {
  const { pathname } = useLocation();
  const current = navItems.find((i) =>
    i.to === '/' ? pathname === '/' : pathname.startsWith(i.to),
  );

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-ink-100 bg-surface/80 px-4 backdrop-blur sm:px-6">
      <button
        type="button"
        onClick={onOpenMobile}
        className="rounded-md p-2 text-ink-500 hover:bg-ink-50 hover:text-ink-800 md:hidden"
        aria-label="Open menu"
      >
        <Bars3Icon className="h-5 w-5" />
      </button>

      <button
        type="button"
        onClick={onToggleCollapse}
        className="hidden rounded-md p-2 text-ink-400 hover:bg-ink-50 hover:text-ink-700 md:inline-flex"
        aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        {collapsed ? (
          <ChevronDoubleRightIcon className="h-5 w-5" />
        ) : (
          <ChevronDoubleLeftIcon className="h-5 w-5" />
        )}
      </button>

      <div className="min-w-0 flex-1">
        <h1 className="truncate text-base font-semibold text-ink-800 sm:text-lg">
          {current?.label ?? 'PDX AI Atlas'}
        </h1>
      </div>

      <span
        className={clsx(
          'inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset',
          envStyles[appEnv],
        )}
        title={`Environment: ${appEnv}`}
      >
        <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-current opacity-70" aria-hidden="true" />
        {appEnv.toUpperCase()}
      </span>

      <button
        type="button"
        className="rounded-full p-1 text-ink-400 hover:bg-ink-50 hover:text-ink-700"
        aria-label="Account"
      >
        <UserCircleIcon className="h-7 w-7" />
      </button>
    </header>
  );
}
