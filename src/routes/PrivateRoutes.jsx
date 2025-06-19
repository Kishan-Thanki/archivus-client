// src/Routes/PrivateRoutes.jsx
import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { ROUTES, USER_ROLES } from '../config/constants';
import LoadingSpinner from '../components/common/LoadingSpinner';

/**
 * Role hierarchy for minimalRole checks
 * Higher indexes have more privileges
 */
const ROLE_HIERARCHY = [
  USER_ROLES.STUDENT,
  USER_ROLES.DOCUMENT_REVIEWER,
  USER_ROLES.ACADEMIC_MANAGER,
  USER_ROLES.STAFF,
  USER_ROLES.ADMIN
];

const PrivateRoute = ({ 
  children, 
  roles = [], 
  minimalRole 
}) => {
  const { user, loading, hasRole } = useContext(AuthContext);

  if (loading) return <LoadingSpinner />;
  if (!user) return <Navigate to={ROUTES.LOGIN} replace />;

  // Check if user has any of the required roles
  const hasRequiredRole = roles.length === 0 || roles.some(hasRole);
  
  // Check if user meets minimal role requirement
  const meetsMinimalRole = !minimalRole || (
    ROLE_HIERARCHY.indexOf(user.role) >= 
    ROLE_HIERARCHY.indexOf(minimalRole)
  );

  if (!hasRequiredRole || !meetsMinimalRole) {
    return <Navigate to={ROUTES.UNAUTHORIZED} replace />;
  }

  return children;
};

export default PrivateRoute;