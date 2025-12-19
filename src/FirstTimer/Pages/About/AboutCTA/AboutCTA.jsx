import React from "react";
import { ArrowRight } from "lucide-react";
import "./AboutCTA.css";

const AboutCTA = () => {
  return (
    <section className="about_page_cta_section_wrapper section">
      <div className="about_page_cta_container container">
        <div className="about_page_cta_main_card">
          {/* Sweeping arch light trails */}
          <div className="light_trail_top"></div>
          <div className="light_trail_bottom"></div>

          <div className="about_page_cta_inner_content">
            <h2 className="about_page_cta_heading">
              Ready to Transform <br /> Agriculture Together?
            </h2>
            <p className="about_page_cta_subtext">
              Join thousands of farmers and buyers already using Kilimo Link to
              connect, trade, and grow.
            </p>

            <div className="about_page_cta_actions">
              <button className="about_page_cta_btn_white">
                Get Started <ArrowRight size={18} strokeWidth={2.5} />
              </button>
              <button className="about_page_cta_btn_glass">Learn more</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutCTA;
