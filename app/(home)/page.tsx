import CategoriesSection from "@/components/CategoriesSection";
import HeroSlider from "@/components/HeroSlider";
import Navbar from "@/components/Navbar";
import OurProductsSection from "@/components/OurProductsSection";
import React from "react";

const HomePage = () => {
  return (
    <main>
      <Navbar />
      <HeroSlider />
      <CategoriesSection />
      <OurProductsSection />
    </main>
  );
};

export default HomePage;
