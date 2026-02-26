"use client";

import Image from "next/image";
import Container from "@/components/Container";

export default function ValueForMoneySection() {
  return (
    <section className="w-full py-16 bg-white">
      <Container>
        {/* HEADING */}
        <h2
          className="text-center lg:text-left"
          style={{
            fontFamily: "Poppins, sans-serif",
            fontWeight: 500,
            fontSize: "40px",
            lineHeight: "100%",
          }}
        >
          Value For Money
        </h2>

        {/* MAIN WRAPPER */}
        <div className="flex flex-col lg:flex-row gap-12 mt-14">
          {/* ================= LEFT IMAGE GRID ================= */}
          <div className="w-full lg:w-[60%] flex flex-col gap-[23px]">
            {/* TOP ROW */}
            <div className="flex flex-col sm:flex-row gap-[23px]">
              <div className="relative w-full sm:w-[70%] h-[200px] sm:h-[201px] rounded-[20px] overflow-hidden bg-[#BE6161]">
                <Image
                  src="/sample1.jpg"
                  alt="img1"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="relative w-full sm:w-[30%] h-[200px] sm:h-[201px] rounded-[20px] overflow-hidden bg-[#BE6161]">
                <Image
                  src="/sample2.jpg"
                  alt="img2"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* BOTTOM ROW */}
            <div className="flex flex-col sm:flex-row gap-[23px]">
              <div className="relative w-full sm:w-[25%] h-[200px] rounded-[20px] overflow-hidden bg-[#BE6161]">
                <Image
                  src="/sample3.jpg"
                  alt="img3"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="relative w-full sm:w-[25%] h-[200px] rounded-[20px] overflow-hidden bg-[#BE6161]">
                <Image
                  src="/sample4.jpg"
                  alt="img4"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="relative w-full sm:w-[50%] h-[200px] rounded-[20px] overflow-hidden bg-[#BE6161]">
                <Image
                  src="/sample5.jpg"
                  alt="img5"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* ================= RIGHT CONTENT ================= */}
          <div className="w-full lg:w-[40%] flex flex-col justify-center gap-[25px]">
            {/* PRODUCT NAME */}
            <h3
              style={{
                fontFamily: "Poppins, sans-serif",
                fontWeight: 600,
                fontSize: "28px",
                lineHeight: "100%",
              }}
            >
              BlinkOutdoor HD camera
            </h3>

            {/* DESCRIPTION */}
            <p
              className="text-gray-600 text-sm leading-relaxed"
              style={{
                fontFamily: "Poppins, sans-serif",
              }}
            >
              The Develop Ineo+ 251i is a cost-effective A3 colour multifunction
              printer ideal for small to medium offices. It delivers 25 ppm in
              colour and black & white, supports copy, print and scan with
              advanced mobile connectivity.
            </p>

            {/* PRICE */}
            <div className="flex items-center gap-4">
              <span className="text-green-600 text-lg font-medium">30% ↓</span>

              <span className="text-gray-400 line-through">₹35,975</span>

              <span className="text-2xl font-semibold">₹34,900</span>
            </div>

            {/* BUY NOW */}
            <button
              className="w-[277px] h-[48px] rounded-[10px] text-white"
              style={{
                background: "#542452",
              }}
            >
              Buy Now
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
}
