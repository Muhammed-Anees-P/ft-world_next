"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const images = ["/banner1.png", "/banner2.png", "/banner1.png"];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  };

  // Auto Slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full bg-black overflow-hidden">
      {/* Aspect Ratio Keeps Same Look On All Screens */}
      <div className="relative w-full aspect-16/6 overflow-hidden">
        {/* Slide Track */}
        <div
          className="flex h-full w-full transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {images.map((img, index) => (
            <div key={index} className="min-w-full h-full relative shrink-0">
              <Image
                src={img}
                alt={`slide-${index}`}
                fill
                priority={index === 0}
                sizes="100vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>

        {/* Left Arrow - Hidden on Mobile */}
        <button
          onClick={prevSlide}
          className="hidden md:flex absolute left-6 top-1/2 -translate-y-1/2 
                     w-12 h-28 lg:w-8 lg:h-19
                     bg-gray-200/90 hover:bg-gray-300
                     rounded-full
                     items-center justify-center
                     shadow-md transition z-10"
        >
          <ChevronLeft size={26} className="text-black" />
        </button>

        {/* Right Arrow - Hidden on Mobile */}
        <button
          onClick={nextSlide}
          className="hidden md:flex absolute right-6 top-1/2 -translate-y-1/2 
                     w-12 h-28 lg:w-8 lg:h-19
                     bg-gray-200/90 hover:bg-gray-300
                     rounded-full
                     items-center justify-center
                     shadow-md transition z-10"
        >
          <ChevronRight size={26} className="text-black" />
        </button>

        {/* Dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
          {images.map((_, index) => (
            <div
              key={index}
              onClick={() => setCurrent(index)}
              className={`h-1 rounded-full cursor-pointer transition-all duration-300 ${
                current === index ? "w-8 bg-white" : "w-3 bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
