import Hero from "./Hero";
import HomeAbout from "./HomeAbout/HomeAbout";
import HomeProducts from "./HomeProducts/HomeProducts";
import WhyChooseUs from "./WhyChooseUs/WhyChooseUs";
const Home = () => {
  return (
    <div>
      <Hero />
      <HomeAbout />
      <WhyChooseUs />
      <HomeProducts />
    </div>
  );
};

export default Home;
