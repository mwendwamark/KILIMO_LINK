import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { resetPassword } from '../../services/api';
import "./ResetPassword.css";
import logo from "../../../public/logo.svg";

const ResetPassword = ({ userType = 'buyer' }) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [resetToken, setResetToken] = useState('');

  useEffect(() => {
    const token = searchParams.get('reset_password_token');
    if (!token) {
      setError('Invalid or expired reset link. Please request a new one.');
      return;
    }
    setResetToken(token);
  }, [searchParams]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (password !== passwordConfirmation) {
      setError("Passwords don't match");
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await resetPassword(resetToken, password, passwordConfirmation, userType);
      if (response.success) {
        setSuccess(true);
        // Auto-redirect after 3 seconds
        setTimeout(() => {
          navigate(`/${userType}s/login`);
        }, 3000);
      } else {
        setError(response.errors?.join(' ') || 'Failed to reset password. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again later.');
      console.error('Password reset error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Invalid reset link state
  if (error && !resetToken) {
    return (
      <div className="reset-password-page">
        <div className="reset-password-container">
          <Link className="reset-password-logo" to="/">
            <img src={logo} alt="Kilimo Link" loading="eager" />
          </Link>
          
          <div className="reset-password-error-container">
            <h2 className="reset-password-error-title">Invalid Reset Link</h2>
            <p className="reset-password-error-text">{error}</p>
            <button
              onClick={() => navigate(`/${userType}/forgot-password`)}
              className="reset-password-link"
            >
              Request a new reset link
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Success state
  if (success) {
    return (
      <div className="reset-password-page">
        <div className="reset-password-container">
          <Link className="reset-password-logo" to="/">
            <img src={logo} alt="Kilimo Link" loading="eager" />
          </Link>
          
          <div className="reset-password-success">
            <svg
              className="reset-password-success-icon"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
            <h2 className="reset-password-success-title">Password Reset Successful</h2>
            <p className="reset-password-success-text">
              Your password has been updated successfully. Redirecting to login page...
            </p>
            <button
              onClick={() => navigate(`/${userType}/login`)}
              className="reset-password-link"
            >
              Go to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Main reset form
  return (
    <div className="reset-password-page">
      <div className="reset-password-container">
        <Link className="reset-password-logo" to="/">
          <img src={logo} alt="Kilimo Link" loading="eager" />
        </Link>
        
        <div className="reset-password-header">
          <h2 className="reset-password-title">Reset Your Password</h2>
          <p className="reset-password-description">
            Enter your new password below to secure your account.
          </p>
        </div>
        
        {error && (
          <div className="error-alert">
            <svg 
              className="error-alert-icon" 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path 
                fillRule="evenodd" 
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" 
                clipRule="evenodd" 
              />
            </svg>
            <div className="error-alert-content">
              <h3 className="error-alert-title">{error}</h3>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="reset-password-fields">
            <div className="reset-password-field">
              <label htmlFor="password" className="reset-password-label">
                New Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="reset-password-input"
                required
                minLength="8"
                autoComplete="new-password"
                placeholder="Enter new password"
              />
              <span className="hint-text">
                Must be at least 8 characters long
              </span>
            </div>

            <div className="reset-password-field">
              <label htmlFor="passwordConfirmation" className="reset-password-label">
                Confirm New Password
              </label>
              <input
                type="password"
                id="passwordConfirmation"
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                className="reset-password-input"
                required
                minLength="8"
                autoComplete="new-password"
                placeholder="Confirm new password"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="reset-password-submit"
          >
            {loading ? 'Resetting Password...' : 'Reset Password'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '1rem' }}>
          <button
            onClick={() => navigate(`/${userType}s/login`)}
            className="reset-password-link"
          >
            Back to Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;