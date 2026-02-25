"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Image,
  Grid3X3,
  LogOut,
  ShoppingCartIcon,
} from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { name: "Dashboard", path: "/admin", icon: LayoutDashboard },
    { name: "Banners", path: "/admin/banners", icon: Image },
    { name: "Categories", path: "/admin/categories", icon: Grid3X3 },
    { name: "Products", path: "/admin/products", icon: ShoppingCartIcon },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-100 shadow-sm flex flex-col">
      {/* Logo Section */}
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-2xl font-bold text-[#542452]">FT-World</h2>
        <p className="text-xs text-gray-400 mt-1">Admin Panel</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.path;

          return (
            <Link
              key={item.path}
              href={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive
                  ? "bg-[#542452] text-white shadow-md"
                  : "text-gray-600 hover:bg-purple-50"
              }`}
            >
              <Icon size={20} />
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer / Logout */}
      <div className="p-4 border-t border-gray-100">
        <button
          onClick={() => {
            localStorage.removeItem("access_token");
            window.location.href = "/admin/login";
          }}
          className="flex items-center gap-3 w-full px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl transition"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
}
