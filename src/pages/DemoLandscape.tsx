export default function DemoLandscape() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold tracking-tight text-ink-800">Demo Landscape</h1>
        <p className="mt-1 text-sm text-ink-500">
          Interactive demos of PhoenixDX AI capabilities. Tiles will render from the <code className="rounded bg-ink-50 px-1 py-0.5 text-xs">demos</code> collection.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="card flex h-44 flex-col justify-between p-5">
            <div className="h-2 w-12 rounded-full bg-ink-100" />
            <div className="space-y-2">
              <div className="h-3 w-3/4 rounded bg-ink-100" />
              <div className="h-3 w-1/2 rounded bg-ink-100" />
            </div>
            <div className="h-1.5 w-full rounded-full bg-ink-50">
              <div className="h-full w-0 rounded-full bg-phoenix-500" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
