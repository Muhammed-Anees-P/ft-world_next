"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import AXIOS from "@/lib/axios";

interface Banner {
  _id: string;
  imageUrl: string;
  isActive?: boolean;
}

export default function HeroSlider() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [current, setCurrent] = useState(0);

  const activeBanners = banners.filter((b) => b.isActive);

  const nextSlide = () => {
    if (activeBanners.length === 0) return;
    setCurrent((prev) => (prev + 1) % activeBanners.length);
  };

  const prevSlide = () => {
    if (activeBanners.length === 0) return;
    setCurrent(
      (prev) => (prev - 1 + activeBanners.length) % activeBanners.length,
    );
  };

  const fetchBanners = async () => {
    try {
      const res = await AXIOS.get("/banner");
      setBanners(res.data.data || []);
    } catch (error) {
      console.error("Failed to fetch banners");
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  // Auto Slide
  useEffect(() => {
    if (activeBanners.length === 0) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % activeBanners.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [activeBanners.length]);

  if (activeBanners.length === 0) {
    return null; // hide section if no active banners
  }

  return (
    <section className="relative w-full bg-black overflow-hidden">
      <div className="relative w-full aspect-[16/6] overflow-hidden">
        {/* Slide Track */}
        <div
          className="flex h-full w-full transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {activeBanners.map((banner, index) => (
            <div
              key={banner._id}
              className="min-w-full h-full relative shrink-0"
            >
              <Image
                src={banner.imageUrl}
                alt={`banner-${index}`}
                fill
                priority={index === 0}
                sizes="100vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>

        {/* Left Arrow */}
        <button
          onClick={prevSlide}
          className="hidden md:flex absolute left-6 top-1/2 -translate-y-1/2
                     w-12 h-12
                     bg-white/80 hover:bg-white
                     rounded-full
                     items-center justify-center
                     shadow-md transition z-10"
        >
          <ChevronLeft size={24} className="text-black" />
        </button>

        {/* Right Arrow */}
        <button
          onClick={nextSlide}
          className="hidden md:flex absolute right-6 top-1/2 -translate-y-1/2
                     w-12 h-12
                     bg-white/80 hover:bg-white
                     rounded-full
                     items-center justify-center
                     shadow-md transition z-10"
        >
          <ChevronRight size={24} className="text-black" />
        </button>

        {/* Dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
          {activeBanners.map((_, index) => (
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
