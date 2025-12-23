import { useEffect } from "react";
import img from "../../../FirstTimer/assets/AboutHero.webp";
import img1 from "../../../FirstTimer/assets/AboutHero1.webp";
import img2 from "../../../FirstTimer/assets/AboutHero2.webp";
import { NavLink } from "react-router-dom";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { annotate } from "rough-notation";
import AOS from "aos";
import "aos/dist/aos.css";
import "./Hero.css";

const Hero = () => {
  useEffect(() => {
    // Initialize AOS
    AOS.init({
      duration: 1000,
      easing: "ease-out-cubic",
      once: true,
      offset: 50,
      disable: window.innerWidth < 768, // Disable on mobile to prevent layout issues
    });

    // Add rough-notation to "middlemen"
    const middlemenElement = document.querySelector("#middlemen");
    if (middlemenElement) {
      const annotation = annotate(middlemenElement, {
        type: "strike-through",
        color: "var(--green_color)",
        strokeWidth: 3,
        padding: 2,
      });
      annotation.show();
    }
  }, []);

  return (
    <section className="home_hero below_navbar">
      <div className="home_hero_container container">
        <div className="home_hero_top">
          <div className="home_hero_titles">
            <div className="pre-title" data-aos="fade-up">
              <span className="pre-title-line green"></span>
              <span className="pre-title-text green">kilimo link</span>
            </div>
            <h1 data-aos="fade-up" data-aos-delay="100">
              Bypass <span id="middlemen">middlemen</span>, <br /> and sell your
              farm produce directly to buyers
            </h1>
          </div>
          <div className="home_hero_description">
            <p data-aos="fade-up" data-aos-delay="200">
              Discover a marketplace empowering Kenyan farmers to skip middlemen
              and sell directly for fair profits. Plus, connect with peers to
              share crop tips and business hacks, fostering innovation and
              prosperity in agriculture
            </p>
            <div
              className="home_page_hero_buttons"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <NavLink
                className="custom_arrow_button green white_text"
                to="/select_role"
              >
                <span className="button_text">Try it today</span>
                <div className="button_arrow_circle white">
                  <ArrowRight className="arrow_icon black" size={18} />
                </div>
              </NavLink>
              <NavLink to="/products" className="home_hero_secondary_link">
                View Products
              </NavLink>
            </div>
          </div>
        </div>

        <div className="home_hero_gallery">
          <div className="home_hero_bottom">
            <div
              className="hero_gallery_item hero_item_left"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              <img
                src={img}
                alt="Abstract Data Display"
                width={350}
                height={300}
                loading="lazy"
              />
              <div className="gallery_item_overlay">
                <div className="gallery_item_content">
                  <h2 className="gallery_item_title">Direct Farm Sales</h2>
                  <p className="gallery_item_author">Kilimo Link</p>
                </div>
                <button
                  className="gallery_item_arrow"
                  aria-label="View Direct Farm Sales"
                >
                  <ArrowUpRight size={20} aria-hidden="true" />
                </button>
              </div>
            </div>

            <div
              className="hero_gallery_item hero_item_center"
              data-aos="fade-up"
              data-aos-delay="500"
            >
              <img
                src={img1}
                alt="Minimalist Geometric Composition"
                width={400}
                height={340}
                fetchPriority="high"
              />
              <div className="gallery_item_overlay">
                <div className="gallery_item_content">
                  <h2 className="gallery_item_title">Connect with Buyers</h2>
                  <p className="gallery_item_author">Marketplace</p>
                </div>
                <button
                  className="gallery_item_arrow"
                  aria-label="View Marketplace"
                >
                  <ArrowUpRight size={20} aria-hidden="true" />
                </button>
              </div>
            </div>

            <div
              className="hero_gallery_item hero_item_right"
              data-aos="fade-up"
              data-aos-delay="600"
            >
              <img
                src={img2}
                alt="Abstract 3D Illustration"
                width={350}
                height={300}
                loading="lazy"
              />
              <div className="gallery_item_overlay">
                <div className="gallery_item_content">
                  <h2 className="gallery_item_title">Fair Trade Platform</h2>
                  <p className="gallery_item_author">Direct Commerce</p>
                </div>
                <button
                  className="gallery_item_arrow"
                  aria-label="View Fair Trade Platform"
                >
                  <ArrowUpRight size={20} aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
