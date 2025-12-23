import React from "react";
import img from "../../../../FirstTimer/assets/AboutHero.webp";
import img1 from "../../../../FirstTimer/assets/AboutHero1.webp";
import img2 from "../../../../FirstTimer/assets/AboutHero2.webp";
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
            platform empowers farmers to showcase their farm produce directly to
            a wider market, ensuring fair prices and transparent transactions
            while helping buyers discover quality livestock from trusted
            sources.
          </p>
          <button className="normal_button">Get Started</button>
        </div>

        <div className="about_page_hero_right">
          <div className="about_heroImg_left">
            <img
              src={img}
              alt="Kilimo Link farmers"
              width={300}
              height={280}
              loading="lazy"
            />
          </div>
          <div className="about_heroImg_right">
            <img
              src={img1}
              alt="Agricultural commerce"
              width={300}
              height={280}
              fetchPriority="high"
            />
          </div>
          <div className="about_heroImg_left">
            <img
              src={img2}
              alt="Livestock marketplace"
              width={300}
              height={280}
              loading="lazy"
            />
          </div>
          <div className="about_heroImg_right">
            <img
              src={img1}
              alt="Connecting farmers and buyers"
              width={300}
              height={280}
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
