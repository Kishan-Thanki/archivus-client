import { Routes, Route } from 'react-router-dom';

// Pages
import SignupPage from '../pages/SignUp/SignupPage.jsx';
import LoginPage from '../pages/Login/LoginPage.jsx';
import DashboardPage from '../pages/Dashboard/DashboardPage.jsx';
import AboutPage from '../pages/Aboutpage/AboutPage.jsx';
import ContactPage from '../pages/ContactPage/ContactPage.jsx';
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage.jsx';
import ProfilePage from '../pages/Profile/ProfilePage.jsx';
import ForgotPasswordPage from '../pages/ForgotPassword/ForgotPasswordPage.jsx';

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

      {/* Protected Routes (require login) */}
      <Route
        path="/"
        element={
          <PrivateRoute>
            <DashboardLayout />
          </PrivateRoute>
        }
      >
        {/* Nested Routes under DashboardLayout */}
        <Route index element={<DashboardPage />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="profile" element={<ProfilePage />} />
      </Route>

      {/* 404 Not Found Route */}
      <Route path="*" element={<NotFoundPage />} />

      {/* New route for forgot password */}
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
    </Routes>
  );
};

export default AppRoutes;
