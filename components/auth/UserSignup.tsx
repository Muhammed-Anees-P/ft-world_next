"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Signup() {
  const [type, setType] = useState<"person" | "company">("person");

  return (
    <main className="w-full min-h-screen bg-[white] flex items-center justify-center">
      <div
        className="w-[1145px] h-[715px] bg-white rounded-[20px] flex overflow-hidden"
        style={{ boxShadow: "0px 0px 4px 0px #00000040" }}
      >
        {/* ================= LEFT SIDE ================= */}
        <div className="w-1/2 bg-[#FAFAFA] flex items-center justify-center">
          <div className="w-[450px]">
            {/* Heading */}
            <h2 className="text-[28px] font-semibold text-center">Sign Up</h2>

            {/* Toggle */}
            <div className="flex justify-center gap-2 mt-2 text-sm">
              <button
                onClick={() => setType("person")}
                className={`${
                  type === "person" ? "text-black font-medium" : "text-gray-400"
                }`}
              >
                Person
              </button>
              <span className="text-gray-400">/</span>
              <button
                onClick={() => setType("company")}
                className={`${
                  type === "company"
                    ? "text-black font-medium"
                    : "text-gray-400"
                }`}
              >
                Company
              </button>
            </div>

            {/* ================= PERSON FORM ================= */}
            {type === "person" && (
              <form className="mt-8 space-y-4">
                <div className="flex gap-4">
                  <input
                    type="text"
                    placeholder="Enter your first name"
                    className="w-1/2 inputStyle"
                  />
                  <input
                    type="text"
                    placeholder="Second name"
                    className="w-1/2 inputStyle"
                  />
                </div>

                <input
                  type="text"
                  placeholder="Enter your phone no."
                  className="w-full inputStyle"
                />

                <input
                  type="email"
                  placeholder="Enter your Email"
                  className="w-full inputStyle"
                />

                <textarea
                  rows={2}
                  placeholder="Enter your Address"
                  className="w-full inputStyle"
                />

                <input
                  type="password"
                  placeholder="Enter your password"
                  className="w-full inputStyle"
                />

                <input
                  type="password"
                  placeholder="Confirm password"
                  className="w-full inputStyle"
                />

                <button className="submitBtn">Create Account</button>
              </form>
            )}

            {/* ================= COMPANY FORM ================= */}
            {type === "company" && (
              <form className="mt-8 space-y-4">
                <div className="flex gap-4">
                  <input
                    type="text"
                    placeholder="Enter your company name"
                    className="flex-1 inputStyle"
                  />

                  <div className="w-[120px] h-[120px] border border-gray-300 rounded-[12px] flex flex-col items-center justify-center text-gray-500 text-sm cursor-pointer hover:border-[#542452] transition">
                    <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-2xl mb-2">
                      +
                    </div>
                    Add logo
                  </div>
                </div>

                <textarea
                  rows={2}
                  placeholder="Enter your Address"
                  className="w-full inputStyle"
                />

                <div className="flex gap-4">
                  <input
                    type="text"
                    placeholder="Enter your phone no."
                    className="w-1/2 inputStyle"
                  />
                  <input
                    type="email"
                    placeholder="Enter your Email"
                    className="w-1/2 inputStyle"
                  />
                </div>

                <div className="flex gap-4">
                  <input
                    type="text"
                    placeholder="Country"
                    className="w-1/3 inputStyle"
                  />
                  <input
                    type="text"
                    placeholder="State"
                    className="w-1/3 inputStyle"
                  />
                  <input
                    type="text"
                    placeholder="City"
                    className="w-1/3 inputStyle"
                  />
                </div>

                <input
                  type="text"
                  placeholder="TRN no."
                  className="w-full inputStyle"
                />

                <input
                  type="password"
                  placeholder="Enter your password"
                  className="w-full inputStyle"
                />

                <input
                  type="password"
                  placeholder="Confirm password"
                  className="w-full inputStyle"
                />

                <button className="submitBtn">Create Account</button>
              </form>
            )}
          </div>
        </div>

        {/* ================= RIGHT SIDE ================= */}
        <div className="relative w-1/2 rounded-r-[20px] overflow-hidden">
          <Image src="/login.jpg" alt="signup" fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />

          <div className="absolute bottom-16 left-10 right-10 text-white">
            <h2 className="text-[26px] font-semibold leading-snug">
              Get your all buying problems solved today
            </h2>

            <p className="text-sm mt-6 text-gray-300">Already have account</p>

            <Link
              href="/login"
              className="mt-4 block w-full h-[48px] bg-[#542452] text-white rounded-[10px] text-sm font-medium flex items-center justify-center hover:opacity-90 transition"
            >
              Log in
            </Link>
          </div>
        </div>
      </div>

      {/* ===== Shared Styles ===== */}
      <style jsx>{`
        .inputStyle {
          border: 1px solid #d1d5db;
          border-radius: 10px;
          padding: 10px 16px;
          font-size: 14px;
          outline: none;
          width: 100%;
        }

        .inputStyle:focus {
          border-color: #542452;
        }

        .submitBtn {
          width: 100%;
          height: 48px;
          background: #542452;
          color: white;
          border-radius: 10px;
          font-size: 14px;
          font-weight: 500;
          transition: 0.3s;
        }

        .submitBtn:hover {
          opacity: 0.95;
        }
      `}</style>
    </main>
  );
}
