import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * A wrapper component that renders children only if the user is authenticated.
 * If not authenticated, it redirects to the login page.
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to render when authenticated
 * @param {string} [props.redirectTo='/login'] - Path to redirect to when not authenticated
 * @returns {React.ReactElement} Protected route component
 */
export const ProtectedRoute = ({ children, redirectTo = '/login' }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    // Show a loading indicator while checking authentication
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    // Redirect to the login page, but save the current location they were trying to go to
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  return children;
};

/**
 * A higher-order component that renders children only if the user has the required role.
 * If the user doesn't have the required role, it redirects to the specified path.
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to render when the user has the required role
 * @param {string} props.requiredRole - The role required to access the route (e.g., 'farmer', 'buyer')
 * @param {string} [props.redirectTo='/'] - Path to redirect to when the user doesn't have the required role
 * @returns {React.ReactElement} Role-based protected route component
 */
export const RoleBasedRoute = ({ 
  children, 
  requiredRole, 
  redirectTo = '/',
  userType // 'farmer' or 'buyer'
}) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div>Loading...</div>;
  }

  // Check if user is authenticated and has the required role
  const hasRequiredRole = user?.isAuthenticated && 
    Array.isArray(user.roles) && 
    user.roles.includes(requiredRole);

  if (!hasRequiredRole) {
    // Redirect to the specified path if the user doesn't have the required role
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  // Check if the user is trying to access the correct portal (farmer/buyer)
  if (userType && user.roles && !user.roles.includes(userType)) {
    // If user is a farmer trying to access buyer routes or vice versa, redirect to their dashboard
    const userDashboard = user.roles.includes('farmer') ? '/farmer/dashboard' : '/buyer/dashboard';
    return <Navigate to={userDashboard} state={{ from: location }} replace />;
  }

  return children;
};

export default {
  ProtectedRoute,
  RoleBasedRoute,
};
