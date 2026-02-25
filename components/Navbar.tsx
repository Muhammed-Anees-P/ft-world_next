"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  User,
  ShoppingCart,
  Menu,
  X,
  Headphones,
  LayoutGrid,
} from "lucide-react";
import Container from "./Container";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const closeTimeout = useRef<NodeJS.Timeout | null>(null);

  const [searchText, setSearchText] = useState("");

  const placeholders = [
    "Search Products...",
    "Search Brands...",
    "Search Electronics...",
  ];

  const [currentText, setCurrentText] = useState("");
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  /* ================= TYPEWRITER ================= */
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

  /* ================= DROPDOWN ================= */
  const handleEnter = (name: string) => {
    if (closeTimeout.current) clearTimeout(closeTimeout.current);
    setActiveDropdown(name);
  };

  const handleLeave = () => {
    closeTimeout.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  return (
    <nav className="w-full bg-white shadow-sm">
      <Container className="flex items-center justify-between py-3">
        {/* LOGO */}
        <Link href="/" className="flex items-center flex-shrink-0">
          <Image
            src="/ft-world_logo.png"
            alt="Company Logo"
            width={140}
            height={40}
            className="object-contain"
          />
        </Link>

        {/* SEARCH */}
        <div className="hidden md:flex flex-1 mx-10 max-w-2xl">
          <div className="relative w-[1920px]">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#542452]"
            />

            {!searchText && (
              <span className="absolute left-12 top-1/2 -translate-y-1/2 text-gray-400 text-sm pointer-events-none">
                {currentText}
                <span className="animate-blink">|</span>
              </span>
            )}
          </div>
        </div>

        {/* RIGHT ICON GROUP */}
        <div className="hidden md:flex items-center flex-shrink-0 gap-3.5">
          {/* CATEGORY */}
          <Link
            href="/categories"
            className="w-10 h-10 rounded-full bg-[#5B2758] flex items-center justify-center text-white hover:opacity-95 transition"
          >
            <LayoutGrid size={16} />
          </Link>

          {/* SUPPORT */}
          <Link
            href="/support"
            className="w-10 h-10 rounded-full bg-[#5B2758] flex items-center justify-center text-white hover:opacity-95 transition"
          >
            <Headphones size={16} />
          </Link>

          {/* CART */}
          <Link
            href="/cart"
            className="w-10 h-10 rounded-full bg-[#5B2758] flex items-center justify-center text-white hover:opacity-95 transition"
          >
            <ShoppingCart size={16} />
          </Link>

          {/* USER */}
          <div
            className="relative"
            onMouseEnter={() => handleEnter("user")}
            onMouseLeave={handleLeave}
          >
            <div className="w-10 h-10 rounded-full bg-[#5B2758] flex items-center justify-center text-white cursor-pointer hover:opacity-95 transition">
              <User size={16} />
            </div>

            {activeDropdown === "user" && (
              <div className="absolute right-0 mt-3 w-48 bg-[#D9D9D9] rounded-xl shadow-lg py-3 animate-dropdown z-50">
                <Link
                  href="/login"
                  className="block px-4 py-2 hover:bg-gray-200 text-sm"
                >
                  Login
                </Link>
                <Link
                  href="/profile"
                  className="block px-4 py-2 hover:bg-gray-200 text-sm"
                >
                  My Profile
                </Link>
                <Link
                  href="/orders"
                  className="block px-4 py-2 hover:bg-gray-200 text-sm"
                >
                  Orders
                </Link>
                <Link
                  href="/wishlist"
                  className="block px-4 py-2 hover:bg-gray-200 text-sm"
                >
                  Wishlist
                </Link>
              </div>
            )}
          </div>

          {/* DIVIDER */}
          <div className=" mx-8" />

          {/* HAMBURGER */}
          <div
            className="relative"
            onMouseEnter={() => handleEnter("menu")}
            onMouseLeave={handleLeave}
          >
            <div className="w-10 h-10 rounded-full bg-[#5B2758] flex items-center justify-center text-white cursor-pointer hover:opacity-95 transition">
              <Menu size={16} />
            </div>

            {activeDropdown === "menu" && (
              <div className="absolute right-0 mt-3 w-44 bg-[#D9D9D9] rounded-xl shadow-lg py-3 animate-dropdown z-50">
                <Link
                  href="/about"
                  className="block px-4 py-2 hover:bg-gray-200 text-sm"
                >
                  About Us
                </Link>
                <Link
                  href="/contact"
                  className="block px-4 py-2 hover:bg-gray-200 text-sm"
                >
                  Contact Us
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* MOBILE */}
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

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <Container className="py-4 space-y-4">
            <Link href="/login" className="block py-2 text-[#542452]">
              Login
            </Link>
            <Link href="/cart" className="block py-2 text-[#542452]">
              Cart
            </Link>
            <Link href="/about" className="block py-2 text-[#542452]">
              About Us
            </Link>
            <Link href="/contact" className="block py-2 text-[#542452]">
              Contact
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

        .animate-dropdown {
          animation: dropdownFade 0.2s ease forwards;
        }

        @keyframes dropdownFade {
          from {
            opacity: 0;
            transform: translateY(-8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </nav>
  );
}