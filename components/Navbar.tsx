"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  User,
  ShoppingCart,
  Bell,
  Menu,
  X,
  ChevronRight,
  MenuIcon,
} from "lucide-react";
import Container from "./Container";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchText, setSearchText] = useState("");

  const placeholders = [
    "Search Products...",
    "Search Brands...",
    "Search Electronics...",
  ];

  const [currentText, setCurrentText] = useState("");
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (searchText) return;

    const fullText = placeholders[index];
    let typingSpeed = isDeleting ? 40 : 80;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setCurrentText(fullText.substring(0, currentText.length + 1));

        if (currentText === fullText) {
          setTimeout(() => setIsDeleting(true), 1000);
        }
      } else {
        setCurrentText(fullText.substring(0, currentText.length - 1));

        if (currentText === "") {
          setIsDeleting(false);
          setIndex((prev) => (prev + 1) % placeholders.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, index, searchText]);

  return (
    <nav className="w-full bg-[#FFFFFF] shadow-sm">
      <Container className="flex items-center justify-between py-3">
        {/* Left Logo */}
        <div className="flex items-center hover:cursor-pointer">
          <Link href={"/"}>
            <Image
              src="/ft-world_logo.png"
              alt="Company Logo"
              width={130}
              height={40}
              className="object-contain"
            />
          </Link>
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
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="w-full pl-12 pr-4 py-2.5 rounded-full border border-gray-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#542452]"
            />

            {!searchText && (
              <span className="absolute left-12 top-1/2 -translate-y-1/2 text-gray-400 text-sm pointer-events-none">
                {currentText}
                <span className="animate-blink">|</span>
              </span>
            )}
          </div>
        </div>

        {/* Desktop Right Buttons */}
        <div className="hidden md:flex items-center gap-4">
          {/* LOGIN */}
          <Link
            href="#"
            className="flex items-center bg-[#5B2758] rounded-full pl-1 pr-5 py-2 text-white text-sm font-medium hover:opacity-95 transition h-10"
          >
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-linear-to-br from-[#7A2E7A] to-[#C53BD2] mr-3">
              <User size={16} className="text-white" />
            </div>
            <span className="mr-2">Login</span>
            <ChevronRight size={16} className="text-white" />
          </Link>

          {/* CART */}
          <Link
            href="#"
            className="flex items-center bg-[#5B2758] rounded-full pl-1 pr-5 py-2 text-white text-sm font-medium hover:opacity-95 transition h-10"
          >
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-linear-to-br from-[#7A2E7A] to-[#C53BD2] mr-3">
              <ShoppingCart size={16} className="text-white" />
            </div>
            Cart
          </Link>

          {/* MORE */}
          <Link
            href="#"
            className="flex items-center bg-[#5B2758] rounded-full pl-1 pr-5 py-2 text-white text-sm font-medium hover:opacity-95 transition h-10"
          >
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-linear-to-br from-[#7A2E7A] to-[#C53BD2] mr-3">
              <MenuIcon size={16} />
            </div>
            <span className="mr-2">More</span>
            <ChevronRight size={16} className="text-white" />
          </Link>

          {/* NOTIFICATION */}
          <button className="bg-[#5B2758] text-white p-2.5 rounded-full hover:opacity-95 transition">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M10.268 21a2 2 0 0 0 3.464 0" />
              <path d="M11.68 2.009A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673c-.824-.85-1.678-1.731-2.21-3.348" />

              <circle cx="18" cy="5" r="4" fill="white" />

              <circle cx="18" cy="5" r="3.5" fill="red" />
            </svg>
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
              <MenuIcon size={18} />
              More
            </Link>
          </Container>
        </div>
      )}

      <style jsx>{`
        .animate-blink {
          animation: blink 1s infinite;
        }

        @keyframes blink {
          0%,
          50%,
          100% {
            opacity: 1;
          }
          25%,
          75% {
            opacity: 0;
          }
        }
      `}</style>
    </nav>
  );
}
