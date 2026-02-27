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
      <section className="pb-16 md:pb-24 bg-white">
        <Container>
          <div className="bg-[#F2E3F2] rounded-2xl md:rounded-3xl px-6 sm:px-10 md:px-14 py-8 md:py-12 grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* TEXT */}
            <div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-4 md:mb-6">
                Who We Are
              </h3>

              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                At FT World, we are a team of passionate professionals focused
                on innovation, service excellence, and long-term partnerships.
                We believe technology should simplify operations, enhance
                security, and improve everyday life.
              </p>
            </div>

            {/* IMAGE */}
            <div className="relative w-full h-50 sm:h-57.5 md:h-65 rounded-2xl overflow-hidden shadow-sm">
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

      {/* ===== OUR APPROACH ===== */}
      <section className="pb-16 md:pb-24 bg-white">
        <Container>
          <h3 className="text-xl sm:text-2xl font-semibold mb-8 md:mb-12">
            Our approach is built on
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 md:gap-6">
            {[
              {
                icon: <ShieldCheck size={26} />,
                text: "Quality-first product selection",
              },
              {
                icon: <RefreshCcw size={26} />,
                text: "Continuous innovation",
              },
              {
                icon: <Users size={26} />,
                text: "Customer-centric service",
              },
              {
                icon: <Handshake size={26} />,
                text: "Ethical and transparent business",
              },
              {
                icon: <Headset size={26} />,
                text: "Reliable after-sales support",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-5 md:p-6 text-center shadow-sm hover:shadow-md transition"
              >
                <div className="flex justify-center text-[#542452] mb-3 md:mb-4">
                  {item.icon}
                </div>
                <p className="text-sm md:text-base text-gray-700">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}
