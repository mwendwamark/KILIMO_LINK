import React from "react";
import SecondaryNavbar from "../../Components/SecondaryNavbar/SecondaryNavbar";
import AboutHero from "./AboutHero/AboutHero";
import MissionVision from "./MissionVision/MissionVision";
import ImpactStats from "./ImpactStats/ImpactStats";
import HowItWorks from "./HowItWorks/HowItWorks";
import OurValues from "./OurValues/OurValues";
import AboutCTA from "./AboutCTA/AboutCTA";
import "./About.css";

const About = () => {
  return (
    <div className="about-page">
      <SecondaryNavbar />
      <AboutHero />
      <HowItWorks />
      <MissionVision />
      <OurValues />
      <ImpactStats />
      <AboutCTA />
    </div>
  );
};

export default About;
