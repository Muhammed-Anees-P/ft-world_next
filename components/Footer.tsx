"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Mail,
  Send,
} from "lucide-react";
import Container from "./Container";

export default function Footer() {
  return (
    <footer className="w-full bg-[#C7C7C7] pt-12 pb-6">
      <Container>
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Logo & About */}
          <div className="space-y-6">
            {/* Logo Image */}
            <div className="relative w-40 h-11.25">
              <Image
                src="/ft-footer.png"
                alt="FT World Logo"
                fill
                className="object-contain"
              />
            </div>

            <p className="text-sm text-gray-700 leading-relaxed">
              Your trusted destination for innovative electronics, smart
              solutions, and modern technology products. Discover quality,
              performance, and reliability.
            </p>

            <div className="flex gap-4 text-gray-700">
              <Facebook
                size={18}
                className="hover:text-black cursor-pointer transition"
              />
              <Instagram
                size={18}
                className="hover:text-black cursor-pointer transition"
              />
              <Twitter
                size={18}
                className="hover:text-black cursor-pointer transition"
              />
              <Linkedin
                size={18}
                className="hover:text-black cursor-pointer transition"
              />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">QUICK LINKS</h3>
            <ul className="space-y-2 text-sm text-gray-800">
              <li>
                <Link href="#">Home</Link>
              </li>
              <li>
                <Link href="/about">About Us</Link>
              </li>
              <li>
                <Link href="/product">Products</Link>
              </li>
              <li>
                <Link href="#">Categories</Link>
              </li>
              <li>
                <Link href="#">Offers</Link>
              </li>
              <li>
                <Link href="/contact">Contact Us</Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="font-semibold mb-4">CUSTOMER SERVICE</h3>
            <ul className="space-y-2 text-sm text-gray-800">
              <li>
                <Link href="#">My Account</Link>
              </li>
              <li>
                <Link href="#">Order Tracking</Link>
              </li>
              <li>
                <Link href="#">Shipping & Returns</Link>
              </li>
              <li>
                <Link href="#">FAQ</Link>
              </li>
              <li>
                <Link href="#">Warranty Policy</Link>
              </li>
              <li>
                <Link href="#">Support Center</Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="">
            <div className="space-y-4">
              <h3 className="font-semibold">STAY CONNECTED</h3>

              <p className="text-sm text-gray-800">
                Subscribe to our newsletter for exclusive deals and updates.
              </p>

              <div className="flex gap-4">
                <div className="flex items-center bg-[#D9D9D9] rounded-lg overflow-hidden shadow-sm">
                  <input
                    type="email"
                    placeholder="Your Email Address"
                    className="flex-1 px-4 py-2 text-sm outline-none"
                    style={{ border: "1px solid #542452", borderRadius: "8px" }}
                  />
                </div>
                <button
                  className="bg-[#542452] text-white px-4 py-2 hover:opacity-90 transition"
                  style={{ borderRadius: "10px" }}
                >
                  <Send size={16} />
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2 mt-4 text-sm text-gray-800">
              <Mail size={16} />
              support@ftworld.com
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-500 my-8"></div>

        {/* Bottom Row */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-800 gap-4">
          <p>© 2026 FT World. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="#">Privacy Policy</Link>
            <span>|</span>
            <Link href="#">Terms of Service</Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
