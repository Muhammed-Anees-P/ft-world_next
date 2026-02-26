"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Container from "@/components/Container";
import { useQuery } from "@tanstack/react-query";
import { useValueForMoneyProductListQuery } from "@/hooks/useProductQuery";

interface IProduct {
  _id: string;
  name: string;
  description?: string;
  price: number;
  originalPrice?: number;
  images: string[];
  discountPercentage: number;
  discountPrice: number;
}

export default function ValueForMoneySection() {
  const { data = [], isLoading } = useQuery(useValueForMoneyProductListQuery());

  const products: IProduct[] = data;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [expanded, setExpanded] = useState(false);

  // Auto switch every 5 seconds
  useEffect(() => {
    if (!products.length) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % products.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [products.length]);

  if (isLoading || products.length === 0) return null;

  const product = products[currentIndex];

  return (
    <section className="w-full py-16 bg-white">
      <Container>
        {/* HEADING */}
        <h2
          className="text-center lg:text-left"
          style={{
            fontFamily: "Poppins, sans-serif",
            fontWeight: 500,
            fontSize: "40px",
            lineHeight: "100%",
          }}
        >
          Value For Money
        </h2>

        {/* MAIN WRAPPER */}
        <div className="flex flex-col lg:flex-row gap-12 mt-14">
          {/* ================= LEFT IMAGE GRID ================= */}
          <div className="w-full lg:w-[60%] flex flex-col gap-[23px]">
            {/* TOP ROW */}
            <div className="flex flex-col sm:flex-row gap-[23px]">
              <div className="relative w-full sm:w-[70%] h-[200px] sm:h-[201px] rounded-[20px] overflow-hidden bg-[#BE6161]">
                <Image
                  src={product.images?.[0] || "/placeholder.jpg"}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="relative w-full sm:w-[30%] h-[200px] sm:h-[201px] rounded-[20px] overflow-hidden bg-[#BE6161]">
                <Image
                  src={
                    product.images?.[1] ||
                    product.images?.[0] ||
                    "/placeholder.jpg"
                  }
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* BOTTOM ROW */}
            <div className="flex flex-col sm:flex-row gap-[23px]">
              <div className="relative w-full sm:w-[25%] h-[200px] rounded-[20px] overflow-hidden bg-[#BE6161]">
                <Image
                  src={
                    product.images?.[2] ||
                    product.images?.[0] ||
                    "/placeholder.jpg"
                  }
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="relative w-full sm:w-[25%] h-[200px] rounded-[20px] overflow-hidden bg-[#BE6161]">
                <Image
                  src={
                    product.images?.[3] ||
                    product.images?.[0] ||
                    "/placeholder.jpg"
                  }
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="relative w-full sm:w-[50%] h-[200px] rounded-[20px] overflow-hidden bg-[#BE6161]">
                <Image
                  src={
                    product.images?.[4] ||
                    product.images?.[0] ||
                    "/placeholder.jpg"
                  }
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* ================= RIGHT CONTENT ================= */}
          <div className="w-full lg:w-[40%] flex flex-col justify-center gap-[25px]">
            {/* PRODUCT NAME */}
            <h3
              style={{
                fontFamily: "Poppins, sans-serif",
                fontWeight: 600,
                fontSize: "28px",
                lineHeight: "100%",
              }}
            >
              {product.name}
            </h3>

            {/* DESCRIPTION */}
            <p
              className="text-gray-600 text-sm leading-relaxed"
              style={{
                fontFamily: "Poppins, sans-serif",
              }}
            >
              {product.description ? (
                <>
                  {expanded
                    ? product.description
                    : product.description.slice(0, 400)}

                  {product.description.length > 400 && (
                    <span
                      onClick={() => setExpanded(!expanded)}
                      style={{
                        color: "#542452",
                        fontWeight: 500,
                        cursor: "pointer",
                        marginLeft: "6px",
                      }}
                    >
                      {expanded ? "Read Less" : "... Read More"}
                    </span>
                  )}
                </>
              ) : (
                "No description available."
              )}
            </p>

            {/* PRICE */}
            <div className="flex items-center gap-4">
              {product.discountPercentage > 0 && (
                <span className="text-green-600 text-lg font-medium">
                  {product.discountPercentage}% ↓
                </span>
              )}

              {product.originalPrice && (
                <span className="text-gray-400 line-through">
                  ₹{product.originalPrice}
                </span>
              )}

              <span className="text-2xl font-semibold">
                ₹{product.discountPrice}
              </span>
            </div>

            {/* BUY NOW */}
            <button
              className="w-[277px] h-[48px] rounded-[10px] text-white"
              style={{
                background: "#542452",
              }}
            >
              Buy Now
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
}
