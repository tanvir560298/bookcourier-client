import Banner from "../../components/Banner";
import FeaturedBooks from "../../components/FeaturedBooks";
import Testimonials from "../../components/Testimonials";
import WhyChooseUs from "../../components/WhyChooseUs";
import StatsSection from "../../components/StatsSection";
import CallToAction from "../../components/CallToAction";
import Categories from "../../components/Categories";
import CoverageSection from "../../components/CoverageSection";
import BlogPreview from "../../components/BlogPreview";
import FAQSection from "../../components/FAQSection";

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

      <BlogPreview />

      <FAQSection />

      <CallToAction />
    </div>
  );
};

export default Home;
