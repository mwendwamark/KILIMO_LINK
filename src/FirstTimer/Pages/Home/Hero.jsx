import React, { useEffect } from "react";
import "./Hero.css";
import "../../../App.css";
import "../../Shared.css"
import { NavLink } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { annotate } from "rough-notation";
import AOS from 'aos';
import 'aos/dist/aos.css';

const Hero = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-out-cubic",
      once: true,
      offset: 50,
    });

    // Wait for the component to be mounted and DOM elements to be available
    const middlemenElement = document.querySelector("#middlemen");

    if (middlemenElement) {
      const a1 = annotate(middlemenElement, {
        type: "box",
        color: "#2dd4bf",
        strokeWidth: 3,
        padding: 2
      });

      a1.show();
    }
  }, []); // Empty dependency array means this runs once after component mounts

  return (
    <section className="landing_hero-section below_navbar">
      <div className="landing_hero-container container">
        <div className="landing_hero-contents">
          <div className="landing_hero_title" data-aos="fade-up">
            <div className="pre-title">
              <span className="pre-title-line green hero"></span>
              <span className="pre-title-text green hero">Kilimo link</span>
            </div>{" "}
            <h1>
              Bypass <strong id="middlemen">middlemen</strong>, and sell your farm produce directly to buyers
            </h1>
          </div>
          <p data-aos="fade-up" data-aos-delay="200">
            Discover a marketplace empowering Kenyan farmers to skip middlemen
            and sell directly for fair profits. Plus, connect with peers to
            share crop tips and business hacks, fostering innovation and
            prosperity in agriculture
          </p>
          <div className="landing_hero-button" data-aos="fade-up" data-aos-delay="400">
            <NavLink
              to="/select_role"
              aria-label="Get Started as a Buyer or Seller"
              className="custom_arrow_button green"
            >
              <span className="button_text">Get Started</span>
              <div className="button_arrow_circle">
                <ArrowRight className="arrow_icon" />
              </div>
            </NavLink>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;