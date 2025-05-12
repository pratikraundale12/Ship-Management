import React from 'react';
import { JobsStatusChart, MaintenanceStatusChart } from './components/Dashboard/Charts'; 
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ShipsProvider } from './contexts/ShipsContext';
import { ComponentsProvider } from './contexts/ComponentsContext';
import { JobsProvider } from './contexts/JobsContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { EngineersProvider } from './contexts/EngineersContext';
import Navbar from './components/Navbar';

// Pages
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ShipsPage from './pages/ShipsPage';
import ShipDetailPage from './pages/ShipDetailPage';
import JobsPage from './pages/JobsPage';
import SignupPage from './pages/SignupPage';
import ComponentsPage from './components/Components/ComponentsPage';

// Sample ships data (if needed)
const sampleShips = [
  { id: 1, name: "Ocean Voyager", components: [] },
  { id: 2, name: "Pacific Star", components: [] },
  // ... other ships
];

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
};

const AppContent = () => {
  const { user } = useAuth();
  const location = useLocation();
  const hideNavbar = location.pathname === '/login' || location.pathname === '/signup';
  
  return (
    <>
      {user && !hideNavbar && <Navbar />}
      <div className="app">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route 
            path="/dashboard" 
            element={
              <PrivateRoute>
                <DashboardPage />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/ships" 
            element={
              <PrivateRoute>
                <ShipsPage />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/ships/:id" 
            element={
              <PrivateRoute>
                <ShipDetailPage />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/jobs" 
            element={
              <PrivateRoute>
                <JobsPage />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/components" 
            element={
              <PrivateRoute>
                <ComponentsPage />
              </PrivateRoute>
            } 
          />
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    </>
  );
};

const App = () => (
  <ThemeProvider>
    <Router>
      <AuthProvider>
        <ShipsProvider>
          <EngineersProvider>
            <ComponentsProvider>
              <JobsProvider>
                <AppContent />
              </JobsProvider>
            </ComponentsProvider>
          </EngineersProvider>
        </ShipsProvider>
      </AuthProvider>
    </Router>
  </ThemeProvider>
);

export default App;