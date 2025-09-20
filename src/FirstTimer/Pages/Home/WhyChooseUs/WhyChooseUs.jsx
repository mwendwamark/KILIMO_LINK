import { useEffect } from "react";
import "./WhyChooseUs.css";
import "../../../Shared.css";
import { Users, Globe, Shield, ArrowRight } from "lucide-react";
import { NavLink } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

const WhyChooseUs = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-out-cubic",
      once: true,
      offset: 50,
    });
  }, []);

  return (
    <section className="why-choose-us-section section min-h-viewport">
      <div className="why-choose-us-container container section-flex-col">
        <div className="why-choose-us-header two-col-header">
          <div className="header-left section-headers" data-aos="fade-up">
            <div className="pre-title">
              <span className="pre-title-line green"></span>
              <span className="pre-title-text green">Why choose us</span>
            </div>
            <h1 className="section-title why-choose-us-title title-max-50">
              Why <span className="highlight-text">Kilimo Link</span> is the
              right choice for you
            </h1>
          </div>
          <div
            className="header-right"
            data-aos="fade-left"
            data-aos-delay="200"
          >
            <p className="why-choose-us-description section-description">
              Experience the power of direct farmer-to-buyer connections that
              strengthen Kenya's agricultural community and promote sustainable
              farming practices.
            </p>
          </div>
        </div>

        <div className="why-choose-us-benefits">
          <div className="benefits-left">
            <div className="benefits-top">
              <div
                className="benefits-top-card modern-card"
                data-aos="fade-right"
                data-aos-delay="100"
              >
                <div className="card-icon-container">
                  <Users className="card-icon" />
                </div>
                <h2>Direct from farmers</h2>
                <p>
                  Buyers purchase directly from farmers with no middlemen or
                  hidden costs. Farmers earn more while buyers enjoy fresh
                  produce at fair prices. Supporting local farming families
                  through transparent trade.
                </p>
                <div className="card-decoration"></div>
              </div>
              <div
                className="benefits-top-card modern-card"
                data-aos="fade-right"
                data-aos-delay="200"
              >
                <div className="card-icon-container">
                  <Globe className="card-icon" />
                </div>
                <h2>Nationwide reach</h2>
                <p>
                  Connect farmers and buyers across Kenya. From Nairobi to
                  Mombasa, we've eliminated distance barriers. Access fresh
                  produce directly from farms anywhere in the country.
                </p>
                <div className="card-decoration"></div>
              </div>
            </div>
            <div className="benefits-bottom">
              <div
                className="benefits-bottom-card modern-card"
                data-aos="fade-right"
                data-aos-delay="300"
              >
                <div className="card-icon-container">
                  <Users className="card-icon" />
                </div>
                <h2>Community Support</h2>
                <p>
                  Farming thrives when shared. Connect with experienced farmers
                  through discussions, tips, and mentorship. More than a
                  marketplace— we're a growing community sharing knowledge and
                  success.
                </p>
                <div className="card-decoration"></div>
              </div>
            </div>
          </div>
          <div className="benefits-right">
            <div
              className="benefits-right-card modern-card highlight"
              data-aos="fade-left"
              data-aos-delay="150"
            >
              <div className="card-icon-container">
                <Shield className="card-icon" />
              </div>
              <h2>Trust, Simplicity & Growth</h2>
              <div className="benefits-texts">
                <p>
                  Built on simplicity, transparency, and reliability. Showcase
                  your produce with detailed information. Search, compare, and
                  connect directly with secure interactions and verified
                  profiles.
                </p>

                <p>
                  Growth opportunities through Trust Keys and Wholesale
                  programs. Shared knowledge, commodity finance, and partnership
                  facilities help farmers expand their operations.
                </p>
              </div>

              <NavLink className="custom_arrow_button white">
                <span className="button_text">Join now</span>
                <div className="button_arrow_circle">
                  <ArrowRight className="arrow_icon" size={18} />
                </div>
              </NavLink>
              <div className="highlight-decoration">
                <div className="decoration-circle circle-1"></div>
                <div className="decoration-circle circle-2"></div>
                <div className="decoration-circle circle-3"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default WhyChooseUs;
