"use client";

import Image from "next/image";
import Container from "@/components/Container";
import { Mail, Phone, MapPin, Globe } from "lucide-react";

export default function ContactPage() {
  return (
    <main className="w-full bg-[#FFFFFF] py-20">
      {/* ================= HEADING ================= */}
      <Container>
        <div className="text-center mb-14">
          <h1 className="text-3xl md:text-4xl font-semibold">
            Hi How Can We <span className="text-[#542452]">Help You?</span>
          </h1>
          <p className="text-sm text-gray-600 mt-2">
            Let’s Build the Future Together
          </p>
        </div>
      </Container>

      {/* ================= FORM CARD ================= */}
      <Container>
        <div className="max-w-4xl mx-auto border rounded-2xl p-6 md:p-10 bg-white">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            {/* ===== LEFT IMAGE ===== */}
            <div className="rounded-xl overflow-hidden">
              <Image
                src="/contact.jpg"
                alt="contact"
                width={500}
                height={400}
                className="object-cover w-full h-full rounded-xl"
              />
            </div>

            {/* ===== RIGHT FORM ===== */}
            <div>
              <h2 className="text-lg font-semibold mb-2">
                Let’s connect constellations
              </h2>
              <p className="text-sm text-gray-600 mb-6">
                Let’s align our constellations! Reach out and let the magic of
                collaboration illuminate our skies.
              </p>

              <form className="space-y-4">
                {/* First + Last Name */}
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="First Name"
                    className="border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#542452]"
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#542452]"
                  />
                </div>

                <input
                  type="email"
                  placeholder="E-Mail"
                  className="w-full border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#542452]"
                />

                <input
                  type="text"
                  placeholder="Phone Number"
                  className="w-full border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#542452]"
                />

                <textarea
                  rows={4}
                  placeholder="Message"
                  className="w-full border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#542452]"
                />

                <button
                  type="submit"
                  className="w-full bg-[#542452] text-white rounded-full py-3 text-sm font-medium hover:opacity-95 transition"
                >
                  Sent
                </button>
              </form>
            </div>
          </div>
        </div>
      </Container>

      {/* ================= BOTTOM INFO STRIP ================= */}
      <Container>
        <div className="max-w-4xl mx-auto mt-16 border rounded-2xl p-6 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-gray-700">
          <div className="flex items-center gap-3">
            <MapPin size={18} />
            <span>FT World | Calicut, Kerala 673606</span>
          </div>

          <div className="flex items-center gap-3">
            <Phone size={18} />
            <span>+91 7554433221</span>
          </div>

          <div className="flex items-center gap-3">
            <Mail size={18} />
            <span>info@ftworld.com</span>
          </div>

          <div className="flex items-center gap-3">
            <Globe size={18} />
            <span>www.ftworld.com</span>
          </div>
        </div>
      </Container>
    </main>
  );
}
