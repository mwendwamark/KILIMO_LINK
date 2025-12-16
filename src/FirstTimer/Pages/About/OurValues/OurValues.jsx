import React from "react";
import "./OurValues.css";

const OurValues = () => {
  const values = [
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <path
            d="M16 4L4 10V16C4 22.667 9.333 28 16 29.333C22.667 28 28 22.667 28 16V10L16 4Z"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M16 16L12 20L10 18"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      title: "Transparency",
      description:
        "Direct connections between farmers and buyers with no hidden fees or middlemen exploitation.",
    },
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <path
            d="M28 16C28 22.627 22.627 28 16 28C9.373 28 4 22.627 4 16C4 9.373 9.373 4 16 4C22.627 4 28 9.373 28 16Z"
            stroke="currentColor"
            strokeWidth="2.5"
          />
          <path
            d="M12 16L15 19L21 13"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      title: "Quality",
      description:
        "Verified farmers and quality assurance processes ensure buyers get the best produce.",
    },
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <path
            d="M6 16L16 6L26 16M8 14V26H24V14"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 26V20H20V26"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      title: "Fairness",
      description:
        "Fair pricing that benefits both farmers and buyers, creating a sustainable marketplace.",
    },
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <circle
            cx="16"
            cy="16"
            r="12"
            stroke="currentColor"
            strokeWidth="2.5"
          />
          <path
            d="M16 8V16L20 20"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>
      ),
      title: "Sustainability",
      description:
        "Supporting local agriculture and promoting environmentally conscious farming practices.",
    },
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <path
            d="M16 4L20 12L28 13.333L22 19.333L23.333 28L16 23.333L8.667 28L10 19.333L4 13.333L12 12L16 4Z"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      title: "Innovation",
      description:
        "Leveraging modern technology to transform traditional agricultural practices.",
    },
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <path
            d="M16 20C18.209 20 20 18.209 20 16C20 13.791 18.209 12 16 12C13.791 12 12 13.791 12 16C12 18.209 13.791 20 16 20Z"
            stroke="currentColor"
            strokeWidth="2.5"
          />
          <path
            d="M24 8C26.209 8 28 6.209 28 4C28 6.209 26.209 8 24 8ZM8 8C5.791 8 4 6.209 4 4C4 6.209 5.791 8 8 8ZM24 24C26.209 24 28 25.791 28 28C28 25.791 26.209 24 24 24ZM8 24C5.791 24 4 25.791 4 28C4 25.791 5.791 24 8 24Z"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>
      ),
      title: "Community",
      description:
        "Building lasting relationships and fostering a supportive agricultural ecosystem.",
    },
  ];

  return (
    <section className="our-values">
      <div className="container">
        <div className="values-header">
          <h2 className="values-title">Our Core Values</h2>
          <p className="values-subtitle">
            The principles that guide everything we do
          </p>
        </div>
        <div className="values-grid">
          {values.map((value, index) => (
            <div key={index} className="value-card">
              <div className="value-icon">{value.icon}</div>
              <h3 className="value-title">{value.title}</h3>
              <p className="value-description">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurValues;
