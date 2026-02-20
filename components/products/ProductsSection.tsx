"use client";

import Image from "next/image";
import Container from "@/components/Container";
import FeaturProducts from "./FeaturedProducts";

const products = [
  {
    name: "Develop Ineo 224e",
    description: "A4 colour multifunction printer",
    price: "24,900",
    rating: 4.5,
    productImage: "/printer1.png",
    bgImage: "/bg-printer1.jpg",
  },
  {
    name: "POSIFLOW PSF-II",
    description: "All-in-one touchscreen POS",
    price: "18,500",
    rating: 4.3,
    productImage: "/pos.png",
    bgImage: "/bg-printer1.jpg",
  },
  {
    name: "POSIFLOW PSF-II",
    description: "All-in-one touchscreen POS",
    price: "18,500",
    rating: 4.3,
    productImage: "/pos.png",
    bgImage: "/bg-printer1.jpg",
  },
  {
    name: "POSIFLOW PSF-II",
    description: "All-in-one touchscreen POS",
    price: "18,500",
    rating: 4.3,
    productImage: "/pos.png",
    bgImage: "/bg-printer1.jpg",
  },
  {
    name: "Develop Ineo 224e",
    description: "A4 colour multifunction printer",
    price: "24,900",
    rating: 4.5,
    productImage: "/printer1.png",
    bgImage: "/bg-printer1.jpg",
  },
  {
    name: "POSIFLOW PSF-II",
    description: "All-in-one touchscreen POS",
    price: "18,500",
    rating: 4.3,
    productImage: "/pos.png",
    bgImage: "/bg-printer1.jpg",
  },
];

export default function ProductsSection() {
  return (
    <>
      <FeaturProducts />
      <section className="w-full py-16 md:py-24 bg-[#FFFFFF]">
        <Container>
          {/* Title */}
          <h2 className="text-2xl md:text-3xl font-semibold mb-10 md:mb-14">
            Our Products
          </h2>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
            {products.map((product, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition"
              >
                {/* Image Area */}
                <div className="relative w-full h-50 mb-4 flex items-center justify-center">
                  {/* Background Shaded Image */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Image
                      src={product.bgImage}
                      alt="Background shade"
                      fill
                      className="object-fill opacity-40"
                    />
                  </div>

                  {/* Main Product Image */}
                  <div className="relative w-37.5 h-37.5 z-10">
                    <Image
                      src={product.productImage}
                      alt={product.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>

                {/* Product Info */}
                <h3 className="text-sm md:text-base font-medium truncate">
                  {product.name}
                </h3>

                <p className="text-xs text-gray-500 mt-1">
                  {product.description}
                </p>

                {/* Rating */}
                <div className="flex items-center mt-2 text-yellow-400 text-sm">
                  ⭐ {product.rating}
                </div>

                {/* Price */}
                <p className="text-sm font-semibold mt-2">₹{product.price}</p>

                {/* Button */}
                <button className="w-full mt-4 bg-linear-to-r from-[#7A2E7A] to-[#C53BD2] text-white py-2 rounded-full text-sm font-medium hover:opacity-90 transition">
                  Buy
                </button>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
