import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./BuyerSignup.css";
import logo from "../../../../public/logo.svg";
import Img from "../../../assets/heroImg.webp";
import google from "../../../FirstTimer/assets/google.svg";
import apple from "../../../FirstTimer/assets/apple.svg";
import { authenticate, validateSignupForm } from "../../../services/api";

const BuyerSignup = () => {
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

    const result = await authenticate("buyer", "signup", {
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

    // toast.success(
    //   "Registration successful! Please check your email to confirm your account."
    // );
    // setTimeout(() => navigate("/buyers/login"), 3000);

    if (!result.success) {
      setServerError(result.error);
      return;
    }

    // Success - redirect to check email page
    navigate("/check-email", {
      state: {
        email: formData.email,
        userType: "buyer", // or "farmer" depending on which component
      },
    });
  };

  return (
    <div className="buyer-signup-page container min-h-viewport">
      <Link className="buyer-signup-logo" to="/">
        <img
          src={logo}
          alt="Kilimo Link"
          loading="eager"
          style={{ width: "auto", height: "50px" }}
        />
      </Link>
      <div className="buyer-signup-main-container">
        {serverError && (
          <div className="buyer-signup-error-alert">
            <div className="buyer-signup-error-icon">
              <svg
                className="buyer-signup-error-svg"
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
            <div className="buyer-signup-error-content">
              <h3 className="buyer-signup-error-title">{serverError}</h3>
            </div>
          </div>
        )}
        <div className="buyer-signup-form-wrapper">
          <form className="buyer-signup-form-fields" onSubmit={handleSubmit}>
            <div className="buyer-signup-header-section">
              <h2 className="buyer-signup-title section-title">Sign up</h2>
              <p className="buyer-signup-description">
                Start connecting with farmers and discover fresh produce across
                Kenya.
              </p>
            </div>
            <div className="buyer-signup-inputs">
              <div className="buyer-signup-names-grid">
                <div className="buyer-signup-field-wrapper">
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    autoComplete="given-name"
                    required
                    className={`buyer-signup-input ${
                      errors.firstName ? "buyer-signup-input-error" : ""
                    }`}
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                  {errors.firstName && (
                    <p className="buyer-signup-error-text">
                      {errors.firstName}
                    </p>
                  )}
                </div>
                <div className="buyer-signup-field-wrapper">
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    autoComplete="family-name"
                    required
                    className={`buyer-signup-input ${
                      errors.lastName ? "buyer-signup-input-error" : ""
                    }`}
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                  {errors.lastName && (
                    <p className="buyer-signup-error-text">{errors.lastName}</p>
                  )}
                </div>
              </div>

              <div className="buyer-signup-email-phone-row">
                <div className="buyer-signup-field-wrapper">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className={`buyer-signup-input ${
                      errors.email ? "buyer-signup-input-error" : ""
                    }`}
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {errors.email && (
                    <p className="buyer-signup-error-text">{errors.email}</p>
                  )}
                </div>
                <div className="buyer-signup-field-wrapper">
                  <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    autoComplete="tel"
                    required
                    className={`buyer-signup-input ${
                      errors.phoneNumber ? "buyer-signup-input-error" : ""
                    }`}
                    placeholder="Phone Number"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                  />
                  {errors.phoneNumber ? (
                    <p className="buyer-signup-error-text">
                      {errors.phoneNumber}
                    </p>
                  ) : (
                    <p className="buyer-signup-hint-text">
                      Format: +254XXXXXXXXX
                    </p>
                  )}
                </div>
              </div>

              <div className="buyer-signup-password-row">
                <div className="buyer-signup-field-wrapper">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    required
                    className={`buyer-signup-input ${
                      errors.password ? "buyer-signup-input-error" : ""
                    }`}
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  {errors.password ? (
                    <p className="buyer-signup-error-text">{errors.password}</p>
                  ) : (
                    <p className="buyer-signup-hint-text">
                      Must be at least 8 characters long
                    </p>
                  )}
                </div>
                <div className="buyer-signup-field-wrapper">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    autoComplete="new-password"
                    required
                    className={`buyer-signup-input ${
                      errors.confirmPassword ? "buyer-signup-input-error" : ""
                    }`}
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                  {errors.confirmPassword && (
                    <p className="buyer-signup-error-text">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="buyer-signup-terms-wrapper">
              <div className="buyer-signup-terms-checkbox-group">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  className="buyer-signup-terms-checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                />
                <label htmlFor="terms" className="buyer-signup-terms-label">
                  I agree to the{" "}
                  <Link to="/terms" className="buyer-signup-terms-link">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link to="/privacy" className="buyer-signup-terms-link">
                    Privacy Policy
                  </Link>
                </label>
              </div>
            </div>
            <div className="buyer-signup-submit-wrapper">
              <button
                type="submit"
                disabled={isSubmitting || !agreed}
                className={`buyer-signup-submit-btn ${
                  isSubmitting || !agreed ? "buyer-signup-submit-disabled" : ""
                }`}
              >
                {isSubmitting ? "Creating account..." : "Create Account"}
              </button>
            </div>
            <div className="buyer-signup-social-wrapper">
              <div className="buyer-signup-google-btn">
                <div className="buyer-signup-google-icon">
                  <img
                    src={google}
                    alt="Google"
                    loading="lazy"
                    style={{ width: "1.25rem", height: "1.25rem" }}
                  />
                </div>
                <span>Sign up with Google</span>
              </div>
              <div className="buyer-signup-apple-btn">
                <div className="buyer-signup-apple-icon">
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
            <div className="buyer-signup-divider-wrapper">
              <div className="buyer-signup-divider">
                <span className="buyer-signup-divider-text">
                  Already have an account?
                </span>
              </div>
              <div className="buyer-signup-login-link-wrapper">
                <Link to="/buyers/login" className="buyer-signup-login-link">
                  Login
                </Link>
              </div>
            </div>
          </form>
          <div className="buyer-signup-image-wrapper">
            <div className="buyer-signup-image-badge">Buyer's Account</div>
            <img
              src={Img}
              alt="Happy farmer with produce"
              className="buyer-signup-hero-image"
            />
            <div className="buyer-signup-image-overlay">
              <h3 className="buyer-signup-overlay-title">
                Your marketplace for trusted produce
              </h3>
              <p className="buyer-signup-overlay-description">
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

export default BuyerSignup;
