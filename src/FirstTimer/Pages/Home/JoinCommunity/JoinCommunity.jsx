import "./JoinCommunity.css"; 
import img1 from "../../../assets/user1.webp"; 
import img2 from "../../../assets/user2.webp"; 
import img3 from "../../../assets/user3.webp"; 
import img4 from "../../../assets/user4.webp"; 
import img5 from "../../../assets/user5.webp"; 
import img6 from "../../../assets/user6.webp"; 
import img7 from "../../../assets/user7.webp"; 
import worldMap from "../../../assets/world.svg"; 
import { ArrowRight } from "lucide-react"; 

const images = { 
  img1: img1, 
  img2: img2, 
  img3: img3, 
  img4: img4, 
  img5: img5, 
  img6: img6, 
  img7: img7, 
}; 

const JoinCommunity = () => { 
  const profiles = [ 
    { src: images.img1, classes: "profile-1" }, 
    { src: images.img2, classes: "profile-2" }, 
    { src: images.img3, classes: "profile-3" }, 
    { src: images.img4, classes: "profile-4" }, 
    { src: images.img5, classes: "profile-5" }, 
    { src: images.img6, classes: "profile-6" }, 
    { src: images.img7, classes: "profile-7" }, 
  ]; 

  return ( 
    <section className="join-community-section section min-h-viewport"> 
      <div className="join-community-container container"> 
        <div 
          className="join-community-overlay" 
          style={{ backgroundImage: `url(${worldMap})` }} 
        ></div> 
        <div className="background-pattern"></div> 

        <div className="join-community-content-container"> 
          <h1 className="join-community-title">Join the Farmer Community</h1> 
          <p className="join-community-subheading"> 
            Step into a vibrant hub where Kenyan farmers unite to share their journeys, from time-tested techniques to breakthrough success stories. Exchange insights, learn from each other’s experiences, and grow together in a community dedicated to fostering innovation, resilience, and prosperity in agriculture.
          </p> 

          <button className="custom_arrow_button white"> 
            <span className="button_text">Get Started</span> 
            <div className="button_arrow_circle"> 
              <ArrowRight className="arrow_icon" size={18} /> 
            </div> 
          </button> 
        </div> 

        {/* Circular profile images, absolutely positioned */} 
        {profiles.map((profile, index) => ( 
          <div key={index} className={`profile-circle ${profile.classes}`}> 
            <img src={profile.src} alt="Profile" loading="lazy" /> 
          </div> 
        ))} 
      </div> 
    </section> 
  ); 
}; 

export default JoinCommunity;