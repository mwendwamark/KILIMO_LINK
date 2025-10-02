import React, { useState } from "react";
import { Link, useNavigate, useLocation, NavLink } from "react-router-dom";
import { useAuthForm } from "../../../hooks/useAuthForm";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./BuyerLogin.css";
import logo from "../../../../public/logo.svg";
import Img from "../../../assets/heroImg.webp";
import google from "../../../FirstTimer/assets/google.svg";
import apple from "../../../FirstTimer/assets/apple.svg";

const BuyerLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [rememberMe, setRememberMe] = useState(false);

  const {
    formData,
    errors,
    serverError,
    isSubmitting,
    handleChange,
    handleSubmit,
  } = useAuthForm({
    formType: "login",
    userType: "buyer",
    onSuccess: () => {
      toast.success("Login successful! Redirecting...");
    },
  });

  const handleFormSubmit = async (e) => {
    try {
      await handleSubmit(e);
    } catch (error) {
      // Error is already handled by the useAuthForm hook
      console.error("Login error:", error);
    }
  };

  return (
    <div className="buyer-login-page container min-h-viewport">
      <NavLink className="buyer-login-logo" to="/">
        <img
          src={logo}
          alt="Kilimo Link"
          loading="eager"
          style={{ width: "auto", height: "50px" }}
        />
      </NavLink>
      <div className="buyer-login-main-container">
        {serverError && (
          <div className="buyer-login-error-alert">
            <div className="buyer-login-error-icon">
              <svg
                className="buyer-login-error-svg"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="buyer-login-error-content">
              <h3 className="buyer-login-error-title">{serverError}</h3>
            </div>
          </div>
        )}
        <div className="buyer-login-form-wrapper container">
          <form className="buyer-login-form-fields" onSubmit={handleFormSubmit}>
            <div className="buyer-login-header-section">
              <h2 className="buyer-login-title section-title">Login</h2>
              <p className="buyer-login-description">
                Log in to explore fresh listings, contact farmers directly, and
                enjoy authentic farm produce.
              </p>
            </div>
            <input type="hidden" name="remember" value="true" />
            <div className="buyer-login-fields-group">
              <div className="buyer-login-field-wrapper">
                <label htmlFor="email-address" className="buyer-login-sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className={`buyer-login-input ${
                    errors.email ? "buyer-login-input-error" : ""
                  }`}
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && (
                  <p className="buyer-login-error-text">{errors.email}</p>
                )}
              </div>
              <div className="buyer-login-field-wrapper">
                <label htmlFor="password" className="buyer-login-sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className={`buyer-login-input ${
                    errors.password ? "buyer-login-input-error" : ""
                  }`}
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                />
                {errors.password && (
                  <p className="buyer-login-error-text">{errors.password}</p>
                )}
                <p className="buyer-login-password-hint">
                  Must be at least 8 characters
                </p>
              </div>
            </div>
            <div className="buyer-login-options-group">
              <div className="buyer-login-remember-wrapper">
                <input
                  id="remember-me"
                  name="rememberMe"
                  type="checkbox"
                  className="buyer-login-remember-checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <label
                  htmlFor="remember-me"
                  className="buyer-login-remember-label"
                >
                  Remember me
                </label>
              </div>
              <div className="buyer-login-forgot-wrapper">
                <Link
                  to="/buyers/forgot-password"
                  className="buyer-login-forgot-link"
                >
                  Forgot your password?
                </Link>
              </div>
            </div>
            <div className="buyer-login-submit-wrapper">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`buyer-login-submit-btn ${
                  isSubmitting ? "buyer-login-submit-disabled" : ""
                }`}
              >
                {isSubmitting ? "Signing in..." : "Login"}
              </button>
            </div>
            <div className="buyer-login-social-wrapper">
              <div className="buyer-login-google-btn">
                <div className="buyer-login-google-icon">
                  <img
                    src={google}
                    alt="Google"
                    loading="lazy"
                    style={{ width: "1.25rem", height: "1.25rem" }}
                  />
                </div>
                <span>Sign in with Google</span>
              </div>
              <div className="buyer-login-apple-btn">
                <div className="buyer-login-apple-icon">
                  <img
                    src={apple}
                    alt="Apple"
                    loading="lazy"
                    style={{ width: "1.25rem", height: "1.25rem" }}
                  />
                </div>
                <span>Sign in with Apple</span>
              </div>
            </div>
            <div className="buyer-login-divider-wrapper">
              <div className="buyer-login-divider">
                <span className="buyer-login-divider-text">
                  Don't have an account?
                </span>
              </div>
              <div className="buyer-login-farmer-link-wrapper">
                <Link to="/buyers/signup" className="buyer-login-farmer-link">
                  Create an account
                </Link>
              </div>
            </div>
          </form>
          <div className="buyer-login-image-wrapper">
            <div className="buyer-login-image-badge">Buyer's Account</div>
            <img
              src={Img}
              alt="Happy farmer with produce"
              className="buyer-login-hero-image"
            />
            <div className="buyer-login-image-overlay">
              <h3 className="buyer-login-overlay-title">
                Your marketplace for trusted produce
              </h3>
              <p className="buyer-login-overlay-description">
                Easily discover crops, fruits, livestock from verified farmers
                across Kenya.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyerLogin;
