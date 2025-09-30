/**
 * Handles API errors consistently across the application.
 * @param {Error} error - The error object from the API call
 * @param {string} [defaultMessage='An error occurred'] - Default error message if none is provided
 * @returns {Object} An object containing error details
 */
export const handleApiError = (error, defaultMessage = 'An error occurred') => {
  console.error('API Error:', error);
  
  // Check if it's a network error
  if (error.message === 'Failed to fetch') {
    return {
      message: 'Network error. Please check your internet connection and try again.',
      status: 0,
      isNetworkError: true,
    };
  }

  // Check if it's a server error response with status code
  if (error.response) {
    const { status, data } = error.response;
    
    // Handle different HTTP status codes
    switch (status) {
      case 400:
        return {
          message: data.message || 'Bad request. Please check your input and try again.',
          status,
          errors: data.errors,
        };
      case 401:
        return {
          message: data.message || 'You are not authorized to access this resource.',
          status,
          isUnauthorized: true,
        };
      case 403:
        return {
          message: data.message || 'You do not have permission to perform this action.',
          status,
          isForbidden: true,
        };
      case 404:
        return {
          message: data.message || 'The requested resource was not found.',
          status,
          isNotFound: true,
        };
      case 422:
        return {
          message: data.message || 'Validation failed. Please check your input.',
          status,
          errors: data.errors,
          isValidationError: true,
        };
      case 429:
        return {
          message: 'Too many requests. Please try again later.',
          status,
          isRateLimit: true,
        };
      case 500:
      case 502:
      case 503:
      case 504:
        return {
          message: 'The server encountered an error. Please try again later.',
          status,
          isServerError: true,
        };
      default:
        return {
          message: data?.message || defaultMessage,
          status,
        };
    }
  }

  // Handle other types of errors
  return {
    message: error.message || defaultMessage,
    isUnknownError: true,
  };
};

/**
 * Extracts validation errors from the API response
 * @param {Object} error - The error object from the API call
 * @returns {Object} An object with field names as keys and error messages as values
 */
export const extractValidationErrors = (error) => {
  if (!error || !error.errors) return {};
  
  // Handle Rails-style error format
  if (typeof error.errors === 'object' && !Array.isArray(error.errors)) {
    return error.errors;
  }
  
  // Handle array of error messages
  if (Array.isArray(error.errors)) {
    return { _error: error.errors.join(' ') };
  }
  
  // Handle string error message
  if (typeof error.errors === 'string') {
    return { _error: error.errors };
  }
  
  return { _error: 'Validation failed' };
};

/**
 * Displays an error message to the user using a toast or alert
 * @param {string|Object} error - The error message or error object
 * @param {Function} showToast - Function to show toast/notification (e.g., from react-toastify)
 */
export const showErrorToUser = (error, showToast) => {
  let message = 'An unexpected error occurred';
  
  if (typeof error === 'string') {
    message = error;
  } else if (error?.message) {
    message = error.message;
  } else if (error?.errors) {
    // Handle validation errors
    const errors = extractValidationErrors(error);
    const errorMessages = Object.values(errors).flat();
    message = errorMessages.join('\n');
  }
  
  if (showToast && typeof showToast === 'function') {
    showToast(message, { type: 'error' });
  } else {
    // Fallback to console or alert if no toast function is provided
    console.error('Error:', message);
    if (typeof window !== 'undefined') {
      alert(message);
    }
  }
};
