import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from './components/DashboardLayout';
import Dashboard from './pages/Dashboard';
import Capabilities from './pages/Capabilities';
import Rovo from './pages/capabilities/Rovo';
import MultiAgentAnalysis from './pages/capabilities/MultiAgentAnalysis';
import CodeReview from './pages/capabilities/CodeReview';
import AutomatedTesting from './pages/capabilities/AutomatedTesting';
import DocumentationGeneration from './pages/capabilities/DocumentationGeneration';
import SpecToDesign from './pages/capabilities/SpecToDesign';
import ClaudeDesign from './pages/capabilities/ClaudeDesign';
import ReleaseNotes from './pages/capabilities/ReleaseNotes';
import Settings from './pages/Settings';

export default function App() {
  return (
    <Routes>
      <Route element={<DashboardLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="capabilities">
          <Route index element={<Capabilities />} />
          <Route path="rovo" element={<Rovo />} />
          <Route path="multi-agent-analysis" element={<MultiAgentAnalysis />} />
          <Route path="code-review" element={<CodeReview />} />
          <Route path="automated-testing" element={<AutomatedTesting />} />
          <Route path="documentation-generation" element={<DocumentationGeneration />} />
          <Route path="spec-to-design" element={<SpecToDesign />} />
          <Route path="claude-design" element={<ClaudeDesign />} />
          <Route path="release-notes" element={<ReleaseNotes />} />
        </Route>
        <Route path="settings" element={<Settings />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
