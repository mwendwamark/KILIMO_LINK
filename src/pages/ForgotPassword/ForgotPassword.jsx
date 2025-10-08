import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { requestPasswordReset } from '../../services/api';
import "./ForgotPassword.css";
import logo from "../../../public/logo.svg";

const ForgotPassword = ({ userType = 'buyer' }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await requestPasswordReset(email, userType);
      if (response.success) {
        setSuccess(true);
      } else {
        setError(response.error || 'Failed to send reset instructions. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again later.');
      console.error('Password reset error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Success state
  if (success) {
    return (
      <div className="forgot-password-page">
        <div className="forgot-password-container">
          <Link className="forgot-password-logo" to="/">
            <img src={logo} alt="Kilimo Link" loading="eager" />
          </Link>
          
          <div className="forgot-password-success">
            <h2 className="forgot-password-success-title">Check Your Email</h2>
            <p className="forgot-password-success-text">
              We've sent password reset instructions to{' '}
              <span className="forgot-password-email-highlight">{email}</span>.
              Please check your email and follow the link to reset your password.
            </p>
            <p className="forgot-password-help-text">
              Didn't receive the email? Check your spam folder or
              <button 
                onClick={handleSubmit}
                className="forgot-password-resend-btn"
                disabled={loading}
              >
                {loading ? 'Sending...' : 'resend'}
              </button>
            </p>
            
            <div className="forgot-password-success-actions">
              <button
                onClick={() => navigate(`/${userType}/login`)}
                className="forgot-password-back-btn"
              >
                Back to Login
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Main form
  return (
    <div className="forgot-password-page">
      <div className="forgot-password-container">
        <Link className="forgot-password-logo" to="/">
          <img src={logo} alt="Kilimo Link" loading="eager" />
        </Link>
        
        <div className="forgot-password-header">
          <h2 className="forgot-password-title">Forgot Your Password?</h2>
          <p className="forgot-password-description">
            Enter your email address and we'll send you a link to reset your password.
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
          <div className="forgot-password-field">
            <label htmlFor="email" className="forgot-password-label">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="forgot-password-input"
              placeholder="Enter your email"
              required
              autoFocus
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="forgot-password-submit"
          >
            {loading ? 'Sending...' : 'Send Reset Instructions'}
          </button>
        </form>

        <div className="forgot-password-footer">
          <button
            onClick={() => navigate(`/${userType}s/login`)}
            className="forgot-password-link"
          >
            Back to Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;