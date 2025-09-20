import Hero from "./Hero";
import HomeAbout from "./HomeAbout/HomeAbout";
import HomeProducts from "./HomeProducts/HomeProducts";
import Testimonials from "./HomeTestimonials/Testimonials";
import WhyChooseUs from "./WhyChooseUs/WhyChooseUs";
const Home = () => {
  return (
    <div>
      <Hero />
      <HomeAbout />
      <WhyChooseUs />
      <HomeProducts />
      <Testimonials/>
    </div>
  );
};

export default Home;
