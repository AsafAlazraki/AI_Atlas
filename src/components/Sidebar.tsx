import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import clsx from 'clsx';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { primaryNav, footerNav, type NavEntry, type NavGroup, type NavLeaf } from '../lib/nav';

type Props = {
  collapsed: boolean;
  mobileOpen: boolean;
  onCloseMobile: () => void;
};

export default function Sidebar({ collapsed, mobileOpen, onCloseMobile }: Props) {
  return (
    <>
      {/* Mobile backdrop */}
      <div
        onClick={onCloseMobile}
        className={clsx(
          'fixed inset-0 z-30 bg-midnight-950/70 backdrop-blur-sm transition-opacity md:hidden',
          mobileOpen ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
        aria-hidden="true"
      />

      <aside
        className={clsx(
          'fixed inset-y-0 left-0 z-40 flex flex-col border-r border-midnight-800/80 bg-midnight-900/95 backdrop-blur-xl',
          'transition-[width,transform] duration-200 ease-out',
          collapsed ? 'md:w-16' : 'md:w-60',
          'w-60 md:translate-x-0',
          mobileOpen ? 'translate-x-0' : '-translate-x-full',
        )}
        aria-label="Primary navigation"
      >
        <BrandHeader collapsed={collapsed} onCloseMobile={onCloseMobile} />

        <nav className="flex-1 overflow-y-auto px-2 py-3">
          <ul className="space-y-1">
            {primaryNav.map((entry) => (
              <li key={entry.type === 'leaf' ? entry.to : entry.label}>
                <NavRow entry={entry} collapsed={collapsed} />
              </li>
            ))}
          </ul>
        </nav>

        <div className="border-t border-midnight-800/80 px-2 py-3">
          <ul className="space-y-1">
            {footerNav.map((entry) => (
              <li key={entry.type === 'leaf' ? entry.to : entry.label}>
                <NavRow entry={entry} collapsed={collapsed} />
              </li>
            ))}
          </ul>
          <div
            className={clsx(
              'mt-3 px-3 text-[11px] uppercase tracking-wider text-midnight-500',
              collapsed && 'md:hidden',
            )}
          >
            v0.0.1 · PhoenixDX
          </div>
        </div>
      </aside>
    </>
  );
}

function BrandHeader({
  collapsed,
  onCloseMobile,
}: {
  collapsed: boolean;
  onCloseMobile: () => void;
}) {
  return (
    <div className="flex h-16 items-center justify-between gap-2 border-b border-midnight-800/80 px-3">
      <div className="flex min-w-0 flex-1 items-center md:justify-start">
        {/* Wordmark — visible everywhere except desktop-collapsed */}
        <img
          src="/phoenixdx-wordmark.png"
          alt="PhoenixDX"
          draggable={false}
          className={clsx(
            'ml-1 h-7 w-auto select-none',
            collapsed && 'md:hidden',
          )}
        />
        {/* Icon-only — desktop-collapsed */}
        {collapsed && (
          <img
            src="/phoenixdx-icon.jpg"
            alt="PhoenixDX"
            draggable={false}
            className="hidden h-9 w-9 select-none rounded-lg shadow-sm md:mx-auto md:block"
          />
        )}
      </div>
      <button
        type="button"
        onClick={onCloseMobile}
        className="rounded-md p-1.5 text-midnight-300 hover:bg-midnight-800 hover:text-white md:hidden"
        aria-label="Close menu"
      >
        <XMarkIcon className="h-5 w-5" />
      </button>
    </div>
  );
}

function NavRow({ entry, collapsed }: { entry: NavEntry; collapsed: boolean }) {
  if (entry.type === 'leaf') return <LeafRow leaf={entry} collapsed={collapsed} />;
  return <GroupRow group={entry} collapsed={collapsed} />;
}

function LeafRow({
  leaf,
  collapsed,
  nested = false,
}: {
  leaf: NavLeaf;
  collapsed: boolean;
  nested?: boolean;
}) {
  return (
    <NavLink
      to={leaf.to}
      end={leaf.to === '/'}
      title={collapsed ? leaf.label : undefined}
      className={({ isActive }) =>
        clsx(
          'group relative flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
          nested && !collapsed && 'pl-10',
          isActive
            ? 'bg-phoenix-500/10 text-white'
            : 'text-midnight-300 hover:bg-midnight-800/60 hover:text-white',
        )
      }
    >
      {({ isActive }) => (
        <>
          {isActive && (
            <span className="absolute inset-y-1 left-0 w-0.5 rounded-full bg-phoenix-500" aria-hidden="true" />
          )}
          {!nested && (
            <leaf.icon
              className={clsx(
                'h-5 w-5 flex-shrink-0 transition-colors',
                isActive ? 'text-phoenix-400' : 'text-midnight-400 group-hover:text-white',
              )}
              aria-hidden="true"
            />
          )}
          {nested && (
            <span
              className={clsx(
                'h-1.5 w-1.5 flex-shrink-0 rounded-full transition-colors',
                isActive ? 'bg-phoenix-500' : 'bg-midnight-600 group-hover:bg-midnight-400',
                collapsed && 'md:hidden',
              )}
              aria-hidden="true"
            />
          )}
          <span className={clsx('truncate', collapsed && 'md:hidden')}>{leaf.label}</span>
        </>
      )}
    </NavLink>
  );
}

function GroupRow({ group, collapsed }: { group: NavGroup; collapsed: boolean }) {
  const { pathname } = useLocation();
  const isInGroup = pathname.startsWith(group.basePath);
  const [open, setOpen] = useState<boolean>(isInGroup);

  // Auto-open the group whenever a child route is entered.
  useEffect(() => {
    if (isInGroup) setOpen(true);
  }, [isInGroup]);

  // When the sidebar is collapsed on desktop, collapse the group visually.
  const childrenVisible = open && !collapsed;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        title={collapsed ? group.label : undefined}
        aria-expanded={childrenVisible}
        className={clsx(
          'group relative flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
          isInGroup
            ? 'bg-phoenix-500/10 text-white'
            : 'text-midnight-300 hover:bg-midnight-800/60 hover:text-white',
        )}
      >
        {isInGroup && (
          <span
            className="absolute inset-y-1 left-0 w-0.5 rounded-full bg-phoenix-500"
            aria-hidden="true"
          />
        )}
        <group.icon
          className={clsx(
            'h-5 w-5 flex-shrink-0 transition-colors',
            isInGroup ? 'text-phoenix-400' : 'text-midnight-400 group-hover:text-white',
          )}
          aria-hidden="true"
        />
        <span className={clsx('flex-1 truncate text-left', collapsed && 'md:hidden')}>
          {group.label}
        </span>
        <ChevronDownIcon
          className={clsx(
            'h-4 w-4 flex-shrink-0 text-midnight-500 transition-transform duration-200',
            childrenVisible && 'rotate-180',
            collapsed && 'md:hidden',
          )}
          aria-hidden="true"
        />
      </button>

      <div
        className={clsx(
          'grid transition-[grid-template-rows] duration-200 ease-out',
          childrenVisible ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
        )}
      >
        <ul className="overflow-hidden">
          <li className="pt-1">
            <ul className="space-y-1">
              {group.children.map((child) => (
                <li key={child.to}>
                  <LeafRow leaf={child} collapsed={collapsed} nested />
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </div>
    </>
  );
}
