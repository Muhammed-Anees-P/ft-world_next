"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Container from "./Container";
import AXIOS from "@/lib/axios";

interface Category {
  _id: string;
  name: string;
  imageUrl?: string;
  isActive?: boolean;
}

export default function CategoriesSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [showArrows, setShowArrows] = useState(false);

  const checkOverflow = () => {
    if (!scrollRef.current) return;
    const { scrollWidth, clientWidth } = scrollRef.current;
    setShowArrows(scrollWidth > clientWidth);
  };

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;

    const { clientWidth } = scrollRef.current;

    scrollRef.current.scrollBy({
      left: direction === "left" ? -clientWidth / 1.5 : clientWidth / 1.5,
      behavior: "smooth",
    });
  };

  const fetchCategories = async () => {
    try {
      const res = await AXIOS.get("/categories");
      const data = res.data.data || [];
      const activeCategories = data.filter((cat: Category) => cat?.isActive);
      setCategories(activeCategories);
    } catch {
      console.error("Failed to fetch categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    checkOverflow();
    window.addEventListener("resize", checkOverflow);
    return () => window.removeEventListener("resize", checkOverflow);
  }, [categories]);

  if (loading) return null;
  if (categories.length === 0) return null;

  return (
    <section className="w-full bg-[#F5F5F5] py-16">
      <Container>
        <h2
          className="text-[40px]  leading-none text-left text-black mb-10"
          style={{ fontWeight: "400" }}
        >
          Categories
        </h2>

        <div className="relative">
          {/* LEFT BUTTON */}
          {showArrows && (
            <button
              onClick={() => scroll("left")}
              className="
                hidden md:flex
                absolute left-0 top-1/2 -translate-y-1/2
                -translate-x-1/2
                w-10 h-10
                bg-white border border-gray-200
                rounded-full
                items-center justify-center
                shadow-sm hover:shadow-md
                transition
                z-20
              "
            >
              <ChevronLeft size={20} />
            </button>
          )}

          {/* SCROLL CONTAINER */}
          <div
            ref={scrollRef}
            className="flex gap-8 overflow-x-auto scroll-smooth no-scrollbar"
          >
            {categories.map((cat) => (
              <div
                key={cat._id}
                className="flex-shrink-0 w-[276px] flex flex-col items-center group"
              >
                {/* CARD */}
                <div
                  className="
                    w-full h-[195px]
                    rounded-[20px]
                    bg-gradient-to-b from-white to-gray-50
                    border border-gray-200
                    shadow-[0px_0px_4px_0px_#00000020]
                    flex items-center justify-center
                    transition-all duration-300
                    group-hover:shadow-[0px_8px_20px_0px_#00000025]
                    group-hover:-translate-y-2
                  "
                >
                  {cat.imageUrl && (
                    <div className="relative w-[80%] h-[80%] transition-transform duration-300 group-hover:scale-105">
                      <Image
                        src={cat.imageUrl}
                        alt={cat.name}
                        fill
                        sizes="276px"
                        className="object-contain"
                      />
                    </div>
                  )}
                </div>

                {/* TITLE */}
                <p className="mt-5 text-base font-medium text-center transition-colors duration-300 group-hover:text-[#542452]">
                  {cat.name}
                </p>
              </div>
            ))}
          </div>

          {/* RIGHT BUTTON */}
          {showArrows && (
            <button
              onClick={() => scroll("right")}
              className="
                hidden md:flex
                absolute right-0 top-1/2 -translate-y-1/2
                translate-x-1/2
                w-10 h-10
                bg-white border border-gray-200
                rounded-full
                items-center justify-center
                shadow-sm hover:shadow-md
                transition
                z-20
              "
            >
              <ChevronRight size={20} />
            </button>
          )}
        </div>
      </Container>
    </section>
  );
}
