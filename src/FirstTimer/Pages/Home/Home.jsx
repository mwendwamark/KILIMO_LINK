import Navbar from "../../Components/Navbar/Navbar";
import Faqs from "./Faqs/Faqs";
import Hero from "./Hero";
import HomeAbout from "./HomeAbout/HomeAbout";
import HomeProducts from "./HomeProducts/HomeProducts";
import Testimonials from "./HomeTestimonials/Testimonials";
import JoinCommunity from "./JoinCommunity/JoinCommunity";
import WhyChooseUs from "./WhyChooseUs/WhyChooseUs";
const Home = () => {
  return (
    <div>
      <Navbar/>
      <Hero />
      <HomeAbout />
      <WhyChooseUs />
      <HomeProducts />
      <Testimonials />
      <Faqs/>
      <JoinCommunity />
    </div>
  );
};

export default Home;
