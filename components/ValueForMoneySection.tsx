"use client";

import Image from "next/image";
import Container from "./Container";

const products = [
  {
    title: "BlinkOutdoor HD camera",
    description:
      "The Develop ineo+ 251i is a cost-effective A3 colour multifunction printer ideal for small to medium offices. Priced at £1950 or £40 per month, it delivers 25 ppm in colour and black & white. It supports copy, print, and scan (FTP, SMB, WebDAV, email), duplex printing, mobile connectivity (Android/iOS), and features a 10.1-inch touch panel. Compact yet versatile, it handles up to 300gsm paper, includes full toners, and comes with a comprehensive service plan.",
    priceOld: "35,975",
    priceNew: "34,900",
    images: ["/vf1.jpg", "/vf2.jpg", "/vf3.jpg"],
    rating: "4.3",
    reverse: false,
  },
  {
    title: "Smart Digital Door Lock",
    description:
      "Secure your home with advanced biometric authentication and smart locking technology. Designed for durability and style, this door lock supports PIN, fingerprint, and mobile app access with long battery life and emergency key support.",
    priceOld: "42,500",
    priceNew: "39,999",
    images: ["/vf4.jpg", "/vf5.jpg", "/vf6.jpg"],
    rating: "4.2",
    reverse: true,
  },
];

export default function ValueForMoneySection() {
  return (
    <section className="w-full bg-[#f3f3f3] py-20">
      <Container>
        <h2 className="text-2xl md:text-3xl font-semibold mb-14">
          Value For Money
        </h2>

        <div className="space-y-20">
          {products.map((product, index) => (
            <div
              key={index}
              className={`flex flex-col lg:flex-row gap-12 items-center ${
                product.reverse ? "lg:flex-row-reverse" : ""
              }`}
            >
              {/* Images */}
              <div className="flex gap-4 flex-1">
                {product.images.map((img, i) => (
                  <div
                    key={i}
                    className="relative w-full h-55 md:h-65 rounded-xl overflow-hidden shadow-md"
                  >
                    <Image
                      src={img}
                      alt={product.title}
                      fill
                      className="object-cover"
                    />

                    {/* Rating Badge (only on last image) */}
                    {i === product.images.length - 1 && (
                      <div className="absolute bottom-3 right-3 bg-green-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                        {product.rating} ★
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Content */}
              <div className="flex-1 space-y-6">
                <h3 className="text-xl md:text-2xl font-semibold">
                  {product.title}
                </h3>

                <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                  {product.description}
                </p>

                {/* Price Section */}
                <div className="flex items-center gap-4 flex-wrap">
                  <span className="line-through text-gray-400 text-lg">
                    {product.priceOld}
                  </span>

                  <span className="text-2xl font-bold">{product.priceNew}</span>

                  <span className="text-green-600 text-xl">↓</span>

                  <button className="ml-auto bg-linear-to-r from-[#7A2E7A] to-[#C53BD2] text-white px-6 py-2 rounded-lg shadow-md hover:opacity-90 transition">
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
