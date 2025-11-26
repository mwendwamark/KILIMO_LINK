import React, { useEffect } from "react";
import "./Hero.css";
import heroImgFallback from "../../../assets/heroImg2.webp";
import heroImgWide1400 from "../../../assets/hero-wide-1400w.webp";
import heroImgWide2000 from "../../../assets/hero-wide-2000w.webp";
import heroImgNarrow700 from "../../../assets/hero-narrow-700w.webp";
import heroImgNarrow1400 from "../../../assets/hero-narrow-700w.webp";

import "../../../App.css";
import "../../Shared.css";
import { NavLink } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { annotate } from "rough-notation";
import AOS from "aos";
import "aos/dist/aos.css";

const Hero = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-out-cubic",
      once: true,
      offset: 50,
    });

    const middlemenElement = document.querySelector("#middlemen");
    if (middlemenElement) {
      const a1 = annotate(middlemenElement, {
        type: "box",
        color: "#2dd4bf",
        strokeWidth: 3,
        padding: 2,
      });
      a1.show();
    }
  }, []);

  return (
    <section className="landing_hero-section below_navbar">
     
      <picture>
        <source
          media="(max-width: 899px)"
          type="image/webp"
          srcSet={`${heroImgNarrow700} 700w, ${heroImgNarrow1400} 1400w`}
          sizes="100vw"
        />

        <source
          type="image/webp"
          srcSet={`${heroImgWide1400} 1600w, ${heroImgWide2000} 2000w`}
          sizes="100vw"
        />

        <img
          src={heroImgFallback} // Use the best quality JPEG fallback
          alt="Kenyan farm landscape with fresh produce"
          className="landing_hero-background"
          fetchPriority="high" // High priority for LCP (Largest Contentful Paint)
          loading="eager" // Load immediately
          decoding="sync" // Decode synchronously for faster rendering
          // Provide intrinsic dimensions for better layout shift (CLS) performance
          width="2000"
          height="1000" // Adjust based on the actual ratio of your wide image
        />
      </picture>

      <div className="landing_hero-container container">
        <div className="landing_hero-contents">
          {/* ... Rest of your content remains the same ... */}
          <div className="landing_hero_title" data-aos="fade-up">
            <div className="pre-title">
              <span className="pre-title-line green hero"></span>
              <span className="pre-title-text green hero">Kilimo link</span>
            </div>{" "}
            <h1 fetchPriority="high">
              Bypass <strong id="middlemen">middlemen</strong>, and sell your
              farm produce directly to buyers
            </h1>
          </div>
          <p data-aos="fade-up" data-aos-delay="200">
            Discover a marketplace empowering Kenyan farmers to skip middlemen
            and sell directly for fair profits. Plus, connect with peers to
            share crop tips and business hacks, fostering innovation and
            prosperity in agriculture
          </p>
          <div
            className="landing_hero-button"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            <NavLink
              to="/select_role"
              aria-label="Get Started as a Buyer or Seller"
              className="custom_arrow_button white"
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
