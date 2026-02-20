"use client";

import Container from "@/components/Container";
import { Mail, Phone, MapPin, Globe } from "lucide-react";

export default function ContactPage() {
  return (
    <main className="w-full bg-[#FFFFFF]">
      {/* ================= HEADER SECTION ================= */}
      <section className="w-full bg-[#FAEDFA] py-20 text-center">
        <Container>
          <h1 className="text-3xl md:text-4xl font-semibold text-black">
            Hi How Can We Help <span className="text-[#542452]">You?</span>
          </h1>
          <p className="text-sm text-gray-700 mt-3">
            Let’s Build the Future Together
          </p>
        </Container>
      </section>

      {/* ================= DESCRIPTION CARD ================= */}
      <section className="py-16">
        <Container>
          <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm p-6 md:p-10 text-center text-gray-600 text-sm leading-relaxed">
            At FT World, we are committed to delivering innovative technology
            solutions tailored to your business needs. Whether you require
            advanced ICT infrastructure, ELV systems integration, security
            solutions, or enterprise technology support, our team is ready to
            assist you.
            <br />
            <br />
            We welcome inquiries from corporate clients, developers,
            contractors, and technology partners seeking reliable, scalable, and
            future-ready solutions.
          </div>
        </Container>
      </section>

      {/* ================= CONTACT + FORM SECTION ================= */}
      <section className="pb-24">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* ===== LEFT: GET IN TOUCH ===== */}
            <div>
              <h2 className="text-2xl font-semibold mb-6">Get In Touch</h2>

              <div className="bg-white rounded-2xl shadow-sm p-8 space-y-6 text-sm text-gray-700">
                <div className="flex items-start gap-4">
                  <MapPin className="text-[#542452]" size={20} />
                  <p>
                    FT World | HiLite Business Park, Calicut,
                    <br />
                    Kerala 673606
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <Phone className="text-[#542452]" size={20} />
                  <p>+91 7994319004</p>
                </div>

                <div className="flex items-center gap-4">
                  <Mail className="text-[#542452]" size={20} />
                  <p>info@ftworld.com</p>
                </div>

                <div className="flex items-center gap-4">
                  <Globe className="text-[#542452]" size={20} />
                  <p>www.ftworld.com</p>
                </div>
              </div>
            </div>

            {/* ===== RIGHT: CONTACT FORM ===== */}
            <div>
              <h2 className="text-2xl font-semibold mb-6">Send Us Message</h2>

              <div className="bg-white rounded-2xl shadow-sm p-8">
                <form className="space-y-5">
                  <div>
                    <label className="text-sm font-medium">Full Name*</label>
                    <input
                      type="text"
                      placeholder="Enter Your Full Name"
                      className="w-full mt-2 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#542452]"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium">
                      Email Address*
                    </label>
                    <input
                      type="email"
                      placeholder="your.email@example.com"
                      className="w-full mt-2 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#542452]"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium">Phone Number*</label>
                    <input
                      type="text"
                      placeholder="+91 XXXXX XXXXX"
                      className="w-full mt-2 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#542452]"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium">Details*</label>
                    <textarea
                      rows={4}
                      placeholder="Please Leave Your Requirements"
                      className="w-full mt-2 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#542452]"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full text-white rounded-lg py-3 text-sm font-medium transition hover:opacity-95"
                    style={{
                      background:
                        "linear-gradient(180deg, #542452 0%, #BA50B6 100%)",
                    }}
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
