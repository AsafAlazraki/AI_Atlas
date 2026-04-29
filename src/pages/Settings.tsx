import { appEnv, firestorePrefix } from '../lib/env';

export default function Settings() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold tracking-tight text-ink-800">Settings</h1>
        <p className="mt-1 text-sm text-ink-500">Environment and runtime configuration.</p>
      </header>

      <div className="card divide-y divide-ink-100">
        <Row label="Environment" value={appEnv.toUpperCase()} />
        <Row label="Firestore prefix" value={firestorePrefix} />
        <Row
          label="Firebase project ID"
          value={import.meta.env.VITE_FIREBASE_PROJECT_ID || '(not set)'}
        />
        <Row label="Build" value={`v${import.meta.env.MODE}`} />
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between px-5 py-4">
      <div className="text-sm font-medium text-ink-600">{label}</div>
      <div className="text-sm font-mono text-ink-800">{value}</div>
    </div>
  );
}
