import React, { useState } from "react";
import img2 from "../../../../FirstTimer/assets/AboutHero2.webp";
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
    <div className="section about_page_works">
      <div className="about_page_works_container container">
        <div className="about_page_works_headers two-col-header">
          <div className="about_page_work_title section-headers">
            <div className="pre-title">
              <span className="pre-title-line green"></span>
              <span className="pre-title-text green">How it works</span>
            </div>
            <h2 className="section-title title-max-50">
              Simple steps to connect and transact with Kilimo Link
            </h2>
          </div>
          <p className="about_page_works_description">
            Discover a seamless marketplace empowering Kenyan farmers to skip
            middlemen and sell directly for fair profits. Connect with buyers
            and grow your agricultural business.
          </p>
        </div>

        <div className="about_page_works_toggle">
          <div>
            <button
              className={`toggle_btn ${
                activeTab === "farmers" ? "active" : ""
              }`}
              onClick={() => setActiveTab("farmers")}
            >
              For Farmers
            </button>
          </div>
          <div>
            <button
              className={`toggle_btn ${activeTab === "buyers" ? "active" : ""}`}
              onClick={() => setActiveTab("buyers")}
            >
              For Buyers
            </button>
          </div>
        </div>

        <div className="about_page_works_steps_grid">
          <div className="about_page_works_grid_left">
            {steps.slice(0, 2).map((step, index) => (
              <div key={index} className="work_step_card">
                <span className="step_number">{step.number}</span>
                <h3 className="step_title">{step.title}</h3>
                <p className="step_description">{step.description}</p>
              </div>
            ))}
          </div>

          <div className="about_page_works_grid_center">
            <img src={img2} alt="Kilimo Link Process" />
          </div>

          <div className="about_page_works_grid_right">
            {steps.slice(2, 4).map((step, index) => (
              <div key={index} className="work_step_card">
                <span className="step_number">{step.number}</span>
                <h3 className="step_title">{step.title}</h3>
                <p className="step_description">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
