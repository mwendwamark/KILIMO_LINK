import React from "react";
import { ArrowRight } from "lucide-react";

const Buttons = () => {
  return (
    <div>
      {" "}
      <div className="container section">
        {/* Original button */}
        <button className="normal_button">button1</button>

        {/* Main green gradient button */}
        <button className="custom_arrow_button">
          <span className="button_text">Join now</span>
          <div className="button_arrow_circle">
            <ArrowRight className="arrow_icon" size={18} />
          </div>
        </button>

        {/* Alternative color variants */}
        <button className="custom_arrow_button emerald">
          <span className="button_text">Get Started</span>
          <div className="button_arrow_circle">
            <ArrowRight className="arrow_icon" size={18} />
          </div>
        </button>

        <button className="custom_arrow_button lime">
          <span className="button_text">Learn More</span>
          <div className="button_arrow_circle">
            <ArrowRight className="arrow_icon" size={18} />
          </div>
        </button>
      </div>
      u
    </div>
  );
};

export default Buttons;
