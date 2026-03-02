"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Container from "@/components/Container";
import FeaturProducts from "./FeaturedProducts";
import CategoriesSection from "../CategoriesSection";
import { useQuery } from "@tanstack/react-query";
import {
  useListProductsForUser,
  useListProductsForUserByCategory,
} from "@/hooks/useProductQuery";
import { IProduct } from "@/types/IProducts;";

export default function ProductsSection() {
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(
    undefined,
  );

  const queryConfig = selectedCategory
    ? useListProductsForUserByCategory(selectedCategory)
    : useListProductsForUser();

  const { data, isLoading } = useQuery(queryConfig);

  const products: IProduct[] = data?.data ?? [];

  return (
    <>
      <FeaturProducts />

      <section className="w-full py-16 bg-[#FFFFFF]">
        <Container>
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">
            Our Products
          </h2>
        </Container>

        {/* Categories */}
        <CategoriesSection
          selectedCategory={selectedCategory}
          onCategoryClick={(id?: string) => {
            // Toggle logic
            if (id === selectedCategory) {
              setSelectedCategory(undefined); // unselect
            } else {
              setSelectedCategory(id);
            }
          }}
        />

        {/* Products */}
        <Container>
          <h3 className="text-xl font-semibold">Products</h3>

          <div className="flex flex-wrap gap-6 mt-4">
            {/* Skeleton */}
            {isLoading &&
              Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="w-[276px] h-[350px] bg-white rounded-[15px] px-[20px] py-[15px] flex flex-col gap-[12px] border border-gray-100 animate-pulse"
                >
                  <div className="w-full h-[170px] bg-gray-200 rounded-[10px]" />
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-4 bg-gray-200 rounded w-1/2" />
                  <div className="h-3 bg-gray-200 rounded w-1/3" />
                  <div className="mt-auto w-[236px] h-[40px] bg-gray-200 rounded-[24px]" />
                </div>
              ))}

            {/* Products */}
            {!isLoading &&
              products.map((product) => (
                <Link
                  key={product._id}
                  href={`/product/${product.slug}/${product._id}`}
                  className="group"
                >
                  <div className="w-[276px] h-[350px] bg-white rounded-[15px] px-[20px] py-[15px] flex flex-col gap-[12px] border border-gray-100 hover:shadow-md transition">
                    <div className="relative w-full h-[170px] flex items-center justify-center">
                      <div className="relative w-[140px] h-[140px]">
                        <Image
                          src={product.images?.[0] || "/placeholder.png"}
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
                        ₹{product.discountPrice}
                      </span>

                      {product.originalPrice > product.discountPrice && (
                        <span className="text-gray-400 line-through">
                          ₹{product.originalPrice}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                      <div className="text-yellow-400 text-xs">★★★★☆</div>
                      <span className="text-gray-500 text-xs">0 reviews</span>
                    </div>

                    <div className="mt-auto flex justify-center">
                      <button
                        disabled={parseInt(product.stock) === 0}
                        className="w-[236px] h-[40px] bg-[#542452] text-white text-sm font-medium rounded-[24px] hover:opacity-90 transition disabled:opacity-50"
                      >
                        {parseInt(product.stock) === 0
                          ? "Out of Stock"
                          : "Buy Now"}
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
