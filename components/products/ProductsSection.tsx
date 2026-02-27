"use client";

import Image from "next/image";
import Link from "next/link";
import Container from "@/components/Container";
import FeaturProducts from "./FeaturedProducts";
import CategoriesSection from "../CategoriesSection";

const products = [
  {
    slug: "develop-ineo-224e",
    name: "Develop ineo 224e...",
    price: "54,900",
    oldPrice: "58,900",
    rating: 4.5,
    reviews: 123,
    productImage: "/printer1.png",
    bgImage: "/bg-printer1.jpg",
  },
  {
    slug: "posiflow-psf-ii-1",
    name: "POSIFLOW PSF-II",
    price: "54,900",
    oldPrice: "58,900",
    rating: 4.5,
    reviews: 123,
    productImage: "/pos.png",
    bgImage: "/bg-printer1.jpg",
  },
  {
    slug: "develop-ineo-224e-2",
    name: "Develop ineo 224e...",
    price: "54,900",
    oldPrice: "58,900",
    rating: 4.5,
    reviews: 123,
    productImage: "/printer1.png",
    bgImage: "/bg-printer1.jpg",
  },
  {
    slug: "posiflow-psf-ii-2",
    name: "POSIFLOW PSF-II",
    price: "54,900",
    oldPrice: "58,900",
    rating: 4.5,
    reviews: 123,
    productImage: "/pos.png",
    bgImage: "/bg-printer1.jpg",
  },
  {
    slug: "develop-ineo-224e-3",
    name: "Develop ineo 224e...",
    price: "54,900",
    oldPrice: "58,900",
    rating: 4.5,
    reviews: 123,
    productImage: "/printer1.png",
    bgImage: "/bg-printer1.jpg",
  },
  {
    slug: "posiflow-psf-ii-3",
    name: "POSIFLOW PSF-II",
    price: "54,900",
    oldPrice: "58,900",
    rating: 4.5,
    reviews: 123,
    productImage: "/pos.png",
    bgImage: "/bg-printer1.jpg",
  },
];

export default function ProductsSection() {
  return (
    <>
      <FeaturProducts />

      <section className="w-full py-16 bg-[#FFFFFF]">
        {/* Our Products Title */}
        <Container>
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">
            Our Products
          </h2>
        </Container>

        {/* Categories (Already Has Container Inside) */}
        <CategoriesSection />

        {/* Products Section */}
        <Container>
          <h3 className="text-xl font-semibold ">Products</h3>

          <div className="flex flex-wrap gap-6">
            {products.map((product, index) => (
              <Link
                key={index}
                href={`/product/${product.slug}`}
                className="group"
              >
                <div className="w-[276px] h-[350px] bg-white rounded-[15px] px-[20px] py-[15px] flex flex-col gap-[12px] border border-gray-100">
                  {/* Image */}
                  <div className="relative w-full h-[170px] flex items-center justify-center">
                    <div className="absolute inset-0">
                      <Image
                        src={product.bgImage}
                        alt="Background"
                        fill
                        className="object-cover opacity-10 rounded-[10px]"
                      />
                    </div>

                    <div className="relative w-[140px] h-[140px] z-10">
                      <Image
                        src={product.productImage}
                        alt={product.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>

                  <h4 className="text-sm font-medium truncate">
                    {product.name}
                  </h4>

                  <div className="flex items-center gap-2 text-sm">
                    <span className="font-semibold text-black">
                      ₹{product.price}
                    </span>
                    <span className="text-gray-400 line-through">
                      ₹{product.oldPrice}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-sm">
                    <div className="text-yellow-400 text-xs">★★★★☆</div>
                    <span className="text-gray-500 text-xs">
                      ({product.reviews} reviews)
                    </span>
                  </div>

                  <div className="mt-auto flex justify-center">
                    <button className="w-[236px] h-[40px] bg-[#542452] text-white text-sm font-medium rounded-[24px] hover:opacity-90 transition">
                      Buy Now
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
