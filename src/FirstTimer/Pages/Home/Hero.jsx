// import React, { useEffect } from "react";
// import "./Hero.css";
// import "../../../App.css";
// import "../../Shared.css";
// import { NavLink } from "react-router-dom";
// import { ArrowRight } from "lucide-react";
// import { annotate } from "rough-notation";
// import AOS from "aos";
// import "aos/dist/aos.css";
// // Import the hero image from src/assets so Vite can resolve the URL
// import heroImg2 from "../../../assets/heroImg2.webp";

// const Hero = () => {
//   useEffect(() => {
//     AOS.init({
//       duration: 1000,
//       easing: "ease-out-cubic",
//       once: true,
//       offset: 50,
//     });

//     const middlemenElement = document.querySelector("#middlemen");
//     if (middlemenElement) {
//       const a1 = annotate(middlemenElement, {
//         type: "box",
//         color: "#2dd4bf",
//         strokeWidth: 3,
//         padding: 2,
//       });
//       a1.show();
//     }
//   }, []);

//   return (
//     <section className="landing_hero-section below_navbar">
//       <picture>
//         {/* Using a single optimized WebP source from src/assets. If you add AVIF/WebP variants later (and place them in public/), you can reintroduce <source> tags. */}
//         <img
//           src={heroImg2}
//           alt="Kenyan farm landscape with fresh produce"
//           className="landing_hero-background"
//           fetchPriority="high" // High priority for LCP
//           width="2046" // Intrinsic width to prevent shifts
//           height="4000"
//           style={{ aspectRatio: '2046 / 4000', objectFit: 'cover' }} // CSS fallback
//           loading="eager"
//         />
//       </picture>
//       <div className="landing_hero-container container">
//         <div className="landing_hero-contents">
//           <div className="landing_hero_title" data-aos="fade-up">
//             <div className="pre-title">
//               <span className="pre-title-line green hero"></span>
//               <span className="pre-title-text green hero">Kilimo link</span>
//             </div>{" "}
//             <h1 fetchPriority="high">
//               Bypass <strong id="middlemen">middlemen</strong>, and sell your
//               farm produce directly to buyers
//             </h1>
//           </div>
//           <p data-aos="fade-up" data-aos-delay="200">
//             Discover a marketplace empowering Kenyan farmers to skip middlemen
//             and sell directly for fair profits. Plus, connect with peers to
//             share crop tips and business hacks, fostering innovation and
//             prosperity in agriculture
//           </p>
//           <div
//             className="landing_hero-button"
//             data-aos="fade-up"
//             data-aos-delay="400"
//           >
//             <NavLink
//               to="/select_role"
//               aria-label="Get Started as a Buyer or Seller"
//               className="custom_arrow_button green"
//             >
//               <span className="button_text">Get Started</span>
//               <div className="button_arrow_circle">
//                 <ArrowRight className="arrow_icon" />
//               </div>
//             </NavLink>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Hero;

import React, { useEffect } from "react";
import "./Hero.css";
// NOTE: Assuming the asset imports now reflect multiple sizes.
// Place these files in a well-named assets folder (e.g., assets/hero/)

// Fallback/Default image (e.g., a good-quality JPEG)
import heroImgFallback from "../../../assets/heroImg2.webp";

// Desktop/Wide/High-Res WebP images (resolution switching for wide screens)
import heroImgWide1400 from "../../../assets/hero-wide-1400w.webp";
import heroImgWide2000 from "../../../assets/hero-wide-2000w.webp";

// Mobile/Narrow/Art-Directed WebP images (resolution switching for small screens)
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
      {/* IMPLEMENTATION OF ART DIRECTION AND RESOLUTION SWITCHING: 
        1. Browser checks if viewport is < 900px (media="(max-width: 899px)") 
           and serves a narrow, cropped image using srcset for resolution switching.
        2. If > 900px, it serves a wide image, also using srcset.
        3. Falls back to the standard <img> for non-supporting browsers.
      */}
      <picture>
        {/* MOBILE (Art Direction) - Viewports up to 899px: Serve narrow/cropped image */}
        <source
          media="(max-width: 899px)"
          type="image/webp"
          // Resolution switching for narrow viewport: Use 700w or 1400w version
          srcset={`${heroImgNarrow700} 700w, ${heroImgNarrow1400} 1400w`}
          // Define slot size for mobile: image takes 100% of viewport width
          sizes="100vw"
        />

        {/* DESKTOP/TABLET (Resolution Switching) - Viewports 900px and up: Serve wide image */}
        <source
          type="image/webp"
          // Resolution switching for wide viewport: Use 1600w or 2000w version
          srcset={`${heroImgWide1400} 1600w, ${heroImgWide2000} 2000w`}
          // Define slot size for desktop: image usually takes 90-100% of the viewport width
          sizes="100vw"
        />

        {/* FALLBACK <img> - Essential for non-supporting browsers and the document structure */}
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
