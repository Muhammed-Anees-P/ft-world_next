import CategoriesSection from "@/components/CategoriesSection";
import Footer from "@/components/Footer";
import HeroSlider from "@/components/HeroSlider";
import Navbar from "@/components/Navbar";
import OurProductsSection from "@/components/OurProductsSection";
import SuggestedProducts from "@/components/SuggestedProducts";
import ValueForMoneySection from "@/components/ValueForMoneySection";
import React from "react";

const HomePage = () => {
  return (
    <main>
      <Navbar />
      <CategoriesSection />
      <HeroSlider />
      <SuggestedProducts />
      
      
      <OurProductsSection />
      <ValueForMoneySection />
      <Footer />
    </main>
  );
};

export default HomePage;
