import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./FarmerLogin.css";
import logo from "../../../../public/logo.svg";
import Img from "../../../assets/heroImg.webp";
import google from "../../../FirstTimer/assets/google.svg";
import apple from "../../../FirstTimer/assets/apple.svg";
import {
  authenticate,
  validateLoginForm,
  storeAuthData,
} from "../../../services/api";

const FarmerLogin = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
    if (serverError) setServerError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateLoginForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    setServerError("");

    const result = await authenticate("farmer", "login", {
      login: formData.email,
      password: formData.password,
      remember_me: rememberMe,
    });

    setIsSubmitting(false);

    if (!result.success) {
      setServerError(result.error);
      return;
    }

    // Store auth data
    if (result.data.token) {
      storeAuthData(result.data.token, "farmer", result.data.user, rememberMe);
    }

    toast.success("Login successful! Redirecting...");
    setTimeout(() => navigate("/farmers/dashboard"), 1000);
  };

  return (
    <div className="farmer-login-page container min-h-viewport">
      <Link className="farmer-login-logo" to="/">
        <img
          src={logo}
          alt="Kilimo Link"
          loading="eager"
          style={{ width: "auto", height: "50px" }}
        />
      </Link>{" "}
      {serverError && (
        <div className="farmer-login-error-alert">
          <div className="farmer-login-error-icon">
            <svg
              className="farmer-login-error-svg"
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
          <div className="farmer-login-error-content">
            <h3 className="farmer-login-error-title">{serverError}</h3>
          </div>
        </div>
      )}
      <div className="farmer-login-main-container">
        <div className="farmer-login-form-wrapper container">
          <form className="farmer-login-form-fields" onSubmit={handleSubmit}>
            <div className="farmer-login-header-section">
              <h2 className="farmer-login-title section-title">Login</h2>
              <p className="farmer-login-description">
                Log in to start showcasing your farm produce and connect
                directly with buyers across Kenya.
              </p>
            </div>
            <div className="farmer-login-fields-group">
              <div className="farmer-login-field-wrapper">
                <label htmlFor="email-address" className="farmer-login-sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className={`farmer-login-input ${
                    errors.email ? "farmer-login-input-error" : ""
                  }`}
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && (
                  <p className="farmer-login-error-text">{errors.email}</p>
                )}
              </div>
              <div className="farmer-login-field-wrapper">
                <label htmlFor="password" className="farmer-login-sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className={`farmer-login-input ${
                    errors.password ? "farmer-login-input-error" : ""
                  }`}
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                />
                {errors.password && (
                  <p className="farmer-login-error-text">{errors.password}</p>
                )}
                <p className="farmer-login-password-hint">
                  Must be at least 8 characters
                </p>
              </div>
            </div>
            <div className="farmer-login-options-group">
              <div className="farmer-login-remember-wrapper">
                <input
                  id="remember-me"
                  name="rememberMe"
                  type="checkbox"
                  className="farmer-login-remember-checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <label
                  htmlFor="remember-me"
                  className="farmer-login-remember-label"
                >
                  Remember me
                </label>
              </div>
              <div className="farmer-login-forgot-wrapper">
                <Link
                  to="/farmers/forgot-password"
                  className="farmer-login-forgot-link"
                >
                  Forgot your password?
                </Link>
              </div>
            </div>
            <div className="farmer-login-submit-wrapper">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`farmer-login-submit-btn ${
                  isSubmitting ? "farmer-login-submit-disabled" : ""
                }`}
              >
                {isSubmitting ? "Signing in..." : "Login"}
              </button>
            </div>
            <div className="farmer-login-social-wrapper">
              <div className="farmer-login-google-btn">
                <div className="farmer-login-google-icon">
                  <img
                    src={google}
                    alt="Google"
                    loading="lazy"
                    style={{ width: "1.25rem", height: "1.25rem" }}
                  />
                </div>
                <span>Sign in with Google</span>
              </div>
              <div className="farmer-login-apple-btn">
                <div className="farmer-login-apple-icon">
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
            <div className="farmer-login-divider-wrapper">
              <div className="farmer-login-divider">
                <span className="farmer-login-divider-text">
                  Don't have an account?
                </span>
              </div>
              <div className="farmer-login-signup-link-wrapper">
                <Link to="/farmers/signup" className="farmer-login-signup-link">
                  Create an Account
                </Link>
              </div>
            </div>
            <div className="farmer-login-buyer-section">
              <div className="farmer-login-buyer-divider">
                <span className="farmer-login-buyer-divider-text">
                  Looking to buy produce?
                </span>
              </div>
              <div className="farmer-login-buyer-link-wrapper">
                <Link to="/buyers/login" className="farmer-login-buyer-link">
                  Sign in as a buyer
                </Link>
              </div>
            </div>
          </form>
          <div className="farmer-login-image-wrapper">
            <div className="farmer-login-image-badge">Farmer's Account</div>
            <img
              src={Img}
              alt="Happy farmer with produce"
              className="farmer-login-hero-image"
            />
            <div className="farmer-login-image-overlay">
              <h3 className="farmer-login-overlay-title">
                Sell smarter, not harder.
              </h3>
              <p className="farmer-login-overlay-description">
                List your crops, livestock, or produce, and let buyers reach you
                directly—no middlemen, no hidden costs.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmerLogin;
