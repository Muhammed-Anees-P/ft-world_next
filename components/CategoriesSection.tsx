"use client";

import { useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Container from "./Container";

const categories = [
  { name: "Desktops", image: "/cat1.png" },
  { name: "Printers", image: "/cat2.png" },
  { name: "Smart Phones", image: "/cat3.png" },
  { name: "Cameras", image: "/cat4.png" },
  { name: "Head Phones", image: "/cat5.png" },
  { name: "Smart Watches", image: "/cat6.png" },
];

export default function CategoriesSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;

    const { clientWidth } = scrollRef.current;

    scrollRef.current.scrollBy({
      left: direction === "left" ? -clientWidth / 1.5 : clientWidth / 1.5,
      behavior: "smooth",
    });
  };

  return (
    <section className="w-full bg-[#f3f3f3] py-12">
      <Container>
        {/* Title */}
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

          {/* Categories Scroll Container */}
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scroll-smooth no-scrollbar"
          >
            {categories.map((cat, index) => (
              <div
                key={index}
                className="min-w-45 sm:min-w-50 bg-white rounded-xl shadow-md p-4 flex flex-col items-center hover:shadow-lg transition"
              >
                <div className="relative w-30 h-30 mb-4">
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    className="object-contain"
                  />
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
