import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ProductSinglePage from "@/components/products/ProductSingle";
import React from "react";

const SingleProduct = () => {
  return (
    <main>
      <Navbar />
      <ProductSinglePage />
      <Footer />
    </main>
  );
};

export default SingleProduct;
