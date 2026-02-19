"use client";

import Image from "next/image";
import Container from "./Container";

const products = [
  {
    title: "Develop ineo 224e",
    description:
      "A4 colour multifunction printer, 25 ppm in colour and black & white.",
    image: "/prod1.jpg",
  },
  {
    title: "POSTFLOW PSF-11",
    description:
      "80mm Built-in Thermal Printer, Portable System offers Seamless Transactions.",
    image: "/prod2.jpg",
  },
  {
    title: "K9 patrols CCTV",
    description:
      "K9 Dog Handlers for High-Threat Environments & Security Solutions.",
    image: "/prod3.jpg",
  },
  {
    title: "MI Android POS Terminal",
    description:
      "Empowering digital payments on the move with modern POS technology.",
    image: "/prod4.png",
  },
  {
    title: "BlinkOutdoor HD camera",
    description:
      "Monitor your home day and night with infrared night vision in the dark.",
    image: "/prod5.jpg",
  },
  {
    title: "Canon Image MF451dw",
    description:
      "All-in-One Wireless Monochrome Laser Printer with advanced features.",
    image: "/prod6.jpg",
  },
];

export default function OurProductsSection() {
  return (
    <section className="w-full bg-[#F9EFF8] py-16">
      <Container>
        {/* Section Title */}
        <h2 className="text-2xl md:text-3xl font-semibold mb-12">
          Our Products
        </h2>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <div
              key={index}
              className="relative group rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition duration-300"
            >
              {/* Image */}
              <div className="relative h-80">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-cover group-hover:scale-105 transition duration-500"
                />
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent p-6 flex flex-col justify-end">
                <h3 className="text-white text-lg font-semibold mb-2">
                  {product.title}
                </h3>
                <p className="text-white/80 text-sm">{product.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
