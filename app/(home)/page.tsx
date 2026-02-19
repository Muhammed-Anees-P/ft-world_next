import CategoriesSection from "@/components/CategoriesSection";
import HeroSlider from "@/components/HeroSlider";
import Navbar from "@/components/Navbar";
import React from "react";

const HomePage = () => {
  return (
    <main>
      <Navbar />
      <HeroSlider />
      <CategoriesSection />
    </main>
  );
};

export default HomePage;
