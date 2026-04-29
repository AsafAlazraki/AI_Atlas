import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { navItems } from '../lib/nav';

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
          'fixed inset-0 z-30 bg-ink-900/40 backdrop-blur-sm transition-opacity md:hidden',
          mobileOpen ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
        aria-hidden="true"
      />

      <aside
        className={clsx(
          'fixed inset-y-0 left-0 z-40 flex flex-col border-r border-ink-100 bg-surface',
          'transition-[width,transform] duration-200 ease-out',
          // Desktop width
          collapsed ? 'md:w-16' : 'md:w-60',
          // Mobile: drawer slides in
          'w-60 md:translate-x-0',
          mobileOpen ? 'translate-x-0' : '-translate-x-full',
        )}
        aria-label="Primary navigation"
      >
        <BrandHeader collapsed={collapsed} onCloseMobile={onCloseMobile} />

        <nav className="flex-1 overflow-y-auto px-2 py-3">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) =>
                    clsx(
                      'group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                      isActive
                        ? 'bg-phoenix-50 text-phoenix-700'
                        : 'text-ink-500 hover:bg-ink-50 hover:text-ink-800',
                    )
                  }
                  title={collapsed ? item.label : undefined}
                >
                  <item.icon className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
                  <span
                    className={clsx(
                      'truncate transition-opacity',
                      collapsed ? 'md:hidden' : 'opacity-100',
                    )}
                  >
                    {item.label}
                  </span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div
          className={clsx(
            'border-t border-ink-100 p-3 text-xs text-ink-400',
            collapsed && 'md:hidden',
          )}
        >
          <span>v0.0.1 · PhoenixDX</span>
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
    <div className="flex h-16 items-center justify-between gap-2 border-b border-ink-100 px-3">
      <div className="flex min-w-0 items-center gap-3">
        <div
          className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-phoenix-500 font-extrabold tracking-tight text-white shadow-sm"
          aria-hidden="true"
        >
          PDX
        </div>
        <div
          className={clsx(
            'min-w-0 leading-tight transition-opacity',
            collapsed ? 'md:hidden' : 'opacity-100',
          )}
        >
          <div className="truncate text-sm font-semibold text-ink-800">PDX AI Atlas</div>
          <div className="truncate text-xs text-ink-400">PhoenixDX</div>
        </div>
      </div>
      <button
        type="button"
        onClick={onCloseMobile}
        className="rounded-md p-1.5 text-ink-400 hover:bg-ink-50 hover:text-ink-700 md:hidden"
        aria-label="Close menu"
      >
        <XMarkIcon className="h-5 w-5" />
      </button>
    </div>
  );
}
