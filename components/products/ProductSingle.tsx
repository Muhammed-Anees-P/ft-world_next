"use client";

import Image from "next/image";
import Container from "@/components/Container";
import { Star, Heart, ShoppingCart } from "lucide-react";
import { useState } from "react";

const product = {
  title: "Develop Ineo 224e",
  subtitle: "A4 Colour Multifunction Printer - 25 ppm",
  price: "₹54,900",
  oldPrice: "₹63,900",
  rating: 4,
  reviews: 48,
  description:
    "Develop Ineo 224e is a high-performance A4 multifunction printer designed to deliver exceptional print quality and operational efficiency.",
  features: [
    "Print, copy, scan, and optional fax functionality",
    "25 pages per minute speed in colour and black/white",
    "Intuitive 7-inch colour touchscreen control panel",
    "Advanced security and eco-friendly features",
  ],
  images: ["/printer1.png", "/printer2.png", "/printer1.png", "/printer2.png"],
};

const relatedProducts = [
  {
    id: 1,
    title: "Canon image M...",
    image: "/printer2.png",
  },
  {
    id: 2,
    title: "Canon image M...",
    image: "/printer2.png",
  },
  {
    id: 3,
    title: "Canon image M...",
    image: "/printer2.png",
  },
  {
    id: 4,
    title: "Canon image M...",
    image: "/printer2.png",
  },
];

export default function ProductSinglePage() {
  const [selectedImage, setSelectedImage] = useState(product.images[0]);

  return (
    <section className="w-full bg-[#FFFFFF] py-16">
      <Container>
        {/* ================= TOP SECTION ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* LEFT - Images */}
          <div>
            <div className="relative bg-white rounded-3xl p-6 shadow-sm">
              <Image
                src={selectedImage}
                alt="product"
                width={500}
                height={500}
                className="object-contain mx-auto"
              />
            </div>

            {/* Thumbnails */}
            <div className="flex gap-4 mt-6">
              {product.images.map((img, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedImage(img)}
                  className={`cursor-pointer bg-white rounded-xl p-3 shadow-sm border ${
                    selectedImage === img
                      ? "border-purple-600"
                      : "border-transparent"
                  }`}
                >
                  <Image
                    src={img}
                    alt="thumb"
                    width={80}
                    height={80}
                    className="object-contain"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT - Details */}
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">
              {product.title}
            </h1>

            <p className="text-gray-500 mt-2">{product.subtitle}</p>

            {/* Rating */}
            <div className="flex items-center gap-2 mt-3">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  className={
                    i < product.rating
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                  }
                />
              ))}
              <span className="text-sm text-gray-500">
                ({product.reviews} Reviews)
              </span>
            </div>

            {/* Price */}
            <div className="mt-6">
              <span className="text-2xl font-semibold text-gray-900">
                {product.price}
              </span>
              <span className="ml-3 text-gray-400 line-through">
                {product.oldPrice}
              </span>
            </div>

            {/* Description */}
            <p className="text-gray-600 text-sm mt-6 leading-relaxed">
              {product.description}
            </p>

            {/* Features */}
            <div className="mt-6">
              <h3 className="font-semibold text-gray-900 mb-3">Key Features</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">✔</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Buttons */}
            <div className="mt-8 space-y-4">
              {/* Add To Cart + Wishlist */}
              <div className="flex gap-3">
                <button className="flex-1 border border-gray-300 rounded-lg py-3 flex items-center justify-center gap-2 hover:bg-gray-50 transition text-sm font-medium">
                  <ShoppingCart size={16} />
                  Add To Cart
                </button>

                <button className="w-12 h-12 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50 transition">
                  <Heart size={18} />
                </button>
              </div>

              {/* Buy Now */}
              <button
                style={{
                  background:
                    "linear-gradient(180deg, #542452 0%, #BA50B6 100%)",
                }}
                className="w-full text-white rounded-lg py-3 text-sm font-medium hover:opacity-95 transition"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>

        {/* ================= RELATED PRODUCTS ================= */}
        <div className="mt-20">
          <h2 className="text-xl font-semibold text-gray-900 mb-8">
            Related Products
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl p-6 shadow-sm text-center"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  width={160}
                  height={160}
                  className="object-contain mx-auto"
                />

                <h4 className="text-sm font-medium text-gray-800 mt-4">
                  {item.title}
                </h4>

                <button
                  className="mt-4 w-full text-white py-2 rounded-lg text-sm"
                  style={{
                    background:
                      "linear-gradient(180deg, #542452 0%, #BA50B6 100%)",
                  }}
                >
                  Buy
                </button>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
