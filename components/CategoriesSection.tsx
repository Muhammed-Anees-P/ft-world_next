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

interface Props {
  selectedCategory?: string;
  onCategoryClick?: (id?: string) => void;
}

export default function CategoriesSection({
  selectedCategory,
  onCategoryClick,
}: Props) {
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
                <div
                  style={{
                    width: "220px",
                    height: "155px",
                    borderRadius: "20px",
                    background: "#E5E7EB",
                  }}
                />
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

          {!isLoading &&
            categories.map((cat) => {
              const isActive = selectedCategory === cat._id;

              return (
                <div
                  key={cat._id}
                  onClick={() => onCategoryClick?.(cat._id)}
                  className="shrink-0 flex flex-col items-center cursor-pointer transition-all duration-300"
                  style={{
                    width: "220px",
                    height: "196px",
                    gap: "14px",
                  }}
                >
                  {/* CARD */}
                  <div
                    style={{
                      width: "220px",
                      height: "155px",
                      padding: "15px 8px",
                      borderRadius: "20px",
                      background: "#FFFFFF",
                      border: isActive
                        ? "2px solid #542452"
                        : "2px solid transparent",
                      boxShadow: isActive
                        ? "0px 4px 12px rgba(84,36,82,0.25)"
                        : "0px 0px 4px rgba(0,0,0,0.15)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transform: isActive ? "scale(1.03)" : "scale(1)",
                    }}
                  >
                    {cat.imageUrl && (
                      <div className="relative w-full h-full">
                        <Image
                          src={cat.imageUrl}
                          alt={cat.name}
                          fill
                          sizes="220px"
                          style={{
                            objectFit: "contain",
                          }}
                        />
                      </div>
                    )}
                  </div>

                  {/* NAME */}
                  <div
                    style={{
                      width: "220px",
                      height: "27px",
                      fontFamily: "Poppins, sans-serif",
                      fontWeight: isActive ? 600 : 400,
                      fontSize: "18px",
                      textAlign: "center",
                      color: isActive ? "#542452" : "#000000",
                      transition: "all 0.3s ease",
                    }}
                  >
                    {cat.name}
                  </div>
                </div>
              );
            })}
        </div>
      </Container>
    </section>
  );
}
