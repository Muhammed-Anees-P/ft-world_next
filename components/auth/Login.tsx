"use client";

import Image from "next/image";
import Link from "next/link";

export default function Login() {
  return (
    <main className="w-full min-h-screen bg-[white] flex items-center justify-center">
      {/* ===== MAIN CARD ===== */}
      <div
        className="w-[1000px] h-[715px] bg-white rounded-[20px] flex overflow-hidden"
        style={{
          boxShadow: "0px 0px 4px 0px #00000040",
        }}
      >
        {/* ================= LEFT SIDE ================= */}
        <div className="relative w-[50%] h-full rounded-l-[20px] overflow-hidden">
          <Image src="/login.jpg" alt="login" fill className="object-cover" />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />

          {/* Left Content */}
          <div className="absolute bottom-36 left-10 right-10 text-white">
            <h2 className="text-[26px] font-semibold leading-snug">
              Get your all buying problems solved today
            </h2>

            <p className="text-sm mt-6 text-gray-300 text-center">
              You don't have account
            </p>

            <Link
              href="/register"
              className="mt-4 block w-full h-[48px] bg-[#542452] text-white rounded-[10px] text-sm font-medium flex items-center justify-center hover:opacity-90 transition"
            >
              Sign Up
            </Link>
          </div>
        </div>

        {/* ================= RIGHT SIDE ================= */}
        <div className="w-[50%] h-full bg-[#FAFAFA] flex items-center justify-center">
          <div className="w-[400px]">
            <h2 className="text-[22px] font-semibold text-center mb-12">
              Log In
            </h2>

            <form className="space-y-5">
              <input
                type="text"
                placeholder="Enter your Email / Phone Number"
                className="w-full border border-gray-300 rounded-[8px] px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#542452]"
              />

              <input
                type="password"
                placeholder="Password"
                className="w-full border border-gray-300 rounded-[8px] px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#542452]"
              />

              <button
                type="submit"
                className="w-full h-[44px] bg-[#542452] text-white rounded-[8px] text-sm font-medium hover:opacity-95 transition"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
