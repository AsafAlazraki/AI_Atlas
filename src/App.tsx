import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from './components/DashboardLayout';
import Dashboard from './pages/Dashboard';
import Capabilities from './pages/Capabilities';
import Rovo from './pages/capabilities/Rovo';
import Settings from './pages/Settings';

export default function App() {
  return (
    <Routes>
      <Route element={<DashboardLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="capabilities">
          <Route index element={<Capabilities />} />
          <Route path="rovo" element={<Rovo />} />
        </Route>
        <Route path="settings" element={<Settings />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
