import { useRef } from 'react';
import { appEnv, firestorePrefix } from '../lib/env';
import { useEntrance } from '../lib/useEntrance';

export default function Settings() {
  const scope = useRef<HTMLDivElement>(null);
  useEntrance(scope);

  return (
    <div ref={scope} className="space-y-8">
      <header>
        <p className="gsap-fade text-xs font-semibold uppercase tracking-[0.18em] text-phoenix-400">
          Configuration
        </p>
        <h1 className="gsap-fade mt-2 text-display-sm sm:text-display-md">Settings</h1>
        <p className="gsap-fade mt-3 max-w-2xl text-midnight-300">
          Environment and runtime configuration for this build.
        </p>
      </header>

      <div className="card gsap-fade divide-y divide-midnight-800 overflow-hidden">
        <Row label="Environment" value={appEnv.toUpperCase()} />
        <Row label="Firestore prefix" value={firestorePrefix} mono />
        <Row
          label="Firebase project ID"
          value={import.meta.env.VITE_FIREBASE_PROJECT_ID || '(not set)'}
          mono
        />
        <Row label="Build mode" value={import.meta.env.MODE} mono />
      </div>
    </div>
  );
}

function Row({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-4 px-5 py-4">
      <div className="text-sm font-medium text-midnight-300">{label}</div>
      <div className={mono ? 'font-mono text-sm text-white' : 'text-sm text-white'}>{value}</div>
    </div>
  );
}
