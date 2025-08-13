import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './Components/P-Layout.jsx';
import Dashboard from './pages/P-Dashboard.jsx';
import GreenhouseManagement from './pages/P-GreenhouseManagement.jsx';
import InspectionManagement from './pages/P-InspectionManagement.jsx';
import FertilizingManagement from './pages/P-FertilizingManagement.jsx';
import PestDiseaseManagement from './pages/P-PestDiseaseManagement.jsx';
import MonitorControl from './pages/P-MonitorControl.jsx';
import Productivity from './pages/P-Productivity.jsx';
import Settings from './pages/P-Settings.jsx';
import { ThemeProvider } from './context/ThemeContext.jsx';
import { LanguageProvider } from './context/LanguageContext.jsx';
import './styles/App.css';

export function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <Routes>
          <Route path="/PlantManagement" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="greenhouse" element={<GreenhouseManagement />} />
            <Route path="inspection" element={<InspectionManagement />} />
            <Route path="fertilizing" element={<FertilizingManagement />} />
            <Route path="pest-disease" element={<PestDiseaseManagement />} />
            <Route path="monitor-control" element={<MonitorControl />} />
            <Route path="productivity" element={<Productivity />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </LanguageProvider>
    </ThemeProvider>
  );
}
