import React from "react";
import "./MissionVision.css";

const MissionVision = () => {
  return (
    <section className="mission-vision">
      <div className="container">
        <div className="mission-vision-grid">
          <div className="mission-card">
            <div className="card-icon mission-icon">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                <path
                  d="M24 4L6 14V24C6 34 14 42 24 44C34 42 42 34 42 24V14L24 4Z"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M24 24L18 30L14 26"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h2 className="card-title">Our Mission</h2>
            <p className="card-description">
              To bridge the gap between Kenyan farmers and buyers by providing a
              transparent, efficient marketplace that ensures fair pricing and
              quality assurance. We eliminate middlemen, empowering farmers with
              direct market access while connecting buyers to fresh, quality
              produce.
            </p>
          </div>

          <div className="vision-card">
            <div className="card-icon vision-icon">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                <circle
                  cx="24"
                  cy="24"
                  r="18"
                  stroke="currentColor"
                  strokeWidth="3"
                />
                <path
                  d="M24 12V24L32 28"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <h2 className="card-title">Our Vision</h2>
            <p className="card-description">
              A thriving agricultural ecosystem where every farmer has direct
              market access and every buyer sources fresh, quality produce. We
              envision a future where technology and tradition work hand-in-hand
              to transform Kenyan agriculture.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionVision;
