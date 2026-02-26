import CategoriesSection from "@/components/CategoriesSection";
import Footer from "@/components/Footer";
import HeroSlider from "@/components/HeroSlider";
import Navbar from "@/components/Navbar";
import OffersSection from "@/components/OffersSection";
import SuggestedProducts from "@/components/SuggestedProducts";
import ValueForMoneySection from "@/components/ValueForMoneySection";

const HomePage = () => {
  return (
    <main>
      <Navbar />
      <CategoriesSection />
      <HeroSlider />
      <SuggestedProducts />
      <OffersSection />
      <ValueForMoneySection />
      <Footer />
    </main>
  );
};

export default HomePage;
