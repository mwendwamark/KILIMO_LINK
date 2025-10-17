// Base API configuration
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

// ==================== AUTHENTICATION HELPERS ====================

/**
 * Main authentication function - handles signup and login for both farmers and buyers
 * @param {string} userType - 'farmer' or 'buyer'
 * @param {string} action - 'signup' or 'login'
 * @param {object} data - Form data to send
 * @returns {Promise} - Response from the server
 */

export const authenticate = async (userType, action, data) => {
  const endpoint = `${API_BASE_URL}/${userType}s/${action}`;

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ user: data }),
    });

    const responseData = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: extractError(responseData),
        status: response.status,
      };
    }

    // Extract token from Authorization header
    const authHeader = response.headers.get("Authorization");
    const token = authHeader ? authHeader.replace("Bearer ", "") : null;

    // Success - include token in response
    return {
      success: true,
      data: {
        ...responseData,
        token: token, // Add token to the response data
      },
      status: response.status,
    };
  } catch (error) {
    console.error(`${action} error:`, error);
    return {
      success: false,
      error: "Network error. Please check your connection and try again.",
      status: 0,
    };
  }
};

/**
 * Extract error message from backend response
 * @param {object} data - Response data from backend
 * @returns {string} - Error message
 */
const extractError = (data) => {
  if (data.errors && Array.isArray(data.errors)) {
    return data.errors.join(". ");
  } else if (data.error) {
    return data.error;
  } else if (data.message) {
    return data.message;
  }
  return "An error occurred. Please try again.";
};

/**
 * Store authentication token
 * @param {string} token - JWT token
 * @param {string} userType - 'farmer' or 'buyer'
 * @param {object} user - User data
 * @param {boolean} rememberMe - Whether to use localStorage or sessionStorage
 */
export const storeAuthData = (token, userType, user, rememberMe = false) => {
  const storage = rememberMe ? localStorage : sessionStorage;

  storage.setItem("authToken", token);
  storage.setItem("userType", userType);
  storage.setItem("user", JSON.stringify(user));
};

/**
 * Clear authentication data
 */
export const clearAuthData = () => {
  localStorage.removeItem("authToken");
  localStorage.removeItem("userType");
  localStorage.removeItem("user");
  sessionStorage.removeItem("authToken");
  sessionStorage.removeItem("userType");
  sessionStorage.removeItem("user");
};

/**
 * Get current auth token
 * @returns {string|null} - Auth token or null
 */
export const getAuthToken = () => {
  return (
    localStorage.getItem("authToken") || sessionStorage.getItem("authToken")
  );
};

/**
 * Check if user is authenticated
 * @returns {boolean}
 */
export const isAuthenticated = () => {
  return !!getAuthToken();
};

/**
 * Get current user data
 * @returns {object|null}
 */
export const getCurrentUser = () => {
  const userStr =
    localStorage.getItem("user") || sessionStorage.getItem("user");
  return userStr ? JSON.parse(userStr) : null;
};

// ==================== FORM VALIDATION HELPERS ====================

/**
 * Validate email format
 * @param {string} email
 * @returns {string|null} - Error message or null if valid
 */
export const validateEmail = (email) => {
  if (!email.trim()) return "Email is required";
  if (!/\S+@\S+\.\S+/.test(email)) return "Email is invalid";
  return null;
};

/**
 * Validate password
 * @param {string} password
 * @returns {string|null} - Error message or null if valid
 */
export const validatePassword = (password) => {
  if (!password) return "Password is required";
  if (password.length < 8) return "Password must be at least 8 characters";
  return null;
};

/**
 * Validate phone number (Kenya format)
 * @param {string} phoneNumber
 * @returns {string|null} - Error message or null if valid
 */
export const validatePhoneNumber = (phoneNumber) => {
  if (!phoneNumber) return "Phone number is required";
  if (!/^\+254\d{9}$/.test(phoneNumber)) {
    return "Phone number must be in format +254XXXXXXXXX";
  }
  return null;
};

/**
 * Validate required field
 * @param {string} value
 * @param {string} fieldName
 * @returns {string|null} - Error message or null if valid
 */
export const validateRequired = (value, fieldName) => {
  if (!value || !value.trim()) return `${fieldName} is required`;
  return null;
};

/**
 * Validate form data for signup
 * @param {object} formData
 * @returns {object} - Object with field names as keys and error messages as values
 */
export const validateSignupForm = (formData) => {
  const errors = {};

  const firstNameError = validateRequired(formData.firstName, "First name");
  if (firstNameError) errors.firstName = firstNameError;

  const lastNameError = validateRequired(formData.lastName, "Last name");
  if (lastNameError) errors.lastName = lastNameError;

  const emailError = validateEmail(formData.email);
  if (emailError) errors.email = emailError;

  const phoneError = validatePhoneNumber(formData.phoneNumber);
  if (phoneError) errors.phoneNumber = phoneError;

  const passwordError = validatePassword(formData.password);
  if (passwordError) errors.password = passwordError;

  if (!formData.confirmPassword) {
    errors.confirmPassword = "Please confirm your password";
  } else if (formData.password !== formData.confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
  }

  return errors;
};

