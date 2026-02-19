"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  User,
  ShoppingCart,
  MoreHorizontal,
  Bell,
  Menu,
  X,
} from "lucide-react";
import Container from "./Container";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="w-full bg-[#FFFFFF] shadow-sm">
      <Container className="flex items-center justify-between py-3">
        {/* Left Logo */}
        <div className="flex items-center">
          <Image
            src="/ft-world_logo.png"
            alt="Company Logo"
            width={130}
            height={40}
            className="object-contain"
          />
        </div>

        {/* Center Search (Desktop) */}
        <div className="hidden md:flex flex-1 mx-8 max-w-2xl">
          <div className="relative w-full">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search Products, brands and more"
              className="w-full pl-12 pr-4 py-2.5 rounded-full border border-gray-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#542452]"
            />
          </div>
        </div>

        {/* Desktop Right Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="#"
            className="flex items-center gap-2 bg-[#542452] text-white px-5 py-2 rounded-full text-sm font-medium hover:opacity-90 transition"
          >
            <User size={16} />
            Login
          </Link>

          <Link
            href="#"
            className="flex items-center gap-2 bg-[#542452] text-white px-5 py-2 rounded-full text-sm font-medium hover:opacity-90 transition"
          >
            <ShoppingCart size={16} />
            Cart
          </Link>

          <Link
            href="#"
            className="flex items-center gap-2 bg-[#542452] text-white px-5 py-2 rounded-full text-sm font-medium hover:opacity-90 transition"
          >
            <MoreHorizontal size={16} />
            More
          </Link>

          <button className="bg-[#542452] text-white p-2.5 rounded-full hover:opacity-90 transition">
            <Bell size={18} />
          </button>
        </div>

        {/* Mobile Icons */}
        <div className="flex md:hidden items-center gap-3">
          <ShoppingCart className="text-[#542452]" size={22} />
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? (
              <X size={26} className="text-[#542452]" />
            ) : (
              <Menu size={26} className="text-[#542452]" />
            )}
          </button>
        </div>
      </Container>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <Container className="py-4 space-y-4">
            <div className="relative">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="text"
                placeholder="Search Products, brands and more"
                className="w-full pl-12 pr-4 py-2.5 rounded-full border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#542452]"
              />
            </div>

            <Link
              href="#"
              className="flex items-center gap-2 text-[#542452] py-2"
            >
              <User size={18} />
              Login
            </Link>

            <Link
              href="#"
              className="flex items-center gap-2 text-[#542452] py-2"
            >
              <ShoppingCart size={18} />
              Cart
            </Link>

            <Link
              href="#"
              className="flex items-center gap-2 text-[#542452] py-2"
            >
              <MoreHorizontal size={18} />
              More
            </Link>
          </Container>
        </div>
      )}
    </nav>
  );
}
