import { Routes, Route } from 'react-router-dom';
import { ROUTES, USER_ROLES } from '../config/constants';

// Pages
import SignupPage from '../pages/SignUp/SignupPage';
import LoginPage from '../pages/Login/LoginPage';
import DashboardPage from '../pages/Dashboard/DashboardPage';
import UnauthorizedPage from '../pages/Errors/UnauthorizedPage';
import NotFoundPage from '../pages/Errors/NotFoundPage';

// Layout
import DashboardLayout from '../components/layout/DashboardLayout';

// Auth
import PrivateRoute from './PrivateRoutes';

const AppRoutes = () => (
  <Routes>
    {/* Public Routes */}
    <Route path={ROUTES.LOGIN} element={<LoginPage />} />
    <Route path={ROUTES.SIGNUP} element={<SignupPage />} />
    <Route path={ROUTES.UNAUTHORIZED} element={<UnauthorizedPage />} />

    {/* Protected Routes */}
    <Route
      path="/"
      element={
        <PrivateRoute>
          <DashboardLayout />
        </PrivateRoute>
      }
    >
      <Route index element={<DashboardPage />} />
      <Route path={ROUTES.DASHBOARD} element={<DashboardPage />} />
      
      {/* Additional protected routes can go here */}
    </Route>

    {/* Catch-all Route */}
    <Route path="*" element={<NotFoundPage />} />
  </Routes>
);

export default AppRoutes;