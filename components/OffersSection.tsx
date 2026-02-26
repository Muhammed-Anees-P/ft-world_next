"use client";

import { useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import Container from "./Container";
import { useOfferProductListQuery } from "@/hooks/useProductQuery";
import { ArrowRight } from "lucide-react";
import { IProduct } from "@/types/IProducts;";

export default function OffersSection() {
  const router = useRouter();
  const scrollRef = useRef<HTMLDivElement>(null);

  const { data = [], isLoading } = useQuery(useOfferProductListQuery());

  const products: IProduct[] = data;

  if (isLoading || products.length === 0) return null;

  const limitedProducts = products.slice(0, 10);

  return (
    <section className="w-full py-10 bg-[#FFFFFF]">
      <Container>
        {/* HEADER */}
        <div className="flex items-center justify-between mb-8">
          <h2
            className=" text-black"
            style={{
              fontSize: "40px",
              fontWeight: 400,
              color: "#000",
            }}
          >
            Offers
          </h2>

          <button
            onClick={() => router.push("/offers")}
            className="flex items-center gap-2 bg-[#542452] text-white text-sm px-5 py-2 rounded-lg"
          >
            More <ArrowRight size={16} />
          </button>
        </div>

        {/* SLIDER */}
        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto scroll-smooth no-scrollbar"
        >
          {limitedProducts.map((product) => (
            <div
              key={product._id}
              className="shrink-0"
              style={{ width: "277px" }}
            >
              {/* IMAGE CARD */}
              <div
                style={{
                  width: "277px",
                  height: "272px",
                  borderRadius: "20px",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <Image
                  src={product.images?.[0]}
                  alt={product.name}
                  fill
                  sizes="277px"
                  style={{ objectFit: "cover" }}
                />

                {/* GRADIENT OVERLAY */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(180.16deg, rgba(0, 0, 0, 0) 33.8%, rgba(0, 0, 0, 0.6) 99.86%)",
                  }}
                />

                {/* BOTTOM RED CARD */}
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    width: "277px",
                    height: "49px",
                    paddingTop: "7px",
                    paddingRight: "20px",
                    paddingBottom: "7px",
                    paddingLeft: "20px",
                    borderBottomRightRadius: "20px",
                    borderBottomLeftRadius: "20px",
                    background: "#A92C2C",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#FFFFFF",
                    fontWeight: 500,
                    fontSize: "22px",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {product.offerDescription}
                </div>
              </div>

              {/* PRODUCT NAME */}
              <p
                className="mt-3 text-black"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 500,
                  fontSize: "22px",
                }}
              >
                {product.name}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
