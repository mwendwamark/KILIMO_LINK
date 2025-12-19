import React from "react";
import "./ImpactStats.css";
import "../../../Shared.css";

const ImpactStats = () => {
  return (
    <div className="impact_stats_page_section section">
      <div className="impact_stats_page_container container">
        <div className="two-col-header">
          <div className="section-headers">
            <div className="pre-title">
              <span className="pre-title-line green"></span>
              <span className="pre-title-text green">Our Impact</span>
            </div>
            <h2 className="section-title title-max-50">
              Transforming Kenya's agricultural economy through{" "}
              <span className="highlight-text">direct connections</span>
            </h2>
          </div>
          <div className="header-right">
            <p className="section-description">
              Kilimo Link has built a trusted marketplace that eliminates
              middlemen, empowers farmers with fair prices, and connects buyers
              to quality produce. Our platform drives measurable impact across
              Kenya's agricultural value chain.
            </p>
          </div>
        </div>

        <section className="impact_stats_section">
          <div className="impact_stats_grid">
            {/* ============= ROW 1 ============= */}
            <div className="impact_cell cell_1_1">
              <span className="impact_label">Farmers Empowered</span>
              <h2 className="impact_number">
                5,000<span className="impact_plus">+</span>
              </h2>
            </div>

            <div className="impact_cell cell_1_2">
              <p className="impact_description">
                Over 5,000 Kenyan farmers have joined Kilimo Link, gaining
                direct access to buyers and securing fair market prices by
                cutting out exploitative intermediaries.
              </p>
            </div>

            <div className="impact_cell cell_1_3">
              <svg
                className="impact_illustration"
                viewBox="0 0 120 120"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="45"
                  cy="60"
                  r="35"
                  fill="none"
                  stroke="#404040"
                  strokeWidth="1.5"
                />
                <circle
                  cx="75"
                  cy="60"
                  r="35"
                  fill="none"
                  stroke="#404040"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                />
              </svg>
            </div>

            {/* ============= ROW 2 ============= */}
            <div className="impact_cell cell_2_1">
              <svg
                className="impact_illustration"
                viewBox="0 0 120 120"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M 35 60 Q 35 35, 60 35 Q 85 35, 85 60"
                  fill="none"
                  stroke="#c0c0c0"
                  strokeWidth="1.5"
                  markerEnd="url(#arrowhead1)"
                />
                <path
                  d="M 85 60 Q 85 85, 60 85 Q 35 85, 35 60"
                  fill="none"
                  stroke="#c0c0c0"
                  strokeWidth="1.5"
                  markerEnd="url(#arrowhead2)"
                />
                <defs>
                  <marker
                    id="arrowhead1"
                    markerWidth="10"
                    markerHeight="10"
                    refX="5"
                    refY="3"
                    orient="auto"
                  >
                    <polygon points="0 0, 6 3, 0 6" fill="#c0c0c0" />
                  </marker>
                  <marker
                    id="arrowhead2"
                    markerWidth="10"
                    markerHeight="10"
                    refX="5"
                    refY="3"
                    orient="auto"
                  >
                    <polygon points="0 0, 6 3, 0 6" fill="#c0c0c0" />
                  </marker>
                </defs>
              </svg>
            </div>

            <div className="impact_cell cell_2_2">
              <span className="impact_label">Trade Volume Enabled</span>
              <h2 className="impact_number">
                KSh 2.8B<span className="impact_plus">+</span>
              </h2>
            </div>

            <div className="impact_cell cell_2_3">
              <p className="impact_description">
                Our platform has enabled over KSh 2.8 billion in transparent,
                direct trade between farmers and buyers, creating lasting
                economic value across Kenya's agricultural sector.
              </p>
            </div>

            {/* ============= ROW 3 ============= */}

            <div className="impact_cell cell_3_2">
              <span className="impact_label">Active Buyers</span>
              <h2 className="impact_number">
                1,200<span className="impact_plus">+</span>
              </h2>
            </div>
            <div className="impact_cell cell_3_1">
              <p className="impact_description">
                Kilimo Link operates across 25+ counties, connecting rural
                farming communities with urban and institutional buyers to
                create sustainable market access nationwide.
              </p>
            </div>
            <div className="impact_cell cell_3_3">
              <svg
                className="impact_illustration"
                viewBox="0 0 120 120"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="60"
                  cy="60"
                  r="35"
                  fill="none"
                  stroke="#404040"
                  strokeWidth="1.5"
                />
                <line
                  x1="60"
                  y1="25"
                  x2="60"
                  y2="95"
                  stroke="#404040"
                  strokeWidth="1.5"
                />
              </svg>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ImpactStats;
