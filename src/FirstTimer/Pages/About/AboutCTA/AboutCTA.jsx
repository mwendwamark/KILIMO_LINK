import React from "react";
import { useNavigate } from "react-router-dom";
import "./AboutCTA.css";

const AboutCTA = () => {
  const navigate = useNavigate();

  return (
    <section className="about-cta">
      <div className="container">
        <div className="cta-content">
          <h2 className="cta-title">
            Ready to Transform Agriculture Together?
          </h2>
          <p className="cta-subtitle">
            Join thousands of farmers and buyers already using Kilimo Link to
            connect, trade, and grow.
          </p>
          <div className="cta-buttons">
            <button
              className="cta-btn cta-btn-primary"
              onClick={() => navigate("/farmers/signup")}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  d="M10 2L2 6V10C2 14 6 18 10 19C14 18 18 14 18 10V6L10 2Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Start Selling as a Farmer
            </button>
            <button
              className="cta-btn cta-btn-secondary"
              onClick={() => navigate("/buyers/signup")}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  d="M3 3H5L5.4 5M7 13H15L17 5H5.4M7 13L5.4 5M7 13L5.707 14.293C5.077 14.923 5.523 16 6.414 16H15M15 16C14.448 16 14 16.448 14 17C14 17.552 14.448 18 15 18C15.552 18 16 17.552 16 17C16 16.448 15.552 16 15 16ZM8 17C8 17.552 7.552 18 7 18C6.448 18 6 17.552 6 17C6 16.448 6.448 16 7 16C7.552 16 8 16.448 8 17Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Start Buying Fresh Produce
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutCTA;
