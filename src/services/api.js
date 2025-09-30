// Base API configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

// API endpoints configuration
const API_ENDPOINTS = {
  AUTH: {
    // Farmer auth endpoints
    FARMER: {
      SIGN_UP: `${API_BASE_URL}/farmers/signup`,
      SIGN_IN: `${API_BASE_URL}/farmers/login`,
      SIGN_OUT: `${API_BASE_URL}/farmers/logout`,
      FORGOT_PASSWORD: `${API_BASE_URL}/farmers/password`,
      RESET_PASSWORD: `${API_BASE_URL}/farmers/password`,
    },
    // Buyer auth endpoints
    BUYER: {
      SIGN_UP: `${API_BASE_URL}/buyers/signup`,
      SIGN_IN: `${API_BASE_URL}/buyers/login`,
      SIGN_OUT: `${API_BASE_URL}/buyers/logout`,
      FORGOT_PASSWORD: `${API_BASE_URL}/buyers/password`,
      RESET_PASSWORD: `${API_BASE_URL}/buyers/password`,
    },
    // Email confirmation
    CONFIRM_EMAIL: (token) => `${API_BASE_URL}/auth/confirmation?confirmation_token=${token}`,
  },
};

// Helper function for API calls
const apiCall = async (url, options = {}) => {
  const defaultOptions = {
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    // credentials: 'include', // Important for cookies/JWT
  };

  // Get auth token from storage if it exists
  const token = sessionStorage.getItem("authToken") || localStorage.getItem("authToken");
  if (token) {
    defaultOptions.headers["Authorization"] = `Bearer ${token}`;
  }

  const mergedOptions = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, mergedOptions);
    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(
        data.error || data.message || `HTTP error! status: ${response.status}`
      );
    }

    return { data };
  } catch (error) {
    console.error("API call failed:", error);
    throw error;
  }
};

// Auth API service
export const authAPI = {
  // Farmer authentication
  farmer: {
    signUp: (userData) => {
      return apiCall(API_ENDPOINTS.AUTH.FARMER.SIGN_UP, {
        method: "POST",
        body: JSON.stringify({ user: userData }),
      });
    },

    signIn: (credentials) => {
      return apiCall(API_ENDPOINTS.AUTH.FARMER.SIGN_IN, {
        method: "POST",
        body: JSON.stringify({ user: credentials }),
      });
    },

    signOut: () => {
      return apiCall(API_ENDPOINTS.AUTH.FARMER.SIGN_OUT, {
        method: "DELETE",
      });
    },

    forgotPassword: (email) => {
      return apiCall(API_ENDPOINTS.AUTH.FARMER.FORGOT_PASSWORD, {
        method: "POST",
        body: JSON.stringify({ user: { email } }),
      });
    },

    resetPassword: (password, passwordConfirmation, resetPasswordToken) => {
      return apiCall(API_ENDPOINTS.AUTH.FARMER.RESET_PASSWORD, {
        method: "PUT",
        body: JSON.stringify({
          user: {
            password,
            password_confirmation: passwordConfirmation,
            reset_password_token: resetPasswordToken,
          },
        }),
      });
    },
  },

  // Buyer authentication (same methods as farmer, but with buyer endpoints)
  buyer: {
    signUp: (userData) => {
      return apiCall(API_ENDPOINTS.AUTH.BUYER.SIGN_UP, {
        method: "POST",
        body: JSON.stringify({ user: userData }),
      });
    },

    signIn: (credentials) => {
      return apiCall(API_ENDPOINTS.AUTH.BUYER.SIGN_IN, {
        method: "POST",
        body: JSON.stringify({ user: credentials }),
      });
    },

    signOut: () => {
      return apiCall(API_ENDPOINTS.AUTH.BUYER.SIGN_OUT, {
        method: "DELETE",
      });
    },

    forgotPassword: (email) => {
      return apiCall(API_ENDPOINTS.AUTH.BUYER.FORGOT_PASSWORD, {
        method: "POST",
        body: JSON.stringify({ user: { email } }),
      });
    },

    resetPassword: (password, passwordConfirmation, resetPasswordToken) => {
      return apiCall(API_ENDPOINTS.AUTH.BUYER.RESET_PASSWORD, {
        method: "PUT",
        body: JSON.stringify({
          user: {
            password,
            password_confirmation: passwordConfirmation,
            reset_password_token: resetPasswordToken,
          },
        }),
      });
    },
  },

  // Common auth methods
  confirmEmail: (token) => {
    return apiCall(API_ENDPOINTS.AUTH.CONFIRM_EMAIL(token), {
      method: "GET",
    });
  },

  // Store auth tokens
  storeAuthToken: (token, rememberMe = false) => {
    if (rememberMe) {
      localStorage.setItem("authToken", token);
    } else {
      sessionStorage.setItem("authToken", token);
    }
  },

  // Clear auth tokens
  clearAuthToken: () => {
    localStorage.removeItem("authToken");
    sessionStorage.removeItem("authToken");
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    return !!(localStorage.getItem("authToken") || sessionStorage.getItem("authToken"));
  },

  // Get auth token
  getAuthToken: () => {
    return localStorage.getItem("authToken") || sessionStorage.getItem("authToken");
  },
};

export { API_BASE_URL, API_ENDPOINTS, apiCall };
