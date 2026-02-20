"use client";

import Link from "next/link";
import Container from "@/components/Container";

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-[#f4f4f6] px-4 overflow-hidden">
      <Container>
        <div className="text-center max-w-xl mx-auto animate-fadeIn">
          {/* Animated Icon */}
          <div className="mb-8 flex justify-center">
            <div className="relative w-24 h-24 flex items-center justify-center">
              <div className="absolute w-24 h-24 bg-[#542452]/10 rounded-full animate-pulseSlow"></div>
              <span className="text-5xl animate-float">🚧</span>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-[#542452]">
            We’re Building Something Amazing
          </h1>

          {/* Subtitle */}
          <h2 className="mt-4 text-xl md:text-2xl font-semibold text-gray-900">
            This Page is Under Construction
          </h2>

          {/* Description */}
          <p className="mt-6 text-gray-600 text-sm md:text-base leading-relaxed">
            Our team is currently working on this section of the website. We’re
            creating a better and more powerful experience for you.
            <br />
            <br />
            Please check back soon. Exciting updates are on the way!
          </p>

          {/* Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="px-6 py-3 rounded-lg text-white text-sm font-medium transition hover:opacity-95"
              style={{
                background: "linear-gradient(180deg, #542452 0%, #BA50B6 100%)",
              }}
            >
              Back to Homepage
            </Link>

            <Link
              href="/contact"
              className="px-6 py-3 rounded-lg border border-gray-300 text-sm font-medium hover:bg-gray-100 transition"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </Container>

      {/* Animations */}
      <style jsx>{`
        .animate-fadeIn {
          animation: fadeIn 0.8s ease forwards;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        @keyframes float {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
          100% {
            transform: translateY(0px);
          }
        }

        .animate-pulseSlow {
          animation: pulseSlow 2.5s ease-in-out infinite;
        }

        @keyframes pulseSlow {
          0% {
            transform: scale(1);
            opacity: 0.5;
          }
          50% {
            transform: scale(1.2);
            opacity: 0.2;
          }
          100% {
            transform: scale(1);
            opacity: 0.5;
          }
        }
      `}</style>
    </main>
  );
}
