export default function Capabilities() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold tracking-tight text-ink-800">AI Capabilities</h1>
        <p className="mt-1 text-sm text-ink-500">
          The catalog of PhoenixDX AI capabilities across the SDLC. Populated from Firestore once data is wired up.
        </p>
      </header>

      <div className="card flex min-h-[280px] flex-col items-center justify-center p-10 text-center">
        <div className="mx-auto h-12 w-12 rounded-full bg-phoenix-50 ring-8 ring-phoenix-50/50" />
        <h2 className="mt-4 text-base font-semibold text-ink-800">No capabilities loaded yet</h2>
        <p className="mt-1 max-w-md text-sm text-ink-500">
          This page will list capabilities such as AI-assisted requirements,
          design generation, code review, test generation, and observability — read
          from the <code className="rounded bg-ink-50 px-1 py-0.5 text-xs">capabilities</code> collection.
        </p>
      </div>
    </div>
  );
}
