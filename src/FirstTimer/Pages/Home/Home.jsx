import Hero from "./Hero";
import HomeAbout from "./HomeAbout/HomeAbout";
import HomeProducts from "./HomeProducts/HomeProducts";
import Testimonials from "./HomeTestimonials/Testimonials";
import JoinCommunity from "./JoinCommunity/JoinCommunity";
import WhyChooseUs from "./WhyChooseUs/WhyChooseUs";
const Home = () => {
  return (
    <div>
      <Hero />
      <HomeAbout />
      <WhyChooseUs />
      <HomeProducts />
      <Testimonials />
      <JoinCommunity />
    </div>
  );
};

export default Home;
