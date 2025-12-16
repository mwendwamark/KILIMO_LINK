// import React from "react";
// import img from "../../../../FirstTimer/assets/AboutHero.webp";
// import img1 from "../../../../FirstTimer/assets/AboutHero1.webp";
// import img2 from "../../../../FirstTimer/assets/AboutHero2.jpg";
// import "./AboutHero.css";
// const AboutHero = () => {
//   return (
//     <section className="about_page_hero below_navbar">
//       <div className="about_page_hero_container container">
//         <div className="about_page_hero_left">
//           <div className="about_page_hero_title">
//             <div className="pre-title">
//               <span className="pre-title-line green"></span>
//               <span className="pre-title-text green">about kilimo link</span>
//             </div>
//             <h1>Bridging the gap between farmers and buyers</h1>
//           </div>

//           <div className="about_page_hero_description">
//             <p>
//               Together—the farmers and buyers of Kenya—we are reinventing
//               agricultural commerce and creating opportunities for growth. Our
//               platform empowers farmers to showcase their livestock directly to
//               a wider market, ensuring fair prices and transparent transactions
//               while helping buyers discover quality livestock from trusted
//               sources.
//             </p>
//           </div>
//         </div>

//         <div className="about_page_hero_right">
//           <div className="about_heroImg_left">
//             <img src={img2} alt="Farmer showcasing livestock" loading="eager" />
//           </div>
//           <div className="about_heroImg_right">
//             <img
//               src={img1}
//               alt="Buyers and farmers connecting"
//               loading="eager"
//             />
//             <img src={img} alt="Agricultural marketplace" loading="eager" />
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default AboutHero;

import React from "react";
import img from "../../../../FirstTimer/assets/AboutHero.webp";
import img1 from "../../../../FirstTimer/assets/AboutHero1.webp";
import img2 from "../../../../FirstTimer/assets/AboutHero2.jpg";
import "./AboutHero.css";

const AboutHero = () => {
  return (
    <section className="about_page_hero below_navbar">
      <div className="container about_page_hero_container">
        <div className="about_page_hero_left">
          <div className="pre-title">
            <span className="pre-title-line green"></span>
            <span className="pre-title-text green">about kilimo link</span>
          </div>
          <h1>Bridging the gap between farmers and buyers</h1>
          <p className="about_page_hero_description">
            Together—the farmers and buyers of Kenya—we are reinventing
            agricultural commerce and creating opportunities for growth. Our
            platform empowers farmers to showcase their livestock directly to a
            wider market, ensuring fair prices and transparent transactions
            while helping buyers discover quality livestock from trusted
            sources.
          </p>
          <button className="normal_button">Get Started</button>
        </div>

        <div className="about_page_hero_right">
          <div className="about_heroImg_left">
            <img src={img} alt="Kilimo Link farmers" />
          </div>
          <div className="about_heroImg_right">
            <img src={img1} alt="Agricultural commerce" />
          </div>
          <div className="about_heroImg_left">
            <img src={img2} alt="Livestock marketplace" />
          </div>
          <div className="about_heroImg_right">
            <img src={img1} alt="Connecting farmers and buyers" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
