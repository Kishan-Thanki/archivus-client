import { Routes, Route } from 'react-router-dom';

// Pages
import SignupPage from '../pages/SignUp/SignupPage.jsx';
import LoginPage from '../pages/Login/LoginPage.jsx';
import DashboardPage from '../pages/Dashboard/DashboardPage.jsx';
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage.jsx';

// Layout
import DashboardLayout from '../components/layout/DashboardLayout.jsx';

// Auth wrapper
import PrivateRoute from './PrivateRoute.jsx';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/login" element={<LoginPage />} />

      {/* Protected Routes (wrapped in PrivateRoute) */}
      <Route
        path="/"
        element={
          <PrivateRoute>
            <DashboardLayout />
          </PrivateRoute>
        }
      >
        <Route index element={<DashboardPage />} />
        <Route path="dashboard" element={<DashboardPage />} />
      </Route>

      {/* Catch-all Route */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;
