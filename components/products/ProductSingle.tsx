"use client";

import Image from "next/image";
import Container from "@/components/Container";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { useState } from "react";

const relatedProducts = [
  {
    id: 1,
    title: "Develop ineo 224e...",
    image: "/printer1.png",
    price: "1,54,900",
    oldPrice: "1,53,900",
    reviews: 123,
  },
  {
    id: 2,
    title: "Develop ineo 224e...",
    image: "/printer2.png",
    price: "1,54,900",
    oldPrice: "1,53,900",
    reviews: 123,
  },
  {
    id: 3,
    title: "Develop ineo 224e...",
    image: "/printer1.png",
    price: "1,54,900",
    oldPrice: "1,53,900",
    reviews: 123,
  },
  {
    id: 4,
    title: "Develop ineo 224e...",
    image: "/printer2.png",
    price: "1,54,900",
    oldPrice: "1,53,900",
    reviews: 123,
  },
  {
    id: 5,
    title: "Develop ineo 224e...",
    image: "/printer1.png",
    price: "1,54,900",
    oldPrice: "1,53,900",
    reviews: 123,
  },
  {
    id: 6,
    title: "Develop ineo 224e...",
    image: "/printer2.png",
    price: "1,54,900",
    oldPrice: "1,53,900",
    reviews: 123,
  },
];

export default function ProductSinglePage() {
  const [selectedType, setSelectedType] = useState("Black & White");

  return (
    <section className="w-full bg-[#FFFFFF] py-16">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">
          {/* ================= LEFT SIDE ================= */}
          <div>
            {/* Main Image Card */}
            <div className="relative bg-white border rounded-2xl p-10">
              <Image
                src="/printer1.png"
                alt="product"
                width={450}
                height={550}
                className="object-contain mx-auto"
              />

              {/* Wishlist Icon */}
              <button className="absolute bottom-6 right-6 w-10 h-10 bg-white border rounded-lg flex items-center justify-center shadow-sm">
                <Heart size={18} />
              </button>
            </div>

            {/* Selected Color */}
            <p className="mt-6 text-sm text-gray-700">
              Selected Color:{" "}
              <span className="font-medium">{selectedType}</span>
            </p>

            {/* Color Variants */}
            <div className="flex gap-6 mt-4">
              {["/printer1.png", "/printer2.png", "/printer1.png"].map(
                (img, i) => (
                  <div
                    key={i}
                    className="w-[180px] h-[120px] border rounded-2xl p-4 bg-white flex items-center justify-center cursor-pointer hover:border-black transition"
                  >
                    <Image
                      src={img}
                      alt="variant"
                      width={90}
                      height={90}
                      className="object-contain"
                    />
                  </div>
                ),
              )}
            </div>
          </div>

          {/* ================= RIGHT SIDE ================= */}
          <div>
            <h1 className="text-2xl font-semibold text-black">
              Develop Ineo 224e
            </h1>

            <p className="text-sm text-gray-600 mt-2 leading-relaxed">
              A4 Colour Multifunction Printer
              <br />
              Develop Ineo 224e is a high-performance A4 multifunction printer
              designed to deliver exceptional print quality and operational
              efficiency...
            </p>

            <hr className="my-6" />

            {/* Type Selector */}
            <div>
              <p className="text-sm font-medium mb-3">Type:</p>
              <div className="flex gap-3">
                {["Black & White", "Color"].map((type) => (
                  <button
                    key={type}
                    onClick={() => setSelectedType(type)}
                    className={`px-6 py-2 rounded-lg border text-sm ${
                      selectedType === type
                        ? "border-black bg-gray-100"
                        : "border-gray-300"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <hr className="my-6" />

            {/* Price Section */}
            <div className="flex items-center gap-4">
              <span className="text-green-600 font-medium text-sm">10% ↓</span>
              <span className="text-gray-400 line-through text-lg">
                ₹1,53,900
              </span>
              <span className="text-2xl font-semibold text-black">
                ₹1,54,900
              </span>
            </div>

            <hr className="my-6" />

            {/* Buttons */}
            <div className="flex gap-4">
              <button className="flex-1 border border-gray-300 rounded-lg py-3 flex items-center justify-center gap-2 text-sm font-medium hover:bg-gray-50 transition">
                <ShoppingCart size={16} />
                Add To Cart
              </button>

              <button className="flex-1 bg-[#542452] text-white rounded-lg py-3 text-sm font-medium hover:opacity-95 transition">
                Buy Now
              </button>
            </div>

            <hr className="my-6" />

            {/* Warranty */}
            <div>
              <p className="text-sm font-medium mb-3">Grantee / warranty</p>
              <div className="bg-gray-100 rounded-lg py-3 text-center text-sm text-gray-700">
                1 Year Limited Warranty
              </div>
            </div>

            <hr className="my-6" />

            {/* Rating Section */}
            <div>
              <p className="text-sm font-medium mb-3">Rating and reviews</p>

              <div className="flex items-center gap-2 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className="fill-yellow-400 text-yellow-400"
                  />
                ))}
                <span className="text-sm text-gray-600">4.8 (123 reviews)</span>
              </div>

              <div className="flex gap-3 flex-wrap">
                {[
                  "performance 4.7",
                  "build quality 4.7",
                  "value for money 4.7",
                ].map((tag, i) => (
                  <div
                    key={i}
                    className="bg-gray-100 px-4 py-2 rounded-full text-xs text-gray-700"
                  >
                    {tag}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* ================= RELATED PRODUCTS ================= */}
        <div className="mt-20 bg-[white] py-12 px-6 rounded-2xl">
          <h2 className="text-2xl font-semibold text-gray-900 mb-10">
            Related Products
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
            {relatedProducts.map((item) => (
              <div
                key={item.id}
                className="bg-white border rounded-2xl p-5 flex flex-col"
              >
                {/* Image */}
                <div className="h-[140px] flex items-center justify-center">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={120}
                    height={120}
                    className="object-contain"
                  />
                </div>

                {/* Title */}
                <h4 className="text-sm font-medium text-gray-800 mt-4 truncate">
                  {item.title}
                </h4>

                {/* Price */}
                <div className="flex items-center gap-2 mt-2 text-sm">
                  <span className="font-semibold text-black">
                    ₹{item.price}
                  </span>
                  <span className="text-gray-400 line-through">
                    ₹{item.oldPrice}
                  </span>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1 mt-2 text-xs">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className="fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <span className="text-gray-500">
                    ({item.reviews} reviews)
                  </span>
                </div>

                {/* Button */}
                <button className="mt-auto w-full bg-[#542452] text-white py-2 rounded-[24px] text-sm font-medium hover:opacity-90 transition mt-4">
                  Buy Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
