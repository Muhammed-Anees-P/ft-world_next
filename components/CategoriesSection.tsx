"use client";

import { useRef } from "react";
import Image from "next/image";
import Container from "./Container";
import { useQuery } from "@tanstack/react-query";
import { categoriesQuery } from "@/hooks/userCategoriesQuery";

interface Category {
  _id: string;
  name: string;
  imageUrl?: string;
  isActive?: boolean;
}

export default function CategoriesSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const { data = [], isLoading } = useQuery(categoriesQuery());

  const categories: Category[] = data.filter((cat: Category) => cat?.isActive);

  return (
    <section className="w-full bg-[#FFFFFF] py-16">
      <Container>
        <h2
          className="text-[40px] leading-none text-left text-black mb-10"
          style={{ fontWeight: "400" }}
        >
          Categories
        </h2>

        <div
          ref={scrollRef}
          className="flex gap-2.5 overflow-x-auto scroll-smooth no-scrollbar pl-1 pt-1"
        >
          {/* ================= SKELETON LOADER ================= */}
          {isLoading &&
            Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="shrink-0 flex flex-col items-center animate-pulse"
                style={{
                  width: "220px",
                  height: "196px",
                  gap: "14px",
                }}
              >
                {/* IMAGE CARD SKELETON */}
                <div
                  style={{
                    width: "220px",
                    height: "155px",
                    borderRadius: "20px",
                    background: "#E5E7EB",
                  }}
                />

                {/* TEXT SKELETON */}
                <div
                  style={{
                    width: "150px",
                    height: "18px",
                    borderRadius: "6px",
                    background: "#E5E7EB",
                  }}
                />
              </div>
            ))}

          {/* ================= REAL DATA ================= */}
          {!isLoading &&
            categories.length > 0 &&
            categories.map((cat) => (
              <div
                key={cat._id}
                className="shrink-0 flex flex-col items-center"
                style={{
                  width: "220px",
                  height: "196px",
                  gap: "14px",
                }}
              >
                {/* IMAGE CARD */}
                <div
                  style={{
                    width: "220px",
                    height: "155px",
                    paddingTop: "15px",
                    paddingRight: "8px",
                    paddingBottom: "15px",
                    paddingLeft: "8px",
                    borderRadius: "20px",
                    background: "#FFFFFF",
                    boxShadow: "0px 0px 4px 0px #00000040",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {cat.imageUrl && (
                    <div
                      style={{
                        position: "relative",
                        width: "100%",
                        height: "100%",
                      }}
                    >
                      <Image
                        src={cat.imageUrl}
                        alt={cat.name}
                        fill
                        sizes="220px"
                        style={{ objectFit: "contain" }}
                      />
                    </div>
                  )}
                </div>

                {/* CATEGORY NAME */}
                <div
                  style={{
                    width: "220px",
                    height: "27px",
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: 400,
                    fontSize: "18px",
                    lineHeight: "100%",
                    textAlign: "center",
                    color: "#000000",
                  }}
                >
                  {cat.name}
                </div>
              </div>
            ))}
        </div>
      </Container>
    </section>
  );
}
