import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./BuyerLogin.css";
import logo from "../../../../public/logo.svg";
import Img from "../../../assets/heroImg.webp";
import google from "../../../FirstTimer/assets/google.svg";
import apple from "../../../FirstTimer/assets/apple.svg";
import { authenticate, validateLoginForm, storeAuthData } from "../../../services/api";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";

const BuyerLogin = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");

  // Auto-clear server error after 8 seconds
  useEffect(() => {
    if (serverError) {
      const timer = setTimeout(() => {
        setServerError("");
      }, 8000);
      return () => clearTimeout(timer);
    }
  }, [serverError]);

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
      toast.error("Please fix the errors in the form");
      return;
    }

    setIsSubmitting(true);
    setServerError("");

    const result = await authenticate("buyer", "login", {
      login: formData.email,
      password: formData.password,
      remember_me: rememberMe,
    });

    setIsSubmitting(false);

    if (!result.success) {
      setServerError(result.error);
      toast.error(result.error);
      return;
    }

    if (result.data.token) {
      storeAuthData(result.data.token, "buyer", result.data.user, rememberMe);
    }

    toast.success("Login successful! Redirecting...");
    setTimeout(() => navigate("/buyers/dashboard"), 1000);
  };

  return (
    <div className="buyer-login-page min-h-viewport">
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <div className="buyer-login-content">
        <div className="buyer-login-form-section">
          <Link className="buyer-login-logo" to="/">
            <img src={logo} alt="Kilimo Link" loading="eager" />
          </Link>

          {serverError && (
            <div className="error-alert">
              <svg className="error-alert-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
              </svg>
              <div className="error-alert-content">
                <h3 className="error-alert-title">{serverError}</h3>
              </div>
            </div>
          )}

          <form className="buyer-login-form" onSubmit={handleSubmit}>
            <div className="buyer-login-header">
              <h2 className="section-title">Login</h2>
              <p className="buyer-login-description">
                Log in to explore fresh listings, contact farmers directly, and enjoy authentic farm produce.
              </p>
            </div>

            <div className="buyer-login-fields">
              <div className="buyer-login-field">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className={`buyer-login-input ${errors.email ? "input-error" : ""}`}
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && <span className="field-error-text">{errors.email}</span>}
              </div>

              <div className="buyer-login-field">
                <div className="buyer-login-password-wrapper">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    className={`buyer-login-input ${errors.password ? "input-error" : ""}`}
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    className="buyer-login-password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {errors.password ? (
                  <span className="field-error-text">{errors.password}</span>
                ) : (
                  <span className="hint-text">Must be at least 8 characters</span>
                )}
              </div>
            </div>

            <div className="buyer-login-options">
              <div className="buyer-login-remember">
                <input
                  id="remember-me"
                  name="rememberMe"
                  type="checkbox"
                  className="buyer-login-checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <label htmlFor="remember-me" className="buyer-login-remember-label">
                  Remember me
                </label>
              </div>
              <Link to="/buyers/forgot-password" className="buyer-login-link">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="buyer-login-submit"
            >
              {isSubmitting ? "Signing in..." : "Login"}
            </button>

            <div className="buyer-login-social">
              <button type="button" className="buyer-login-social-btn">
                <img src={google} alt="Google" />
                <span>Sign in with Google</span>
              </button>
              <button type="button" className="buyer-login-social-btn">
                <img src={apple} alt="Apple" />
                <span>Sign in with Apple</span>
              </button>
            </div>

            <div className="buyer-login-footer">
              <span className="buyer-login-footer-text">Don't have an account?</span>
              <Link to="/buyers/signup" className="buyer-login-link">Create an account</Link>
            </div>

            <div className="buyer-login-footer">
              <span className="buyer-login-footer-text">Are you a farmer?</span>
              <Link to="/farmers/login" className="buyer-login-link">Sign in as a farmer</Link>
            </div>
          </form>
        </div>

        <div className="buyer-login-image-section">
          <div className="buyer-login-image-badge">Buyer's Account</div>
          <img src={Img} alt="Happy farmer with produce" className="buyer-login-image" />
          <div className="buyer-login-image-overlay">
            <div className="buyer-login-overlay-content">
              <h3 className="buyer-login-overlay-title">Your marketplace for trusted produce</h3>
              <p className="buyer-login-overlay-description">
                Easily discover crops, fruits, livestock from verified farmers across Kenya.
              </p>
            </div>
          </div>
          <button onClick={() => navigate("/select_role")} className="buyer-login-back-btn">
            <ArrowLeft size={18} />
            <span>Back to Roles</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuyerLogin;