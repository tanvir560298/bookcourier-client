import Banner from "../../components/Banner";
import FeaturedBooks from "../../components/FeaturedBooks";
import Testimonials from "../../components/Testimonials";
import WhyChooseUs from "../../components/WhyChooseUs";
import StatsSection from "../../components/StatsSection";
import CallToAction from "../../components/CallToAction";
import Categories from "../../components/Categories";
import CoverageSection from "../../components/CoverageSection";

const Home = () => {
  return (
    <div>
      <Banner />

      <Categories />

      <FeaturedBooks />
      
      <CoverageSection />

      <WhyChooseUs />

      <StatsSection />

      <Testimonials />

      <CallToAction />
    </div>
  );
};

export default Home;
