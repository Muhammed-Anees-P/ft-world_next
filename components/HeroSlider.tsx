"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useBannerQuery } from "@/hooks/useBannerQuery";
import { useBannerStore } from "@/store/bannerStore";
import Container from "@/components/Container";

export default function HeroSlider() {
  const { isLoading } = useBannerQuery();
  const banners = useBannerStore((state) => state.banners);

  const [current, setCurrent] = useState(0);

  const activeBanners = banners.filter((b) => b.isActive);

  const nextSlide = () => {
    if (!activeBanners.length) return;
    setCurrent((prev) => (prev + 1) % activeBanners.length);
  };

  const prevSlide = () => {
    if (!activeBanners.length) return;
    setCurrent(
      (prev) => (prev - 1 + activeBanners.length) % activeBanners.length,
    );
  };

  useEffect(() => {
    if (!activeBanners.length) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % activeBanners.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [activeBanners.length]);

  useEffect(() => {
    if (current >= activeBanners.length) {
      setCurrent(0);
    }
  }, [activeBanners.length, current]);

  if (isLoading || activeBanners.length === 0) {
    return null;
  }

  return (
    <section className="py-10 bg-[#FFFFFF]">
      <Container>
        <div className="relative w-full rounded-3xl overflow-hidden bg-black">
          {/* SLIDER HEIGHT */}
          <div className="relative w-full aspect-16/6 overflow-hidden rounded-3xl">
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
                    sizes="(max-width: 1280px) 100vw, 1280px"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>

            {/* ARROWS */}
            {activeBanners.length > 1 && (
              <>
                <button
                  onClick={prevSlide}
                  className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 items-center justify-center z-10"
                  style={{
                    background: "#D9D9D9",
                    width: "26.643749237060547px",
                    height: "67.0687484741211px",
                    paddingTop: "24px",
                    paddingRight: "2px",
                    paddingBottom: "24px",
                    paddingLeft: "2px",
                    borderRadius: "30px",
                  }}
                >
                  <ChevronLeft size={18} className="text-black" />
                </button>

                <button
                  onClick={nextSlide}
                  className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 items-center justify-center z-10"
                  style={{
                    background: "#D9D9D9",
                    width: "26.643749237060547px",
                    height: "67.0687484741211px",
                    paddingTop: "24px",
                    paddingRight: "2px",
                    paddingBottom: "24px",
                    paddingLeft: "2px",
                    borderRadius: "30px",
                  }}
                >
                  <ChevronRight size={18} className="text-black" />
                </button>
              </>
            )}

            {/* DOTS */}
            {activeBanners.length > 1 && (
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
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
