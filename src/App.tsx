import { Routes, Route } from 'react-router-dom';
import DashboardLayout from './components/DashboardLayout';
import Dashboard from './pages/Dashboard';
import Capabilities from './pages/Capabilities';
import DemoLandscape from './pages/DemoLandscape';
import Settings from './pages/Settings';

export default function App() {
  return (
    <Routes>
      <Route element={<DashboardLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="capabilities" element={<Capabilities />} />
        <Route path="landscape" element={<DemoLandscape />} />
        <Route path="settings" element={<Settings />} />
        <Route path="*" element={<Dashboard />} />
      </Route>
    </Routes>
  );
}
