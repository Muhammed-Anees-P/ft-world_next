"use client";

import { Bell } from "lucide-react";

export default function AdminHeader() {
  return (
    <header className="bg-white border-b border-gray-100 px-8 py-4 flex justify-between items-center">
      {/* Left */}
      <div>
        <h1 className="text-xl font-semibold text-gray-800">Dashboard</h1>
        <p className="text-sm text-gray-400">Welcome back, Superadmin 👋</p>
      </div>

      {/* Right */}
      <div className="flex items-center gap-6">
        {/* Notification Icon */}
        <button className="relative text-gray-600 hover:text-[#542452] transition">
          <Bell size={22} />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">
            3
          </span>
        </button>

        {/* Admin Avatar */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-[#542452] text-white flex items-center justify-center rounded-full font-semibold">
            A
          </div>
          <div className="text-sm">
            <p className="font-medium text-gray-700">Admin</p>
            <p className="text-gray-400 text-xs">Superadmin</p>
          </div>
        </div>
      </div>
    </header>
  );
}
