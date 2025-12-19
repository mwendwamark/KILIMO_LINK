import React from "react";
import "./OurValues.css";
import { ArrowRight, Scale, Handshake, Leaf, Lightbulb } from "lucide-react";

const OurValues = () => {
  const values = [
    {
      title: "Integrity",
      description:
        "We approach every interaction with honesty and transparency, ensuring that our actions always align with our words and principles.",
      icon: <Scale strokeWidth={1} />,
    },
    {
      title: "Partnership",
      description:
        "We believe in building lasting relationships rooted in trust and collaboration, empowering our partners to thrive and create meaningful impact together.",
      icon: <Handshake strokeWidth={1} />,
    },
    {
      title: "Sustainability",
      description:
        "We invest with responsibility — supporting innovation and progress that safeguard both economic growth and the planet's future.",
      icon: <Leaf strokeWidth={1} />,
    },
    {
      title: "Innovation",
      description:
        "We embrace technology and creative solutions to solve complex agricultural challenges, constantly seeking new ways to add value.",
      icon: <Lightbulb strokeWidth={1} />,
    },
  ];

  return (
    <div className="section about_page_values">
      <div className="about_page_values_container container">
        <div className="about_page_values_headers two-col-header">
          <div className="about_page_values_title section-headers">
            <div className="pre-title">
              <span className="pre-title-line green"></span>
              <span className="pre-title-text green">Our core values</span>
            </div>
            <h2 className="section-title title-max-50">
              Our principles in action
            </h2>
          </div>

          <p className="about_page_works_description section-description">
            We act on our principles to build enduring value
          </p>
        </div>

        <div className="about_page_values_grid">
          {values.map((value, index) => (
            <div className="about_page_values_card" key={index}>
              <div className="about_values_headers">
                <h2>{value.title}</h2>
              </div>
              <div className="about_values_icon">{value.icon}</div>
              <div className="about_values_description">
                <p>{value.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OurValues;
