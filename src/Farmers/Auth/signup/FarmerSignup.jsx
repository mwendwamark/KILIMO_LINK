import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./FarmerSignup.css";
import logo from "../../../../public/logo.svg";
import Img from "../../../assets/heroImg.webp";
import google from "../../../FirstTimer/assets/google.svg";
import apple from "../../../FirstTimer/assets/apple.svg";
import { authenticate, validateSignupForm } from "../../../services/api";

const FarmerSignup = () => {
  const navigate = useNavigate();
  const [agreed, setAgreed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

    // if (!result.success) {
    //   setServerError(result.error);
    //   return;
    // }

    // toast.success("Registration successful! Please check your email to confirm your account.");
    // setTimeout(() => navigate("/farmers/login"), 3000);

    if (!result.success) {
      setServerError(result.error);
      return;
    }

    // Changed this part
    navigate("/check-email", {
      state: {
        email: formData.email,
        userType: "farmer",
      },
    });
  };

  return (
    <div className="farmer-signup-page container min-h-viewport">
      <Link className="farmer-signup-logo" to="/">
        <img
          src={logo}
          alt="Kilimo Link"
          loading="eager"
          style={{ width: "auto", height: "50px" }}
        />
      </Link>{" "}
      {serverError && (
        <div className="farmer-signup-error-alert">
          <div className="farmer-signup-error-icon">
            <svg
              className="farmer-signup-error-svg"
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
          <div className="farmer-signup-error-content">
            <h3 className="farmer-signup-error-title">{serverError}</h3>
          </div>
        </div>
      )}
      <div className="farmer-signup-main-container">
        <div className="farmer-signup-form-wrapper">
          <form className="farmer-signup-form-fields" onSubmit={handleSubmit}>
            <div className="farmer-signup-header-section">
              <h2 className="farmer-signup-title section-title">Sign up</h2>
              <p className="farmer-signup-description">
                Start showcasing your farm produce and connect directly with
                buyers across Kenya.
              </p>
            </div>
            <div className="farmer-signup-inputs">
              <div className="farmer-signup-names-grid">
                <div className="farmer-signup-field-wrapper">
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    autoComplete="given-name"
                    required
                    className={`farmer-signup-input ${
                      errors.firstName ? "farmer-signup-input-error" : ""
                    }`}
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                  {errors.firstName && (
                    <p className="farmer-signup-error-text">
                      {errors.firstName}
                    </p>
                  )}
                </div>
                <div className="farmer-signup-field-wrapper">
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    autoComplete="family-name"
                    required
                    className={`farmer-signup-input ${
                      errors.lastName ? "farmer-signup-input-error" : ""
                    }`}
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                  {errors.lastName && (
                    <p className="farmer-signup-error-text">
                      {errors.lastName}
                    </p>
                  )}
                </div>
              </div>

              <div className="farmer-signup-email-phone-row">
                <div className="farmer-signup-field-wrapper">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className={`farmer-signup-input ${
                      errors.email ? "farmer-signup-input-error" : ""
                    }`}
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {errors.email && (
                    <p className="farmer-signup-error-text">{errors.email}</p>
                  )}
                </div>
                <div className="farmer-signup-field-wrapper">
                  <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    autoComplete="tel"
                    required
                    className={`farmer-signup-input ${
                      errors.phoneNumber ? "farmer-signup-input-error" : ""
                    }`}
                    placeholder="Phone Number"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                  />
                  {errors.phoneNumber ? (
                    <p className="farmer-signup-error-text">
                      {errors.phoneNumber}
                    </p>
                  ) : (
                    <p className="farmer-signup-hint-text">
                      Format: +254XXXXXXXXX
                    </p>
                  )}
                </div>
              </div>

              <div className="farmer-signup-password-row">
                <div className="farmer-signup-field-wrapper">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    required
                    className={`farmer-signup-input ${
                      errors.password ? "farmer-signup-input-error" : ""
                    }`}
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  {errors.password ? (
                    <p className="farmer-signup-error-text">
                      {errors.password}
                    </p>
                  ) : (
                    <p className="farmer-signup-hint-text">
                      Must be at least 8 characters long
                    </p>
                  )}
                </div>
                <div className="farmer-signup-field-wrapper">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    autoComplete="new-password"
                    required
                    className={`farmer-signup-input ${
                      errors.confirmPassword ? "farmer-signup-input-error" : ""
                    }`}
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                  {errors.confirmPassword && (
                    <p className="farmer-signup-error-text">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="farmer-signup-terms-wrapper">
              <div className="farmer-signup-terms-checkbox-group">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  className="farmer-signup-terms-checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                />
                <label htmlFor="terms" className="farmer-signup-terms-label">
                  I agree to the{" "}
                  <Link to="/terms" className="farmer-signup-terms-link">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link to="/privacy" className="farmer-signup-terms-link">
                    Privacy Policy
                  </Link>
                </label>
              </div>
            </div>
            <div className="farmer-signup-submit-wrapper">
              <button
                type="submit"
                disabled={isSubmitting || !agreed}
                className={`farmer-signup-submit-btn ${
                  isSubmitting || !agreed ? "farmer-signup-submit-disabled" : ""
                }`}
              >
                {isSubmitting ? "Creating account..." : "Create Account"}
              </button>
            </div>
            <div className="farmer-signup-social-wrapper">
              <div className="farmer-signup-google-btn">
                <div className="farmer-signup-google-icon">
                  <img
                    src={google}
                    alt="Google"
                    loading="lazy"
                    style={{ width: "1.25rem", height: "1.25rem" }}
                  />
                </div>
                <span>Sign up with Google</span>
              </div>
              <div className="farmer-signup-apple-btn">
                <div className="farmer-signup-apple-icon">
                  <img
                    src={apple}
                    alt="Apple"
                    loading="lazy"
                    style={{ width: "1.25rem", height: "1.25rem" }}
                  />
                </div>
                <span>Sign up with Apple</span>
              </div>
            </div>
            <div className="farmer-signup-divider-wrapper">
              <div className="farmer-signup-divider">
                <span className="farmer-signup-divider-text">
                  Already have an account?
                </span>
              </div>
              <div className="farmer-signup-login-link-wrapper">
                <Link to="/farmers/login" className="farmer-signup-login-link">
                  Login
                </Link>
              </div>
            </div>
            <div className="farmer-signup-buyer-section">
              <div className="farmer-signup-buyer-divider">
                <span className="farmer-signup-buyer-divider-text">
                  Are you a buyer?
                </span>
              </div>
              <div className="farmer-signup-buyer-link-wrapper">
                <Link to="/buyers/signup" className="farmer-signup-buyer-link">
                  Sign up as a buyer
                </Link>
              </div>
            </div>
          </form>
          <div className="farmer-signup-image-wrapper">
            <div className="farmer-signup-image-badge">Farmer's Account</div>
            <img
              src={Img}
              alt="Happy farmer with produce"
              className="farmer-signup-hero-image"
            />
            <div className="farmer-signup-image-overlay">
              <h3 className="farmer-signup-overlay-title">
                Sell smarter, not harder.
              </h3>
              <p className="farmer-signup-overlay-description">
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

export default FarmerSignup;