/**
 * Validate form data for login
 * @param {object} formData
 * @returns {object} - Object with field names as keys and error messages as values
 */
export const validateLoginForm = (formData) => {
  const errors = {};

  const emailError = validateEmail(formData.email);
  if (emailError) errors.email = emailError;

  const passwordError = validatePassword(formData.password);
  if (passwordError) errors.password = passwordError;

  return errors;
};

export const resendConfirmation = async (email, userType) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${userType}s/confirmation`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ user: { email } }),
    });

    const data = await response.json();
    return { success: response.ok, data };
  } catch (error) {
    return { success: false, error: "Network error" };
  }
};

// ==================== PASSWORD RESET ====================

/**
 * Request password reset email
 * @param {string} email - User's email
 * @param {string} userType - 'farmer' or 'buyer'
 * @returns {Promise<Object>}
 */
export const requestPasswordReset = async (email, userType) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${userType}s/password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        user: { email },
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: extractError(data),
        status: response.status,
      };
    }

    return {
      success: true,
      message: data.message,
      status: response.status,
    };
  } catch (error) {
    console.error("Password reset request error:", error);
    return {
      success: false,
      error: "Network error. Please check your connection and try again.",
      status: 0,
    };
  }
};

/**
 * Reset password with token
 * @param {string} token - Reset password token from email
 * @param {string} password - New password
 * @param {string} passwordConfirmation - Password confirmation
 * @param {string} userType - 'farmer' or 'buyer'
 * @returns {Promise<Object>}
 */
export const resetPassword = async (
  token,
  password,
  passwordConfirmation,
  userType
) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${userType}s/password`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        user: {
          reset_password_token: token,
          password,
          password_confirmation: passwordConfirmation,
        },
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: extractError(data),
        errors: data.errors,
        status: response.status,
      };
    }

    return {
      success: true,
      message: data.message,
      status: response.status,
    };
  } catch (error) {
    console.error("Password reset error:", error);
    return {
      success: false,
      error: "Network error. Please check your connection and try again.",
      status: 0,
    };
  }
};

// ==================== FARM CRUD ====================
const getAuthHeader = () => {
  const token = getAuthToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const getFarms = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/farmers/farms`, {
      headers: { ...getAuthHeader() },
    });
    const data = await res.json();
    return res.ok
      ? { success: true, data }
      : { success: false, error: extractError(data) };
  } catch (e) {
    return { success: false, error: "Network error" };
  }
};

export const getFarm = async (id) => {
  try {
    const res = await fetch(`${API_BASE_URL}/farmers/farms/${id}`, {
      headers: { ...getAuthHeader() },
    });
    const data = await res.json();
    return res.ok
      ? { success: true, data }
      : { success: false, error: extractError(data) };
  } catch (e) {
    return { success: false, error: "Network error" };
  }
};

export const createFarm = async (payload) => {
  try {
    const res = await fetch(`${API_BASE_URL}/farmers/farms`, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...getAuthHeader() },
      body: JSON.stringify({ farm: payload }),
    });
    const data = await res.json();
    return res.ok
      ? { success: true, data }
      : { success: false, error: extractError(data) };
  } catch (e) {
    return { success: false, error: "Network error" };
  }
};

export const updateFarm = async (id, payload) => {
  try {
    // Filter out non-editable fields
    const allowedFields = {
      farm_name: payload.farm_name,
      county: payload.county,
      sub_county: payload.sub_county,
      ward: payload.ward,
      farm_description: payload.farm_description,
      farm_type: payload.farm_type,
      farm_latitude: payload.farm_latitude,
      farm_longitude: payload.farm_longitude,
    };

    const res = await fetch(`${API_BASE_URL}/farmers/farms/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", ...getAuthHeader() },
      body: JSON.stringify({ farm: allowedFields }),
    });
    const data = await res.json();
    return res.ok
      ? { success: true, data }
      : { success: false, error: extractError(data) };
  } catch (e) {
    return { success: false, error: "Network error" };
  }
};
export const deleteFarm = async (id) => {
  try {
    const res = await fetch(`${API_BASE_URL}/farmers/farms/${id}`, {
      method: "DELETE",
      headers: { ...getAuthHeader() },
    });
    return res.ok
      ? { success: true }
      : { success: false, error: "Delete failed" };
  } catch (e) {
    return { success: false, error: "Network error" };
  }
};
// Replace the existing profile API functions in your services/api.js with these:

// ==================== PROFILE MANAGEMENT WITH FILE UPLOAD ====================

/**
 * Get farmer profile
 * @returns {Promise<Object>}
 */
