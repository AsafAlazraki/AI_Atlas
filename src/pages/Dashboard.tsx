import { SparklesIcon, Squares2X2Icon, ServerStackIcon } from '@heroicons/react/24/outline';

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <section className="overflow-hidden rounded-2xl bg-gradient-to-br from-phoenix-700 via-phoenix-600 to-phoenix-500 p-8 text-white shadow-rise sm:p-10">
        <p className="text-xs font-semibold uppercase tracking-wider text-phoenix-100">
          PhoenixDX
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
          Welcome to PDX AI Atlas
        </h1>
        <p className="mt-3 max-w-2xl text-phoenix-50/90">
          A demo landscape showcasing PhoenixDX's AI capabilities across the
          software development lifecycle — from discovery and design through to
          delivery and operations.
        </p>
      </section>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard label="AI capabilities" value="—" icon={SparklesIcon} />
        <StatCard label="Demos available" value="—" icon={Squares2X2Icon} />
        <StatCard label="Active environments" value="3" icon={ServerStackIcon} />
      </section>

      <section className="card p-6">
        <h2 className="text-lg font-semibold text-ink-800">Getting started</h2>
        <p className="mt-1 text-sm text-ink-500">
          The Atlas is in its early bare-bones state. Use the navigation on the
          left to explore the AI Capabilities catalog and the Demo Landscape grid.
        </p>
        <ul className="mt-4 space-y-2 text-sm text-ink-600">
          <li className="flex items-start gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-phoenix-500" />
            Connect Firebase Auth and Firestore credentials in <code className="rounded bg-ink-50 px-1 py-0.5 text-xs">.env.local</code>.
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-phoenix-500" />
            Branch off <code className="rounded bg-ink-50 px-1 py-0.5 text-xs">dev</code> for new work; merge up to <code className="rounded bg-ink-50 px-1 py-0.5 text-xs">test</code>, then <code className="rounded bg-ink-50 px-1 py-0.5 text-xs">prod</code>.
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-phoenix-500" />
            Each branch reads its own Firestore collection set via <code className="rounded bg-ink-50 px-1 py-0.5 text-xs">VITE_FIRESTORE_PREFIX</code>.
          </li>
        </ul>
      </section>
    </div>
  );
}

function StatCard({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}) {
  return (
    <div className="card flex items-center gap-4 p-5">
      <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-phoenix-50 text-phoenix-600">
        <Icon className="h-6 w-6" aria-hidden="true" />
      </div>
      <div>
        <div className="text-xs font-medium uppercase tracking-wide text-ink-400">
          {label}
        </div>
        <div className="mt-0.5 text-2xl font-semibold text-ink-800">{value}</div>
      </div>
    </div>
  );
}
