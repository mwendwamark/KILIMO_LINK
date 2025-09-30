import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check if user is already authenticated on initial load
  useEffect(() => {
    const token = authAPI.getAuthToken();
    if (token) {
      // Here you might want to fetch the current user's data
      // For now, we'll just set a basic user object
      setUser({ isAuthenticated: true });
    }
    setLoading(false);
  }, []);

  // Sign in function
  const signIn = async (credentials, userType, rememberMe = false) => {
    try {
      setLoading(true);
      setError(null);
      
      const { data } = userType === 'farmer' 
        ? await authAPI.farmer.signIn(credentials)
        : await authAPI.buyer.signIn(credentials);
      
      // Store the token
      if (data.token) {
        authAPI.storeAuthToken(data.token, rememberMe);
        setUser({ ...data.user, isAuthenticated: true });
      }
      
      return data;
    } catch (err) {
      setError(err.message || 'Failed to sign in');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Sign up function
  const signUp = async (userData, userType) => {
    try {
      setLoading(true);
      setError(null);
      
      const { data } = userType === 'farmer'
        ? await authAPI.farmer.signUp(userData)
        : await authAPI.buyer.signUp(userData);
      
      return data;
    } catch (err) {
      setError(err.message || 'Failed to sign up');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Sign out function
  const signOut = async (userType) => {
    try {
      setLoading(true);
      
      // Call the appropriate sign out endpoint
      if (userType === 'farmer') {
        await authAPI.farmer.signOut();
      } else {
        await authAPI.buyer.signOut();
      }
      
      // Clear the stored token
      authAPI.clearAuthToken();
      setUser(null);
    } catch (err) {
      console.error('Error during sign out:', err);
      // Even if the API call fails, we should still clear the local state
      authAPI.clearAuthToken();
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // Forgot password
  const forgotPassword = async (email, userType) => {
    try {
      setLoading(true);
      setError(null);
      
      const { data } = userType === 'farmer'
        ? await authAPI.farmer.forgotPassword(email)
        : await authAPI.buyer.forgotPassword(email);
      
      return data;
    } catch (err) {
      setError(err.message || 'Failed to process forgot password request');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Reset password
  const resetPassword = async (password, passwordConfirmation, resetPasswordToken, userType) => {
    try {
      setLoading(true);
      setError(null);
      
      const { data } = userType === 'farmer'
        ? await authAPI.farmer.resetPassword(password, passwordConfirmation, resetPasswordToken)
        : await authAPI.buyer.resetPassword(password, passwordConfirmation, resetPasswordToken);
      
      return data;
    } catch (err) {
      setError(err.message || 'Failed to reset password');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Confirm email
  const confirmEmail = async (token) => {
    try {
      setLoading(true);
      setError(null);
      
      const { data } = await authAPI.confirmEmail(token);
      return data;
    } catch (err) {
      setError(err.message || 'Failed to confirm email');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    loading,
    error,
    isAuthenticated: !!user?.isAuthenticated,
    signIn,
    signUp,
    signOut,
    forgotPassword,
    resetPassword,
    confirmEmail,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
