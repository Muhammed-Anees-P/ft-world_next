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
    } catch (error) {
      console.error("Failed to fetch categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  if (loading) return null;
  if (categories.length === 0) return null;

  return (
    <section className="w-full bg-[#FFFFFF] py-12">
      <Container>
        <h2 className="text-2xl font-semibold mb-8">Categories</h2>

        <div className="relative">
          {/* Left Button */}
          <button
            onClick={() => scroll("left")}
            className="hidden md:flex absolute -left-4 top-1/2 -translate-y-1/2
                       w-10 h-10 bg-white shadow-md rounded-full
                       items-center justify-center z-10"
          >
            <ChevronLeft size={20} />
          </button>

          {/* Scroll Container */}
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scroll-smooth no-scrollbar"
          >
            {categories.map((cat) => (
              <div
                key={cat._id}
                className="min-w-[160px] sm:min-w-[180px] bg-white rounded-xl shadow-md p-4 flex flex-col items-center hover:shadow-lg transition"
              >
                <div className="relative w-28 h-28 mb-4">
                  {cat.imageUrl && (
                    <Image
                      src={cat.imageUrl}
                      alt={cat.name}
                      fill
                      sizes="120px"
                      className="object-contain"
                    />
                  )}
                </div>

                <p className="text-sm font-medium text-center">{cat.name}</p>
              </div>
            ))}
          </div>

          {/* Right Button */}
          <button
            onClick={() => scroll("right")}
            className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2
                       w-10 h-10 bg-white shadow-md rounded-full
                       items-center justify-center z-10"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </Container>
    </section>
  );
}
