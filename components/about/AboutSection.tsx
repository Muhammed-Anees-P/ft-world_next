"use client";

import Image from "next/image";
import Container from "@/components/Container";
import {
  ShieldCheck,
  RefreshCcw,
  Users,
  Handshake,
  Headset,
} from "lucide-react";
import PartnersSection from "./PartnersSection";

export default function AboutSection() {
  return (
    <main className="w-full bg-[#FAEDFA]">
      {/* ===== ABOUT FTWORLD ===== */}
      <section className="py-16 md:py-20 bg-white">
        <Container>
          <div className="text-center mb-12 md:mb-20">
            <h2 className="font-semibold text-[32px] sm:text-[42px] md:text-[56px] leading-tight">
              About <span className="text-[#542452]">FTworld</span>
            </h2>

            <p className="text-gray-600 mt-3 md:mt-4 text-sm sm:text-base md:text-lg font-medium">
              Innovating Technology. Empowering the Future.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-10 md:gap-16 items-center">
            {/* IMAGE */}
            <div className="relative w-full h-55 sm:h-65] md:h-80 rounded-2xl overflow-hidden shadow-sm">
              <Image
                src="/about-team1.png"
                alt="Team working"
                fill
                className="object-cover"
              />
            </div>

            {/* TEXT */}
            <div className="space-y-5 md:space-y-6 text-gray-600 leading-relaxed text-sm sm:text-base">
              <p>
                Founded with a vision to deliver advanced technology solutions,
                FT World is committed to providing high-quality electronics,
                smart devices, and innovative business solutions. We serve
                individuals, retailers, and enterprises with reliable products
                that combine performance, design, and affordability.
              </p>

              <p>
                We believe technology should enhance lives, improve efficiency,
                and create new opportunities. FT World continues to grow by
                adapting to market demands and staying ahead with smart,
                future-ready solutions.
              </p>
              <button
                className="bg-[#542452] text-white px-4 py-2 hover:opacity-90 transition rounded-lg w-[200px]"
                style={{ fontWeight: 500 }}
              >
                Free Consultation
              </button>
            </div>
          </div>
        </Container>
      </section>

      {/* ===== WHO WE ARE ===== */}
      <section className="pb-20 bg-[white]">
        <Container>
          {/* TOP ROW (60% / 40%) */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-6">
            {/* FIRST DIV — 60% */}
            <div className="lg:col-span-3 bg-[#FAEDFA] rounded-[20px] p-8 flex flex-col justify-between">
              <div>
                <h3 className="text-2xl md:text-3xl font-semibold mb-4">
                  Who We Are
                </h3>

                <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-6">
                  At FT World, we are a team of passionate professionals focused
                  on innovation, service excellence, and long-term partnerships.
                  We believe technology should simplify operations, enhance
                  security, and improve everyday life.
                </p>
              </div>

              <div className="relative w-full h-[200px] rounded-[20px] overflow-hidden">
                <Image
                  src="/about-team2.png"
                  alt="Team discussion"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* SECOND DIV — 40% */}
            <div className="lg:col-span-2 bg-[#FAEDFA] rounded-[20px] p-8 flex flex-col justify-between">
              <div>
                <h3 className="text-2xl md:text-3xl font-semibold mb-4">
                  Who We Are
                </h3>

                <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-6">
                  At FT World, we are a team of passionate professionals focused
                  on innovation, service excellence, and long-term partnerships.
                  We believe technology should simplify operations and improve
                  everyday life.
                </p>
              </div>

              <div className="relative w-full h-[200px] rounded-[20px] overflow-hidden">
                <Image
                  src="/about-team2.png"
                  alt="Team discussion"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* BOTTOM FULL WIDTH CARD */}
          <div className="bg-[#FAEDFA] rounded-[20px] px-12 py-8 flex flex-col lg:flex-row items-center gap-10">
            <div className="flex-1">
              <h3 className="text-2xl md:text-3xl font-semibold mb-4">
                Who We Are
              </h3>

              <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                At FT World, we are a team of passionate professionals focused
                on innovation, service excellence, and long-term partnerships.
                We believe technology should simplify operations, enhance
                security, and improve everyday life.
              </p>
            </div>

            <div className="relative w-full lg:w-[600px] h-[220px] rounded-[20px] overflow-hidden">
              <Image
                src="/about-team2.png"
                alt="Team discussion"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </Container>
      </section>
      {/* ===== OUR PARTNERS ===== */}
      <PartnersSection />
    </main>
  );
}
