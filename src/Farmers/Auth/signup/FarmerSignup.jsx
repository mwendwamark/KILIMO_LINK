import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./FarmerSignup.css";
import logo from "../../../../public/logo.svg";
import Img from "../../../assets/heroImg.webp";
import google from "../../../FirstTimer/assets/google.svg";
import apple from "../../../FirstTimer/assets/apple.svg";
import { authenticate, validateSignupForm } from "../../../services/api";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";

const FarmerSignup = () => {
  const navigate = useNavigate();
  const [agreed, setAgreed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
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

    if (!agreed) {
      toast.error("You must agree to the terms and conditions");
      return;
    }

    const validationErrors = validateSignupForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast.error("Please fix the errors in the form");
      return;
    }

    setIsSubmitting(true);
    setServerError("");

    const result = await authenticate("farmer", "signup", {
      first_name: formData.firstName,
      last_name: formData.lastName,
      email: formData.email,
      phone_number: formData.phoneNumber,
      password: formData.password,
      password_confirmation: formData.confirmPassword,
    });

    setIsSubmitting(false);

    if (!result.success) {
      setServerError(result.error);
      toast.error(result.error);
      return;
    }

    toast.success("Registration successful! Check your email.");
    navigate("/check-email", {
      state: {
        email: formData.email,
        userType: "farmer",
      },
    });
  };

  return (
    <div className="farmer-signup-page min-h-viewport">
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
      
      <div className="farmer-signup-content">
        <div className="farmer-signup-form-section">
          <Link className="farmer-signup-logo" to="/">
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

          <form className="farmer-signup-form" onSubmit={handleSubmit}>
            <div className="farmer-signup-header">
              <h2 className="section-title">Sign up</h2>
              <p className="farmer-signup-description">
                Start showcasing your farm produce and connect directly with buyers across Kenya.
              </p>
            </div>

            <div className="farmer-signup-fields">
              {/* Names Row - Always Horizontal */}
              <div className="farmer-signup-names-row">
                <div className="farmer-signup-field">
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    autoComplete="given-name"
                    required
                    className={`farmer-signup-input ${errors.firstName ? "input-error" : ""}`}
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                  {errors.firstName && <span className="field-error-text">{errors.firstName}</span>}
                </div>
                <div className="farmer-signup-field">
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    autoComplete="family-name"
                    required
                    className={`farmer-signup-input ${errors.lastName ? "input-error" : ""}`}
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                  {errors.lastName && <span className="field-error-text">{errors.lastName}</span>}
                </div>
              </div>

              {/* Email & Phone - Always Vertical */}
              <div className="farmer-signup-field">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className={`farmer-signup-input ${errors.email ? "input-error" : ""}`}
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && <span className="field-error-text">{errors.email}</span>}
              </div>

              <div className="farmer-signup-field">
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  autoComplete="tel"
                  required
                  className={`farmer-signup-input ${errors.phoneNumber ? "input-error" : ""}`}
                  placeholder="Phone Number"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                />
                {errors.phoneNumber ? (
                  <span className="field-error-text">{errors.phoneNumber}</span>
                ) : (
                  <span className="hint-text">Format: +254XXXXXXXXX</span>
                )}
              </div>

              {/* Password Row - Horizontal on larger screens, vertical on mobile */}
              <div className="farmer-signup-password-row">
                <div className="farmer-signup-field">
                  <div className="farmer-signup-password-wrapper">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="new-password"
                      required
                      className={`farmer-signup-input ${errors.password ? "input-error" : ""}`}
                      placeholder="Password"
                      value={formData.password}
                      onChange={handleChange}
                    />
                    <button
                      type="button"
                      className="farmer-signup-password-toggle"
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
                <div className="farmer-signup-field">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    autoComplete="new-password"
                    required
                    className={`farmer-signup-input ${errors.confirmPassword ? "input-error" : ""}`}
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                  {errors.confirmPassword && <span className="field-error-text">{errors.confirmPassword}</span>}
                </div>
              </div>
            </div>

            <div className="farmer-signup-terms">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                className="farmer-signup-checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
              />
              <label htmlFor="terms" className="farmer-signup-terms-label">
                I agree to the <Link to="/terms" className="farmer-signup-link">Terms of Service</Link> and{" "}
                <Link to="/privacy" className="farmer-signup-link">Privacy Policy</Link>
              </label>
            </div>

            <button
              type="submit"
              disabled={isSubmitting || !agreed}
              className="farmer-signup-submit"
            >
              {isSubmitting ? "Creating account..." : "Create Account"}
            </button>

            <div className="farmer-signup-social">
              <button type="button" className="farmer-signup-social-btn">
                <img src={google} alt="Google" />
                <span>Sign up with Google</span>
              </button>
              <button type="button" className="farmer-signup-social-btn">
                <img src={apple} alt="Apple" />
                <span>Sign up with Apple</span>
              </button>
            </div>

            <div className="farmer-signup-footer">
              <span className="farmer-signup-footer-text">Already have an account?</span>
              <Link to="/farmers/login" className="farmer-signup-link">Login</Link>
            </div>

            <div className="farmer-signup-footer">
              <span className="farmer-signup-footer-text">Are you a buyer?</span>
              <Link to="/buyers/signup" className="farmer-signup-link">Sign up as a buyer</Link>
            </div>
          </form>
        </div>

        <div className="farmer-signup-image-section">
          <div className="farmer-signup-image-badge">Farmer's Account</div>
          <img src={Img} alt="Happy farmer with produce" className="farmer-signup-image" />
          <div className="farmer-signup-image-overlay">
            <div className="farmer-signup-overlay-content">
              <h3 className="farmer-signup-overlay-title">Sell smarter, not harder.</h3>
              <p className="farmer-signup-overlay-description">
                List your crops, livestock, or produce, and let buyers reach you directly—no middlemen, no hidden costs.
              </p>
            </div>
          </div>
          <button onClick={() => navigate("/select_role")} className="farmer-signup-back-btn">
            <ArrowLeft size={18} />
            <span>Back to Roles</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FarmerSignup;