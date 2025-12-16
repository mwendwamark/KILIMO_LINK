import React, { useState } from "react";
import "./HowItWorks.css";

const HowItWorks = () => {
  const [activeTab, setActiveTab] = useState("farmers");

  const farmersSteps = [
    {
      number: "01",
      title: "Create Your Farm Profile",
      description:
        "Sign up and set up your farm profile with details about your location, farm type, and products.",
    },
    {
      number: "02",
      title: "List Your Products",
      description:
        "Add your products with photos, descriptions, pricing, and availability information.",
    },
    {
      number: "03",
      title: "Connect with Buyers",
      description:
        "Receive inquiries from interested buyers and communicate directly through the platform.",
    },
    {
      number: "04",
      title: "Grow Your Business",
      description:
        "Build relationships, get fair prices, and expand your market reach across Kenya.",
    },
  ];

  const buyersSteps = [
    {
      number: "01",
      title: "Browse Quality Products",
      description:
        "Explore a wide variety of fresh agricultural products from verified farmers across Kenya.",
    },
    {
      number: "02",
      title: "Filter by Location & Category",
      description:
        "Use our advanced search to find exactly what you need by county, category, and price range.",
    },
    {
      number: "03",
      title: "Contact Farmers Directly",
      description:
        "Connect directly with farmers to discuss quantities, pricing, and delivery options.",
    },
    {
      number: "04",
      title: "Get Fresh Produce",
      description:
        "Source quality products at fair prices while supporting local farmers and communities.",
    },
  ];

  const steps = activeTab === "farmers" ? farmersSteps : buyersSteps;

  return (
    <section className="how-it-works">
      <div className="container">
        <div className="how-it-works-header">
          <h2 className="how-it-works-title">How Kilimo Link Works</h2>
          <p className="how-it-works-subtitle">
            Simple steps to connect and transact
          </p>
        </div>

        <div className="tab-switcher">
          <button
            className={`tab-btn ${activeTab === "farmers" ? "active" : ""}`}
            onClick={() => setActiveTab("farmers")}
          >
            For Farmers
          </button>
          <button
            className={`tab-btn ${activeTab === "buyers" ? "active" : ""}`}
            onClick={() => setActiveTab("buyers")}
          >
            For Buyers
          </button>
        </div>

        <div className="steps-grid">
          {steps.map((step, index) => (
            <div key={index} className="step-card">
              <div className="step-number">{step.number}</div>
              <h3 className="step-title">{step.title}</h3>
              <p className="step-description">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
