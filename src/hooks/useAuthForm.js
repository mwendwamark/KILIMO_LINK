import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { handleApiError, extractValidationErrors } from '../utils/apiErrorHandler';

/**
 * Custom hook for handling authentication forms (login/signup)
 * 
 * @param {Object} options - Configuration options
 * @param {'login'|'signup'} options.formType - Type of form (login or signup)
 * @param {'farmer'|'buyer'} options.userType - Type of user (farmer or buyer)
 * @param {Function} [options.onSuccess] - Callback function to execute on successful submission
 * @returns {Object} Form state and handlers
 */
export const useAuthForm = ({ formType, userType, onSuccess }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn, signUp } = useAuth();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    // For signup
    firstName: '',
    lastName: '',
    phoneNumber: '',
    confirmPassword: '',
    // For password reset
    resetPasswordToken: '',
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState('');
  
  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    
    // Clear error for this field when user types
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined,
      }));
    }
    
    // Clear server error when user types
    if (serverError) {
      setServerError('');
    }
  };
  
  // Validate form fields
  const validateForm = () => {
    const newErrors = {};
    
    // Common validations for both login and signup
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    // Signup specific validations
    if (formType === 'signup') {
      if (!formData.firstName.trim()) {
        newErrors.firstName = 'First name is required';
      }
      
      if (!formData.lastName.trim()) {
        newErrors.lastName = 'Last name is required';
      }
      
      if (!formData.phoneNumber) {
        newErrors.phoneNumber = 'Phone number is required';
      } else if (!/^\+254\d{9}$/.test(formData.phoneNumber)) {
        newErrors.phoneNumber = 'Phone number must be in the format +254XXXXXXXXX';
      }
      
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    setServerError('');
    
    try {
      let response;
      
      if (formType === 'login') {
        // For login, we only need email and password
        response = await signIn(
          { 
            login: formData.email, 
            password: formData.password,
            remember_me: formData.rememberMe,
          },
          userType,
          formData.rememberMe
        );
      } else {
        // For signup, include all user data
        const userData = {
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          phone_number: formData.phoneNumber,
          password: formData.password,
          password_confirmation: formData.confirmPassword,
        };
        
        response = await signUp(userData, userType);
      }
      
      // If we have a success callback, call it
      if (onSuccess) {
        onSuccess(response);
      }
      
      // Redirect after successful login/signup
      const from = location.state?.from?.pathname || `/${userType}/dashboard`;
      navigate(from, { replace: true });
      
      return response;
    } catch (error) {
      console.error(`${formType} error:`, error);
      
      // Handle API errors
      const errorMessage = error.response?.data?.message || error.message || 'An error occurred';
      setServerError(errorMessage);
      
      // Handle validation errors
      if (error.response?.data?.errors) {
        const validationErrors = extractValidationErrors(error.response.data);
        setErrors(prev => ({
          ...prev,
          ...validationErrors,
        }));
      }
      
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return {
    formData,
    errors,
    serverError,
    isSubmitting,
    handleChange,
    handleSubmit,
    setFormData,
    setErrors,
    setServerError,
  };
};

export default useAuthForm;