export const getFarmerProfile = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/farmers/profile`, {
      headers: { ...getAuthHeader() },
    });
    const data = await res.json();
    return res.ok
      ? { success: true, data: data.profile }
      : { success: false, error: extractError(data) };
  } catch (e) {
    return { success: false, error: "Network error" };
  }
};
/**
 * Create or Update farmer profile with file upload support
 * @param {Object|FormData} payload - Profile data (can include File object for profile_picture)
 * @returns {Promise<Object>}
 */
export const updateFarmerProfile = async (payload) => {
  try {
    let formData;

    // Check if payload is already FormData (from file upload)
    if (payload instanceof FormData) {
      formData = payload;
    } else {
      // For regular object payload, convert to FormData
      formData = new FormData();
      Object.keys(payload).forEach((key) => {
        if (
          payload[key] !== null &&
          payload[key] !== undefined &&
          payload[key] !== ""
        ) {
          formData.append(`farmer_profile[${key}]`, payload[key]);
        }
      });
    }

    const res = await fetch(`${API_BASE_URL}/farmers/profile`, {
      method: "PUT",
      headers: {
        ...getAuthHeader(),
        // Don't set Content-Type - let browser set it with boundary for multipart/form-data
      },
      body: formData,
    });

    const data = await res.json();
    return res.ok
      ? { success: true, data: data.profile, message: data.message }
      : { success: false, error: extractError(data) };
  } catch (e) {
    return { success: false, error: "Network error" };
  }
};

/**
 * Delete farmer profile
 * @returns {Promise<Object>}
 */
export const deleteFarmerProfile = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/farmers/profile`, {
      method: "DELETE",
      headers: { ...getAuthHeader() },
    });
    const data = await res.json();
    return res.ok
      ? { success: true, message: data.message }
      : { success: false, error: extractError(data) };
  } catch (e) {
    return { success: false, error: "Network error" };
  }
};

/**
 * Get buyer profile
 * @returns {Promise<Object>}
 */
export const getBuyerProfile = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/buyers/profile`, {
      headers: { ...getAuthHeader() },
    });
    const data = await res.json();
    return res.ok
      ? { success: true, data: data.profile }
      : { success: false, error: extractError(data) };
  } catch (e) {
    return { success: false, error: "Network error" };
  }
};

/**
 * Create or Update buyer profile with file upload support
 * @param {Object|FormData} payload - Profile data (can include File object for profile_picture)
 * @returns {Promise<Object>}
 */
export const updateBuyerProfile = async (payload) => {
  try {
    let formData;

    // Check if payload is already FormData (from file upload)
    if (payload instanceof FormData) {
      formData = payload;
    } else {
      // For regular object payload, convert to FormData
      formData = new FormData();
      Object.keys(payload).forEach((key) => {
        if (
          payload[key] !== null &&
          payload[key] !== undefined &&
          payload[key] !== ""
        ) {
          formData.append(`buyer_profile[${key}]`, payload[key]);
        }
      });
    }

    const res = await fetch(`${API_BASE_URL}/buyers/profile`, {
      method: "PUT",
      headers: {
        ...getAuthHeader(),
        // Don't set Content-Type - let browser set it with boundary for multipart/form-data
      },
      body: formData,
    });

    const data = await res.json();
    return res.ok
      ? { success: true, data: data.profile, message: data.message }
      : { success: false, error: extractError(data) };
  } catch (e) {
    return { success: false, error: "Network error" };
  }
};
/**
 * Delete buyer profile
 * @returns {Promise<Object>}
 */
export const deleteBuyerProfile = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/buyers/profile`, {
      method: "DELETE",
      headers: { ...getAuthHeader() },
    });
    const data = await res.json();
    return res.ok
      ? { success: true, message: data.message }
      : { success: false, error: extractError(data) };
  } catch (e) {
    return { success: false, error: "Network error" };
  }
};
// ==================== LEGACY API (for other parts of your app) ====================

const API_ENDPOINTS = {
  AUTH: {
    FARMER: {
      SIGN_UP: `${API_BASE_URL}/farmers/signup`,
      SIGN_IN: `${API_BASE_URL}/farmers/login`,
      SIGN_OUT: `${API_BASE_URL}/farmers/logout`,
      FORGOT_PASSWORD: `${API_BASE_URL}/farmers/password`,
      RESET_PASSWORD: `${API_BASE_URL}/farmers/password`,
    },
    BUYER: {
      SIGN_UP: `${API_BASE_URL}/buyers/signup`,
      SIGN_IN: `${API_BASE_URL}/buyers/login`,
      SIGN_OUT: `${API_BASE_URL}/buyers/logout`,
      FORGOT_PASSWORD: `${API_BASE_URL}/buyers/password`,
      RESET_PASSWORD: `${API_BASE_URL}/buyers/password`,
    },
  },
};

export { API_BASE_URL, API_ENDPOINTS };
