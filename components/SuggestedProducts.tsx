"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import Container from "./Container";
import { useSuggestedProductListQuery } from "@/hooks/useProductQuery";
import { ArrowRight, Star } from "lucide-react";
import { IProduct } from "@/types/IProducts;";

export default function SuggestedProducts() {
  const router = useRouter();

  const { data = [], isLoading } = useQuery(useSuggestedProductListQuery());

  const products: IProduct[] = data;

  if (isLoading || products.length === 0) {
    return null;
  }

  const limitedProducts = products.slice(0, 10);

  return (
    <section
      style={{
        background: "#F4F4F4",
        height: "599px",
      }}
      className="w-full py-10"
    >
      <Container>
        {/* HEADER */}
        <div className="flex items-center justify-between mb-10">
          <h2
            style={{
              fontSize: "40px",
              fontWeight: 400,
              color: "#000",
            }}
          >
            Suggested For You
          </h2>

          <button
            onClick={() => router.push("/suggested-products")}
            style={{
              width: "128px",
              height: "44px",
              borderRadius: "10px",
              paddingTop: "11px",
              paddingRight: "36px",
              paddingBottom: "11px",
              paddingLeft: "36px",
              background: "#542452",
              color: "#FFFFFF",
              fontSize: "14px",
              fontWeight: 500,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
              cursor: "pointer",
            }}
          >
            More <ArrowRight size={20} />
          </button>
        </div>

        {/* PRODUCTS LIST */}
        <div
          style={{
            height: "429px",
            gap: "20px",
          }}
          className="flex overflow-x-auto scroll-smooth no-scrollbar"
        >
          {limitedProducts.map((product) => (
            <div
              key={product._id}
              style={{
                width: "276px",
                height: "429px",
              }}
              className="shrink-0"
            >
              {/* IMAGE CARD */}
              <div
                style={{
                  width: "276px",
                  height: "351px",
                  borderRadius: "20px",
                  background:
                    "linear-gradient(0deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2)), linear-gradient(180.63deg, rgba(0, 0, 0, 0) 49.14%, rgba(0, 0, 0, 0.9) 99.46%)",
                  boxShadow: "0px 0px 4px 0px #00000040",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* PRODUCT IMAGE */}
                <Image
                  src={product.images?.[0]}
                  alt={product.name}
                  fill
                  sizes="276px"
                  style={{
                    objectFit: "cover",
                  }}
                />

                {/* RATING BADGE */}
                {/* {product.rating && ( */}
                <div
                  style={{
                    position: "absolute",
                    bottom: "12px",
                    left: "12px",
                    background: "#FFFFFF",
                    borderRadius: "20px",
                    padding: "4px 8px",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    fontSize: "12px",
                    fontWeight: 500,
                    boxShadow: "0px 0px 4px rgba(0,0,0,0.2)",
                    zIndex: 2,
                  }}
                >
                  {4.5}
                  <Star size={12} fill="#22C55E" stroke="#22C55E" />
                </div>
                {/* )} */}
              </div>

              {/* PRODUCT NAME */}
              <p
                style={{
                  marginTop: "12px",
                  fontSize: "22px",
                  fontWeight: 400,
                  color: "#000",
                }}
              >
                {product.name}
              </p>

              {/* PRICE */}
              <div className="flex items-center gap-2 mt-1">
                <span
                  style={{
                    fontSize: "20px",
                    fontWeight: 600,
                    color: "#000",
                  }}
                >
                  ₹{product.price}
                </span>

                {/* {product.originalPrice && ( */}
                <span
                  style={{
                    fontSize: "19px",
                    textDecoration: "line-through",
                    color: "#777",
                  }}
                >
                  {/* ₹{product.originalPrice} */}₹{500}
                </span>
                {/* )} */}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
