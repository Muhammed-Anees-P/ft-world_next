"use client";

import Image from "next/image";
import Container from "../Container";

export default function FeaturProducts() {
  return (
    <section className="w-full py-[70px] bg-white h-[600px]">
      <Container>
        {/* MAIN WRAPPER */}
        <div className="w-full bg-[#D8D8D8] rounded-[20px] px-[40px] py-[20px] flex items-center justify-between">
          {/* ================= LEFT CONTENT ================= */}
          <div className="w-[520px] flex flex-col justify-between h-[500px]">
            {/* Heading + Description */}
            <div className="mt-15">
              <h2 className="text-[40px] font-semibold leading-[1.15] text-black mb-8">
                Smart Technology <br />
                for Seamless <br />
                Business Operations
              </h2>

              <p className="text-[14px] text-gray-600 max-w-[420px] ">
                Enhance your business with our cutting-edge POS systems,
                multifunction printers, and security solutions.
              </p>
            </div>

            {/* Bottom Actions */}
            <div className="flex flex-col gap-15">
              {/* Talk With Expert */}
              <div
                className="w-[400px] h-[78px] px-[22px] 
              bg-gradient-to-r from-[#CECECE] to-[#B4B4B4] 
              rounded-[30px] flex items-center justify-between"
              >
                <div className="flex items-center -space-x-3">
                  <div className="w-9 h-9 rounded-full bg-gray-300 border-2 border-white" />
                  <div className="w-9 h-9 rounded-full bg-gray-400 border-2 border-white" />
                  <div className="w-9 h-9 rounded-full bg-gray-500 border-2 border-white" />
                </div>

                <span className="text-sm font-medium text-black">
                  Talk With Our Expert
                </span>

                <div
                  className="w-8 h-8 flex items-center justify-center bg-white shadow-sm"
                  style={{ borderRadius: "10px" }}
                >
                  →
                </div>
              </div>

              {/* Learn More */}
              <div style={{ marginBottom: "20px" }}>
                <button
                  className="w-[160px] h-[42px] rounded-[8px] text-white text-sm font-medium bg-[#542452]"
                  style={{ marginTop: "10px" }}
                >
                  Learn More
                </button>
              </div>
            </div>
          </div>

          {/* ================= RIGHT PRODUCT GROUP ================= */}
          <div className="flex gap-[20px]">
            {/* PRODUCT 1 */}
            <div className="w-[300px] h-[450px] bg-white rounded-[20px] p-[30px] flex flex-col justify-between">
              <span className="text-xs bg-white px-3 py-1 rounded-full shadow-sm w-fit">
                Develop Ineo 224 ₹1,54,900
              </span>

              <div className="flex justify-center items-center flex-1">
                <Image
                  src="/printer1.png"
                  alt="Printer"
                  width={280}
                  height={380}
                  className="object-contain"
                />
              </div>

              <div className="flex justify-end">
                <div className="w-9 h-9 rounded-full bg-white shadow flex items-center justify-center">
                  →
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN */}
            <div className="flex flex-col gap-[20px]">
              {/* PRODUCT 2 */}
              <div className="w-[220px] h-[230px] bg-white rounded-[20px] p-[26px] flex flex-col justify-between">
                <span className="text-xs bg-white px-3 py-1 rounded-full shadow-sm w-fit">
                  POSIFLOW PSF–11 ₹1,54,900
                </span>

                <div className="flex justify-center items-center flex-1">
                  <Image
                    src="/pos.png"
                    alt="POS"
                    width={200}
                    height={200}
                    className="object-contain"
                  />
                </div>

                <div className="flex justify-end">
                  <div className="w-8 h-8 rounded-full bg-white shadow flex items-center justify-center">
                    →
                  </div>
                </div>
              </div>

              {/* PRODUCT 3 */}
              <div className="w-[220px] h-[200px] bg-white rounded-[20px] p-[24px] flex flex-col justify-center items-center text-center">
                <h3 className="text-lg font-semibold mb-2">20% OFF</h3>

                <p className="text-sm text-gray-600 mb-4">
                  On Annual Maintenance Contracts
                </p>

                <button className="px-6 py-2 rounded-[8px] text-white text-sm font-medium bg-[#542452]">
                  Explore Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
